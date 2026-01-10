import React, { useEffect, useRef } from 'react';

export const MatrixXRay: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const characters = '01SYNKNDISRCG'.split('');
    const fontSize = isMobile ? 22 : 14;
    const columns = Math.ceil(width / fontSize);
    const drops: number[] = Array.from({ length: columns }, () => Math.random() * -100);

    const draw = () => {
      ctx.fillStyle = '#334155';
      ctx.fillRect(0, 0, width, height);
      ctx.font = `bold ${fontSize}px "JetBrains Mono"`;

      const step = isMobile ? 3 : 1;

      for (let i = 0; i < columns; i += step) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        for (let j = 0; j < 5; j++) {
          const trailY = y - (j * fontSize);
          if (trailY < 0 || trailY > height) continue;

          if (j === 0) {
            ctx.fillStyle = '#ffffff';
          } else {
            const opacity = 1 - (j / 5);
            ctx.fillStyle = i % 2 === 0 ? `rgba(217, 70, 239, ${opacity})` : `rgba(6, 182, 212, ${opacity})`;
          }
          
          const text = characters[Math.floor(Math.random() * characters.length)];
          ctx.fillText(text, x, trailY);
        }

        if (y > height && Math.random() > 0.985) {
          drops[i] = 0;
        }
        drops[i] += isMobile ? 0.1 : 0.15;
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{
        // DEFINED SHARPNESS: Radius cut to 80px for high-precision X-ray effect
        maskImage: `radial-gradient(circle 80px at var(--cursor-x, 50%) var(--cursor-y, 50%), black 50%, transparent 100%)`,
        WebkitMaskImage: `radial-gradient(circle 80px at var(--cursor-x, 50%) var(--cursor-y, 50%), black 50%, transparent 100%)`,
        opacity: 0.8
      }}
    />
  );
};