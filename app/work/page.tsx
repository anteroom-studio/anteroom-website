import type { Metadata } from "next";
import PageFrame from "@/components/PageFrame";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects. Most are still being built; the rest will appear here.",
};

export default function Page() {
  return (
    <PageFrame
      eyebrow="Work — Catalogue"
      title="What was built here."
      lede="A small register. Most projects pass through Anteroom before they are public; some never leave the chamber."
      hero="/images/practice-engineering.png"
    >
      <p className="text-[--color-muted] dropcap">
        Anteroom does not maintain a portfolio in the conventional sense. The work is the
        argument; when a project is ready, it joins this register.
      </p>

      <p className="text-[--color-muted]">
        At present, the chambers hold ongoing research in distributed systems, intelligence
        infrastructure, and interfaces for slow tools. None of it is yet ready to be named.
      </p>

      <div aria-hidden className="rule my-4"><span className="font-[var(--font-display)] tracking-[0.3em]">✦</span></div>

      <div className="border border-[--color-line] p-10 flex flex-col gap-6">
        <span className="label text-[--color-faint]">Status — open chambers</span>
        <p className="font-[var(--font-display)] text-[clamp(24px,2.5vw,32px)] leading-[1.2] text-[--color-fg]">
          Three projects in research. Two in build. One in the last days of consideration.
        </p>
        <p className="text-[--color-muted] text-sm">
          The first will appear here in <em>MMXXVI · VI</em>.
        </p>
      </div>
    </PageFrame>
  );
}
