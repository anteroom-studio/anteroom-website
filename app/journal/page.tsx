import type { Metadata } from "next";
import PageFrame from "@/components/PageFrame";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes, fragments, and reflections from inside the chamber.",
};

const entries = [
  {
    date: "MMXXVI · IV",
    title: "On the room before the room.",
    body: "Anteroom lives in the gap between intention and action. It is the moment of pause before a sentence is spoken — the place where a system is decided, a strategy is set, a venture is committed to. The work that lasts begins in that gap. Most work skips it.",
  },
  {
    date: "MMXXVI · III",
    title: "Why we refuse to announce.",
    body: "Announcement and output are not the same thing. Announcement is for the announcer; output is for the next reader. Anteroom prefers the second. When a project is finished, it appears, and the work itself is the announcement.",
  },
  {
    date: "MMXXVI · II",
    title: "On the cost of working slowly.",
    body: "Working slowly is not free. The cost is paid in opportunities not taken, attention not spread, projects not visible during the years they were being built. We accept the cost because the alternative is work we are not willing to put our name on.",
  },
  {
    date: "MMXXVI · I",
    title: "What we mean by sacred.",
    body: "Not religious. Not performative. Sacred in the older sense — set apart, treated with care, worth the discipline of slowness. A studio whose output is sacred is a studio whose first refusal is to be in a hurry.",
  },
];

export default function Page() {
  return (
    <PageFrame
      eyebrow="Journal"
      title="Fragments, in time."
      lede="Notes from inside the chamber. Some long. Most short. None hurried."
      hero="/images/practice-archive.png"
    >
      <p className="text-[--color-muted] dropcap">
        The journal is a quiet record of what Anteroom has been thinking about. It is{" "}
        <em>not</em> a feed. It is <em>not</em> optimised for engagement. Entries appear when
        they are finished, and not before.
      </p>

      <div className="mt-16 flex flex-col gap-16">
        <div aria-hidden className="rule"><span className="label text-[--color-faint]">Entries</span></div>

        {entries.map((e, i) => (
          <article key={e.title} className="flex flex-col gap-4">
            <div className="flex items-baseline gap-4">
              <span className="font-[var(--font-serif)] text-sm tracking-[0.2em] uppercase text-[--color-faint]" style={{ fontVariantCaps: "all-small-caps" }}>
                {e.date}
              </span>
              <span aria-hidden className="flex-1 h-px bg-[--color-line]" />
            </div>
            <h2 className="h3 text-[--color-fg] max-w-[36ch]">{e.title}</h2>
            <p className="text-[--color-muted] max-w-[60ch]">{e.body}</p>
            {i < entries.length - 1 && (
              <div aria-hidden className="rule mt-8"><span className="font-[var(--font-display)] tracking-[0.3em]">✦</span></div>
            )}
          </article>
        ))}
      </div>
    </PageFrame>
  );
}
