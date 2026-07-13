"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { Memory } from "@/types";
import { memories as initialMemories } from "@/data/mockData";

interface UploadContextType {
  allMemories: Memory[];
  addUploadedPhotos: (files: File[]) => Promise<void>;
  isProcessing: boolean;
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export function UploadProvider({ children }: { children: ReactNode }) {
  const [uploadedMemories, setUploadedMemories] = useState<Memory[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Fetch saved memories from database on mount
  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const response = await fetch("/api/memories");
        if (response.ok) {
          const dbMemories = await response.json();
          setUploadedMemories(dbMemories);
        }
      } catch (error) {
        console.error("Failed to fetch memories from DB:", error);
      }
    };
    
    fetchMemories();
  }, []);

  const allMemories = [...uploadedMemories, ...initialMemories];

  const addUploadedPhotos = useCallback(async (files: File[]) => {
    setIsProcessing(true);

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const savedMemories = await response.json();
      
      // Update state with newly saved memories (prepend)
      setUploadedMemories((prev) => [...savedMemories, ...prev]);
    } catch (error) {
      console.error("Error uploading photos:", error);
      alert("Failed to upload photos. Please try again.");
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
