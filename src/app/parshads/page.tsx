"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useAnimation } from "framer-motion";
import { shrines } from "@/components/sections/sacred-map-data";
import { sikhShrines } from "@/components/sections/sikh-data";
import { Sparkles, Heart, ArrowLeft, Leaf, Sun, Gem, Star, Flower2, Eye } from "lucide-react";
import Link from "next/link";

type Faith = "all" | "hindu" | "sikh";

type ParshadOffer = {
  id: string;
  name: string;
  shrineName: string;
  shrineId: string;
  faith: Exclude<Faith, "all">;
  state: string;
  deity: string;
  shortDesc: string;
  tagline: string;
  legend: string;
  image: string;
  items: string[];
  giftingRecommendation: string;
  prayer: string;
  blessingPower: string;
  sacredConnection: string;
  morningPrayer: string;
};

function buildParshads(): ParshadOffer[] {
  const hindu: ParshadOffer[] = shrines.map((s) => ({
    id: s.id,
    name: s.giftingRecommendation.split(" — ")[0] || s.name + " Prasadam",
    shrineName: s.name,
    shrineId: s.id,
    faith: "hindu" as const,
    state: s.state,
    deity: s.deity,
    shortDesc: s.shortDesc,
    tagline: s.tagline,
    legend: s.legend,
    image: s.image,
    items: s.offerings,
    giftingRecommendation: s.giftingRecommendation,
    prayer: s.morningPrayer,
    blessingPower: s.blessingPower,
    sacredConnection: s.sacredConnection,
    morningPrayer: s.morningPrayer,
  }));

  const sikh: ParshadOffer[] = sikhShrines.map((s) => ({
    id: s.id,
    name: "Karah Parshad — " + s.name,
    shrineName: s.name,
    shrineId: s.id,
    faith: "sikh" as const,
    state: s.state,
    deity: s.guru,
    shortDesc: s.description,
    tagline: s.tagline,
    legend: s.history,
    image: s.image,
    items: s.offerings,
    giftingRecommendation: "The 'Waheguru Blessing' Box — Featuring Karah Parshad, Amrit Jal, and a blessed Rumala",
    prayer: "Waheguru Ji Ka Khalsa, Waheguru Ji Ki Fateh",
    blessingPower: "Grants inner peace, humility, and connection to the divine light. The sacred energy of the Golden Temple removes ego and fills the heart with selfless love.",
    sacredConnection: "Prasadam from Sri Harmandir Sahib carries the boundless grace of Waheguru — shared in the spirit of seva, equality, and divine love that knows no distinction.",
    morningPrayer: "Ik Onkar, Sat Nam, Karta Purakh, Nirbhau, Nirvair, Akal Murat, Ajuni, Saibhang, Gur Prasad.",
  }));

  return [...hindu, ...sikh];
}

const allParshads = buildParshads();

