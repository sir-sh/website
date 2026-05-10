'use client';

import { useEffect, useRef } from 'react';

export function AmbientBackground({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationId: number;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      hue: number;
    }> = [];
    
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1,
        hue: Math.random() > 0.5 ? 45 : 220,
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        particles.forEach((p2, j) => {
          if (i >= j) return;
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = variant === 'dark' 
              ? `rgba(201, 169, 98, ${0.05 * (1 - dist / 150)})` 
              : `rgba(201, 169, 98, ${0.08 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = variant === 'dark'
          ? `hsla(45, 50%, 70%, ${p.opacity})`
          : `hsla(40, 60%, 50%, ${p.opacity})`;
        ctx.fill();
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [variant]);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

export function HeroVisual({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      <AmbientBackground variant={variant} />
      
      {/* Radial gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: variant === 'dark'
            ? 'radial-gradient(ellipse at 30% 50%, rgba(201, 169, 98, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(96, 165, 250, 0.05) 0%, transparent 40%)'
            : 'radial-gradient(ellipse at 20% 80%, rgba(201, 169, 98, 0.06) 0%, transparent 40%), radial-gradient(ellipse at 80% 20%, rgba(96, 165, 250, 0.04) 0%, transparent 40%)',
        }}
      />
      
      {/* Grid lines */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: variant === 'dark'
            ? `linear-gradient(rgba(201, 169, 98, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(201, 169, 98, 0.05) 1px, transparent 1px)`
            : `linear-gradient(rgba(201, 169, 98, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201, 169, 98, 0.03) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
        }}
      />
      
      {/* HUD rings */}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 border rounded-full"
        style={{
          borderColor: 'rgba(201, 169, 98, 0.08)',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div 
        className="absolute top-1/4 left-1/4 w-64 h-64 border rounded-full"
        style={{
          borderColor: 'rgba(201, 169, 98, 0.06)',
          transform: 'translate(-50%, -50%)',
        }}
      />
      
      {/* Animated ring */}
      <div 
        className="absolute top-1/3 right-1/4 w-48 h-48 border border-dashed rounded-full"
        style={{
          borderColor: 'rgba(96, 165, 250, 0.1)',
          animation: 'spin 60s linear infinite',
        }}
      />
      
      <style jsx>{`
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </div>
  );
}