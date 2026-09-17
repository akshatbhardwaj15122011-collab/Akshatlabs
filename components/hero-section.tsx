'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { LiquidGlass } from './liquid-glass';

export default function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <motion.div 
        style={{ y, opacity }}
        className="z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <LiquidGlass interactive className="inline-flex px-6 py-2 rounded-full">
            <span className="text-sm font-medium tracking-wide text-white/90">Grade 9 Student & Developer</span>
          </LiquidGlass>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-6"
        >
          Building <span className="text-gradient bg-gradient-to-r from-neon-green to-neon-blue">Creative</span> Software
        </motion.h1>

        <LiquidGlass
          interactive
          className="max-w-2xl mx-auto mb-10 px-8 py-6 rounded-[2rem]"
        >
          <p className="text-lg md:text-xl text-gray-300">
            I am Akshat Bhardwaj. I enjoy creating projects that are both technically interesting and fun to use.
          </p>
        </LiquidGlass>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent"></div>
      </motion.div>
    </section>
  );
}
