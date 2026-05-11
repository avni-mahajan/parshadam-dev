"use client";

import React, { use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { shrines } from "@/components/sections/sacred-map-data";
import { Video } from "@/components/ui/video";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function ShrinePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const shrine = shrines.find((s) => s.id === id);

  if (!shrine) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F6EFE3] text-[#2A2A22]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[65vh] md:h-[75vh] w-full overflow-hidden flex items-end">
        <Video 
          src="/herosec.mp4"
          containerClassName="absolute inset-0 w-full h-full"
          className="scale-[1.1] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 pb-16 md:pb-24 w-full">
          <Link 
            href="/#sacred-origins"
            className="inline-flex items-center gap-3 text-white/80 hover:text-white mb-8 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md group-hover:bg-white group-hover:text-black transition-all">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Back to Map</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "circOut" }}
          >
            <span className="text-xs uppercase tracking-[0.6em] font-black text-white mb-4 block">
              ✦ {shrine.type}
            </span>
            <h1 className="text-5xl md:text-8xl font-black text-white font-heading leading-none drop-shadow-2xl">
              {shrine.name}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-24">
            
            {/* Short Desc & Intro */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
              <div className="md:col-span-4">
                <div className="flex items-center gap-4 sticky top-32">
                  <span className="w-8 h-[1px] bg-[#D97A1D]" />
                  <span className="text-[10px] uppercase tracking-[0.4em] text-[#D97A1D] font-bold">The Source</span>
                </div>
              </div>
              <div className="md:col-span-8">
                <h2 className="text-3xl md:text-5xl font-medium leading-[1.3] font-heading italic text-slate-800">
                  {shrine.shortDesc}
                </h2>
                <div className="mt-8 flex items-center gap-3 text-[#D97A1D]/60">
                  <span className="text-xs uppercase tracking-widest font-bold">{shrine.state}, India</span>
                </div>
              </div>
            </div>

            {/* Sacred Connection Box */}
            <div className="relative group">
              <div className="absolute -inset-8 bg-[#D97A1D]/5 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="relative p-12 md:p-20 rounded-[3rem] bg-white border border-[#D97A1D]/10 shadow-[0_40px_100px_rgba(217,122,29,0.05)]">
                <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-[#D97A1D] mb-12 block">Sacred Connection</span>
                <p className="text-2xl md:text-4xl leading-[1.6] text-slate-800 font-light font-serif italic">
                  "{shrine.sacredConnection}"
                </p>
                
                {/* Decorative Element */}
                <div className="absolute bottom-12 right-12 opacity-10">
                  <svg className="w-16 h-16 text-[#D97A1D]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col md:flex-row gap-6 pt-12 border-t border-black/5">
              <button className="flex-1 py-8 bg-[#D97A1D] text-white rounded-2xl font-bold tracking-[0.3em] uppercase text-xs shadow-xl shadow-[#D97A1D]/20 hover:scale-[1.02] transition-all duration-300">
                Invite this Blessing Home
              </button>
              <Link 
                href="/#sacred-origins"
                className="flex-1 py-8 border border-slate-200 text-slate-400 rounded-2xl font-bold tracking-[0.3em] uppercase text-xs text-center hover:bg-slate-50 transition-all duration-300"
              >
                Explore Other Centers
              </Link>
            </div>

            {/* Trust Note */}
            <p className="text-center text-[9px] uppercase tracking-[0.4em] text-slate-300 font-bold">
              Personally carried by Unati Behan with reverence
            </p>

          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
