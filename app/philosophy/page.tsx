import type { Metadata } from "next";
import PageFrame from "@/components/PageFrame";

export const metadata: Metadata = {
  title: "Philosophy",
  description: "The room before the room. Founded by ZAI in 2019.",
};

export default function Page() {
  return (
    <PageFrame
      eyebrow="Philosophy"
      title="The room before the room."
      hero="/images/manifesto-chamber.png"
    >
      <p className="lede text-[--color-fg] dropcap">
        Anteroom is the threshold.
      </p>
      <p className="text-[--color-muted]">
        Before every chamber there is a smaller chamber. Before every conversation there is
        a pause. Before every action there is the moment of consideration. <em>This is where
        Anteroom lives.</em>
      </p>
      <p className="text-[--color-muted]">
        Founded by ZAI in 2019, Anteroom exists between thought and execution — between idea
        and reality, between the one who asks and the one who answers.
      </p>

      <div aria-hidden className="rule my-2"><span className="font-[var(--font-display)] tracking-[0.3em]">✦</span></div>

      <p className="text-[--color-muted]">
        We are not in a hurry. The work that lasts is not built in haste. What we build, we
        build deliberately. What we say, we say once. What we ship, we ship to last.
      </p>

      <blockquote className="font-[var(--font-display)] italic text-[--color-brass] text-[clamp(28px,3vw,40px)] leading-[1.25] border-l border-[--color-line-strong] pl-6 mt-4">
        If you are here, you are early. Welcome.
      </blockquote>
    </PageFrame>
  );
}
