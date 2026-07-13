"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Memory } from "@/types";
import { FiX, FiChevronLeft, FiChevronRight, FiHeart, FiDownload, FiShare2, FiInfo, FiMapPin, FiCalendar } from "react-icons/fi";
import { categories } from "@/data/mockData";

interface LightboxProps {
  memories: Memory[];
  initialIndex: number;
  onClose: () => void;
}

export default function Lightbox({ memories, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [showInfo, setShowInfo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const memory = memories[currentIndex];
  const categoryInfo = categories.find(c => c.id === memory.category);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  // Slideshow
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [isPlaying, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % memories.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-dark-bg/95 backdrop-blur-xl flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10 bg-gradient-to-b from-dark-bg/80 to-transparent">
        <div className="text-fog text-sm font-medium tracking-widest">
          {currentIndex + 1} / {memories.length}
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className={`text-sm tracking-widest uppercase transition-colors ${isPlaying ? 'text-gold' : 'text-cream hover:text-gold'}`}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button 
            onClick={() => setShowInfo(!showInfo)}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-cream hover:text-gold transition-colors"
          >
            <FiInfo size={20} />
          </button>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-cream hover:text-gold transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12 overflow-hidden">
        {/* Previous Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className="absolute left-4 md:left-8 w-12 h-12 rounded-full glass flex items-center justify-center text-cream hover:text-gold transition-colors z-10"
        >
          <FiChevronLeft size={24} />
        </button>

        {/* Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="relative max-w-full max-h-full flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
          >
            <img
              src={memory.src}
              alt={memory.title}
              className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-sm"
            />
          </motion.div>
        </AnimatePresence>

        {/* Next Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="absolute right-4 md:right-8 w-12 h-12 rounded-full glass flex items-center justify-center text-cream hover:text-gold transition-colors z-10"
        >
          <FiChevronRight size={24} />
        </button>

        {/* Info Sidebar Overlay */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              className="absolute top-0 right-0 bottom-0 w-full md:w-96 bg-dark-surface/95 backdrop-blur-xl border-l border-gold/10 p-8 pt-24 z-20 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <h2 className="font-heading text-3xl text-cream mb-6">{memory.title}</h2>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {categoryInfo && (
                  <span className="px-3 py-1 glass-light rounded text-xs text-cream flex items-center gap-1">
                    <span>{categoryInfo.emoji}</span> {categoryInfo.label}
                  </span>
                )}
                {memory.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 glass-light rounded text-xs text-fog capitalize">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="space-y-4 mb-8">
                {memory.location && (
                  <div className="flex items-center gap-3 text-fog-light">
                    <FiMapPin className="text-gold" />
                    <span className="text-sm">{memory.location}</span>
                  </div>
                )}
                {memory.date && (
                  <div className="flex items-center gap-3 text-fog-light">
                    <FiCalendar className="text-gold" />
                    <span className="text-sm">{memory.date}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-4 mt-auto">
                <button className="flex-1 py-3 glass rounded-full flex items-center justify-center gap-2 text-cream hover:border-gold/50 transition-colors">
                  <FiHeart className={memory.isLiked ? "fill-gold text-gold" : ""} />
                  <span className="text-sm font-medium">{memory.likes}</span>
                </button>
                <button className="w-12 h-12 glass rounded-full flex items-center justify-center text-cream hover:border-gold/50 transition-colors">
                  <FiDownload />
                </button>
                <button className="w-12 h-12 glass rounded-full flex items-center justify-center text-cream hover:border-gold/50 transition-colors">
                  <FiShare2 />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
