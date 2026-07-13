"use client";

import { motion } from "framer-motion";
import { categories } from "@/data/mockData";

export default function AICategorization() {
  return (
    <section className="py-16 bg-dark-bg relative border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div>
            <motion.div 
              className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 border border-gold/30 rounded-full mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-xs text-gold font-semibold tracking-widest uppercase">AI Vision Active</span>
            </motion.div>
            <motion.h3 
              className="text-3xl font-heading text-cream mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Smart Categorization
            </motion.h3>
            <motion.p 
              className="text-fog-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Our Vision AI automatically detects scenes, objects, and moods to organize your memories perfectly.
            </motion.p>
          </div>
          
          <motion.div 
            className="flex -space-x-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className={`w-12 h-12 rounded-full border-2 border-dark-bg bg-dark-surface flex items-center justify-center z-[${4-i}]`}
              >
                {i === 1 ? '🏔' : i === 2 ? '🏕' : '🌅'}
              </div>
            ))}
            <div className="w-12 h-12 rounded-full border-2 border-dark-bg bg-gold/20 flex items-center justify-center z-0">
              <span className="text-gold text-xs font-bold">+8</span>
            </div>
          </motion.div>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.filter(c => c.id !== 'all').map((category, i) => (
            <motion.div
              key={category.id}
              className="glass p-4 rounded-xl flex flex-col items-center justify-center text-center group cursor-default hover:bg-gold/5 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
              whileHover={{ y: -5 }}
            >
              <span className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                {category.emoji}
              </span>
              <span className="text-xs text-cream font-medium tracking-wide">
                {category.label}
              </span>
              <span className="text-[10px] text-fog mt-1">
                {category.count} Photos
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
