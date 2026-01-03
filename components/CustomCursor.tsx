import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      setPosition({ x, y });
      
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' ||
        target.closest('button') !== null ||
        target.closest('a') !== null
      );
    };

    const onMouseDown = () => setIsMouseDown(true);
    const onMouseUp = () => setIsMouseDown(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  return (
    <div 
      className={`fixed inset-0 pointer-events-none z-[99999] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Unified Reticle Container - Zero Lag Movement */}
      <div 
        className="fixed left-0 top-0 will-change-transform flex items-center justify-center"
        style={{ 
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      >
        {/* Structural Chassis - Moves in perfect sync with the core */}
        <div 
          className={`relative flex items-center justify-center rounded-full border-2 transition-all duration-300 ease-out ${
            isMouseDown ? 'w-6 h-6 border-neon-blue shadow-[0_0_20px_#06b6d4]' : 
            isPointer ? 'w-16 h-16 border-neon-blue bg-neon-blue/10 shadow-[0_0_30px_rgba(6,182,212,0.4)]' : 
            'w-12 h-12 border-neon-purple/90 shadow-[0_0_15px_rgba(217,70,239,0.5),0_0_30px_rgba(217,70,239,0.2)]'
          }`}
        >
          {/* Cardinal Crosshairs */}
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-2.5 transition-colors ${isPointer ? 'bg-white' : 'bg-neon-purple shadow-[0_0_5px_#d946ef]'}`} />
          <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[2px] h-2.5 transition-colors ${isPointer ? 'bg-white' : 'bg-neon-purple shadow-[0_0_5px_#d946ef]'}`} />
          <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-2.5 h-[2px] transition-colors ${isPointer ? 'bg-white' : 'bg-neon-purple shadow-[0_0_5px_#d946ef]'}`} />
          <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-[2px] transition-colors ${isPointer ? 'bg-white' : 'bg-neon-purple shadow-[0_0_5px_#d946ef]'}`} />
          
          {/* External Halo Ring */}
          <div className="absolute inset-[-6px] rounded-full border border-white/10" />

          {/* Interaction Echo Effect */}
          {isPointer && (
            <div className="absolute inset-0 rounded-full border-2 border-white animate-ping opacity-40" />
          )}

          {/* Precision Core - Perfectly centered inside the chassis */}
          <div 
            className="absolute rounded-full flex items-center justify-center transition-transform duration-200 ease-out"
            style={{ 
              transform: `scale(${isPointer ? 1.5 : 1})`,
            }}
          >
            <div className="w-2 h-2 bg-neon-blue rounded-full shadow-[0_0_15px_#06b6d4,0_0_30px_rgba(6,182,212,0.4)] relative">
               <div className="absolute inset-0 rounded-full border border-neon-purple opacity-80 scale-125 shadow-[0_0_10px_#d946ef]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};