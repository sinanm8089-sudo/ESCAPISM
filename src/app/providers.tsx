"use client";

import { UploadProvider } from "@/context/UploadContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <UploadProvider>{children}</UploadProvider>;
}
