"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { asset } from "@/lib/asset";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [enableVideo, setEnableVideo] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    setEnableVideo(mq.matches);
    const onChange = () => setEnableVideo(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enableVideo) return;
    const v = videoRef.current;
    if (!v) return;
    void v.play().catch(() => {});
  }, [enableVideo]);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden isolate"
    >
      <Image
        src={asset("/images/hero-main.png")}
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="object-cover object-center -z-20"
      />

      {enableVideo && (
        <video
          ref={videoRef}
          aria-hidden
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={asset("/images/hero-main.png")}
          className="absolute inset-0 -z-10 w-full h-full object-cover object-center pointer-events-none"
          style={{
            WebkitMaskImage:
              "radial-gradient(ellipse 28% 22% at 100% 100%, transparent 0%, transparent 50%, black 95%)",
            maskImage:
              "radial-gradient(ellipse 28% 22% at 100% 100%, transparent 0%, transparent 50%, black 95%)",
          }}
        >
          <source src={asset("/images/hero-loop.mp4")} type="video/mp4" />
        </video>
      )}

      <div
        aria-hidden
        className="absolute inset-0 -z-[5] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,9,8,0.45) 0%, rgba(10,9,8,0.15) 28%, rgba(10,9,8,0.15) 60%, rgba(10,9,8,0.85) 100%)",
        }}
      />

      <div className="absolute inset-x-0 top-32 lg:top-40 px-6 lg:px-12">
        <div className="max-w-[1600px] mx-auto flex items-baseline justify-between flex-wrap gap-4">
          <span className="label text-[--color-faint]">Anteroom · Est. MMXIX · Founded by ZAI</span>
          <span className="label-sm text-[--color-faint] hidden md:block">
            Karachi · Lahore · The Threshold
          </span>
        </div>
      </div>

      <div className="absolute inset-0 flex items-end pb-24 lg:pb-32">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12">
          <h1 id="hero-heading" className="display display-xl text-[--color-fg]">
            Hi, <span className="accent text-[--color-brass]">human</span>.
          </h1>
          <div className="mt-10 lg:mt-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-12">
            <p className="h2 text-[--color-fg] max-w-[18ch]">
              We build what <span className="accent text-[--color-brass]">comes next</span>.
            </p>
            <p className="lede max-w-[44ch]">
              A research and engineering studio working at the seam of thought, machine, and form.
              The work is the argument.
            </p>
          </div>
        </div>
      </div>

      <a
        href="#work"
        aria-label="Begin"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 group flex flex-col items-center gap-3 text-[--color-faint] hover:text-[--color-brass] transition-colors"
      >
        <span className="label-sm">Scroll</span>
        <span className="block w-px h-12 bg-gradient-to-b from-transparent via-[--color-brass]/60 to-[--color-brass]" />
      </a>
    </section>
  );
}
