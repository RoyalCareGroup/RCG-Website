import React, { useEffect, useRef } from 'react';
import { useSovereign } from '../context/SovereignContext.tsx';

export const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isWelcomePlaying, welcomeAnalyser } = useSovereign();
  
  const drops = useRef<number[]>([]);
  const characters = '01SYNKNDISRCG'.split('');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const isMobile = width < 768;

    const fontSize = isMobile ? 18 : 14;
    const columns = Math.ceil(width / fontSize);
    
    // Initialize drops for the full width
    if (drops.current.length === 0 || drops.current.length !== columns) {
      drops.current = Array.from({ length: columns }, () => Math.random() * -100);
    }

    const draw = () => {
      // Base background fill (Slate Blue)
      ctx.fillStyle = '#334155';
      ctx.fillRect(0, 0, width, height);

      if (isWelcomePlaying && welcomeAnalyser) {
        // --- MODE A: NEURAL GREEN HORIZON ---
        const bufferLength = welcomeAnalyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        welcomeAnalyser.getByteFrequencyData(dataArray);

        const centerY = height * 0.5;
        const barWidth = (width / bufferLength) * 2.5;
        
        ctx.save();
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00ff41';
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
        ctx.strokeStyle = 'rgba(0, 255, 65, 0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();

        let x = 0;
        for (let i = 0; i < bufferLength; i++) {
          const intensity = dataArray[i] / 255;
          const barHeight = intensity * (isMobile ? 140 : 220);
          
          if (barHeight > 1) {
            ctx.fillStyle = `rgba(0, 255, 65, ${intensity * 0.3})`;
            ctx.fillRect(x, centerY - barHeight, Math.max(1, barWidth), barHeight * 2);
            const grad = ctx.createLinearGradient(0, centerY - barHeight, 0, centerY + barHeight);
            grad.addColorStop(0, 'transparent');
            grad.addColorStop(0.2, 'rgba(0, 255, 65, 0.8)');
            grad.addColorStop(0.5, '#ffffff'); 
            grad.addColorStop(0.8, 'rgba(0, 255, 65, 0.8)');
            grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad;
            ctx.fillRect(x + (barWidth * 0.25), centerY - barHeight, Math.max(1, barWidth * 0.5), barHeight * 2);
          }
          x += barWidth;
        }
      } else {
        // --- MODE B: DEFINED MATRIX WATERFALL (Full Width Tracking) ---
        ctx.font = `bold ${fontSize}px "JetBrains Mono"`;
        
        const step = isMobile ? 2 : 1;

        for (let i = 0; i < columns; i += step) {
          const x = i * fontSize;
          const y = drops.current[i] * fontSize;

          // Render trail for "Defined" look (5 glyphs deep)
          for (let j = 0; j < 6; j++) {
            const char = characters[Math.floor(Math.random() * characters.length)];
            const trailY = y - (j * fontSize);
            
            if (trailY < 0 || trailY > height) continue;

            if (j === 0) {
              ctx.fillStyle = '#ffffff';
            } else {
              const opacity = 1 - (j / 6);
              const color = i % 3 === 0 ? `rgba(6, 182, 212, ${opacity})` : `rgba(217, 70, 239, ${opacity})`;
              ctx.fillStyle = color;
            }
            
            ctx.fillText(char, x, trailY);
          }

          if (y > height && Math.random() > 0.98) {
            drops.current[i] = 0;
          }
          
          drops.current[i] += isMobile ? 0.12 : 0.18;
        }
      }
    };

    let frameId: number;
    const render = () => {
      draw();
      frameId = requestAnimationFrame(render);
    };
    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const newColumns = Math.ceil(width / fontSize);
      drops.current = Array.from({ length: newColumns }, () => Math.random() * -100);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
    };
  }, [isWelcomePlaying, welcomeAnalyser]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{
        // DEFINED SHARPNESS: Radius cut to 100px, falloff tightened to 60-100 range
        maskImage: isWelcomePlaying 
          ? 'none' 
          : `radial-gradient(circle 100px at var(--cursor-x, 50%) var(--cursor-y, 50%), black 60%, transparent 100%)`,
        WebkitMaskImage: isWelcomePlaying 
          ? 'none' 
          : `radial-gradient(circle 100px at var(--cursor-x, 50%) var(--cursor-y, 50%), black 60%, transparent 100%)`,
        opacity: isWelcomePlaying ? 1.0 : 0.85,
      }}
    />
  );
};