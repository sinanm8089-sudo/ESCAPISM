"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Homestay } from "@/types";
import { FiChevronLeft, FiChevronRight, FiStar, FiMapPin } from "react-icons/fi";

interface HomestayCardProps {
  homestay: Homestay;
  index: number;
}

export default function HomestayCard({ homestay, index }: HomestayCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % homestay.gallery.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + homestay.gallery.length) % homestay.gallery.length);
  };

  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Gallery */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-dark-surface">
        <AnimatePresence initial={false}>
          <motion.img
            key={currentImageIndex}
            src={homestay.gallery[currentImageIndex]}
            alt={homestay.name}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {/* Carousel Controls */}
        <AnimatePresence>
          {isHovered && homestay.gallery.length > 1 && (
            <>
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full glass-light flex items-center justify-center text-cream hover:bg-gold/20 hover:text-gold transition-colors z-10"
              >
                <FiChevronLeft />
              </motion.button>
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full glass-light flex items-center justify-center text-cream hover:bg-gold/20 hover:text-gold transition-colors z-10"
              >
                <FiChevronRight />
              </motion.button>
            </>
          )}
        </AnimatePresence>

        {/* Carousel Dots */}
        {homestay.gallery.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
            {homestay.gallery.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === currentImageIndex ? "bg-cream scale-125" : "bg-cream/50"
                }`}
              />
            ))}
          </div>
        )}

        {/* Wishlist Button (Mock) */}
        <button className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center z-10 text-cream/80 hover:text-gold transition-colors drop-shadow-md">
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" className="block fill-current h-6 w-6 stroke-white stroke-[2px] overflow-visible"><path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-6.94c-2.24 0-4.32 1.05-5.63 2.87a8 8 0 0 0-11.5-.02A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path></svg>
        </button>
      </div>

      {/* Content */}
      <div>
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-heading text-lg text-cream font-medium truncate pr-4">{homestay.name}</h3>
          <div className="flex items-center gap-1 text-sm shrink-0">
            <FiStar className="fill-gold text-gold" />
            <span>{homestay.rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-fog text-sm mb-1">
          <FiMapPin className="shrink-0" />
          <span className="truncate">{homestay.location}</span>
        </div>
        <p className="text-fog text-sm truncate mb-2">{homestay.amenities.slice(0, 3).join(" • ")}</p>
        <p className="text-cream text-sm mt-1">
          <span className="font-semibold text-gold">{homestay.priceRange.split(' ')[0]}</span> night
        </p>
      </div>
    </motion.div>
  );
}
