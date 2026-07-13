"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { trips } from "@/data/mockData";

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trip = trips[0]; // Using the first mock trip

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="timeline" className="py-24 bg-dark-surface relative border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.p
            className="text-gold text-sm tracking-widest uppercase mb-2 font-semibold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {trip.location} • {trip.startDate}
          </motion.p>
          <motion.h2 
            className="section-title mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {trip.name}
          </motion.h2>
          <motion.p 
            className="text-fog-light max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {trip.description}
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto" ref={containerRef}>
          {/* Center Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gold/10 transform md:-translate-x-1/2" />
          
          {/* Animated Draw Line */}
          <motion.div 
            className="absolute left-8 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-gold-light via-gold to-gold-dark transform md:-translate-x-1/2 origin-top shadow-[0_0_10px_rgba(212,175,55,0.5)]" 
            style={{ height: lineHeight }}
          />

          {trip.days.map((day, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={day.day} className={`relative flex items-center mb-16 last:mb-0 ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                
                {/* Center Node */}
                <motion.div 
                  className="absolute left-8 md:left-1/2 w-8 h-8 bg-dark-bg border-2 border-gold rounded-full transform -translate-x-1/2 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                >
                  <span className="text-xs">{day.icon}</span>
                </motion.div>

                {/* Content */}
                <motion.div 
                  className={`w-full md:w-1/2 pl-20 md:pl-0 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <div className={`glass p-6 rounded-2xl hover:border-gold/30 transition-colors ${isEven ? 'ml-auto' : 'mr-auto'}`}>
                    <div className={`flex items-center gap-3 mb-4 ${isEven ? 'md:justify-end' : ''}`}>
                      <span className="text-gold font-heading text-xl italic">Day {day.day}</span>
                      <div className="w-8 h-px bg-gold/30" />
                      <h4 className="text-cream text-lg font-medium">{day.title}</h4>
                    </div>
                    
                    <p className="text-fog text-sm mb-6 leading-relaxed">
                      {day.description}
                    </p>

                    <div className="relative aspect-video rounded-xl overflow-hidden group">
                      <div className="absolute inset-0 bg-dark-bg/20 group-hover:bg-transparent transition-colors z-10" />
                      <img 
                        src={day.image} 
                        alt={day.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
