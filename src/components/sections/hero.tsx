"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Video } from "@/components/ui/video";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { Magnetic } from "@/components/ui/magnetic";

export const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    tl.to(textRef.current, {
      y: -150,
      opacity: 0,
      scale: 0.95,
      filter: "blur(10px)",
      ease: "power1.inOut"
    }, 0);

    tl.to(overlayRef.current, {
      opacity: 1,
      backdropFilter: "blur(20px)",
      ease: "power2.inOut"
    }, 0);

    tl.to(videoContainerRef.current, {
      scale: 1.1,
      ease: "none"
    }, 0);
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0F1A15]">
      {/* Background Video */}
      <div ref={videoContainerRef} className="absolute inset-0 w-full h-full">
        <Video
          src="/herosec.mp4"
          containerClassName="absolute inset-0 z-0 h-full w-full"
          objectFit="cover"
          overlay={
            <>
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#0F1A15]/90" />
              <div className="absolute inset-0 bg-[#1E4D3D]/10 mix-blend-overlay" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
              <div ref={overlayRef} className="absolute inset-0 bg-black/60 opacity-0 transition-none pointer-events-none" />
            </>
          }
        />
      </div>

      <div ref={textRef} className="container relative z-10 mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="mb-10 flex items-center gap-6"
          >
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-primary/40" />
            <span className="text-[12px] uppercase tracking-[0.8em] font-semibold text-white">
              The Divine Offering
            </span>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-primary/40" />
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-[family-name:var(--font-eb-garamond)] font-medium leading-[1.1] tracking-tight mb-12 text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] px-4 max-w-5xl mx-auto">
            Blessings Before <span className="italic font-normal">All Else</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="text-[12px] md:text-sm text-white/90 max-w-xl mx-auto font-normal leading-loose tracking-[0.4em] uppercase"
          >
            Because every beautiful beginning deserves a sacred blessing.
          </motion.p>
        </motion.div>

        {/* Bottom Right CTA */}
        <div className="absolute -bottom-36 right-0 md:right-10 z-20">
          <Magnetic strength={0.3}>
            <button className="group flex items-center gap-8 text-white/70 hover:text-white transition-all duration-700">
              <span className="text-[11px] uppercase tracking-[0.6em] font-medium border-b border-white/5 pb-3 group-hover:border-accent/50 group-hover:text-accent transition-all duration-700">
                explore the origins
              </span>
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all duration-700">
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:text-accent" />
              </div>
            </button>
          </Magnetic>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="absolute -bottom-32 left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0 flex flex-col items-center gap-4"
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};
