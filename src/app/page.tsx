import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Purpose } from "@/components/sections/purpose";
import { SacredMap } from "@/components/sections/sacred-map";
import { FaithSelection } from "@/components/sections/faith-selection";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      
      {/* Hero Section - will be pinned by GSAP */}
      <div className="relative z-0">
        <Hero />
      </div>

      {/* Layered Content - slides over the Hero */}
      <div className="relative z-10 bg-background shadow-[0_-40px_80px_rgba(0,0,0,0.6)] overflow-hidden">
        {/* Soft atmospheric gradient top edge to blend the transition slightly */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent opacity-50 pointer-events-none" />
        
        <Purpose />
        <SacredMap />
        <FaithSelection />
        <Footer />
      </div>
    </main>
  );
}
