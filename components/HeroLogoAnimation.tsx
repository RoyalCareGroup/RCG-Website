
import React from 'react';
import { Crown, Cpu } from 'lucide-react';
import { SynkProductIcon } from './SynkProductIcon.tsx';

export const HeroLogoAnimation: React.FC = () => {
  return (
    <div className="relative w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] flex items-center justify-center select-none">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-neon-purple/5 blur-[100px] rounded-full animate-pulse"></div>

      {/* Rotating Rings */}
      <div className="absolute inset-0 rounded-full border border-neon-blue/10 animate-spin-slow"></div>
      <div className="absolute inset-8 rounded-full border border-neon-purple/10 animate-spin-reverse-slow"></div>
      <div className="absolute inset-20 rounded-full border border-dashed border-royal-700 animate-[spin_30s_linear_infinite]"></div>

      {/* Complex Orbiting Logic (Pentagonal) */}
      <div className="absolute inset-0 animate-spin-slow">
        {/* Node 1: Top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8">
           <div className="transform rotate-0 hover:scale-110 transition-transform">
             <SynkProductIcon type="claim" size={48} isActive={true} />
           </div>
        </div>
        
        {/* Node 2: Bottom Right */}
        <div className="absolute bottom-[10%] right-[10%] translate-x-4 translate-y-4">
           <div className="transform hover:scale-110 transition-transform">
             <SynkProductIcon type="report" size={48} phase={2} isActive={true} />
           </div>
        </div>

        {/* Node 3: Bottom Left */}
        <div className="absolute bottom-[10%] left-[10%] -translate-x-4 translate-y-4">
           <div className="transform hover:scale-110 transition-transform">
             <SynkProductIcon type="service" size={48} phase={2} isActive={true} />
           </div>
        </div>
      </div>

      <div className="absolute inset-12 animate-spin-reverse-slow">
        {/* Node 4: Mid Left */}
        <div className="absolute left-0 top-1/2 -translate-x-10 -translate-y-1/2">
           <div className="transform hover:scale-110 transition-transform">
             <SynkProductIcon type="chat" size={48} phase={3} isActive={true} />
           </div>
        </div>

        {/* Node 5: Mid Right (CRM Integration) */}
        <div className="absolute right-0 top-1/2 translate-x-10 -translate-y-1/2">
           <div className="transform hover:scale-110 transition-transform flex flex-col items-center">
             <div className="bg-royal-900/80 p-2 rounded-xl border border-neon-blue/20 backdrop-blur-md">
                <SynkProductIcon type="crm" size={32} isActive={true} />
             </div>
             <span className="text-[7px] font-black text-neon-blue uppercase tracking-widest mt-1">CRM_NODE</span>
           </div>
        </div>
      </div>

      {/* Center Core */}
      <div className="relative z-10 w-36 h-36 bg-royal-800/90 rounded-full border-2 border-neon-purple flex flex-col items-center justify-center shadow-[0_0_50px_rgba(217,70,239,0.3)] animate-float backdrop-blur-md">
        <Crown className="w-14 h-14 text-neon-purple mb-2 drop-shadow-lg" />
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-1.5">
            <Cpu className="w-4 h-4 text-neon-blue" />
            <span className="text-white font-black text-sm tracking-[0.2em]">SYNK</span>
          </div>
          <span className="text-[7px] font-mono text-slate-500 uppercase tracking-widest mt-1">CORE_v9.9.5</span>
        </div>
      </div>
    </div>
  );
};
