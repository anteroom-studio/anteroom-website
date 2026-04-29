import type { Chamber } from "./chambers";

type Props = { data: Chamber; progress: number; active: boolean };

export default function ChamberContent({ data, progress, active }: Props) {
  if (data.id === 1) return <Threshold progress={progress} />;
  if (data.id === 7) return <Return active={active} progress={progress} />;
  return <Stanzas copy={data.copy} progress={progress} active={active} />;
}

function Threshold({ progress }: { progress: number }) {
  const fade = Math.max(0, 1 - progress * 1.6);
  const cueFade = Math.max(0, 1 - progress * 2.4);
  return (
    <div className="absolute inset-0 flex items-center pointer-events-none">
      <div
        className="relative w-full max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8"
        style={{ opacity: fade, transition: "opacity 200ms linear" }}
      >
        <div className="lg:col-span-7 flex flex-col gap-10">
          <span className="label text-[--color-faint] flex items-center gap-3">
            <span aria-hidden className="inline-block w-8 border-t border-[--color-line-strong] align-middle" />
            The threshold
          </span>
          <h1 className="display text-[--color-fg]" style={{ fontSize: "clamp(64px, 8vw, 128px)" }}>
            Hi, <em className="text-[--color-brass]">human</em>.
          </h1>
          <p className="h2 text-[--color-fg] max-w-[20ch]">We build what comes next.</p>
          <p className="lede text-[--color-muted] max-w-[44ch]">Founded by ZAI in 2019.</p>
        </div>
        <aside className="hidden lg:block lg:col-span-3 lg:col-start-10 lg:self-center">
          <p className="text-sm text-[--color-faint] max-w-[28ch]">
            A research and engineering studio working at the seam of thought, machine, and form. What
            is built here is built to last.
          </p>
        </aside>
      </div>

      <div
        aria-hidden
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{ opacity: cueFade, transition: "opacity 300ms linear" }}
      >
        <span className="label-sm text-[--color-faint]">Scroll to begin</span>
        <span className="block w-px h-12 bg-gradient-to-b from-transparent via-[--color-brass]/60 to-[--color-brass]" />
        <span className="block w-1 h-1 rounded-full bg-[--color-brass]" />
      </div>
    </div>
  );
}

function Return({ active, progress }: { active: boolean; progress: number }) {
  const fade = Math.min(1, progress * 1.4);
  return (
    <div className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none">
      <p
        className="h2 italic text-[--color-fg] max-w-[40ch] text-center"
        style={{ opacity: active ? fade : 0, transition: "opacity 400ms linear" }}
      >
        Until next time, human.
      </p>
    </div>
  );
}

function Stanzas({ copy, progress, active }: { copy: string[]; progress: number; active: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none">
      <div className="relative w-full max-w-[44ch] flex flex-col gap-10 text-center">
        {copy.map((line, i) => {
          const start = 0.1 + i * (0.7 / Math.max(1, copy.length));
          const end = start + 0.18;
          const t = (progress - start) / (end - start);
          const op = t < 0 ? 0 : t > 1 ? 1 : t;
          const lift = (1 - op) * 16;
          return (
            <p
              key={i}
              className="h2 text-[--color-fg]"
              style={{
                opacity: op * (active ? 1 : 0.55),
                transform: `translate3d(0, ${lift}px, 0)`,
                transition: "opacity 120ms linear, transform 200ms var(--ease-out)",
              }}
            >
              {line}
            </p>
          );
        })}
      </div>
    </div>
  );
}
