"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Dynamically import the Leaflet map component with SSR disabled
const RealMap = dynamic(() => import("./RealMap"), { ssr: false });

export default function DestinationMap() {
  return (
    <section className="py-24 bg-dark-bg relative border-t border-gold/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            className="section-title mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Trace the <span className="text-gold italic">Journey</span>
          </motion.h2>
          <motion.p 
            className="text-fog-light max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Interactive mapping of your memories. Explore the real moments captured across the Himalayas.
          </motion.p>
        </div>

        {/* Map Container */}
        <motion.div 
          className="relative w-full h-[600px] rounded-2xl overflow-hidden glass border-gold/20 z-0"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <RealMap />
        </motion.div>
      </div>
    </section>
  );
}
