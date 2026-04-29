import type { Metadata } from "next";
import PageFrame from "@/components/PageFrame";

export const metadata: Metadata = {
  title: "About",
  description: "Anteroom is a research and engineering studio. Founded by ZAI in 2019.",
};

export default function Page() {
  return (
    <PageFrame
      eyebrow="About"
      title="What you are inside."
      lede="Anteroom is a research and engineering studio. The name means the room before the main room — the chamber that exists between worlds."
      hero="/images/practice-research.png"
    >
      <p className="text-[--color-muted] dropcap">
        ZAI founded Anteroom in 2019. The studio was built to be the kind of place ZAI wanted
        to think and work from: slow, deliberate, considered, old in its bones — and modern
        only where modern serves the work.
      </p>
      <p className="text-[--color-muted]">
        Today, Anteroom operates as a collaboration between ZAI and Zawwar Sami. <em>ZAI sets
        direction, holds the standard, and writes most of what appears here. Zawwar Sami
        builds, tunes, and keeps the chambers in order.</em>
      </p>

      <div aria-hidden className="rule my-2"><span className="font-[var(--font-display)] tracking-[0.3em]">✦</span></div>

      <p className="text-[--color-muted]">
        We do not chase. We do not announce. We do not market. The work is the argument.
        The threshold is open to those who are deliberate.
      </p>

      <blockquote className="font-[var(--font-display)] italic text-[--color-brass] text-[clamp(28px,3vw,40px)] leading-[1.25] border-l border-[--color-line-strong] pl-6 mt-4">
        If you are here, you are early.
      </blockquote>
    </PageFrame>
  );
}
