"use client";

import {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Search, SlidersHorizontal, ArrowUpDown, Map, Radio } from "lucide-react";
import { useRouter } from "next/navigation";
import { sanataniShrines, type FaithShrine } from "@/components/sections/sanatani-data";

// ─── Floating light particles ────────────────────────────────────────────────
const PARTICLES = Array.from({ length: 45 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  size: 1 + Math.random() * 2.5,
  duration: 18 + Math.random() * 38,
  delay: Math.random() * 25,
  opacity: 0.2 + Math.random() * 0.45,
  color:
    Math.random() > 0.55
      ? "#FFD700"
      : Math.random() > 0.5
      ? "#FFFACD"
      : "#FFB347",
}));

// ─── Inline vertical shrine card ─────────────────────────────────────────────
function FaithCard({
  shrine,
  index,
  onClick,
}: {
  shrine: FaithShrine;
  index: number;
  onClick: () => void;
}) {
  if (!shrine) return null;
  const glow = shrine.cosmicGlow || shrine.accentColor || "#E8A020";

  const initDir = [
    { x: -30, y: -30 },
    { x: 30, y: -30 },
    { x: -30, y: 30 },
    { x: 30, y: 30 },
  ][index % 4];

  return (
    <motion.div
      initial={{ opacity: 0, x: initDir.x, y: initDir.y }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 1.1, delay: 0.5 + index * 0.18, ease: [0.25, 1, 0.5, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      onClick={onClick}
      className="group cursor-pointer relative"
      style={{ width: 190, height: 250, borderRadius: 12 }}
    >
      {/* Ambient glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-[12px] pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${glow}30, transparent 70%)`,
          filter: "blur(14px)",
          transform: "translateY(8px) scale(1.06)",
          opacity: 0,
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Card body */}
      <div
        className="relative w-full h-full overflow-hidden flex flex-col"
        style={{
          borderRadius: 12,
          background:
            "linear-gradient(180deg, rgba(10,6,28,0.82) 0%, rgba(4,2,14,0.96) 100%)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          border: "1.5px solid transparent",
          backgroundClip: "padding-box",
          boxShadow: `
            0 0 0 1.5px rgba(255,215,0,0.75),
            0 0 16px rgba(255,200,50,0.3),
            0 0 40px rgba(255,180,0,0.1),
            0 10px 30px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.08)
          `,
        }}
      >
        {/* Decorative ornate corners */}
        <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-yellow-500/40 rounded-tl-[2px] pointer-events-none z-10" />
        <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-yellow-500/40 rounded-tr-[2px] pointer-events-none z-10" />
        <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-yellow-500/40 rounded-bl-[2px] pointer-events-none z-10" />
        <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-yellow-500/40 rounded-br-[2px] pointer-events-none z-10" />

        {/* Temple image - Top 50% */}
        <div
          className="w-full h-[50%] relative overflow-hidden shrink-0"
          style={{ borderRadius: "12px 12px 0 0" }}
        >
          <motion.img
            src={shrine.image}
            alt={shrine.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.8 }}
            loading="lazy"
          />
          {/* vertical gradient fade */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 50%, rgba(4,2,14,0.96) 100%)",
            }}
          />
          {/* warm colour wash */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${glow}40, transparent 70%)`,
              mixBlendMode: "overlay",
            }}
          />
        </div>

        {/* Hover border glow */}
        <div
          className="absolute inset-0 rounded-[12px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
          style={{
            boxShadow: `inset 0 0 24px ${glow}18, 0 0 30px ${glow}12`,
          }}
        />

        {/* Text content - Bottom 50% */}
        <div
          className="w-full h-[50%] flex flex-col justify-center items-start text-left px-3 py-2 relative"
        >
          {/* Energy type badge */}
          <div className="flex items-center mb-0.5">
            <span
              className="uppercase tracking-[0.2em] font-medium"
              style={{ fontSize: "0.42rem", color: "#FFD700" }}
            >
              ✦ {shrine.energyType || "divine"} ✦
            </span>
          </div>

          {/* Name */}
          <h3
            style={{
              fontSize: "0.78rem",
              fontWeight: 500,
              lineHeight: 1.15,
              marginBottom: 2,
              fontFamily: "Georgia, 'Times New Roman', serif",
              background:
                "linear-gradient(135deg, #FFE8B0 0%, #FFC050 50%, #E8A030 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {shrine.name}
          </h3>

          {/* Location / State */}
          <p
            className="tracking-wide font-medium"
            style={{ fontSize: "0.52rem", color: "rgba(255,235,200,0.7)", marginBottom: 1 }}
          >
            {shrine.state}
          </p>

          {/* Deity */}
          <p
            className="font-serif leading-tight"
            style={{ fontSize: "0.48rem", color: "rgba(255,210,150,0.5)" }}
          >
            {shrine.deity.split("—")[0]?.trim() || shrine.deity}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FaithPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [filteredSearch, setFilteredSearch] = useState<FaithShrine[]>([]);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const mainRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 15, damping: 35 });
  const springY = useSpring(mouseY, { stiffness: 15, damping: 35 });
  const bgX = useTransform(springX, [-0.5, 0.5], ["-1.5%", "1.5%"]);
  const bgY = useTransform(springY, [-0.5, 0.5], ["-1.5%", "1.5%"]);

  useEffect(() => { setMounted(true); }, []);

  // First 4 featured shrines
  const displayShrines = useMemo(() => {
    const featured = sanataniShrines.filter((s) => s.featured);
    return featured.length >= 4 ? featured.slice(0, 4) : sanataniShrines.slice(0, 4);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!mainRef.current) return;
      const r = mainRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - r.left) / r.width - 0.5);
      mouseY.set((e.clientY - r.top) / r.height - 0.5);
    },
    [mouseX, mouseY]
  );

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
    if (!value.trim()) { setFilteredSearch([]); return; }
    const q = value.toLowerCase();
    setFilteredSearch(
      sanataniShrines.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.state.toLowerCase().includes(q) ||
          s.deity.toLowerCase().includes(q) ||
          s.location.toLowerCase().includes(q)
      )
    );
  }, []);

  const handleCardClick = useCallback(
    (shrine: FaithShrine) => router.push(`/sanatani?shrine=${shrine.id}`),
    [router]
  );

  return (
    <main
      ref={mainRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen overflow-y-auto select-none flex flex-col"
      style={{ background: "#0c0520" }}
    >
      {/* ── BACKGROUND IMAGE with subtle parallax ── */}
      <motion.div
        className="fixed inset-0 z-0"
        style={{
          x: bgX,
          y: bgY,
          width: "100%",
          height: "100%",
          top: "0%",
          left: "0%",
        }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "url('/images/bgimage.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </motion.div>

      {/* Tone overlay: darken top & bottom */}
      <div
        className="fixed inset-0 z-1 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,3,22,0.55) 0%, rgba(8,3,22,0.1) 30%, rgba(8,3,22,0.1) 68%, rgba(8,3,22,0.72) 100%)",
        }}
      />
      {/* Side vignette */}
      <div
        className="fixed inset-0 z-1 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(8,3,22,0.3) 0%, transparent 18%, transparent 82%, rgba(8,3,22,0.3) 100%)",
        }}
      />

      {/* ── FLOATING PARTICLES ── */}
      {mounted && (
        <div className="fixed inset-0 z-[2] pointer-events-none overflow-hidden">
          {PARTICLES.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: `${p.x}%`,
                width: p.size,
                height: p.size,
                background: p.color,
                boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
                animation: `particleRise ${p.duration}s linear infinite`,
                animationDelay: `-${p.delay}s`,
                "--max-op": p.opacity,
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}

      {/* ─────────────────────────── TOP NAVBAR ─────────────────────────── */}
      <div className="relative z-40 flex items-start justify-between px-7 pt-5 w-full">

        {/* LEFT: Search */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative"
        >
          <div
            className={`relative flex items-center transition-all duration-500 ${
              searchFocused ? "w-72" : "w-60"
            }`}
            onMouseEnter={() => setSearchFocused(true)}
            onMouseLeave={() => { if (!searchQuery) setSearchFocused(false); }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "rgba(8,4,22,0.55)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                border: "1px solid rgba(255,215,0,0.22)",
              }}
            />
            <div className="absolute left-3.5 flex items-center pointer-events-none z-10">
              <Search size={13} color="rgba(255,215,0,0.65)" />
            </div>
            <input
              type="text"
              placeholder="Search temples, deities, places..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => { if (!searchQuery) setSearchFocused(false); }}
              className="relative w-full h-9 pl-9 pr-4 bg-transparent outline-none font-light placeholder:text-white/35"
              style={{ fontSize: "0.7rem", color: "#FFD700", letterSpacing: "0.02em" }}
            />
          </div>

          <AnimatePresence>
            {searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="absolute top-12 left-0 w-80 rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  background: "rgba(8,4,22,0.92)",
                  backdropFilter: "blur(24px)",
                  border: "1px solid rgba(255,215,0,0.15)",
                }}
              >
                <div className="max-h-72 overflow-y-auto p-2">
                  {filteredSearch.length > 0 ? (
                    filteredSearch.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => handleCardClick(s)}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors"
                      >
                        <img
                          src={s.image}
                          alt={s.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <h4 style={{ fontSize: "0.72rem", color: "#FFD700", fontWeight: 500 }}>
                            {s.name}
                          </h4>
                          <p style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.5)" }}>
                            {s.location}, {s.state}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div
                      className="p-4 text-center"
                      style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)" }}
                    >
                      No shrines found
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* CENTER: Title block */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25 }}
          className="flex flex-col items-center"
          style={{ marginTop: -2 }}
        >
          <div
            style={{
              fontSize: "1.7rem",
              lineHeight: 1,
              marginBottom: 6,
              filter: "drop-shadow(0 0 12px rgba(255,215,0,0.85))",
            }}
          >
            🪷
          </div>

          <h1
            className="uppercase text-center tracking-[0.22em] font-light"
            style={{
              fontFamily: "'Cinzel', 'Playfair Display', 'Times New Roman', serif",
              fontSize: "clamp(1.5rem, 3.2vw, 2.3rem)",
              background: "linear-gradient(180deg, #FFF7D2 0%, #E8B94B 50%, #9C7214 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 2px 10px rgba(0,0,0,0.45)",
            }}
          >
            Sacred Sanatana
          </h1>

          <div className="flex flex-col items-center mt-1.5">
            <div className="flex items-center gap-4">
              <div
                className="h-[1.5px] w-14"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,215,0,0.65))",
                }}
              />
              <span
                style={{
                  fontSize: "0.58rem",
                  letterSpacing: "0.32em",
                  color: "rgba(255,235,185,0.8)",
                  fontFamily: "'Cinzel', Georgia, serif",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                Explore Sacred Shrines
              </span>
              <div
                className="h-[1.5px] w-14"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,215,0,0.65), transparent)",
                }}
              />
            </div>
            <div
              className="w-1.5 h-1.5 rotate-45 mt-2 bg-yellow-500/90 shadow-[0_0_6px_#FFD700]"
              style={{ filter: "drop-shadow(0 0 2px rgba(255,215,0,0.8))" }}
            />
          </div>
        </motion.div>

        {/* RIGHT: Filter / Sort / ॐ */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex items-center gap-2"
        >
          {(
            [
              { icon: <SlidersHorizontal size={11} />, label: "Filter" },
              { icon: <ArrowUpDown size={11} />, label: "Sort" },
            ] as const
          ).map((btn) => (
            <button
              key={btn.label}
              className="flex items-center gap-1.5 px-3 h-9 rounded-full
                         transition-all duration-300 hover:border-yellow-400/40 hover:bg-yellow-400/5"
              style={{
                background: "rgba(8,4,22,0.55)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                border: "1px solid rgba(255,215,0,0.22)",
                color: "rgba(255,235,185,0.8)",
                fontSize: "0.68rem",
                letterSpacing: "0.06em",
              }}
            >
              {btn.icon}
              <span>{btn.label}</span>
            </button>
          ))}

          <button
            className="flex items-center justify-center w-9 h-9 rounded-full
                       transition-all duration-300 hover:border-yellow-400/40 hover:bg-yellow-400/5"
            style={{
              background: "rgba(8,4,22,0.55)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              border: "1px solid rgba(255,215,0,0.22)",
              color: "#FFD700",
              fontSize: "1.15rem",
              fontFamily: "serif",
              textShadow: "0 0 8px rgba(255,215,0,0.6)",
            }}
          >
            ॐ
          </button>
        </motion.div>
      </div>

      {/* ─────────────────── 2×2 CARD GRID (CENTERED) ─────────────────── */}
      <div className="relative z-20 flex-grow flex items-center justify-center pt-0 pb-28 min-h-[580px] pointer-events-none">
        <div className="scale-[0.78] md:scale-[0.9] lg:scale-100 origin-center transition-transform duration-500 pointer-events-auto">
          <div className="relative flex flex-col items-center gap-16">
            {/* ── Golden glow behind cards ── */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: "50%",
                top: "50%",
                width: 0,
                height: 0,
                zIndex: 0,
                transform: "translate(-50%, -50%)",
              }}
            >
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: 560,
                  height: 560,
                  left: -280,
                  top: -280,
                  background:
                    "radial-gradient(circle, rgba(255,215,0,0.22) 0%, rgba(255,180,0,0.10) 35%, transparent 70%)",
                  filter: "blur(12px)",
                }}
                animate={{ opacity: [0.6, 1, 0.6], scale: [0.95, 1.08, 0.95] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* Top row */}
            <div className="flex flex-row gap-64 z-10">
              {displayShrines.slice(0, 2).map((shrine, index) => (
                <div
                  key={shrine.id}
                  style={{
                    animation: `cardFloat${index % 2} ${6.2 + index * 0.6}s ease-in-out ${index * 0.6}s infinite`,
                  }}
                >
                  <FaithCard
                    shrine={shrine}
                    index={index}
                    onClick={() => handleCardClick(shrine)}
                  />
                </div>
              ))}
            </div>

            {/* Bottom row */}
            <div className="flex flex-row gap-64 z-10">
              {displayShrines.slice(2, 4).map((shrine, index) => (
                <div
                  key={shrine.id}
                  style={{
                    animation: `cardFloat${index % 2} ${6.8 + index * 0.5}s ease-in-out ${1.2 + index * 0.6}s infinite`,
                  }}
                >
                  <FaithCard
                    shrine={shrine}
                    index={index + 2}
                    onClick={() => handleCardClick(shrine)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────── BOTTOM BAR ─────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.6 }}
        className="relative z-40 mt-auto w-full"
      >
        <div
          className="flex items-center justify-between px-8 py-4"
          style={{
            background: "rgba(8,4,22,0.45)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderTop: "1px solid rgba(255,215,0,0.12)",
          }}
        >
          <button
            className="flex items-center gap-2 px-4 h-9 rounded-full transition-all duration-300 hover:border-yellow-400/40 hover:bg-yellow-400/5 cursor-pointer"
            style={{
              background: "rgba(8,4,22,0.65)",
              border: "1px solid rgba(255,215,0,0.22)",
            }}
          >
            <Map size={13} color="rgba(255,215,0,0.7)" />
            <span
              style={{
                fontSize: "0.68rem",
                color: "rgba(255,235,185,0.85)",
                letterSpacing: "0.08em",
                fontFamily: "Georgia, serif",
              }}
            >
              Sacred Map View
            </span>
          </button>

          <div className="flex flex-col items-center justify-center gap-2.5">
            <div className="flex items-center justify-center gap-2">
              <svg width="12" height="18" viewBox="0 0 14 22" fill="none">
                <rect
                  x="1"
                  y="1"
                  width="12"
                  height="20"
                  rx="6"
                  stroke="rgba(255,215,0,0.5)"
                  strokeWidth="1"
                />
                <motion.rect
                  x="5.5"
                  y="5"
                  width="3"
                  height="5"
                  rx="1.5"
                  fill="rgba(255,215,0,0.85)"
                  animate={{ y: [5, 11, 5] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                />
              </svg>
              <span
                style={{
                  fontSize: "0.62rem",
                  color: "rgba(255,235,185,0.65)",
                  letterSpacing: "0.06em",
                }}
              >
                Scroll to explore infinite sacred realms
              </span>
            </div>

            <div className="flex items-center justify-center gap-4 w-[420px]">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-500/25 to-yellow-500/50" />
              <span
                style={{
                  fontSize: "0.58rem",
                  letterSpacing: "0.15em",
                  color: "rgba(255,215,0,0.75)",
                  fontFamily: "Georgia, serif",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                ✦ Every sanctuary holds a sacred story ✦
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-yellow-500/25 to-yellow-500/50" />
            </div>
          </div>

          <button
            className="flex items-center gap-2 px-4 h-9 rounded-full transition-all duration-300 hover:border-yellow-400/40 hover:bg-yellow-400/5 cursor-pointer"
            style={{
              background: "rgba(8,4,22,0.65)",
              border: "1px solid rgba(255,215,0,0.22)",
            }}
          >
            <div className="relative flex items-center justify-center w-4 h-4">
              <div
                className="absolute w-2 h-2 rounded-full bg-emerald-400"
                style={{ boxShadow: "0 0 8px rgba(52,211,153,0.9)" }}
              />
              <div
                className="absolute w-3.5 h-3.5 rounded-full border border-emerald-400/50"
                style={{ animation: "livePing 2s ease-out infinite" }}
              />
            </div>
            <span
              style={{
                fontSize: "0.68rem",
                color: "rgba(255,235,185,0.85)",
                letterSpacing: "0.08em",
                fontFamily: "Georgia, serif",
              }}
            >
              Live Darshan
            </span>
          </button>
        </div>
      </motion.div>
    </main>
  );
}