import React from 'react';
import { Crown, Shield, Globe, Cpu, Zap } from 'lucide-react';
import { COMPANY_DETAILS } from '../config.ts';

export const RoyalSocialCard: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#01040f] flex items-center justify-center p-12 relative overflow-hidden">
      {/* Background Structural Grid */}
      <div className="absolute inset-0 opacity-[0.07]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] [background-size:40px_40px]"></div>
      </div>
      
      {/* Sovereign Glow Field */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-purple/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-neon-blue/5 rounded-full blur-[80px]"></div>

      {/* Main Identity Node */}
      <div className="relative z-10 flex flex-col items-center text-center">
        
        {/* THE SIGNATURE LOGO (No Circle) */}
        <div className="relative mb-12 group cursor-none">
          {/* Subtle Backglow */}
          <div className="absolute inset-0 bg-neon-purple/20 blur-3xl rounded-full scale-150 opacity-40 group-hover:opacity-60 transition-opacity"></div>
          
          <div className="relative">
            {/* The Sovereign Crown */}
            <Crown 
              size={120} 
              className="text-neon-purple drop-shadow-[0_0_25px_rgba(217,70,239,0.7)] animate-float" 
              strokeWidth={1.5}
            />
            
            {/* THE NEURAL CHIP (Integrated like brand logo) */}
            <div className="absolute -bottom-2 -right-2 p-3 bg-royal-950 border-2 border-royal-700 rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.4)] animate-pulse">
               <Cpu size={24} className="text-neon-blue" strokeWidth={2.5} />
            </div>
            
            {/* Orbiting Tech Spark */}
            <div className="absolute inset-[-20px] rounded-full border border-dashed border-white/5 animate-spin-slow pointer-events-none" style={{ animationDuration: '20s' }}>
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-neon-blue rounded-full shadow-[0_0_10px_#06b6d4]"></div>
            </div>
          </div>
        </div>

        {/* Brand Typography Node */}
        <div className="space-y-5">
          <h1 className="text-6xl font-display font-black text-white uppercase tracking-tighter leading-none flex items-center gap-4">
            Royal Care <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-white to-neon-blue drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">Group.</span>
          </h1>
          <div className="flex items-center justify-center gap-6">
             <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-royal-800"></div>
             <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.8em] whitespace-nowrap">National Structural Intelligence</p>
             <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-royal-800"></div>
          </div>
        </div>

        {/* Technical Parity Badges */}
        <div className="mt-14 flex gap-6">
           <div className="flex items-center gap-3 text-[10px] font-mono text-neon-blue font-black tracking-widest bg-royal-900/60 px-6 py-2.5 rounded-xl border border-neon-blue/20 shadow-xl backdrop-blur-md">
              <Shield size={14} /> SECURED_v{COMPANY_DETAILS.appVersion.split('-')[0]}
           </div>
           <div className="flex items-center gap-3 text-[10px] font-mono text-neon-purple font-black tracking-widest bg-royal-900/60 px-6 py-2.5 rounded-xl border border-neon-purple/20 shadow-xl backdrop-blur-md">
              <Globe size={14} /> AU_EAST_GRID
           </div>
        </div>
      </div>

      {/* Sovereign Holographic Floor */}
      <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-neon-blue/5 to-transparent pointer-events-none"></div>

      {/* Frame Details */}
      <div className="absolute inset-8 border border-white/5 rounded-[3rem] pointer-events-none"></div>
      <div className="absolute top-10 left-12 flex gap-4 opacity-20">
         <div className="w-1 h-8 bg-neon-purple rounded-full"></div>
         <div className="w-1 h-4 bg-neon-blue rounded-full"></div>
      </div>
      
      <div className="absolute bottom-10 right-14 flex items-center gap-4 text-[9px] font-mono text-slate-700 tracking-[0.5em] uppercase font-bold">
         <Zap size={10} className="text-neon-blue animate-pulse" /> SYNK_CORE_ESTABLISHED
      </div>
    </div>
  );
};