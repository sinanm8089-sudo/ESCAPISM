"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUpload } from "@/context/UploadContext";
import { Category, Memory } from "@/types";
import FilterBar from "../filters/FilterBar";
import MemoryCard from "./MemoryCard";
import Lightbox from "./Lightbox";

export default function MasonryGallery() {
  const { allMemories } = useUpload();
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [lightboxState, setLightboxState] = useState<{ isOpen: boolean; index: number }>({
    isOpen: false,
    index: 0,
  });

  // Filter memories based on active category
  const filteredMemories = useMemo(() => {
    if (activeCategory === "all") return allMemories;
    return allMemories.filter((m) => m.category === activeCategory);
  }, [activeCategory, allMemories]);

  const openLightbox = (index: number) => {
    setLightboxState({ isOpen: true, index });
  };

  const closeLightbox = () => {
    setLightboxState({ isOpen: false, index: 0 });
  };

  return (
    <section id="gallery" className="py-24 bg-dark-bg min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <motion.h2 
            className="section-title mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Infinite <span className="text-gold italic">Gallery</span>
          </motion.h2>
          <motion.p 
            className="text-fog-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Explore memories from around the world, curated by AI.
          </motion.p>
        </div>

        {/* Filters */}
        <FilterBar 
          activeCategory={activeCategory} 
          onSelectCategory={setActiveCategory} 
        />

        {/* Masonry Grid */}
        <motion.div 
          className="masonry-grid"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredMemories.map((memory, index) => (
              <motion.div
                key={memory.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
              >
                <MemoryCard 
                  memory={memory} 
                  index={index}
                  onClick={() => openLightbox(index)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredMemories.length === 0 && (
          <div className="text-center py-20">
            <p className="text-fog text-lg">No memories found in this category yet.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxState.isOpen && (
          <Lightbox
            memories={filteredMemories}
            initialIndex={lightboxState.index}
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
