import React, { useState, useEffect } from 'react';
import { ShieldCheck, Zap, Loader2, Scale, ArrowRight } from 'lucide-react';
import { useSovereign } from '../context/SovereignContext.tsx';
import { Link } from 'react-router-dom';

interface SovereignConsentProps {
  onAccepted?: () => void;
}

export const SovereignConsent: React.FC<SovereignConsentProps> = ({ onAccepted }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const { initializeAudio, getAudioContext } = useSovereign();

  useEffect(() => {
    // Check immediately on mount for structural or legal flags
    const structuralConsent = localStorage.getItem('rcg_structural_consent');
    const legalConsent = localStorage.getItem('rcg_legal_v2');
    
    if (!structuralConsent || !legalConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = async () => {
    if (isInitializing) return;
    setIsInitializing(true);

    try {
      // Initialise audio hardware for all neural/voice features
      await initializeAudio();

      // Capture user gesture for AudioContext
      const ctx = getAudioContext();
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
      
      const silentBuf = ctx.createBuffer(1, 1, 22050);
      const silentSource = ctx.createBufferSource();
      silentSource.buffer = silentBuf;
      silentSource.connect(ctx.destination);
      silentSource.start(0);

      const stamp = Date.now();
      localStorage.setItem('rcg_structural_consent', 'ACCEPTED_' + stamp);
      localStorage.setItem('rcg_legal_v2', 'ENFORCED_PROTOCOL_' + stamp);
      
      setIsVisible(false);
      if (onAccepted) onAccepted();
    } catch (err) {
      console.warn("Hardware bonding partially failed. Continuing to UI...");
      // Still allow entry if audio fails
      const stamp = Date.now();
      localStorage.setItem('rcg_structural_consent', 'ACCEPTED_' + stamp);
      localStorage.setItem('rcg_legal_v2', 'ENFORCED_PROTOCOL_' + stamp);
      setIsVisible(false);
    } finally {
      setIsInitializing(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[20000] flex items-center justify-center p-4 sm:p-10 pointer-events-none overflow-hidden">
      {/* Heavy Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl animate-in fade-in duration-1000 pointer-events-auto" />

      <div className="max-w-4xl w-full bg-black/95 backdrop-blur-3xl border-2 border-neon-blue/30 rounded-[3rem] p-8 sm:p-16 shadow-[0_80px_200px_rgba(0,0,0,1)] pointer-events-auto flex flex-col items-center text-center gap-10 animate-in slide-in-from-bottom-20 duration-1000">
        
        <div className="flex-shrink-0 p-6 bg-neon-blue/10 rounded-full border-2 border-neon-blue/20 relative group">
           <div className="absolute inset-0 bg-neon-blue/30 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
           <ShieldCheck className="text-neon-blue w-12 h-12 sm:w-20 sm:h-20 animate-pulse relative z-10" />
        </div>

        <div className="space-y-6 max-w-3xl">
           <div className="flex flex-col items-center gap-3">
              <h3 className="text-white font-display font-black uppercase tracking-tight text-3xl sm:text-5xl">
                Sovereign <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-purple">Entry Protocol.</span>
              </h3>
              <div className="h-[2px] w-24 bg-neon-blue/50"></div>
           </div>

           <p className="text-slate-400 text-sm sm:text-lg font-bold leading-relaxed italic opacity-90 px-4">
             "By initializing, you accept our <span className="text-white underline underline-offset-4 decoration-neon-blue/50">Terms of Engagement</span> and authorize hardware bonding for AI assistive tools. You acknowledge that every structural outcome is human-verified to protect your organizational integrity."
           </p>
        </div>

        <div className="w-full flex flex-col items-center gap-8">
           <button 
             onClick={handleAccept} 
             disabled={isInitializing} 
             className="w-full max-w-md py-6 sm:py-8 bg-white text-black rounded-3xl font-black text-[12px] sm:text-[14px] uppercase tracking-[0.5em] hover:bg-neon-blue hover:text-white transition-all shadow-[0_20px_60px_rgba(6,182,212,0.3)] active:scale-95 whitespace-nowrap flex items-center justify-center gap-4 disabled:opacity-50 group"
           >
             {isInitializing ? <Loader2 className="animate-spin" size={20} /> : <Zap size={20} className="text-neon-purple group-hover:animate-bounce" />}
             Initialize Grid
           </button>
           
           <div className="flex items-center gap-10 opacity-50 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-3">
                 <Scale size={14} className="text-slate-600" />
                 <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">AU Regulatory Adherent</span>
              </div>
              <Link 
                to="/compliance" 
                onClick={() => setIsVisible(false)}
                className="text-[10px] text-neon-blue hover:text-white font-black uppercase tracking-[0.3em] flex items-center gap-2"
              >
                Review Compliance <ArrowRight size={14} />
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
};