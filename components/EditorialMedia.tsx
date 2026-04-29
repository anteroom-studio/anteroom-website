"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { asset } from "@/lib/asset";

type Props = { poster: string; video?: string; alt?: string };

const CORNER_MASK =
  "radial-gradient(ellipse 28% 22% at 100% 100%, transparent 0%, transparent 50%, black 95%)";

export default function EditorialMedia({ poster, video, alt = "" }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [enableVideo, setEnableVideo] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!video) return;
    const mq = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    setEnableVideo(mq.matches);
    const onChange = () => setEnableVideo(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [video]);

  useEffect(() => {
    if (!enableVideo) return;
    const node = wrapRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px 0px", threshold: 0 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [enableVideo]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (enableVideo && inView) {
      void v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [enableVideo, inView]);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <Image
        src={asset(poster)}
        alt={alt}
        aria-hidden={alt === ""}
        fill
        sizes="(min-width: 1024px) 60vw, 100vw"
        className="object-cover object-center transition-transform duration-[1200ms] group-hover:scale-[1.04]"
        style={{ transitionTimingFunction: "var(--ease-out)" }}
      />
      {enableVideo && video && (
        <video
          ref={videoRef}
          aria-hidden
          muted
          loop
          playsInline
          preload="metadata"
          poster={asset(poster)}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[1200ms] group-hover:scale-[1.04] pointer-events-none"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 800ms var(--ease-out), transform 1200ms var(--ease-out)",
            WebkitMaskImage: CORNER_MASK,
            maskImage: CORNER_MASK,
          }}
        >
          <source src={asset(video)} type="video/mp4" />
        </video>
      )}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, transparent 60%, rgba(10,9,8,0.55) 100%)",
        }}
      />
    </div>
  );
}
