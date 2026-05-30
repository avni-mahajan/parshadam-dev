"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  poster?: string;
  overlay?: React.ReactNode;
  aspectRatio?: "16/9" | "4/3" | "1/1" | "21/9" | "auto";
  containerClassName?: string;
  objectFit?: "cover" | "contain" | "fill";
}

export const Video = ({
  src,
  poster,
  overlay,
  aspectRatio = "16/9",
  className,
  containerClassName,
  objectFit = "cover",
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  ...props
}: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set the JS property directly — React only sets the HTML attribute,
    // which browsers ignore after initial render for muted toggling.
    video.muted = muted;

    // Browsers require a fresh play() call after unmuting for audio to start.
    if (!muted) {
      video.play().catch(() => {
        // Browser blocked unmuted playback (autoplay policy).
        // Fall back to muted silently.
        video.muted = true;
      });
    }
  }, [muted]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (autoPlay) {
            video.play().catch(() => {
              // Ignore browser autoplay blocks on scroll
            });
          }
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [autoPlay]);

  const aspectStyles: Record<string, string> = {
    "16/9": "aspect-video",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-square",
    "21/9": "aspect-[21/9]",
    "auto": "",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        aspectStyles[aspectRatio],
        containerClassName
      )}
    >
      {/* muted is intentionally omitted from JSX — controlled via useEffect */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        preload="auto"
        playsInline={playsInline}
        className={cn(
          "h-full w-full",
          objectFit === "cover" ? "object-cover" : "object-contain",
          className
        )}
        {...props}
      />

      {/* Custom Overlay */}
      {overlay && (
        <div className="absolute inset-0 z-10">
          {overlay}
        </div>
      )}
    </div>
  );
};