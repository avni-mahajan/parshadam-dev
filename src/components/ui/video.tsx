"use client";

import React, { useState, useEffect, useRef } from "react";
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
  const [isLoaded, setIsLoaded] = useState(false);
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
        "relative overflow-hidden bg-muted/20",
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
        loop={loop}
        playsInline={playsInline}
        onLoadedData={() => setIsLoaded(true)}
        onCanPlay={() => setIsLoaded(true)}
        className={cn(
          "h-full w-full transition-opacity duration-700",
          objectFit === "cover" ? "object-cover" : "object-contain",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        {...props}
      />

      {/* Skeleton / Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Custom Overlay */}
      {overlay && (
        <div className="absolute inset-0 z-10">
          {overlay}
        </div>
      )}
    </div>
  );
};