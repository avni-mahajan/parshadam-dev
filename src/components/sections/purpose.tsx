"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Image from "next/image";

const steps = [
  {
    num: "01",
    title: "The Sacred Source",
    subtitle: "Sanctum Sanctorum",
    body: "Parshadam is not a product — it is a living tradition. At every Jyotirlinga and sacred center across India, prasadam is prepared as an offering to the divine, carrying the energy of ritual, prayer, and centuries of devotion.",
    image: "https://images.unsplash.com/photo-1667932181221-14893a54a6d8?q=80&w=1200&auto=format&fit=crop",
    accent: "#C17B2B"
  },
  {
    num: "02",
    title: "Unati Behan",
    subtitle: "The Sacred Carrier",
    body: "A network of devoted women who travel to sacred shrines, receive the prasadam with intention, and carry it back with reverence. They are the living bridge between the shrine and your family.",
    image: "https://unatibharat.coop/wp-content/uploads/2026/05/unati-behan-1.png",
    accent: "#D97A1D"
  },
  {
    num: "03",
    title: "The Home Sanctum",
    subtitle: "Carried with Devotion",
    body: "When you celebrate a milestone — a wedding, a birth, or any sacred moment — the prasadam arrives not as a package, but as a blessing personally carried from the source to your doorstep.",
    image: "https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?q=80&w=1200&auto=format&fit=crop",
    accent: "#4A7A6A"
  },
  {
    num: "04",
    title: "The Eternal Loop",
    subtitle: "Why This Matters",
    body: "In a world of instant delivery, some things deserve to travel slowly — with intention, with prayer, with love. We ensure that divine blessings reach every family that desires them.",
    image: "https://images.unsplash.com/photo-1616262569508-d0a93ed178c4?q=80&w=1200&auto=format&fit=crop",
    accent: "#C17B2B"
  }
];

export const Purpose = () => {
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const { scrollYProgress } = useScroll({ 
    target: mounted ? sectionRef : undefined, 
    offset: ["start start", "end end"] 
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 22 });

  useEffect(() => {
    const unsub = smoothProgress.on("change", v => {
      const s = Math.max(0, Math.min(Math.floor(v * steps.length), steps.length - 1));
      setActiveStep(s);
    });
    return unsub;
  }, [smoothProgress]);

  if (!mounted) return null;

  const step = steps[activeStep] || steps[0];

  return (
    <div className="bg-[#FAF9F6] font-serif transition-colors duration-1000">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Cinzel:wght@400;500&display=swap');
      `}</style>

      {/* Scroll Container */}
      <div ref={sectionRef} className="h-[450vh] relative">
        {/* Sticky Viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          
          {/* Background Images */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeStep}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image 
                src={step.image} 
                alt={step.title}
                fill
                className="object-cover"
                priority
              />
              {/* Cinematic Overlays - Light Cream Theme */}
              <div className="absolute inset-0 bg-white/40" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/80" />
              <div className="absolute inset-0 bg-[#FAF9F6]/30 mix-blend-overlay" />
            </motion.div>
          </AnimatePresence>

          {/* Centered Content */}
          <div className="container max-w-4xl mx-auto px-6 relative z-10 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-8"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-px bg-[#1A130F]/20" />
                  <span className="text-[10px] uppercase tracking-[0.6em] text-[#1A130F]/60 font-medium">
                    {step.subtitle}
                  </span>
                  <div className="w-12 h-px bg-[#1A130F]/20" />
                </div>

                <h2 className="text-6xl md:text-8xl font-medium text-[#1A130F] tracking-tight leading-[1.05] font-heading">
                  {step.title}
                </h2>

                <p className="text-lg md:text-2xl text-[#4A3E38]/80 font-light italic max-w-2xl leading-relaxed">
                  {step.body}
                </p>

                <div className="mt-8 flex items-center gap-12">
                   {/* Step Indicators */}
                   <div className="flex gap-4">
                     {steps.map((_, i) => (
                       <motion.div 
                         key={i}
                         animate={{ 
                           width: i === activeStep ? 40 : 8,
                           backgroundColor: i === activeStep ? step.accent : "rgba(26,19,15,0.1)"
                         }}
                         className="h-1 rounded-full"
                       />
                     ))}
                   </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Scroll Hint */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
            <span className="text-[9px] uppercase tracking-[0.6em] text-[#1A130F]/30">Scroll to witness</span>
            <div className="w-px h-16 bg-gradient-to-b from-[#1A130F]/20 to-transparent" />
          </div>

          {/* Bottom Progress Bar */}
          <motion.div 
            style={{ scaleX: scrollYProgress }}
            className="absolute bottom-0 left-0 right-0 h-1 bg-accent origin-left"
          />
        </div>
      </div>

      {/* Narrative Footer */}
      <section className="relative py-48 px-6 bg-[#FAF9F6] border-t border-[#1A130F]/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <p className="text-4xl md:text-6xl font-heading italic font-light leading-tight text-[#1A130F]/90">
              &ldquo;A blessing is not a package —<br />
              it is a sacred bridge<br />
              carried with devotion.&rdquo;
            </p>
            <div className="h-px w-24 bg-accent/30 mx-auto" />
            <p className="text-[10px] uppercase tracking-[0.8em] text-accent/60 font-bold">The Parshadam Initiative</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};