"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiArchive, FiFileText, FiCheckCircle } from "react-icons/fi";

export default function DownloadCenter() {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = (type: string) => {
    setDownloading(type);
    
    // Simulate generation and download
    setTimeout(() => {
      setDownloading(null);
      // In a real app, this would trigger the actual file download
      alert(`Your ${type} download is ready!`);
    }, 2500);
  };

  const options = [
    {
      id: "trip-zip",
      title: "Himalayan Expedition (ZIP)",
      description: "Download all original high-resolution photos and metadata from this trip.",
      icon: <FiArchive className="w-6 h-6" />,
      size: "1.2 GB",
    },
    {
      id: "trip-pdf",
      title: "Travel Album (PDF)",
      description: "Generate a beautiful digital photobook with timeline, maps, and curated memories.",
      icon: <FiFileText className="w-6 h-6" />,
      size: "24 MB",
    }
  ];

  return (
    <section className="py-24 bg-dark-bg relative border-t border-gold/10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="section-title mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Take Your <span className="text-gold italic">Memories</span>
          </motion.h2>
          <motion.p 
            className="text-fog-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Download full-resolution archives or generate beautiful PDF travel albums.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {options.map((option, index) => (
            <motion.div
              key={option.id}
              className="glass p-8 rounded-2xl relative overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              {/* Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-full bg-dark-surface border border-gold/20 flex items-center justify-center text-gold group-hover:bg-gold/10 transition-colors">
                  {option.icon}
                </div>
                <span className="text-xs font-semibold text-fog tracking-widest uppercase bg-dark-bg px-3 py-1 rounded-full border border-gold/10">
                  {option.size}
                </span>
              </div>

              <h3 className="font-heading text-2xl text-cream mb-3">{option.title}</h3>
              <p className="text-fog-light text-sm leading-relaxed mb-8 h-10">
                {option.description}
              </p>

              <button
                onClick={() => handleDownload(option.id)}
                disabled={downloading !== null}
                className="w-full relative py-4 rounded-xl font-semibold uppercase tracking-widest text-sm overflow-hidden transition-all duration-300 bg-dark-surface border border-gold/30 text-cream group-hover:border-gold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <AnimatePresence mode="wait">
                  {downloading === option.id ? (
                    <motion.div
                      key="downloading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-3 text-gold"
                    >
                      <div className="w-4 h-4 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
                      Generating...
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2 group-hover:text-gold transition-colors"
                    >
                      <FiDownload /> Download
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
