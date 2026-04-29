import Chamber from "./Chamber";
import { chambers } from "./chambers";

export default function Journey() {
  return (
    <div data-journey className="relative w-full">
      <a
        href="#after-journey"
        className="sr-only focus:not-sr-only focus:fixed focus:top-20 focus:left-4 focus:z-50 focus:bg-bg-raised focus:px-4 focus:py-2 label"
      >
        Skip the journey
      </a>
      {chambers.map((c, i) => (
        <Chamber key={c.id} data={c} zIndex={(i + 1) * 10} />
      ))}
    </div>
  );
}
