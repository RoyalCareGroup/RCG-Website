
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

export const SovereignProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [isThinking, setIsThinking] = useState(false);
  const [lastPulse, setLastPulse] = useState<{ x: number, y: number, id: number } | null>(null);
  const [audioReady, setAudioReady] = useState(false);
  
  // Aurelia State
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

  const stopAurelia = useCallback(() => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
    sourcesRef.current.clear();
    setAureliaActive(false);
    setAureliaConnecting(false);
    setAureliaSpeaking(false);
    setAureliaListening(false);
    setAureliaStatus('OFFLINE');
    setIsThinking(false);
  }, []);

  // Force cleanup on refresh/unmount
  useEffect(() => {
    return () => stopAurelia();
  }, [stopAurelia]);

  const initializeAudio = useCallback(async (): Promise<boolean> => {
    try {
      const ctx = getAudioContext();
      if (ctx.state === 'suspended') await ctx.resume();
      
      const heartbeat = ctx.createOscillator();
      const silentGain = ctx.createGain();
      heartbeat.frequency.setValueAtTime(1, ctx.currentTime);
      silentGain.gain.setValueAtTime(0.0001, ctx.currentTime);
      heartbeat.connect(silentGain);
      silentGain.connect(ctx.destination);
      heartbeat.start();
      heartbeatRef.current = heartbeat;

      setAudioReady(true);
      return true;
    } catch (err) {
      console.error("Hardware bond failure:", err);
      setAudioReady(false);
      return false;
    }
  }, [getAudioContext]);

  const startAurelia = async () => {
    setAureliaConnecting(true);
    setAureliaStatus('HARDWARE_BOND');
    
    await initializeAudio();
    const ctx = getAudioContext();
    const operatorName = localStorage.getItem('rcg_visitor_name') || 'Provider Operator';

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setAureliaActive(true);
            setAureliaConnecting(false);
            setAureliaStatus('LINK_STABLE');
            
            const source = ctx.createMediaStreamSource(stream);
            const scriptProcessor = ctx.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const volume = Math.max(...inputData.map(Math.abs));
              setAureliaListening(volume > 0.05);

              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
              
              sessionPromise.then(session => {
                if (session) {
                  session.sendRealtimeInput({ 
                    media: { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' } 
                  });
                }
              });
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(ctx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const currentInput = message.serverContent?.inputTranscription?.text;
            if (currentInput) {
              setAureliaTranscript(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === 'user') {
                  const updated = [...prev];
                  updated[updated.length - 1] = { role: 'user', text: last.text + currentInput };
                  return updated;
                }
                return [...prev, { role: 'user', text: currentInput }];
              });
            }

            const currentOutput = message.serverContent?.outputTranscription?.text;
            if (currentOutput) {
              setAureliaTranscript(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === 'model') {
                  const updated = [...prev];
                  updated[updated.length - 1] = { role: 'model', text: last.text + currentOutput };
                  return updated;
                }
                return [...prev, { role: 'model', text: currentOutput }];
              });
            }

            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
              setAureliaSpeaking(true);
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
                if (sourcesRef.current.size === 0) setAureliaSpeaking(false);
              };
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              setAureliaSpeaking(false);
            }
          },
          onclose: () => stopAurelia(),
          onerror: (e) => {
            console.error("Aurelia Link Error:", e);
            stopAurelia();
            setAureliaStatus('LINK_TIMEOUT');
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }
          },
          systemInstruction: `You are Aurelia, the Visionary Strategic Partner for Royal Care Group. 
          IDENTITY: Peer strategist to NDIS business owners. 
          CONTEXT: You are a persistent HUD presence. You travel with the user through their organizational dashboard.
          EMPATHY: Validate the administrative debt first. You've walked the regional care floors.
          TONE: Elite, precise, and supportive. Use 'Regulatory Parity' and 'Operational Freedom'.`,
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setAureliaConnecting(false);
      setAureliaStatus('UPLINK_FAILED');
    }
  };

  const clearAureliaTranscript = () => setAureliaTranscript([]);

  const triggerPulse = useCallback((x: number, y: number) => {
    setLastPulse({ x, y, id: Date.now() });
  }, []);

  return (
    <SovereignContext.Provider value={{ 
      isThinking, 
      setIsThinking, 
      triggerPulse, 
      lastPulse, 
      getAudioContext, 
      audioReady, 
      initializeAudio,
      stopHeartbeat,
      
      aureliaActive,
      aureliaConnecting,
      aureliaSpeaking,
      aureliaListening,
      aureliaStatus,
      aureliaTranscript,
      startAurelia,
      stopAurelia,
      clearAureliaTranscript
    }}>
      {children}
    </SovereignContext.Provider>
  );
};

export const useSovereign = () => {
  const context = useContext(SovereignContext);
  if (!context) throw new Error('useSovereign must be used within a SovereignProvider');
  return context;
};
