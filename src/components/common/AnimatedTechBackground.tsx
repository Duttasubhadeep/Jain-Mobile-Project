import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';

export const AnimatedTechBackground: React.FC = () => {
  const { visualTheme, animationsEnabled } = useApp();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Floating particles canvas
  useEffect(() => {
    if (!animationsEnabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle color based on theme
    const getThemeColor = () => {
      switch (visualTheme) {
        case 'festive-gold':
          return { r: 245, g: 158, b: 11, accentR: 239, accentG: 68, accentB: 68 };
        case 'hyper-blue':
          return { r: 0, g: 240, b: 255, accentR: 168, accentG: 85, accentB: 247 };
        case 'cyber-crimson':
        default:
          return { r: 255, g: 30, b: 70, accentR: 255, accentG: 183, accentB: 3 };
      }
    };

    // Particle system (optimized ~35 particles for smooth 60fps)
    const particleCount = Math.min(Math.floor(window.innerWidth / 35), 45);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedY: Math.random() * 0.4 + 0.15,
      speedX: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.5 + 0.15,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      isAccent: Math.random() > 0.65,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const colors = getThemeColor();

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.pulse += p.pulseSpeed;

        // Wrap around edges
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentOpacity = Math.max(0.1, p.opacity + Math.sin(p.pulse) * 0.2);
        const r = p.isAccent ? colors.accentR : colors.r;
        const g = p.isAccent ? colors.accentG : colors.g;
        const b = p.isAccent ? colors.accentB : colors.b;

        // Draw glowing particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentOpacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${currentOpacity * 1.5})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [visualTheme, animationsEnabled]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Dynamic Theme Radial Auroras */}
      {visualTheme === 'cyber-crimson' && (
        <>
          {/* Crimson Aurora Top Right */}
          <div className="absolute -top-[15%] -right-[10%] w-[650px] h-[650px] rounded-full bg-[#FF1E46]/16 blur-[140px] animate-pulse [animation-duration:8s]" />
          {/* Cyber Gold Aurora Middle Left */}
          <div className="absolute top-[35%] -left-[10%] w-[550px] h-[550px] rounded-full bg-[#FFB703]/10 blur-[130px] animate-pulse [animation-duration:11s]" />
          {/* Deep Ruby Aurora Bottom */}
          <div className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] rounded-full bg-[#B30024]/14 blur-[130px]" />
        </>
      )}

      {visualTheme === 'festive-gold' && (
        <>
          {/* Radiant Festive Gold Aurora */}
          <div className="absolute -top-[15%] -right-[10%] w-[650px] h-[650px] rounded-full bg-[#F59E0B]/22 blur-[140px] animate-pulse [animation-duration:7s]" />
          {/* Festive Red Spark Aurora */}
          <div className="absolute top-[35%] -left-[10%] w-[550px] h-[550px] rounded-full bg-[#EF4444]/15 blur-[130px] animate-pulse [animation-duration:10s]" />
          {/* Warm Champagne Aurora */}
          <div className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] rounded-full bg-[#FBBF24]/18 blur-[130px]" />
        </>
      )}

      {visualTheme === 'hyper-blue' && (
        <>
          {/* Hyper Cyan Aurora */}
          <div className="absolute -top-[15%] -right-[10%] w-[650px] h-[650px] rounded-full bg-[#00F0FF]/18 blur-[140px] animate-pulse [animation-duration:7s]" />
          {/* Cyber Violet Aurora */}
          <div className="absolute top-[35%] -left-[10%] w-[550px] h-[550px] rounded-full bg-[#A855F7]/16 blur-[130px] animate-pulse [animation-duration:10s]" />
          {/* Deep Sapphire Aurora */}
          <div className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] rounded-full bg-[#3B82F6]/14 blur-[130px]" />
        </>
      )}

      {/* Cyber Isometric Grid Mesh */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Floating Sparkles Canvas */}
      {animationsEnabled && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.85 }}
        />
      )}
    </div>
  );
};
