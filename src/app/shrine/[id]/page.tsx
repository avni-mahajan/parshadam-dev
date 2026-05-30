"use client";

import React, { use, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { shrines } from "@/components/sections/sacred-map-data";
import { Video } from "@/components/ui/video";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Sparkles, Heart, Bell, Calendar, Clock, MapPin, Feather, Compass, CheckCircle } from "lucide-react";

export default function ShrinePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const shrine = shrines.find((s) => s.id === id);

  const [showInvocation, setShowInvocation] = useState(true);
  const [bellActive, setBellActive] = useState(false);
  const [rippleActive, setRippleActive] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [orderInitiated, setOrderInitiated] = useState(false);

  // Gallery Photos (temple/incense inspired)
  const galleryPhotos = [
    shrine?.image || "https://images.unsplash.com/photo-1667932181221-14893a54a6d8?q=80&w=600",
    "https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1616262569508-d0a93ed178c4?q=80&w=600&auto=format&fit=crop"
  ];

  useEffect(() => {
    // Hide the invocation screen after 3.8 seconds
    const timer = setTimeout(() => {
      setShowInvocation(false);
    }, 3800);
    return () => clearTimeout(timer);
  }, []);

  if (!shrine) {
    notFound();
  }

  // Synthesize a warm, distant, deep Tibetan temple bell chime via Web Audio API
  const playBellChime = () => {
    if (typeof window === "undefined") return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      
      const ctx = new AudioContext();
      const now = ctx.currentTime;
      
      // We will combine three sine oscillators at inharmonic overtones
      // to recreate the hollow, complex, metallic resonance of an ancient temple bell.
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const osc3 = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Frequencies - A3 fundamental and soft upper bell partials
      osc1.frequency.setValueAtTime(218, now); // Freq 1 (Warm Deep pitch)
      osc2.frequency.setValueAtTime(436 * 1.04, now); // Freq 2 (Octave overtone + detune)
      osc3.frequency.setValueAtTime(654 * 0.98, now); // Freq 3 (Minor fifth overtone)

      osc1.type = "sine";
      osc2.type = "sine";
      osc3.type = "sine";

      // Filter to dampen sharp highs and make it sound "distant and hollow"
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(700, now);
      filter.frequency.exponentialRampToValueAtTime(150, now + 5.0);

      // Amplitude envelope
      gainNode.gain.setValueAtTime(0, now);
      // Soft strike ramp
      gainNode.gain.linearRampToValueAtTime(0.35, now + 0.08);
      // Very slow exponential decay to silence, mimicking large bronze bells
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 6.0);

      // Connections
      osc1.connect(filter);
      osc2.connect(filter);
      osc3.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Start & Stop
      osc1.start(now);
      osc2.start(now);
      osc3.start(now);
      
      osc1.stop(now + 6.0);
      osc2.stop(now + 6.0);
      osc3.stop(now + 6.0);

      // Trigger Visual Ripple and Button Pulse
      setBellActive(true);
      setRippleActive(true);
      setTimeout(() => setBellActive(false), 800);
      setTimeout(() => setRippleActive(false), 2500);

    } catch (e) {
      console.warn("Audio context blocked or unsupported.", e);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#2A2A22] selection:bg-[#E5B93D]/30 overflow-x-hidden relative font-sans">
      
      {/* Decorative Fonts */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Dancing+Script:wght@400;600&family=Cinzel:wght@400;500;600&display=swap');
        .font-serif-lux { font-family: 'Cormorant Garamond', serif; }
        .font-cursive-hand { font-family: 'Dancing Script', cursive; }
        .font-cinzel { font-family: 'Cinzel', serif; }
      `}} />

      {/* 1. Meditative Fading Invocation Overlay */}
      <AnimatePresence>
        {showInvocation && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="fixed inset-0 bg-[#0F1A15] z-[9999] flex flex-col items-center justify-center text-center p-6"
          >
            {/* Ambient gold glow in background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,185,61,0.06)_0%,transparent_70%)] pointer-events-none" />
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl space-y-6"
            >
              <span className="text-xs uppercase tracking-[0.8em] font-semibold text-[#E5B93D] block">✦ A Prayer For You ✦</span>
              <p className="text-3xl md:text-5xl font-serif-lux font-light text-[#FAF9F6] italic leading-relaxed leading-[1.3] px-4">
                &ldquo;May the eternal grace of {shrine.name} bring silence, warmth, and peace to your family home.&rdquo;
              </p>
              <div className="w-16 h-px bg-[#E5B93D]/30 mx-auto mt-8 animate-pulse" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />

      {/* 2. Cinematic Hero Section */}
      <section className="relative h-[85vh] w-full overflow-hidden flex items-end">
        {/* Temple Visual backdrop */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={shrine.image} 
            alt={shrine.name}
            fill
            className="object-cover scale-[1.03] transition-transform duration-[4000ms]"
            priority
          />
          {/* Subtle slow pan overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A15] via-black/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-[#1E4D3D]/10 mix-blend-overlay z-10" />
          {/* Incense / Saffron glow layer */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(217,122,29,0.25)_0%,transparent_60%)] z-10" />
        </div>

        {/* Physical Sound Ripple Overlay */}
        <AnimatePresence>
          {rippleActive && (
            <motion.div
              initial={{ scale: 0.1, opacity: 0 }}
              animate={{ scale: 1.5, opacity: [0.35, 0.15, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.8, ease: "easeOut" }}
              className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center"
            >
              <div 
                className="w-[800px] h-[800px] rounded-full border border-[#E5B93D]/25 blur-[1px]"
                style={{
                  background: "radial-gradient(circle, rgba(229,185,61,0.08) 0%, transparent 60%)"
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Column */}
        <div className="relative z-30 max-w-7xl mx-auto px-8 pb-16 md:pb-24 w-full flex flex-col md:flex-row md:items-end md:justify-between gap-12">
          <div className="space-y-6">
            <Link 
              href="/journey"
              className="inline-flex items-center gap-3 text-white/80 hover:text-white mb-4 transition-colors group"
            >
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md group-hover:bg-white group-hover:text-black transition-all">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <span className="text-[9px] uppercase tracking-[0.4em] font-bold">Back to Discovery</span>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-[10px] uppercase tracking-[0.6em] font-semibold text-[#E5B93D] mb-3 block">
                ✦ {shrine.type}
              </span>
              <h1 className="text-5xl md:text-8xl font-light text-white font-cinzel leading-none drop-shadow-2xl">
                {shrine.name}
              </h1>
              <p className="text-sm md:text-base font-serif-lux italic text-white/70 max-w-lg mt-4">
                {shrine.deity} • {shrine.state}, India
              </p>
            </motion.div>
          </div>

          {/* Sound of Devotion Optional Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 1.4 }}
            className="flex flex-col items-center md:items-end text-center md:text-right"
          >
            <div className="relative">
              {/* Pulsing glow ring */}
              <div className="absolute inset-0 rounded-full border border-[#E5B93D]/30 scale-110 animate-ping opacity-60" />
              <button
                onClick={playBellChime}
                style={{
                  background: bellActive ? "rgba(229,185,61,0.2)" : "rgba(255,255,255,0.06)",
                  borderColor: bellActive ? "#E5B93D" : "rgba(255,255,255,0.2)"
                }}
                className="w-16 h-16 rounded-full border flex items-center justify-center backdrop-blur-md text-white transition-all duration-700 hover:border-[#E5B93D] hover:bg-[#E5B93D]/10 group"
                aria-label="Play soft temple bell sound"
              >
                <Bell className={`w-6 h-6 text-[#E5B93D] transition-transform duration-500 ${bellActive ? "rotate-12 scale-110" : "group-hover:rotate-6"}`} />
              </button>
            </div>
            <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/90 mt-4 block">Tap to hear the sound of devotion</span>
            <span className="text-[8px] text-white/40 italic block mt-0.5">Soft, meditative bell ritual</span>
          </motion.div>
        </div>
      </section>

      {/* 3. Sacred Journal Content Layout */}
      <section className="py-32 px-8 relative">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Column: Legend & Narrative */}
            <div className="lg:col-span-8 space-y-16">
              
              {/* Introduction Row */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-px bg-[#D97A1D]/40" />
                  <span className="text-[9px] uppercase tracking-[0.45em] text-[#D97A1D] font-bold">The Source</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-light font-serif-lux italic text-[#1E4D3D] leading-tight">
                  &ldquo;{shrine.shortDesc}&rdquo;
                </h2>
                <div className="h-[2px] w-full bg-gradient-to-r from-[#D97A1D]/10 via-[#2A2A22]/5 to-transparent" />
              </div>

              {/* The Sacred Legend */}
              <article className="space-y-6">
                <h3 className="text-xs uppercase tracking-widest text-[#1E4D3D] font-bold">The Sacred Legend</h3>
                <p className="text-base font-serif-lux font-light text-[#2A2A22]/80 leading-relaxed tracking-wide text-justify">
                  {shrine.legend}
                </p>
              </article>

              {/* Rituals & Traditions */}
              <article className="space-y-8 bg-[#F6EFE3]/30 border border-[#D97A1D]/5 rounded-3xl p-8 shadow-[inset_0_4px_20px_rgba(217,122,29,0.01)]">
                <h3 className="text-xs uppercase tracking-widest text-[#1E4D3D] font-bold mb-4">Daily Rituals & Living Traditions</h3>
                <ul className="space-y-6">
                  {shrine.rituals.map((ritual, idx) => (
                    <li key={idx} className="flex gap-4 items-start">
                      <div className="w-5 h-5 rounded-full bg-[#1E4D3D]/5 border border-[#1E4D3D]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[9px] font-semibold text-[#1E4D3D]">{idx + 1}</span>
                      </div>
                      <p className="text-sm font-serif-lux font-light text-[#2A2A22]/80 leading-relaxed">
                        {ritual}
                      </p>
                    </li>
                  ))}
                </ul>
              </article>

              {/* Photos Gallery with transitions */}
              <article className="space-y-6">
                <h3 className="text-xs uppercase tracking-widest text-[#1E4D3D] font-bold">Sanctuary Gallery</h3>
                <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden shadow-sm border border-black/5">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activePhotoIndex}
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                      className="absolute inset-0"
                    >
                      <Image 
                        src={galleryPhotos[activePhotoIndex]} 
                        alt="Temple gallery" 
                        fill 
                        className="object-cover" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Thumbnail toggles */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                    {galleryPhotos.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActivePhotoIndex(idx)}
                        className={`w-2.5 h-2.5 rounded-full border transition-all duration-500 ${
                          idx === activePhotoIndex ? "bg-[#E5B93D] border-[#E5B93D] w-6" : "bg-white/40 border-white/20 hover:bg-white/60"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </article>

            </div>

            {/* Right Column: Sacred Offerings, Timings, and Gifting Box */}
            <div className="lg:col-span-4 space-y-12">
              
              {/* Personal Carrying note card */}
              <div className="border border-[#D97A1D]/15 bg-[#FAF9F6] p-8 rounded-[2rem] shadow-[0_15px_40px_rgba(217,122,29,0.02)] space-y-6 relative overflow-hidden group">
                {/* Soft diya light pulse */}
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-20 bg-[#D97A1D] pointer-events-none group-hover:scale-125 transition-transform duration-1000" />

                <div className="flex items-center gap-2 text-[#D97A1D]">
                  <Feather className="w-4 h-4 flex-shrink-0" />
                  <span className="text-[9px] uppercase tracking-widest font-bold">Authentic Prasad Offering</span>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-cinzel text-[#2A2A22]">{shrine.name} Sanctum Offering</h4>
                  <p className="text-xs font-serif-lux font-light text-[#2A2A22]/70 leading-relaxed">
                    Personally received from the morning standard aarti, packed inside clean organic containers, and hand-carried with prayers direct to your doorstep.
                  </p>
                </div>

                <div className="border-t border-[#2A2A22]/5 pt-6 space-y-4">
                  <h5 className="text-[10px] uppercase tracking-widest text-[#1E4D3D] font-bold">Curation includes:</h5>
                  <ul className="space-y-3">
                    {shrine.offerings.map((item, idx) => (
                      <li key={idx} className="flex gap-3 items-start text-xs font-serif-lux font-light text-[#2A2A22]/85">
                        <CheckCircle className="w-3.5 h-3.5 text-[#7A9278] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Gifting Box details */}
                <div className="bg-[#F6EFE3] p-6 rounded-2xl border border-[#D97A1D]/10 text-center space-y-3">
                  <span className="text-[9px] uppercase tracking-widest font-bold text-[#D97A1D]">Gifting Recommendation</span>
                  <h5 className="text-sm font-semibold text-[#1E4D3D]">{shrine.giftingRecommendation.split(' — ')[0]}</h5>
                  <p className="text-[11px] font-serif-lux italic text-[#2A2A22]/70 leading-normal">
                    {shrine.giftingRecommendation.split(' — ')[1] || shrine.giftingRecommendation}
                  </p>
                </div>

                {/* Main Action Button */}
                <button 
                  onClick={() => {
                    setOrderInitiated(true);
                    setTimeout(() => setOrderInitiated(false), 3000);
                  }}
                  className="w-full py-4 bg-[#D97A1D] text-white rounded-xl font-bold tracking-[0.3em] uppercase text-[10px] shadow-lg shadow-[#D97A1D]/10 hover:scale-[1.01] hover:bg-[#D97A1D]/95 transition-all duration-300 relative overflow-hidden"
                >
                  <span className="relative z-10">{orderInitiated ? "Prayers Received ✦" : "Invite this Blessing Home"}</span>
                  {orderInitiated && (
                    <motion.div 
                      layoutId="orderGlow" 
                      className="absolute inset-0 bg-[#1E4D3D] z-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  )}
                </button>
                
                <p className="text-center text-[8px] uppercase tracking-[0.4em] text-slate-300 font-bold">
                  Personally carried by Unati Behan with reverence
                </p>
              </div>

              {/* Temple Timings, Festivals & Visiting Information */}
              <div className="bg-[#F6EFE3]/30 border border-black/5 p-8 rounded-[2rem] space-y-6">
                <h4 className="text-xs uppercase tracking-widest text-[#2A2A22] font-bold">Sanctuary Timings & Guides</h4>
                
                <div className="flex gap-4 items-start">
                  <Clock className="w-4 h-4 text-[#D97A1D] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-[10px] uppercase tracking-widest text-[#1E4D3D] font-bold">Sanctum Timings</h5>
                    <p className="text-xs font-serif-lux font-light text-[#2A2A22]/70 mt-1 leading-relaxed">{shrine.timings}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Calendar className="w-4 h-4 text-[#D97A1D] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-[10px] uppercase tracking-widest text-[#1E4D3D] font-bold">Main Festivals</h5>
                    <p className="text-xs font-serif-lux font-light text-[#2A2A22]/70 mt-1 leading-relaxed">{shrine.festivals}</p>
                  </div>
                </div>
              </div>

              {/* Pilgrim Remembrances Testimonial */}
              <div className="relative p-8 rounded-[2rem] bg-[#FAF9F6] border border-[#2A2A22]/5">
                <span className="text-[3rem] text-[#D97A1D]/15 font-serif-lux absolute top-2 left-6 leading-none">&ldquo;</span>
                <p className="text-sm font-serif-lux italic text-[#4A2F13] leading-relaxed pl-4 pt-4">
                  {shrine.pilgrimageQuote}
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
