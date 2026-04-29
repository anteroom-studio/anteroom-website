import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { asset } from "@/lib/asset";

type Props = {
  eyebrow: string;
  title: string;
  lede?: string;
  hero?: string;
  children: ReactNode;
};

export default function PageFrame({ eyebrow, title, lede, hero, children }: Props) {
  return (
    <article className="relative">
      {hero && (
        <div className="relative isolate h-[60vh] min-h-[440px] w-full overflow-hidden">
          <Image
            src={asset(hero)}
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="object-cover object-center -z-10"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 75% 65% at 50% 50%, transparent 0%, rgba(10,9,8,0.18) 60%, rgba(10,9,8,0.50) 90%, rgba(10,9,8,0.70) 100%)",
            }}
          />
        </div>
      )}

      <div className="px-6 lg:px-12 pb-32 pt-32">
        <header className="max-w-[920px] mx-auto flex flex-col gap-8 mb-24">
          <span className="label text-[--color-faint] flex items-center gap-3">
            <span aria-hidden className="inline-block w-8 border-t border-[--color-line-strong] align-middle" />
            {eyebrow}
          </span>
          <h1 className="h1 text-[--color-fg] max-w-[22ch]">{title}</h1>
          {lede && <p className="lede text-[--color-muted] max-w-[58ch] italic">{lede}</p>}
        </header>

        <section className="prose max-w-[640px] mx-auto flex flex-col gap-8">{children}</section>

        <footer className="max-w-[920px] mx-auto mt-32 flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-t border-[--color-line] pt-8">
          <Link
            href="/"
            className="label text-[--color-brass] hover:text-[--color-brass-bright] transition-colors flex items-center gap-3 w-fit"
          >
            Return to the threshold
            <span aria-hidden>→</span>
          </Link>
          <span className="label-sm text-[--color-faint]">You are early.</span>
        </footer>
      </div>
    </article>
  );
}
