import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';

interface TranscriptLine {
  role: 'user' | 'model';
  text: string;
}

interface SovereignContextType {
  isThinking: boolean;
  setIsThinking: (state: boolean) => void;
  triggerPulse: (x: number, y: number) => void;
  lastPulse: { x: number, y: number, id: number } | null;
  getAudioContext: () => AudioContext;
  audioReady: boolean;
  initializeAudio: () => Promise<boolean>;
  stopHeartbeat: () => void;
  
  // Welcome Audio Visualizer Support
  isWelcomePlaying: boolean;
  setIsWelcomePlaying: (playing: boolean) => void;
  welcomeAnalyser: AnalyserNode | null;
  setWelcomeAnalyser: (analyser: AnalyserNode | null) => void;

  // Aurelia Global State
  aureliaActive: boolean;
  aureliaConnecting: boolean;
  aureliaSpeaking: boolean;
  aureliaListening: boolean;
  aureliaStatus: string;
  aureliaTranscript: TranscriptLine[];
  startAurelia: () => Promise<void>;
  stopAurelia: () => void;
  clearAureliaTranscript: () => void;
}

const SovereignContext = createContext<SovereignContextType | undefined>(undefined);

export const SovereignProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [isThinking, setIsThinking] = useState(false);
  const [lastPulse, setLastPulse] = useState<{ x: number, y: number, id: number } | null>(null);
  const [audioReady, setAudioReady] = useState(false);
  
  // Welcome State
  const [isWelcomePlaying, setIsWelcomePlaying] = useState(false);
  const [welcomeAnalyser, setWelcomeAnalyser] = useState<AnalyserNode | null>(null);

  const [aureliaActive, setAureliaActive] = useState(false);
  const [aureliaConnecting, setAureliaConnecting] = useState(false);
  const [aureliaSpeaking, setAureliaSpeaking] = useState(false);
  const [aureliaListening, setAureliaListening] = useState(false);
  const [aureliaStatus, setAureliaStatus] = useState('STANDBY');
  const [aureliaTranscript, setAureliaTranscript] = useState<TranscriptLine[]>([]);

  const masterCtxRef = useRef<AudioContext | null>(null);
  const heartbeatRef = useRef<OscillatorNode | null>(null);
  const sessionRef = useRef<any>(null);
  const sourcesRef = useRef(new Set<AudioBufferSourceNode>());
  const nextStartTimeRef = useRef(0);
  const streamRef = useRef<MediaStream | null>(null);

  const getAudioContext = useCallback(() => {
    if (!masterCtxRef.current) {
      const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
      masterCtxRef.current = new AudioContextClass({ 
        sampleRate: 24000, 
        latencyHint: 'interactive' 
      });
    }
    return masterCtxRef.current!;
  }, []);

  const stopHeartbeat = useCallback(() => {
    if (heartbeatRef.current) {
      try { heartbeatRef.current.stop(); heartbeatRef.current.disconnect(); } catch (e) {}
      heartbeatRef.current = null;
    }
  }, []);

  const initializeAudio = useCallback(async (): Promise<boolean> => {
    try {
      const ctx = getAudioContext();
      if (ctx.state === 'suspended') await ctx.resume();
      
      if (!heartbeatRef.current) {
        const heartbeat = ctx.createOscillator();
        const silentGain = ctx.createGain();
        heartbeat.frequency.setValueAtTime(1, ctx.currentTime);
        silentGain.gain.setValueAtTime(0.000001, ctx.currentTime);
        heartbeat.connect(silentGain);
        silentGain.connect(ctx.destination);
        heartbeat.start();
        heartbeatRef.current = heartbeat;
      }

      setAudioReady(true);
      return true;
    } catch (err) {
      setAudioReady(false);
      return false;
    }
  }, [getAudioContext]);

  const stopAurelia = useCallback(() => {
    if (sessionRef.current) { sessionRef.current.close(); sessionRef.current = null; }
    if (streamRef.current) { streamRef.current.getTracks().forEach(t => t.stop()); streamRef.current = null; }
    sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
    sourcesRef.current.clear();
    setAureliaActive(false);
    setAureliaConnecting(false);
    setAureliaSpeaking(false);
    setAureliaListening(false);
    setAureliaStatus('OFFLINE');
    setIsThinking(false);
  }, []);

  const startAurelia = async () => {
    setAureliaConnecting(true);
    setAureliaStatus('INITIATING_BOND');
    const bonded = await initializeAudio();
    if (!bonded) { setAureliaConnecting(false); setAureliaStatus('HARDWARE_BLOCKED'); return; }

    const ctx = getAudioContext();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setAureliaActive(true); setAureliaConnecting(false); setAureliaStatus('CONNECTED');
            const source = ctx.createMediaStreamSource(stream);
            const scriptProcessor = ctx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const volume = Math.max(...inputData.map(Math.abs));
              setAureliaListening(volume > 0.05);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
              sessionPromise.then(session => { if (session) session.sendRealtimeInput({ media: { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' } }); });
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(ctx.destination);
          },
          onmessage: async (message) => {
            if (message.serverContent?.modelTurn?.parts) {
               setIsThinking(true);
               // Audio handling logic...
            }
          },
          onclose: () => stopAurelia(),
          onerror: () => stopAurelia()
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          systemInstruction: "You are Aurelia, NDIS peer strategist."
        }
      });
      sessionRef.current = await sessionPromise;
    } catch (err) { setAureliaConnecting(false); setAureliaStatus('LINK_FAILED'); }
  };

  const triggerPulse = useCallback((x: number, y: number) => {
    setLastPulse({ x, y, id: Date.now() });
  }, []);

  return (
    <SovereignContext.Provider value={{ 
      isThinking, setIsThinking, triggerPulse, lastPulse, getAudioContext, audioReady, initializeAudio, stopHeartbeat,
      isWelcomePlaying, setIsWelcomePlaying, welcomeAnalyser, setWelcomeAnalyser,
      aureliaActive, aureliaConnecting, aureliaSpeaking, aureliaListening, aureliaStatus, aureliaTranscript, startAurelia, stopAurelia, clearAureliaTranscript: () => setAureliaTranscript([])
    }}>
      {children}
    </SovereignContext.Provider>
  );
};

function encode(bytes: Uint8Array) { let b = ''; for (let i = 0; i < bytes.byteLength; i++) b += String.fromCharCode(bytes[i]); return btoa(b); }
function decode(base64: string) { const s = atob(base64); const b = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) b[i] = s.charCodeAt(i); return b; }
async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const al = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
  const dataInt16 = new Int16Array(al, 0, Math.floor(al.byteLength / 2));
  const fc = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, fc, sampleRate);
  for (let c = 0; c < numChannels; c++) { const cd = buffer.getChannelData(c); for (let i = 0; i < fc; i++) cd[i] = dataInt16[i * numChannels + c] / 32768.0; }
  return buffer;
}

export const useSovereign = () => {
  const context = useContext(SovereignContext);
  if (!context) throw new Error('useSovereign must be used within a SovereignProvider');
  return context;
};