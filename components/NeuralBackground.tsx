import React, { useEffect, useRef } from 'react';
import { useSovereign } from '../context/SovereignContext.tsx';

export const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isWelcomePlaying, welcomeAnalyser } = useSovereign();
  
  // Matrix State Persistence
  const drops = useRef<number[]>([]);
  const characters = '01SYNKNDISRCG'.split('');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Optimization: alpha false since we fill the whole canvas every frame
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const isMobile = width < 768;

    // Initialize Matrix Glyphs
    const fontSize = isMobile ? 22 : 16;
    const columns = Math.ceil(width / fontSize);
    if (drops.current.length === 0) {
      for (let i = 0; i < columns; i++) {
        drops.current[i] = Math.random() * -100;
      }
    }

    const draw = () => {
      // 1. BASE BACKGROUND FILL - Slate Blue standard
      ctx.fillStyle = '#334155';
      ctx.fillRect(0, 0, width, height);

      if (isWelcomePlaying && welcomeAnalyser) {
        // --- MODE A: NEURAL GREEN HORIZON (Equalizer) ---
        const bufferLength = welcomeAnalyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        welcomeAnalyser.getByteFrequencyData(dataArray);

        const centerY = height * 0.5;
        const barWidth = (width / bufferLength) * 2.5;
        
        // Oscilloscope Horizontal Axis
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
            // Frequency Bar Glow
            ctx.fillStyle = `rgba(0, 255, 65, ${intensity * 0.3})`;
            ctx.fillRect(x, centerY - barHeight, Math.max(1, barWidth), barHeight * 2);

            // White-hot Core
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

        // Global Bloom Overlay
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = 'rgba(0, 255, 65, 0.04)';
        ctx.fillRect(0, centerY - 150, width, 300);
        ctx.restore();

      } else {
        // --- MODE B: MATRIX WATERFALL (X-Ray Mode) ---
        ctx.font = `bold ${fontSize}px "JetBrains Mono"`;
        const densitySkip = isMobile ? 3 : 1;

        for (let i = 0; i < drops.current.length; i += densitySkip) {
          const text = characters[Math.floor(Math.random() * characters.length)];
          
          // Use high-fidelity Cyan and Purple
          const isCyan = i % 2 === 0;
          ctx.fillStyle = isCyan ? 'rgba(6, 182, 212, 0.8)' : 'rgba(217, 70, 239, 0.8)';
          
          // Leading glyph is brighter
          if (Math.random() > 0.95) ctx.fillStyle = '#ffffff';

          ctx.fillText(text, i * fontSize, drops.current[i] * fontSize);

          if (drops.current[i] * fontSize > height && Math.random() > 0.98) {
            drops.current[i] = 0;
          }
          drops.current[i] += isMobile ? 0.45 : 0.8;
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
      // Re-initialize columns on resize
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
        // RADIUS SET TO 520px for high-fidelity scanning effect
        maskImage: isWelcomePlaying 
          ? 'none' 
          : `radial-gradient(circle 520px at var(--cursor-x, 50%) var(--cursor-y, 50%), black 20%, rgba(0,0,0,0.8) 40%, transparent 100%)`,
        WebkitMaskImage: isWelcomePlaying 
          ? 'none' 
          : `radial-gradient(circle 520px at var(--cursor-x, 50%) var(--cursor-y, 50%), black 20%, rgba(0,0,0,0.8) 40%, transparent 100%)`,
        opacity: isWelcomePlaying ? 1.0 : 0.8,
        transition: 'opacity 0.8s ease-in-out, mask-image 0.5s ease-in-out'
      }}
    />
  );
};