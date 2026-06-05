"use client";

import React, { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { shrines, type Shrine } from "./sacred-map-data";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Video } from "@/components/ui/video";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MAP_BOUNDS = {
  minLon: 68.18401,
  maxLon: 97.418146,
  minLat: 6.753659,
  maxLat: 37.084109,
};

const mapCoordToPercent = (lon: number, lat: number) => {
  const x = ((lon - MAP_BOUNDS.minLon) / (MAP_BOUNDS.maxLon - MAP_BOUNDS.minLon)) * 100;
  const y = ((MAP_BOUNDS.maxLat - lat) / (MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat)) * 100;
  return { x, y };
};

const C = {
  bg: "#F6EFE3",
  bgDeep: "#EDDFC7",
  text: "#2A2A22",
  textMid: "#7A9278",
  textLight: "#A5B0A4",
  saffron: "#D97A1D",
  saffronSoft: "#E59F5A",
  divider: "rgba(30,77,61,0.15)",
};

export const SacredMap = () => {
  const [activeShrine, setActiveShrine] = useState<Shrine | null>(null);
  const [hoveredShrine, setHoveredShrine] = useState<string | null>(null);
  const [mapRevealed, setMapRevealed] = useState(false);
  const mapRevealedRef = useRef(false);

  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const warmOverlayRef = useRef<HTMLDivElement>(null);
  const mapLayerRef = useRef<HTMLDivElement>(null);

  const availableCount = shrines.filter((s) => s.available).length;

  useGSAP(() => {
    if (!videoRef.current || !heroTextRef.current || !warmOverlayRef.current || !mapLayerRef.current) return;

    // ── Main scrubbed timeline ──────────────────────────────────────
    // pin: true keeps the section fixed while the user scrolls 240vh worth
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=60%",        // pin duration = 0.6x viewport height
        pin: true,
        pinSpacing: true,
        scrub: 1.0,
        onUpdate: (self) => {
          const reveal = self.progress > 0.25;
          if (reveal !== mapRevealedRef.current) {
            mapRevealedRef.current = reveal;
            setMapRevealed(reveal);
          }
        },
      },
    });

    // Phase 1 (0 → 0.3): hero text dissolves upward quickly and blurs
    tl.to(heroTextRef.current, {
      y: -30,
      opacity: 0,
      scale: 0.97,
      filter: "blur(6px)",
      ease: "power3.inOut",
      duration: 0.2,
    }, 0);

    // Phase 2 (0.05 → 0.4): video dims and blurs
    tl.to(videoRef.current, {
      opacity: 0.35,
      filter: "blur(8px)",
      ease: "power2.inOut",
      duration: 0.35,
    }, 0.05);

    // Phase 2 (0.05 → 0.4): warm sand overlay blooms
    tl.to(warmOverlayRef.current, {
      opacity: 1,
      ease: "power2.inOut",
      duration: 0.35,
    }, 0.05);

    // Phase 3 (0.05 → 0.8): map layer assembles with blur transition
    tl.fromTo(
      mapLayerRef.current,
      { opacity: 0, scale: 0.92, y: 30 },
      { opacity: 1, scale: 1, y: 0, ease: "power2.out", duration: 0.75 },
      0.05
    );
  }, { scope: sectionRef, dependencies: [] });

  const handleSelect = useCallback((shrine: Shrine) => {
    setActiveShrine(shrine);
  }, []);

  return (
    <>
      {/* ════════════════════════════════════════════════════
          Pinned section — GSAP holds this in viewport
      ════════════════════════════════════════════════════ */}
      <section
        ref={sectionRef}
        id="sacred-origins"
        className="relative h-screen w-full overflow-hidden bg-[#0F1A15]"
      >
        {/* LAYER 1 — Cinematic video */}
        <div ref={videoRef} className="absolute inset-0 z-0" style={{ opacity: 0.85 }}>
          <Video
            src="/herosec.mp4"
            containerClassName="absolute inset-0 w-full h-full"
            className="scale-[1.06]"
            objectFit="cover"
            overlay={
              <>
                <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/30 to-black/85" />
                <div className="absolute inset-0 bg-[#0F1A15]/45" />
              </>
            }
          />
        </div>

        {/* LAYER 2 — Warm sand overlay — lighter so video breathes through */}
        <div
          ref={warmOverlayRef}
          className="absolute inset-0 z-10 opacity-0 pointer-events-none"
          style={{
            background: `linear-gradient(150deg, ${C.bgDeep}CC 0%, ${C.bg}CC 50%, ${C.bgDeep}CC 100%)`,
          }}
        />

        {/* LAYER 3 — Hero text (phase 1) */}
        <div
          ref={heroTextRef}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
        >
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="flex items-center justify-center gap-4 mb-10"
          >
            <div className="h-px w-16" style={{ background: `linear-gradient(to right, transparent, ${C.saffron}50)` }} />
            <div className="h-px w-16" style={{ background: `linear-gradient(to left, transparent, ${C.saffron}50)` }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-tight tracking-tight text-white drop-shadow-2xl mb-8 max-w-4xl"
            style={{ fontFamily: "var(--font-eb-garamond, Georgia, serif)" }}
          >
            Where Every{" "}
            <span className="italic font-light" style={{ color: C.saffronSoft }}>
              Blessing
            </span>{" "}
            Is Born
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
            className="text-sm md:text-base text-white/65 max-w-xl mx-auto leading-relaxed font-light italic tracking-wide"
          >
            From the sanctum of India&apos;s holiest shrines to your family&apos;s most
            cherished celebrations — carried with devotion, delivered with love.
          </motion.p>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <span className="text-[9px] uppercase tracking-[0.6em] text-white/35 font-medium">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="w-px h-10"
              style={{ background: `linear-gradient(to bottom, ${C.saffron}50, transparent)` }}
            />
          </motion.div>
        </div>

        {/* LAYER 4 — Map layer (phase 2+) */}
        <div
          ref={mapLayerRef}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center px-12 opacity-0"
          style={{ pointerEvents: mapRevealed ? "auto" : "none" }}
        >
          <div className="w-full flex flex-row items-center justify-between gap-8">
            {/* Title - Left */}
            <div className="flex-1 hidden lg:block pointer-events-none">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{
                  opacity: (mapRevealed && !activeShrine) ? 1 : 0,
                  x: (mapRevealed && !activeShrine) ? 0 : -30
                }}
                transition={{ duration: 1, delay: 0.2 }}
                className="max-w-[240px]"
              >
                <div className="h-px w-12 mb-6" style={{ background: C.saffron }} />
                <h2
                  className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-6"
                  style={{ color: C.text, fontFamily: "var(--font-eb-garamond, Georgia, serif)" }}
                >
                  Sacred <br />
                  <span className="italic font-light" style={{ color: C.saffron }}>Origins</span> <br />
                  of India
                </h2>
                <p className="text-[10px] uppercase tracking-[0.3em] font-medium leading-relaxed" style={{ color: C.textLight }}>
                  Discover the spiritual geography of the subcontinent, where every center tells a story of ancient devotion.
                </p>
              </motion.div>
            </div>

            {/* ── The Map (Larger) ── */}
            <div className="relative w-full max-w-xl mx-auto flex-[2]" style={{ aspectRatio: "612/696" }}>
              {/* Outer: zoom + pan to active shrine */}
              <motion.div
                className="relative w-full h-full"
                animate={{
                  scale: activeShrine ? 4.5 : 1,
                  x: activeShrine ? `${(50 - mapCoordToPercent(activeShrine.coordinates[0], activeShrine.coordinates[1]).x) * 4.5}%` : 0,
                  y: activeShrine ? `${(50 - mapCoordToPercent(activeShrine.coordinates[0], activeShrine.coordinates[1]).y) * 4.5}%` : 0,
                }}
                transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
              >
                {/* Inner: continuous float drift when card is showing */}
                <motion.div
                  className="relative w-full h-full"
                  animate={activeShrine ? {
                    y: [0, -3, 1, -2, 0],
                    x: [0, 1.5, -1, 1, 0],
                  } : { y: 0, x: 0 }}
                  transition={activeShrine ? {
                    repeat: Infinity,
                    duration: 8,
                    ease: "easeInOut",
                    repeatType: "mirror",
                  } : { duration: 0.8 }}
                >
                  <svg width="0" height="0" className="absolute">
                    <defs>
                      <filter id="warm-map-tint" colorInterpolationFilters="sRGB">
                        <feColorMatrix type="matrix" values="
                      0.82 0.10 0 0 0.08
                      0.60 0.55 0 0 0.05
                      0.40 0.10 0 0 0.03
                      0    0    0 1 0" />
                      </filter>
                    </defs>
                  </svg>

                  <div className="absolute inset-0">
                    <Image
                      src="/svg/india.svg"
                      alt="Sacred Map of India"
                      fill
                      className="object-contain drop-shadow-2xl"
                      style={{ filter: "url(#warm-map-tint)" }}
                      priority
                    />
                  </div>

                  {/* Saffron glow mask - breathing pulse */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{
                      opacity: [0.4, 0.7, 0.4],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 8,
                      ease: "easeInOut",
                    }}
                    style={{
                      maskImage: "url('/svg/india.svg')",
                      maskSize: "contain",
                      maskPosition: "center",
                      maskRepeat: "no-repeat",
                      WebkitMaskImage: "url('/svg/india.svg')",
                      WebkitMaskSize: "contain",
                      WebkitMaskPosition: "center",
                      WebkitMaskRepeat: "no-repeat",
                      background: `radial-gradient(ellipse at center, ${C.saffron}25, transparent 70%)`,
                    }}
                  />

                  {/* Markers */}
                  <div className="absolute inset-0 pointer-events-none">
                    {shrines.map((shrine, i) => {
                      const { x, y } = mapCoordToPercent(shrine.coordinates[0], shrine.coordinates[1]);
                      const isActive = activeShrine?.id === shrine.id;
                      const isHovered = hoveredShrine === shrine.id;
                      const isAvail = shrine.available;

                      return (
                        <div
                          key={shrine.id}
                          className="absolute pointer-events-auto"
                          style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)", zIndex: isActive ? 50 : 20 }}
                        >
                          <motion.button
                            onClick={() => handleSelect(shrine)}
                            onMouseEnter={() => setHoveredShrine(shrine.id)}
                            onMouseLeave={() => setHoveredShrine(null)}
                            className="relative flex items-center justify-center w-8 h-8 group"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={mapRevealed ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                            transition={{ delay: mapRevealed ? 0.06 + i * 0.035 : 0, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          >
                            {/* Pulse for available shrines */}
                            {isAvail && !activeShrine && (
                              <motion.div
                                className="absolute w-full h-full rounded-full"
                                style={{ backgroundColor: C.saffron }}
                                animate={{ scale: [1, 1.9, 1], opacity: [0.2, 0, 0.2] }}
                                transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut", delay: i * 0.12 }}
                              />
                            )}
                            {/* Active pulse */}
                            {isActive && (
                              <motion.div
                                className="absolute w-full h-full rounded-full"
                                style={{ backgroundColor: C.saffron }}
                                animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                              />
                            )}
                            {/* Hover halo */}
                            <AnimatePresence>
                              {(isHovered || isActive) && (
                                <motion.div
                                  initial={{ scale: 0.5, opacity: 0 }}
                                  animate={{ scale: 1.5, opacity: 0.18 }}
                                  exit={{ scale: 0.5, opacity: 0 }}
                                  className="absolute w-full h-full rounded-full"
                                  style={{ backgroundColor: C.saffron }}
                                />
                              )}
                            </AnimatePresence>
                            {/* Dot */}
                            <motion.div
                              className="rounded-full border-2 border-white shadow-md"
                              animate={{
                                scale: isActive ? 1.6 : isHovered ? 1.25 : 1,
                                backgroundColor: isAvail ? C.saffron : "rgba(217,122,29,0.4)",
                                boxShadow: isActive ? `0 0 16px ${C.saffron}80` : "none",
                              }}
                              transition={{ duration: 0.25, ease: "easeOut" }}
                              style={{ width: 10, height: 10, backgroundColor: C.saffron }}
                            />
                          </motion.button>
                        </div>
                      );
                    })}
                  </div>
                </motion.div> {/* end inner float */}
              </motion.div> {/* end outer zoom */}
            </div>

            {/* Legend - Right */}
            <div className="flex-1 hidden lg:flex flex-col items-end gap-6 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{
                  opacity: (mapRevealed && !activeShrine) ? 1 : 0,
                  x: (mapRevealed && !activeShrine) ? 0 : 30
                }}
                transition={{ duration: 1, delay: 0.3 }}
                className="flex flex-col items-end gap-8"
              >
                <div className="flex flex-col items-end gap-2">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold mb-2" style={{ color: C.textLight }}>Status Guide</span>
                  <div className="h-px w-8 mb-4" style={{ background: C.divider }} />
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-right" style={{ color: C.textMid }}>Active Center</span>
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ backgroundColor: C.saffron }} />
                    <span className="relative inline-flex rounded-full h-3 w-3" style={{ backgroundColor: C.saffron }} />
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-right" style={{ color: C.textLight }}>Upcoming Shrine</span>
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "rgba(217,122,29,0.35)", border: `1.5px solid ${C.saffron}` }} />
                </div>

                <div className="mt-8 pt-8 border-t border-dashed" style={{ borderColor: C.divider }}>
                  <p className="text-[9px] text-right italic leading-relaxed max-w-[140px]" style={{ color: C.textLight }}>
                    We are continuously expanding our presence to bring sacred traditions closer to you.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Below-fold content */}
      <section className="relative pt-8 pb-4 px-6" style={{ backgroundColor: C.bg }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${C.bgDeep}, transparent)` }}
        />
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-12 pt-8 border-t" style={{ borderColor: C.divider }}>
            <div className="max-w-md">
              <h3 className="text-3xl font-bold leading-tight" style={{ color: C.text }}>
                Sacred blessings,{" "}
                <span style={{ color: C.saffron }} className="italic font-light">carried with devotion.</span>
              </h3>
            </div>
            <div className="flex gap-16">
              <div className="flex flex-col gap-2">
                <p className="text-5xl font-bold" style={{ color: C.saffron }}>{availableCount}</p>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-50">Active Shrines</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-5xl font-bold" style={{ color: C.saffron }}>{shrines.length}</p>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-50">Mapped Centers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Shrine Card — Fixed, centered */}
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-[200]">
        <AnimatePresence mode="wait">
          {activeShrine && (
            <motion.div
              key="shrine-card"
              initial={{ opacity: 0, scale: 0.75, x: 0, y: 24, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.75, x: 0, y: 24, filter: "blur(12px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto w-64 aspect-square bg-black relative rounded-[2.5rem] overflow-hidden group border border-white/5 lg:translate-x-48"
              style={{ boxShadow: "0 60px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(217,122,29,0.1)" }}
            >
              <Link href={`/shrine/${activeShrine.id}`} className="block w-full h-full cursor-pointer">
                <Video
                  src="/herosec.mp4"
                  containerClassName="absolute inset-0 w-full h-full"
                  className="opacity-40 scale-[2] group-hover:scale-125 transition-transform duration-1000"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: `radial-gradient(ellipse at bottom, ${C.saffron}20 0%, transparent 70%), linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)` }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <motion.span
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-[8px] uppercase tracking-[0.45em] text-white/40 font-bold mb-3"
                  >
                    {activeShrine.type}
                  </motion.span>
                  <motion.h4
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22 }}
                    className="text-2xl font-bold text-white leading-tight mb-6"
                  >
                    {activeShrine.name}
                  </motion.h4>
                  <div className="transition-all duration-500">
                    <span className="text-[7px] uppercase tracking-widest text-white/90 border border-white/15 px-4 py-2 rounded-full backdrop-blur-md bg-white/5">
                      Explore Story →
                    </span>
                  </div>
                </div>
              </Link>
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveShrine(null); }}
                className="absolute top-4 right-4 p-2 rounded-full backdrop-blur-md hover:bg-white/15 transition-all duration-300 z-20 border border-white/10 bg-white/5"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
