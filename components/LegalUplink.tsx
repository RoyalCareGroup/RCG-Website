import React, { useState, useEffect } from 'react';
import { Shield, X, ArrowRight, Scale, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY_DETAILS } from '../config.ts';

export const LegalUplink: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check for specific versioned legal acknowledgment
    const acknowledged = localStorage.getItem('rcg_legal_v1');
    if (!acknowledged) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcknowledge = () => {
    localStorage.setItem('rcg_legal_v1', 'ACKNOWLEDGED_PROTOCOL_' + Date.now());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[2001] w-[calc(100vw-48px)] sm:w-full max-w-[360px] sm:max-w-[440px] animate-in slide-in-from-left-10 fade-in duration-700 pointer-events-none">
      <div className="bg-black/95 backdrop-blur-3xl border border-neon-blue/30 rounded-2xl p-6 sm:p-7 shadow-[0_40px_80px_rgba(0,0,0,0.8)] pointer-events-auto ring-1 ring-white/10">
        <div className="flex items-start gap-5">
          <div className="p-3 bg-neon-blue/10 rounded-xl shrink-0 border border-neon-blue/20">
            <Shield size={20} className="text-neon-blue animate-pulse" />
          </div>
          <div className="flex-grow space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Legal Protocol Active</h4>
                <div className="w-1.5 h-1.5 rounded-full bg-neon-blue shadow-[0_0_8px_#06b6d4]"></div>
              </div>
              <p className="text-[11px] text-slate-400 font-bold leading-relaxed italic">
                Royal Care Group utilizes system-optimization cookies and structural analytics to maintain NDIS regulatory parity. By interacting with the grid, you accept our <span className="text-white">AU Privacy Standards (Privacy Act 1988)</span> and agree to our <span className="text-white">Terms of Engagement.</span>
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-2">
              <button 
                onClick={handleAcknowledge}
                className="px-6 py-2.5 bg-white text-black font-black text-[9px] uppercase tracking-widest rounded-lg hover:bg-neon-blue hover:text-white transition-all active:scale-95 shadow-2xl"
              >
                Accept Protocol
              </button>
              
              <div className="flex items-center gap-5 border-l border-white/10 pl-5">
                <Link 
                  to="/privacy" 
                  onClick={() => setIsVisible(false)}
                  className="text-[8px] text-slate-500 hover:text-neon-blue font-black uppercase tracking-[0.2em] flex items-center gap-1.5 group transition-colors"
                >
                  Privacy <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/terms" 
                  onClick={() => setIsVisible(false)}
                  className="text-[8px] text-slate-500 hover:text-neon-purple font-black uppercase tracking-[0.2em] flex items-center gap-1.5 group transition-colors"
                >
                  Terms <Scale size={10} className="group-hover:rotate-12 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-slate-600 hover:text-white transition-colors p-1 -mt-1 -mr-1"
            aria-label="Dismiss notice"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};