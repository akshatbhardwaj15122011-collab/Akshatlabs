'use client';

import { motion } from 'motion/react';
import { Leaf, Layout, Smartphone, Code } from 'lucide-react';
import { LiquidGlass } from './liquid-glass';

const skills = [
  { icon: <Layout />, label: "Clean UI Design" },
  { icon: <Smartphone />, label: "Responsive Layouts" },
  { icon: <Code />, label: "Frontend Architecture" },
  { icon: <Leaf />, label: "Sustainability Focus" },
];

export default function GreentechSection() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 space-y-8"
          >
            <div>
              <h2 className="text-emerald-400 font-semibold tracking-wide uppercase text-sm mb-3 flex items-center gap-2">
                <Leaf className="w-4 h-4" /> Web Development
              </h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold mb-6">GreenTech Platform</h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                A modern, responsive website focused on sustainability and environmental technology. 
                This project demonstrates my ability to translate complex environmental concepts into 
                clean, accessible, and engaging user interfaces.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    {skill.icon}
                  </div>
                  <span className="font-medium">{skill.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 relative"
          >
            <LiquidGlass interactive className="relative aspect-video rounded-[2rem] overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500 z-10"></div>
              
              {/* Abstract Representation of a Clean Website Layout */}
              <div className="w-full h-full p-6 sm:p-8 flex flex-col gap-6 sm:gap-8 relative z-10">
                <div className="flex justify-between items-center pb-4 sm:pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                    <div className="h-3 sm:h-4 w-20 sm:w-24 bg-white/20 rounded-full"></div>
                  </div>
                  <div className="hidden sm:flex gap-4">
                    <div className="h-3 w-12 bg-white/10 rounded-full"></div>
                    <div className="h-3 w-12 bg-white/10 rounded-full"></div>
                    <div className="h-3 w-12 bg-white/10 rounded-full"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 h-full">
                  <div className="sm:col-span-7 flex flex-col gap-4 justify-center">
                    <div className="h-8 sm:h-10 w-3/4 bg-white/20 rounded-lg"></div>
                    <div className="h-4 sm:h-6 w-full bg-white/10 rounded-lg"></div>
                    <div className="h-4 sm:h-6 w-5/6 bg-white/10 rounded-lg"></div>
                    <div className="h-10 w-32 bg-emerald-500/80 rounded-full mt-2 sm:mt-4"></div>
                  </div>
                  <div className="hidden sm:block sm:col-span-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl"></div>
                </div>
              </div>
            </LiquidGlass>
            
            {/* Soft Glow */}
            <div className="absolute -inset-4 bg-emerald-500/20 blur-[100px] -z-10 rounded-full"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
