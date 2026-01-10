import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isOnLightBg, setIsOnLightBg] = useState(false);
  
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 }); 
  const requestRef = useRef<number>(null);

  useEffect(() => {
    const touchCheck = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(touchCheck);

    if (touchCheck) {
        document.documentElement.classList.remove('custom-cursor-active');
        return;
    }

    document.documentElement.classList.add('custom-cursor-active');
    const root = document.documentElement;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
      
      const target = e.target as HTMLElement;
      const isClickable = (
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' ||
        target.closest('button') !== null ||
        target.closest('a') !== null
      );
      
      setIsPointer(isClickable);
      
      const contrastElement = target.closest('[data-cursor-contrast="true"]');
      setIsOnLightBg(!!contrastElement);
    };

    const updateCursor = () => {
      const { x, y } = mousePos.current;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      
      root.style.setProperty('--cursor-x', `${x}px`);
      root.style.setProperty('--cursor-y', `${y}px`);
      
      requestRef.current = requestAnimationFrame(updateCursor);
    };

    const onMouseDown = () => setIsMouseDown(true);
    const onMouseUp = () => setIsMouseDown(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    requestRef.current = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.documentElement.classList.remove('custom-cursor-active');
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  const CrownPath = "m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14";

  return (
    <>
      {/* ATMOSPHERIC LENS - REACTIVE GLOW */}
      <div 
        className="fixed inset-0 pointer-events-none z-[99990] transition-opacity duration-1000"
        style={{ 
          opacity: isVisible ? 1 : 0,
          background: `radial-gradient(circle 350px at var(--cursor-x, 50%) var(--cursor-y, 50%), ${
            isOnLightBg 
              ? 'rgba(0, 0, 0, 0.05)' 
              : isPointer ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.03)'
          }, transparent 100%)`
        }}
      />

      <div 
        ref={cursorRef}
        className={`fixed left-0 top-0 pointer-events-none z-[100000] will-change-transform flex items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ width: '40px', height: '40px', marginLeft: '-20px', marginTop: '-20px' }}
      >
        <div className={`relative w-full h-full flex items-center justify-center transition-all duration-500`}>
          
          {/* HIGH-IMPACT CLICK RESONANCE - MULTI-LAYER OMNIDIRECTIONAL BURST */}
          {isMouseDown && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* LAYER 1: The Deep Structural Burst (Hard ring) */}
              <div 
                className={`absolute w-12 h-12 rounded-full border-[12px] animate-deep-burst opacity-80 ${
                  isOnLightBg ? 'border-black/40' : 'border-[#06b6d4]/80 shadow-[0_0_40px_#06b6d4]'
                }`} 
              />
              
              {/* LAYER 2: The Neural Shockwave (Atmospheric expansion) */}
              <div 
                className={`absolute w-12 h-12 rounded-full border-[2px] animate-neural-shockwave ${
                  isOnLightBg ? 'border-black/10' : 'border-[#06b6d4]/30'
                }`} 
              />

              {/* LAYER 3: Core Flash (Center point intensity) */}
              <div className={`absolute w-8 h-8 rounded-full bg-white/20 blur-xl animate-pulse`} />
            </div>
          )}

          {isPointer ? (
            /* BRAND-BLUE FOCUS DOT: Core identity anchor */
            <div className={`w-3 h-3 bg-[#06b6d4] rounded-full shadow-[0_0_15px_#fff,0_0_30px_#06b6d4,0_0_60px_#06b6d4,0_0_90px_rgba(6,182,212,0.9)] transition-all duration-300 z-10 ${isMouseDown ? 'scale-75' : 'scale-100'}`} />
          ) : (
            /* STANDARD BRAND MODE: The Crown */
            <div className={`relative transition-all duration-300 z-10 ${isMouseDown ? 'scale-75' : 'scale-100'}`}>
              <svg 
                viewBox="0 0 24 24" 
                width="26" 
                height="26" 
                className={`transition-all duration-500 transform drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)] ${
                  isOnLightBg ? 'text-black' : 'text-white/90'
                }`}
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
              >
                <path 
                  d={CrownPath} 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className={`transition-all duration-700 ${
                    isOnLightBg 
                      ? '' 
                      : 'drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]'
                  }`}
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </>
  );
};