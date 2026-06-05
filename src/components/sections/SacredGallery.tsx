"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import type { FaithShrine } from "./sanatani-data";

gsap.registerPlugin(MotionPathPlugin);

interface Props {
  shrines: FaithShrine[];
  phase: "gallery" | "transitioning" | "detail";
  activeIndex: number;
  onCardClick: (index: number) => void;
  onTransitionComplete: () => void;
}

const CARD_W = 200;
const CARD_H = 320;

const GALLERY_POSITIONS = [
  { x: -170, y: 30, z: 80, ry: -12, rz: -2, zIndex: 5 },
  { x: -65, y: -20, z: -10, ry: -5, rz: 0, zIndex: 3 },
  { x: 0, y: -60, z: -110, ry: 0, rz: 1.5, zIndex: 1 },
  { x: 65, y: -10, z: -10, ry: 5, rz: 0, zIndex: 3 },
  { x: 170, y: 40, z: 80, ry: 12, rz: 2, zIndex: 5 },
];

export default function SacredGallery({
  shrines,
  phase,
  activeIndex,
  onCardClick,
  onTransitionComplete,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setCardRef = useCallback((i: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[i] = el;
  }, []);

  // Set initial GSAP positions on mount
  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    cards.forEach((c, i) => {
      const p = GALLERY_POSITIONS[i];
      if (!p) return;
      gsap.set(c, {
        x: p.x, y: p.y, z: p.z,
        rotationY: p.ry, rotation: p.rz,
        scale: 0.8, opacity: 0,
        zIndex: p.zIndex,
      });
    });
  }, []);

  // Phase 1 & 2 — Entrance + floating
  useEffect(() => {
    if (phase !== "gallery") return;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!cards.length) return;

    gsap.to(cards, {
      scale: 1, opacity: 1,
      duration: 1.2,
      stagger: { each: 0.08, from: "center" },
      ease: "power3.out",
      onComplete: () => {
        cards.forEach((c, i) => {
          const p = GALLERY_POSITIONS[i];
          if (!p) return;
          gsap.to(c, {
            y: p.y + (i % 2 === 0 ? -5 : 6),
            rotation: p.rz + (i % 2 === 0 ? -0.5 : 0.5),
            duration: 3.5 + i * 0.3,
            repeat: -1, yoyo: true,
            ease: "sine.inOut",
          });
        });
      },
    });
  }, [phase]);

  // Mouse parallax — gallery only
  useEffect(() => {
    if (phase !== "gallery") return;
    const container = containerRef.current;
    if (!container) return;

    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const fx = (e.clientX - rect.left) / rect.width - 0.5;
      const fy = (e.clientY - rect.top) / rect.height - 0.5;

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const depth = GALLERY_POSITIONS[i]?.z ?? 0;
        const factor = 0.3 + (Math.abs(depth) / 200) * 0.7;
        const p = GALLERY_POSITIONS[i];
        gsap.to(card, {
          rotationY: (p?.ry ?? 0) + fx * factor * 4,
          rotationX: fy * factor * -3,
          duration: 1.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };

    const handleLeave = () => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const p = GALLERY_POSITIONS[i];
        gsap.to(card, {
          rotationY: p?.ry ?? 0,
          rotationX: 0,
          duration: 1.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };

    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseleave", handleLeave);
    return () => {
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseleave", handleLeave);
    };
  }, [phase]);

  // Transition — animate cards to their final layout positions via curved MotionPath
  useEffect(() => {
    if (phase !== "transitioning") return;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!cards.length) return;

    // Kill running tweens and snap back to exact gallery positions
    cards.forEach((c) => gsap.killTweensOf(c));
    cards.forEach((c, i) => {
      const p = GALLERY_POSITIONS[i];
      if (!p) return;
      gsap.set(c, { x: p.x, y: p.y, z: p.z, rotationY: p.ry, rotation: p.rz, scale: 1, opacity: 1 });
    });

    const count = shrines.length;
    const prevIdx = ((activeIndex - 1) % count + count) % count;
    const nextIdx = (activeIndex + 1) % count;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // SideCard dimensions (matching the actual SideCard component)
    const sideCardWidth = vw >= 768 ? 208 : 176; // md:w-52 (208px) or w-44 (176px)
    const sideCardHeight = vh * 0.7; // 70vh
    const sideCardScaleX = sideCardWidth / CARD_W;
    const sideCardScaleY = sideCardHeight / CARD_H;
    const sideCardTopOffset = -50; // SideCard has top: "calc(50% - 50px)"

    // Calculate exact positions matching SideCard's left: 0 and right: 0 positioning
    // SideCard has left: 0 or right: 0, so its center is at sideCardWidth/2 from the edge
    const leftCardCenterX = -(vw / 2) + (sideCardWidth / 2); // Center of left card from viewport center
    const rightCardCenterX = (vw / 2) - (sideCardWidth / 2); // Center of right card from viewport center
    // SideCard has top: calc(50% - 50px) and -translate-y-1/2
    // The -translate-y-1/2 centers the element, so the center is at the top position
    // Center Y = -50px from viewport center
    const sideCardCenterY = -50;

    cards.forEach((card, i) => {
      if (!card) return;

      // Remove shadows from all cards during transition
      const backdrop = card.querySelector<HTMLDivElement>(".absolute.inset-0");
      if (backdrop) gsap.to(backdrop, { boxShadow: "none", duration: 0.3, ease: "power2.out" });

      // Only the active card's image fades out — fixed background provides the native-res image
      if (i === activeIndex) {
        const img = card.querySelector<HTMLDivElement>("[data-card-image]");
        if (img) gsap.to(img, { opacity: 0, duration: 1.2, ease: "power2.out" });
      }

      const from = GALLERY_POSITIONS[i];
      let to: {
        x: number; y: number; z: number; scale: number; opacity: number;
        ry?: number; rz?: number; zIndex?: number; borderRadius?: number;
      };

      if (i === activeIndex) {
        // Active card fades to background (doesn't expand)
        to = { x: 0, y: 0, z: -200, scale: 0.8, opacity: 0.3, ry: 0, rz: 0, zIndex: 1 };
      } else if (i === prevIdx) {
        // Previous card → left edge, exactly matching SideCard position
        to = { x: leftCardCenterX, y: sideCardCenterY, z: 0, scale: Math.max(sideCardScaleX, sideCardScaleY), opacity: 1, ry: 0, rz: 0, zIndex: 70, borderRadius: 16 };
      } else if (i === nextIdx) {
        // Next card → right edge, exactly matching SideCard position
        to = { x: rightCardCenterX, y: sideCardCenterY, z: 0, scale: Math.max(sideCardScaleX, sideCardScaleY), opacity: 1, ry: 0, rz: 0, zIndex: 70, borderRadius: 16 };
      } else {
        // Remaining cards drift into background with a gentle curve
        const driftX = from.x > 0 ? vw * 0.5 : -vw * 0.5;
        const driftY = from.y + 200;
        to = { x: driftX, y: driftY, z: -100, scale: 0.3, opacity: 0, ry: from.ry, rz: from.rz, zIndex: 1 };
      }

      // Direct positioning without curved path for exact matching
      gsap.to(card, {
        x: to.x,
        y: to.y,
        z: to.z,
        scale: to.scale,
        opacity: to.opacity,
        rotationY: to.ry ?? 0,
        rotation: to.rz ?? 0,
        zIndex: to.zIndex ?? from.zIndex,
        borderRadius: to.borderRadius ?? 14,
        duration: 2.0,
        ease: "power2.inOut",
      });
    });

    const delayId = gsap.delayedCall(2.1, onTransitionComplete);
    return () => {
      delayId.kill();
      cards.forEach((c, i) => {
        gsap.killTweensOf(c);
        // Restore shadows for all cards
        const backdrop = c.querySelector<HTMLDivElement>(".absolute.inset-0");
        if (backdrop) gsap.set(backdrop, { boxShadow: "" }); // Restore original shadow

        if (i === activeIndex) {
          // Active card: restore its image opacity so it's visible next time
          const img = c.querySelector<HTMLDivElement>("[data-card-image]");
          if (img) gsap.set(img, { opacity: 1 });
        } else if (i === prevIdx || i === nextIdx) {
          // Side cards: reset to original scale (1) and clear rotation/opacity
          gsap.set(c, { scale: 1, opacity: 1, rotation: 0, rotationY: 0 });
          const img = c.querySelector<HTMLDivElement>("[data-card-image]");
          if (img) gsap.set(img, { opacity: 1 });
        }
        // Drifted cards (scale 0.3, opacity 0) — leave as-is, they're hidden
      });
    };
  }, [phase, activeIndex, shrines.length, onTransitionComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-10 flex items-center justify-center overflow-hidden"
      style={{
        perspective: "1200px",
        pointerEvents: phase === "gallery" ? "auto" : "none",
        background: phase === "gallery" ? "#0a0418" : "transparent",
        opacity: phase === "detail" ? 0 : 1,
        transition: "opacity 0.5s ease",
      }}
    >
      {shrines.map((shrine, i) => {
        const accent = shrine.accentColor || shrine.cosmicGlow || "#E8A020";
        const position = GALLERY_POSITIONS[i];

        return (
          <div
            key={shrine.id}
            ref={setCardRef(i)}
            onClick={() => phase === "gallery" && onCardClick(i)}
            className="absolute cursor-pointer select-none"
            style={{
              width: CARD_W,
              height: CARD_H,
              transformStyle: "preserve-3d",
              borderRadius: 14,
              overflow: "hidden",
              willChange: "transform",
              zIndex: position?.zIndex || 1,
            }}
          >
            {/* Card backdrop */}
            <div
              className="absolute inset-0"
              style={{
                background: "#0a0418",
                borderRadius: 14,
                border: "1px solid rgba(255,215,0,0.12)",
                boxShadow: [
                  "0 8px 40px rgba(0,0,0,0.6)",
                  "0 0 0 1px rgba(255,215,0,0.06)",
                  `0 20px 60px ${accent}08`,
                ].join(", "),
              }}
            />

            {/* Image — fades out during GSAP transition so fixed background (native res) takes over */}
            <div
              data-card-image
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${shrine.image})` }}
            />

            {/* Gradient veil */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(4,2,14,0.88)] via-[rgba(4,2,14,0.15)] to-transparent" />

            {/* Accent glow */}
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${accent}15, transparent 70%)`,
                mixBlendMode: "overlay",
              }}
            />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
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
                className="text-white text-sm leading-tight"
                style={{
                  fontFamily: "'Cinzel', 'Georgia', serif",
                  textShadow: "0 2px 8px rgba(0,0,0,0.6)",
                }}
              >
                {shrine.name}
              </h4>
              <p className="text-[9px] text-white/50 uppercase tracking-[0.1em] mt-1">
                {shrine.location}
              </p>
            </div>
          </div>
        );
      })}

      {/* Gallery instruction */}
      {phase === "gallery" && (
        <p
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.4em] text-white/30 font-light"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Choose a sacred shrine
        </p>
      )}
    </div>
  );
}
