import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { Mic, MicOff, Loader2, Volume2, ShieldCheck, Sparkles, X, Terminal, Radio } from 'lucide-react';

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
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

export const LiveVoiceAssistant: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [status, setStatus] = useState('');
  const [transcription, setTranscription] = useState<{role: 'user' | 'model', text: string}[]>([]);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const outAudioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef(new Set<AudioBufferSourceNode>());
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentInputRef = useRef('');
  const currentOutputRef = useRef('');

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcription]);

  const stopSession = () => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    setIsActive(false);
    setIsConnecting(false);
    setStatus('Protocol link terminated.');
    currentInputRef.current = '';
    currentOutputRef.current = '';
  };

  const startSession = async () => {
    setIsConnecting(true);
    setStatus('Initializing Neural Link...');

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
            setStatus('Neural Link Synchronized.');
            
            const source = audioContextRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = audioContextRef.current!.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContextRef.current!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.inputTranscription) {
              const text = message.serverContent.inputTranscription.text;
              currentInputRef.current += text;
              setTranscription(prev => {
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
              const text = message.serverContent.outputTranscription.text;
              currentOutputRef.current += text;
              setTranscription(prev => {
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
            }

            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              const ctx = outAudioContextRef.current!;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(ctx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => stopSession(),
          onerror: (e) => {
            console.error(e);
            stopSession();
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
          },
          systemInstruction: 'You are the Royal Care Live Scout. You assist NDIS providers with information about our business consulting and technical SYNK roadmap. Be concise, futuristic, and helpful.',
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setIsConnecting(false);
      setStatus('Link Error: Check permissions.');
    }
  };

  return (
    <div className="bg-royal-900/40 border border-royal-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden backdrop-blur-3xl">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-blue animate-pulse"></div>
      
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
           <div className="flex items-center space-x-4">
              <div className="p-3 bg-neon-purple/10 rounded-2xl border border-neon-purple/20">
                <Radio size={20} className={`text-neon-purple ${isActive ? 'animate-pulse' : ''}`} />
              </div>
              <div>
                <h3 className="text-white font-display font-black uppercase tracking-[0.2em] text-sm">
                   Live Scout Interface
                </h3>
                <p className="text-[10px] text-slate-500 font-mono mt-1 uppercase tracking-widest">{status || 'Awaiting Authorization...'}</p>
              </div>
           </div>
           {isActive && (
              <button onClick={() => setTranscription([])} className="text-slate-600 hover:text-white transition-all p-2 rounded-lg hover:bg-royal-800">
                 <X size={18} />
              </button>
           )}
        </div>

        <div 
          ref={scrollRef}
          className="h-56 bg-royal-950/80 rounded-[1.5rem] border border-royal-800 p-6 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-royal-800 relative"
        >
          {transcription.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-700 text-center space-y-4">
              <Terminal size={32} className="opacity-10" />
              <p className="text-[11px] font-black uppercase tracking-[0.4em] opacity-40">Synchronizing Audio Feed...</p>
            </div>
          ) : (
            transcription.map((line, idx) => (
              <div key={idx} className={`flex ${line.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-[13px] ${
                  line.role === 'user' 
                    ? 'bg-neon-blue/10 border border-neon-blue/30 text-white font-medium' 
                    : 'bg-royal-800/50 border border-royal-700 text-slate-300'
                }`}>
                  <span className={`text-[9px] uppercase font-black tracking-widest block mb-1.5 ${line.role === 'user' ? 'text-neon-blue' : 'text-neon-purple'}`}>
                    {line.role === 'user' ? 'Operator' : 'RCG Scout'}
                  </span>
                  {line.text}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={isActive ? stopSession : startSession}
            disabled={isConnecting}
            className={`flex-shrink-0 w-20 h-20 rounded-[1.5rem] flex items-center justify-center transition-all duration-500 border-2 ${
              isActive 
                ? 'bg-red-500/10 border-red-500/50 text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)]' 
                : 'bg-royal-800 border-neon-blue/30 text-neon-blue hover:border-neon-blue hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:scale-105 active:scale-95'
            }`}
          >
            {isConnecting ? <Loader2 className="animate-spin" size={28} /> : isActive ? <MicOff size={28} /> : <Mic size={28} />}
          </button>
          
          <div className="flex-1 bg-royal-950/50 rounded-[1.5rem] border border-royal-800 p-5 flex items-center justify-between">
            <div className="space-y-1.5">
               <div className="flex items-center space-x-2.5">
                  <div className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]' : 'bg-slate-800'}`}></div>
                  <span className="text-[11px] font-black text-white uppercase tracking-[0.2em]">
                    {isActive ? 'Protocol Active' : 'Offline'}
                  </span>
               </div>
               <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest leading-none">Stream: 24kHz / 16-bit Mono</p>
            </div>
            <Volume2 size={20} className={isActive ? 'text-neon-purple animate-bounce' : 'text-slate-800'} />
          </div>
        </div>

        <div className="flex items-center justify-center space-x-8 text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">
           <div className="flex items-center"><ShieldCheck size={12} className="mr-2 text-neon-blue"/> Sovereignty Layer</div>
           <div className="flex items-center"><Sparkles size={12} className="mr-2 text-neon-purple"/> Neural v2.5</div>
        </div>
      </div>
    </div>
  );
};