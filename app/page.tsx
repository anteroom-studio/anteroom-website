import Link from "next/link";
import Journey from "@/components/journey/Journey";
import Cursor from "@/components/Cursor";

const practices = [
  { href: "/work", label: "Work", lines: ["Selected projects.", "Built deliberately."] },
  { href: "/philosophy", label: "Philosophy", lines: ["Founding ideas.", "First principles."] },
  { href: "/journal", label: "Journal", lines: ["Notes, in time.", "Fragments."] },
  { href: "/about", label: "About", lines: ["ZAI, in 2019.", "And those who followed."] },
];

export default function Home() {
  return (
    <>
      <Cursor />
      <Journey />
      <div id="after-journey" />

      <section aria-labelledby="statement" className="px-6 lg:px-12 py-40 md:py-56 border-t border-[--color-line]">
        <div className="max-w-[1100px] mx-auto flex flex-col gap-10">
          <span className="label text-[--color-faint] flex items-center gap-3">
            <span aria-hidden className="inline-block w-8 border-t border-[--color-line-strong] align-middle" />
            What we do
          </span>
          <h2
            id="statement"
            className="display text-[--color-fg]"
            style={{ fontSize: "clamp(44px, 5.6vw, 88px)" }}
          >
            We work at the seam of <em className="text-[--color-brass]">thought,</em>{" "}
            <em className="text-[--color-brass]">machine,</em> and{" "}
            <em className="text-[--color-brass]">form</em> — building systems that hold up
            after the press cycle ends.
          </h2>
          <p className="lede text-[--color-muted] max-w-[60ch]">
            Anteroom is a small studio. The work is research-led, engineered to last, and
            delivered without a press release. We do not chase mandates. The threshold is
            open to those who are deliberate.
          </p>
        </div>
      </section>

      <section aria-labelledby="practice" className="px-6 lg:px-12 py-32 md:py-48 border-t border-[--color-line]">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-16">
          <div className="flex items-end justify-between gap-8 flex-wrap">
            <div className="flex flex-col gap-4">
              <span className="label text-[--color-faint]">Anteroom</span>
              <h2 id="practice" className="h2 text-[--color-fg] max-w-[24ch]">
                Four chambers, one orientation.
              </h2>
            </div>
            <p className="text-[--color-muted] max-w-[40ch] italic">
              Each room enters from a different angle. The discipline is the same.
            </p>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[--color-line] border border-[--color-line]">
            {practices.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className="group block bg-[--color-bg] hover:bg-[--color-bg-soft] transition-colors p-10 lg:p-14 flex flex-col gap-8 h-full"
                >
                  <span className="label text-[--color-brass]">{p.label}</span>
                  <p className="h3 text-[--color-fg]">
                    {p.lines[0]}
                    <br />
                    <span className="text-[--color-muted]">{p.lines[1]}</span>
                  </p>
                  <span
                    aria-hidden
                    className="mt-auto text-[--color-brass] transition-transform group-hover:translate-x-2 duration-500"
                    style={{ transitionTimingFunction: "var(--ease-out)" }}
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
