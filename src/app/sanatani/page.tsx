"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import { sanataniShrines, type FaithShrine } from "@/components/sections/sanatani-data";
import SacredGallery from "@/components/sections/SacredGallery";
import { Footer } from "@/components/sections/footer";

// ─── Transition Overlay (Corner Ripple Reveal) ──────────────────────────
function TransitionOverlay({
  shrine,
  direction,
  onComplete,
}: {
  shrine: FaithShrine;
  direction: "next" | "prev";
  onComplete: () => void;
}) {
  const accent = shrine.accentColor || shrine.cosmicGlow || "#FFD700";
  const fromRight = direction === "next";
  const originX = fromRight ? "100%" : "0%";

  useEffect(() => {
    const timer = setTimeout(onComplete, 1600);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[60] pointer-events-none overflow-hidden"
      style={{ background: "#0a0418" }}
    >
      {/* Clip-path reveals image + glow */}
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: `circle(0% at ${originX} 100%)` }}
        animate={{ clipPath: `circle(150% at ${originX} 100%)` }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${shrine.image})` }}
        />

        {/* Gradient veil */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(4,2,14,0.3) 0%, transparent 45%, rgba(4,2,14,0.1) 100%)" }}
        />

        {/* Corner glow burst */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(farthest-corner at ${originX} 100%, ${accent}25, transparent 60%)`,
            mixBlendMode: "screen",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Shrine info text — always fully visible, centered, not clipped */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center px-6">
        <div className="max-w-4xl w-full">
          <div className="text-center">
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight mb-4"
              style={{
                fontFamily: "'Cinzel', 'Georgia', serif",
                color: "#fff",
                textShadow: "0 4px 30px rgba(0,0,0,0.5)",
                letterSpacing: "0.06em",
              }}
            >
              {shrine.name}
            </h1>
            <p
              className="text-sm md:text-base font-serif italic leading-relaxed max-w-xl mx-auto mb-4"
              style={{
                color: `${accent}CC`,
                textShadow: "0 2px 12px rgba(0,0,0,0.4)",
                fontFamily: "'Georgia', serif",
              }}
            >
              &ldquo;{shrine.shloka}&rdquo;
            </p>
            <p
              className="text-xs md:text-sm text-white/70 max-w-md mx-auto mb-5 leading-relaxed font-light"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
            >
              {shrine.tagline}
            </p>
            <div
              className="flex flex-wrap justify-center gap-x-2 gap-y-1 mb-5 text-[11px] md:text-xs"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
            >
              {shrine.offerings.map((b, i) => (
                <span key={i} className="text-white/60 font-light tracking-wide">
                  {b}
                  {i < shrine.offerings.length - 1 && (
                    <span className="mx-2" style={{ color: `${accent}60` }}>•</span>
                  )}
                </span>
              ))}
            </div>
            <p
              className="text-[10px] md:text-xs text-white/40 uppercase tracking-[0.2em] font-light mb-6"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}
            >
              {shrine.location}, {shrine.state}
            </p>
          </div>
        </div>
      </div>

      {/* Ripple rings (outside clip-path — visible from the start) */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: "30vmin",
            height: "30vmin",
            [fromRight ? "right" : "left"]: "-15vmin",
            bottom: "-15vmin",
            border: `1.5px solid ${accent}30`,
          }}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 8, opacity: 0 }}
          transition={{ delay: i * 0.15, duration: 1.6, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────
// ─── Hero Side Card (left/right edge) ─────────────────────────────────
function SideCard({
  shrine,
  side,
  onClick,
}: {
  shrine: FaithShrine;
  side: "left" | "right";
  onClick: () => void;
}) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });
  const rotateX = useTransform(springY, [0, 1], [10, -10]);
  const rotateY = useTransform(springX, [0, 1], [-10, 10]);
  const glowX = useTransform(springX, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(springY, [0, 1], ["0%", "100%"]);

  const accent = shrine.accentColor || shrine.cosmicGlow || "#E8A020";

  function handleMouse(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  const edgeClasses = side === "left"
    ? "left-0 rounded-r-2xl"
    : "right-0 rounded-l-2xl";

  const innerBorderClasses = side === "left"
    ? "!rounded-r-xl border-r"
    : "!rounded-l-xl border-l";

  return (
    <motion.div
      className={`absolute top-1/2 -translate-y-1/2 z-[70] w-44 md:w-52 cursor-pointer ${edgeClasses}`}
      style={{ height: "70vh", top: "calc(50% - 50px)" }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      onClick={onClick}
    >
      {/* Glow aura */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]: string[]) =>
              `radial-gradient(circle at ${gx} ${gy}, ${accent}25, transparent 70%)`
          ),
          filter: "blur(40px)",
          transform: "translateY(10px) scale(0.95)",
        }}
      />

      {/* Float wrapper (continuous gentle bob) */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full h-full"
      >
        {/* Card body */}
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className={`relative w-full h-full overflow-hidden backdrop-blur-xl ${edgeClasses}`}
          transition={{ duration: 0.3 }}
        >
        <div
          className={`w-full h-full overflow-hidden ${edgeClasses}`}
          style={{
            background: "linear-gradient(180deg, rgba(8,4,22,0.55) 0%, rgba(4,2,14,0.85) 100%)",
            border: "1px solid rgba(255,215,0,0.1)",
            boxShadow: `0 0 0 1px rgba(255,215,0,0.06), 0 12px 48px rgba(0,0,0,0.55), 0 4px 20px rgba(0,0,0,0.3)`,
          }}
        >
          {/* Background image */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${shrine.image})`,
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(4,2,14,0.9)] via-[rgba(4,2,14,0.25)] to-transparent" />
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${accent}20, transparent 70%)`,
              mixBlendMode: "overlay",
            }}
          />

          {/* Shine */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(105deg, transparent 35%, rgba(255,215,0,0.12) 42%, rgba(255,215,0,0.2) 45%, rgba(255,215,0,0.12) 48%, transparent 55%)",
              backgroundSize: "250% 100%",
              backgroundPosition: "100% 0%",
            }}
            whileHover={{ backgroundPosition: "0% 0%" }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          />

          {/* Content at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
            <span
              className="inline-block text-[7px] uppercase tracking-[0.2em] font-medium px-2 py-0.5 rounded-full mb-2"
              style={{
                color: accent,
                background: `${accent}15`,
                border: `1px solid ${accent}30`,
              }}
            >
              ✦ {shrine.energyType || "divine"} ✦
            </span>
            <h4
              className="text-sm text-white leading-tight"
              style={{
                fontFamily: "'Cinzel', 'Georgia', serif",
                textShadow: "0 2px 8px rgba(0,0,0,0.6)",
              }}
            >
              {shrine.name}
            </h4>
            <p className="text-[8px] text-white/40 uppercase tracking-[0.1em] mt-1">
              {shrine.location}
            </p>
          </div>
        </div>
      </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─── Hero Carousel ────────────────────────────────────────────────────
function HeroCarousel({
  shrines,
  activeIndex,
  onNavigate,
  onDotClick,
}: {
  shrines: FaithShrine[];
  activeIndex: number;
  onNavigate: (direction: "next" | "prev") => void;
  onDotClick: (index: number) => void;
}) {
  const count = shrines.length;
  const prev = shrines[((activeIndex - 1) % count + count) % count];
  const next = shrines[(activeIndex + 1) % count];
  const swipeStart = useRef(0);
  const swiping = useRef(false);

  const goNext = () => onNavigate("next");
  const goPrev = () => onNavigate("prev");
  const goTo = (i: number) => onDotClick(i);

  const handlePointerDown = (e: React.PointerEvent) => {
    swipeStart.current = e.clientX;
    swiping.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (swipeStart.current === 0) return;
    const dx = e.clientX - swipeStart.current;
    if (Math.abs(dx) > 10) swiping.current = true;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const dx = e.clientX - swipeStart.current;
    swipeStart.current = 0;
    if (swiping.current && Math.abs(dx) > 50) {
      if (dx < 0) goNext();
      else goPrev();
    }
    swiping.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    swipeStart.current = e.touches[0].clientX;
    swiping.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (swipeStart.current === 0) return;
    const dx = e.touches[0].clientX - swipeStart.current;
    if (Math.abs(dx) > 10) swiping.current = true;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - swipeStart.current;
    swipeStart.current = 0;
    if (swiping.current && Math.abs(dx) > 50) {
      if (dx < 0) goNext();
      else goPrev();
    }
    swiping.current = false;
  };

  // Auto-advance every 5s
  useEffect(() => {
    const interval = setInterval(() => onNavigate("next"), 5000);
    return () => clearInterval(interval);
  }, [onNavigate]);

  return (
    <div
      className="relative w-full h-full flex items-center justify-center overflow-hidden touch-none select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── Side cards ── */}
      <SideCard shrine={prev} side="left" onClick={goPrev} />
      <SideCard shrine={next} side="right" onClick={goNext} />

      {/* ── Navigation arrows (positioned outside side cards) ── */}
      <button
        onClick={goPrev}
        className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 z-40 w-8 h-8 rounded-full flex items-center justify-center
          border border-white/10 bg-black/40 backdrop-blur-md hover:border-white/30 hover:bg-white/10 transition-all duration-300"
      >
        <span className="text-white/60 text-base">←</span>
      </button>
      <button
        onClick={goNext}
        className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 z-40 w-8 h-8 rounded-full flex items-center justify-center
          border border-white/10 bg-black/40 backdrop-blur-md hover:border-white/30 hover:bg-white/10 transition-all duration-300"
      >
        <span className="text-white/60 text-base">→</span>
      </button>

      {/* ── Dot indicators ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-2">
        {shrines.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              activeIndex === i
                ? "w-8 bg-amber-400"
                : "w-1.5 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Liquid Ink Drop Overlay ──────────────────────────────────────────
// ─── Grid Shrine Card (tall, premium) ─────────────────────────────────
function GridShrineCard({
  shrine,
  index,
}: {
  shrine: FaithShrine;
  index: number;
}) {
  const accent = shrine.accentColor || shrine.cosmicGlow || "#E8A020";

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative w-full overflow-hidden" style={{ borderRadius: 16 }}>
        <div
          className="w-full flex flex-col"
          style={{
            borderRadius: 16,
            background: "linear-gradient(180deg, rgba(10,6,28,0.82) 0%, rgba(4,2,14,0.97) 100%)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid rgba(255,215,0,0.15)",
            boxShadow: `0 0 0 1px rgba(255,215,0,0.2), 0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)`,
          }}
        >
          {/* Ornate corners */}
          {["top left", "top right", "bottom left", "bottom right"].map((pos) => {
            const [v, h] = pos.split(" ");
            return (
              <div
                key={pos}
                className={`absolute ${v}-2 ${h}-2 w-4 h-4 pointer-events-none z-10`}
                style={{
                  borderColor: `${accent}40`,
                  borderStyle: "solid",
                  borderWidth: 0,
                  ...(v === "top" ? { borderTopWidth: 1.5 } : { borderBottomWidth: 1.5 }),
                  ...(h === "left" ? { borderLeftWidth: 1.5 } : { borderRightWidth: 1.5 }),
                  ...(v === "top" && h === "left" ? { borderTopLeftRadius: 4 } : {}),
                  ...(v === "top" && h === "right" ? { borderTopRightRadius: 4 } : {}),
                  ...(v === "bottom" && h === "left" ? { borderBottomLeftRadius: 4 } : {}),
                  ...(v === "bottom" && h === "right" ? { borderBottomRightRadius: 4 } : {}),
                }}
              />
            );
          })}

          {/* Image area - tall */}
          <div className="relative" style={{ height: 280, overflow: "hidden" }}>
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${shrine.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(4,2,14,0.95)] via-[rgba(4,2,14,0.1)] to-transparent" />
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${accent}50, transparent 70%)`,
                mixBlendMode: "overlay",
              }}
            />

            {/* Shine sweep */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(105deg, transparent 35%, rgba(255,215,0,0.1) 42%, rgba(255,215,0,0.18) 45%, rgba(255,215,0,0.1) 48%, transparent 55%)",
                backgroundSize: "250% 100%",
                backgroundPosition: "100% 0%",
              }}
              whileHover={{ backgroundPosition: "0% 0%" }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            />

            {/* Energy badge */}
            <span
              className="absolute top-3 left-3 z-10 uppercase tracking-[0.2em] font-medium px-2 py-0.5 rounded-full text-[7px]"
              style={{
                color: accent,
                background: `${accent}15`,
                border: `1px solid ${accent}30`,
                backdropFilter: "blur(4px)",
              }}
            >
              ✦ {shrine.energyType || "divine"} ✦
            </span>
          </div>

          {/* Content */}
          <div className="px-4 py-4 flex flex-col gap-2">
            <h4
              className="uppercase text-sm leading-tight"
              style={{
                fontFamily: "'Cinzel', Georgia, serif",
                background: "linear-gradient(135deg, #FFE8B0 0%, #FFC050 50%, #E8A030 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "0.04em",
              }}
            >
              {shrine.name}
            </h4>

            <p
              className="text-[10px] text-white/60 font-medium tracking-wide"
            >
              {shrine.location}, {shrine.state}
            </p>

            {/* Shloka */}
            <p
              className="text-[11px] leading-relaxed italic font-serif text-white/50 line-clamp-2"
              style={{
                color: `${accent}99`,
                fontFamily: "'Georgia', serif",
              }}
            >
              &ldquo;{shrine.shloka.split("。")[0] || shrine.shloka.slice(0, 60)}&rdquo;
            </p>

            {/* Deity */}
            <p
              className="text-[9px] text-white/40 uppercase tracking-[0.1em]"
            >
              {shrine.deity.split("—")[0]?.trim() || shrine.deity}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Shrine Info Panel (shown above carousel based on active) ────────
function ShrineInfoPanel({ shrine }: { shrine: FaithShrine }) {
  const accent = shrine.accentColor || shrine.cosmicGlow || "#E8A020";

  return (
    <div className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center px-6">
      <div className="max-w-4xl w-full text-center">
        {/* Shrine name */}
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight mb-4"
          style={{
            fontFamily: "'Cinzel', 'Georgia', serif",
            color: "#fff",
            textShadow: "0 4px 30px rgba(0,0,0,0.5)",
            letterSpacing: "0.06em",
          }}
        >
          {shrine.name}
        </h1>

        {/* Shloka */}
        <p
          className="text-sm md:text-base font-serif italic leading-relaxed max-w-xl mx-auto mb-4"
          style={{
            color: `${accent}CC`,
            textShadow: "0 2px 12px rgba(0,0,0,0.4)",
            fontFamily: "'Georgia', serif",
          }}
        >
          &ldquo;{shrine.shloka}&rdquo;
        </p>

        {/* Description */}
        <p
          className="text-xs md:text-sm text-white/70 max-w-md mx-auto mb-5 leading-relaxed font-light"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
        >
          {shrine.tagline}
        </p>

        {/* Blessings as inline dot-separated list */}
        <div
          className="flex flex-wrap justify-center gap-x-2 gap-y-1 mb-5 text-[11px] md:text-xs"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
        >
          {shrine.offerings.map((b, i) => (
            <span key={i} className="text-white/60 font-light tracking-wide">
              {b}
              {i < shrine.offerings.length - 1 && (
                <span className="mx-2" style={{ color: `${accent}60` }}>•</span>
              )}
            </span>
          ))}
        </div>

        {/* Location */}
        <p
          className="text-[10px] md:text-xs text-white/40 uppercase tracking-[0.2em] font-light mb-6"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}
        >
          {shrine.location}, {shrine.state}
        </p>

        {/* CTA */}
        <div className="pointer-events-auto">
          <button
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] md:text-xs uppercase tracking-[0.25em] font-light transition-all duration-500"
            style={{
              background: `linear-gradient(135deg, ${accent}20, ${accent}08)`,
              border: `1px solid ${accent}40`,
              boxShadow: `0 0 30px ${accent}15, inset 0 1px 0 rgba(255,255,255,0.06)`,
              color: "#fff",
              fontFamily: "'Cinzel', serif",
            }}
          >
            Choose {shrine.name}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────
export default function SanataniPage() {
  const shrineIds = new Set(["maa-mangla", "chintpurni", "jawali-ji", "jagannath-puri", "maa-chamunda-devi"]);
  const shrines = sanataniShrines.filter((s) => shrineIds.has(s.id));
  const [activeIndex, setActiveIndex] = useState(0);
  const [transition, setTransition] = useState<{ direction: "next" | "prev"; toIndex: number } | null>(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [phase, setPhase] = useState<"gallery" | "transitioning" | "detail">("gallery");
  const transitionRef = useRef(transition);
  transitionRef.current = transition;

  const activeShrine = shrines[activeIndex];

  // Auto-advance gallery → transitioning after 1.5s
  useEffect(() => {
    if (phase !== "gallery") return;
    const timer = setTimeout(() => setPhase("transitioning"), 1500);
    return () => clearTimeout(timer);
  }, [phase]);

  const handleGalleryCardClick = useCallback((index: number) => {
    if (phase !== "gallery") return;
    setActiveIndex(index);
    setPhase("transitioning");
  }, [phase]);

  const handleGalleryTransitionComplete = useCallback(() => {
    setPhase("detail");
  }, []);

  const handleNavigate = useCallback((direction: "next" | "prev") => {
    if (transitionRef.current) return; // Block during active transition
    const count = shrines.length;
    const toIndex =
      direction === "next"
        ? (activeIndex + 1) % count
        : ((activeIndex - 1) % count + count) % count;

    if (direction === "prev") {
      // Instant prev navigation — no card-expansion animation
      setActiveIndex(toIndex);
      return;
    }

    setFadeOut(false);
    setTransition({ direction, toIndex });
  }, [activeIndex, shrines.length]);

  const completeTransition = useCallback(() => {
    if (!transitionRef.current) return;
    setActiveIndex(transitionRef.current.toIndex);
    requestAnimationFrame(() => {
      setFadeOut(true);
    });
    // Delay clearing transition so new ShrineInfoPanel renders smoothly
    setTimeout(() => {
      setTransition(null);
    }, 800);
  }, []);

  // Calculate the shrine being transitioned to
  const transitionShrine = transition ? shrines[transition.toIndex] : null;

  // Override body background while on this page
  useEffect(() => {
    const prevBody = document.body.style.backgroundColor;
    const prevHtml = document.documentElement.style.backgroundColor;
    document.body.style.backgroundColor = "#0a0418";
    document.documentElement.style.backgroundColor = "#0a0418";
    return () => {
      document.body.style.backgroundColor = prevBody;
      document.documentElement.style.backgroundColor = prevHtml;
    };
  }, []);

  const detailVisible = phase === "detail";

  return (
    <main className="relative w-full min-h-screen overflow-x-hidden select-none" style={{ background: "#0a0418" }}>
      {/* Fixed full-viewport shrine background — fade in during transition */}
      {phase !== "gallery" && activeShrine && (
        <motion.div
          key={activeShrine.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: phase === "transitioning" ? 1.8 : 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-[5] bg-cover bg-center"
          style={{ backgroundImage: `url(${activeShrine.image})` }}
        />
      )}

      {/* ── Sacred Gallery — always in DOM so cards animate to their final positions ── */}
      <SacredGallery
        shrines={shrines}
        phase={phase}
        activeIndex={activeIndex}
        onCardClick={handleGalleryCardClick}
        onTransitionComplete={handleGalleryTransitionComplete}
      />

      {/* ── Navbar ── */}
      <div className="relative z-40 flex items-center justify-between px-6 pt-5 w-full">
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.25 }}
          className="flex flex-col items-start"
        >
          <div
            style={{
              fontSize: "1.3rem",
              lineHeight: 1,
              marginBottom: 2,
              filter: "drop-shadow(0 0 12px rgba(255,215,0,0.85))",
            }}
          >
            🪷
          </div>
          <h1
            className="uppercase tracking-[0.22em] font-light"
            style={{
              fontFamily: "'Cinzel', 'Playfair Display', 'Times New Roman', serif",
              fontSize: "clamp(1rem, 2vw, 1.4rem)",
              background: "linear-gradient(180deg, #FFF7D2 0%, #E8B94B 50%, #9C7214 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 2px 10px rgba(0,0,0,0.45)",
            }}
          >
            Sanatani Shrines
          </h1>
          <div className="w-1.5 h-1.5 rotate-45 mt-1 bg-yellow-500/90 shadow-[0_0_6px_#FFD700]" />
        </motion.div>

        <div />

        {/* OM button */}
        <div
          className="flex items-center justify-center w-9 h-9 cursor-pointer"
          style={{
            color: "#FFD700",
            fontSize: "1.15rem",
            fontFamily: "serif",
            textShadow: "0 0 8px rgba(255,215,0,0.6)",
          }}
        >
          ॐ
        </div>
      </div>

      {/* ── Hero Carousel Section — visible only after transition completes so gallery cards transform into SideCard positions ── */}
      <section
        className="relative z-20 h-screen w-full flex flex-col"
        style={{
          opacity: phase === "detail" ? 1 : 0,
          pointerEvents: phase === "detail" ? "auto" : "none",
          transition: "opacity 0.5s ease",
        }}
      >
        {/* Shrine Info Overlay — only visible in hero section (detail phase) */}
        {phase === "detail" && activeShrine && !transition && (
          <div className="absolute inset-0 z-[35] pointer-events-none">
            <ShrineInfoPanel shrine={activeShrine} />
          </div>
        )}
        <div className="flex-1 relative">
          {/* Global title at top-left */}
          {activeShrine && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: phase !== "gallery" ? 1 : 0, y: phase !== "gallery" ? 0 : 10 }}
              transition={{ duration: 0.8, delay: phase !== "gallery" ? 0.4 : 0, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-3 left-6 z-50 text-[10px] md:text-xs uppercase tracking-[0.35em] font-medium"
              style={{
                color: `${activeShrine.accentColor || "#FFD700"}AA`,
                textShadow: "0 2px 12px rgba(0,0,0,0.5)",
              }}
            >
              Choose Your Sacred Shrine
            </motion.p>
          )}

          <HeroCarousel
            shrines={shrines}
            activeIndex={transition ? transition.toIndex : activeIndex}
            onNavigate={handleNavigate}
            onDotClick={(i) => setActiveIndex(i)}
          />

          {/* ── Directional wipe overlay with fade-out ── */}
          {transition && transitionShrine && (
            <motion.div
              animate={{ opacity: fadeOut ? 0 : 1 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              <TransitionOverlay
                shrine={transitionShrine}
                direction={transition.direction}
                onComplete={completeTransition}
              />
            </motion.div>
          )}

          {/* ── View All Shrines CTA (bottom-right) ── */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: phase !== "gallery" ? 1 : 0, y: phase !== "gallery" ? 0 : 20 }}
            transition={{ duration: 0.8, delay: phase !== "gallery" ? 1.2 : 0, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => document.getElementById("all-shrines-grid")?.scrollIntoView({ behavior: "smooth" })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full transition-all duration-500"
            style={{
              background: `linear-gradient(135deg, ${activeShrine?.accentColor || "#FFD700"}20, ${activeShrine?.accentColor || "#FFD700"}08)`,
              border: `1px solid ${activeShrine?.accentColor || "#FFD700"}30`,
              boxShadow: `0 0 40px ${activeShrine?.accentColor || "#FFD700"}10, inset 0 1px 0 rgba(255,255,255,0.06)`,
            }}
          >
            <span
              className="text-[10px] uppercase tracking-[0.25em] font-light"
              style={{
                color: "#fff",
                fontFamily: "'Cinzel', 'Georgia', serif",
                textShadow: "0 2px 12px rgba(0,0,0,0.4)",
              }}
            >
              View All Shrines
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </motion.button>
        </div>
      </section>

      {/* ── Section Divider ── */}
      <div className="relative z-20" style={{ background: "#0a0418" }}>
        <div className="flex items-center justify-center gap-4 py-8">
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-amber-500/30 to-amber-500/10" />
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rotate-45 bg-amber-500/40" />
            <div className="w-3 h-px bg-amber-500/20" />
            <div className="w-1 h-1 rounded-full bg-amber-500/30" />
            <div className="w-3 h-px bg-amber-500/20" />
            <div className="w-1 h-1 rotate-45 bg-amber-500/40" />
          </div>
          <div className="h-px w-20 bg-gradient-to-l from-transparent via-amber-500/30 to-amber-500/10" />
        </div>
      </div>

      {/* ── All Shrines Grid ── */}
      <section
        id="all-shrines-grid"
        className="relative z-20 py-20 px-6"
        style={{ background: "#0a0418" }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-10" style={{
                background: "linear-gradient(90deg, transparent, #FFD70040)",
              }} />
              <span
                className="text-[9px] uppercase tracking-[0.5em] font-medium"
                style={{ color: "#FFD700AA" }}
              >
                Sacred Shrines
              </span>
              <div className="h-px w-10" style={{
                background: "linear-gradient(90deg, #FFD70040, transparent)",
              }} />
            </div>
            <h2
              className="text-3xl md:text-4xl font-light text-white"
              style={{ fontFamily: "'Cinzel', 'Georgia', serif" }}
            >
              All Sanatani Shrines
            </h2>
            <p className="text-xs text-white/40 mt-3 max-w-xl mx-auto leading-relaxed font-light">
              Each shrine holds centuries of devotion. Tap to explore its story, blessings, and sacred offerings.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {shrines.map((s, i) => (
              <div key={s.id} className="relative" style={{ aspectRatio: "3/4.5" }}>
                <GridShrineCard shrine={s} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
