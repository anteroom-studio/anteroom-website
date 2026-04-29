"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const links = [
  { href: "/philosophy", label: "Philosophy" },
  { href: "/work", label: "Work" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 top-0 z-40 px-6 lg:px-12 py-5 flex items-center justify-between backdrop-blur-md bg-[--color-bg]/40"
    >
      <Link
        href="/"
        aria-label="Anteroom — home"
        className="flex items-center gap-3 text-[--color-brass] hover:text-[--color-brass-bright] transition-colors"
      >
        <Logo size={22} />
        <span className="label tracking-[0.22em]">Anteroom</span>
      </Link>

      <ul className="hidden md:flex items-center gap-10">
        {links.map((l) => {
          const active = isActive(l.href);
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`label transition-colors ${
                  active ? "text-[--color-brass]" : "text-[--color-muted] hover:text-[--color-fg]"
                }`}
              >
                {l.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <Link
        href="/contact"
        aria-current={isActive("/contact") ? "page" : undefined}
        className="label text-[--color-muted] hover:text-[--color-brass] transition-colors flex items-center gap-2"
      >
        <span aria-hidden className="w-1 h-1 rounded-full bg-[--color-brass]" />
        Contact
      </Link>
    </nav>
  );
}
