
import React, { useEffect, useRef } from 'react';

export const MatrixXRay: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const characters = '01SYNKNDISRCGΣΩλπΦΨ'.split('');
    const fontSize = 16;
    const columns = Math.ceil(width / fontSize);
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      // CLEAR WITH SLATE ALPHA (Matches the brand background color)
      // This allows the trails to fade into the slate rather than into black
      ctx.fillStyle = 'rgba(51, 65, 85, 0.12)'; 
      ctx.fillRect(0, 0, width, height);

      ctx.font = `bold ${fontSize}px "JetBrains Mono"`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        
        // Vibrant brand colors for the reveal
        ctx.fillStyle = i % 2 === 0 ? '#d946ef' : '#06b6d4'; 
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.985) {
          drops[i] = 0;
        }
        drops[i] += 0.75;
      }
    };

    let animationFrameId: number;
    const render = () => {
      draw();
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

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
        // Large 280px reveal radius for high visibility
        maskImage: `radial-gradient(circle 280px at var(--cursor-x, -500px) var(--cursor-y, -500px), black 10%, transparent 70%)`,
        WebkitMaskImage: `radial-gradient(circle 280px at var(--cursor-x, -500px) var(--cursor-y, -500px), black 10%, transparent 70%)`,
        opacity: 0.9
      }}
    />
  );
};
