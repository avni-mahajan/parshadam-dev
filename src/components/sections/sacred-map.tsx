"use client";

import React, { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { shrines, type Shrine } from "./sacred-map-data";
import { JourneyModal } from "./journey-modal";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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
  const [modalOpen, setModalOpen] = useState(false);
  const [listModalType, setListModalType] = useState<"available" | "all" | null>(null);

  const containerRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
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
    }, "-=0.6")
    .from(sidebarRef.current, {
      x: 40,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    }, "-=0.8");

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
      <JourneyModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <section
        ref={containerRef}
        id="sacred-origins"
        style={{ backgroundColor: C.bg, minHeight: "100vh" }}
        className="relative overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 60% at 50% 40%, ${C.bgDeep}, transparent)`,
          }}
        />

        <div ref={headerRef} className="relative z-10 pt-20 pb-10 text-center px-6">
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

          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="block text-[10px] uppercase tracking-[0.5em] mb-4"
            style={{ color: C.saffron }}
          >
            Sacred Origins
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold mb-5 leading-tight"
            style={{ color: C.text }}
          >
            Where Every Blessing Is Born
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-base max-w-lg mx-auto leading-relaxed font-light italic"
            style={{ color: C.textMid }}
          >
            From the sanctum of India&apos;s holiest shrines to your family&apos;s most
            cherished celebrations — carried with devotion, delivered with love.
          </motion.p>
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 pb-24 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Left Column: Custom SVG Map */}
            <div ref={mapRef} className="lg:col-start-2 lg:col-span-5 relative flex flex-col items-center">
              <div className="self-center lg:self-start inline-flex items-center gap-6 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-md border border-white/40 shadow-sm mb-6 lg:mb-8">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      backgroundColor: C.markerAvail,
                      boxShadow: `0 0 10px 2px rgba(230,81,0,0.3)`,
                    }}
                  />
                  <span className="text-[10px] uppercase tracking-[0.3em] font-medium" style={{ color: C.textLight }}>
                    Unati Behan Serves
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      backgroundColor: "transparent",
                      border: `1.5px solid ${C.markerSoon}`,
                    }}
                  />
                  <span className="text-[10px] uppercase tracking-[0.3em] font-medium" style={{ color: C.textLight }}>
                    Sacred Shrine
                  </span>
                </div>
              </div>

              <div className="relative w-full aspect-[612/696] max-w-lg mx-auto">
                {/* SVG Filter Definition for precise color transformation */}
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

                {/* The Map with precise brown tint */}
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
                
                {/* Subtle border for the map shape */}
                <div 
                  className="absolute inset-0 opacity-5"
                  style={{ 
                    maskImage: "url('/svg/india.svg')",
                    maskSize: "contain",
                    maskPosition: "center",
                    maskRepeat: "no-repeat",
                    WebkitMaskImage: "url('/svg/india.svg')",
                    WebkitMaskSize: "contain",
                    WebkitMaskPosition: "center",
                    WebkitMaskRepeat: "no-repeat",
                    border: `1.2px solid ${C.saffron}`
                  }}
                />
                
                {/* Custom Markers Overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  {shrines.map((shrine) => {
                    const { x, y } = mapCoordToPercent(shrine.coordinates[0], shrine.coordinates[1]);
                    const isActive = activeShrine?.id === shrine.id;
                    const isHovered = hoveredShrine === shrine.id;
                    const isAvail = shrine.available;

                    return (
                      <div
                        key={shrine.id}
                        className="absolute pointer-events-auto"
                        style={{ 
                          left: `${x}%`, 
                          top: `${y}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        <button
                          onClick={() => handleSelect(shrine)}
                          onMouseEnter={() => setHoveredShrine(shrine.id)}
                          onMouseLeave={() => setHoveredShrine(null)}
                          className="relative flex items-center justify-center w-8 h-8 group"
                        >
                          <AnimatePresence>
                            {(isActive || isHovered) && (
                              <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 2.5, opacity: 0.25 }}
                                exit={{ opacity: 0 }}
                                transition={{ 
                                  repeat: Infinity, 
                                  duration: 2.5,
                                  ease: "easeOut"
                                }}
                                className="absolute w-full h-full rounded-full"
                                style={{ backgroundColor: isAvail ? C.markerAvail : C.saffron }}
                              />
                            )}
                          </AnimatePresence>

                          <motion.div 
                            className={`relative flex items-center justify-center`}
                            animate={{
                              scale: isHovered ? 1.2 : 1,
                              rotate: isActive ? 45 : 0
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            style={{ 
                              width: isActive ? '16px' : '10px',
                              height: isActive ? '16px' : '10px',
                            }}
                          >
                            {/* 4-Pointed Celestial Star - Identical shape for all */}
                            <svg viewBox="0 0 24 24" className="w-full h-full overflow-visible">
                              <motion.path
                                d="M 12 0 C 13 8 13 8 24 12 C 13 16 13 16 12 24 C 11 16 11 16 0 12 C 11 8 11 8 12 0 Z"
                                fill={isAvail ? C.markerAvail : C.markerSoon}
                                stroke="white"
                                strokeWidth={0.5}
                                animate={{
                                  fillOpacity: isActive ? 1 : (isAvail ? 0.9 : 0.7),
                                  scale: isActive ? 1.2 : 1
                                }}
                              />
                            </svg>

                            {/* Tiny High-Contrast Sparkle core for all */}
                            <div className={`absolute w-1 h-1 rounded-full ${isAvail ? 'bg-white animate-pulse shadow-[0_0_8px_white]' : 'bg-white/40'}`} />
                          </motion.div>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Cards */}
            <div ref={sidebarRef} className="lg:col-start-8 lg:col-span-4 lg:sticky lg:top-32 flex flex-col pt-2 lg:pt-16">
              <AnimatePresence mode="wait">
                {listModalType ? (
                  <motion.div
                    key="list-view"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="rounded-none bg-[#FBF6EE] backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden max-h-[60vh] lg:max-h-[70vh]"
                    style={{ border: `1px solid rgba(193,123,43,0.2)` }}
                  >
                    <div className="p-6 border-b flex items-center justify-between bg-white/40" style={{ borderColor: C.divider }}>
                      <div>
                        <h3 className="text-xl font-medium" style={{ color: C.text }}>
                          {listModalType === "available" ? "Active Shrines" : "All Mapped Centers"}
                        </h3>
                        <p className="text-xs mt-1 font-light" style={{ color: C.textMid }}>
                          {listModalType === "available" ? "Shrines currently served by Unati Behan." : "All shrines on our sacred map."}
                        </p>
                      </div>
                      <button 
                        onClick={() => setListModalType(null)}
                        className="w-8 h-8 flex flex-shrink-0 items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={C.text}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="overflow-y-auto p-4 flex flex-col gap-3 custom-scrollbar">
                      {displayedList.map(shrine => (
                        <div 
                          key={shrine.id} 
                          onClick={() => handleSelect(shrine)}
                          className="flex items-center justify-between p-4 rounded-2xl bg-white/50 border hover:bg-white cursor-pointer transition-colors" 
                          style={{ borderColor: C.divider }}
                        >
                          <div>
                            <h4 className="font-medium text-base" style={{ color: C.text }}>{shrine.name}</h4>
                            <p className="text-[10px] uppercase tracking-widest mt-1" style={{ color: C.textLight }}>{shrine.state}</p>
                          </div>
                          <span className="text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full font-bold border"
                            style={shrine.available 
                              ? { background: "rgba(230,81,0,0.1)", color: C.markerAvail, borderColor: "rgba(230,81,0,0.2)" }
                              : { background: "rgba(160,100,40,0.05)", color: C.textLight, borderColor: "rgba(160,100,40,0.1)" }
                            }
                          >
                            {shrine.available ? "Active" : "Soon"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : activeShrine ? (
                  <motion.div
                    key="active-shrine"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="rounded-none p-8 backdrop-blur-xl shadow-2xl relative"
                    style={{
                      background: "rgba(255,250,243,0.95)",
                      border: `1px solid rgba(230,81,0,0.15)`,
                      boxShadow: `0 20px 50px rgba(160,100,40,0.1)`,
                    }}
                  >
                    <button 
                      onClick={() => setActiveShrine(null)}
                      className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={C.textLight}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <div className="flex items-start justify-between gap-6 mb-6">
                      <div>
                        <span className="text-[9px] uppercase tracking-[0.4em] block mb-2 font-medium" style={{ color: C.textLight }}>
                          ✦ {activeShrine.type}
                        </span>
                        <h4 className="text-2xl font-medium leading-tight pr-8" style={{ color: C.text }}>
                          {activeShrine.name}
                        </h4>
                        <p className="text-[10px] uppercase tracking-[0.2em] mt-1.5 font-medium" style={{ color: C.saffron }}>
                          {activeShrine.state}
                        </p>
                      </div>
                    </div>

                    <p className="text-[13px] leading-relaxed font-light italic mb-6" style={{ color: C.textMid }}>
                      "{activeShrine.shortDesc}"
                    </p>

                    <div className="rounded-2xl p-4 mb-6" style={{ background: "rgba(193,123,43,0.04)", border: "1px solid rgba(193,123,43,0.1)" }}>
                      <span className="text-[8px] uppercase tracking-[0.5em] block mb-2 font-bold" style={{ color: C.saffron }}>
                        Sacred Connection
                      </span>
                      <p className="text-[12px] leading-relaxed font-light" style={{ color: C.textMid }}>
                        {activeShrine.sacredConnection}
                      </p>
                    </div>

                    <button className="w-full group relative flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl font-medium transition-all duration-500 overflow-hidden"
                      style={{
                        background: activeShrine.available ? C.markerAvail : C.textLight,
                        color: "#FFF8EC",
                        boxShadow: activeShrine.available ? `0 4px 15px rgba(230,81,0,0.25)` : 'none',
                        cursor: activeShrine.available ? 'pointer' : 'not-allowed',
                        opacity: activeShrine.available ? 1 : 0.8
                      }}
                    >
                      {activeShrine.available && <div className="absolute inset-0 bg-white/10 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-700 skew-x-12" />}
                      <span className="relative text-[12px] tracking-wide">
                        {activeShrine.available ? "Let's Begin Your Journey" : "Available Soon"}
                      </span>
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="rounded-none p-8 backdrop-blur-xl shadow-xl border"
                    style={{
                      background: `linear-gradient(145deg, rgba(243,234,216,0.9) 0%, rgba(239,228,204,0.9) 100%)`,
                      borderColor: `rgba(160,100,40,0.15)`,
                    }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-[2px] w-6 rounded-full" style={{ background: C.saffron }} />
                      <span className="text-[9px] uppercase tracking-[0.5em] font-medium" style={{ color: C.saffron }}>
                        Unati Behan
                      </span>
                    </div>

                    <h3 className="text-2xl font-medium leading-[1.3] mb-4" style={{ color: C.text }}>
                      Sacred blessings,<br />
                      <span style={{ color: C.saffron }} className="font-light italic">carried with devotion.</span>
                    </h3>

                    <p className="text-[13px] leading-relaxed font-light mb-8" style={{ color: C.textMid }}>
                      From India&apos;s holiest sanctums to your doorstep — we ensure divine blessings are personally carried and curated for your family&apos;s most sacred milestones.
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-6 border-t" style={{ borderColor: C.divider }}>
                      <div 
                        onClick={() => setListModalType("available")}
                        className="cursor-pointer group p-3 -m-3 rounded-xl hover:bg-white/40 transition-colors"
                      >
                        <p className="text-3xl font-light transition-transform group-hover:scale-105 origin-left" style={{ color: C.saffron }}>{availableCount}</p>
                        <div className="flex items-center gap-1.5 mt-2">
                          <p className="text-[9px] uppercase tracking-widest font-medium" style={{ color: C.textLight }}>Active Shrines</p>
                          <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" style={{ color: C.saffron }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                      <div 
                        onClick={() => setListModalType("all")}
                        className="cursor-pointer group p-3 -m-3 rounded-xl hover:bg-white/40 transition-colors"
                      >
                        <p className="text-3xl font-light transition-transform group-hover:scale-105 origin-left" style={{ color: C.saffron }}>{shrines.length}</p>
                        <div className="flex items-center gap-1.5 mt-2">
                          <p className="text-[9px] uppercase tracking-widest font-medium" style={{ color: C.textLight }}>Mapped Centers</p>
                          <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" style={{ color: C.saffron }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Initiative CTA */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-8 relative overflow-hidden rounded-2xl group cursor-pointer border shadow-sm hover:shadow-md transition-shadow"
                style={{
                  background: `linear-gradient(135deg, rgba(243,234,216,0.6) 0%, rgba(239,228,204,0.6) 100%)`,
                  borderColor: `rgba(160,100,40,0.15)`,
                }}
                onClick={() => setModalOpen(true)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                <div className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-inner" style={{ background: C.saffron }}>
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-medium mb-1" style={{ color: C.saffron }}>Our Purpose</p>
                      <h4 className="text-sm font-semibold" style={{ color: C.text }}>Know about our initiative</h4>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full border flex items-center justify-center group-hover:bg-white/50 transition-colors" style={{ borderColor: C.divider }}>
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" style={{ color: C.textMid }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
