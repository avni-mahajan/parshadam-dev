"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import gsap from "gsap";
import { useRouter } from "next/navigation";

import { sanataniShrines, type FaithShrine } from "@/components/sections/sanatani-data";
import { allParshads } from "@/components/parshad-discovery/data";
import type { ParshadDiscovery } from "@/components/parshad-discovery/types";
import SacredGallery from "@/components/sections/SacredGallery";
import { Footer } from "@/components/sections/footer";

// ─── Master timing constants ──────────────────────────────────────────
// Single source of truth for the shrine-to-shrine transition timeline.
// t=0:       old text fades, overlay begins sweeping
// t=MIDPOINT: shrine data swaps (invisible — behind overlay)
// t=COMPLETE: overlay fully gone, new text fades in
const MIDPOINT_MS = 650;
const COMPLETE_MS = 1350;



// ─── Side Card (left/right floating edge card) ────────────────────────
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
  const edgeClasses =
    side === "left" ? "left-0 rounded-r-2xl" : "right-0 rounded-l-2xl";

  return (
    <motion.div
      data-side-card
      data-side={side}
      className={`absolute top-1/2 -translate-y-1/2 z-[70] w-44 md:w-52 cursor-pointer touch-none pointer-events-auto ${edgeClasses}`}
      style={{ height: "70vh", top: "calc(50% + 40px)" }}
      onPointerDown={(e) => e.stopPropagation()}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - r.left) / r.width);
        mouseY.set((e.clientY - r.top) / r.height);
      }}
      onMouseLeave={() => {
        mouseX.set(0.5);
        mouseY.set(0.5);
      }}
      onClick={onClick}
    >
      {/* Ambient glow */}
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

      {/* Floating bob */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full h-full"
      >
        {/* Tilt layer */}
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className={`relative w-full h-full overflow-hidden backdrop-blur-xl ${edgeClasses}`}
          transition={{ duration: 0.3 }}
        >
          <div
            className={`w-full h-full overflow-hidden ${edgeClasses}`}
            style={{
              background:
                "linear-gradient(180deg, rgba(8,4,22,0.55) 0%, rgba(4,2,14,0.85) 100%)",
              border: "1px solid rgba(255,215,0,0.1)",
              boxShadow:
                "0 0 0 1px rgba(255,215,0,0.06), 0 12px 48px rgba(0,0,0,0.55), 0 4px 20px rgba(0,0,0,0.3)",
            }}
          >
            {/* Shrine image */}
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${shrine.image})` }}
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
            {/* Shine sweep */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(105deg, transparent 35%, rgba(255,215,0,0.12) 42%, rgba(255,215,0,0.2) 45%, rgba(255,215,0,0.12) 48%, transparent 55%)",
                backgroundSize: "250% 100%",
                backgroundPosition: "100% 0%",
              }}
              whileHover={{ backgroundPosition: "0% 0%" }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            />
            {/* Card label */}
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



// ─── Grid Shrine Card ─────────────────────────────────────────────────
function GridShrineCard({
  shrine,
  index,
  onClick,
}: {
  shrine: FaithShrine;
  index: number;
  onClick: () => void;
}) {
  const accent = shrine.accentColor || shrine.cosmicGlow || "#E8A020";
  return (
    <motion.div
      onClick={onClick}
      className="cursor-pointer h-full"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: 16 }}>
        <div
          className="w-full h-full flex flex-col"
          style={{
            borderRadius: 16,
            background:
              "linear-gradient(180deg, rgba(243,232,255,0.92) 0%, rgba(254,249,195,0.95) 100%)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid rgba(124,58,237,0.15)",
            boxShadow:
              "0 0 0 1px rgba(124,58,237,0.12), 0 8px 32px rgba(124,58,237,0.1), inset 0 1px 0 rgba(255,255,255,0.5)",
          }}
        >
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

          <div className="relative flex-1 overflow-hidden" style={{ minHeight: 0 }}>
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${shrine.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(76,29,149,0.85)] via-[rgba(76,29,149,0.1)] to-transparent" />
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${accent}50, transparent 70%)`,
                mixBlendMode: "overlay",
              }}
            />
            <span
              className="absolute top-3 left-3 z-10 uppercase tracking-[0.2em] font-medium px-2 py-0.5 rounded-full text-[7px]"
              style={{
                color: "#fff",
                background: "rgba(124,58,237,0.6)",
                border: "1px solid rgba(124,58,237,0.8)",
                backdropFilter: "blur(4px)",
              }}
            >
              ✦ {shrine.energyType || "divine"} ✦
            </span>
          </div>

          <div className="px-4 py-4 flex flex-col gap-2">
            <h4
              className="uppercase text-sm leading-tight"
              style={{ fontFamily: "'Cinzel', Georgia, serif", color: "#4C1D95", letterSpacing: "0.04em" }}
            >
              {shrine.name}
            </h4>
            <p className="text-[10px] text-[#6D28D9]/70 font-medium tracking-wide">
              {shrine.location}, {shrine.state}
            </p>
            <p
              className="text-[11px] leading-relaxed italic font-serif line-clamp-2"
              style={{ color: "#7C3AED", fontFamily: "'Georgia', serif" }}
            >
              &ldquo;{shrine.shloka.split("。")[0] || shrine.shloka.slice(0, 60)}&rdquo;
            </p>
            <p className="text-[9px] text-[#6D28D9]/50 uppercase tracking-[0.1em]">
              {shrine.deity.split("—")[0]?.trim() || shrine.deity}
            </p>
            <button
              className="mt-2 px-4 py-2 rounded-full text-[9px] uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${accent}30, ${accent}15)`,
                border: `1px solid ${accent}50`,
                color: "#4C1D95",
                fontFamily: "'Cinzel', serif",
              }}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Shrine Info Panel ────────────────────────────────────────────────
