
import React from 'react';
import { Heart, Cpu, Activity } from 'lucide-react';

export const EvolutionAnimation: React.FC = () => {
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center">
      {/* Background Circuitry */}
      <div className="absolute inset-0 opacity-20">
         <svg className="w-full h-full" viewBox="0 0 400 400">
           <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
             <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-neon-blue"/>
           </pattern>
           <rect width="100%" height="100%" fill="url(#grid)" />
         </svg>
      </div>

      {/* Connection Line */}
      <div className="absolute top-1/2 left-[15%] right-[15%] h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-neon-blue transform -translate-y-1/2"></div>
      
      {/* Animated Pulses on the line */}
      <div className="absolute top-1/2 left-[15%] w-4 h-4 bg-white rounded-full shadow-[0_0_15px_white] transform -translate-y-1/2 animate-[moveRight_3s_linear_infinite]">
         <style>{`
           @keyframes moveRight {
             0% { left: 15%; opacity: 0; }
             10% { opacity: 1; }
             90% { opacity: 1; }
             100% { left: 85%; opacity: 0; }
           }
         `}</style>
      </div>

      {/* Left Node: Care / Past */}
      <div className="absolute left-[5%] md:left-[10%] top-1/2 transform -translate-y-1/2 flex flex-col items-center group">
         <div className="w-24 h-24 rounded-full bg-royal-800 border-2 border-pink-500 flex items-center justify-center shadow-[0_0_30px_rgba(236,72,153,0.3)] z-10 relative">
            <Heart className="w-10 h-10 text-pink-500" fill="currentColor" />
            <div className="absolute inset-0 border-4 border-transparent border-t-pink-500/50 rounded-full animate-spin"></div>
         </div>
         <div className="mt-4 text-center bg-royal-900/80 p-2 rounded border border-pink-500/30">
            <div className="text-pink-500 font-bold text-sm">ORIGINS</div>
            <div className="text-slate-300 text-xs">Direct Care Provider</div>
         </div>
      </div>

      {/* Right Node: Tech / Future */}
      <div className="absolute right-[5%] md:right-[10%] top-1/2 transform -translate-y-1/2 flex flex-col items-center group">
         <div className="w-24 h-24 rounded-full bg-royal-800 border-2 border-neon-blue flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.3)] z-10 relative">
            <Cpu className="w-10 h-10 text-neon-blue" />
            <div className="absolute inset-0 border-4 border-transparent border-b-neon-blue/50 rounded-full animate-spin-reverse-slow"></div>
         </div>
         <div className="mt-4 text-center bg-royal-900/80 p-2 rounded border border-neon-blue/30">
            <div className="text-neon-blue font-bold text-sm">TODAY</div>
            <div className="text-slate-300 text-xs">Tech Innovators</div>
         </div>
      </div>

      {/* Center Badge: Transformation */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
         <div className="bg-royal-900 p-3 rounded-xl border border-royal-700 shadow-xl flex items-center space-x-2">
            <Activity className="w-5 h-5 text-purple-400" />
            <span className="text-xs font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-neon-blue">EVOLUTION COMPLETE</span>
         </div>
      </div>

    </div>
  );
};
