
import React, { useEffect, useRef } from 'react';
import { useSovereign } from '../context/SovereignContext.tsx';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  pulseSize: number;
}

export const SovereignGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isThinking, lastPulse } = useSovereign();
  const nodes = useRef<Node[]>([]);
  const pulses = useRef<{ x: number, y: number, radius: number, alpha: number }[]>([]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const nodeCount = Math.floor((width * height) / 25000);
    nodes.current = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      pulseSize: 0,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      const speedMultiplier = isThinking ? 3 : 1;
      const opacityMultiplier = isThinking ? 2 : 1;

      // Update and draw pulses
      pulses.current = pulses.current.filter(p => p.alpha > 0.01);
      pulses.current.forEach(p => {
        p.radius += 5;
        p.alpha *= 0.96;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(6, 182, 212, ${p.alpha * 0.3})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      nodes.current.forEach((node, i) => {
        node.x += node.vx * speedMultiplier;
        node.y += node.vy * speedMultiplier;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Connections
        for (let j = i + 1; j < nodes.current.length; j++) {
          const other = nodes.current[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            const alpha = (1 - dist / 150) * 0.15 * opacityMultiplier;
            ctx.strokeStyle = i % 2 === 0 
              ? `rgba(6, 182, 212, ${alpha})` 
              : `rgba(217, 70, 239, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? '#06b6d4' : '#d946ef';
        ctx.fill();
        
        if (isThinking) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = i % 2 === 0 ? '#06b6d4' : '#d946ef';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      requestAnimationFrame(draw);
    };

    const animationId = requestAnimationFrame(draw);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [isThinking]);

  useEffect(() => {
    if (lastPulse) {
      pulses.current.push({ x: lastPulse.x, y: lastPulse.y, radius: 0, alpha: 1 });
    }
  }, [lastPulse]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[2]"
      style={{ opacity: isThinking ? 0.8 : 0.5 }}
    />
  );
};
