import React from 'react';
import { Crown, Cpu } from 'lucide-react';
import { COMPANY_DETAILS } from '../config.ts';

export const HeroLogoAnimation: React.FC = () => {
  return (
    <div className="relative w-[320px] h-[320px] sm:w-[500px] sm:h-[450px] flex items-center justify-center select-none font-sans">
      {/* Atmosphere Pulses */}
      <div className="absolute inset-0 bg-neon-purple/15 blur-[140px] rounded-full animate-pulse opacity-30"></div>
      <div className="absolute inset-0 border-2 border-neon-blue/20 rounded-[4rem] animate-spin-slow rotate-45 opacity-40 shadow-[inset_0_0_40px_rgba(6,182,212,0.1)]"></div>
      
      {/* Primary Identity Node */}
      <div className="relative z-10 w-72 h-80 bg-black rounded-[3.5rem] flex flex-col items-center pt-10 pb-8 shadow-[0_0_20px_rgba(255,255,255,0.2),0_40px_80px_rgba(0,0,0,0.9)] border-2 border-white/80 overflow-hidden">
        {/* Identity Section */}
        <div className="flex flex-col items-center flex-1">
          <Crown className="w-20 h-20 text-neon-purple mb-4 drop-shadow-[0_0_15px_#d946ef]" strokeWidth={2.5} />
          <div className="flex flex-col items-center text-center px-6">
            <div className="flex items-center space-x-3">
              <Cpu className="w-5 h-5 text-neon-blue" strokeWidth={3} />
              <span className="text-white font-black text-3xl tracking-[0.2em] uppercase font-display">SYNK</span>
            </div>
          </div>
        </div>

        {/* Launch Protocol Footer */}
        <div className="mt-auto flex flex-col items-center gap-4 w-full bg-gradient-to-t from-white/[0.03] to-transparent pt-6 pb-2">
          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] text-white font-black uppercase tracking-[0.5em] block drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
              LAUNCH 06.06.26
            </span>
            <div className="flex gap-3">
               <div className="w-1.5 h-1.5 bg-neon-blue rounded-full animate-pulse shadow-[0_0_8px_#06b6d4]"></div>
               <div className="w-1.5 h-1.5 bg-neon-purple rounded-full animate-pulse shadow-[0_0_8px_#d946ef]" style={{ animationDelay: '0.2s' }}></div>
               <div className="w-1.5 h-1.5 bg-neon-green rounded-full animate-pulse shadow-[0_0_8px_#10b981]" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mt-2"></div>
        </div>
      </div>
    </div>
  );
};