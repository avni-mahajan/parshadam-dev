"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { ParshadDiscovery } from "./types";
import { ParshadDetail } from "./parshad-detail";

gsap.registerPlugin(ScrollTrigger);

function seededRandom(seed: number) {
  let x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

const canvasPositions = [
  { x: 8, y: 0 },
  { x: 30, y: 15 },
  { x: 54, y: -5 },
  { x: 78, y: 10 },
  { x: 10, y: 340 },
  { x: 36, y: 320 },
  { x: 62, y: 350 },
  { x: 84, y: 315 },
  { x: 2, y: 660 },
  { x: 28, y: 640 },
  { x: 55, y: 670 },
  { x: 80, y: 635 },
  { x: 8, y: 980 },
  { x: 34, y: 960 },
  { x: 60, y: 990 },
  { x: 84, y: 955 },
  { x: 4, y: 1300 },
  { x: 30, y: 1280 },
  { x: 56, y: 1310 },
  { x: 78, y: 1275 },
  { x: 12, y: 1620 },
  { x: 38, y: 1600 },
  { x: 63, y: 1630 },
  { x: 86, y: 1595 },
  { x: 5, y: 1940 },
  { x: 32, y: 1920 },
  { x: 58, y: 1950 },
];

const itemSizes = [
  { w: 170, mw: "max-w-[170px]" },
  { w: 200, mw: "max-w-[200px]" },
  { w: 150, mw: "max-w-[150px]" },
  { w: 185, mw: "max-w-[185px]" },
];

function DropdownMenu({
  open,
  onClose,
  children,
  align = "right",
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="absolute top-full mt-2 bg-white/80 backdrop-blur-md border border-stone-200/60 rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] py-1.5 min-w-[150px] z-50"
      style={{ [align === "right" ? "right" : "left"]: 0 }}
    >
      {children}
    </div>
  );
}

export function ParshadCanvas({
  parshads,
  onSelect,
}: {
  parshads: ParshadDiscovery[];
  onSelect: (p: ParshadDiscovery) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [filterDeity, setFilterDeity] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedParshad, setSelectedParshad] = useState<ParshadDiscovery | null>(null);
  const [sourceRect, setSourceRect] = useState<DOMRect | null>(null);

  const deities = useMemo(() => {
    const set = new Set(parshads.map((p) => p.deity));
    return Array.from(set).sort();
  }, [parshads]);

  const filtered = useMemo(() => {
    let result = [...parshads];
    if (filterDeity) result = result.filter((p) => p.deity === filterDeity);
    if (sortBy === "name") result.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "shrine") result.sort((a, b) => a.shrineName.localeCompare(b.shrineName));
    return result;
  }, [parshads, filterDeity, sortBy]);

  const repeated = useMemo(() => {
    if (filtered.length === 0) return [];
    return [...filtered, ...filtered, ...filtered];
  }, [filtered]);

  const rotations = useMemo(
    () => repeated.map((_, i) => ((seededRandom(i) * 2 - 1).toFixed(1))),
    [repeated.length]
  );

  const sizeIndices = useMemo(
    () => repeated.map((_, i) => i % itemSizes.length),
    [repeated.length]
  );

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-canvas-item]").forEach((item) => {
        const delay = gsap.utils.random(0, 0.35);
        const duration = gsap.utils.random(0.6, 0.9);
        const fromRot = gsap.utils.random(-8, 8);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 98%",
            once: true,
          },
        });

        tl.fromTo(
          item,
          {
            scale: 0,
            autoAlpha: 0,
            rotation: fromRot,
            y: gsap.utils.random(20, 40),
          },
          {
            scale: 1,
            autoAlpha: 1,
            rotation: 0,
            y: 0,
            duration,
            ease: "back.out(1.4)",
            delay,
          }
        );

        const info = item.querySelector("[data-canvas-info]");
        if (info) {
          tl.fromTo(
            info,
            { y: 6, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.3, ease: "power2.out" },
            "-=0.2"
          );
        }
      });
    },
    { scope: containerRef, dependencies: [filtered] }
  );

  const btnStyle =
    "font-sans text-[11px] tracking-[0.12em] px-3.5 py-1.5 rounded-md border cursor-pointer transition-all duration-300 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]";
  const itemStyle =
    "block w-full text-left px-3.5 py-2 font-sans text-[11px] tracking-[0.08em] cursor-pointer hover:bg-stone-100/80 transition-colors duration-150";

  return (
    <div ref={containerRef} className="relative w-full pb-20">
      {/* Header */}
      <div className="px-8 md:px-16 lg:px-24 pt-16 pb-12">
        <div className="flex items-start justify-between">
          <div>
            {/* Main title */}
            <h1
              className="font-heading text-[36px] md:text-[44px] lg:text-[52px] font-normal tracking-[0.03em] leading-[0.95]"
              style={{ color: "#3a3228" }}
            >
              Parshads
            </h1>

            {/* Subtitle with decorative elements */}
            <div className="flex items-center gap-3 mt-5">
              <div
                className="h-px w-8"
                style={{
                  background: "linear-gradient(90deg, rgba(160,140,120,0.35), transparent)",
                }}
              />
              <p
                className="font-sans text-[10px] uppercase tracking-[0.3em] font-medium"
                style={{ color: "rgba(90,78,68,0.45)" }}
              >
                Sacred Offerings
              </p>
              <div
                className="h-px w-8"
                style={{
                  background: "linear-gradient(270deg, rgba(160,140,120,0.35), transparent)",
                }}
              />
            </div>

            {/* Description */}
            <p
              className="font-sans text-[13px] leading-[1.7] mt-4 max-w-[320px]"
              style={{ color: "rgba(90,78,68,0.5)" }}
            >
              Handpicked sacred offerings from India&apos;s most revered temples,
              blessed with centuries of devotion.
            </p>
          </div>

          <div className="flex items-center gap-3 mt-1 relative">
            {/* Filter button */}
            <div className="relative">
              <button
                onClick={() => {
                  setFilterOpen(!filterOpen);
                  setSortOpen(false);
                }}
                className={btnStyle}
                style={{
                  borderColor: filterDeity ? "#3a3228" : "rgba(90,78,68,0.2)",
                  color: filterDeity ? "#3a3228" : "rgba(90,78,68,0.5)",
                  backgroundColor: filterDeity ? "rgba(90,78,68,0.05)" : "transparent",
                }}
              >
                Filter{filterDeity ? `: ${filterDeity}` : ""}
              </button>
              <DropdownMenu open={filterOpen} onClose={() => setFilterOpen(false)}>
                <button
                  className={itemStyle}
                  style={{ color: !filterDeity ? "#3a3228" : "rgba(90,78,68,0.5)" }}
                  onClick={() => {
                    setFilterDeity("");
                    setFilterOpen(false);
                  }}
                >
                  All Deities
                </button>
                {deities.map((d) => (
                  <button
                    key={d}
                    className={itemStyle}
                    style={{ color: filterDeity === d ? "#3a3228" : "rgba(90,78,68,0.5)" }}
                    onClick={() => {
                      setFilterDeity(d);
                      setFilterOpen(false);
                    }}
                  >
                    {d}
                  </button>
                ))}
              </DropdownMenu>
            </div>

            {/* Sort button */}
            <div className="relative">
              <button
                onClick={() => {
                  setSortOpen(!sortOpen);
                  setFilterOpen(false);
                }}
                className={btnStyle}
                style={{
                  borderColor: sortBy ? "#3a3228" : "rgba(90,78,68,0.2)",
                  color: sortBy ? "#3a3228" : "rgba(90,78,68,0.5)",
                  backgroundColor: sortBy ? "rgba(90,78,68,0.05)" : "transparent",
                }}
              >
                Sort{sortBy ? `: ${sortBy}` : ""}
              </button>
              <DropdownMenu open={sortOpen} onClose={() => setSortOpen(false)}>
                <button
                  className={itemStyle}
                  style={{ color: !sortBy ? "#3a3228" : "rgba(90,78,68,0.5)" }}
                  onClick={() => {
                    setSortBy("");
                    setSortOpen(false);
                  }}
                >
                  Default
                </button>
                <button
                  className={itemStyle}
                  style={{ color: sortBy === "name" ? "#3a3228" : "rgba(90,78,68,0.5)" }}
                  onClick={() => {
                    setSortBy("name");
                    setSortOpen(false);
                  }}
                >
                  Name
                </button>
                <button
                  className={itemStyle}
                  style={{ color: sortBy === "shrine" ? "#3a3228" : "rgba(90,78,68,0.5)" }}
                  onClick={() => {
                    setSortBy("shrine");
                    setSortOpen(false);
                  }}
                >
                  Shrine
                </button>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative w-full" style={{ height: "2200px" }}>
        {repeated.map((p, i) => {
          const pos = canvasPositions[i % canvasPositions.length];
          const sizeIdx = sizeIndices[i];
          const size = itemSizes[sizeIdx];
          return (
            <div
              key={`${i}-${p.id}`}
              data-canvas-item
              className="absolute cursor-pointer group opacity-0"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}px`,
                width: `${size.w}px`,
              }}
              onClick={(e) => {
                const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                setSelectedParshad(p);
                setSourceRect(rect);
              }}
            >
              {/* Image container with hover effects */}
              <div
                className="w-full aspect-square"
                style={{ transform: `rotate(${rotations[i]}deg)` }}
              >
                <div
                  className="w-full h-full rounded-[4px] transition-all duration-500 ease-out group-hover:scale-[1.06] group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.12),0_4px_16px_rgba(0,0,0,0.06)] group-hover:rounded-[6px]"
                  style={{
                    backgroundImage: `url(${p.image})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.06),0 1px 6px rgba(0,0,0,0.03)",
                  }}
                />
              </div>

              {/* Text info — improved hierarchy */}
              <div
                data-canvas-info
                className={`${p.image.includes("milletkheer") ? "mt-2.5" : "mt-3.5"} opacity-0`}
                style={{ width: `${size.w}px` }}
              >
                {/* Shrine name — uppercase, spaced, subtle */}
                <p
                  className="font-sans text-[9px] uppercase tracking-[0.25em] leading-none"
                  style={{ color: "rgba(90,78,68,0.35)" }}
                >
                  {p.shrineName}
                </p>

                {/* Parshad name — serif, prominent */}
                <h3
                  className="font-heading text-[15px] font-semibold leading-[1.25] mt-1.5 tracking-[0.01em]"
                  style={{ color: "#3a3228" }}
                >
                  {p.name.length > 22
                    ? p.name.slice(0, 22) + "\u2026"
                    : p.name}
                </h3>

                {/* Tagline — italic, smaller */}
                <p
                  className="font-sans text-[11px] leading-[1.5] mt-1.5 italic"
                  style={{ color: "rgba(90,78,68,0.4)" }}
                >
                  {p.tagline.length > 35
                    ? p.tagline.slice(0, 35) + "\u2026"
                    : p.tagline}
                </p>

                {/* Decorative underline on hover */}
                <div
                  className="mt-2 h-px w-0 group-hover:w-10 transition-all duration-500 ease-out"
                  style={{
                    background: "linear-gradient(90deg, rgba(160,140,120,0.3), transparent)",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail overlay */}
      {selectedParshad && sourceRect && (
        <ParshadDetail
          parshad={selectedParshad}
          sourceRect={sourceRect}
          onClose={() => {
            setSelectedParshad(null);
            setSourceRect(null);
          }}
        />
      )}
    </div>
  );
}
