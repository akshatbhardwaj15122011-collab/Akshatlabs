'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'motion/react';
import { cn } from '@/lib/utils';
import { lightingEngine } from '@/lib/lighting-engine';

interface LiquidGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  interactive?: boolean;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export function LiquidGlass({ 
  children, 
  interactive = false, 
  className,
  href,
  onClick,
  ...props 
}: LiquidGlassProps) {
  const ref = useRef<any>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { stiffness: 75, damping: 20, mass: 0.5 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);
  
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const updateRect = () => {
      if (ref.current) {
        rectRef.current = ref.current.getBoundingClientRect();
      }
    };
    
    // Initial rect after paint
    requestAnimationFrame(updateRect);
    
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect, { passive: true });

    const unsubscribe = lightingEngine.subscribe((lights, mx, my) => {
      if (!rectRef.current || !overlayRef.current) return;

      const rect = rectRef.current;
      
      let bgString = '';
      let borderString = '';
      
      // Calculate mouse light (cursor glow)
      const mouseXRel = mx - rect.left;
      const mouseYRel = my - rect.top;
      const isMouseNear = mx > -1000 && mx >= rect.left - 200 && mx <= rect.right + 200 && my >= rect.top - 200 && my <= rect.bottom + 200;
      
      if (isMouseNear && interactive) {
        bgString += `radial-gradient(circle at ${mouseXRel}px ${mouseYRel}px, rgba(255,255,255,0.3) 0%, transparent 200px)`;
        borderString += `radial-gradient(circle at ${mouseXRel}px ${mouseYRel}px, rgba(255,255,255,1.0) 0%, transparent 200px)`;
      }

      // Calculate particle lights
      let addedLight = false;
      lights.forEach((l) => {
        const lxRel = l.x - rect.left;
        const lyRel = l.y - rect.top;
        
        // Only render lights that might intersect the element to save performance
        const distToCenter = Math.hypot((rect.width/2) - lxRel, (rect.height/2) - lyRel);
        if (distToCenter > l.radius + Math.max(rect.width, rect.height)) return;

        const intensity = l.baseIntensity + Math.sin(l.phase) * 0.1;
        
        if (bgString || addedLight) {
          bgString += ', ';
          borderString += ', ';
        }
        
        bgString += `radial-gradient(circle at ${lxRel}px ${lyRel}px, rgba(${l.r},${l.g},${l.b},${intensity * 0.4}) 0%, transparent ${l.radius * 2}px)`;
        borderString += `radial-gradient(circle at ${lxRel}px ${lyRel}px, rgba(${l.r},${l.g},${l.b},${intensity * 1.5}) 0%, transparent ${l.radius * 1.5}px)`;
        addedLight = true;
      });

      if (!bgString) bgString = 'transparent';
      if (!borderString) borderString = 'rgba(255,255,255,0.1)';

      overlayRef.current.style.background = bgString;
      if (borderRef.current) {
        borderRef.current.style.background = borderString;
      }
    });

    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
      unsubscribe();
    };
  }, [interactive]);
  
  function handleMouseMove(event: React.MouseEvent<Element>) {
    if (!ref.current) return;
    if (!rectRef.current) rectRef.current = ref.current.getBoundingClientRect();
    const rect = rectRef.current;
    if (!rect) return;
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const normalizedX = (event.clientX - centerX) / (rect.width / 2);
    const normalizedY = (event.clientY - centerY) / (rect.height / 2);
    
    x.set(normalizedX);
    y.set(normalizedY);
  }
  
  function handleMouseEnter() {
    setHovered(true);
  }
  
  function handleMouseLeave() {
    setHovered(false);
    x.set(0);
    y.set(0);
  }
  
  const rotateX = useTransform(mouseY, [-1, 1], interactive ? [4, -4] : [0, 0]);
  const rotateY = useTransform(mouseX, [-1, 1], interactive ? [-4, 4] : [0, 0]);
  
  const baseClassName = cn(
    "relative block transform-gpu",
    "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]", 
    hovered && interactive && "scale-[1.01]",
    className
  );

  const style = {
    rotateX,
    rotateY,
    transformPerspective: 1200,
    transformStyle: "preserve-3d" as const,
  };

  const innerContent = (
    <>
      {/* Base Blur and Surface */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[48px] saturate-[180%] rounded-[inherit] pointer-events-none" />
      
      {/* Top specular reflection */}
      <div className="absolute inset-0 rounded-[inherit] pointer-events-none bg-gradient-to-b from-white/[0.12] to-transparent opacity-80" />

      {/* Dynamic Internal Lighting (Particles & Cursor) */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 rounded-[inherit] pointer-events-none mix-blend-screen opacity-100 transition-opacity duration-300"
        style={{ willChange: 'background, transform', transform: 'translateZ(0)' }}
      />

      {/* Chromatic edges (subtle) */}
      <div className="absolute inset-0 rounded-[inherit] pointer-events-none shadow-[inset_1px_0_0_rgba(255,0,0,0.05),inset_-1px_0_0_rgba(0,150,255,0.05)]" />

      {/* Dynamic Edge Highlight (Border) */}
      <div 
        ref={borderRef}
        className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-100"
        style={{
          padding: '1px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          background: 'rgba(255,255,255,0.1)',
          willChange: 'background, transform',
          transform: 'translateZ(0)'
        }}
      />

      {/* Inner shadow for thickness */}
      <div className="absolute inset-0 rounded-[inherit] pointer-events-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_-1px_1px_rgba(0,0,0,0.5)]" />
      
      {/* Drop shadow */}
      <div className={cn(
        "absolute -inset-4 rounded-[inherit] pointer-events-none opacity-0 blur-2xl transition-opacity duration-700 bg-black/40",
        hovered && interactive && "opacity-100"
      )} />

      {/* Content */}
      <motion.div 
        className="relative z-10 w-full h-full transform-gpu" 
        style={{ transform: interactive && hovered ? 'translateZ(12px)' : 'translateZ(0px)', transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)' }}
      >
        {children}
      </motion.div>
    </>
  );

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('//');
    if (isExternal) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          ref={ref}
          onMouseMove={interactive ? handleMouseMove : undefined}
          onMouseEnter={interactive ? handleMouseEnter : undefined}
          onMouseLeave={interactive ? handleMouseLeave : undefined}
          onClick={onClick}
          style={style}
          whileTap={interactive ? { scale: 0.98 } : {}}
          className={baseClassName}
        >
          {innerContent}
        </motion.a>
      );
    }
    return (
      <motion.a
        href={href}
        ref={ref}
        onMouseMove={interactive ? handleMouseMove : undefined}
        onMouseEnter={interactive ? handleMouseEnter : undefined}
        onMouseLeave={interactive ? handleMouseLeave : undefined}
        onClick={onClick}
        style={style}
        whileTap={interactive ? { scale: 0.98 } : {}}
        className={baseClassName}
      >
        {innerContent}
      </motion.a>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={interactive ? handleMouseMove : undefined}
      onMouseEnter={interactive ? handleMouseEnter : undefined}
      onMouseLeave={interactive ? handleMouseLeave : undefined}
      onClick={onClick}
      style={style}
      whileTap={interactive ? { scale: 0.98 } : {}}
      className={baseClassName}
      {...(props as any)}
    >
      {innerContent}
    </motion.div>
  );
}
