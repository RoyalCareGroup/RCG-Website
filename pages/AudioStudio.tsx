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
  const audioContextsRef = useRef<{ input: AudioContext; output: AudioContext } | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [transcript, currentModelText, currentUserText]);

  const stopSession = () => {
    if (sessionRef.current) sessionRef.current.close();
    if (streamRef.current) streamRef.current.getTracks().forEach(track => track.stop());
    if (audioContextsRef.current) { audioContextsRef.current.input.close(); audioContextsRef.current.output.close(); }
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
              sourcesRef.current.add(sourceNode); sourceNode.onended = () => sourcesRef.current.delete(sourceNode);
            }
            if (m.serverContent?.inputTranscription) setCurrentUserText(p => p + m.serverContent.inputTranscription.text);
            if (m.serverContent?.outputTranscription) setCurrentModelText(p => p + m.serverContent.outputTranscription.text);
            if (m.serverContent?.turnComplete) {
              setTranscript(p => [...p, { role: 'OPERATOR', text: currentUserText }, { role: 'SYNK_CORE', text: currentModelText }]);
              setCurrentUserText(''); setCurrentModelText('');
            }
          },
          onerror: () => stopSession(), onclose: () => setIsConnected(false)
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          inputAudioTranscription: {}, outputAudioTranscription: {},
          systemInstruction: 'You are the Royal Care Neural Audio Interface. Speak concisely, high-tech, and precisely.'
        }
      });
      sessionRef.current = await sessionPromise;
    } catch (err) { setIsConnecting(false); }
  };

  return (
    <div className="pt-32 pb-32 px-6 min-h-screen animate-fade-in relative overflow-hidden bg-royal-950">
      <div className="absolute top-0 left-0 w-full h-[600px] bg-neon-blue/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-neon-blue/30 bg-neon-blue/10 text-neon-blue text-[10px] font-black tracking-[0.4em] mb-6 uppercase">
            <Radio size={14} className="mr-2 animate-pulse" /> Neural Audio Protocol
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6 uppercase tracking-tighter leading-none">
            Voice<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-pink-500">Interface.</span>
          </h1>
          <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto">Low-latency voice interaction with the RCG Intelligence Engine.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <div className="glass border border-royal-800 rounded-[3rem] p-12 min-h-[500px] flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
               <div className={`relative w-64 h-64 rounded-full border-4 border-dashed transition-all duration-700 flex items-center justify-center ${isConnected ? 'border-neon-blue animate-spin-slow shadow-[0_0_50px_rgba(6,182,212,0.3)]' : 'border-royal-800'}`}>
                  {isConnected ? <Mic size={64} className="text-neon-blue animate-pulse" /> : isConnecting ? <Loader2 size={64} className="text-neon-purple animate-spin" /> : <MicOff size={64} className="text-slate-700" />}
               </div>
               <button
                  onClick={isConnected ? stopSession : startSession}
                  disabled={isConnecting}
                  className={`mt-12 px-12 py-5 rounded-2xl font-black text-[11px] tracking-[0.5em] uppercase transition-all flex items-center gap-4 ${isConnected ? 'bg-red-500/10 border border-red-500/50 text-red-500 hover:bg-red-500' : 'bg-white text-black hover:bg-neon-blue hover:text-white border border-transparent hover:border-neon-blue/50 shadow-xl'}`}
               >
                  {isConnected ? <Zap size={18} /> : isConnecting ? <Loader2 size={18} className="animate-spin" /> : <Activity size={18} />}
                  {isConnected ? 'Terminate Link' : isConnecting ? 'Linking...' : 'Initialize Uplink'}
               </button>
            </div>
          </div>
          <div className="lg:col-span-5 h-[700px] flex flex-col">
             <div className="glass border border-royal-800 rounded-[3rem] flex-grow flex flex-col overflow-hidden shadow-2xl">
                <div className="p-8 border-b border-royal-800 flex items-center justify-between">
                   <h4 className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Live Stream Feed</h4>
                </div>
                <div className="flex-grow overflow-y-auto p-8 space-y-6 scrollbar-thin font-mono text-[12px] text-slate-400">
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