"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUploadCloud, FiFile, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { useUpload } from "@/context/UploadContext";

export default function UploadCenter() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addUploadedPhotos, isProcessing } = useUpload();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).filter(file => 
        file.type.startsWith('image/')
      );
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    
    // Send files to the shared context so they appear in the gallery
    await addUploadedPhotos(files);
    setFiles([]);
    setUploadSuccess(true);
    
    // Auto-scroll to gallery after a short delay so user sees photos land
    setTimeout(() => {
      const gallerySection = document.getElementById("gallery");
      if (gallerySection) {
        gallerySection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 600);

    setTimeout(() => {
      setUploadSuccess(false);
    }, 4000);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <section id="upload" className="py-24 bg-dark-surface relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-96 bg-gold/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <motion.h2 
            className="section-title mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Preserve the <span className="text-gold italic">Moment</span>
          </motion.h2>
          <motion.p 
            className="text-fog-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Upload your photos and let our AI organize your journey.
          </motion.p>
        </div>

        {/* Upload Zone */}
        <motion.div
          className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 overflow-hidden ${
            isDragging 
              ? "border-gold bg-gold/5 scale-[1.02] shadow-[0_0_30px_rgba(212,175,55,0.2)]" 
              : "border-gold/20 glass hover:border-gold/40"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="p-12 md:p-20 flex flex-col items-center justify-center text-center">
            <motion.div
              animate={{ 
                y: isDragging ? -10 : 0,
                scale: isDragging ? 1.1 : 1
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <FiUploadCloud className={`w-16 h-16 mb-6 transition-colors duration-300 ${
                isDragging ? "text-gold" : "text-fog"
              }`} />
            </motion.div>
            
            <h3 className="text-2xl font-heading text-cream mb-2">
              Drag & Drop your photos here
            </h3>
            <p className="text-fog text-sm mb-8">
              Supports JPG, PNG, WEBP, HEIC (Max 500MB)
            </p>
            
            <input 
              type="file" 
              multiple 
              accept="image/*"
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="px-8 py-3 bg-dark-card border border-gold/30 rounded-full text-cream text-sm font-semibold tracking-wider hover:bg-gold hover:text-dark-bg transition-all duration-300"
            >
              Browse Files
            </button>
          </div>
          
          {/* Processing Animation Overlay */}
          <AnimatePresence>
            {isProcessing && (
              <motion.div 
                className="absolute inset-0 bg-dark-bg/80 backdrop-blur-sm flex flex-col items-center justify-center z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* AI Scanning Line */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="w-full h-1 bg-gold shadow-[0_0_15px_#D4AF37] animate-[scan-line_2s_ease-in-out_infinite]" />
                </div>
                
                <div className="w-16 h-16 border-4 border-gold/20 border-t-gold rounded-full animate-spin mb-6" />
                <h4 className="text-xl font-heading text-gold mb-2">Adding photos to your gallery...</h4>
                <p className="text-fog-light text-sm">Generating previews and organizing memories.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Overlay */}
          <AnimatePresence>
            {uploadSuccess && (
              <motion.div 
                className="absolute inset-0 bg-dark-bg/80 backdrop-blur-sm flex flex-col items-center justify-center z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <FiCheckCircle className="w-16 h-16 text-green-400 mb-4" />
                </motion.div>
                <h4 className="text-xl font-heading text-cream mb-2">Photos Added!</h4>
                <p className="text-fog-light text-sm">Taking you to the gallery now…</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* File Preview List */}
        <AnimatePresence>
          {files.length > 0 && !isProcessing && (
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-cream font-medium">{files.length} Files Ready</h4>
                <button 
                  onClick={handleUpload}
                  className="px-6 py-2 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-dark-bg font-semibold rounded-full text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all"
                >
                  Upload & Process
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {files.map((file, i) => (
                  <motion.div 
                    key={`${file.name}-${i}`}
                    className="glass-light p-3 rounded-lg flex items-center gap-3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className="w-10 h-10 bg-dark-card rounded flex items-center justify-center text-gold shrink-0">
                      <FiFile />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-cream truncate">{file.name}</p>
                      <p className="text-xs text-fog">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                    <button 
                      onClick={() => removeFile(i)}
                      className="text-fog hover:text-red-400 transition-colors p-1"
                    >
                      <FiXCircle />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
