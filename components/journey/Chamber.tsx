"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { asset } from "@/lib/asset";
import type { Chamber as Data } from "./chambers";
import ChamberContent from "./ChamberContent";
import { useChamberProgress } from "./useChamberProgress";

const CORNER_MASK =
  "radial-gradient(ellipse 28% 22% at 100% 100%, transparent 0%, transparent 50%, black 95%)";

const NUMERAL: Record<number, React.CSSProperties> = {
  1: { top: "12%", left: "5%", transform: "rotate(-1.4deg)" },
  2: { top: "8%", right: "8%", transform: "rotate(1.8deg)" },
  3: { top: "15%", left: "10%", transform: "rotate(-1deg)" },
  4: { bottom: "22%", left: "6%", transform: "rotate(1.5deg)" },
  5: { top: "10%", right: "12%", transform: "rotate(-1.7deg)" },
  6: { bottom: "20%", right: "8%", transform: "rotate(0.8deg)" },
  7: { top: "40%", right: "14%", transform: "rotate(-2deg)" },
};

type Props = { data: Data; zIndex: number };

export default function Chamber({ data, zIndex }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [enableVideo, setEnableVideo] = useState(false);
  const { progress, active } = useChamberProgress(data.id, videoRef);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    setEnableVideo(mq.matches);
    const onChange = () => setEnableVideo(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const showVideo = enableVideo && active;

  return (
    <section
      data-chamber={data.id}
      aria-label={data.label}
      className="sticky top-0 h-screen w-full overflow-hidden isolate"
      style={{ zIndex }}
    >
      <Image
        src={asset(data.poster)}
        alt=""
        aria-hidden
        fill
        priority={data.id === 1}
        sizes="100vw"
        className="object-cover object-center -z-20"
      />

      {enableVideo && (
        <video
          ref={videoRef}
          aria-hidden
          muted
          playsInline
          preload="auto"
          poster={asset(data.poster)}
          className="absolute inset-0 -z-10 w-full h-full object-cover object-center pointer-events-none"
          style={{
            opacity: showVideo ? 1 : 0,
            transition: "opacity 600ms var(--ease-out)",
            WebkitMaskImage: CORNER_MASK,
            maskImage: CORNER_MASK,
          }}
        >
          <source src={asset(data.video)} type="video/mp4" />
        </video>
      )}

      <div
        aria-hidden
        className="absolute inset-0 -z-[5] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 65% at 50% 50%, transparent 0%, rgba(10,9,8,0.20) 60%, rgba(10,9,8,0.55) 90%, rgba(10,9,8,0.72) 100%)",
        }}
      />

      <ChamberContent data={data} progress={progress} active={active} />

      <span
        aria-hidden
        className="absolute select-none pointer-events-none text-[--color-brass-deep]"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(120px, 16vw, 240px)",
          lineHeight: 0.9,
          fontWeight: 300,
          letterSpacing: "-0.01em",
          mixBlendMode: "overlay",
          opacity: active ? 0.9 : 0.4,
          transition: "opacity 600ms var(--ease-out)",
          ...NUMERAL[data.id],
        }}
      >
        {data.numeral}
      </span>

      <div className="absolute bottom-8 right-8 flex flex-col items-end gap-1 pointer-events-none">
        <span className="label-sm text-[--color-faint]">{data.label}</span>
        <span className="label-sm text-[--color-faint]">{data.coord}</span>
      </div>
    </section>
  );
}
