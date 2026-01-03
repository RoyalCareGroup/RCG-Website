import React, { useState, useEffect } from 'react';
import { SynkProductIcon } from './SynkProductIcon.tsx';
import { Rocket, Clock } from 'lucide-react';

export const LaunchCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  function calculateTimeLeft() {
    const targetDate = new Date('2026-01-16T00:00:00').getTime();
    const difference = targetDate - new Date().getTime();
    if (difference < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  }
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center px-2 sm:px-4">
      <div className="bg-royal-950 border-2 border-white/10 p-3 w-16 sm:w-24 h-16 sm:h-24 flex items-center justify-center shadow-2xl relative overflow-hidden group rounded-2xl">
        <span className="text-2xl sm:text-4xl font-black text-white group-hover:text-neon-blue transition-colors tracking-tight">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-[0.4em] mt-3 font-black">{label}</span>
    </div>
  );

  return (
    <div className="relative group w-full max-w-5xl px-4 sm:px-0">
      <div className="absolute -inset-2 bg-gradient-to-r from-neon-purple via-neon-blue to-neon-purple opacity-20 group-hover:opacity-40 transition duration-1000 rounded-[3rem] blur-xl"></div>
      <div className="relative flex flex-col lg:flex-row items-center justify-between gap-10 p-8 sm:p-12 bg-black border-2 border-white/15 shadow-3xl rounded-[2.5rem] sm:rounded-[3.5rem] transition-all duration-500">
        
        {/* Product Identity Node */}
        <div className="flex items-center gap-6 sm:gap-10 w-full lg:w-auto">
           <div className="bg-royal-950 p-4 border-2 border-white/5 shadow-2xl rounded-2xl group-hover:scale-110 transition-transform flex-shrink-0">
             <SynkProductIcon type="claim" size={64} isActive={true} phase={1} />
           </div>
           <div className="flex flex-col">
             <div className="flex items-center space-x-3 text-neon-purple text-[10px] font-black tracking-[0.4em] uppercase mb-2">
               <Rocket size={14} className="animate-pulse flex-shrink-0" />
               <span className="whitespace-nowrap">Deployment Protocol</span>
             </div>
             <div className="text-white font-display font-black text-3xl sm:text-4xl leading-none uppercase tracking-tighter">ClaimSYNK_v5</div>
             <div className="text-slate-600 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] mt-2">Sovereign_Sync_Active</div>
           </div>
        </div>

        {/* Separator Node */}
        <div className="w-full lg:w-[1px] h-[1px] lg:h-24 bg-gradient-to-r lg:bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

        {/* Temporal Node (Timer) */}
        <div className="flex items-center justify-center w-full lg:w-auto">
          <TimeUnit value={timeLeft.days} label="Days" />
          <TimeUnit value={timeLeft.hours} label="Hrs" />
          <TimeUnit value={timeLeft.minutes} label="Mins" />
          <TimeUnit value={timeLeft.seconds} label="Secs" />
        </div>
      </div>
    </div>
  );
};