import Navbar from "@/components/navigation/Navbar";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import Footer from "@/components/footer/Footer";
import UploadCenter from "@/components/upload/UploadCenter";
import MasonryGallery from "@/components/gallery/MasonryGallery";

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-bg text-cream selection:bg-gold/30">
      <Navbar />
      
      <Hero />
      
      <About />
      
      <UploadCenter />
      
      <MasonryGallery />
      
      <Footer />
    </main>
  );
}
