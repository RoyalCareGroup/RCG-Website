
import React, { useEffect, useRef } from 'react';
import { useSovereign } from '../context/SovereignContext.tsx';

export const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const time = useRef(0);
  const scrollPos = useRef(0);
  const { isSunshineMode } = useSovereign();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    const onScroll = () => {
      scrollPos.current = window.scrollY;
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll, { passive: true });

    // --- MATRIX RAIN SETUP ---
    const fontSize = 16;
    const columns = Math.ceil(width / fontSize);
    const drops = Array.from({ length: columns }, () => Math.random() * (height / fontSize));
    const charPool = '01SYNKNDISRCG$#@%&*'.split('');
    const tailLength = 22; 

    // Neural Smoke Nodes (Subtle atmospheric depth)
    const nodes = Array.from({ length: 8 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 600 + 400,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      color: Math.random() > 0.7 ? '#E5C78B' : '#1E293B',
      opacity: 0.05 
    }));

    const draw = () => {
      time.current += 0.005;
      
      // Background base
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, width, height);

      // --- LAYER 1: CHROMATIC MATRIX RAIN (SOFTENED) ---
      ctx.font = `bold ${fontSize}px "JetBrains Mono"`;
      
      // Global opacity multiplier to soften the overall effect
      const globalOpacity = 0.35;

      for (let i = 0; i < columns; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Interaction logic
        const dx = x - mousePos.current.x;
        const dist = Math.abs(dx);
        const isNearMouse = dist < 200;
        const mouseFactor = isNearMouse ? (1 - dist / 200) : 0;
        // Reduced base speed for calmer atmosphere
        const currentSpeed = 0.1 + (mouseFactor * 0.3) + (scrollPos.current * 0.00005);

        // --- DRAW TAIL ---
        for (let j = 0; j < tailLength; j++) {
          const tailY = y - (j * fontSize);
          
          if (tailY < -fontSize || tailY > height + fontSize) continue;

          let alpha = (1 - (j / tailLength)) * globalOpacity;
          alpha = Math.max(0, alpha);

          if (j === 0) {
            // THE LEAD SYMBOL: Soft White
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          } else if (j < 6) {
            // GOLD TRANSITION: Lowered prominence
            ctx.fillStyle = `rgba(229, 199, 139, ${alpha * 0.6})`;
          } else {
            // DEEP NEON BLUE TAIL: Lowered prominence
            ctx.fillStyle = `rgba(6, 182, 212, ${alpha * 0.4})`;
          }

          const char = charPool[Math.floor(Math.random() * charPool.length)];
          ctx.fillText(char, x, tailY);
        }

        // Reset logic
        if (y - (tailLength * fontSize) > height && Math.random() > 0.985) {
          drops[i] = 0;
        }
        drops[i] += currentSpeed;
      }

      // --- LAYER 2: NEURAL SMOKE (Subtle Blends) ---
      ctx.globalCompositeOperation = 'screen';
      nodes.forEach((node, i) => {
        node.x += node.vx + Math.sin(time.current + i) * 0.1;
        node.y += node.vy + Math.cos(time.current + i) * 0.1;

        if (node.x < -node.radius) node.x = width + node.radius;
        if (node.x > width + node.radius) node.x = -node.radius;
        if (node.y < -node.radius) node.y = height + node.radius;
        if (node.y > height + node.radius) node.y = -node.radius;

        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius);
        const col = node.color === '#E5C78B' ? '229, 199, 139' : '30, 41, 59';
        gradient.addColorStop(0, `rgba(${col}, ${node.opacity})`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalCompositeOperation = 'source-over';
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
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000 ${!isSunshineMode ? 'opacity-100' : 'opacity-0'}`}
    />
  );
};
