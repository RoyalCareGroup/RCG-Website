import React, { useState, useEffect } from 'react';
import { ShieldCheck, Info, X } from 'lucide-react';
import { useSovereign } from '../context/SovereignContext.tsx';

export const SovereignConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { initializeAudio } = useSovereign();

  useEffect(() => {
    const consent = localStorage.getItem('rcg_structural_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = async () => {
    // Structural Hardware Bond during click to bypass browser block
    await initializeAudio();
    localStorage.setItem('rcg_structural_consent', 'ACCEPTED_' + Date.now());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6 animate-in slide-in-from-bottom-20 duration-700 pointer-events-none">
      <div className="max-w-4xl mx-auto bg-black/90 backdrop-blur-2xl border-2 border-neon-blue/30 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] pointer-events-auto flex flex-col md:flex-row items-center gap-8">
        
        <div className="flex-shrink-0 p-4 bg-neon-blue/10 rounded-2xl border border-neon-blue/20">
           <ShieldCheck className="text-neon-blue w-8 h-8 sm:w-10 sm:h-10 animate-pulse" />
        </div>

        <div className="flex-grow space-y-3 text-center md:text-left">
           <h3 className="text-white font-display font-black uppercase tracking-tight text-xl sm:text-2xl">
              Protocol: <span className="text-neon-blue">Sovereign Compliance.</span>
           </h3>
           <p className="text-slate-400 text-xs sm:text-sm font-bold leading-relaxed italic opacity-80">
              "To architect high-fidelity provider systems, we utilize persistent organizational cookies. By accepting, you initialize the structural grid and bond your hardware for neural interaction."
           </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
           <button 
             onClick={handleAccept}
             className="px-10 py-5 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-[0.4em] hover:bg-neon-blue hover:text-white transition-all shadow-2xl active:scale-95 whitespace-nowrap"
           >
             Accept Protocol
           </button>
           <button 
             onClick={() => setIsVisible(false)}
             className="px-6 py-5 bg-royal-950 text-slate-500 rounded-xl font-black text-[10px] uppercase tracking-[0.4em] hover:text-white transition-all border border-white/5"
           >
             Decline
           </button>
        </div>

      </div>
    </div>
  );
};