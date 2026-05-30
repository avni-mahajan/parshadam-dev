"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Lock, Sparkles, ChevronRight } from "lucide-react";
import {
  sikhiShrines,
  comingSoonSikhiShrines,
  type SikhiShrine,
} from "@/components/sections/sikhi-data";

/* ─────────────────────────────────────────────────────────────────────────── */
/* Gurbani watermark background                                                */
/* ─────────────────────────────────────────────────────────────────────────── */

const GURBANI_WORDS = [
  "ੴ", "ਵਾਹਿਗੁਰੂ", "ਸਤਿ ਨਾਮੁ", "ਅਕਾਲ ਪੁਰਖ",
  "ਨਿਰਭਉ", "ਨਿਰਵੈਰੁ", "ਅਕਾਲ ਮੂਰਤਿ", "ਗੁਰ ਪ੍ਰਸਾਦਿ",
  "ਨਾਨਕ", "ਖ਼ਾਲਸਾ", "ਅਰਦਾਸ", "ਚੜਦੀ ਕਲਾ", "ਸਿੱਖੀ",
  "ਅੰਮ੍ਰਿਤ", "ਸੇਵਾ", "ਸਿਮਰਨ", "ਸੱਚ", "ਸ੍ਰੀ",
];

function SikhiBackground() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none select-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <div
        style={{
          position: "absolute",
          inset: "-30%",
          display: "grid",
          gridTemplateColumns: "repeat(9, 1fr)",
          gap: "1rem 2.5rem",
          transform: "rotate(-8deg)",
          opacity: 0.06,
        }}
      >
        {Array.from({ length: 160 }).map((_, i) => (
          <span
            key={i}
            style={{
              fontFamily: "serif",
              fontSize: i % 8 === 0 ? "3rem" : i % 4 === 0 ? "1.9rem" : "1.1rem",
              color: i % 6 === 0 ? "#D4AF37" : "#4169E1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              whiteSpace: "nowrap",
              letterSpacing: "0.06em",
            }}
          >
            {GURBANI_WORDS[i % GURBANI_WORDS.length]}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Floating light particles                                                    */
/* ─────────────────────────────────────────────────────────────────────────── */
function GoldenParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {Array.from({ length: 22 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: i % 3 === 0 ? 5 : 2,
            height: i % 3 === 0 ? 5 : 2,
            background: i % 2 === 0 ? "#D4AF37" : "#4169E1",
            left: `${(i * 41 + 8) % 100}%`,
            top: `${(i * 61 + 15) % 100}%`,
            opacity: 0.55,
            boxShadow: i % 3 === 0 ? "0 0 8px rgba(212,175,55,0.4)" : "none",
          }}
          animate={{
            y: [0, -28, 0],
            opacity: [0.2, 0.55, 0.2],
          }}
          transition={{
            duration: 3.5 + (i % 4),
            repeat: Infinity,
            delay: i * 0.35,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Shrine Detail Overlay                                                       */
/* ─────────────────────────────────────────────────────────────────────────── */
interface OverlayProps {
  shrine: SikhiShrine;
  origin: { x: number; y: number };
  onClose: () => void;
}

function GoldenTempleOverlay({ shrine, origin, onClose }: OverlayProps) {
  const [orderDone, setOrderDone] = useState(false);

  return (
    <motion.div
      key={shrine.id}
      initial={{ clipPath: `circle(0px at ${origin.x}px ${origin.y}px)` }}
      animate={{ clipPath: `circle(200vmax at ${origin.x}px ${origin.y}px)` }}
      exit={{ clipPath: `circle(0px at ${origin.x}px ${origin.y}px)` }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 overflow-y-auto"
      style={{ background: "#F3F7FA", zIndex: 9999 }}
    >
      {/* Hero image */}
      <div className="relative h-[70vh] w-full overflow-hidden flex-shrink-0">
        <Image
          src={shrine.image}
          alt={shrine.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F3F7FA] via-[#F3F7FA]/40 to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center bottom, rgba(65,105,225,0.12) 0%, transparent 65%)",
          }}
        />

        {/* Back */}
        <motion.button
          onClick={onClose}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute top-8 left-8 flex items-center gap-3"
          style={{ zIndex: 10 }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              border: "1px solid rgba(65,105,225,0.25)",
              background: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(12px)",
            }}
          >
            <ArrowLeft className="w-4 h-4" style={{ color: "#4169E1" }} />
          </div>
          <span className="text-[9px] uppercase tracking-[0.45em] font-bold" style={{ color: "#334155" }}>
            Back to Gurdwaras
          </span>
        </motion.button>

        {/* Shrine name */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 left-0 right-0 px-10 pb-14"
          style={{ zIndex: 10 }}
        >
          <p
            className="text-[10px] uppercase tracking-[0.5em] font-bold mb-3"
            style={{ color: "#4169E1" }}
          >
            ✦ Sri Harmandir Sahib
          </p>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              color: "#0E1E38",
              lineHeight: 1.1,
              textShadow: "0 2px 8px rgba(255,255,255,0.8)",
            }}
          >
            {shrine.name}
          </h1>
          <p
            className="mt-2 text-sm italic"
            style={{ color: "#334155", fontFamily: "serif" }}
          >
            {shrine.location}, {shrine.state}
          </p>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-8 py-16 space-y-16">

        {/* Gurbani (Sacred white marble plaque styling with double gold border) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center space-y-6 relative"
          style={{
            padding: "3.5rem 2.5rem",
            borderRadius: "0.75rem",
            background: "#FFFFFF",
            border: "3px double #D4AF37",
            boxShadow: "0 10px 30px rgba(65,105,225,0.05), 0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <div className="flex items-center justify-center gap-4 mb-2">
            <div style={{ height: 1, width: 40, background: "rgba(212,175,55,0.4)" }} />
            <span className="text-[9px] uppercase tracking-[0.6em] font-bold" style={{ color: "#D4AF37" }}>
              Mool Mantar — Guru Granth Sahib Ji
            </span>
            <div style={{ height: 1, width: 40, background: "rgba(212,175,55,0.4)" }} />
          </div>
          <p
            className="text-2xl md:text-3xl leading-relaxed"
            style={{
              fontFamily: "serif",
              color: "#0E1E38",
              letterSpacing: "0.04em",
              lineHeight: 1.7,
            }}
          >
            {shrine.gurbani}
          </p>
          <p
            className="text-sm italic leading-relaxed max-w-2xl mx-auto"
            style={{ color: "#334155", fontFamily: "serif" }}
          >
            {shrine.gurbaniMeaning}
          </p>
        </motion.div>

        {/* Two-column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <p
                className="text-2xl italic leading-relaxed font-light"
                style={{ fontFamily: "serif", color: "#0E1E38" }}
              >
                &ldquo;{shrine.tagline}&rdquo;
              </p>
            </div>
            <p
              className="leading-loose text-sm font-light"
              style={{ fontFamily: "serif", color: "#334155", letterSpacing: "0.02em" }}
            >
              {shrine.description}
            </p>

            <div
              className="p-7 space-y-4"
              style={{
                borderRadius: "1.2rem",
                background: "#FFFFFF",
                border: "1px solid rgba(65,105,225,0.18)",
              }}
            >
              <h3
                className="text-xs uppercase tracking-widest font-bold mb-2"
                style={{ color: "#4169E1" }}
              >
                History of the Sacred Sarovar
              </h3>
              <p
                className="leading-loose text-sm font-light"
                style={{ fontFamily: "serif", color: "#334155", letterSpacing: "0.015em" }}
              >
                {shrine.history}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.75, duration: 0.8 }}
            className="space-y-6"
          >
            {/* Langar note */}
            <div
              className="p-7 space-y-4"
              style={{
                borderRadius: "1.5rem",
                background: "#FFFFFF",
                border: "1px solid rgba(212,175,55,0.2)",
              }}
            >
              <h3
                className="text-xs uppercase tracking-widest font-bold"
                style={{ color: "#D4AF37" }}
              >
                ✦ Langar — The World's Largest Free Kitchen
              </h3>
              <p
                className="leading-loose text-sm font-light"
                style={{ fontFamily: "serif", color: "#334155" }}
              >
                {shrine.langarNote}
              </p>
            </div>

            {/* What we send */}
            <div
              className="p-7 space-y-4"
              style={{
                borderRadius: "1.5rem",
                background: "#FFFFFF",
                border: "1px solid rgba(212,175,55,0.18)",
              }}
            >
              <h3
                className="text-xs uppercase tracking-widest font-bold mb-3"
                style={{ color: "#D4AF37" }}
              >
                Sacred Karah Parshad Offering
              </h3>
              {[
                "Rich, handmade Karah Parshad — equal parts atta, ghee, and sugar — prepared in the Gurdwara kitchen",
                "Amrit Jal from the Sarovar, collected in a copper container",
                "A piece of sacred white rumala cloth touched to the Guru Granth Sahib",
                "Steel kada blessed in the Gurdwara sanctum",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span style={{ color: "#D4AF37", fontSize: "0.75rem", flexShrink: 0, marginTop: 3 }}>ੴ</span>
                  <p
                    className="text-xs font-light leading-relaxed"
                    style={{ fontFamily: "serif", color: "#334155" }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => {
                setOrderDone(true);
                setTimeout(() => setOrderDone(false), 3000);
              }}
              className="w-full py-5 text-center font-bold tracking-[0.3em] uppercase text-[10px] relative overflow-hidden"
              style={{
                borderRadius: "1rem",
                background: orderDone
                  ? "linear-gradient(135deg, #1B5E20, #2E7D32)"
                  : "linear-gradient(135deg, #D4AF37, #FFD700, #D4AF37)",
                color: orderDone ? "#fff" : "#0E1E38",
                boxShadow: "0 15px 35px rgba(212,175,55,0.2)",
                border: "none",
                transition: "all 0.5s ease",
              }}
            >
              {orderDone ? "✦ Waheguru — Received" : "Invite this Blessing Home"}
            </button>

            <p
              className="text-center text-[8px] uppercase tracking-[0.4em]"
              style={{ color: "rgba(14,30,56,0.5)", fontFamily: "serif" }}
            >
              Personally carried by Unati Behan with reverence
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Main Sikhi Page                                                             */
/* ─────────────────────────────────────────────────────────────────────────── */
export default function SikhiPage() {
  const [selectedShrine, setSelectedShrine] = useState<SikhiShrine | null>(null);
  const [clickOrigin, setClickOrigin] = useState({ x: 0, y: 0 });

  const shrine = sikhiShrines[0];

  const handleSelect = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setClickOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    setSelectedShrine(shrine);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Gurmukhi:wght@300;400;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Cinzel:wght@400;500;600&display=swap');
      `}</style>

      <main
        className="min-h-screen relative"
        style={{ background: "#F3F7FA", color: "#0E1E38" }}
      >
        <SikhiBackground />
        <GoldenParticles />

        <div className="relative" style={{ zIndex: 2 }}>

          {/* Top nav */}
          <div
            className="fixed top-0 left-0 right-0 flex items-center justify-between px-8 py-5"
            style={{
              zIndex: 100,
              background: "linear-gradient(to bottom, rgba(243,247,250,0.92), transparent)",
              backdropFilter: "blur(8px)",
            }}
          >
            <Link href="/" className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{
                  border: "1px solid rgba(65,105,225,0.25)",
                  background: "rgba(255,255,255,0.7)",
                }}
              >
                <ArrowLeft className="w-4 h-4" style={{ color: "#4169E1" }} />
              </div>
              <span
                className="text-[9px] uppercase tracking-[0.45em] font-bold"
                style={{ color: "#334155" }}
              >
                Return Home
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <span style={{ color: "#D4AF37", fontSize: "1.1rem" }}>ੴ</span>
              <span
                className="text-[9px] uppercase tracking-[0.5em] font-bold"
                style={{ color: "#334155" }}
              >
                Sikhi
              </span>
            </div>
          </div>

          {/* Hero */}
          <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">

            {/* Khanda Symbol */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative mb-10"
            >
              {[1, 2, 3].map((ring) => (
                <motion.div
                  key={ring}
                  className="absolute rounded-full border"
                  style={{
                    inset: `-${ring * 20}px`,
                    borderColor: `rgba(65,105,225,${0.15 - ring * 0.04})`,
                  }}
                  animate={{ rotate: ring % 2 === 0 ? 360 : -360 }}
                  transition={{
                    duration: 30 + ring * 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}
              <span
                style={{
                  fontSize: "5.5rem",
                  color: "#4169E1",
                  textShadow: "0 0 30px rgba(65,105,225,0.2), 0 0 60px rgba(212,175,55,0.15)",
                  display: "block",
                  lineHeight: 1,
                }}
              >
                ੴ
              </span>
            </motion.div>

            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex items-center gap-4 mb-6"
            >
              <div style={{ width: 40, height: 1, background: "rgba(65,105,225,0.3)" }} />
              <span
                className="text-[9px] uppercase tracking-[0.6em] font-bold"
                style={{ color: "#0E1E38" }}
              >
                Explore Sacred Gurdwaras
              </span>
              <div style={{ width: 40, height: 1, background: "rgba(65,105,225,0.3)" }} />
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(3rem, 8vw, 7rem)",
                fontWeight: 500,
                lineHeight: 1.05,
                color: "#0E1E38",
                marginBottom: "1rem",
              }}
            >
              Sikh{" "}
              <span
                style={{
                  fontStyle: "italic",
                  fontWeight: 300,
                  background: "linear-gradient(135deg, #FFB900 0%, #E67E22 40%, #1A5276 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Dharma
              </span>
            </motion.h1>

            {/* Gurbani subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.8 }}
              style={{
                fontSize: "1.5rem",
                color: "#D4AF37",
                fontFamily: "serif",
                marginBottom: "0.5rem",
                letterSpacing: "0.1em",
              }}
            >
              ਵਾਹਿਗੁਰੂ
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              style={{
                fontFamily: "serif",
                fontSize: "0.9rem",
                color: "#334155",
                maxWidth: 480,
                lineHeight: 1.8,
                fontStyle: "italic",
              }}
            >
              The Waheguru is one — the eternal truth beyond all form. Enter with devotion.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-8"
              style={{ color: "rgba(65,105,225,0.6)" }}
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="text-xs tracking-[0.4em] uppercase font-bold"
              >
                ↓ &nbsp; Choose Your Gurdwara
              </motion.div>
            </motion.div>
          </section>

          {/* Divider */}
          <div className="max-w-6xl mx-auto px-8 mb-16">
            <div
              style={{
                height: 1,
                background: "linear-gradient(to right, transparent, rgba(218,165,32,0.2), rgba(65,105,225,0.2), transparent)",
              }}
            />
          </div>

          {/* Golden Temple — Grand Card */}
          <section className="max-w-6xl mx-auto px-8 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <button
                onClick={handleSelect}
                className="w-full text-left group relative overflow-hidden"
                style={{
                  borderRadius: "2rem",
                  border: "1px solid rgba(65,105,225,0.15)",
                  boxShadow: "0 20px 50px rgba(65,105,225,0.06), 0 0 0 1px rgba(65,105,225,0.05)",
                  background: "#FFFFFF",
                  transition: "all 0.6s ease",
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-5">
                  {/* Image — 3 cols */}
                  <div
                    className="lg:col-span-3 relative overflow-hidden"
                    style={{ aspectRatio: "16/10", borderRadius: "1.9rem 0 0 1.9rem" }}
                  >
                    <Image
                      src={shrine.image}
                      alt={shrine.name}
                      fill
                      className="object-cover"
                      style={{ transition: "transform 1.2s ease" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/60" />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "radial-gradient(ellipse at center, rgba(255,215,0,0.08) 0%, transparent 70%)",
                      }}
                    />
                    {/* Reflection shimmer */}
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(135deg, rgba(255,215,0,0.05) 0%, transparent 50%)",
                      }}
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>

                  {/* Content — 2 cols */}
                  <div
                    className="lg:col-span-2 flex flex-col justify-center p-10 space-y-7"
                    style={{ borderRadius: "0 1.9rem 1.9rem 0" }}
                  >
                    {/* Tag */}
                    <div>
                      <span
                        className="text-[9px] uppercase tracking-[0.5em] font-bold px-3 py-1.5 rounded-full"
                        style={{
                          background: "rgba(65,105,225,0.05)",
                          border: "1px solid rgba(65,105,225,0.2)",
                          color: "#4169E1",
                        }}
                      >
                        Amritsar, Punjab
                      </span>
                    </div>

                    <div>
                      <p
                        className="text-[9px] uppercase tracking-[0.5em] font-bold mb-3"
                        style={{ color: "#4169E1" }}
                      >
                        ✦ The Golden Temple
                      </p>
                      <h2
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontSize: "2.2rem",
                          fontWeight: 500,
                          color: "#0E1E38",
                          lineHeight: 1.15,
                          marginBottom: "0.75rem",
                        }}
                      >
                        Harmandir Sahib
                      </h2>
                      <p
                        className="text-sm italic font-light leading-relaxed"
                        style={{ fontFamily: "serif", color: "#334155" }}
                      >
                        {shrine.tagline}
                      </p>
                    </div>

                    <div
                      style={{
                        height: 1,
                        background: "linear-gradient(to right, rgba(65,105,225,0.2), transparent)",
                        width: "70%",
                      }}
                    />

                    {/* Gurbani snippet */}
                    <p
                      className="text-xl leading-relaxed"
                      style={{
                        fontFamily: "serif",
                        color: "#D4AF37",
                        letterSpacing: "0.05em",
                      }}
                    >
                      ੴ ਸਤਿ ਨਾਮੁ
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-3">
                      <div
                        className="flex-1 py-4 text-center text-[9px] uppercase tracking-[0.4em] font-bold"
                        style={{
                          borderRadius: "0.75rem",
                          background: "linear-gradient(135deg, #D4AF37, #FFD700)",
                          color: "#0E1E38",
                        }}
                      >
                        Enter the Shrine
                      </div>
                      <div
                        className="w-12 h-12 flex-shrink-0 flex items-center justify-center"
                        style={{
                          borderRadius: "0.75rem",
                          border: "1px solid rgba(65,105,225,0.25)",
                          background: "rgba(65,105,225,0.05)",
                        }}
                      >
                        <ChevronRight className="w-4 h-4" style={{ color: "#4169E1" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </motion.div>
          </section>

          {/* Coming Soon Gurdwaras */}
          <section className="max-w-6xl mx-auto px-8 pb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <div style={{ height: 1, width: 40, background: "rgba(65,105,225,0.3)" }} />
                <span
                  className="text-[9px] uppercase tracking-[0.6em] font-bold"
                  style={{ color: "#4169E1" }}
                >
                  The Journey Continues
                </span>
                <div style={{ height: 1, width: 40, background: "rgba(65,105,225,0.3)" }} />
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "2rem",
                  color: "rgba(14,30,56,0.6)",
                  fontStyle: "italic",
                  fontWeight: 300,
                }}
              >
                More Sacred Gurdwaras Await
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {comingSoonSikhiShrines.map((cs, i) => (
                <motion.div
                  key={cs.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.8 }}
                  className="relative overflow-hidden"
                  style={{
                    borderRadius: "1.5rem",
                    aspectRatio: "3/4",
                    border: "1px solid rgba(65,105,225,0.15)",
                    background: "#FFFFFF",
                  }}
                >
                  <Image src={cs.image} alt={cs.name} fill className="object-cover opacity-40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />

                  {/* Frosted glass locked badge */}
                  <div
                    className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center"
                    style={{
                      borderRadius: "50%",
                      border: "1px solid rgba(65,105,225,0.2)",
                      background: "rgba(255,255,255,0.9)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <Lock className="w-4 h-4" style={{ color: "#4169E1" }} />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <span
                      className="text-[8px] uppercase tracking-[0.4em] font-bold px-2.5 py-1 rounded-full mb-4 inline-block"
                      style={{
                        background: "rgba(65,105,225,0.08)",
                        border: "1px solid rgba(65,105,225,0.18)",
                        color: "#4169E1",
                      }}
                    >
                      Revealed Soon
                    </span>
                    <h3
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.2rem",
                        color: "#0E1E38",
                        marginBottom: "0.4rem",
                      }}
                    >
                      {cs.name}
                    </h3>
                    <p
                      className="text-[10px]"
                      style={{ color: "#334155", fontFamily: "serif" }}
                    >
                      {cs.location}
                    </p>
                    <p
                      className="text-xs italic mt-2"
                      style={{ color: "rgba(14,30,56,0.5)", fontFamily: "serif" }}
                    >
                      {cs.tagline}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom ornament */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-20"
            >
              <span
                style={{
                  fontSize: "2rem",
                  color: "#D4AF37",
                  letterSpacing: "1em",
                }}
              >
                ੴ ✦ ੴ
              </span>
              <p
                className="mt-4 text-[10px] uppercase tracking-[0.5em] font-bold"
                style={{ color: "rgba(14,30,56,0.4)" }}
              >
                Waheguru Waheguru Waheguru
              </p>
            </motion.div>
          </section>
        </div>

        {/* Overlay */}
        <AnimatePresence>
          {selectedShrine && (
            <GoldenTempleOverlay
              shrine={selectedShrine}
              origin={clickOrigin}
              onClose={() => setSelectedShrine(null)}
            />
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
