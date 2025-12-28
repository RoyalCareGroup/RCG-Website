import React from 'react';
import { Crown, Cpu, Terminal, Shield } from 'lucide-react';
import { SynkProductIcon } from './SynkProductIcon.tsx';
import { COMPANY_DETAILS } from '../config.ts';

export const HeroLogoAnimation: React.FC = () => {
  return (
    <div className="relative w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] flex items-center justify-center select-none">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-neon-purple/10 blur-[120px] rounded-rect-xl animate-pulse"></div>

      {/* Rotating Angular Frames (Not Circles) */}
      <div className="absolute inset-0 border border-neon-blue/15 rounded-[3rem] animate-spin-slow rotate-45"></div>
      <div className="absolute inset-12 border border-neon-purple/15 rounded-[2.5rem] animate-spin-reverse-slow"></div>
      <div className="absolute inset-24 border border-dashed border-royal-700 rounded-[2rem] animate-[spin_40s_linear_infinite]"></div>

      {/* Orbiting Logic Squares */}
      <div className="absolute inset-0 animate-spin-slow">
        {/* Node 1: Top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12">
           <div className="bg-royal-950 p-4 rounded-xl border border-neon-blue shadow-2xl hover:scale-110 transition-transform">
             <SynkProductIcon type="claim" size={48} isActive={true} />
           </div>
        </div>
        
        {/* Node 2: Bottom Right */}
        <div className="absolute bottom-[5%] right-[5%]">
           <div className="bg-royal-950 p-4 rounded-xl border border-neon-purple shadow-2xl hover:scale-110 transition-transform">
             <SynkProductIcon type="report" size={48} phase={2} isActive={true} />
           </div>
        </div>

        {/* Node 3: Bottom Left */}
        <div className="absolute bottom-[5%] left-[5%]">
           <div className="bg-royal-950 p-4 rounded-xl border border-neon-blue shadow-2xl hover:scale-110 transition-transform">
             <SynkProductIcon type="service" size={48} phase={2} isActive={true} />
           </div>
        </div>
      </div>

      {/* Center Core: The Mainframe Square */}
      <div className="relative z-10 w-48 h-48 bg-royal-900 border-2 border-neon-purple rounded-[2.5rem] flex flex-col items-center justify-center shadow-[0_0_80px_rgba(217,70,239,0.3),inset_0_0_20px_rgba(0,0,0,0.5)] animate-float backdrop-blur-3xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
        <Crown className="w-16 h-16 text-neon-purple mb-3 drop-shadow-[0_0_15px_#d946ef]" />
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-neon-blue" />
            <span className="text-white font-black text-lg tracking-[0.25em] uppercase">SYNK</span>
          </div>
          <span className="text-[8px] font-mono text-slate-500 uppercase tracking-[0.6em] mt-2 font-bold">CORE_v{COMPANY_DETAILS.appVersion.split('-')[0]}</span>
        </div>
        <div className="absolute bottom-4 flex gap-2">
           <div className="w-1.5 h-1.5 bg-neon-blue rounded-[1px] animate-pulse"></div>
           <div className="w-1.5 h-1.5 bg-neon-purple rounded-[1px] animate-pulse" style={{ animationDelay: '0.2s' }}></div>
           <div className="w-1.5 h-1.5 bg-neon-green rounded-[1px] animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>

      {/* Outer Data Nodes */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-1/4 right-0 w-12 h-12 bg-royal-800 border border-white/10 rounded-lg flex items-center justify-center shadow-2xl animate-pulse">
            <Terminal size={20} className="text-slate-500" />
         </div>
         <div className="absolute bottom-1/4 left-0 w-12 h-12 bg-royal-800 border border-white/10 rounded-lg flex items-center justify-center shadow-2xl animate-pulse" style={{ animationDelay: '1s' }}>
            <Shield size={20} className="text-slate-500" />
         </div>
      </div>
    </div>
  );
};