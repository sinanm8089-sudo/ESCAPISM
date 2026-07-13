"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Memory } from "@/types";
import { memories as initialMemories } from "@/data/mockData";

interface UploadContextType {
  allMemories: Memory[];
  addUploadedPhotos: (files: File[]) => Promise<void>;
  isProcessing: boolean;
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

const CATEGORIES = ["mountains", "camping", "nature", "sunsets", "travel", "food", "people", "homestays"] as const;

function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      resolve({ width: 800, height: 600 });
      URL.revokeObjectURL(url);
    };
    img.src = url;
  });
}

export function UploadProvider({ children }: { children: ReactNode }) {
  const [uploadedMemories, setUploadedMemories] = useState<Memory[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Combine uploaded (client-side blobs) + static mock memories
  const allMemories = [...uploadedMemories, ...initialMemories];

  const addUploadedPhotos = useCallback(async (files: File[]) => {
    setIsProcessing(true);

    try {
      const newMemories: Memory[] = await Promise.all(
        files.map(async (file, i) => {
          // Create a persistent blob URL for this session
          const blobUrl = URL.createObjectURL(file);

          // Read actual image dimensions for correct aspect ratio
          const { width, height } = await getImageDimensions(file);

          const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
          const title = file.name
            .replace(/\.[^/.]+$/, "")      // strip extension
            .replace(/[_-]/g, " ")          // underscores/dashes → spaces
            .replace(/\b\w/g, (c) => c.toUpperCase()); // Title Case

          return {
            id: `upload-${Date.now()}-${i}`,
            src: blobUrl,
            title,
            category,
            tags: [category, "uploaded", "travel"],
            location: "Your Journey",
            date: new Date().toISOString().split("T")[0],
            likes: 0,
            isLiked: false,
            width,
            height,
            tripId: "trip-uploaded",
            reactions: { love: 0, amazing: 0, adventure: 0 },
            comments: [],
          } satisfies Memory;
        })
      );

      // Prepend new memories so they appear first in the gallery
      setUploadedMemories((prev) => [...newMemories, ...prev]);
    } catch (error) {
      console.error("Error processing uploaded photos:", error);
      alert("Failed to process photos. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return (
    <UploadContext.Provider value={{ allMemories, addUploadedPhotos, isProcessing }}>
      {children}
    </UploadContext.Provider>
  );
}

export function useUpload() {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error("useUpload must be used within an UploadProvider");
  }
  return context;
}
