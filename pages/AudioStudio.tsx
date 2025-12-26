
import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Radio, Terminal, Volume2, Loader2, Zap, ShieldCheck, Activity } from 'lucide-react';
import { GoogleGenAI, Modality } from '@google/genai';

// --- HELPER FUNCTIONS ---
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
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

const AudioStudio: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [transcript, setTranscript] = useState<{ role: string; text: string }[]>([]);
  const [currentModelText, setCurrentModelText] = useState('');
  const [currentUserText, setCurrentUserText] = useState('');
  
  const audioContextsRef = useRef<{ input: AudioContext; output: AudioContext } | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript, currentModelText, currentUserText]);

  const stopSession = () => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (audioContextsRef.current) {
      audioContextsRef.current.input.close();
      audioContextsRef.current.output.close();
      audioContextsRef.current = null;
    }
    sourcesRef.current.forEach(source => source.stop());
    sourcesRef.current.clear();
    setIsConnected(false);
    setIsConnecting(false);
  };

  const startSession = async () => {
    setIsConnecting(true);
    try {
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextsRef.current = { input: inputCtx, output: outputCtx };
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            setIsConnected(true);
            setIsConnecting(false);
            
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              
              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: any) => {
            // Audio output
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio && audioContextsRef.current) {
              const { output } = audioContextsRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, output.currentTime);
              
              const audioBuffer = await decodeAudioData(decode(base64Audio), output, 24000, 1);
              const sourceNode = output.createBufferSource();
              sourceNode.buffer = audioBuffer;
              sourceNode.connect(output.destination);
              sourceNode.addEventListener('ended', () => {
                sourcesRef.current.delete(sourceNode);
              });
              sourceNode.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(sourceNode);
            }

            // Interruptions
            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }

            // Transcription
            if (message.serverContent?.inputTranscription) {
              setCurrentUserText(prev => prev + message.serverContent.inputTranscription.text);
            }
            if (message.serverContent?.outputTranscription) {
              setCurrentModelText(prev => prev + message.serverContent.outputTranscription.text);
            }
            if (message.serverContent?.turnComplete) {
              setTranscript(prev => [
                ...prev, 
                { role: 'OPERATOR', text: currentUserText },
                { role: 'SYNK_CORE', text: currentModelText }
              ]);
              setCurrentUserText('');
              setCurrentModelText('');
            }
          },
          onerror: (e) => {
            console.error("Neural Node error:", e);
            stopSession();
          },
          onclose: () => {
            setIsConnected(false);
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }
          },
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          systemInstruction: 'You are the Royal Care Neural Audio Interface. You are an elite NDIS technical consultant. Your tone is high-tech, human-like, precise, and supportive. You assist providers with scaling their operations and maintaining high compliance standards. Speak concisely.'
        }
      });
      
      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error("Link establishment failed:", err);
      setIsConnecting(false);
    }
  };

  return (
    <div className="pt-32 pb-32 px-6 min-h-screen animate-fade-in relative overflow-hidden bg-royal-950">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-neon-blue/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-neon-blue/30 bg-neon-blue/10 text-neon-blue text-[10px] font-black tracking-[0.4em] mb-6 uppercase">
            <Radio size={14} className="mr-2 animate-pulse" /> Neural Audio Protocol
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-black text-white mb-6 uppercase tracking-tighter leading-none">
            Voice<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-pink-500">Interface.</span>
          </h1>
          <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto">
            Low-latency voice interaction with the RCG Intelligence Engine. Grounded in NDIS policy and organizational architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Visualizer Area */}
          <div className="lg:col-span-7">
            <div className="glass border border-royal-800 rounded-[3rem] p-12 min-h-[500px] flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
               <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
               
               {/* Animated Pulse Circle */}
               <div className={`relative w-64 h-64 rounded-full border-4 border-dashed transition-all duration-700 flex items-center justify-center ${
                 isConnected ? 'border-neon-blue animate-spin-slow shadow-[0_0_50px_rgba(6,182,212,0.3)]' : 'border-royal-800'
               }`}>
                  <div className={`w-48 h-48 rounded-full border-2 transition-all duration-700 flex items-center justify-center ${
                    isConnected ? 'border-neon-purple animate-spin-reverse-slow shadow-[0_0_30px_rgba(217,70,239,0.2)]' : 'border-royal-900'
                  }`}>
                    <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-transform duration-300 ${isConnected ? 'scale-110' : 'scale-100'}`}>
                      {isConnected ? (
                        <Mic size={64} className="text-neon-blue animate-pulse" />
                      ) : isConnecting ? (
                        <Loader2 size={64} className="text-neon-purple animate-spin" />
                      ) : (
                        <MicOff size={64} className="text-slate-700" />
                      )}
                    </div>
                  </div>
               </div>

               <div className="mt-16 text-center space-y-4">
                  <h3 className="text-2xl font-display font-black text-white uppercase tracking-tighter">
                    {isConnected ? 'Neural Link Active' : isConnecting ? 'Establishing Uplink...' : 'Interface Standby'}
                  </h3>
                  <div className="flex justify-center gap-2">
                     <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-neon-green animate-pulse shadow-[0_0_5px_#10b981]' : 'bg-royal-800'}`}></div>
                     <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-neon-blue animate-pulse' : 'bg-royal-800'}`} style={{ animationDelay: '0.2s' }}></div>
                     <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-neon-purple animate-pulse' : 'bg-royal-800'}`} style={{ animationDelay: '0.4s' }}></div>
                  </div>
               </div>

               <button
                  onClick={isConnected ? stopSession : startSession}
                  disabled={isConnecting}
                  className={`mt-12 px-12 py-5 rounded-2xl font-black text-[11px] tracking-[0.5em] uppercase transition-all flex items-center gap-4 ${
                    isConnected 
                      ? 'bg-red-500/10 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white' 
                      : 'bg-neon-blue text-white shadow-xl hover:scale-105 shadow-neon-blue/20'
                  }`}
               >
                  {isConnected ? <Zap size={18} /> : isConnecting ? <Loader2 size={18} className="animate-spin" /> : <PlayIcon size={18} />}
                  {isConnected ? 'Terminate Link' : isConnecting ? 'Linking...' : 'Initialize Uplink'}
               </button>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass p-6 rounded-2xl border border-royal-800 flex items-center gap-4">
                <div className="p-3 bg-neon-blue/20 rounded-xl text-neon-blue">
                   <ShieldCheck size={20} />
                </div>
                <div>
                   <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Compliance Node</div>
                   <div className="text-[10px] font-mono text-white tracking-widest">NDIS_GND_v5.4</div>
                </div>
              </div>
              <div className="glass p-6 rounded-2xl border border-royal-800 flex items-center gap-4">
                <div className="p-3 bg-neon-purple/20 rounded-xl text-neon-purple">
                   <Activity size={20} />
                </div>
                <div>
                   <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">PCM Stream</div>
                   <div className="text-[10px] font-mono text-white tracking-widest">24kHz / 16-bit</div>
                </div>
              </div>
            </div>
          </div>

          {/* Transcript Area */}
          <div className="lg:col-span-5 h-[700px] flex flex-col">
             <div className="glass border border-royal-800 rounded-[3rem] flex-grow flex flex-col overflow-hidden shadow-2xl">
                <div className="p-8 border-b border-royal-800 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <Terminal size={18} className="text-neon-blue" />
                      <h4 className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Live Stream Feed</h4>
                   </div>
                   <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Buffer Status: OK</div>
                </div>
                
                <div className="flex-grow overflow-y-auto p-8 space-y-6 scrollbar-thin font-mono">
                   {transcript.map((msg, idx) => (
                      <div key={idx} className="space-y-1 animate-fade-in">
                         <div className={`text-[9px] font-black tracking-widest uppercase ${msg.role === 'OPERATOR' ? 'text-neon-blue' : 'text-neon-purple'}`}>
                            [{msg.role}]
                         </div>
                         <div className="text-[12px] text-slate-400 leading-relaxed pl-4 border-l border-royal-800">
                            {msg.text}
                         </div>
                      </div>
                   ))}
                   
                   {currentUserText && (
                      <div className="space-y-1 opacity-60">
                         <div className="text-[9px] font-black tracking-widest uppercase text-neon-blue">
                            [OPERATOR_INPUT]
                         </div>
                         <div className="text-[12px] text-slate-500 leading-relaxed pl-4 border-l border-royal-800 animate-pulse">
                            {currentUserText}
                         </div>
                      </div>
                   )}

                   {currentModelText && (
                      <div className="space-y-1">
                         <div className="text-[9px] font-black tracking-widest uppercase text-neon-purple">
                            [CORE_SYNTH]
                         </div>
                         <div className="text-[12px] text-slate-200 leading-relaxed pl-4 border-l border-neon-purple/50">
                            {currentModelText}
                         </div>
                      </div>
                   )}

                   {transcript.length === 0 && !currentModelText && !currentUserText && (
                      <div className="h-full flex flex-col items-center justify-center text-center opacity-20 grayscale py-20">
                         <Volume2 size={48} className="mb-4" />
                         <p className="text-[10px] font-black uppercase tracking-[0.4em]">No neural data in buffer</p>
                      </div>
                   )}
                   <div ref={transcriptEndRef} />
                </div>

                <div className="p-6 bg-royal-900/50 border-t border-royal-800">
                   <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-widest text-slate-600">
                      <span>Neural Parity: 98.4%</span>
                      <span>Link Encrypted (AES-256)</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlayIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

export default AudioStudio;
