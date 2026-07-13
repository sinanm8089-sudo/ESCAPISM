"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Memory } from "@/types";
import { FiHeart, FiDownload, FiShare2 } from "react-icons/fi";
import { categories } from "@/data/mockData";

interface MemoryCardProps {
  memory: Memory;
  onClick: () => void;
  index: number;
}

export default function MemoryCard({ memory, onClick, index }: MemoryCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [liked, setLiked] = useState(memory.isLiked);
  const [likeCount, setLikeCount] = useState(memory.likes);
  
  const categoryInfo = categories.find(c => c.id === memory.category);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleAction = (e: React.MouseEvent, action: string) => {
    e.stopPropagation();
    // Simulate action
    console.log(`${action} clicked for ${memory.id}`);
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
      <div 
        className="w-full relative" 
        // Aspect ratio placeholder based on mock dimensions
        style={{ paddingBottom: `${(memory.height / memory.width) * 100}%` }}
      >
        <img
          src={memory.src}
          alt={memory.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Overlay */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-dark-bg/20 to-transparent flex flex-col justify-between p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Top Bar */}
            <div className="flex justify-end gap-2">
              <button 
                onClick={(e) => handleAction(e, 'share')}
                className="w-8 h-8 rounded-full glass-light flex items-center justify-center text-cream hover:bg-gold/20 hover:text-gold transition-colors"
              >
                <FiShare2 size={14} />
              </button>
              <button 
                onClick={(e) => handleAction(e, 'download')}
                className="w-8 h-8 rounded-full glass-light flex items-center justify-center text-cream hover:bg-gold/20 hover:text-gold transition-colors"
              >
                <FiDownload size={14} />
              </button>
            </div>

            {/* Bottom Content */}
            <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-cream font-heading text-lg leading-tight mb-1">{memory.title}</h3>
              
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  {categoryInfo && (
                    <span className="text-xs px-2 py-1 rounded glass-light text-cream flex items-center gap-1">
                      <span>{categoryInfo.emoji}</span> {categoryInfo.label}
                    </span>
                  )}
                  {memory.location && (
                    <span className="text-[10px] text-fog-light truncate max-w-[100px]">
                      {memory.location}
                    </span>
                  )}
                </div>
                
                <button 
                  onClick={handleLike}
                  className="flex items-center gap-1.5 text-xs font-medium"
                >
                  <FiHeart 
                    className={`transition-colors ${liked ? "fill-gold text-gold" : "text-cream"}`} 
                    size={16} 
                  />
                  <span className={liked ? "text-gold" : "text-cream"}>{likeCount}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
