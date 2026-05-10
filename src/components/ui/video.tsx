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

  const aspectStyles = {
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
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
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
