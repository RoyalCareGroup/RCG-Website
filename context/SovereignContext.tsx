
import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

interface SovereignContextType {
  isThinking: boolean;
  setIsThinking: (state: boolean) => void;
  triggerPulse: (x: number, y: number) => void;
  lastPulse: { x: number, y: number, id: number } | null;
  getAudioContext: () => AudioContext;
  audioReady: boolean;
  initializeAudio: () => Promise<void>;
}

const SovereignContext = createContext<SovereignContextType | undefined>(undefined);

export const SovereignProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [isThinking, setIsThinking] = useState(false);
  const [lastPulse, setLastPulse] = useState<{ x: number, y: number, id: number } | null>(null);
  const [audioReady, setAudioReady] = useState(false);
  const masterCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!masterCtxRef.current) {
      const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
      masterCtxRef.current = new AudioContextClass({ sampleRate: 24000, latencyHint: 'interactive' });
    }
    return masterCtxRef.current!;
  }, []);

  const initializeAudio = useCallback(async () => {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
    // Immediate handshake tone (satisfies transient activation)
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
    setAudioReady(true);
  }, [getAudioContext]);

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
      initializeAudio 
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
