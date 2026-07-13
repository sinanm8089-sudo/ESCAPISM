import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "ESCAPISM — Escape. Explore. Remember.",
  description: "A premium travel memory platform where travelers preserve their adventures, camping experiences, friendships, homestays, and unforgettable moments. Powered by AI categorization and stunning visual experiences.",
  keywords: ["travel", "memories", "camping", "adventure", "photography", "travel diary", "trip planner", "homestay"],
  authors: [{ name: "ESCAPISM" }],
  openGraph: {
    title: "ESCAPISM — Escape. Explore. Remember.",
    description: "A premium travel memory platform for preserving your greatest adventures.",
    siteName: "ESCAPISM",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ESCAPISM — Escape. Explore. Remember.",
    description: "A premium travel memory platform for preserving your greatest adventures.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "ESCAPISM",
              description: "Premium travel memory platform",
              url: "https://escapism.travel",
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
