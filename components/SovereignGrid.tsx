
import React, { useEffect, useRef } from 'react';
import { useSovereign } from '../context/SovereignContext.tsx';

interface Node {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
}

export const SovereignGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isThinking, lastPulse } = useSovereign();
  const nodes = useRef<Node[]>([]);
  const pulses = useRef<{ x: number, y: number, radius: number, alpha: number }[]>([]);
  const mousePos = useRef({ x: -1000, y: -1000 });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const isMobile = width < 768;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove);

    const nodeCount = Math.floor((width * height) / (isMobile ? 60000 : 35000));
    nodes.current = Array.from({ length: nodeCount }, () => {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      return {
        x: rx,
        y: ry,
        baseX: rx,
        baseY: ry,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
      };
    });

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      const speedMultiplier = isThinking ? 1.6 : 1;
      const opacityMultiplier = isThinking ? 1.2 : 1;

      pulses.current = pulses.current.filter(p => p.alpha > 0.01);
      pulses.current.forEach(p => {
        p.radius += isMobile ? 1.5 : 2.5;
        p.alpha *= 0.98;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(30, 41, 59, ${p.alpha * 0.3})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      nodes.current.forEach((node, i) => {
        // Base drift
        node.baseX += node.vx * speedMultiplier;
        node.baseY += node.vy * speedMultiplier;

        if (node.baseX < 0 || node.baseX > width) node.vx *= -1;
        if (node.baseY < 0 || node.baseY > height) node.vy *= -1;

        // SOFT DISPLACEMENT
        const dx = node.baseX - mousePos.current.x;
        const dy = node.baseY - mousePos.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 280;

        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 55;
          const targetX = node.baseX + (dx / dist) * force;
          const targetY = node.baseY + (dy / dist) * force;
          
          // Smoothly move towards target displacement
          node.x += (targetX - node.x) * 0.08;
          node.y += (targetY - node.y) * 0.08;
        } else {
          // Smoothly return to base with slight momentum
          node.x += (node.baseX - node.x) * 0.05;
          node.y += (node.baseY - node.y) * 0.05;
        }

        const maxConnDist = isMobile ? 120 : 180;
        for (let j = i + 1; j < nodes.current.length; j++) {
          const other = nodes.current[j];
          const dxx = node.x - other.x;
          const dyy = node.y - other.y;
          const ddistSq = dxx * dxx + dyy * dyy;

          if (ddistSq < maxConnDist * maxConnDist) {
            const ddist = Math.sqrt(ddistSq);
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            const alpha = (1 - ddist / maxConnDist) * 0.05 * opacityMultiplier;
            ctx.strokeStyle = `rgba(148, 163, 184, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(148, 163, 184, 0.25)';
        ctx.fill();
      });

      requestAnimationFrame(draw);
    };

    const animationId = requestAnimationFrame(draw);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
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
      style={{ opacity: 0.6 }}
    />
  );
};
