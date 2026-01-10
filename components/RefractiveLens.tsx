
import React, { useEffect, useState, useRef } from 'react';

export const RefractiveLens: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const streakRef = useRef<HTMLDivElement>(null);
  const leakRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate dynamic movement factors
  const leakTransform = `translate(-50%, -50%) translate3d(${scrollY * 0.1}px, ${scrollY * 0.05}px, 0) rotate(${scrollY * 0.02}deg)`;
  const streakTransform = `translateY(${scrollY * 1.2}px) rotate(-15deg)`;

  return (
    <div className="refractive-overlay">
      {/* Dynamic Light Leak */}
      <div 
        ref={leakRef}
        className="lens-leak animate-prism-pulse"
        style={{ transform: leakTransform, top: '20%', left: '30%' }}
      />
      
      {/* Cinematic Horizontal Streak */}
      <div 
        ref={streakRef}
        className="prism-streak"
        style={{ transform: streakTransform, top: '10%', left: '-50%' }}
      />

      <div 
        className="prism-streak opacity-30"
        style={{ 
          transform: `translateY(${scrollY * 1.8}px) rotate(-12deg)`, 
          top: '40%', 
          left: '-20%',
          height: '1px'
        }}
      />

      {/* Edge Chromatic Fringe */}
      <div className="fixed inset-0 pointer-events-none opacity-20 mix-blend-screen overflow-hidden">
         <div 
           className="absolute -top-[10%] -left-[10%] w-[120%] h-[120%] border-[40px] border-cyan-500/10 blur-[80px]"
           style={{ transform: `scale(${1 + scrollY * 0.0001})` }}
         />
         <div 
           className="absolute -bottom-[10%] -right-[10%] w-[120%] h-[120%] border-[40px] border-magenta-500/10 blur-[80px]"
           style={{ transform: `scale(${1 + scrollY * 0.00015})` }}
         />
      </div>
    </div>
  );
};
