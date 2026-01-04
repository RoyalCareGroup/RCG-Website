
import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

interface SovereignContextType {
  isThinking: boolean;
  setIsThinking: (state: boolean) => void;
  triggerPulse: (x: number, y: number) => void;
  lastPulse: { x: number, y: number, id: number } | null;
  getAudioContext: () => AudioContext;
  audioReady: boolean;
  initializeAudio: () => Promise<void>;
  stopHeartbeat: () => void;
}

const SovereignContext = createContext<SovereignContextType | undefined>(undefined);

export const SovereignProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [isThinking, setIsThinking] = useState(false);
  const [lastPulse, setLastPulse] = useState<{ x: number, y: number, id: number } | null>(null);
  const [audioReady, setAudioReady] = useState(false);
  const masterCtxRef = useRef<AudioContext | null>(null);
  const heartbeatRef = useRef<OscillatorNode | null>(null);

  const getAudioContext = useCallback(() => {
    if (!masterCtxRef.current) {
      const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
      masterCtxRef.current = new AudioContextClass({ sampleRate: 24000, latencyHint: 'interactive' });
    }
    return masterCtxRef.current!;
  }, []);

  const stopHeartbeat = useCallback(() => {
    if (heartbeatRef.current) {
      try {
        heartbeatRef.current.stop();
        heartbeatRef.current.disconnect();
      } catch (e) {}
      heartbeatRef.current = null;
    }
  }, []);

  const initializeAudio = useCallback(async () => {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    // 1. Initial Handshake Tone
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);

    // 2. Persistent Heartbeat (Keeps the audio gate OPEN during network latency)
    stopHeartbeat(); // Clear previous
    const heartbeat = ctx.createOscillator();
    const silentGain = ctx.createGain();
    heartbeat.frequency.setValueAtTime(1, ctx.currentTime); // Inaudible
    silentGain.gain.setValueAtTime(0.0001, ctx.currentTime); // Virtually silent
    heartbeat.connect(silentGain);
    silentGain.connect(ctx.destination);
    heartbeat.start();
    heartbeatRef.current = heartbeat;

    setAudioReady(true);
  }, [getAudioContext, stopHeartbeat]);

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
      stopHeartbeat
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
