"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { shrines } from "@/components/sections/sacred-map-data";
import { Search, X, ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// ─── Stable particle data (no Math.random → no hydration mismatch) ───
const PARTICLES = [
  { left: "8%",  top: "18%", dur: 9,   delay: 0   },
  { left: "22%", top: "72%", dur: 11,  delay: 1.8 },
  { left: "38%", top: "28%", dur: 7.5, delay: 3.2 },
  { left: "54%", top: "55%", dur: 10,  delay: 0.6 },
  { left: "67%", top: "12%", dur: 8.5, delay: 2.4 },
  { left: "79%", top: "80%", dur: 9.5, delay: 4.1 },
  { left: "91%", top: "40%", dur: 7,   delay: 1.2 },
  { left: "15%", top: "90%", dur: 12,  delay: 2.9 },
  { left: "46%", top: "88%", dur: 8,   delay: 0.4 },
  { left: "85%", top: "25%", dur: 10.5,delay: 3.7 },
];

// ─── Occasions data ───────────────────────────────────────────────────
const occasions = [
  {
    id: "new-beginnings",
    title: "Blessings for New Beginnings",
    subtitle: "Wedding Gifts",
    desc: "Celebrate the sacred union of two souls. This bundle carries the timeless grace of Srisailam Mallikarjuna—where Shiva and Parvati reside together—along with pure vermillion, sacred thread, and ancient Vedic blessings.",
    offeringText: "Contains Srisailam sacred ladoo, authentic sindoor blessed at the shrine, a couple's holy red thread, and sandalwood paste.",
    icon: "🪷",
    bg: "from-[#200A18] to-[#120510]",
    accent: "#C4647A",
    border: "rgba(196,100,122,0.2)",
  },
  {
    id: "gratitude",
    title: "Gratitude Wrapped in Tradition",
    subtitle: "Corporate Gifting",
    desc: "Express respect and deep appreciation through gifts rooted in cultural reverence. Blessings carried directly from Kashi Vishwanath invoke clarity, wisdom, and auspicious growth.",
    offeringText: "Contains Varanasi Lal Peda, a brass holy Ganga Jal flask, and sanctum-touched Tulsi seeds with a copper coin.",
    icon: "🌿",
    bg: "from-[#081C12] to-[#040E09]",
    accent: "#7AB89A",
    border: "rgba(122,184,154,0.2)",
  },
  {
    id: "sacred-joy",
    title: "Sacred Joy for Every Celebration",
    subtitle: "Festive Hampers",
    desc: "Ignite the warmth of cultural ties during auspicious seasons. A curation blessed under the sacred flames of Somnath to invite lunar grace, joy, and positive celestial energy into the household.",
    offeringText: "Contains Somnath dry fruit ladoos, holy Bhasma vibhuti, a custom terracotta diya, and a blessed silver coin.",
    icon: "🪔",
    bg: "from-[#201008] to-[#110804]",
    accent: "#D97A1D",
    border: "rgba(217,122,29,0.25)",
  },
  {
    id: "welcome-home",
    title: "Welcome Blessings for the Sanctum Home",
    subtitle: "Housewarming",
    desc: "May their threshold be a boundary of absolute peace. The pure alpine energy of Kedarnath and holy Mandakini waters sanctify new homes and invite enduring prosperity.",
    offeringText: "Contains Himalayan raw honey, holy glacier water in a hand-blown vial, blessed pine incense cones, and a brass threshold yantra.",
    icon: "🏔️",
    bg: "from-[#08161E] to-[#040D14]",
    accent: "#6BA3BE",
    border: "rgba(107,163,190,0.2)",
  },
  {
    id: "custom-bonds",
    title: "Custom Bonds of Love & Devotion",
    subtitle: "Personalized Spiritual Gifts",
    desc: "A personalized gesture of eternal care. Carry the specific motherly protection of Mata Vaishno Devi directly to a beloved sister, daughter, or family elder in their hour of transition.",
    offeringText: "Contains Vaishno Devi cave spring water, a blessed red silk chunri touched to the holy Pindis, and makhana prasad.",
    icon: "✨",
    bg: "from-[#1C0A1A] to-[#0F050E]",
    accent: "#B87BBD",
    border: "rgba(184,123,189,0.2)",
  },
];

// ─── Behan story steps ────────────────────────────────────────────────
const behanSteps = [
  {
    image: "https://images.unsplash.com/photo-1667932181221-14893a54a6d8?q=80&w=1200&auto=format&fit=crop",
    quote: "\u201cThe mornings at the temple are silent. When I hold the copper vessel to receive the offering, I don\u2019t just see sweets\u2014I see the prayers of a mother who requested this blessing.\u201d",
    author: "Unati Behan Sarita",
    location: "Varanasi",
    narrative: "Our journey begins inside the ancient stone walls of India\u2019s holiest temples. There are no warehouses. Every piece of prasadam is hand-selected and blessed at the deity\u2019s feet under the sacred morning aarti.",
    step: "01",
  },
  {
    image: "https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?q=80&w=1200&auto=format&fit=crop",
    quote: "\u201cWe do not carry packages. We carry trust. When I pack the sacred vermillion, I drape my saree over my hands in prayer so that only pure devotion touches your gift.\u201d",
    author: "Unati Behan Meenakshi",
    location: "Srisailam",
    narrative: "The transition from sanctum to package is a silent ritual. Devoted local women travel to the shrines, receive the offerings with absolute intention, and carefully pack them in natural copper, silk, and leaf containers.",
    step: "02",
  },
  {
    image: "https://images.unsplash.com/photo-1616262569508-d0a93ed178c4?q=80&w=1200&auto=format&fit=crop",
    quote: "\u201cCrossing the threshold of a home with the sacred flame\u2019s thread is a moment of deep peace. I feel like a messenger of God.\u201d",
    author: "Unati Behan Rukmani",
    location: "Ujjain",
    narrative: "When the blessing arrives at your family celebrations, it is hand-delivered with devotion. It becomes the emotional anchor of new beginnings, weaving ancient heritage into modern memories.",
    step: "03",
  },
];

export default function JourneyPage() {
  const [searchQuery, setSearchQuery]     = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeOccasion, setActiveOccasion]   = useState<typeof occasions[0] | null>(null);
  const [isMounted, setIsMounted]         = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroY       = useTransform(scrollY, [0, 500], [0, 80]);

  useEffect(() => { setIsMounted(true); }, []);

  const filteredShrines = shrines.filter((s) => {
    const q = searchQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(q)      ||
      s.deity.toLowerCase().includes(q)     ||
      s.state.toLowerCase().includes(q)     ||
      s.shortDesc.toLowerCase().includes(q) ||
      s.type.toLowerCase().includes(q)
    );
  });

  return (
    <main className="min-h-screen bg-[#0D0A07] text-[#F6EFE3] overflow-x-hidden selection:bg-[#D97A1D]/30">

      {/* ── Global styles & font imports ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap');
        .cg { font-family: 'Cormorant Garamond', serif; }

        @keyframes float-glow {
          0%, 100% { transform: translateY(0)   scale(1);   opacity: 0.25; }
          50%       { transform: translateY(-18px) scale(1.3); opacity: 0.7;  }
        }
        @keyframes ring-spin  { to { transform: rotate(360deg);  } }
        @keyframes ring-spin-r{ to { transform: rotate(-360deg); } }
        @keyframes chevron-bob {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(6px); }
        }

        .particle    { animation: float-glow var(--dur, 9s) ease-in-out var(--delay, 0s) infinite; }
        .ring-a      { animation: ring-spin   60s linear infinite; }
        .ring-b      { animation: ring-spin-r 45s linear infinite; }
        .ring-c      { animation: ring-spin   30s linear infinite; }
        .chevron-bob { animation: chevron-bob 2.2s ease-in-out infinite; }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* Temple card tagline reveal */
        .card-tagline {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.6s cubic-bezier(0.22,1,0.36,1);
        }
        .group:hover .card-tagline { max-height: 80px; }
      `}} />

      <Navbar />

      {/* ════════════════════════════════════════════════════════
          HERO — The Sacred Threshold
      ════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Deep atmospheric gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1C1208_0%,#0D0A07_55%,#060403_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_65%,rgba(217,122,29,0.07)_0%,transparent_70%)]" />

        {/* Micro-grid texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23E5B93D' fill-opacity='1'%3E%3Cpath d='M0 0h1v1H0zm20 0h1v1h-1zm0 20h1v1h-1zM0 20h1v1H0z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Floating gold particles — client-only */}
        {isMounted && PARTICLES.map((p, i) => (
          <div
            key={i}
            className="particle absolute w-[3px] h-[3px] rounded-full bg-[#E5B93D] pointer-events-none"
            style={{
              left: p.left,
              top:  p.top,
              "--dur":   `${p.dur}s`,
              "--delay": `${p.delay}s`,
              boxShadow: "0 0 6px 1px rgba(229,185,61,0.5)",
            } as React.CSSProperties}
          />
        ))}

        {/* Mandala ring system */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
          <div className="ring-a w-[640px] h-[640px] rounded-full border border-[#E5B93D]/[0.06]" />
          <div className="ring-b absolute inset-[70px] rounded-full border border-[#D97A1D]/[0.09]" />
          <div className="ring-c absolute inset-[140px] rounded-full border border-[#E5B93D]/[0.06]" />
          <div className="absolute inset-[200px] rounded-full bg-[radial-gradient(circle,rgba(229,185,61,0.05)_0%,transparent_70%)]" />
          {/* 8-point star */}
          <div className="absolute inset-[310px] flex items-center justify-center">
            <span className="text-[#E5B93D]/20 text-4xl select-none">✦</span>
          </div>
        </div>

        {/* Hero content */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="flex items-center gap-5 mb-10"
          >
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#D97A1D]/50" />
            <span className="text-[9px] font-bold uppercase tracking-[0.65em] text-[#D97A1D]">
              The Sacred Journey
            </span>
            <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#D97A1D]/50" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="cg text-[clamp(3.5rem,10vw,7rem)] font-light text-[#F6EFE3] leading-[0.88] tracking-tight mb-8"
          >
            Find Your<br />
            <em className="not-italic italic text-[#D97A1D]">Sacred&nbsp;</em>
            <span className="text-[#E5B93D]">Temple</span>
          </motion.h1>

          {/* Sub copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.8 }}
            className="cg text-lg md:text-xl font-light italic text-[#F6EFE3]/45 leading-relaxed max-w-lg mb-14"
          >
            Search your beloved temple, deity, or spiritual destination — and bring
            home blessings personally hand-carried for your family.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="relative w-full max-w-lg mb-16"
          >
            <div
              className="flex items-center gap-4 rounded-2xl px-6 py-4 border transition-all duration-500"
              style={{
                background: isSearchFocused
                  ? "rgba(255,255,255,0.07)"
                  : "rgba(255,255,255,0.04)",
                borderColor: isSearchFocused
                  ? "rgba(229,185,61,0.45)"
                  : "rgba(255,255,255,0.09)",
                boxShadow: isSearchFocused
                  ? "0 0 40px rgba(229,185,61,0.08), 0 0 0 1px rgba(229,185,61,0.1)"
                  : "none",
              }}
            >
              <Search className="w-4 h-4 text-[#D97A1D] flex-shrink-0" />
              <input
                type="text"
                placeholder="Somnath, Kashi, Kedarnath…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="cg w-full bg-transparent border-none outline-none text-lg text-[#F6EFE3] placeholder-[#F6EFE3]/25 font-light"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-[#F6EFE3]/30 hover:text-[#F6EFE3]/60 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Search dropdown */}
            <AnimatePresence>
              {isSearchFocused && searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.25 }}
                  className="absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden border border-[#E5B93D]/12 shadow-[0_24px_64px_rgba(0,0,0,0.7)] z-50"
                  style={{ background: "#131008" }}
                >
                  <div className="p-3 space-y-1 max-h-72 overflow-y-auto no-scrollbar">
                    {filteredShrines.length > 0 ? (
                      filteredShrines.map((shrine) => (
                        <Link
                          key={shrine.id}
                          href={`/shrine/${shrine.id}`}
                          className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all group/item"
                        >
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                            <Image src={shrine.image} alt={shrine.name} fill className="object-cover" />
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-semibold text-[#F6EFE3] font-[family-name:var(--font-heading)]">
                              {shrine.name}
                            </p>
                            <p className="cg text-[11px] italic text-[#F6EFE3]/40">
                              {shrine.deity} · {shrine.state}
                            </p>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 ml-auto text-[#D97A1D] opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all duration-300" />
                        </Link>
                      ))
                    ) : (
                      <p className="cg text-center text-sm italic text-[#F6EFE3]/30 p-6">
                        No shrines found for this prayer.
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.6 }}
            className="flex flex-col items-center gap-3 text-[#F6EFE3]/25"
          >
            <span className="text-[9px] uppercase tracking-[0.55em]">Scroll to explore</span>
            <ChevronDown className="w-4 h-4 chevron-bob" />
          </motion.div>
        </motion.div>

        {/* Bottom fog */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0D0A07] to-transparent pointer-events-none" />
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 2 — Temples of Eternal Light (Discovery Grid)
      ════════════════════════════════════════════════════════ */}
      <section className="relative py-36">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_40%,rgba(30,77,61,0.07)_0%,transparent_70%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">

          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <span className="text-[9px] uppercase tracking-[0.65em] text-[#D97A1D] font-bold block mb-6">
              ✦ Sacred Destinations ✦
            </span>
            <h2 className="cg text-[clamp(2.5rem,5vw,4rem)] font-light text-[#F6EFE3] leading-tight mb-5">
              Temples of <em className="italic text-[#D97A1D]">Eternal Light</em>
            </h2>
            <p className="cg text-lg italic text-[#F6EFE3]/38 font-light max-w-sm mx-auto">
              Each temple holds a universe of devotion. Choose your sacred destination.
            </p>
          </motion.div>

          {/* Temple grid */}
          {filteredShrines.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredShrines.map((shrine, index) => (
                <motion.div
                  key={shrine.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.9, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link href={`/shrine/${shrine.id}`} className="block group">
                    <div className="relative h-[440px] rounded-3xl overflow-hidden border border-white/[0.06] bg-[#100C08] cursor-pointer">

                      {/* Image */}
                      <Image
                        src={shrine.image}
                        alt={shrine.name}
                        fill
                        className="object-cover opacity-60 transition-all duration-[3500ms] group-hover:opacity-80 group-hover:scale-110"
                      />

                      {/* Base gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/30 to-black/5" />

                      {/* Hover amber glow */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(ellipse_at_bottom,rgba(217,122,29,0.22)_0%,transparent_65%)]" />

                      {/* Top highlight on hover */}
                      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#E5B93D] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                      {/* Inner content */}
                      <div className="absolute inset-0 p-7 flex flex-col justify-end">
                        <span className="text-[8px] uppercase tracking-[0.5em] font-bold text-[#D97A1D] mb-3 block">
                          ✦{" "}
                          {shrine.type === "jyotirlinga"
                            ? "Jyotirlinga"
                            : shrine.type === "sacred-center"
                            ? "Sacred Center"
                            : "Shrine"}
                        </span>

                        <h3 className="font-[family-name:var(--font-heading)] text-xl text-[#F6EFE3] leading-tight mb-1">
                          {shrine.name}
                        </h3>

                        <p className="cg text-[13px] italic text-[#F6EFE3]/45 mb-4">
                          {shrine.deity}
                        </p>

                        {/* Tagline — CSS-height reveal, no JS randomness */}
                        <div className="card-tagline">
                          <p className="cg text-sm italic text-[#F6EFE3]/65 leading-relaxed mb-4">
                            &ldquo;{shrine.tagline}&rdquo;
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-widest text-[#F6EFE3]/25">
                            {shrine.state}
                          </span>
                          <div className="flex items-center gap-1.5 text-[#E5B93D] opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 transition-all duration-500">
                            <span className="text-[9px] uppercase tracking-[0.4em] font-bold">Visit</span>
                            <ArrowRight className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-28">
              <p className="cg text-2xl italic text-[#F6EFE3]/25">
                No shrines found for this prayer…
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 3 — The Journey of Unati Behan
      ════════════════════════════════════════════════════════ */}
      <section className="relative py-40 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[#070503]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_25%_50%,rgba(217,122,29,0.06)_0%,transparent_70%)]" />
        <div className="absolute top-0    left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D97A1D]/18 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D97A1D]/18 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-32"
          >
            <span className="text-[9px] uppercase tracking-[0.65em] text-[#D97A1D] font-bold block mb-6">
              ✦ The Human Soul ✦
            </span>
            <h2 className="cg text-[clamp(2.5rem,5vw,4rem)] font-light text-[#F6EFE3] leading-tight mb-6">
              The Journey of <em className="italic text-[#D97A1D]">Unati Behan</em>
            </h2>
            <p className="cg text-lg italic text-[#F6EFE3]/38 font-light max-w-xl mx-auto leading-relaxed">
              A network of devoted local women who stand in the sacred morning aarti — receiving divine blessings directly from the source to your family&apos;s threshold.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="space-y-44">
            {behanSteps.map((step, i) => (
              <div
                key={i}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center`}
              >
                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  className={i % 2 === 1 ? "lg:order-2" : ""}
                >
                  <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-white/[0.06]">
                    <Image src={step.image} alt={step.author} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#070503]/70 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(229,185,61,0.13)_0%,transparent_60%)]" />
                    {/* Step number watermark */}
                    <div className="absolute top-6 left-7">
                      <span className="font-[family-name:var(--font-heading)] text-[11px] tracking-[0.6em] text-[#E5B93D]/50">
                        {step.step}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Text */}
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className={`space-y-9 ${i % 2 === 1 ? "lg:order-1" : ""}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-px bg-[#D97A1D]/45" />
                    <span className="text-[9px] uppercase tracking-[0.5em] text-[#D97A1D] font-bold">
                      Ritual {step.step}
                    </span>
                  </div>

                  <p className="cg text-xl md:text-2xl font-light text-[#F6EFE3]/60 leading-relaxed">
                    {step.narrative}
                  </p>

                  {/* Quote block */}
                  <div className="relative rounded-3xl p-8 border border-[#D97A1D]/12 bg-white/[0.018]">
                    {/* Decorative opening quote */}
                    <div className="absolute -top-5 left-8 cg text-[64px] text-[#D97A1D]/18 leading-none select-none">
                      &ldquo;
                    </div>
                    <p className="cg text-xl md:text-[1.35rem] italic text-[#F6EFE3]/75 leading-relaxed pt-3">
                      {step.quote}
                    </p>
                    <div className="mt-7 flex items-center gap-3">
                      <span className="w-8 h-px bg-[#D97A1D]/35" />
                      <div>
                        <span className="text-[10px] uppercase tracking-widest font-bold text-[#D97A1D]/75 block">
                          {step.author}
                        </span>
                        <span className="text-[9px] uppercase tracking-widest text-[#F6EFE3]/28">
                          {step.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 4 — Moments Where Blessings Are Shared
      ════════════════════════════════════════════════════════ */}
      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0 bg-[#0D0A07]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_55%,rgba(229,185,61,0.04)_0%,transparent_70%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <span className="text-[9px] uppercase tracking-[0.65em] text-[#D97A1D] font-bold block mb-6">
              ✦ Share Grace ✦
            </span>
            <h2 className="cg text-[clamp(2.5rem,5vw,4rem)] font-light text-[#F6EFE3] leading-tight mb-6">
              Moments Where<br />
              <em className="italic text-[#D97A1D]">Blessings Are Shared</em>
            </h2>
            <p className="cg text-lg italic text-[#F6EFE3]/38 font-light max-w-md mx-auto">
              Frame your gestures not as gifts, but as sacred ceremonies.
            </p>
          </motion.div>

          {/* Occasions grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {occasions.map((occ, index) => (
              <motion.button
                key={occ.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, delay: index * 0.09 }}
                whileHover={{ y: -7, transition: { duration: 0.5, ease: [0.22,1,0.36,1] } }}
                onClick={() => setActiveOccasion(occ)}
                className={`relative text-left rounded-3xl overflow-hidden border p-8 h-[300px] flex flex-col justify-between cursor-pointer bg-gradient-to-br ${occ.bg} group`}
                style={{ borderColor: occ.border }}
              >
                {/* Hover radial glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 50% 110%, ${occ.accent}20 0%, transparent 65%)`,
                  }}
                />
                {/* Top bar highlight */}
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(to right, transparent, ${occ.accent}80, transparent)`,
                  }}
                />

                <div>
                  <span className="text-3xl mb-5 block">{occ.icon}</span>
                  <span
                    className="text-[8px] uppercase tracking-[0.45em] font-bold block mb-3"
                    style={{ color: occ.accent }}
                  >
                    {occ.subtitle}
                  </span>
                  <h3 className="cg text-xl font-light text-[#F6EFE3] leading-snug mb-3">
                    {occ.title}
                  </h3>
                  <p className="cg text-sm italic text-[#F6EFE3]/42 leading-relaxed line-clamp-2">
                    {occ.desc}
                  </p>
                </div>

                <div
                  className="flex items-center gap-2 translate-x-1 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-400"
                  style={{ color: occ.accent }}
                >
                  <span className="text-[9px] uppercase tracking-[0.4em] font-bold">
                    Invoke Blessing
                  </span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          PILGRIM QUOTE BANNER
      ════════════════════════════════════════════════════════ */}
      <section className="relative py-44 overflow-hidden">
        <div className="absolute inset-0 bg-[#070503]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(217,122,29,0.07)_0%,transparent_70%)]" />
        <div className="absolute top-0    left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D97A1D]/18 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D97A1D]/18 to-transparent" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="cg text-[6rem] text-[#D97A1D]/12 leading-none select-none mb-2">
              &ldquo;
            </div>
            <p className="cg text-[clamp(1.6rem,3.5vw,2.4rem)] italic font-light text-[#F6EFE3]/70 leading-relaxed mb-10">
              Standing at the edge of the infinite sea, watching the temple spire glow
              at sunset, I realized that some lights can never be extinguished.
            </p>
            <div className="flex items-center justify-center gap-5">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#D97A1D]/35" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-[#D97A1D]">
                Pilgrim Aditi · Somnath
              </span>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#D97A1D]/35" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          OCCASION DETAIL MODAL
      ════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {activeOccasion && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={() => setActiveOccasion(null)}
              className="fixed inset-0 bg-black/82 backdrop-blur-[6px] z-50"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-4 max-w-lg mx-auto top-1/2 -translate-y-1/2 rounded-3xl overflow-hidden border border-white/10 shadow-[0_32px_100px_rgba(0,0,0,0.85)] z-50"
              style={{ background: "#110E09" }}
            >
              {/* Saffron top line */}
              <div className="h-[2px] w-full bg-gradient-to-r from-[#D97A1D] via-[#E5B93D] to-[#D97A1D]" />

              <div className="p-8 md:p-10 relative">
                {/* Close */}
                <button
                  onClick={() => setActiveOccasion(null)}
                  className="absolute top-7 right-7 p-2 rounded-full border border-white/10 hover:bg-white/5 text-[#F6EFE3]/35 hover:text-[#F6EFE3]/65 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>

                <span className="text-3xl block mb-5">{activeOccasion.icon}</span>
                <span
                  className="text-[9px] uppercase tracking-[0.45em] font-bold block mb-2"
                  style={{ color: activeOccasion.accent }}
                >
                  {activeOccasion.subtitle}
                </span>
                <h3 className="cg text-2xl md:text-3xl font-light text-[#F6EFE3] leading-tight mb-6">
                  {activeOccasion.title}
                </h3>

                <p className="cg text-base font-light italic text-[#F6EFE3]/55 leading-relaxed mb-7">
                  {activeOccasion.desc}
                </p>

                {/* Sacred components box */}
                <div
                  className="p-5 rounded-2xl border mb-8"
                  style={{
                    borderColor: `${activeOccasion.accent}28`,
                    background: `${activeOccasion.accent}0C`,
                  }}
                >
                  <h4 className="text-[9px] uppercase tracking-[0.45em] font-bold text-[#F6EFE3]/40 mb-2">
                    Sacred Components
                  </h4>
                  <p className="cg text-sm italic text-[#F6EFE3]/65 leading-relaxed">
                    {activeOccasion.offeringText}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    className="flex-1 py-4 rounded-xl font-bold tracking-[0.35em] uppercase text-[10px] transition-all duration-300 hover:brightness-110"
                    style={{ background: activeOccasion.accent, color: "#0D0A07" }}
                  >
                    Invite this Blessing
                  </button>
                  <button
                    onClick={() => setActiveOccasion(null)}
                    className="flex-1 py-4 border border-white/10 text-[#F6EFE3]/45 rounded-xl font-bold tracking-[0.35em] uppercase text-[10px] hover:bg-white/5 transition-colors duration-300"
                  >
                    Explore Others
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
