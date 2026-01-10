import React, { useState, useEffect } from 'react';
import { Shield, ArrowRight, Zap, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LegalUplink: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check for the mandatory v2 legal acknowledgment
    const checkLegal = () => {
      const acknowledged = localStorage.getItem('rcg_legal_v2');
      if (!acknowledged) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Global reveal delay for smooth loading sequence
    const timer = setTimeout(checkLegal, 2500);
    
    // Global listener for cross-tab sync
    window.addEventListener('storage', checkLegal);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('storage', checkLegal);
    };
  }, []);

  const handleAcknowledge = () => {
    localStorage.setItem('rcg_legal_v2', 'ENFORCED_PROTOCOL_' + Date.now());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-8 z-[10000] w-[calc(100vw-64px)] sm:w-full max-w-[400px] animate-in slide-in-from-left-10 fade-in duration-700 pointer-events-none">
      <div className="bg-black/95 backdrop-blur-3xl border-2 border-neon-blue/50 rounded-[2rem] p-8 sm:p-10 shadow-[0_40px_120px_rgba(0,0,0,1)] pointer-events-auto ring-1 ring-white/20">
        <div className="flex flex-col gap-8">
          <div className="flex items-start gap-6">
            <div className="p-4 bg-neon-blue/10 rounded-2xl shrink-0 border border-neon-blue/30 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <Shield size={26} className="text-neon-blue animate-pulse" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h4 className="text-[10px] font-black text-white uppercase tracking-[0.5em]">Legal Entry Protocol</h4>
                <div className="w-2 h-2 rounded-full bg-neon-blue shadow-[0_0_10px_#06b6d4]"></div>
              </div>
              <p className="text-[12px] text-slate-300 font-bold leading-relaxed italic">
                By interacting with the RCG architecture, you accept our <span className="text-white underline decoration-neon-blue/50 underline-offset-4">Terms of Engagement</span> and acknowledge our liability limits regarding your local software/hardware environments.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col space-y-6">
            <button 
              onClick={handleAcknowledge}
              className="w-full py-5 bg-white text-black font-black text-[11px] uppercase tracking-[0.5em] rounded-2xl hover:bg-neon-blue hover:text-white transition-all active:scale-95 shadow-3xl flex items-center justify-center gap-4 group"
            >
              <Zap size={16} className="text-neon-purple group-hover:animate-bounce" /> 
              Accept Protocol
            </button>
            
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <AlertCircle size={10} className="text-slate-600" />
                <span className="text-[8px] text-slate-600 font-black uppercase tracking-widest">AU REGULATORY CODE ADHERENT</span>
              </div>
              <Link 
                to="/compliance" 
                onClick={() => setIsVisible(false)}
                className="text-[9px] text-neon-blue hover:text-white font-black uppercase tracking-[0.3em] flex items-center gap-2 transition-colors"
              >
                Review Compliance <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};