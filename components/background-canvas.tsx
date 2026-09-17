'use client';

import { useEffect, useRef } from 'react';
import { lightingEngine } from '@/lib/lighting-engine';

export function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const pixelRatio = isMobile ? 0.5 : 1; // Downscale canvas resolution for performance

    const resize = () => {
      canvas.width = window.innerWidth * pixelRatio;
      canvas.height = window.innerHeight * pixelRatio;
    };
    window.addEventListener('resize', resize);
    resize();

    const unsubscribe = lightingEngine.subscribe((lights) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      lights.forEach(l => {
        const x = l.x * pixelRatio;
        const y = l.y * pixelRatio;
        const radius = l.radius * pixelRatio;
        
        const intensity = l.baseIntensity + Math.sin(l.phase) * 0.1;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        
        gradient.addColorStop(0, `rgba(${l.r}, ${l.g}, ${l.b}, ${intensity * 0.6})`);
        gradient.addColorStop(0.4, `rgba(${l.r}, ${l.g}, ${l.b}, ${intensity * 0.2})`);
        gradient.addColorStop(1, `rgba(${l.r}, ${l.g}, ${l.b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw the core
        ctx.fillStyle = `rgba(255, 255, 255, ${intensity * 1.5})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.5 * pixelRatio, 0, Math.PI * 2);
        ctx.fill();
      });
    });

    return () => {
      window.removeEventListener('resize', resize);
      unsubscribe();
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-80 mix-blend-screen"
      style={{ willChange: 'transform', transform: 'translateZ(0)' }}
    />
  );
}
