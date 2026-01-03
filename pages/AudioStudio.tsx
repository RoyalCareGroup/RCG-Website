import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Radio, Terminal, Volume2, Loader2, Zap, ShieldCheck, Activity } from 'lucide-react';
import { GoogleGenAI, Modality } from '@google/genai';

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

const AudioStudio: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [transcript, setTranscript] = useState<{ role: string; text: string }[]>([]);
  const [currentModelText, setCurrentModelText] = useState('');
  const [currentUserText, setCurrentUserText] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const audioContextsRef = useRef<{ input: AudioContext; output: AudioContext } | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [transcript, currentModelText, currentUserText]);

  const stopSession = () => {
    if (sessionRef.current) sessionRef.current.close();
    if (streamRef.current) streamRef.current.getTracks().forEach(track => track.stop());
    if (audioContextsRef.current) { audioContextsRef.current.input.close(); audioContextsRef.current.output.close(); }
    sourcesRef.current.forEach(source => source.stop());
    sourcesRef.current.clear();
    setIsConnected(false); setIsConnecting(false);
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
            setIsConnected(true); setIsConnecting(false);
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
              sessionPromise.then(s => s.sendRealtimeInput({ media: { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' } }));
            };
            source.connect(scriptProcessor); scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (m: any) => {
            const base64 = m.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64 && audioContextsRef.current) {
              const { output } = audioContextsRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, output.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64), output, 24000, 1);
              const sourceNode = output.createBufferSource();
              sourceNode.buffer = audioBuffer; sourceNode.connect(output.destination);
              sourceNode.start(nextStartTimeRef.current); nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(sourceNode);
            }
            if (m.serverContent?.inputTranscription) setCurrentUserText(p => p + m.serverContent.inputTranscription.text);
            if (m.serverContent?.outputTranscription) setCurrentModelText(p => p + m.serverContent.outputTranscription.text);
            if (m.serverContent?.turnComplete) {
              setTranscript(p => [...p, { role: 'OPERATOR', text: currentUserText }, { role: 'SYNK_CORE', text: currentModelText }]);
              setCurrentUserText(''); setCurrentModelText('');
            }
          }
        },
        config: { responseModalities: [Modality.AUDIO], inputAudioTranscription: {}, outputAudioTranscription: {}, systemInstruction: 'Speak concisely, high-tech, and precisely.' }
      });
      sessionRef.current = await sessionPromise;
    } catch (err) { setIsConnecting(false); }
  };

  return (
    <div className="flex flex-col bg-[#334155] overflow-x-hidden min-h-screen selection:bg-neon-blue/30 selection:text-white px-6 sm:px-16 lg:px-24 xl:px-32 font-sans font-bold relative">
      
      {/* --- ATMOSPHERE NODES --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[#334155]"></div>
        <div 
          className="absolute inset-0 parallax-layer opacity-[0.04]"
          style={{ 
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 2px,transparent 2px), linear-gradient(90deg,rgba(255,255,255,0.06) 2px,transparent_2px)',
            backgroundSize: '120px 120px',
            transform: `translateY(${scrollY * -0.05}px)` 
          }}
        ></div>
        <div className="absolute top-[10%] left-[-10%] w-[100%] h-[100%] bg-neon-purple/[0.08] rounded-full blur-[200px] animate-blob-drift opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-15%] w-[100%] h-[100%] bg-neon-blue/[0.08] rounded-full blur-[250px] animate-blob-drift opacity-60"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.06] mix-blend-overlay"></div>
      </div>

      <div className="max-w-6xl mx-auto pt-48 pb-32 relative z-10">
        <div className="text-center mb-16 animate-hero-reveal">
          <div className="circuit-capsule border-2 border-white/80 bg-black text-white px-4 py-2 rounded-full text-[10px] font-black tracking-[0.4em] mb-6 uppercase shadow-2xl">
            <Radio size={14} className="mr-2 animate-pulse" /> Neural Audio Protocol
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-black text-white mb-6 uppercase tracking-tighter leading-none heading-wow">Voice<br/><span className="heading-tech">Interface.</span></h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <div className="orbital-tile border-2 border-white/10 rounded-[3rem] p-12 min-h-[500px] flex flex-col items-center justify-center relative overflow-hidden bg-black shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
               <div className={`relative w-64 h-64 rounded-full border-4 border-dashed transition-all duration-700 flex items-center justify-center ${isConnected ? 'border-neon-blue animate-spin-slow' : 'border-white/10'}`}>
                  {isConnected ? <Mic size={64} className="text-neon-blue animate-pulse" /> : isConnecting ? <Loader2 size={64} className="text-neon-purple animate-spin" /> : <MicOff size={64} className="text-white/10" />}
               </div>
               <button onClick={isConnected ? stopSession : startSession} disabled={isConnecting} className="slim-orbital-btn mt-12 px-16 py-8 text-black bg-white font-black text-[12px] tracking-[0.5em] uppercase transition-all shadow-3xl active:scale-95">
                  {isConnected ? 'Terminate Link' : isConnecting ? 'Linking...' : 'Initialize Uplink'}
               </button>
            </div>
          </div>
          <div className="lg:col-span-5 h-[700px] flex flex-col">
             <div className="orbital-tile border-2 border-white/10 rounded-[3rem] flex-grow flex flex-col overflow-hidden bg-black shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
                <div className="flex-grow overflow-y-auto p-12 space-y-8 scrollbar-hide font-mono text-sm">
                   {transcript.map((msg, i) => <div key={i}><span className={msg.role === 'OPERATOR' ? 'text-neon-blue' : 'text-neon-purple'}>[{msg.role}]</span> {msg.text}</div>)}
                   {currentUserText && <div><span className="text-neon-blue">[USER]</span> {currentUserText}</div>}
                   {currentModelText && <div><span className="text-neon-purple">[CORE]</span> {currentModelText}</div>}
                   <div ref={transcriptEndRef} />
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioStudio;