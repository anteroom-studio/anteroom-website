import Link from "next/link";
import EditorialMedia from "./EditorialMedia";

type Props = {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  body: string;
  poster: string;
  video?: string;
  href: string;
  cta: string;
  align?: "left" | "right";
  id?: string;
};

export default function EditorialSection({
  index,
  eyebrow,
  title,
  body,
  poster,
  video,
  href,
  cta,
  align = "left",
  id,
}: Props) {
  const imageRight = align === "left";
  const titleId = `${id ?? eyebrow.toLowerCase()}-title`;

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className="relative border-t border-[--color-line] py-24 lg:py-40 px-6 lg:px-12"
    >
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-16 items-center">
        <div
          className={`lg:col-span-5 flex flex-col gap-8 ${imageRight ? "lg:order-1" : "lg:order-2"}`}
        >
          <div className="flex items-baseline gap-4">
            <span className="numeral text-[clamp(48px,5vw,80px)] text-[--color-brass-deep]">
              {index}
            </span>
            <span className="label text-[--color-faint]">{eyebrow}</span>
          </div>

          <h2 id={titleId} className="h1 text-[--color-fg] max-w-[14ch]">
            {title}
          </h2>

          <p className="lede max-w-[44ch]">{body}</p>

          <Link
            href={href}
            data-cursor
            className="group inline-flex items-baseline gap-3 mt-2 w-fit border-b border-[--color-line-strong] hover:border-[--color-brass] transition-colors pb-2"
          >
            <span className="label text-[--color-brass]">{cta}</span>
            <span
              aria-hidden
              className="text-[--color-brass] transition-transform duration-500 group-hover:translate-x-2"
              style={{ transitionTimingFunction: "var(--ease-out)" }}
            >
              →
            </span>
          </Link>
        </div>

        <Link
          href={href}
          data-cursor
          aria-label={`${cta} — ${eyebrow}`}
          className={`lg:col-span-7 group relative block aspect-[16/10] overflow-hidden ${
            imageRight ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <EditorialMedia poster={poster} video={video} />
          <div className="absolute bottom-6 left-6 right-6 flex items-baseline justify-between text-[--color-fg] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="label">{eyebrow}</span>
            <span className="label-sm">View →</span>
          </div>
        </Link>
      </div>
    </section>
  );
}
