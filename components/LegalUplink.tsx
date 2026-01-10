import React, { useState, useEffect } from 'react';
import { Shield, ArrowRight, Scale, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LegalUplink: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check for specific versioned legal acknowledgment
    const checkLegal = () => {
      const acknowledged = localStorage.getItem('rcg_legal_v1');
      if (!acknowledged) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    checkLegal();
    // Listen for changes in other tabs/windows
    window.addEventListener('storage', checkLegal);
    return () => window.removeEventListener('storage', checkLegal);
  }, []);

  const handleAcknowledge = () => {
    localStorage.setItem('rcg_legal_v1', 'ACKNOWLEDGED_PROTOCOL_' + Date.now());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[2500] w-[calc(100vw-48px)] sm:w-full max-w-[360px] sm:max-w-[440px] animate-in slide-in-from-left-10 fade-in duration-700 pointer-events-none">
      <div className="bg-black/95 backdrop-blur-3xl border-2 border-neon-blue/40 rounded-2xl p-6 sm:p-8 shadow-[0_40px_100px_rgba(0,0,0,1)] pointer-events-auto ring-1 ring-white/10">
        <div className="flex items-start gap-5">
          <div className="p-3.5 bg-neon-blue/10 rounded-xl shrink-0 border border-neon-blue/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Shield size={22} className="text-neon-blue animate-pulse" />
          </div>
          <div className="flex-grow space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Mandatory Legal Protocol</h4>
                <div className="w-1.5 h-1.5 rounded-full bg-neon-blue shadow-[0_0_8px_#06b6d4]"></div>
              </div>
              <p className="text-[11px] text-slate-400 font-bold leading-relaxed italic">
                By interacting with the RCG structural grid, you acknowledge our <span className="text-white">AU Privacy Standards</span> and <span className="text-white">Liability Disclaimers</span>. Acknowledgment is required for continued access.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-2">
              <button 
                onClick={handleAcknowledge}
                className="px-8 py-3 bg-white text-black font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-neon-blue hover:text-white transition-all active:scale-95 shadow-2xl flex items-center gap-2"
              >
                <Zap size={14} className="text-neon-purple" /> Accept Protocol
              </button>
              
              <div className="flex items-center gap-5 border-l border-white/10 pl-5">
                <Link 
                  to="/compliance" 
                  className="text-[8px] text-slate-500 hover:text-neon-blue font-black uppercase tracking-[0.2em] flex items-center gap-1.5 group transition-colors"
                >
                  Legal Node <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};