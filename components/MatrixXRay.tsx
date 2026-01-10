
import React, { useEffect, useRef } from 'react';
import { useSovereign } from '../context/SovereignContext.tsx';

export const MatrixXRay: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isSunshineMode } = useSovereign();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true }); // Enable alpha for clean clearing
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const characters = '01SYNKNDISRCG'.split('');
    const fontSize = isMobile ? 22 : 14;
    const columns = Math.ceil(width / fontSize);
    const drops: number[] = Array.from({ length: columns }, () => Math.random() * -100);

    const draw = () => {
      // CLEAR the canvas completely so it's transparent
      ctx.clearRect(0, 0, width, height);
      
      ctx.font = `bold ${fontSize}px "JetBrains Mono"`;

      const step = isMobile ? 3 : 1;

      for (let i = 0; i < columns; i += step) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        for (let j = 0; j < 8; j++) {
          const trailY = y - (j * fontSize);
          if (trailY < 0 || trailY > height) continue;

          const opacity = 1 - (j / 8);
          
          if (j === 0) {
            // TIP COLOR
            ctx.fillStyle = isSunshineMode ? 'rgba(15, 23, 42, 1)' : 'rgba(255, 255, 255, 1)';
          } else {
            // TRAIL COLORS
            if (i % 2 === 0) {
              // GOLD TRAIL
              ctx.fillStyle = isSunshineMode 
                ? `rgba(139, 110, 49, ${opacity * 0.9})` 
                : `rgba(229, 199, 139, ${opacity * 0.8})`;
            } else {
              // BLUE TRAIL
              ctx.fillStyle = isSunshineMode 
                ? `rgba(8, 145, 178, ${opacity * 0.9})` 
                : `rgba(6, 182, 212, ${opacity * 0.8})`;
            }
          }
          
          const text = characters[Math.floor(Math.random() * characters.length)];
          ctx.fillText(text, x, trailY);
        }

        if (y > height && Math.random() > 0.985) {
          drops[i] = 0;
        }
        drops[i] += isMobile ? 0.15 : 0.2;
      }
    };

    let animationFrameId: number;
    let lastTime = 0;
    const fpsLimit = isMobile ? 24 : 45;

    const render = (time: number) => {
      const delta = time - lastTime;
      if (delta > 1000 / fpsLimit) {
          draw();
          lastTime = time;
      }
      animationFrameId = requestAnimationFrame(render);
    };
    render(0);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isSunshineMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] transition-opacity duration-1000"
      style={{
        // Higher opacity in Sunshine mode to contrast the light background
        opacity: isSunshineMode ? 0.9 : 0.3,
        maskImage: `radial-gradient(circle 120px at var(--cursor-x, 50%) var(--cursor-y, 50%), black 40%, transparent 100%)`,
        WebkitMaskImage: `radial-gradient(circle 120px at var(--cursor-x, 50%) var(--cursor-y, 50%), black 40%, transparent 100%)`,
      }}
    />
  );
};
