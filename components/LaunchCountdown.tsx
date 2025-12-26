
import React, { useState, useEffect } from 'react';
import { SynkProductIcon } from './SynkProductIcon.tsx';
import { Rocket } from 'lucide-react';

export const LaunchCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    // Target: January 16, 2026
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
    <div className="flex flex-col items-center mx-1 sm:mx-2">
      <div className="bg-royal-950/80 border border-royal-700 rounded-lg p-2 w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center shadow-inner relative overflow-hidden group">
        <div className="absolute inset-0 bg-neon-purple/5 group-hover:bg-neon-purple/10 transition-colors"></div>
        <span className="text-xl sm:text-2xl font-mono font-bold text-white group-hover:text-neon-purple transition-colors">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-wider mt-1 font-semibold">{label}</span>
    </div>
  );

  return (
    <div className="relative group">
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-neon-purple via-neon-blue to-neon-purple rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      
      <div className="relative flex flex-col sm:flex-row items-center gap-6 p-5 sm:p-6 bg-royal-900/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl">
        
        {/* Left: Icon & Badge */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-2 min-w-[120px]">
           <div className="transform scale-75 sm:scale-90 origin-center sm:origin-left">
             <SynkProductIcon type="claim" size={64} isActive={true} phase={1} />
           </div>
           <div>
             <div className="flex items-center justify-center sm:justify-start space-x-1 text-neon-purple text-[10px] font-bold tracking-[0.2em] uppercase mb-1">
               <Rocket size={12} className="animate-pulse" />
               <span>Incoming</span>
             </div>
             <div className="text-white font-display font-bold text-lg leading-none">ClaimSYNK</div>
             <div className="text-slate-400 text-xs">Official Launch</div>
           </div>
        </div>

        {/* Divider */}
        <div className="w-full sm:w-px h-px sm:h-20 bg-gradient-to-r sm:bg-gradient-to-b from-transparent via-slate-600 to-transparent"></div>

        {/* Right: Counter */}
        <div className="flex justify-center">
          <TimeUnit value={timeLeft.days} label="Days" />
          <div className="text-slate-600 text-2xl font-light mt-2">:</div>
          <TimeUnit value={timeLeft.hours} label="Hrs" />
          <div className="text-slate-600 text-2xl font-light mt-2">:</div>
          <TimeUnit value={timeLeft.minutes} label="Mins" />
          <div className="text-slate-600 text-2xl font-light mt-2">:</div>
          <TimeUnit value={timeLeft.seconds} label="Secs" />
        </div>
      </div>
    </div>
  );
};