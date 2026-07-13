"use client";

import { motion } from "framer-motion";
import { homestays } from "@/data/mockData";
import HomestayCard from "./HomestayCard";

export default function HomestaySection() {
  return (
    <section id="homestays" className="py-24 bg-dark-bg relative border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.h2 
              className="section-title mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Luxury <span className="text-gold italic">Retreats</span>
            </motion.h2>
            <motion.p 
              className="text-fog-light max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Discover handpicked stays that offer more than just a bed. Experience the culture, the views, and the soul of the mountains.
            </motion.p>
          </div>
          
          <motion.a
            href="#"
            className="shrink-0 text-gold text-sm uppercase tracking-widest font-semibold hover:text-gold-light transition-colors flex items-center gap-2 group"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            View All Stays
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </motion.a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {homestays.map((homestay, index) => (
            <HomestayCard key={homestay.id} homestay={homestay} index={index} />
          ))}
          {/* Add a couple of mock placeholder cards to fill the grid if we only have 2 mock homestays */}
          {homestays.map((homestay, index) => (
            <HomestayCard key={`mock-${homestay.id}`} homestay={{...homestay, id: `mock-${homestay.id}`}} index={index + 2} />
          ))}
        </div>
      </div>
    </section>
  );
}
