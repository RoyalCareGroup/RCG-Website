import React, { useState, useEffect } from 'react';
import { ShieldCheck, Zap, Loader2 } from 'lucide-react';
import { useSovereign } from '../context/SovereignContext.tsx';

interface SovereignConsentProps {
  onAccepted?: () => void;
}

export const SovereignConsent: React.FC<SovereignConsentProps> = ({ onAccepted }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const { initializeAudio, getAudioContext } = useSovereign();

  useEffect(() => {
    const consent = localStorage.getItem('rcg_structural_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = async () => {
    if (isInitializing) return;
    setIsInitializing(true);

    const success = await initializeAudio();
    if (!success) {
      setIsInitializing(false);
      return;
    }

    // Silence trigger to unlock hardware
    const ctx = getAudioContext();
    const silentBuf = ctx.createBuffer(1, 1, 22050);
    const silentSource = ctx.createBufferSource();
    silentSource.buffer = silentBuf;
    silentSource.connect(ctx.destination);
    silentSource.start(0);

    localStorage.setItem('rcg_structural_consent', 'ACCEPTED_' + Date.now());
    
    setIsInitializing(false);
    setIsVisible(false);
    if (onAccepted) onAccepted();
  };

  const handleDecline = () => {
    localStorage.setItem('rcg_structural_consent', 'DECLINED_' + Date.now());
    setIsVisible(false);
    if (onAccepted) onAccepted();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center p-4 sm:p-10 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-xl animate-in fade-in duration-1000 pointer-events-auto" />

      <div className="max-w-4xl w-full bg-black/90 backdrop-blur-3xl border-2 border-neon-blue/30 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-14 shadow-[0_50px_150px_rgba(0,0,0,1)] pointer-events-auto flex flex-col md:flex-row items-center gap-8 sm:gap-10 animate-in slide-in-from-bottom-40 duration-1000">
        <div className="flex-shrink-0 p-4 sm:p-6 bg-neon-blue/10 rounded-3xl border border-neon-blue/20 relative group">
           <div className="absolute inset-0 bg-neon-blue/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <ShieldCheck className="text-neon-blue w-10 h-10 sm:w-16 sm:h-16 animate-pulse relative z-10" />
        </div>
        <div className="flex-grow space-y-3 sm:space-y-4 text-center md:text-left">
           <h3 className="text-white font-display font-black uppercase tracking-tight text-xl sm:text-4xl">Protocol: <span className="text-neon-blue">Grid Consent.</span></h3>
           <p className="text-slate-400 text-xs sm:text-base font-bold leading-relaxed italic opacity-80 max-w-2xl">"By accepting, you initialize the structural grid and bond your hardware for neural interaction nodes."</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full md:w-auto">
           <button onClick={handleAccept} disabled={isInitializing} className="px-8 py-5 sm:px-12 sm:py-6 bg-white text-black rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-[11px] uppercase tracking-[0.4em] hover:bg-neon-blue hover:text-white transition-all shadow-3xl active:scale-95 whitespace-nowrap flex items-center justify-center gap-3 disabled:opacity-50">
             {isInitializing ? <Loader2 className="animate-spin" size={14} /> : <Zap size={14} className="text-neon-purple" />}
             Accept Protocol
           </button>
           <button onClick={handleDecline} className="px-6 py-4 sm:px-8 sm:py-6 bg-royal-950 text-slate-500 rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-[11px] uppercase tracking-[0.4em] hover:text-white transition-all border border-white/5">Decline</button>
        </div>
      </div>
    </div>
  );
};