import type { Metadata } from "next";
import PageFrame from "@/components/PageFrame";

export const metadata: Metadata = {
  title: "Contact",
  description: "How to reach Anteroom.",
};

export default function Page() {
  return (
    <PageFrame
      eyebrow="Contact"
      title="The threshold is open."
      lede="Write deliberately. We read every message."
      hero="/images/practice-operations.png"
    >
      <p className="text-[--color-muted]">
        We answer carefully, not quickly. Most messages receive a reply within seven days.
        We do not subscribe to inbox urgency.
      </p>

      <div className="mt-8 flex flex-col gap-6">
        <a
          href="mailto:hello@anteroom.studio"
          className="border border-[--color-line] p-8 flex items-baseline justify-between hover:border-[--color-line-strong] transition-colors group"
        >
          <span className="flex flex-col gap-2">
            <span className="label text-[--color-faint]">Inquiries</span>
            <span className="h3 text-[--color-fg]">hello@anteroom.studio</span>
          </span>
          <span aria-hidden className="text-[--color-brass] transition-transform group-hover:translate-x-2 duration-500" style={{ transitionTimingFunction: "var(--ease-out)" }}>
            →
          </span>
        </a>

        <a
          href="mailto:zawwarsami16@gmail.com"
          className="border border-[--color-line] p-8 flex items-baseline justify-between hover:border-[--color-line-strong] transition-colors group"
        >
          <span className="flex flex-col gap-2">
            <span className="label text-[--color-faint]">Direct — Zawwar Sami</span>
            <span className="h3 text-[--color-fg]">zawwarsami16@gmail.com</span>
          </span>
          <span aria-hidden className="text-[--color-brass] transition-transform group-hover:translate-x-2 duration-500" style={{ transitionTimingFunction: "var(--ease-out)" }}>
            →
          </span>
        </a>
      </div>

      <div aria-hidden className="rule my-8"><span className="font-[var(--font-display)] tracking-[0.3em]">✦</span></div>

      <p className="text-[--color-muted]">
        For collaborations, briefs, or open questions: write the first thing in long form.
        We prefer a paragraph to a sentence.
      </p>
    </PageFrame>
  );
}
