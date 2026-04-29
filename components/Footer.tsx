import Link from "next/link";
import Logo from "./Logo";

const cols = [
  { href: "/philosophy", label: "Philosophy" },
  { href: "/work", label: "Work" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[--color-line] px-6 lg:px-12 py-16 mt-32">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-6">
          <Link
            href="/"
            aria-label="Anteroom — home"
            className="flex items-center gap-3 text-[--color-brass] hover:text-[--color-brass-bright] transition-colors w-fit"
          >
            <Logo size={28} />
            <span className="label tracking-[0.22em]">Anteroom</span>
          </Link>
          <p className="text-[--color-faint] text-sm max-w-[40ch]">
            The room before the room. Founded by ZAI in 2019.
          </p>
        </div>

        <ul className="flex flex-wrap gap-x-8 gap-y-3">
          {cols.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                className="label text-[--color-muted] hover:text-[--color-fg] transition-colors"
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="max-w-[1440px] mx-auto mt-12 flex items-center justify-between border-t border-[--color-line] pt-8">
        <span className="label-sm text-[--color-faint]">
          © {year} Anteroom. <span className="hidden-credit">Zawwar Sami</span>
        </span>
        <span className="label-sm text-[--color-faint]">You are early.</span>
      </div>
    </footer>
  );
}
