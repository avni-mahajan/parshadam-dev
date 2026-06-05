"use client";

import { useEffect, useRef, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface VideoProps {
  src: string;
  poster?: string;
  overlay?: React.ReactNode;
  aspectRatio?: "16/9" | "4/3" | "1/1" | "21/9" | "auto";
  containerClassName?: string;
  className?: string;
  objectFit?: "cover" | "contain" | "fill";
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
}

export const Video = forwardRef<HTMLVideoElement, VideoProps>(function Video(
  {
    src,
    poster,
    overlay,
    aspectRatio = "auto",
    className,
    containerClassName,
    objectFit = "cover",
    autoPlay = true,
    muted = true,
    loop = true,
    playsInline = true,
  },
  forwardedRef
) {
  const internalRef = useRef<HTMLVideoElement>(null);

  // ── Sync muted prop → DOM property ──────────────────────────────────────
  // React sets the HTML attribute (locked at mount by browsers).
  // We must set the JS property directly to actually toggle audio.
  useEffect(() => {
    const video = internalRef.current;
    if (!video) return;

    video.muted = muted;

    if (!muted) {
      video.play().catch(() => {
        video.muted = true;
      });
    }
  }, [muted]);

  // ── Autoplay on mount + resume after reload ──────────────────────────────
  // The IntersectionObserver handles both initial play and tab visibility.
  useEffect(() => {
    const video = internalRef.current;
    if (!video) return;

    // Ensure muted is set before any play attempt (browsers block unmuted autoplay)
    video.muted = muted;

    const tryPlay = () => {
      if (autoPlay) {
        video.play().catch(() => {
          // If unmuted play fails, retry muted (browser autoplay policy)
          video.muted = true;
          video.play().catch(() => {});
        });
      }
    };

    // Play as soon as the video has enough data
    if (video.readyState >= 2) {
      tryPlay();
    } else {
      video.addEventListener("canplay", tryPlay, { once: true });
    }

    // Also resume if the tab regains focus (handles reload/tab-switch)
    const handleVisibility = () => {
      if (!document.hidden && autoPlay) tryPlay();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tryPlay();
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(video);

    return () => {
      video.removeEventListener("canplay", tryPlay);
      document.removeEventListener("visibilitychange", handleVisibility);
      observer.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {/*
        ⚠️ No `muted` JSX prop — React freezes the HTML attribute at mount.
        The useEffect above sets video.muted (DOM property) directly instead.
      */}
      <video
        ref={(el) => {
          (internalRef as React.MutableRefObject<HTMLVideoElement | null>).current = el;
          if (typeof forwardedRef === "function") {
            forwardedRef(el);
          } else if (forwardedRef) {
            (forwardedRef as React.MutableRefObject<HTMLVideoElement | null>).current = el;
          }
        }}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        loop={loop}
        preload="auto"
        playsInline={playsInline}
        className={cn(
          "h-full w-full",
          objectFit === "cover" ? "object-cover" : "object-contain",
          className
        )}
      />
      {overlay && (
        <div className="absolute inset-0 z-10">{overlay}</div>
      )}
    </div>
  );
});