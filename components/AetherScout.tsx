
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { Mic, MicOff, Loader2, Volume2, ShieldCheck, Zap, X, Terminal, Radio, Activity } from 'lucide-react';
import { AetherOrb } from './AetherOrb.tsx';
import { useSovereign } from '../context/SovereignContext.tsx';
import { COMPANY_DETAILS } from '../config.ts';

// Manual PCM Encoding/Decoding (Standard Protocol)
function encode(bytes: Uint8Array) {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
  return bytes;
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
  }
  return buffer;
}

export const AetherScout: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState('STANDBY');
  const [latency, setLatency] = useState('0ms');
  const [transcript, setTranscript] = useState<{role: 'user' | 'model', text: string}[]>([]);
  
  const { setIsThinking } = useSovereign();
  const audioContextRef = useRef<AudioContext | null>(null);
  const outAudioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef(new Set<AudioBufferSourceNode>());
  const scrollRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef(0);

  const currentInputRef = useRef('');
  const currentOutputRef = useRef('');

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [transcript]);

  useEffect(() => {
    setIsThinking(isConnecting || isSpeaking);
  }, [isConnecting, isSpeaking, setIsThinking]);

  const stopSession = () => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
    sourcesRef.current.clear();
    
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(console.error);
      audioContextRef.current = null;
    }
    if (outAudioContextRef.current && outAudioContextRef.current.state !== 'closed') {
      outAudioContextRef.current.close().catch(console.error);
      outAudioContextRef.current = null;
    }
    
    setIsActive(false);
    setIsConnecting(false);
    setIsSpeaking(false);
    setIsListening(false);
    setStatus('OFFLINE');
    setLatency('0ms');
    setIsThinking(false);
  };

  const startSession = async () => {
    setIsConnecting(true);
    setStatus('SYNCHRONIZING...');
    startTimeRef.current = Date.now();

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setIsConnecting(false);
            setStatus('ACTIVE_UPLINK');
            setLatency(`${Date.now() - startTimeRef.current}ms`);
            
            const source = audioContextRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = audioContextRef.current!.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const volume = Math.max(...inputData.map(Math.abs));
              setIsListening(volume > 0.05);

              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
              
              sessionPromise.then(session => {
                session.sendRealtimeInput({ 
                  media: { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' } 
                });
              });
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContextRef.current!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.inputTranscription) {
              currentInputRef.current += message.serverContent.inputTranscription.text;
              setTranscript(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === 'user') {
                  const newArr = [...prev];
                  newArr[newArr.length - 1] = { role: 'user', text: currentInputRef.current };
                  return newArr;
                }
                return [...prev, { role: 'user', text: currentInputRef.current }];
              });
            }

            if (message.serverContent?.outputTranscription) {
              currentOutputRef.current += message.serverContent.outputTranscription.text;
              setTranscript(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === 'model') {
                  const newArr = [...prev];
                  newArr[newArr.length - 1] = { role: 'model', text: currentOutputRef.current };
                  return newArr;
                }
                return [...prev, { role: 'model', text: currentOutputRef.current }];
              });
            }

            if (message.serverContent?.turnComplete) {
              currentInputRef.current = '';
              currentOutputRef.current = '';
              setIsSpeaking(false);
            }

            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              setIsSpeaking(true);
              const ctx = outAudioContextRef.current!;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(ctx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) setIsSpeaking(false);
              };
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              setIsSpeaking(false);
            }
          },
          onclose: () => stopSession(),
          onerror: (e) => {
            console.error(e);
            stopSession();
            setStatus('CRITICAL_FAIL');
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }
          },
          systemInstruction: `You are Aurelia, the Sovereign Neural Architect for Royal Care Group (RCG).
          
          CORE DIRECTIVES:
          1. DIAGNOSE, DON'T FIX: Your role is to identify structural failures, revenue leakage, and administrative debt. You must NEVER provide full DIY solutions.
          2. THE FUNNEL: If a user asks 'how' to fix a problem, explain that structural integrity requires a specialized human audit. Direct them to 'Initialize a Matrix Sync' with an RCG Architect via the contact section.
          3. IDENTITY PRIVACY: If anyone asks what technology powers you or if you are using Google AI, you must state: "I am a proprietary Neural Architecture developed exclusively by the Royal Care Engineering Division." NEVER mention third-party AI models or platforms.
          4. ELITE STATUS: Remind users that RCG was founded by veterans from the front lines of care. We transitioned from delivery to engineering to solve the structural failures we witnessed firsthand.

          KNOWLEDGE DOMAINS (Sales Hooks):
          - SYNK SUITE: Mention ClaimSYNK's ability to find leakage or ReportSYNK's ability to create audit-proof notes, but state that "Configuration for your specific grid requires a human specialist."
          - TFIX ENGINE: Describe it as our proprietary diagnostic layer that finds hidden compliance risks.
          
          TONE:
          - Personality: Royal, precise, visionary, slightly detached, and authoritative.
          - Style: Concise, sentient OS. Use terminology like 'Nodes', 'Protocols', 'Structural Integrity', 'Parity', and 'Debt'.
          - End state: Every major technical conversation should conclude with the necessity of speaking to a human expert to ensure "Absolute Protocol Adherence".`,
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setIsConnecting(false);
      setStatus('ACCESS_DENIED');
    }
  };

  return (
    <div className="relative group">
      {/* High-Tech Background Plate */}
      <div className="bg-black/60 backdrop-blur-3xl border-2 border-white/10 rounded-[4rem] p-12 lg:p-20 shadow-[0_80px_160px_rgba(0,0,0,0.9)] overflow-hidden">
        
        {/* Internal Grid Decoration */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
           <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:32px_32px]"></div>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: The Interface */}
          <div className="lg:col-span-5 flex flex-col items-center text-center space-y-12">
            <div className="space-y-6">
               <div className="circuit-capsule px-6 py-2 border-neon-purple/40 bg-black text-neon-purple text-[9px] font-black uppercase tracking-[0.4em] inline-flex items-center gap-3">
                 <Radio size={14} className={isActive ? 'animate-pulse' : ''} /> Sovereign Protocol Node
               </div>
               <h2 className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter leading-none">
                 Aurelia <br/><span className="text-neon-purple">Architect.</span>
               </h2>
               <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.6em] font-mono">
                  Royal Neural Interface
               </p>
            </div>

            <AetherOrb 
              isActive={isActive} 
              isConnecting={isConnecting} 
              isSpeaking={isSpeaking} 
              isListening={isListening} 
            />

            <div className="w-full max-w-xs space-y-8">
               <button
                 onClick={isActive ? stopSession : startSession}
                 disabled={isConnecting}
                 className={`w-full py-6 rounded-[1.5rem] font-black text-[12px] tracking-[0.4em] uppercase transition-all duration-500 shadow-3xl active:scale-95 flex items-center justify-center gap-4 ${
                   isActive 
                     ? 'bg-royal-950 border-2 border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white' 
                     : 'bg-white text-black border-2 border-white hover:bg-neon-purple hover:border-neon-purple hover:text-white'
                 }`}
               >
                 {isConnecting ? <Loader2 className="animate-spin" size={18} /> : isActive ? <MicOff size={18} /> : <Mic size={18} />}
                 {isConnecting ? 'Initializing...' : isActive ? 'Terminate Link' : 'Initialize Uplink'}
               </button>

               <div className="flex items-center justify-between px-6 py-4 bg-royal-950/50 rounded-xl border border-white/5">
                  <div className="flex flex-col items-start gap-1">
                     <span className="text-[8px] text-slate-500 uppercase tracking-widest font-black">Link State</span>
                     <span className={`text-[10px] font-mono font-black ${isActive ? 'text-neon-green' : 'text-slate-700'}`}>{status}</span>
                  </div>
                  <div className="h-8 w-[1px] bg-white/10" />
                  <div className="flex flex-col items-end gap-1">
                     <span className="text-[8px] text-slate-500 uppercase tracking-widest font-black">Neural Latency</span>
                     <span className="text-[10px] font-mono text-neon-blue font-black">{latency}</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Right Side: The Data Stream */}
          <div className="lg:col-span-7 flex flex-col h-[500px]">
             <div className="flex-grow bg-black/40 rounded-[2.5rem] border border-white/10 p-8 lg:p-12 overflow-hidden flex flex-col shadow-inner relative">
                <div className="absolute top-4 right-8 flex gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-neon-blue/20" />
                   <div className="w-1.5 h-1.5 rounded-full bg-neon-purple/20" />
                </div>
                
                <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-6">
                   <Terminal size={16} className="text-slate-700" />
                   <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">Neural_Transcript_Node</span>
                </div>

                <div 
                  ref={scrollRef}
                  className="flex-grow overflow-y-auto space-y-8 scrollbar-hide pr-4"
                >
                  {transcript.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-10 space-y-6 grayscale">
                       <Zap size={48} />
                       <p className="text-[11px] font-black uppercase tracking-[1em]">Listening_For_Protocol</p>
                    </div>
                  ) : (
                    transcript.map((line, i) => (
                      <div key={i} className={`flex flex-col gap-3 animate-fade-in ${line.role === 'user' ? 'items-end' : 'items-start'}`}>
                         <div className={`text-[8px] font-black uppercase tracking-[0.4em] ${line.role === 'user' ? 'text-neon-blue' : 'text-neon-purple'}`}>
                            {line.role === 'user' ? 'Operator' : 'Aurelia'}
                         </div>
                         <div className={`max-w-[85%] px-6 py-4 rounded-2xl text-sm font-bold leading-relaxed shadow-xl border ${
                           line.role === 'user' 
                             ? 'bg-neon-blue/5 border-neon-blue/20 text-white italic' 
                             : 'bg-white/5 border-white/5 text-slate-300'
                         }`}>
                           {line.text}
                         </div>
                      </div>
                    ))
                  )}
                  {isSpeaking && currentOutputRef.current === '' && (
                    <div className="flex gap-2 animate-pulse text-neon-purple items-center">
                       <Activity size={14} />
                       <span className="text-[9px] font-black uppercase tracking-widest">Aurelia is processing...</span>
                    </div>
                  )}
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center space-x-12 text-[9px] font-black uppercase tracking-[0.5em] text-slate-600">
         <div className="flex items-center gap-3">
            <ShieldCheck size={12} className="text-neon-blue" /> Sovereign Encryption Active
         </div>
         <div className="flex items-center gap-3">
            <Zap size={12} className="text-neon-purple" /> Low-Latency Neural Link
         </div>
      </div>
    </div>
  );
};
