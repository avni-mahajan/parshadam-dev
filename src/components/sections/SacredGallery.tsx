"use client";

import React, { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import type { FaithShrine } from "./sanatani-data";

interface Props {
  shrines: FaithShrine[];
  phase: "gallery" | "transitioning" | "detail";
  activeIndex: number;
  onCardClick: (index: number) => void;
  onTransitionComplete: () => void;
  carouselRef: React.RefObject<HTMLDivElement | null>;
}

const CARD_W = 240; // Premium wider cards
const CARD_H = 380; // Premium taller cards

function wrapDist(index: number, progress: number, count: number) {
  const raw = index - progress;
  const wrapped = ((raw % count) + count) % count;
  return wrapped > count / 2 ? wrapped - count : wrapped;
}

export default function SacredGallery({
  shrines,
  phase,
  activeIndex,
  onCardClick,
  onTransitionComplete,
  carouselRef,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 3D Carousel refs
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isHoveringRef = useRef(false);
  const startXRef = useRef(0);
  const startProgressRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll / Dwell refs
  const dwellTimerRef = useRef(0);
  const DWELL_MS = 2500;
  const AUTO_PLAY_SPEED = 0.005; // Slow luxurious auto-play speed

  // Mouse Parallax refs
  const targetMouseXRef = useRef(0);
  const targetMouseYRef = useRef(0);
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);

  const count = shrines.length;

  const setCardRef = useCallback((i: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[i] = el;
  }, []);

  // Sync activeIndex with target progress when entering detail/transition phases
  useEffect(() => {
    if (phase !== "gallery") {
      targetProgressRef.current = activeIndex;
      progressRef.current = activeIndex;
    }
  }, [phase, activeIndex]);

  // RequestAnimationFrame loop for interactive 3D rendering (gallery phase only)
  useEffect(() => {
    if (phase !== "gallery") return;

    let animId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = time - lastTime;
      lastTime = time;

      // Auto-scroll logic (when not dragging/hovering)
      if (!isDraggingRef.current && !isHoveringRef.current) {
        const raw = targetProgressRef.current;
        const norm = ((raw % count) + count) % count;
        const distToCenter = Math.abs(norm - Math.round(norm));

        if (distToCenter < 0.05) {
          dwellTimerRef.current += dt;
          if (dwellTimerRef.current >= DWELL_MS) {
            targetProgressRef.current += AUTO_PLAY_SPEED * (dt / 16.6);
          } else {
            const center = Math.round(norm);
            targetProgressRef.current = raw + (center - norm);
          }
        } else {
          dwellTimerRef.current = 0;
          targetProgressRef.current += AUTO_PLAY_SPEED * (dt / 16.6);
        }
      }

      // Lerp scroll progress
      const lerpFactor = 1 - Math.exp(-dt * 0.008);
      progressRef.current += (targetProgressRef.current - progressRef.current) * lerpFactor;

      // Lerp mouse parallax
      mouseXRef.current += (targetMouseXRef.current - mouseXRef.current) * 0.05;
      mouseYRef.current += (targetMouseYRef.current - mouseYRef.current) * 0.05;

      // Render cards in 3D arc
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      cards.forEach((card, i) => {
        const d = wrapDist(i, progressRef.current, count);

        // 3D curved arc math
        const x = d * 190;
        const z = -Math.abs(d) * 130;
        const y = d * d * 12 + 60; // slight curved dip, moved lower to clear header text
        const ry = d * 18;
        const rz = d * 1.5;
        const scale = Math.max(0.6, 1 - Math.abs(d) * 0.15);
        const opacity = Math.max(0, 1 - Math.abs(d) * 0.3);
        const zIndex = Math.round(100 - Math.abs(d) * 10);

        // Add mouse parallax influence
        const parallaxFactor = 0.5 + (Math.abs(d) / count) * 0.5;
        const finalRy = ry + mouseXRef.current * parallaxFactor * 15;
        const finalRx = mouseYRef.current * parallaxFactor * -12;
        const finalX = x + mouseXRef.current * parallaxFactor * 40;
        const finalY = y + mouseYRef.current * parallaxFactor * 25;

        gsap.set(card, {
          x: finalX,
          y: finalY,
          z,
          scale,
          opacity,
          rotationY: finalRy,
          rotationX: finalRx,
          rotation: rz,
          zIndex,
        });
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [phase, count]);

  // Touch and Swipe handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (phase !== "gallery") return;
    e.preventDefault(); // prevent browser swipe-back on mobile
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startProgressRef.current = targetProgressRef.current;
    dragDistanceRef.current = 0;
    hasDraggedRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (phase !== "gallery") return;
    
    // Parallax tracking when not dragging
    if (!isDraggingRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetMouseXRef.current = x;
      targetMouseYRef.current = y;
      return;
    }

    const deltaX = e.clientX - startXRef.current;
    dragDistanceRef.current = Math.abs(deltaX);

    if (dragDistanceRef.current > 8) {
      hasDraggedRef.current = true;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    const deltaX = e.clientX - startXRef.current;
    const swipeThreshold = 50; // Minimum swipe distance to trigger next/prev

    if (Math.abs(deltaX) > swipeThreshold) {
      // Swipe detected - simply move to next or previous card
      if (deltaX < 0) {
        // Swipe left - go to next card
        targetProgressRef.current += 1;
      } else {
        // Swipe right - go to previous card
        targetProgressRef.current -= 1;
      }
    } else {
      // No swipe - snap back to current card
      const raw = targetProgressRef.current;
      const norm = ((raw % count) + count) % count;
      const snapped = Math.round(norm);
      targetProgressRef.current = targetProgressRef.current + (snapped - norm);
    }
  };

  const handlePointerLeave = () => {
    isDraggingRef.current = false;
    isHoveringRef.current = false;
    targetMouseXRef.current = 0;
    targetMouseYRef.current = 0;
  };

  // Wheel scroll handler
  const handleWheel = (e: React.WheelEvent) => {
    if (phase !== "gallery") return;
    const delta = (e.deltaX || e.deltaY) * 0.0015;
    targetProgressRef.current += delta;

    if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    wheelTimeoutRef.current = setTimeout(() => {
      const raw = targetProgressRef.current;
      const norm = ((raw % count) + count) % count;
      const snapped = Math.round(norm);
      targetProgressRef.current = targetProgressRef.current + (snapped - norm);
    }, 150);
  };

  // Click card helper: immediately transitions to detail view
  const handleCardClickLocal = (index: number) => {
    if (phase !== "gallery") return;
    if (hasDraggedRef.current) return; // Ignore clicks that were drags

    // Immediately transition to the clicked shrine
    onCardClick(index);
  };

  // Transition phase animation timeline (Gallery -> Detail)
  useEffect(() => {
    if (phase !== "transitioning") return;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!cards.length) return;

    // Snap progress values to exact target activeIndex
    progressRef.current = activeIndex;
    targetProgressRef.current = activeIndex;

    const prevIdx = ((activeIndex - 1) % count + count) % count;
    const nextIdx = (activeIndex + 1) % count;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const container = carouselRef.current;
    const containerRect = container
      ? container.getBoundingClientRect()
      : { top: 0, left: 0, width: vw, height: vh };

    const sideCardWidth = vw >= 768 ? 208 : 176;
    const sideCardHeight = containerRect.height * 0.7;
    const sideCardScaleX = sideCardWidth / CARD_W;
    const sideCardScaleY = sideCardHeight / CARD_H;

    const containerCenterY = containerRect.top + containerRect.height / 2;
    const viewportCenterY = vh / 2;
    const sideCardCenterY = (containerCenterY + 40) - viewportCenterY; // Matched to new lower top (calc(50% + 40px))

    const leftCardCenterX = -(vw / 2) + (sideCardWidth / 2);
    const rightCardCenterX = (vw / 2) - (sideCardWidth / 2);

    const tl = gsap.timeline({
      onComplete: onTransitionComplete
    });

    cards.forEach((card, i) => {
      if (!card) return;

      // Remove card backdrop box shadows during transition for a cleaner look
      const backdrop = card.querySelector<HTMLDivElement>("[data-card-backdrop]");
      if (backdrop) gsap.to(backdrop, { boxShadow: "none", duration: 0.3, ease: "power2.out" });

      if (i === activeIndex) {
        const img = card.querySelector<HTMLDivElement>("[data-card-image]");
        if (img) gsap.to(img, { opacity: 0, duration: 1.2, ease: "power2.out" });
        const text = card.querySelector<HTMLDivElement>("[data-card-text]");
        if (text) gsap.to(text, { opacity: 0, duration: 0.4, ease: "power2.out" });
      }

      let to: {
        x: number; y: number; z: number; scale?: number; scaleX?: number; scaleY?: number; opacity: number;
        ry?: number; rz?: number; zIndex?: number; borderRadius?: number;
      };

      if (i === activeIndex) {
        // Active card zooms IN (scales up) towards the viewport and fades out
        to = { x: 0, y: 0, z: 600, scale: 3.5, opacity: 0, ry: 0, rz: 0, zIndex: 100 };
      } else if (i === prevIdx) {
        // Previous card → left side edge
        to = { x: leftCardCenterX, y: sideCardCenterY, z: 0, scaleX: sideCardScaleX, scaleY: sideCardScaleY, opacity: 1, ry: 0, rz: 0, zIndex: 70, borderRadius: 16 };
      } else if (i === nextIdx) {
        // Next card → right side edge
        to = { x: rightCardCenterX, y: sideCardCenterY, z: 0, scaleX: sideCardScaleX, scaleY: sideCardScaleY, opacity: 1, ry: 0, rz: 0, zIndex: 70, borderRadius: 16 };
      } else {
        // Other cards drift off-screen and fade out
        const driftX = i < activeIndex ? -vw * 0.5 : vw * 0.5;
        to = { x: driftX, y: 100, z: -200, scale: 0.3, opacity: 0, ry: 0, rz: 0, zIndex: 1 };
      }

      // Calculate exact start coordinates based on centered activeIndex
      const d = wrapDist(i, activeIndex, count);
      const startX = d * 190;
      const startY = d * d * 12 - 20;
      const startZ = -Math.abs(d) * 130;
      const startScale = Math.max(0.6, 1 - Math.abs(d) * 0.15);
      const startOpacity = Math.max(0, 1 - Math.abs(d) * 0.3);
      const startRy = d * 18;
      const startRz = d * 1.5;

      tl.fromTo(card, {
        x: startX,
        y: startY,
        z: startZ,
        scaleX: startScale,
        scaleY: startScale,
        opacity: startOpacity,
        rotationY: startRy,
        rotationX: 0,
        rotation: startRz,
      }, {
        x: to.x,
        y: to.y,
        z: to.z,
        ...(to.scaleX !== undefined ? { scaleX: to.scaleX, scaleY: to.scaleY } : { scaleX: to.scale, scaleY: to.scale }),
        opacity: to.opacity,
        rotationY: to.ry ?? 0,
        rotationX: 0,
        rotation: to.rz ?? 0,
        zIndex: to.zIndex ?? 1,
        borderRadius: to.borderRadius ?? 20,
        duration: 1.8,
        ease: "power3.inOut",
      }, 0);
    });

    return () => {
      tl.kill();
      cards.forEach((c, i) => {
        gsap.killTweensOf(c);
        const backdrop = c.querySelector<HTMLDivElement>("[data-card-backdrop]");
        if (backdrop) gsap.set(backdrop, { boxShadow: "" });

        if (i === activeIndex) {
          const img = c.querySelector<HTMLDivElement>("[data-card-image]");
          if (img) gsap.set(img, { opacity: 1 });
          const text = c.querySelector<HTMLDivElement>("[data-card-text]");
          if (text) gsap.set(text, { opacity: 1 });
        } else if (i === prevIdx || i === nextIdx) {
          gsap.set(c, { scale: 1, scaleX: 1, scaleY: 1, opacity: 1, rotation: 0, rotationY: 0 });
          const img = c.querySelector<HTMLDivElement>("[data-card-image]");
          if (img) gsap.set(img, { opacity: 1 });
        }
      });
    };
  }, [phase, activeIndex, count, onTransitionComplete, carouselRef]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-10 flex items-center justify-center overflow-hidden touch-none select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      onWheel={handleWheel}
      onMouseEnter={() => { isHoveringRef.current = true; }}
      onMouseLeave={handlePointerLeave}
      style={{
        perspective: "2000px",
        pointerEvents: phase === "gallery" ? "auto" : "none",
        background: phase === "gallery" ? "radial-gradient(ellipse at 50% 40%, #E8D0A8 0%, #D8C8B0 20%, #C8B8C8 40%, #BEA8C0 60%, #B09CB8 80%, #A088B0 100%)" : "transparent",
        opacity: phase === "detail" ? 0 : 1,
        transition: "opacity 0.6s ease-in-out",
        cursor: isDraggingRef.current ? "grabbing" : "grab",
      }}
    >
      {/* Gallery header: luxury title + subtitle */}
      {phase === "gallery" && (
        <div className="absolute inset-x-0 top-0 z-20 flex flex-col items-center pt-10 pointer-events-none">
          {/* Decorative top line */}
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#4C1D95]/50" />
            <span style={{ color: "#4C1D95", fontSize: "0.55rem", letterSpacing: "0.5em", fontFamily: "'Cinzel', serif", textShadow: "0 1px 3px rgba(255,255,255,0.8)" }}>
              ✦ SACRED ✦
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#4C1D95]/50" />
          </div>

          <h2
            className="text-4xl md:text-5xl font-light text-center leading-tight"
            style={{
              fontFamily: "'Cinzel', 'Georgia', serif",
              color: "#4C1D95",
              letterSpacing: "0.1em",
              textShadow: "0 2px 8px rgba(255,255,255,0.9), 0 4px 16px rgba(255,255,255,0.6)",
            }}
          >
            Sanatani Shrines
          </h2>

          <p
            className="mt-3 text-[10px] md:text-xs uppercase tracking-[0.5em] font-light"
            style={{
              color: "#5B21B6",
              fontFamily: "'Cinzel', serif",
              textShadow: "0 1px 4px rgba(255,255,255,0.9), 0 2px 8px rgba(255,255,255,0.6)",
            }}
          >
            Choose Your Sacred Shrine
          </p>

          {/* Decorative ornament */}
          <div className="flex items-center gap-2 mt-4">
            <div className="w-1 h-1 rotate-45 bg-[#4C1D95]/60" />
            <div className="w-6 h-px bg-[#4C1D95]/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#4C1D95]/50" />
            <div className="w-6 h-px bg-[#4C1D95]/40" />
            <div className="w-1 h-1 rotate-45 bg-[#4C1D95]/60" />
          </div>
        </div>
      )}

      {shrines.map((shrine, i) => {
        const accent = shrine.accentColor || shrine.cosmicGlow || "#E8A020";

        return (
          <div
            key={shrine.id}
            ref={setCardRef(i)}
            onClick={() => handleCardClickLocal(i)}
            className="absolute cursor-pointer select-none"
            style={{
              width: CARD_W,
              height: CARD_H,
              transformStyle: "preserve-3d",
              borderRadius: 20,
              overflow: "hidden",
              willChange: "transform",
              zIndex: 1,
            }}
          >
            {/* Card backdrop / gold border */}
            <div
              data-card-backdrop
              className="absolute inset-0"
              style={{
                borderRadius: 20,
                border: "1px solid rgba(212, 175, 55, 0.22)", // Gold accent border
                boxShadow: [
                  "0 15px 45px rgba(0, 0, 0, 0.6)",
                  "inset 0 1px 0 rgba(255, 255, 255, 0.08)",
                  `0 0 30px ${accent}15`,
                ].join(", "),
                background: "rgba(12, 6, 28, 0.5)",
                backdropFilter: "blur(16px)",
              }}
            />

            {/* Inner dashed gold border */}
            <div
              className="absolute inset-3 rounded-2xl border border-dashed border-[#D4AF37]/20 pointer-events-none z-10"
            />

            {/* Image */}
            <div
              data-card-image
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${shrine.image})` }}
            />

            {/* Dark gradient veil at bottom to support premium text */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0418] via-[rgba(10,4,24,0.7)] via-40% to-transparent" />

            {/* Ambient radial overlay */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${accent}50, transparent 75%)`,
                mixBlendMode: "overlay",
              }}
            />

            {/* Solid dark backdrop behind text for guaranteed readability */}
            <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-[#0a0418] via-[rgba(10,4,24,0.92)] via-50% to-transparent h-2/5 pointer-events-none" />

            {/* Content bottom-aligned */}
            <div
              data-card-text
              className="absolute bottom-0 left-0 right-0 p-6 text-center z-20 flex flex-col items-center pointer-events-none"
            >
              <span
                className="inline-block text-[7px] uppercase tracking-[0.25em] font-medium px-2 py-0.5 rounded-full mb-3"
                style={{
                  color: "#FFD700",
                  background: "rgba(0,0,0,0.55)",
                  border: "1px solid rgba(255,215,0,0.5)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.5)",
                }}
              >
                ✦ {shrine.energyType || "divine"} ✦
              </span>
              <h4
                className="text-base leading-snug tracking-wider text-white"
                style={{
                  fontFamily: "'Cinzel', 'Georgia', serif",
                  textShadow: "0 2px 8px #000, 0 4px 16px #000, 0 8px 32px rgba(0,0,0,0.8)",
                }}
              >
                {shrine.name}
              </h4>
              <p className="text-[9px] text-white uppercase tracking-[0.15em] mt-1.5 font-light" style={{ textShadow: "0 1px 6px #000, 0 2px 12px rgba(0,0,0,0.9)" }}>
                {shrine.location}
              </p>
              {shrine.tagline && (
                <p className="text-[10px] text-white/95 mt-1.5 font-medium italic leading-snug max-w-[160px] text-center" style={{ textShadow: "0 1px 8px #000, 0 2px 15px rgba(0,0,0,0.95)" }}>
                  {shrine.tagline}
                </p>
              )}
            </div>
          </div>
        );
      })}

      {/* Gallery instruction */}
      {phase === "gallery" && (
        <p
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.45em] font-light"
          style={{ fontFamily: "'Cinzel', serif", color: "#4C1D95" }}
        >
          Swipe or drag to explore
        </p>
      )}
    </div>
  );
}
