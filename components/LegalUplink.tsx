import React, { useState, useEffect } from 'react';
import { Shield, X, ArrowRight } from 'lucide-react';
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
    <div className="fixed bottom-6 left-6 z-[2001] w-full max-w-[320px] sm:max-w-[400px] animate-in slide-in-from-left-10 fade-in duration-700 pointer-events-none">
      <div className="bg-black/80 backdrop-blur-2xl border border-neon-blue/30 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-neon-blue/10 rounded-lg shrink-0">
            <Shield size={16} className="text-neon-blue" />
          </div>
          <div className="flex-grow space-y-3">
            <div>
              <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Legal Awareness Protocol</h4>
              <p className="text-[11px] text-slate-400 font-bold leading-relaxed mt-1 italic">
                RCG utilizes structural analytics to optimize NDIS scaling logic. By continuing, you acknowledge our data sovereignty standards in line with the <span className="text-slate-200">Privacy Act 1988 (Cth).</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={handleAcknowledge}
                className="px-4 py-2 bg-white text-black font-black text-[9px] uppercase tracking-widest rounded-lg hover:bg-neon-blue hover:text-white transition-all active:scale-95"
              >
                Acknowledge
              </button>
              <Link 
                to="/privacy" 
                onClick={() => setIsVisible(false)}
                className="text-[9px] text-slate-500 hover:text-white font-black uppercase tracking-widest flex items-center gap-1 group"
              >
                Privacy Node <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-slate-600 hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};