import React, { useState, useEffect } from 'react';
import { SynkProductIcon } from './SynkProductIcon.tsx';
import { Rocket, Clock } from 'lucide-react';

export const LaunchCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const targetDate = new Date('2026-01-16T00:00:00').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference < 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center mx-2">
      <div className="bg-royal-950 border border-white/10 rounded-xl p-3 w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-30"></div>
        <span className="text-2xl sm:text-3xl font-mono font-black text-white group-hover:text-neon-blue transition-colors">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-[9px] text-slate-500 uppercase tracking-[0.3em] mt-3 font-black">{label}</span>
    </div>
  );

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-neon-purple via-neon-blue to-neon-purple rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
      
      <div className="relative flex flex-col sm:flex-row items-center gap-8 p-8 bg-royal-900/90 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-3xl">
        
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-3 min-w-[140px]">
           <div className="bg-royal-950 p-3 rounded-xl border border-white/5 shadow-2xl">
             <SynkProductIcon type="claim" size={56} isActive={true} phase={1} />
           </div>
           <div>
             <div className="flex items-center justify-center sm:justify-start space-x-2 text-neon-purple text-[9px] font-black tracking-[0.3em] uppercase mb-1">
               <Rocket size={12} className="animate-pulse" />
               <span>Deployment</span>
             </div>
             <div className="text-white font-display font-black text-xl leading-none uppercase tracking-tighter">ClaimSYNK</div>
             <div className="text-slate-500 text-[10px] font-mono mt-1">EST_SYNCHRONIZATION</div>
           </div>
        </div>

        <div className="w-full sm:w-[1px] h-[1px] sm:h-24 bg-royal-800"></div>

        <div className="flex items-center justify-center">
          <TimeUnit value={timeLeft.days} label="Days" />
          <Clock className="text-royal-800 mx-1 mt-[-20px]" size={16} />
          <TimeUnit value={timeLeft.hours} label="Hrs" />
          <Clock className="text-royal-800 mx-1 mt-[-20px]" size={16} />
          <TimeUnit value={timeLeft.minutes} label="Mins" />
          <Clock className="text-royal-800 mx-1 mt-[-20px]" size={16} />
          <TimeUnit value={timeLeft.seconds} label="Secs" />
        </div>
      </div>
    </div>
  );
};