"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Memory } from "@/types";
import { FiDownload, FiShare2 } from "react-icons/fi";
import { categories } from "@/data/mockData";

interface MemoryCardProps {
  memory: Memory;
  onClick: () => void;
  index: number;
}

export default function MemoryCard({ memory, onClick, index }: MemoryCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const categoryInfo = categories.find(c => c.id === memory.category);

  const handleAction = (e: React.MouseEvent, action: string) => {
    e.stopPropagation();
    if (action === "download") {
      const link = document.createElement("a");
      link.href = memory.src;
      link.download = `${memory.title}.jpg`;
      link.click();
    }
  };

  return (
    <motion.div
      className="relative rounded-xl overflow-hidden cursor-pointer group bg-dark-surface"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: (index % 10) * 0.05 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      {/* Aspect-ratio wrapper */}
      <div
        className="w-full relative"
        style={{ paddingBottom: `${(memory.height / memory.width) * 100}%` }}
      >
        {/* Skeleton shimmer while loading */}
        {!imgLoaded && (
          <div className="absolute inset-0 bg-dark-surface animate-pulse" />
        )}

        {/* blob: URLs (client uploads) skip next/image optimization */}
        {memory.src.startsWith("blob:") ? (
          <img
            src={memory.src}
            alt={memory.title}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
          />
        ) : (
          <Image
            src={memory.src}
            alt={memory.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-all duration-700 group-hover:scale-105 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
          />
        )}
      </div>

      {/* Hover Overlay */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-dark-bg/20 to-transparent flex flex-col justify-between p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Top action buttons */}
            <div className="flex justify-end gap-2">
              <button
                aria-label="Share this memory"
                onClick={(e) => handleAction(e, "share")}
                className="w-8 h-8 rounded-full glass-light flex items-center justify-center text-cream hover:bg-gold/20 hover:text-gold transition-colors"
              >
                <FiShare2 size={14} />
              </button>
              <button
                aria-label="Download this memory"
                onClick={(e) => handleAction(e, "download")}
                className="w-8 h-8 rounded-full glass-light flex items-center justify-center text-cream hover:bg-gold/20 hover:text-gold transition-colors"
              >
                <FiDownload size={14} />
              </button>
            </div>

            {/* Bottom: title, category, location */}
            <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-cream font-heading text-lg leading-tight mb-1">
                {memory.title}
              </h3>

              <div className="flex items-center gap-2 mt-2">
                {categoryInfo && (
                  <span className="text-xs px-2 py-1 rounded glass-light text-cream flex items-center gap-1">
                    <span>{categoryInfo.emoji}</span> {categoryInfo.label}
                  </span>
                )}
                {memory.location && (
                  <span className="text-[10px] text-fog-light truncate max-w-[120px]">
                    {memory.location}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