function FaithFilter({ current, onChange }: { current: Faith; onChange: (f: Faith) => void }) {
  return (
    <div className="inline-flex items-center gap-1 p-0.5 rounded-full bg-white/50 border border-stone-200/60 backdrop-blur-sm">
      {([{ label: "All", value: "all" as Faith }, { label: "Hindu", value: "hindu" as Faith }, { label: "Sikh", value: "sikh" as Faith }] as const).map((t) => (
        <button
          key={t.value}
          onClick={() => onChange(t.value)}
          className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.15em] font-medium transition-all duration-500 ${
            current === t.value ? "bg-white text-stone-800 shadow-sm" : "text-stone-400 hover:text-stone-600"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function ParshadCard({
  parshad,
  index,
  isActive,
  onClick,
}: {
  parshad: ParshadOffer;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const controls = useAnimation();

  const springX = useSpring(mouseX, { stiffness: 150, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 30 });

  const rotateX = useTransform(springY, [0, 1], [10, -10]);
  const rotateY = useTransform(springX, [0, 1], [-10, 10]);

  const glowX = useTransform(springX, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(springY, [0, 1], ["0%", "100%"]);

  const imageParallaxX = useTransform(springX, [0, 1], [-8, 8]);
  const imageParallaxY = useTransform(springY, [0, 1], [-8, 8]);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  return (
    <motion.div
      onClick={onClick}
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: isActive ? 1 : 0.8, y: 0 }}
      whileHover={{ opacity: 1 }}
      whileTap={{ scale: 0.97 }}
      transition={{
        duration: 0.45,
        delay: 0.03 + (index % 8) * 0.035,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative w-full text-left cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "800px" }}
      role="button"
      tabIndex={0}
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-xl"
      >
        <motion.div
          animate={{
            boxShadow: isActive
              ? "0 20px 60px rgba(217,119,6,0.15), 0 0 0 1px rgba(217,119,6,0.15)"
              : "0 1px 3px rgba(0,0,0,0.06)",
          }}
          whileHover={{
            boxShadow: "0 25px 80px rgba(217,119,6,0.12), 0 0 0 1px rgba(217,119,6,0.06)",
          }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          {/* Glow follow */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: useTransform(
                [glowX, glowY],
                ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(217,119,6,0.08) 0%, transparent 60%)`
              ),
            }}
          />

          {/* Image */}
          <div className="relative h-52 w-full overflow-hidden">
            <motion.div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${parshad.image})`,
                x: imageParallaxX,
                y: imageParallaxY,
              }}
              transition={{ duration: 0.4 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent" />

            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-amber-200/0 to-amber-200/10"
              whileHover={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />

            {/* Dharma badge */}
            <motion.div
              className="absolute top-2 left-2 z-10"
              style={{ transformStyle: "preserve-3d", translateZ: 20 }}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + (index % 8) * 0.04 }}
            >
              <span className={`text-[7px] uppercase tracking-[0.15em] font-semibold px-1.5 py-0.5 rounded-full ${
                parshad.faith === "hindu" ? "bg-amber-600/15 text-amber-700" : "bg-emerald-600/15 text-emerald-700"
              }`} style={{ backdropFilter: "blur(4px)" }}>
                {parshad.faith}
              </span>
            </motion.div>

            {/* Shine sweep */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.35) 42%, rgba(255,255,255,0.5) 45%, rgba(255,255,255,0.35) 48%, transparent 55%)",
                backgroundSize: "250% 100%",
                backgroundPosition: "100% 0%",
                x: useTransform(springX, [0, 1], ["-20%", "20%"]),
              }}
              whileHover={{ backgroundPosition: "0% 0%" }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            />

            {/* Active ring */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 rounded-t-xl pointer-events-none ring-1 ring-inset ring-amber-400/50"
                />
              )}
            </AnimatePresence>
          </div>

          {/* Body */}
          <motion.div
            animate={{ backgroundColor: isActive ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.6)" }}
            whileHover={{ backgroundColor: "rgba(255,255,255,0.95)" }}
            transition={{ duration: 0.3 }}
            className="p-4 space-y-1.5"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.h3
              style={{ transformStyle: "preserve-3d", translateZ: 12 }}
              className="text-[11px] font-semibold leading-tight text-stone-800 line-clamp-2"
            >
              {parshad.name.split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  whileHover={{ y: -1, color: "rgba(217,119,6,0.8)" }}
                  transition={{ duration: 0.15, delay: i * 0.02 }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h3>
            <motion.p
              style={{ transformStyle: "preserve-3d", translateZ: 8 }}
              className="text-[8px] font-medium text-stone-400 uppercase tracking-[0.05em]"
            >
              {parshad.shrineName}
            </motion.p>
            <motion.p
              style={{ transformStyle: "preserve-3d", translateZ: 4 }}
              className="text-[8px] text-stone-400/70 leading-relaxed line-clamp-3"
            >
              {parshad.tagline}
            </motion.p>
          </motion.div>

          {/* Bottom accent */}
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 500, damping: 40 }}
            className="h-0.5 w-full"
            style={{
              background: isActive
                ? "linear-gradient(90deg, rgba(217,119,6,0.5), rgba(217,119,6,0.2), rgba(217,119,6,0.5))"
                : "transparent",
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function OfferingDetail({ parshad }: { parshad: ParshadOffer }) {
  const isSikh = parshad.faith === "sikh";
  const accent = isSikh ? "emerald" : "amber";
  const related = useMemo(
    () => allParshads.filter((p) => p.id !== parshad.id && (p.faith === parshad.faith || p.shrineName === parshad.shrineName)).slice(0, 3),
    [parshad]
  );

  return (
    <motion.div
      key={parshad.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[320px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-[1.02]"
          style={{ backgroundImage: `url(${parshad.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-50 via-stone-50/40 to-transparent" />
        <div className={`absolute inset-0 bg-gradient-to-br from-${accent}-900/10 to-transparent`} />

        <div className="absolute top-5 left-5 z-10">
          <span className={`text-[9px] uppercase tracking-[0.3em] font-semibold px-2.5 py-1 rounded-full ${
            isSikh ? "bg-emerald-900/10 text-emerald-800" : "bg-amber-600/10 text-amber-700"
          }`} style={{ backdropFilter: "blur(8px)" }}>
            ✦ {parshad.faith} dharma ✦
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 p-8 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="text-[10px] uppercase tracking-[0.4em] font-medium text-stone-500 mb-2">
              From the temple of {parshad.shrineName}
            </p>
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-light text-stone-900 leading-tight max-w-2xl"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {parshad.name}
            </h1>
            <p className="text-sm font-serif italic text-stone-500 mt-2 max-w-xl">
              {parshad.tagline}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 md:px-12 py-10 space-y-12" style={{ paddingBottom: "200px" }}>

        {/* What Makes It Special */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-5 h-px bg-amber-400/50" />
            <span className="text-[9px] uppercase tracking-[0.4em] text-amber-600 font-semibold">What Makes It Special</span>
          </div>
          <p className="text-base md:text-lg font-serif text-stone-700 leading-relaxed">
            {parshad.sacredConnection}
          </p>
        </motion.section>

        {/* Sacred Significance */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-[9px] uppercase tracking-[0.4em] text-amber-600 font-semibold">Sacred Significance</span>
          </div>
          <div className="pl-5 border-l-2 border-amber-300/40">
            <p className="text-sm font-serif text-stone-600 leading-relaxed italic">
              &ldquo;{parshad.legend}&rdquo;
            </p>
          </div>
        </motion.section>

        {/* What Comes In This Offering */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <Flower2 className="w-4 h-4 text-amber-500" />
            <span className="text-[9px] uppercase tracking-[0.4em] text-amber-600 font-semibold">What Comes In This Offering</span>
          </div>
          <div className="grid gap-2.5">
            {parshad.items.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white/70 backdrop-blur-sm border border-stone-200/70 rounded-lg px-4 py-3"
              >
                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isSikh ? "bg-emerald-400" : "bg-amber-400"}`} />
                <span className="text-sm font-serif text-stone-600">{item}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Blessings & Ritual Meaning */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <Eye className="w-4 h-4 text-amber-500" />
            <span className="text-[9px] uppercase tracking-[0.4em] text-amber-600 font-semibold">Blessings &amp; Ritual Meaning</span>
          </div>
          <div className="relative overflow-hidden rounded-2xl p-6 md:p-8 bg-gradient-to-br from-amber-50/80 to-stone-50 border border-amber-200/30">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 bg-amber-300 pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <p className="text-sm font-serif text-stone-700 leading-relaxed italic">
                &ldquo;{parshad.blessingPower}&rdquo;
              </p>
            </div>
          </div>
          <div className="text-center pt-2">
            <p className="text-xs font-serif italic text-stone-400 leading-relaxed">
              {parshad.morningPrayer}
            </p>
          </div>
        </motion.section>

        {/* Related Offerings */}
        {related.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="space-y-4 pt-4 border-t border-stone-200/50"
          >
            <div className="flex items-center gap-3">
              <Star className="w-4 h-4 text-amber-500" />
              <span className="text-[9px] uppercase tracking-[0.4em] text-amber-600 font-semibold">Discover More Offerings</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {related.map((r) => (
                <div key={r.id} className="group cursor-pointer">
                  <div className="relative h-20 w-full rounded-lg overflow-hidden mb-2">
                    <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url(${r.image})` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />
                    <span className={`absolute top-1 left-1 text-[6px] uppercase tracking-[0.1em] font-semibold px-1 py-0.5 rounded ${
                      r.faith === "hindu" ? "bg-amber-600/10 text-amber-700" : "bg-emerald-600/10 text-emerald-700"
                    }`}>{r.faith}</span>
                  </div>
                  <h4 className="text-[9px] font-semibold text-stone-700 leading-tight line-clamp-1" style={{ fontFamily: "'Cinzel', serif" }}>
                    {r.name}
                  </h4>
                  <p className="text-[7px] text-stone-400 mt-0.5">{r.shrineName}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Subtle price */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center pt-2 pb-8"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-sm border border-stone-200/60">
            <Heart className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-medium">Offering — Free will contribution</span>
            <span className="text-xs font-semibold text-stone-700 font-serif ml-1">₹251</span>
          </div>
          <p className="text-[9px] text-stone-400/60 mt-2 italic">
            Your contribution supports the temple&apos;s langar and daily rituals
          </p>
        </motion.div>

      </div>
    </motion.div>
  );
}

function DefaultInfo() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center px-12 md:px-16 text-center py-20"
    >
      <div className="absolute top-0 right-0 w-[30rem] h-[30rem] rounded-full blur-[120px] opacity-[0.04] bg-amber-400 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[25rem] h-[25rem] rounded-full blur-[100px] opacity-[0.03] bg-stone-400 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="max-w-md space-y-10"
      >
        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-amber-50 to-stone-50 border border-amber-200/40 flex items-center justify-center">
          <Flower2 className="w-9 h-9 text-amber-500" />
        </div>

        <div className="space-y-3">
          <span className="text-[9px] uppercase tracking-[0.5em] text-amber-600 font-semibold">✦ Temple Prasadam ✦</span>
          <h2 className="text-2xl md:text-3xl font-light text-stone-900 leading-tight" style={{ fontFamily: "'Cinzel', serif" }}>
            Blessings from the <span className="italic">Heart</span> of the Temple
          </h2>
          <p className="text-sm font-serif text-stone-500 leading-relaxed max-w-sm mx-auto">
            Every offering is hand-prepared by temple families using recipes passed down through generations. Before it reaches you, it rests before the deity — carrying the warmth of a thousand prayers.
          </p>
        </div>

        <div className="grid gap-3">
          {[
            { icon: <Leaf className="w-4 h-4" />, title: "Pure & Nutritious", desc: "Prepared with organic grains, wild honey, pure ghee, and hand-selected dry fruits. No preservatives." },
            { icon: <Sun className="w-4 h-4" />, title: "Chakra-Balanced", desc: "Ingredients chosen for sattvic purity and natural alignment with the body's energy. Prepared with quiet intention." },
            { icon: <Gem className="w-4 h-4" />, title: "Blessed at the Temple", desc: "Each offering is placed before the deity during morning prayers, carrying the living energy of its origin." },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-lg p-3.5 text-left">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                <span className="text-amber-600">{item.icon}</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-stone-800">{item.title}</h4>
                <p className="text-xs font-serif text-stone-400 leading-relaxed mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs font-serif italic text-stone-400">
          Select an offering to discover its story and the temple it comes from.
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function ParshadsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [faith, setFaith] = useState<Faith>("all");

  const filtered = useMemo(
    () => (faith === "all" ? allParshads : allParshads.filter((p) => p.faith === faith)),
    [faith]
  );
  const selected = selectedId ? allParshads.find((p) => p.id === selectedId) ?? null : null;

  return (
    <main className="w-full flex font-sans bg-stone-50 selection:bg-amber-200/30" style={{ height: "100dvh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Cinzel:wght@400;500;600&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-cinzel { font-family: 'Cinzel', serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* LEFT PANEL */}
      <div style={{ width: "40%", flexShrink: 0, display: "flex", flexDirection: "column", height: "100%", borderRight: "1px solid rgba(120,110,100,0.12)", background: "linear-gradient(to bottom, rgba(250,247,242,0.9), rgba(255,248,230,0.2))" }}>
        {/* Header */}
        <div style={{ flexShrink: 0, padding: "24px 20px 12px", background: "linear-gradient(to bottom, rgba(250,247,242,0.95), rgba(250,247,242,0.6))" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(120,110,100,0.6)", marginBottom: "12px" }}>
            <Link href="/" className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.3em] text-stone-400 hover:text-stone-600 transition-colors">
              <ArrowLeft className="w-3 h-3" />
              Back
            </Link>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <div>
              <h1 style={{ fontSize: "18px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(70,63,58,1)", fontFamily: "'Cinzel', serif" }}>
                Parshads
              </h1>
              <p style={{ fontSize: "11px", fontFamily: "'Cormorant Garamond', serif", color: "rgba(120,110,100,0.6)", marginTop: "2px" }}>
                {filtered.length} offerings
              </p>
            </div>
          </div>
          <FaithFilter current={faith} onChange={setFaith} />
        </div>

        {/* Gallery */}
        <div data-lenis-prevent className="no-scrollbar" style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "0 12px" }}>
          <div className="pt-1 grid grid-cols-2 gap-3" style={{ paddingBottom: "400px" }}>
            {filtered.map((p, idx) => (
              <ParshadCard
                key={p.id}
                parshad={p}
                index={idx}
                isActive={selectedId === p.id}
                onClick={() => setSelectedId(p.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div data-lenis-prevent className="no-scrollbar" style={{ flex: 1, minHeight: 0, overflowY: "auto", background: "linear-gradient(to bottom, rgba(250,247,242,0.9), rgba(255,248,230,0.15))" }}>
        <AnimatePresence mode="wait">
          {selected ? (
            <OfferingDetail key={selected.id} parshad={selected} />
          ) : (
            <DefaultInfo key="default" />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
