"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { memories } from "@/data/mockData";
import { FiMessageSquare, FiHeart, FiShare2, FiMoreHorizontal } from "react-icons/fi";

export default function MemoryWall() {
  // Use a subset of memories for the community feed
  const feedMemories = memories.slice(0, 5);
  const [activeReactionId, setActiveReactionId] = useState<string | null>(null);

  const reactions = [
    { id: "love", emoji: "❤️", label: "Love" },
    { id: "amazing", emoji: "🔥", label: "Amazing" },
    { id: "adventure", emoji: "🏔", label: "Adventure" },
  ];

  return (
    <section id="community" className="py-24 bg-dark-surface relative border-t border-gold/10">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            className="section-title mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Community <span className="text-gold italic">Wall</span>
          </motion.h2>
          <motion.p 
            className="text-fog-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Share moments, inspire journeys, and connect with fellow explorers.
          </motion.p>
        </div>

        <div className="space-y-12">
          {feedMemories.map((memory, index) => (
            <motion.div
              key={memory.id}
              className="glass rounded-2xl p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-dark-card border border-gold/30 flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${memory.id}`} alt="User" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-cream text-sm font-medium">Alex Explorer</h4>
                    <p className="text-fog-light text-xs">{memory.location} • {memory.date}</p>
                  </div>
                </div>
                <button className="text-fog hover:text-cream transition-colors">
                  <FiMoreHorizontal />
                </button>
              </div>

              {/* Content */}
              <p className="text-cream mb-4">{memory.title} - What an unforgettable experience!</p>
              
              <div className="relative rounded-xl overflow-hidden bg-dark-bg aspect-video mb-4">
                <img 
                  src={memory.src} 
                  alt={memory.title} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Reaction Counts */}
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gold/10">
                <div className="flex -space-x-2">
                  <span className="w-6 h-6 rounded-full bg-dark-surface border border-gold/20 flex items-center justify-center text-[10px] z-30">❤️</span>
                  <span className="w-6 h-6 rounded-full bg-dark-surface border border-gold/20 flex items-center justify-center text-[10px] z-20">🔥</span>
                  <span className="w-6 h-6 rounded-full bg-dark-surface border border-gold/20 flex items-center justify-center text-[10px] z-10">🏔</span>
                </div>
                <span className="text-fog text-xs font-medium">
                  {memory.reactions.love + memory.reactions.amazing + memory.reactions.adventure} reactions
                </span>
                <span className="text-fog text-xs font-medium ml-auto">
                  {memory.comments.length} comments
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between relative">
                {/* Reaction Picker */}
                <AnimatePresence>
                  {activeReactionId === memory.id && (
                    <motion.div
                      className="absolute -top-14 left-0 glass-light rounded-full px-4 py-2 flex gap-2 z-20"
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    >
                      {reactions.map(r => (
                        <button 
                          key={r.id}
                          className="text-2xl hover:scale-125 transition-transform origin-bottom"
                          onClick={() => setActiveReactionId(null)}
                          title={r.label}
                        >
                          {r.emoji}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div 
                  className="flex-1 relative"
                  onMouseEnter={() => setActiveReactionId(memory.id)}
                  onMouseLeave={() => setActiveReactionId(null)}
                >
                  <button className="w-full flex items-center justify-center gap-2 py-2 text-fog hover:text-gold hover:bg-gold/5 rounded-lg transition-colors text-sm font-medium">
                    <FiHeart /> Like
                  </button>
                </div>
                
                <button className="flex-1 flex items-center justify-center gap-2 py-2 text-fog hover:text-cream hover:bg-cream/5 rounded-lg transition-colors text-sm font-medium">
                  <FiMessageSquare /> Comment
                </button>
                
                <button className="flex-1 flex items-center justify-center gap-2 py-2 text-fog hover:text-cream hover:bg-cream/5 rounded-lg transition-colors text-sm font-medium">
                  <FiShare2 /> Share
                </button>
              </div>

              {/* Comment Input */}
              <div className="mt-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-dark-card border border-gold/30 shrink-0 overflow-hidden">
                   <img src="https://i.pravatar.cc/150?u=current_user" alt="You" className="w-full h-full object-cover" />
                </div>
                <input 
                  type="text" 
                  placeholder="Write a comment..." 
                  className="flex-1 bg-dark-bg border border-gold/10 rounded-full px-4 py-2 text-sm text-cream placeholder:text-fog focus:outline-none focus:border-gold/30 transition-colors"
                />
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button className="px-8 py-3 glass rounded-full text-gold text-sm font-semibold tracking-wider hover:bg-gold hover:text-dark-bg transition-all duration-300">
            Load More Moments
          </button>
        </div>
      </div>
    </section>
  );
}
