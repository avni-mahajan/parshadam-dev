"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { TiltCard } from "@/components/ui/tilt-card";
import { ChevronRight } from "lucide-react";

export function FaithSelection() {
  const router = useRouter();
  const [hoveredFaith, setHoveredFaith] = useState<"Hindu" | "Sikh" | null>(null);
  const [navigating, setNavigating] = useState<"Hindu" | "Sikh" | null>(null);
  const [clickOrigin, setClickOrigin] = useState({ x: 0, y: 0 });

  const handleFaithClick = (
    faith: "Hindu" | "Sikh",
    e: React.MouseEvent
  ) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setClickOrigin({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
    setNavigating(faith);
    // Short delay so the ripple animation plays before route change
    setTimeout(() => {
      router.push(faith === "Hindu" ? "/sanatani" : "/sikhi");
    }, 600);
  };

  return (
    <>
      {/* Full-screen radial transition overlay */}
      {navigating && (
        <motion.div
          key="transition-overlay"
          initial={{ clipPath: `circle(0px at ${clickOrigin.x}px ${clickOrigin.y}px)` }}
          animate={{ clipPath: `circle(200vmax at ${clickOrigin.x}px ${clickOrigin.y}px)` }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: navigating === "Hindu" ? "#FAF6F0" : "#F3F7FA",
            pointerEvents: "none",
          }}
        />
      )}

      <section className="pt-4 pb-8 relative overflow-hidden bg-background">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container max-w-7xl mx-auto px-6 relative z-10">

          {/* Section header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-2 flex items-center justify-center gap-4"
            >
              <div className="h-[1px] w-8 bg-accent/30" />
              <span className="text-[10px] uppercase tracking-[0.5em] font-medium text-accent">
                Discover Your Path
              </span>
              <div className="h-[1px] w-8 bg-accent/30" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-heading mb-2 text-foreground tracking-tight"
            >
              Connect With Your{" "}
              <span className="text-primary italic">Devotion</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-muted-foreground text-sm md:text-base font-light tracking-[0.1em] max-w-2xl mx-auto leading-relaxed uppercase opacity-70"
            >
               Select your path of faith to discover ancient shrines and parshadam from the most revered holy places.
            </motion.p>
          </div>

          {/* Faith Selection Cards */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            className="relative max-w-5xl mx-auto py-12"
          >
            {/* Floating lotus / centre animation */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                show: {
                  opacity: [0, 1, 0],
                  scale: [0.8, 1.1, 1.5],
                  transition: { duration: 2.2, times: [0, 0.4, 1], ease: "easeInOut" },
                },
              }}
              className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none"
            >
              <div className="relative">
                <span className="text-9xl text-accent opacity-20 block select-none">🪷</span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border border-accent/10 rounded-full scale-[1.8]"
                />
              </div>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2.2, times: [0.1, 0.4, 0.9] }}
                className="text-[12px] uppercase tracking-[1.5em] text-accent font-bold mt-8"
              >
                Devotion
              </motion.span>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-12 justify-center relative z-10">

              {/* ── Sanatani Card ── */}
              <motion.div
                className="flex-1 max-w-[380px]"
                variants={{
                  hidden: { opacity: 0, x: 60, rotateY: 25, scale: 0.9 },
                  show: {
                    opacity: 1, x: 0, rotateY: 0, scale: 1,
                    transition: { delay: 1.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                <TiltCard>
                  <motion.button
                    onClick={(e) => handleFaithClick("Hindu", e)}
                    onHoverStart={() => setHoveredFaith("Hindu")}
                    onHoverEnd={() => setHoveredFaith(null)}
                    className={`relative w-full aspect-[3/4] rounded-2xl border transition-all duration-1000 overflow-hidden group ${
                      hoveredFaith === "Hindu"
                        ? "border-accent/40 shadow-[0_40px_100px_-20px_rgba(217,122,29,0.3)]"
                        : "border-border/40 hover:border-accent/30"
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Background image */}
                    <div className="absolute inset-0 z-0">
                      <Image
                        src="/images/hindu.jpg"
                        alt="Sanatan Dharma"
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/60 group-hover:bg-black/35 transition-colors duration-1000" />
                    </div>

                    {/* Architectural inner border */}
                    <div className="absolute inset-4 z-10 rounded-xl border border-dashed border-white/10 group-hover:border-accent/40 transition-colors duration-1000" />

                    {/* Saffron glow from bottom on hover */}
                    <motion.div
                      className="absolute inset-0 z-10 pointer-events-none"
                      style={{
                        background: "radial-gradient(ellipse at center bottom, rgba(217,122,29,0.35) 0%, transparent 65%)",
                      }}
                      animate={{ opacity: hoveredFaith === "Hindu" ? 1 : 0 }}
                      transition={{ duration: 0.5 }}
                    />

                    {/* Content */}
                    <div className="relative z-20 flex flex-col items-center justify-center h-full px-8 text-center mt-12">
                      {/* OM symbol */}
                      <div className="w-28 h-28 rounded-full flex items-center justify-center mb-12 backdrop-blur-xl border border-white/10 group-hover:bg-accent/10 group-hover:border-accent/40 group-hover:shadow-[0_0_50px_rgba(217,122,29,0.4)] transition-all duration-1000 bg-white/5">
                        <span className="text-7xl text-white group-hover:text-accent transition-all duration-1000">
                          ॐ
                        </span>
                      </div>

                      <h3 className="text-3xl md:text-4xl font-heading mb-6 tracking-[0.2em] uppercase text-white group-hover:text-accent transition-colors duration-700">
                        Sanatan
                      </h3>

                      <div className="w-16 h-[1px] bg-accent/30 mb-5 transition-all duration-700 group-hover:w-32 group-hover:bg-accent/60" />

                      <p className="text-[10px] text-white/70 leading-loose max-w-[240px] font-medium tracking-[0.3em] uppercase mb-6">
                        Prasadam from timeless temples, blessed at the altar.
                      </p>

                      {/* Explore CTA */}
                      <motion.div
                        className="flex items-center gap-2 text-accent"
                        animate={{ opacity: hoveredFaith === "Hindu" ? 1 : 0, y: hoveredFaith === "Hindu" ? 0 : 8 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="text-[9px] uppercase tracking-[0.4em] font-bold">Enter the Shrines</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </motion.div>
                    </div>
                  </motion.button>
                </TiltCard>
              </motion.div>

              {/* ── Sikhi Card ── */}
              <motion.div
                className="flex-1 max-w-[380px]"
                variants={{
                  hidden: { opacity: 0, x: -60, rotateY: -25, scale: 0.9 },
                  show: {
                    opacity: 1, x: 0, rotateY: 0, scale: 1,
                    transition: { delay: 1.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                <TiltCard>
                  <motion.button
                    onClick={(e) => handleFaithClick("Sikh", e)}
                    onHoverStart={() => setHoveredFaith("Sikh")}
                    onHoverEnd={() => setHoveredFaith(null)}
                    className={`relative w-full aspect-[3/4] rounded-2xl border transition-all duration-1000 overflow-hidden group ${
                      hoveredFaith === "Sikh"
                        ? "border-[#FFD700]/40 shadow-[0_40px_100px_-20px_rgba(65,105,225,0.3)]"
                        : "border-border/40 hover:border-[#FFD700]/30"
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Background image */}
                    <div className="absolute inset-0 z-0">
                      <Image
                        src="/images/sikh.jpg"
                        alt="Sikhi"
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/60 group-hover:bg-[#020C1B]/50 transition-colors duration-1000" />
                    </div>

                    {/* Inner border */}
                    <div className="absolute inset-4 z-10 rounded-xl border border-dashed border-white/10 group-hover:border-[#FFD700]/40 transition-colors duration-1000" />

                    {/* Royal blue + gold glow from bottom on hover */}
                    <motion.div
                      className="absolute inset-0 z-10 pointer-events-none"
                      style={{
                        background: "radial-gradient(ellipse at center bottom, rgba(255,215,0,0.22) 0%, rgba(65,105,225,0.15) 40%, transparent 70%)",
                      }}
                      animate={{ opacity: hoveredFaith === "Sikh" ? 1 : 0 }}
                      transition={{ duration: 0.5 }}
                    />

                    {/* Content */}
                    <div className="relative z-20 flex flex-col items-center justify-center h-full px-8 text-center mt-12">
                      {/* Ek Onkar */}
                      <div className="w-28 h-28 rounded-full flex items-center justify-center mb-12 backdrop-blur-xl border border-white/10 group-hover:bg-[#FFD700]/10 group-hover:border-[#FFD700]/40 group-hover:shadow-[0_0_50px_rgba(255,215,0,0.4)] transition-all duration-1000 bg-white/5">
                        <span className="text-7xl text-white group-hover:text-[#FFD700] transition-all duration-1000">
                          ੴ
                        </span>
                      </div>

                      <h3 className="text-3xl md:text-4xl font-heading mb-6 tracking-[0.2em] uppercase text-white group-hover:text-[#FFD700] transition-colors duration-700">
                        Sikhi
                      </h3>

                      <div className="w-16 h-[1px] mb-5 transition-all duration-700 group-hover:w-32" style={{ background: "rgba(255,215,0,0.4)" }} />

                      <p className="text-[10px] text-white/70 leading-loose max-w-[240px] font-medium tracking-[0.3em] uppercase mb-6">
                        Blessed Karah Parshad from the Golden Temple.
                      </p>

                      {/* Explore CTA */}
                      <motion.div
                        className="flex items-center gap-2"
                        style={{ color: "#FFD700" }}
                        animate={{ opacity: hoveredFaith === "Sikh" ? 1 : 0, y: hoveredFaith === "Sikh" ? 0 : 8 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="text-[9px] uppercase tracking-[0.4em] font-bold">Enter the Gurdwaras</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </motion.div>
                    </div>
                  </motion.button>
                </TiltCard>
              </motion.div>

            </div>
          </motion.div>

          {/* Bottom hint */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-4 mb-8"
          >
            <p className="text-[9px] uppercase tracking-[0.5em] font-medium text-muted-foreground/40">
               Choose your path to begin
            </p>
          </motion.div>

        </div>
      </section>
    </>
  );
}
