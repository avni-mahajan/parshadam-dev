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

// Bounding box from india.svg metadata
const MAP_BOUNDS = {
  minLon: 68.18401,
  maxLon: 97.418146,
  minLat: 6.753659,
  maxLat: 37.084109
};

const mapCoordToPercent = (lon: number, lat: number) => {
  const x = ((lon - MAP_BOUNDS.minLon) / (MAP_BOUNDS.maxLon - MAP_BOUNDS.minLon)) * 100;
  const y = ((MAP_BOUNDS.maxLat - lat) / (MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat)) * 100;
  return { x, y };
};

const C = {
  bg: "#F6EFE3", // Warm Sand
  bgDeep: "#EDDFC7", 
  text: "#2A2A22", // Deep Brown-Green
  textMid: "#7A9278", // Muted Sage
  textLight: "#A5B0A4",
  saffron: "#D97A1D", // Saffron Orange
  saffronSoft: "#E59F5A",
  gold: "#E5B93D", // Temple Gold
  goldFaint: "rgba(229,185,61,0.12)",
  divider: "rgba(30,77,61,0.15)",
  mapFill: "#FFFFFF",
  mapStroke: "rgba(30,77,61,0.25)",
  mapHover: "#EDDFC7",
  markerAvail: "#1E4D3D", // Deep Sacred Green
  markerSoon: "#D97A1D", // Saffron Orange
};

