"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function Cursor() {
  const pathname = usePathname();
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (pathname !== "/") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const motion = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || !motion) return;
    setMounted(true);
    document.body.classList.add("anteroom-cursor");
    return () => document.body.classList.remove("anteroom-cursor");
  }, [pathname]);

  useEffect(() => {
    if (!mounted) return;

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!visible) setVisible(true);
      const dot = dotRef.current;
      if (dot) dot.style.transform = `translate3d(${e.clientX - 2}px, ${e.clientY - 2}px, 0)`;
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      setHovering(!!t.closest('a, button, [role="button"], input, [data-cursor]'));
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    let raf = 0;
    const tick = () => {
      ring.current.x += (target.current.x - ring.current.x) * 0.18;
      ring.current.y += (target.current.y - ring.current.y) * 0.18;
      const r = ringRef.current;
      if (r) r.style.transform = `translate3d(${ring.current.x - 14}px, ${ring.current.y - 14}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [mounted, visible]);

  if (!mounted) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: hovering ? 48 : 28,
          height: hovering ? 48 : 28,
          marginLeft: hovering ? -10 : 0,
          marginTop: hovering ? -10 : 0,
          border: `1px solid ${hovering ? "var(--color-brass-bright)" : "var(--color-brass)"}`,
          borderRadius: "50%",
          background: hovering ? "rgba(232, 200, 120, 0.06)" : "transparent",
          opacity: visible ? 1 : 0,
          mixBlendMode: "difference",
          transition: "width 240ms var(--ease-out), height 240ms var(--ease-out), opacity 240ms var(--ease-out), background 240ms var(--ease-out)",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="fixed top-0 left-0 w-1 h-1 rounded-full pointer-events-none z-[9999]"
        style={{
          background: "var(--color-brass-bright)",
          opacity: visible ? 1 : 0,
          transition: "opacity 200ms var(--ease-out)",
        }}
      />
    </>
  );
}
