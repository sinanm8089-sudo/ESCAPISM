"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const ThreeScene = dynamic(() => import("@/components/three/ThreeScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-dark-bg" />
  ),
});

const tagline = "Escape. Explore. Remember.";

export default function Hero() {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Three.js Background */}
      <ThreeScene />

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-dark-bg/40 via-transparent to-dark-bg pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-dark-bg via-dark-bg/20 to-transparent pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 flex flex-col items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <img 
            src="/images/brand/logo.jpg" 
            alt="ESCAPISM Logo" 
            className="mx-auto mb-8 w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-2 border-gold/40 shadow-[0_0_40px_rgba(212,175,55,0.3)]"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-gradient-gold">ESCAPISM</span>
        </motion.h1>

        {/* Tagline with staggered letters */}
        <motion.p
          className="text-lg md:text-2xl text-fog-light font-body tracking-[0.25em] uppercase mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {tagline.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 + i * 0.03 }}
            >
              {char}
            </motion.span>
          ))}
        </motion.p>

        {/* Gold accent line */}
        <motion.div
          className="gold-line w-24 mb-12 mx-auto"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        />

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <a
            href="#gallery"
            className="group relative px-8 py-4 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-dark-bg font-semibold rounded-full text-sm uppercase tracking-widest overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:scale-105"
          >
            <span className="relative z-10">View Memories</span>
            <div className="absolute inset-0 bg-gradient-to-r from-gold-light via-gold to-gold-dark opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </a>
          <a
            href="#upload"
            className="group px-8 py-4 glass rounded-full text-cream font-semibold text-sm uppercase tracking-widest transition-all duration-500 hover:border-gold/40 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:scale-105"
          >
            Upload Photos
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-fog text-xs uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          className="w-5 h-8 border border-gold/30 rounded-full flex items-start justify-center p-1"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 bg-gold rounded-full"
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
