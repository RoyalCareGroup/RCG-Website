
import React from 'react';
import { Crown, Cpu } from 'lucide-react';
import { COMPANY_DETAILS } from '../config.ts';

export const HeroLogoAnimation: React.FC = () => {
  return (
    <div className="relative w-[320px] h-[320px] sm:w-[500px] sm:h-[450px] flex items-center justify-center select-none font-sans">
      {/* Atmosphere Pulses - Deep Obsidian/Navy Base */}
      <div className="absolute inset-0 bg-[#1E293B]/20 blur-[120px] rounded-full animate-pulse opacity-40"></div>
      <div className="absolute inset-0 border border-neon-gold/10 rounded-[4rem] animate-spin-slow rotate-45 opacity-20"></div>
      
      {/* Primary Identity Node */}
      <div className="relative z-10 w-72 h-80 bg-[#0F172A] rounded-[3.5rem] flex flex-col items-center pt-10 pb-8 shadow-[0_60px_120px_rgba(0,0,0,1)] border border-white/5 overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        
        {/* Identity Section */}
        <div className="flex flex-col items-center flex-1">
          {/* Champagne Gold Crown */}
          <Crown className="w-20 h-20 text-neon-gold mb-6 drop-shadow-[0_0_25px_rgba(229,199,139,0.3)]" strokeWidth={1} />
          <div className="flex flex-col items-center text-center px-6">
            <div className="flex items-center space-x-4">
              <Cpu className="w-4 h-4 text-neon-gold/40" />
              <span className="text-white font-black text-4xl tracking-[0.1em] uppercase font-display">SYNK</span>
            </div>
          </div>
        </div>

        {/* Institutional Footer */}
        <div className="mt-auto flex flex-col items-center gap-4 w-full bg-gradient-to-t from-white/[0.02] to-transparent pt-6 pb-2">
          <div className="flex flex-col items-center gap-3">
            <span className="text-[9px] text-slate-500 font-black uppercase tracking-[0.6em] block">
              LAUNCH 06.06.26
            </span>
            <div className="flex gap-4">
               <div className="w-1.5 h-1.5 bg-neon-gold rounded-full animate-pulse shadow-[0_0_8px_#E5C78B]"></div>
               <div className="w-1.5 h-1.5 bg-white/10 rounded-full"></div>
               <div className="w-1.5 h-1.5 bg-white/5 rounded-full"></div>
            </div>
          </div>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-neon-gold/10 to-transparent mt-2"></div>
        </div>
      </div>
    </div>
  );
};
