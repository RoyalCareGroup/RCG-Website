import React, { useState, useEffect } from 'react';
import { ShieldCheck, Zap, Loader2, Cpu, ArrowRight } from 'lucide-react';
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

export const SovereignConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const { initializeAudio, getAudioContext, stopHeartbeat, setIsWelcomePlaying, setWelcomeAnalyser } = useSovereign();

  useEffect(() => {
    // Check if user has already bonded with the grid
    const consent = localStorage.getItem('rcg_structural_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const playWelcome = async (ctx: AudioContext) => {
    try {
      if (!process.env.API_KEY) return;
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: "Neural link established. Welcome to the Royal Care Group structural intelligence hub. Systemizing NDIS success through binary logic." }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' }
            },
          },
        },
      });

      let base64Audio = null;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData?.data) {
            base64Audio = part.inlineData.data;
            break;
          }
        }
      }

      if (base64Audio) {
        const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 1024;
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
        };
        source.start(0);
      }
    } catch (err) {
      console.error("Welcome trigger failed:", err);
      setIsWelcomePlaying(false);
    } finally {
      setIsInitializing(false);
      setIsVisible(false);
    }
  };

  const handleAccept = async () => {
    if (isInitializing) return;
    setIsInitializing(true);

    const success = await initializeAudio();
    if (!success) {
      // If hardware blocks, we still allow entry but skip audio welcome
      localStorage.setItem('rcg_structural_consent', 'ACCEPTED_NO_AUDIO_' + Date.now());
      setIsVisible(false);
      return;
    }

    const ctx = getAudioContext();
    localStorage.setItem('rcg_structural_consent', 'ACCEPTED_' + Date.now());
    playWelcome(ctx);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#020617] overflow-hidden font-sans">
      {/* Structural Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px]"></div>
      </div>

      {/* Pulsing Scan Line */}
      <div className="absolute left-0 w-full h-[2px] bg-neon-blue/30 shadow-[0_0_20px_#06b6d4] animate-[scan_4s_ease-in-out_infinite] pointer-events-none" />

      <div className="max-w-xl w-full px-6 text-center space-y-12 animate-in fade-in zoom-in-95 duration-1000 relative z-10">
        <div className="flex flex-col items-center gap-8">
           <div className="p-6 bg-neon-blue/5 border border-neon-blue/20 rounded-[2.5rem] shadow-[0_0_50px_rgba(6,182,212,0.1)] relative group">
              <div className="absolute inset-0 bg-neon-blue/20 blur-3xl rounded-full opacity-50"></div>
              <ShieldCheck className="text-neon-blue w-16 h-16 relative z-10 animate-pulse" strokeWidth={1.5} />
           </div>
           
           <div className="space-y-4">
             <div className="flex items-center justify-center gap-3">
                <div className="h-[1px] w-8 bg-neon-blue/30"></div>
                <span className="text-neon-blue text-[10px] font-black uppercase tracking-[0.5em] font-mono">RCG_SYNK_MAINFRAME</span>
                <div className="h-[1px] w-8 bg-neon-blue/30"></div>
             </div>
             <h1 className="text-white font-display font-black uppercase tracking-tight text-4xl sm:text-6xl">
               Structural <br/> <span className="text-neon-blue">Gateway.</span>
             </h1>
           </div>
           
           <p className="text-slate-400 text-sm sm:text-lg font-bold leading-relaxed italic max-w-sm mx-auto">
             "Synchronize your hardware to initialize the structural grid and bond with the Aurelia strategic node."
           </p>
        </div>

        <div className="flex flex-col gap-4">
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
           
           <div className="flex items-center justify-center gap-8 pt-4">
              <div className="flex items-center gap-2 opacity-40">
                 <Cpu size={12} className="text-slate-500" />
                 <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Neural Sync</span>
              </div>
              <div className="h-3 w-[1px] bg-slate-800"></div>
              <div className="flex items-center gap-2 opacity-40">
                 <ShieldCheck size={12} className="text-slate-500" />
                 <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Sovereign Link</span>
              </div>
           </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};