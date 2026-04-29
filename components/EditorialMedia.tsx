import Image from "next/image";
import { asset } from "@/lib/asset";

type Props = { poster: string; video?: string; alt?: string };

const CORNER_MASK =
  "radial-gradient(ellipse 28% 22% at 100% 100%, transparent 0%, transparent 50%, black 95%)";

export default function EditorialMedia({ poster, video, alt = "" }: Props) {
  return (
    <div className="absolute inset-0">
      {video ? (
        <video
          aria-hidden
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={asset(poster)}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[1200ms] group-hover:scale-[1.04] pointer-events-none"
          style={{
            transitionTimingFunction: "var(--ease-out)",
            WebkitMaskImage: CORNER_MASK,
            maskImage: CORNER_MASK,
          }}
        >
          <source src={asset(video)} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={asset(poster)}
          alt={alt}
          aria-hidden={alt === ""}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover object-center transition-transform duration-[1200ms] group-hover:scale-[1.04]"
          style={{ transitionTimingFunction: "var(--ease-out)" }}
        />
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
