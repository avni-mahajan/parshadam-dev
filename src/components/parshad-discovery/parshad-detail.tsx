"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import type { ParshadDiscovery } from "./types";

interface ParshadDetailProps {
  parshad: ParshadDiscovery;
  sourceRect: DOMRect;
  onClose: () => void;
}

function SectionDivider() {
  return (
    <div className="my-10 flex items-center gap-4">
      <div
        className="h-px flex-1"
        style={{
          background: "linear-gradient(90deg, rgba(160,140,120,0.12), transparent)",
        }}
      />
      <div
        className="w-1 h-1 rotate-45"
        style={{ background: "rgba(160,140,120,0.2)" }}
      />
      <div
        className="h-px flex-1"
        style={{
          background: "linear-gradient(270deg, rgba(160,140,120,0.12), transparent)",
        }}
      />
    </div>
  );
}

export function ParshadDetail({ parshad, sourceRect, onClose }: ParshadDetailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const flyingCardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"entering" | "settled" | "leaving">("entering");

  useEffect(() => {
    const tl = gsap.timeline();

    // 1. Curtain slides in from left
    tl.fromTo(
      curtainRef.current,
      { x: "-100%" },
      { x: "0%", duration: 0.5, ease: "power3.out" },
      0
    );

    // 2. Flying card animates from source position to left-center
    const targetX = window.innerWidth * 0.06;
    const targetY = window.innerHeight * 0.12;
    const targetW = Math.min(380, window.innerWidth * 0.35);

    tl.fromTo(
      flyingCardRef.current,
      {
        position: "fixed",
        left: sourceRect.left,
        top: sourceRect.top,
        width: sourceRect.width,
        height: sourceRect.height,
        zIndex: 60,
        borderRadius: "4px",
      },
      {
        left: targetX,
        top: targetY,
        width: targetW,
        height: targetW,
        duration: 0.65,
        ease: "power3.inOut",
      },
      0
    );

    // 3. Content fades in on the right
    tl.fromTo(
      contentRef.current,
      { opacity: 0, x: 40 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
      0.45
    );

    tl.eventCallback("onComplete", () => setPhase("settled"));

    return () => {
      tl.kill();
    };
  }, [sourceRect]);

  const handleClose = () => {
    setPhase("leaving");
    const tl = gsap.timeline({ onComplete: onClose });

    tl.to(contentRef.current, { opacity: 0, x: 30, duration: 0.3, ease: "power2.in" }, 0);

    tl.to(
      flyingCardRef.current,
      {
        left: sourceRect.left,
        top: sourceRect.top,
        width: sourceRect.width,
        height: sourceRect.height,
        duration: 0.5,
        ease: "power3.inOut",
      },
      0
    );

    tl.to(
      curtainRef.current,
      { x: "-100%", duration: 0.45, ease: "power3.in" },
      0.1
    );
  };

  return (
    <div ref={containerRef} className="fixed inset-0 z-50">
      {/* Curtain */}
      <div
        ref={curtainRef}
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #D8CBE4 0%, #F2EDDA 35%, #F5EFC8 60%, #D0C2E0 100%)",
        }}
      />

      {/* Flying card */}
      <div
        ref={flyingCardRef}
        className="fixed overflow-hidden"
        style={{ zIndex: 60 }}
      >
        <div
          className="w-full h-full rounded-[4px]"
          style={{
            backgroundImage: `url(${parshad.image})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            boxShadow: "0 16px 48px rgba(0,0,0,0.15),0 4px 16px rgba(0,0,0,0.08)",
          }}
        />
      </div>

      {/* Content panel */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex opacity-0"
        style={{ zIndex: 55 }}
      >
        {/* Left spacer where the image sits */}
        <div className="w-[44%] shrink-0" />

        {/* Right content */}
        <div className="w-[56%] h-full overflow-y-auto px-10 lg:px-14 py-16">
          {/* Close */}
          <button
            onClick={handleClose}
            className="fixed top-8 right-8 font-sans text-[11px] uppercase tracking-[0.15em] cursor-pointer bg-white/40 backdrop-blur-md border border-stone-200/40 rounded-full w-9 h-9 flex items-center justify-center hover:bg-white/70 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-300"
            style={{ color: "#3a3228", zIndex: 70 }}
          >
            ✕
          </button>

          <div className="max-w-[480px]">
            {/* Shrine label — small, uppercase, tracked */}
            <p
              className="font-sans text-[9px] uppercase tracking-[0.3em] leading-none"
              style={{ color: "rgba(90,78,68,0.35)" }}
            >
              {parshad.shrineName} · {parshad.state}
            </p>

            {/* Name — large serif, tight tracking */}
            <h2
              className="font-heading text-[32px] lg:text-[38px] font-normal tracking-[-0.01em] leading-[1.05] mt-5"
              style={{ color: "#3a3228" }}
            >
              {parshad.name}
            </h2>

            {/* Tagline — italic, expressive */}
            <p
              className="font-sans text-[14px] leading-[1.6] mt-5 italic"
              style={{ color: "rgba(58,50,40,0.55)" }}
            >
              {parshad.tagline}
            </p>

            <SectionDivider />

            {/* The Story — serif heading, sans body */}
            <div>
              <h3
                className="font-heading text-[12px] font-medium tracking-[0.12em] uppercase mb-4"
                style={{ color: "rgba(90,78,68,0.6)" }}
              >
                The Story
              </h3>
              <p
                className="font-sans text-[13px] leading-[1.9]"
                style={{ color: "rgba(58,50,40,0.6)" }}
              >
                {parshad.legend}
              </p>
            </div>

            {/* Sacred Connection */}
            <div className="mt-10">
              <h3
                className="font-heading text-[12px] font-medium tracking-[0.12em] uppercase mb-4"
                style={{ color: "rgba(90,78,68,0.6)" }}
              >
                Sacred Connection
              </h3>
              <p
                className="font-sans text-[13px] leading-[1.9]"
                style={{ color: "rgba(58,50,40,0.6)" }}
              >
                {parshad.sacredConnection}
              </p>
            </div>

            {/* Blessing */}
            <div className="mt-10">
              <h3
                className="font-heading text-[12px] font-medium tracking-[0.12em] uppercase mb-4"
                style={{ color: "rgba(90,78,68,0.6)" }}
              >
                Blessing
              </h3>
              <p
                className="font-sans text-[13px] leading-[1.9]"
                style={{ color: "rgba(58,50,40,0.6)" }}
              >
                {parshad.blessingPower}
              </p>
            </div>

            <SectionDivider />

            {/* What's Inside — with bullet markers */}
            <div>
              <h3
                className="font-heading text-[12px] font-medium tracking-[0.12em] uppercase mb-4"
                style={{ color: "rgba(90,78,68,0.6)" }}
              >
                What&apos;s Inside
              </h3>
              <div className="space-y-2.5">
                {parshad.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="w-1 h-1 rotate-45 mt-2 shrink-0"
                      style={{ background: "rgba(160,140,120,0.3)" }}
                    />
                    <p
                      className="font-sans text-[13px] leading-[1.7]"
                      style={{ color: "rgba(58,50,40,0.6)" }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Prayer — elegant block */}
            <div
              className="mt-12 py-7 px-8 rounded-xl text-center"
              style={{
                background: "rgba(216,203,228,0.1)",
                border: "1px solid rgba(216,203,228,0.12)",
              }}
            >
              <p
                className="font-heading text-[20px] tracking-[0.02em] leading-[1.4]"
                style={{ color: "#3a3228" }}
              >
                {parshad.prayer}
              </p>
              <p
                className="font-sans text-[9px] uppercase tracking-[0.3em] mt-3"
                style={{ color: "rgba(90,78,68,0.3)" }}
              >
                Morning Prayer
              </p>
            </div>

            {/* CTA */}
            <div className="mt-12 mb-8">
              <button
                onClick={() => {}}
                className="w-full py-4.5 rounded-xl font-sans text-[11px] uppercase tracking-[0.22em] cursor-pointer border-none transition-all duration-500 hover:shadow-[0_8px_32px_rgba(58,50,40,0.2)] hover:translate-y-[-1px]"
                style={{
                  background: "linear-gradient(135deg, #3a3228, #4a4238)",
                  color: "#F5EFC8",
                  boxShadow: "0 4px 16px rgba(58,50,40,0.12)",
                }}
              >
                Add to offering
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
