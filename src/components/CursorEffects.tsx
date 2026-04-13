import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function CursorEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device has a fine pointer (mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsFinePointer(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!isFinePointer) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: any[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over clickable elements
      const target = e.target as HTMLElement;
      const clickable = 
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null;
      setIsHovering(clickable);

      // Spawn gilded particles (鎏金粒子)
      for (let i = 0; i < 3; i++) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2 + 0.5, // Slight downward drift
          life: 1,
          size: Math.random() * 2 + 1,
          color: `hsla(${40 + Math.random() * 15}, 100%, ${50 + Math.random() * 30}%, 1)`
        });
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02; // Decay rate
        p.size *= 0.95; // Shrink rate
        
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      
      particles = particles.filter(p => p.life > 0);
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isFinePointer, isVisible]);

  if (!isFinePointer) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998]"
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
        animate={{
          x: mousePos.x - 12, // Center horizontally
          y: mousePos.y - 2,  // Align the roof tip with the actual cursor point
          scale: isHovering ? 1.15 : 1,
          opacity: isVisible ? 1 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 35,
          mass: 0.5
        }}
      >
        {/* Palace SVG Cursor */}
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill={isHovering ? "rgba(255, 215, 0, 0.4)" : "none"} 
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_6px_rgba(255,215,0,0.8)] transition-colors duration-300"
        >
          <path d="M2 12C2 12 5.5 9 12 4C18.5 9 22 12 22 12" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M5 11.5V20H19V11.5" stroke="#FFD700" strokeWidth="1.5"/>
          <path d="M10 20V15H14V20" stroke="#FFD700" strokeWidth="1.5"/>
          <path d="M12 4V2" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M2 20H22" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </motion.div>
    </>
  );
}
