'use client';

import { motion } from 'motion/react';
import { Palette, Monitor, Image as ImageIcon, Presentation, Hash, Box } from 'lucide-react';
import { LiquidGlass } from './liquid-glass';

const designs = [
  { icon: <Monitor className="w-8 h-8" />, title: "UI Mockups", desc: "Prototyping interfaces before coding." },
  { icon: <ImageIcon className="w-8 h-8" />, title: "Posters", desc: "Event flyers and promotional material." },
  { icon: <Presentation className="w-8 h-8" />, title: "Presentations", desc: "Engaging slide decks and pitches." },
  { icon: <Hash className="w-8 h-8" />, title: "Social Media", desc: "Eye-catching posts and banners." },
  { icon: <Box className="w-8 h-8" />, title: "Branding Assets", desc: "Logos, color palettes, and identity." },
  { icon: <Palette className="w-8 h-8" />, title: "Visual Content", desc: "Illustrations and custom graphics." },
];

export default function CanvaSection() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden text-white">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
            <Palette className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Creative Design</h2>
          <p className="text-xl text-gray-400">
            Beyond writing code, I have a strong passion for visual design. I use Canva extensively 
            to bring ideas to life before they hit the browser.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {designs.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <LiquidGlass
                interactive
                className="group rounded-[2.5rem] p-8 h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="text-white/60 group-hover:text-blue-400 transition-colors mb-6">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white/90">{item.title}</h3>
                <p className="text-white/50 group-hover:text-white/70 transition-colors">
                  {item.desc}
                </p>
                
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-2xl group-hover:bg-blue-500/30 transition-colors duration-500"></div>
              </LiquidGlass>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
