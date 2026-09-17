'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import { Battery, Zap, Shield, Cpu, Skull } from 'lucide-react';
import { LiquidGlass } from './liquid-glass';

const features = [
  { icon: <Zap className="w-5 h-5 text-neon-green" />, title: "Endless Survival", desc: "Fight against chaotic OS threats." },
  { icon: <Skull className="w-5 h-5 text-red-500" />, title: "Funny Enemies", desc: "Chrome Tab Monsters & RAM Eaters." },
  { icon: <Battery className="w-5 h-5 text-neon-blue" />, title: "Power-Ups", desc: "Fast Charge, EMP Blast & more." },
  { icon: <Cpu className="w-5 h-5 text-neon-purple" />, title: "Boss Events", desc: "System UI Not Responding." },
];

export default function BatterySurvivorSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  return (
    <section id="featured" ref={containerRef} className="relative py-20 md:py-32 w-full overflow-hidden text-white">
      {/* Cyberpunk Grid Background */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none"
        style={{
          maskImage: 'radial-gradient(60% 50% at 50% 50%, #000 70%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(60% 50% at 50% 50%, #000 70%, transparent 100%)'
        }}
      ></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div style={{ opacity, y }} className="text-center mb-20">
          <h2 className="text-sm font-bold tracking-widest uppercase text-neon-green mb-4">Featured Project</h2>
          <h3 className="text-5xl md:text-7xl font-display font-black uppercase italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neon-green via-white to-neon-purple drop-shadow-[0_0_10px_rgba(57,255,20,0.5)]">
            Battery Survivor
          </h3>
          <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto">
            A fast-paced arcade survival game set inside a dying smartphone. Built with Kotlin and Jetpack Compose.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Mockup Container */}
          <motion.div style={{ scale, opacity }} className="relative flex justify-center perspective-1000">
            <div className="relative w-64 sm:w-72 h-[500px] sm:h-[600px] bg-gray-900 rounded-[2.5rem] sm:rounded-[3rem] border-4 border-gray-800 shadow-[0_0_50px_rgba(57,255,20,0.2)] overflow-hidden transform-gpu rotate-y-[-10deg] rotate-x-[5deg]">
              <div className="absolute top-0 inset-x-0 h-6 bg-black z-20 rounded-t-[3rem] flex justify-center">
                <div className="w-20 h-4 bg-gray-800 rounded-b-xl"></div>
              </div>
              <div className="absolute inset-0 bg-black flex flex-col items-center justify-center p-4">
                <h4 className="text-2xl font-black text-red-500 mb-2 animate-pulse">LOW BATTERY</h4>
                <div className="w-32 h-16 border-4 border-white p-1 relative rounded-sm mb-8">
                  <div className="h-full bg-red-500 w-1/5 animate-[pulse_0.5s_infinite]"></div>
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-2 h-6 bg-white rounded-r-sm"></div>
                </div>
                <p className="text-neon-green text-center text-sm mb-8">Wave 12: RAM Eater Blob Incoming!</p>
                <div className="grid grid-cols-2 gap-2 w-full">
                  <div className="h-20 bg-gray-800 rounded-xl flex items-center justify-center border border-neon-green/30"><Zap className="text-neon-green" /></div>
                  <div className="h-20 bg-gray-800 rounded-xl flex items-center justify-center border border-neon-blue/30"><Shield className="text-neon-blue" /></div>
                </div>
              </div>
            </div>
            
            {/* Glow effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-neon-green/20 blur-[100px] -z-10 rounded-full"></div>
          </motion.div>

          {/* Features List */}
          <div className="space-y-8">
            <div className="prose prose-invert">
              <p className="text-lg text-gray-300">
                You play as a tiny living battery fighting against chaos inside an overloaded operating system. 
                Humanity somehow turned &quot;having 73 background apps open&quot; into a survival genre.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <LiquidGlass 
                    interactive
                    className="p-6 rounded-3xl h-full"
                  >
                    <div className="mb-4 p-3 rounded-2xl bg-white/5 inline-block transition-transform">
                      {feature.icon}
                    </div>
                    <h4 className="text-xl font-bold mb-2 text-white/90">{feature.title}</h4>
                    <p className="text-sm text-white/60">{feature.desc}</p>
                  </LiquidGlass>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="pt-4"
            >
              <LiquidGlass 
                href="https://github.com/akshatbhardwaj15122011-collab/My-fun-little-app" 
                interactive
                className="inline-flex items-center justify-center px-8 py-4 rounded-full"
              >
                <span className="relative flex items-center gap-3 font-semibold text-white/90">
                  View on GitHub
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </span>
              </LiquidGlass>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
