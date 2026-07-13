"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="relative py-32 bg-dark-bg w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h2 className="section-title mb-6">
              Preserve your <span className="text-gold italic">wildest</span> adventures.
            </h2>
            <div className="gold-line w-16 mb-8" />
            <p className="text-fog-light text-lg md:text-xl leading-relaxed mb-6 font-light">
              ESCAPISM is a sanctuary for your travel memories. We believe that every journey, every mountain scaled, and every campfire shared deserves to be remembered in stunning detail.
            </p>
          </motion.div>

          {/* Image Composition */}
          <div className="relative h-[600px] w-full hidden md:block">
            {/* Main Image */}
            <motion.div
              className="absolute top-0 right-10 w-3/4 h-[450px] rounded-xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 to-transparent z-10" />
              <img
                src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80"
                alt="Winding mountain road"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Overlapping Image (Bottom Left) */}
            <motion.div
              className="absolute bottom-10 left-0 w-3/5 h-[350px] rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-dark-bg z-20"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/40 to-transparent z-10" />
              <img
                src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80"
                alt="Camping under stars"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Decorative Gold Element */}
            <motion.div
              className="absolute top-20 right-5 w-24 h-24 border border-gold/40 rounded-full z-0"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
