import React, { useState, useEffect } from 'react';
import { Shield, X, ArrowRight, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY_DETAILS } from '../config.ts';

export const LegalUplink: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const acknowledged = localStorage.getItem('rcg_legal_ack');
    if (!acknowledged) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcknowledge = () => {
    localStorage.setItem('rcg_legal_ack', 'TRUE_' + Date.now());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[2001] w-full max-w-[340px] sm:max-w-[420px] animate-in slide-in-from-left-10 fade-in duration-700 pointer-events-none">
      <div className="bg-black/90 backdrop-blur-3xl border border-neon-blue/30 rounded-2xl p-6 shadow-[0_30px_60px_rgba(0,0,0,0.6)] pointer-events-auto ring-1 ring-white/5">
        <div className="flex items-start gap-5">
          <div className="p-2.5 bg-neon-blue/10 rounded-xl shrink-0 border border-neon-blue/20">
            <Shield size={18} className="text-neon-blue" />
          </div>
          <div className="flex-grow space-y-4">
            <div>
              <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] flex items-center gap-2">
                Legal Awareness Protocol <span className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse"></span>
              </h4>
              <p className="text-[11px] text-slate-400 font-bold leading-relaxed mt-2 italic">
                RCG utilizes cookies and structural analytics to optimize NDIS scaling logic. By interacting with the grid, you acknowledge our <span className="text-white">Privacy Standards (Cth)</span> and agree to our <span className="text-white">Terms of Engagement.</span>
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <button 
                onClick={handleAcknowledge}
                className="px-6 py-2.5 bg-white text-black font-black text-[9px] uppercase tracking-widest rounded-lg hover:bg-neon-blue hover:text-white transition-all active:scale-95 shadow-xl"
              >
                Accept Protocol
              </button>
              
              <div className="flex items-center gap-4 border-l border-white/10 pl-4">
                <Link 
                  to="/privacy" 
                  className="text-[8px] text-slate-500 hover:text-neon-blue font-black uppercase tracking-widest flex items-center gap-1.5 group transition-colors"
                >
                  Privacy <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/terms" 
                  className="text-[8px] text-slate-500 hover:text-neon-purple font-black uppercase tracking-widest flex items-center gap-1.5 group transition-colors"
                >
                  Terms <Scale size={10} className="group-hover:rotate-12 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-slate-600 hover:text-white transition-colors p-1"
            aria-label="Dismiss notice"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};