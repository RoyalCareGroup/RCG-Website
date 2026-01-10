import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -200, y: -200 });
  const [isPointer, setIsPointer] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  useEffect(() => {
    // Detect touch capability to prevent locking interactions on mobile
    const touchCheck = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(touchCheck);

    if (touchCheck) {
        document.documentElement.classList.remove('custom-cursor-active');
        return;
    }

    // Only apply the "cursor: none" logic on desktop/pointer devices
    document.documentElement.classList.add('custom-cursor-active');
    const root = document.documentElement;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      setPosition({ x, y });
      
      root.style.setProperty('--cursor-x', `${x}px`);
      root.style.setProperty('--cursor-y', `${y}px`);
      
      if (!isVisible) setIsVisible(true);
      
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
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [isVisible]);

  // Bypass rendering completely on mobile to save performance and ensure native touch behavior
  if (isTouchDevice) return null;

  const CrownPath = "m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14";

  return (
    <div 
      className={`fixed inset-0 pointer-events-none z-[99999] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div 
        className="fixed left-0 top-0 will-change-transform flex items-center justify-center"
        style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      >
        <div className={`relative flex items-center justify-center transition-transform duration-300 ${isPointer ? 'scale-110' : 'scale-100'}`}>
          {/* PRIMARY ATMOSPHERIC GLOW - Made larger (w-24/w-32) and brighter */}
          <div className={`absolute rounded-full transition-all duration-500 ease-out ${
            isPointer ? 'bg-neon-blue shadow-[0_0_60px_#06b6d4]' : 'bg-white shadow-[0_0_60px_#ffffff]'
          } ${
            isPointer 
              ? 'w-32 h-32 opacity-40 blur-2xl scale-150' 
              : 'w-24 h-24 opacity-30 blur-xl scale-125'
          } ${isMouseDown ? 'scale-75 opacity-60' : ''}`} />

          {/* INTENSE CORE LIGHT - New high-intensity center to justify the beam */}
          <div className={`absolute rounded-full w-8 h-8 bg-white/40 blur-md transition-opacity duration-500 ${isPointer ? 'opacity-80' : 'opacity-40'}`} />

          <div className={`relative transition-all duration-300 ease-out ${isMouseDown ? 'scale-75' : 'scale-100'}`}>
            <svg 
              viewBox="0 0 24 24" 
              width="24" 
              height="24" 
              className={`transition-colors duration-500 -translate-x-1/2 -translate-y-1/2 absolute top-0 left-0 ${
                isPointer ? 'text-neon-blue' : 'text-white'
              }`}
              fill="currentColor" 
              fillOpacity={isPointer ? "0.6" : "0.2"}
              stroke="currentColor" 
              strokeWidth="2.5"
            >
              <path 
                d={CrownPath} 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className={`transition-all duration-500 ${
                  isPointer ? 'drop-shadow-[0_0_12px_#06b6d4]' : 'drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]'
                }`}
              />
            </svg>
          </div>

          {isPointer && (
            <div className="absolute w-16 h-16 border-2 border-neon-blue/40 rounded-full animate-ping pointer-events-none" />
          )}
        </div>
      </div>
    </div>
  );
};