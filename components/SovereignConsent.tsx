import React, { useState, useCallback, useEffect } from 'react';
import { ShieldCheck, Zap, Loader2, Cpu, ArrowRight, Wifi, AlertCircle, Lock, Database } from 'lucide-react';
import { GoogleGenAI, Modality } from "@google/genai";
import { useSovereign } from '../context/SovereignContext.tsx';

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const alignedBuffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
  const length = Math.floor(alignedBuffer.byteLength / 2);
  const dataInt16 = new Int16Array(alignedBuffer, 0, length);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
  return bytes;
}

interface SovereignConsentProps {
  onCleared: () => void;
}

export const SovereignConsent: React.FC<SovereignConsentProps> = ({ onCleared }) => {
  const [isInitializing, setIsInitializing] = useState(false);
  const [connStatus, setConnStatus] = useState<'CHECKING' | 'READY' | 'RESTRICTED'>('CHECKING');
  const { initializeAudio, getAudioContext, stopHeartbeat, setIsWelcomePlaying, setWelcomeAnalyser } = useSovereign();

  useEffect(() => {
    const checkConnectivity = async () => {
      try {
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models', { method: 'HEAD' });
        setConnStatus(response.ok ? 'READY' : 'RESTRICTED');
      } catch (err) {
        setConnStatus('RESTRICTED');
      }
    };
    const timer = setTimeout(checkConnectivity, 1000);
    return () => clearTimeout(timer);
  }, []);

  const playWelcome = useCallback(async (ctx: AudioContext) => {
    try {
      if (!process.env.API_KEY) { onCleared(); return; }
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: "Neural link synchronized. Welcome to the Royal Care Group. Our structural systems are now authorized for deployment." }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
        },
      });

      let base64Audio = (response as any).candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

      if (base64Audio) {
        const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
        const analyser = ctx.createAnalyser();
        setWelcomeAnalyser(analyser);
        setIsWelcomePlaying(true);
        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(analyser);
        analyser.connect(ctx.destination);
        source.onended = () => {
          stopHeartbeat();
          setIsWelcomePlaying(false);
          setWelcomeAnalyser(null);
          onCleared();
        };
        source.start(0);
      } else {
        onCleared();
      }
    } catch (err) {
      onCleared();
    }
  }, [onCleared, stopHeartbeat, setIsWelcomePlaying, setWelcomeAnalyser]);

  const handleAccept = async () => {
    if (isInitializing) return;
    setIsInitializing(true);
    localStorage.setItem('rcg_structural_consent', 'AUTHORIZED_' + Date.now());

    try {
      const success = await initializeAudio();
      const ctx = getAudioContext();
      if (ctx.state === 'suspended') await ctx.resume();
      
      // Attempt to play welcome, but always clear the gate
      playWelcome(ctx);
      // Fallback: If audio fails to start/trigger welcome, clear gate after 3s
      setTimeout(onCleared, 3000);
    } catch (err) {
      onCleared();
    }
  };

  return (
    <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-[#334155] overflow-hidden font-sans">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]"></div>
      </div>

      <div className="max-w-2xl w-full px-6 text-center space-y-12 animate-in fade-in zoom-in-95 duration-1000 relative z-10">
        <div className="flex flex-col items-center gap-8">
           <div className="p-6 bg-neon-blue/10 border border-neon-blue/20 rounded-[2.5rem] shadow-[0_0_50px_rgba(6,182,212,0.1)] relative group">
              <div className="absolute inset-0 bg-neon-blue/20 blur-3xl rounded-full opacity-50"></div>
              <Lock className="text-neon-blue w-16 h-16 relative z-10 animate-pulse" strokeWidth={1.5} />
           </div>
           
           <div className="space-y-4">
             <div className="flex items-center justify-center gap-3">
                <div className="h-[1px] w-8 bg-neon-blue/30"></div>
                <span className="text-neon-blue text-[10px] font-black uppercase tracking-[0.5em] font-mono">SOVEREIGN_ACCESS_REQUIRED</span>
                <div className="h-[1px] w-8 bg-neon-blue/30"></div>
             </div>
             <h1 className="text-white font-display font-black uppercase tracking-tight text-4xl sm:text-6xl">
               Entrance <br/> <span className="text-neon-blue">Terminal.</span>
             </h1>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg">
              <div className="bg-black/30 p-4 rounded-2xl border border-white/5 space-y-2">
                 <Wifi size={14} className="text-neon-blue mx-auto" />
                 <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block">Uplink Status</span>
                 <span className="text-[10px] text-white font-mono">{connStatus}</span>
              </div>
              <div className="bg-black/30 p-4 rounded-2xl border border-white/5 space-y-2">
                 <Cpu size={14} className="text-neon-purple mx-auto" />
                 <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block">Hardware Bond</span>
                 <span className="text-[10px] text-white font-mono italic">REQUIRED</span>
              </div>
              <div className="bg-black/30 p-4 rounded-2xl border border-white/5 space-y-2">
                 <Database size={14} className="text-neon-green mx-auto" />
                 <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block">Cookie Logic</span>
                 <span className="text-[10px] text-white font-mono">AUTHORIZED</span>
              </div>
           </div>
           
           <div className="space-y-4 text-slate-300 text-xs sm:text-sm font-bold leading-relaxed max-w-md mx-auto italic border-l-2 border-neon-blue/20 pl-6">
             <p>"By initializing the structural grid, you consent to neural hardware synchronization (Microphone/Audio) and sovereign data governance (Cookies) under the Australian Privacy Principles."</p>
           </div>
        </div>

        <div className="flex flex-col gap-6">
           <button 
             onClick={handleAccept} 
             disabled={isInitializing} 
             className="group relative overflow-hidden px-12 py-7 bg-white text-black rounded-2xl font-black text-[12px] uppercase tracking-[0.4em] transition-all shadow-[0_20px_50px_rgba(0,0,0,0.5)] active:scale-95 disabled:opacity-50"
           >
             <div className="absolute inset-0 bg-neon-blue translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500"></div>
             <div className="relative z-10 flex items-center justify-center gap-4 group-hover:text-white transition-colors">
                {isInitializing ? <Loader2 className="animate-spin" size={18} /> : <Zap size={18} />}
                <span>{isInitializing ? 'CALIBRATING...' : 'INITIALIZE GRID'}</span>
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
             </div>
           </button>
           
           <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.4em]">
             RCG_PROTOCOL // AU_PRIVATE_SECTOR_COMPLIANCE_v10.13
           </p>
        </div>
      </div>
    </div>
  );
};
