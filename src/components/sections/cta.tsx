"use client";

import React from "react";
import { motion } from "framer-motion";

export const CTA = () => {
  return (
    <section className="relative py-32 bg-[#0a0a0a] overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="max-w-3xl mx-auto"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-primary/60 mb-6 block">
            The Journey Awaits
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
            Ready to Begin Your <span className="italic font-light text-white/80">Sacred</span> Story?
          </h2>
          <p className="text-white/40 text-base md:text-lg mb-12 font-light leading-relaxed">
            Step into a world where every detail is an offering, and every moment is a blessing. 
            Connect with us to plan your next beautiful beginning.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <button className="px-12 py-5 bg-white text-black rounded-full font-semibold text-sm hover:scale-105 transition-transform duration-500 shadow-[0_0_40px_rgba(255,255,255,0.1)]">
              Schedule a Consultation
            </button>
            <button className="text-[10px] uppercase tracking-[0.3em] text-white/60 hover:text-white transition-colors duration-300">
              Explore Our Spaces
            </button>
          </div>
        </motion.div>
      </div>

      {/* Subtle bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent opacity-50" />
    </section>
  );
};