function ShrineInfoPanel({
  shrine,
  parshads,
  onChoose,
  onParshadClick,
}: {
  shrine: FaithShrine;
  parshads: ParshadDiscovery[];
  onChoose: () => void;
  onParshadClick: (parshad: ParshadDiscovery) => void;
}) {
  const accent = shrine.accentColor || shrine.cosmicGlow || "#E8A020";
  return (
    <div data-shrine-info className="absolute inset-0 z-[35] pointer-events-none flex items-center justify-center px-6">
      <div className="max-w-4xl w-full text-center">
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-4"
          style={{
            fontFamily: "'Cinzel', 'Georgia', serif",
            background: "linear-gradient(180deg, #FFE7A0 0%, #D4AF37 50%, #B8860B 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "0.06em",
            filter: "drop-shadow(0 2px 15px rgba(0,0,0,0.8))",
          }}
        >
          {shrine.name}
        </h1>

        <p
          className="text-sm md:text-base font-serif italic leading-relaxed max-w-xl mx-auto mb-4"
          style={{
            color: "#D4AF37",
            textShadow: "0 2px 12px rgba(0,0,0,0.95), 0 4px 25px rgba(0,0,0,0.9), 0 0 20px rgba(212,175,55,0.15)",
            fontFamily: "'Georgia', serif",
          }}
        >
          &ldquo;{shrine.shloka}&rdquo;
        </p>

        <p
          className="text-xs md:text-sm max-w-md mx-auto mb-5 leading-relaxed font-normal"
          style={{ color: "#D4AF37", textShadow: "0 1px 10px rgba(0,0,0,0.95), 0 2px 15px rgba(0,0,0,0.9), 0 0 15px rgba(212,175,55,0.1)" }}
        >
          {shrine.tagline}
        </p>

        <div
          className="flex flex-wrap justify-center gap-x-2 gap-y-1 mb-5 text-[11px] md:text-xs"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.95), 0 2px 12px rgba(0,0,0,0.9)" }}
        >
          {shrine.offerings.map((b, i) => (
            <span key={i} className="font-medium tracking-wide" style={{ color: "#D4AF37" }}>
              {b}
              {i < shrine.offerings.length - 1 && (
                <span className="mx-2" style={{ color: "#D4AF37", opacity: 0.5 }}>•</span>
              )}
            </span>
          ))}
        </div>

        <p
          className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium mb-6"
          style={{ color: "#D4AF37", opacity: 0.8, textShadow: "0 1px 8px rgba(0,0,0,0.95), 0 2px 12px rgba(0,0,0,0.9)" }}
        >
          {shrine.location}, {shrine.state}
        </p>

        <div className="relative flex flex-col items-center mb-8" style={{ height: 310 }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-[9px] md:text-[10px] uppercase tracking-[0.35em] font-medium mb-2"
            style={{ color: "#D4AF37", fontFamily: "'Cinzel', serif", textShadow: "0 1px 10px rgba(0,0,0,0.95), 0 0 12px rgba(212,175,55,0.12)" }}
          >
            ✦&nbsp;&nbsp;Temple Offerings&nbsp;&nbsp;✦
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-[8px] md:text-[9px] uppercase tracking-[0.25em] font-light mb-5"
            style={{ color: "#D4AF37", fontFamily: "'Cinzel', serif", textShadow: "0 1px 8px rgba(0,0,0,0.95)" }}
          >
            Sacred offerings blessed with divine grace
          </motion.p>
          <div
            className="relative flex items-center justify-center"
            style={{ perspective: "1100px", height: 220, width: 440 }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            {/* Ambient golden ring glow behind the carousel */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: 360,
                height: 360,
                borderRadius: "50%",
                border: "1px solid rgba(212,175,55,0.08)",
                boxShadow: "0 0 60px rgba(212,175,55,0.06), 0 0 120px rgba(212,175,55,0.03), inset 0 0 60px rgba(212,175,55,0.04)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
            <motion.div
              className="relative"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            >
              {parshads.slice(0, 3).map((p, i) => {
                const angle = i * 120;
                return (
                  <motion.div
                    key={p.id}
                    className="absolute pointer-events-auto cursor-pointer group"
                    style={{
                      width: 140,
                      height: 195,
                      left: -70,
                      top: -97.5,
                      transform: `rotateY(${angle}deg) translateZ(210px)`,
                      backfaceVisibility: "hidden",
                      transformStyle: "preserve-3d",
                    }}
                    onClick={() => onParshadClick(p)}
                  >
                    {/* Golden sparkle halo — outer glow */}
                    <motion.div
                      className="absolute -inset-2 rounded-3xl pointer-events-none"
                      style={{
                        background: "transparent",
                        boxShadow: `0 0 18px rgba(212,175,55,0.25), 0 0 36px rgba(212,175,55,0.12), 0 0 56px rgba(212,175,55,0.06)`,
                        border: "1px solid rgba(212,175,55,0.18)",
                      }}
                      animate={{
                        boxShadow: [
                          `0 0 18px rgba(212,175,55,0.25), 0 0 36px rgba(212,175,55,0.12), 0 0 56px rgba(212,175,55,0.06)`,
                          `0 0 24px rgba(212,175,55,0.35), 0 0 48px rgba(212,175,55,0.18), 0 0 72px rgba(212,175,55,0.08)`,
                          `0 0 18px rgba(212,175,55,0.25), 0 0 36px rgba(212,175,55,0.12), 0 0 56px rgba(212,175,55,0.06)`,
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
                    />
                    <div
                      className="relative w-full h-full rounded-2xl overflow-hidden"
                      style={{
                        border: "1.5px solid rgba(212,175,55,0.35)",
                        boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 24px rgba(212,175,55,0.1), inset 0 1px 0 rgba(255,215,0,0.12)`,
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${p.image})` }} />
                      <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(180deg, transparent 30%, rgba(10,4,24,0.9) 100%)` }} />
                      <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 50% 50%, ${accent}15, transparent 70%)`, mixBlendMode: "overlay" }} />

                      {/* Animated sparkle sweep */}
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage: `linear-gradient(105deg, transparent 25%, rgba(212,175,55,0.08) 40%, rgba(255,215,0,0.18) 50%, rgba(212,175,55,0.08) 60%, transparent 75%)`,
                          backgroundSize: "300% 100%",
                        }}
                        animate={{ backgroundPosition: ["250% 0%", "-50% 0%"] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: i * 1.2 }}
                      />

                      {/* Card content */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                        {/* Golden dot indicator */}
                        <div
                          className="w-2 h-2 rounded-full mx-auto mb-1.5"
                          style={{
                            backgroundColor: "#D4AF37",
                            boxShadow: "0 0 8px rgba(212,175,55,0.6), 0 0 16px rgba(212,175,55,0.3)",
                          }}
                        />
                        <span
                          className="text-[10px] md:text-[11px] uppercase tracking-[0.12em] font-semibold leading-tight block"
                          style={{ color: "#fff", fontFamily: "'Cinzel', serif", textShadow: "0 1px 10px rgba(0,0,0,0.95), 0 2px 15px rgba(0,0,0,0.8)" }}
                        >
                          {p.name}
                        </span>
                        <span
                          className="text-[7px] uppercase tracking-[0.18em] mt-1 block"
                          style={{ color: "rgba(212,175,55,0.7)", fontFamily: "'Cinzel', serif", textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}
                        >
                          {p.shrineName}
                        </span>
                        <p
                          className="text-[7px] leading-[1.5] mt-1.5 line-clamp-2"
                          style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Georgia', serif", fontStyle: "italic" }}
                        >
                          {p.sacredConnection}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        <div className="pointer-events-auto mt-2" onPointerDown={(e) => e.stopPropagation()}>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: `0 0 50px ${accent}40` }}
            whileTap={{ scale: 0.97 }}
            onClick={onChoose}
            className="inline-flex items-center gap-3 px-7 py-3 rounded-full text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium transition-all duration-500"
            style={{
              background: `linear-gradient(135deg, ${accent}30, ${accent}10)`,
              border: `1px solid ${accent}60`,
              boxShadow: `0 0 30px ${accent}20, inset 0 1px 0 rgba(255,255,255,0.1)`,
              color: "#fff",
              fontFamily: "'Cinzel', serif",
              textShadow: "0 1px 6px rgba(0,0,0,0.8)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span style={{ color: accent, opacity: 0.9 }}>✦</span>
            Choose {shrine.name}
            <span style={{ color: accent, opacity: 0.9 }}>✦</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────
export default function SanataniPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const shrineIds = new Set([
    "maa-mangla",
    "chintpurni",
    "jawali-ji",
    "jagannath-puri",
    "maa-chamunda-devi",
  ]);
  const shrines = sanataniShrines.filter((s) => shrineIds.has(s.id));

  // ── Gallery → detail phase ──────────────────────────────────────────
  const [phase, setPhase] = useState<"gallery" | "transitioning" | "detail">(
    "gallery"
  );

  // ── Shrine display state ────────────────────────────────────────────
  // displayIndex = what's currently rendered (text, carousel, side-cards)
  const [displayIndex, setDisplayIndex] = useState(0);

  // ── Shrine-to-shrine transition state ──────────────────────────────
  // isTransitioning: master gate — blocks new transitions
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionTo, setTransitionTo] = useState(0);
  const [transitionDir, setTransitionDir] = useState<"next" | "prev">("next");

  // carouselRef: measured at transition time so GSAP targets exact pixel coords
  const carouselRef = useRef<HTMLDivElement>(null);
  const transitionOverlayRef = useRef<HTMLDivElement>(null);
  const swipeStart = useRef(0);
  const swiping = useRef(false);
  const dragX = useRef(0);
  const activeTransitionDir = useRef<"next" | "prev" | null>(null);
  const hasSwiped = useRef(false);

  const displayShrine = shrines[displayIndex];
  const transitionShrine = shrines[transitionTo];
  const count = shrines.length;

  // Force dark background while on this page
  useEffect(() => {
    document.body.style.backgroundColor = "#0a0418";
    document.documentElement.style.backgroundColor = "#0a0418";
    return () => {
      document.body.style.backgroundColor = "";
      document.documentElement.style.backgroundColor = "";
    };
  }, []);

  // Auto-advance gallery → transitioning after 1.5s idle
  useEffect(() => {
    if (phase !== "gallery") return;
    const t = setTimeout(() => setPhase("transitioning"), 1500);
    return () => clearTimeout(t);
  }, [phase]);

  const handleGalleryCardClick = useCallback(
    (index: number) => {
      if (phase !== "gallery") return;
      setDisplayIndex(index);
      setPhase("transitioning");
    },
    [phase]
  );

  const handleGalleryTransitionComplete = useCallback(() => {
    setPhase("detail");
  }, []);

  // ── Master transition function ──────────────────────────────────────
  // Single entry point for all shrine-to-shrine navigation.
  // Runs a precisely timed GSAP timeline.
  const navigateTo = useCallback(
    (toIndex: number, direction: "next" | "prev") => {
      if (isTransitioning || phase !== "detail") return;

      setIsTransitioning(true);
      setTransitionDir(direction);
      setTransitionTo(toIndex);

      // Wait for transition panel to render in DOM
      requestAnimationFrame(() => {
        const currentPanel = document.getElementById("current-shrine-panel");
        const transitionPanel = transitionOverlayRef.current;

        if (!currentPanel || !transitionPanel) {
          setDisplayIndex(toIndex);
          setIsTransitioning(false);
          return;
        }

        const fromRight = direction === "next";

        // Set initial position of the transition panel (slides in on top of current)
        gsap.set(transitionPanel, {
          x: fromRight ? "100%" : "-100%",
        });

        // Set initial position of the current panel
        gsap.set(currentPanel, {
          x: "0%",
        });

        // Create the synchronized GSAP timeline
        const tl = gsap.timeline({
          onComplete: () => {
            // Safeguard state sync
            setDisplayIndex(toIndex);
            setIsTransitioning(false);
            // Reset inline styles
            gsap.set(currentPanel, { clearProps: "x" });
          }
        });

        // Animate current panel (outbound) to -25% (if next) or 25% (if prev) for parallax depth
        tl.to(currentPanel, {
          x: fromRight ? "-25%" : "25%",
          duration: 0.85,
          ease: "power2.inOut"
        }, 0);

        // Animate transition panel (inbound) to 0%
        tl.to(transitionPanel, {
          x: "0%",
          duration: 0.85,
          ease: "power2.inOut"
        }, 0);
      });
    },
    [isTransitioning, phase]
  );

  const handleNavigate = useCallback(
    (direction: "next" | "prev") => {
      if (hasSwiped.current) return;
      if (isTransitioning || phase !== "detail") return;
      const toIndex =
        direction === "next"
          ? (displayIndex + 1) % count
          : ((displayIndex - 1) + count) % count;
      navigateTo(toIndex, direction);
    },
    [isTransitioning, phase, displayIndex, count, navigateTo]
  );

  const handleDotClick = useCallback(
    (i: number) => {
      if (i === displayIndex) return;
      navigateTo(i, i > displayIndex ? "next" : "prev");
    },
    [displayIndex, navigateTo]
  );

  // Autoplay functionality
  useEffect(() => {
    if (phase !== "detail" || isTransitioning) return;
    const interval = setInterval(() => handleNavigate("next"), 6000);
    return () => clearInterval(interval);
  }, [phase, isTransitioning, handleNavigate]);

  return (
    <main
      className="relative w-full min-h-screen overflow-x-hidden select-none"
      style={{ background: "#0a0418" }}
    >
      {/* ────────────────────────────────────────────────────────────────
          LAYER 7 — z-[100]: Navbar (fixed, always on top of everything)
      ──────────────────────────────────────────────────────────────── */}
      {phase !== "gallery" && (
        <div className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-5 pt-4 pb-3 w-full pointer-events-none">
          {/* Left: Logo */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.25 }}
            className="flex flex-col items-start pointer-events-auto"
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
              className="uppercase tracking-[0.22em] font-semibold"
              style={{
                fontFamily: "'Cinzel', 'Playfair Display', 'Times New Roman', serif",
                fontSize: "clamp(0.85rem, 1.8vw, 1.3rem)",
                background: "linear-gradient(180deg, #FFE7A0 0%, #D4AF37 50%, #B8860B 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Sanatani Shrines
            </h1>
            <div className="w-1.5 h-1.5 rotate-45 mt-1 bg-yellow-500/90 shadow-[0_0_6px_#FFD700]" />
          </motion.div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Right: Search Bar + View All + Om */}
          <div className="flex items-center gap-3 pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <AnimatePresence>
                {searchOpen ? (
                  <motion.div
                    key="search-open"
                    initial={{ opacity: 0, scaleX: 0.8 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0.8 }}
                    className="relative flex items-center"
                    style={{ transformOrigin: "right", width: 200 }}
                  >
                    <span
                      className="absolute left-3 text-xs"
                      style={{ color: displayShrine?.accentColor || "#D4AF37", textShadow: "0 0 8px currentColor" }}
                    >
                      ✦
                    </span>
                    <input
                      autoFocus
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Search shrines…"
                      className="w-full pl-8 pr-4 py-2 text-[11px] uppercase tracking-[0.2em] outline-none"
                      style={{
                        background: "rgba(10,4,24,0.7)",
                        border: `1px solid ${displayShrine?.accentColor || "#D4AF37"}40`,
                        borderRadius: 100,
                        color: "#fff",
                        fontFamily: "'Cinzel', serif",
                        backdropFilter: "blur(16px)",
                        boxShadow: `0 0 20px ${displayShrine?.accentColor || "#D4AF37"}10, inset 0 1px 0 rgba(255,255,255,0.06)`,
                      }}
                      onKeyDown={e => { if (e.key === "Escape") { setSearchOpen(false); setSearchQuery(""); } }}
                    />
                    <button
                      onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                      className="absolute right-3 text-white/40 hover:text-white/80 transition-colors text-xs"
                    >
                      ✕
                    </button>
                  </motion.div>
                ) : (
                  <motion.button
                    key="search-closed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSearchOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 group"
                    style={{
                      background: "rgba(10,4,24,0.5)",
                      border: `1px solid rgba(212,175,55,0.15)`,
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(212,175,55,0.7)" strokeWidth="2" strokeLinecap="round">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <span
                      className="text-[10px] uppercase tracking-[0.3em] font-light text-white/40 group-hover:text-white/70 transition-colors"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      Search Shrines
                    </span>
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document
                  .getElementById("all-shrines-grid")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-400"
              style={{
                background: `linear-gradient(135deg, ${displayShrine?.accentColor || "#FFD700"}15, ${displayShrine?.accentColor || "#FFD700"}05)`,
                border: `1px solid ${displayShrine?.accentColor || "#FFD700"}25`,
                backdropFilter: "blur(12px)",
              }}
            >
              <span
                className="text-[9px] uppercase tracking-[0.25em] font-light"
                style={{
                  color: "#fff",
                  fontFamily: "'Cinzel', 'Georgia', serif",
                  textShadow: "0 1px 6px rgba(0,0,0,0.8)",
                }}
              >
                View All
              </span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </motion.button>

            <div
              className="flex items-center justify-center w-9 h-9"
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
        </div>
      )}

      {/* ────────────────────────────────────────────────────────────────
          LAYER 3 — z-[10]: SacredGallery (gallery + transitioning phases)
          Fixed, covers viewport. Fades to 0 in detail phase.
      ──────────────────────────────────────────────────────────────── */}
      <SacredGallery
        shrines={shrines}
        phase={phase}
        activeIndex={displayIndex}
        onCardClick={handleGalleryCardClick}
        onTransitionComplete={handleGalleryTransitionComplete}
        carouselRef={carouselRef}
      />

      {/* ────────────────────────────────────────────────────────────────
          LAYER 4 — z-[20]: Detail section
          h-screen, full-viewport. overflow-hidden to confine overlay.
      ──────────────────────────────────────────────────────────────── */}
      <section
        className="relative z-[20] h-screen w-full overflow-hidden"
        ref={carouselRef}
        onPointerDown={(e) => {
          if (phase !== "detail" || isTransitioning) return;
          swipeStart.current = e.clientX;
          swiping.current = true;
          dragX.current = 0;
          activeTransitionDir.current = null;
          hasSwiped.current = false;
        }}
        onPointerMove={(e) => {
          if (!swiping.current || phase !== "detail") return;
          const dx = e.clientX - swipeStart.current;
          dragX.current = dx;

          const vw = window.innerWidth;

          // Only start swiping transition after moving more than 10px
          if (Math.abs(dx) > 10) {
            hasSwiped.current = true;
            const dir = dx < 0 ? "next" : "prev";
            const targetIndex = dir === "next"
              ? (displayIndex + 1) % count
              : ((displayIndex - 1) + count) % count;

            if (activeTransitionDir.current !== dir) {
              activeTransitionDir.current = dir;
              setTransitionTo(targetIndex);
              setTransitionDir(dir);
              setIsTransitioning(true);
            }

            // Perform real-time panel translation
            requestAnimationFrame(() => {
              const currentPanel = document.getElementById("current-shrine-panel");
              const transitionPanel = transitionOverlayRef.current;

              if (currentPanel && transitionPanel) {
                // Outbound panel gets parallax shift (dragX * 0.25)
                gsap.set(currentPanel, { x: dx * 0.25 });
                
                // Inbound panel moves with drag (startOffset + dragX)
                const startOffset = dir === "next" ? vw : -vw;
                gsap.set(transitionPanel, { x: startOffset + dx });
              }
            });
          }
        }}
        onPointerUp={() => {
          if (!swiping.current || phase !== "detail") return;
          swiping.current = false;

          const vw = window.innerWidth;
          const dx = dragX.current;
          const dir = activeTransitionDir.current;

          if (dir) {
            const currentPanel = document.getElementById("current-shrine-panel");
            const transitionPanel = transitionOverlayRef.current;

            if (currentPanel && transitionPanel) {
              const threshold = vw * 0.15; // 15% of viewport width threshold to complete swipe
              const targetTo = transitionTo; // cache

              if (Math.abs(dx) > threshold) {
                // Swipe success! Complete transition
                const tl = gsap.timeline({
                  onComplete: () => {
                    setDisplayIndex(targetTo);
                    setIsTransitioning(false);
                    gsap.set(currentPanel, { clearProps: "x" });
                  }
                });

                tl.to(currentPanel, {
                  x: dir === "next" ? -vw * 0.25 : vw * 0.25,
                  duration: 0.45,
                  ease: "power2.out"
                }, 0);

                tl.to(transitionPanel, {
                  x: 0,
                  duration: 0.45,
                  ease: "power2.out"
                }, 0);
              } else {
                // Swipe failed / cancelled. Snap back!
                const tl = gsap.timeline({
                  onComplete: () => {
                    setIsTransitioning(false);
                    gsap.set(currentPanel, { clearProps: "x" });
                  }
                });

                tl.to(currentPanel, {
                  x: 0,
                  duration: 0.35,
                  ease: "power2.out"
                }, 0);

                tl.to(transitionPanel, {
                  x: dir === "next" ? vw : -vw,
                  duration: 0.35,
                  ease: "power2.out"
                }, 0);
              }
            } else {
              setIsTransitioning(false);
            }
          }
          
          swipeStart.current = 0;
          dragX.current = 0;
          activeTransitionDir.current = null;
          setTimeout(() => {
            hasSwiped.current = false;
          }, 50);
        }}
        onPointerLeave={() => {
          // Trigger same logic as PointerUp when cursor leaves container
          if (!swiping.current || phase !== "detail") return;
          swiping.current = false;

          const vw = window.innerWidth;
          const dx = dragX.current;
          const dir = activeTransitionDir.current;

          if (dir) {
            const currentPanel = document.getElementById("current-shrine-panel");
            const transitionPanel = transitionOverlayRef.current;

            if (currentPanel && transitionPanel) {
              const threshold = vw * 0.15;
              const targetTo = transitionTo;

              if (Math.abs(dx) > threshold) {
                const tl = gsap.timeline({
                  onComplete: () => {
                    setDisplayIndex(targetTo);
                    setIsTransitioning(false);
                    gsap.set(currentPanel, { clearProps: "x" });
                  }
                });

                tl.to(currentPanel, {
                  x: dir === "next" ? -vw * 0.25 : vw * 0.25,
                  duration: 0.45,
                  ease: "power2.out"
                }, 0);

                tl.to(transitionPanel, {
                  x: 0,
                  duration: 0.45,
                  ease: "power2.out"
                }, 0);
              } else {
                const tl = gsap.timeline({
                  onComplete: () => {
                    setIsTransitioning(false);
                    gsap.set(currentPanel, { clearProps: "x" });
                  }
                });

                tl.to(currentPanel, {
                  x: 0,
                  duration: 0.35,
                  ease: "power2.out"
                }, 0);

                tl.to(transitionPanel, {
                  x: dir === "next" ? vw : -vw,
                  duration: 0.35,
                  ease: "power2.out"
                }, 0);
              }
            } else {
              setIsTransitioning(false);
            }
          }

          swipeStart.current = 0;
          dragX.current = 0;
          activeTransitionDir.current = null;
          setTimeout(() => {
            hasSwiped.current = false;
          }, 50);
        }}
        style={{
          opacity: phase === "gallery" ? 0 : 1,
          pointerEvents: phase === "detail" ? "auto" : "none",
          transition:
            phase === "transitioning" ? "opacity 2s ease" : "opacity 0.5s ease",
          touchAction: "none", // prevent browser interference so pointer events handle all swipe gestures
        }}
      >
        {/* ── Current Shrine Panel (z-10) ── */}
        {phase !== "gallery" && displayShrine && (
          <div
            id="current-shrine-panel"
            className="absolute inset-0 z-10"
            style={{ willChange: "transform" }}
          >
            {/* Background */}
            <div
              className="absolute inset-0 z-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${displayShrine.image})` }}
            />
            {/* Dark Premium Vignette & Gradients Overlay for Text Readability */}
            <div
              className="absolute inset-0 z-[1] pointer-events-none"
              style={{
                background: "radial-gradient(circle at center, rgba(10,4,24,0.3) 0%, rgba(10,4,24,0.65) 100%), linear-gradient(to bottom, rgba(10,4,24,0.55) 0%, rgba(10,4,24,0.1) 40%, rgba(10,4,24,0.1) 60%, rgba(10,4,24,0.7) 100%)",
              }}
            />
            {/* Content */}
            <div className="absolute inset-0 z-30 pointer-events-none" data-shrine-info>
               <ShrineInfoPanel shrine={displayShrine} parshads={allParshads.filter(p => p.faith === "hindu").slice(0, 3)} onChoose={() => router.push('/parshads')} onParshadClick={(p) => router.push(`/shrine/${p.shrineId}`)} />
            </div>
            {/* Floating Cards (rendered only in detail phase to avoid gallery transition duplicates) */}
            {phase === "detail" && (
              <div className="absolute inset-0 z-40 pointer-events-none" data-side-cards-wrap>
                <SideCard
                  shrine={shrines[((displayIndex - 1) % count + count) % count]}
                  side="left"
                  onClick={() => handleNavigate("prev")}
                />
                <SideCard
                  shrine={shrines[(displayIndex + 1) % count]}
                  side="right"
                  onClick={() => handleNavigate("next")}
                />
              </div>
            )}
          </div>
        )}

        {/* ── Transition Shrine Panel (z-20) ── */}
        {isTransitioning && transitionShrine && (
          <div
            ref={transitionOverlayRef}
            className="absolute inset-0 z-20"
            style={{ willChange: "transform" }}
          >
            {/* Background */}
            <div
              className="absolute inset-0 z-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${transitionShrine.image})` }}
            />
            {/* Dark Premium Vignette & Gradients Overlay for Text Readability */}
            <div
              className="absolute inset-0 z-[1] pointer-events-none"
              style={{
                background: "radial-gradient(circle at center, rgba(10,4,24,0.3) 0%, rgba(10,4,24,0.65) 100%), linear-gradient(to bottom, rgba(10,4,24,0.55) 0%, rgba(10,4,24,0.1) 40%, rgba(10,4,24,0.1) 60%, rgba(10,4,24,0.7) 100%)",
              }}
            />
            {/* Content */}
            <div className="absolute inset-0 z-30 pointer-events-none">
              <ShrineInfoPanel shrine={transitionShrine} parshads={allParshads.filter(p => p.faith === "hindu").slice(0, 3)} onChoose={() => router.push('/parshads')} onParshadClick={(p) => router.push(`/shrine/${p.shrineId}`)} />
            </div>
            {/* Floating Cards */}
            <div className="absolute inset-0 z-40 pointer-events-none">
              <SideCard
                shrine={shrines[((transitionTo - 1) % count + count) % count]}
                side="left"
                onClick={() => {}}
              />
              <SideCard
                shrine={shrines[(transitionTo + 1) % count]}
                side="right"
                onClick={() => {}}
              />
            </div>
          </div>
        )}

        {/* ── Navigation Controls & CTAs (z-50) ── */}
        {phase !== "gallery" && displayShrine && (
          <div className="absolute inset-0 z-50 pointer-events-none">
            {/* Old subtitle removed – now inside dot indicators row */}

            {/* Left arrow */}
            <button
              onClick={() => handleNavigate("prev")}
              className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full
                flex items-center justify-center border border-white/10 bg-black/40 backdrop-blur-md
                hover:border-white/30 hover:bg-white/10 transition-all duration-300 pointer-events-auto"
            >
              <span className="text-white/60 text-base">←</span>
            </button>

            {/* Right arrow */}
            <button
              onClick={() => handleNavigate("next")}
              className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full
                flex items-center justify-center border border-white/10 bg-black/40 backdrop-blur-md
                hover:border-white/30 hover:bg-white/10 transition-all duration-300 pointer-events-auto"
            >
              <span className="text-white/60 text-base">→</span>
            </button>

            {/* Dot indicators + subtitle row */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-auto">
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-[10px] uppercase tracking-[0.4em] font-medium"
                style={{
                  color: "#D4AF37",
                  fontFamily: "'Cinzel', serif",
                  textShadow: "0 1px 10px rgba(0,0,0,0.95), 0 0 12px rgba(212,175,55,0.12)",
                }}
              >
                Choose Your Sacred Shrine
              </motion.p>
              <div className="flex gap-2">
                {shrines.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleDotClick(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      (isTransitioning ? transitionTo : displayIndex) === i
                        ? "w-8 bg-amber-400"
                        : "w-1.5 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Remove old View All CTA – moved to navbar */}
          </div>
        )}
      </section>

      {/* ── Section divider ─────────────────────────────────────────── */}
      <div className="relative z-20" style={{ background: "#F3E8FF" }}>
        <div className="flex items-center justify-center gap-4 py-8">
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-purple-400/40 to-purple-400/10" />
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rotate-45 bg-purple-400/50" />
            <div className="w-3 h-px bg-purple-400/20" />
            <div className="w-1 h-1 rounded-full bg-purple-400/40" />
            <div className="w-3 h-px bg-purple-400/20" />
            <div className="w-1 h-1 rotate-45 bg-purple-400/50" />
          </div>
          <div className="h-px w-20 bg-gradient-to-l from-transparent via-purple-400/40 to-purple-400/10" />
        </div>
      </div>

      {/* ── All Shrines Grid ─────────────────────────────────────────── */}
      <section
        id="all-shrines-grid"
        className="relative z-20 py-20 px-6"
        style={{
          background:
            "linear-gradient(180deg, #F3E8FF 0%, #FEF9C3 50%, #FDE68A 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div
                className="h-px w-10"
                style={{ background: "linear-gradient(90deg, transparent, #A855F760)" }}
              />
              <span
                className="text-[9px] uppercase tracking-[0.5em] font-medium"
                style={{ color: "#7C3AEDAA" }}
              >
                Sacred Shrines
              </span>
              <div
                className="h-px w-10"
                style={{ background: "linear-gradient(90deg, #A855F760, transparent)" }}
              />
            </div>
            <h2
              className="text-3xl md:text-4xl font-semibold"
              style={{
                fontFamily: "'Cinzel', 'Georgia', serif",
                background: "linear-gradient(180deg, #D4AF37 0%, #B8860B 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              All Sanatani Shrines
            </h2>
            <p className="text-xs md:text-sm text-[#8B6914]/80 mt-3 max-w-xl mx-auto leading-relaxed font-medium">
              Each shrine holds centuries of devotion. Tap to explore its story,
              blessings, and sacred offerings.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {shrines.map((s, i) => (
              <div key={s.id} className="relative" style={{ aspectRatio: "3/5" }}>
                <GridShrineCard shrine={s} index={i} onClick={() => router.push(`/shrine/${s.id}`)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
