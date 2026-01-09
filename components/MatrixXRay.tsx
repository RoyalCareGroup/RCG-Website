import React, { useEffect, useRef } from 'react';

export const MatrixXRay: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use alpha false for standard background optimization
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const characters = '01SYNKNDISRCG'.split('');
    const fontSize = isMobile ? 24 : 16; // Larger font on mobile to reduce draw operations
    const columns = Math.ceil(width / fontSize);
    const drops: number[] = [];

    // Reduce density by skipping columns on mobile
    const densitySkip = isMobile ? 3 : 1;

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      ctx.fillStyle = '#334155'; // Static background color match
      ctx.fillRect(0, 0, width, height);

      ctx.font = `black ${fontSize}px "JetBrains Mono"`;

      for (let i = 0; i < drops.length; i += densitySkip) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        
        ctx.fillStyle = i % 2 === 0 ? '#d946ef' : '#06b6d4'; 
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > (isMobile ? 0.95 : 0.985)) {
          drops[i] = 0;
        }
        drops[i] += isMobile ? 0.4 : 0.75; // Slower speed on mobile to save CPU
      }
    };

    let animationFrameId: number;
    let lastTime = 0;
    const fpsLimit = isMobile ? 24 : 60; // Throttling framerate significantly on mobile

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
        maskImage: `radial-gradient(circle 240px at var(--cursor-x, 50%) var(--cursor-y, 50%), black 10%, transparent 70%)`,
        WebkitMaskImage: `radial-gradient(circle 240px at var(--cursor-x, 50%) var(--cursor-y, 50%), black 10%, transparent 70%)`,
        opacity: 0.8
      }}
    />
  );
};