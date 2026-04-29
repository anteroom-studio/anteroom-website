import type { Metadata } from "next";
import PageFrame from "@/components/PageFrame";

export const metadata: Metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <PageFrame
      eyebrow="404"
      title="This room is not yet built."
      lede="The path you followed does not lead anywhere — at least not yet. Anteroom is still being prepared, and not every door opens."
    >
      <p className="text-[--color-muted]">
        If you arrived here by accident, the threshold is one step back.
      </p>
    </PageFrame>
  );
}