export const SacredMap = () => {
  const [activeShrine, setActiveShrine] = useState<Shrine | null>(null);
  const [hoveredShrine, setHoveredShrine] = useState<string | null>(null);
  const [listModalType, setListModalType] = useState<"available" | "all" | null>(null);

  const containerRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      }
    });

    tl.from(headerRef.current, {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    })
    .from(mapRef.current, {
      scale: 0.95,
      opacity: 0,
      x: -40,
      duration: 1.2,
      ease: "power2.out"
    }, "-=0.6");

    gsap.to(mapRef.current, {
      y: -30,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });
  }, { scope: containerRef });

  const handleSelect = useCallback((shrine: Shrine) => {
    setActiveShrine(shrine);
    setListModalType(null);
  }, []);

  const availableCount = shrines.filter((s) => s.available).length;
  
  const displayedList = listModalType === "available" 
    ? shrines.filter(s => s.available) 
    : shrines;

  return (
    <>
      <section
        ref={containerRef}
        id="sacred-origins"
        style={{ backgroundColor: C.bg, minHeight: "100vh" }}
        className="relative py-24"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 60% at 50% 40%, ${C.bgDeep}, transparent)`,
          }}
        />


        <div ref={headerRef} className="relative z-10 text-center px-6 mb-16">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "circOut" }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-[1px] w-16" style={{ background: C.divider }} />
            <span style={{ color: C.saffron }} className="text-lg leading-none">✦</span>
            <div className="h-[1px] w-16" style={{ background: C.divider }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-[4rem] font-bold mb-6 leading-tight"
            style={{ color: C.text }}
          >
            Where Every Blessing Is Born
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light italic"
            style={{ color: C.textMid }}
          >
            From the sanctum of India&apos;s holiest shrines to your family&apos;s most
            cherished celebrations — carried with devotion, delivered with love.
          </motion.p>
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-6">
          <div className="flex flex-col items-center">
            
            {/* Legend - Simplified and Centered */}
            <div className="inline-flex items-center gap-8 px-6 py-3 rounded-full bg-white/40 backdrop-blur-md border border-white/40 shadow-sm mb-12">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: C.saffron }}></span>
                  <span className="relative inline-flex rounded-full h-3 w-3" style={{ backgroundColor: C.saffron }}></span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold" style={{ color: C.textLight }}>
                  Active Serving Center
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "rgba(217, 122, 29, 0.4)", border: `1px solid ${C.saffron}` }} />
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold" style={{ color: C.textLight }}>
                  Upcoming Sacred Shrine
                </span>
              </div>
            </div>

            <div className="relative w-full aspect-[612/696] max-w-2xl mx-auto rounded-3xl">
              <motion.div 
                className="relative w-full h-full"
                animate={{
                  scale: activeShrine ? 1.6 : 1,
                  x: activeShrine ? `${(50 - mapCoordToPercent(activeShrine.coordinates[0], activeShrine.coordinates[1]).x) * 0.8}%` : 0,
                  y: activeShrine ? `${(50 - mapCoordToPercent(activeShrine.coordinates[0], activeShrine.coordinates[1]).y) * 0.8}%` : 0,
                }}
                transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
              >
                {/* SVG Filter Definition */}
              <svg width="0" height="0" className="absolute">
                <defs>
                  <filter id="brown-tint" colorInterpolationFilters="sRGB">
                    <feColorMatrix type="matrix" values="
                      0.77 0 0 0 0.16 
                      0.71 0 0 0 0.16 
                      0.65 0 0 0 0.13 
                      0 0 0 1 0" 
                    />
                  </filter>
                </defs>
              </svg>

              {/* The Map */}
              <div className="absolute inset-0">
                <Image
                  src="/svg/india.svg"
                  alt="India Map"
                  fill
                  className="object-contain drop-shadow-2xl"
                  style={{ filter: "url(#brown-tint)", opacity: 1 }}
                  priority
                />
              </div>
              
              {/* Subtle border mask */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{ 
                  maskImage: "url('/svg/india.svg')",
                  maskSize: "contain",
                  maskPosition: "center",
                  maskRepeat: "no-repeat",
                  WebkitMaskImage: "url('/svg/india.svg')",
                  WebkitMaskSize: "contain",
                  WebkitMaskPosition: "center",
                  WebkitMaskRepeat: "no-repeat",
                  border: `2px solid ${C.saffron}`
                }}
              />
              
              {/* Custom Markers Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                {shrines.map((shrine) => {
                  const { x, y } = mapCoordToPercent(shrine.coordinates[0], shrine.coordinates[1]);
                  const isActive = activeShrine?.id === shrine.id;
                  const isHovered = hoveredShrine === shrine.id;
                  const isAvail = shrine.available;
                  const shouldAnimate = activeShrine ? isActive : isAvail;

                  return (
                    <div
                      key={shrine.id}
                      className="absolute pointer-events-auto"
                      style={{ 
                        left: `${x}%`, 
                        top: `${y}%`,
                        transform: 'translate(-50%, -50%)',
                        zIndex: isActive ? 50 : 20
                      }}
                    >
                      <button
                        onClick={() => handleSelect(shrine)}
                        onMouseEnter={() => setHoveredShrine(shrine.id)}
                        onMouseLeave={() => setHoveredShrine(null)}
                        className="relative flex items-center justify-center w-10 h-10 group"
                      >
                        {/* Glow for Active/Hovered or Available */}
                        <AnimatePresence>
                          {(isActive || isHovered || shouldAnimate) && (
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ 
                                scale: shouldAnimate ? [1, 1.2, 1] : 1.1, 
                                opacity: shouldAnimate ? [0.1, 0.2, 0.1] : 0.15 
                              }}
                              exit={{ opacity: 0 }}
                              transition={{ 
                                repeat: shouldAnimate ? Infinity : 0, 
                                duration: 2,
                                ease: "easeInOut"
                              }}
                              className="absolute w-full h-full rounded-full"
                              style={{ backgroundColor: C.saffron }}
                            />
                          )}
                        </AnimatePresence>

                        {/* The Dot */}
                        <motion.div 
                          className="rounded-full shadow-lg border-2 border-white"
                          animate={{
                            scale: isActive ? 1.5 : (isHovered ? 1.2 : 1),
                            backgroundColor: isAvail ? C.saffron : "rgba(217, 122, 29, 0.5)"
                          }}
                          style={{ 
                            width: '12px',
                            height: '12px',
                            backgroundColor: C.saffron
                          }}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </motion.div>

              {/* Dynamic Floating Cards Overlay */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-50">
                <AnimatePresence mode="wait">
                  {activeShrine && (
                    <motion.div
                      key="active-shrine-card"
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 20 }}
                      className="pointer-events-auto w-full max-w-xs aspect-square mx-4 bg-black shadow-2xl relative rounded-3xl overflow-hidden group"
                    >
                      <Link href={`/shrine/${activeShrine.id}`} className="block w-full h-full cursor-pointer">
                        <Video 
                          src="/herosec.mp4"
                          containerClassName="absolute inset-0 w-full h-full"
                          className="opacity-60 scale-[1.5] group-hover:scale-125 transition-transform duration-1000"
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                          <motion.span 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[10px] uppercase tracking-[0.5em] text-white font-black mb-4"
                          >
                            ✦ {activeShrine.type}
                          </motion.span>
                          <h4 className="text-3xl font-bold text-white leading-tight">
                            {activeShrine.name}
                          </h4>
                          <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <span className="text-[10px] uppercase tracking-widest text-white/60 border border-white/20 px-4 py-2 rounded-full">
                              Explore Sacred Story
                            </span>
                          </div>
                        </div>
                      </Link>

                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setActiveShrine(null);
                        }}
                        className="absolute top-4 right-4 p-2 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 transition-colors z-20"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="white">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
          </div>
        </div>
      </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 mt-24">
          <div className="flex flex-wrap items-center justify-between gap-12 pt-16 border-t" style={{ borderColor: C.divider }}>
            <div className="max-w-md">
              <h3 className="text-3xl font-bold leading-tight" style={{ color: C.text }}>
                Sacred blessings, <span style={{ color: C.saffron }} className="italic font-light">carried with devotion.</span>
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
    </>
  );
};
