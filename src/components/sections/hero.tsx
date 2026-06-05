"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Video } from "@/components/ui/video";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}


export const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true); // Default to muted for initial render to avoid hydration mismatch

  // Initialize from storage on mount
  useEffect(() => {
    const savedMuted = localStorage.getItem("hero-video-muted");
    if (savedMuted === "false") {
      setIsMuted(false);
    } else {
      // Default to muted to follow browser best practices, but user can unmute
      setIsMuted(true);
    }
  }, []);

  // Save preference on change
  const toggleMute = () => {
    const newState = !isMuted;
    setIsMuted(newState);
    
    // Direct DOM manipulation for reliable unmuting in response to user click
    if (videoRef.current) {
      try {
        videoRef.current.muted = newState;
        if (!newState) {
          videoRef.current.volume = 1;
          videoRef.current.play().catch((err) => {
            console.warn("Hero video play failed on unmute:", err);
          });
        }
      } catch (e) {
        console.error("Error updating DOM video element:", e);
      }
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("hero-video-muted", String(newState));
    }
  };

  useGSAP(() => {
    const muteVideo = (muted: boolean) => {
      if (videoRef.current) {
        videoRef.current.muted = muted;
      }
    };

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
      onLeave: () => {
        muteVideo(true);
        setIsMuted(true);
      },
      onEnterBack: () => {
        const saved = typeof window !== "undefined" ? localStorage.getItem("hero-video-muted") : null;
        const shouldMute = saved !== "false";
        muteVideo(shouldMute);
        setIsMuted(shouldMute);
      },
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      }
    });

    tl.to(textRef.current, {
      y: -150,
      opacity: 0,
      scale: 0.95,
      ease: "power1.inOut"
    }, 0);

    tl.to(overlayRef.current, {
      opacity: 1,
      ease: "power2.inOut"
    }, 0);
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0F1A15]">
      {/* Background Video */}
      {/* Dark background shown while video loads */}
      <div className="absolute inset-0 bg-[#0F1A15]" />
      <div ref={videoContainerRef} className="absolute inset-0 w-full h-full will-change-transform">
        <Video
          ref={videoRef}
          src="/herosec3.mp4?v=2"
          containerClassName="absolute inset-0 z-0 h-full w-full"
          className=""
          objectFit="cover"
          muted={isMuted}
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

      {/* Top Right Controls */}
      <div className="absolute top-10 right-10 z-[60]">
        <Magnetic strength={0.2}>
          <motion.button 
            onClick={toggleMute}
            animate={isMuted ? { scale: [1, 1.05, 1] } : { scale: 1 }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-black/20 backdrop-blur-md hover:border-white/40 transition-all duration-500 group"
          >
            {isMuted ? (
              <div className="relative">
                <VolumeX className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 2] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 bg-white/20 rounded-full"
                />
              </div>
            ) : (
              <Volume2 className="w-5 h-5 text-white group-hover:text-primary transition-colors" />
            )}
          </motion.button>
        </Magnetic>
      </div>

      <div ref={textRef} className="container relative z-10 mx-auto px-6 text-center will-change-transform">
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

          <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-[family-name:var(--font-eb-garamond)] font-medium leading-[1.1] tracking-tight mb-12 text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] px-4 max-w-5xl mx-auto will-change-transform">
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
            <Link 
              href="/journey"
              className="group flex items-center gap-8 text-white/70 hover:text-white transition-all duration-700"
            >
              <span className="text-[11px] uppercase tracking-[0.6em] font-medium border-b border-white/5 pb-3 group-hover:border-accent/50 group-hover:text-accent transition-all duration-700">
                explore the journey
              </span>
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all duration-700">
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:text-accent" />
              </div>
            </Link>
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