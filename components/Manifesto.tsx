export default function Manifesto() {
  return (
    <section
      aria-labelledby="manifesto"
      className="relative border-t border-[--color-line] py-32 lg:py-56 px-6 lg:px-12"
    >
      <div className="max-w-[1400px] mx-auto flex flex-col gap-12">
        <span className="label text-[--color-faint] flex items-center gap-3">
          <span aria-hidden className="inline-block w-10 border-t border-[--color-line-strong] align-middle" />
          On working slowly
        </span>
        <h2
          id="manifesto"
          className="display display-lg text-[--color-fg]"
        >
          The work that lasts is{" "}
          <span className="accent text-[--color-brass]">not built in haste</span>. What we build, we
          build deliberately. What we ship, we ship to last.
        </h2>
        <p className="lede max-w-[60ch]">
          Anteroom does not chase mandates. We do not announce. We do not market. The threshold is
          open to those who are deliberate.
        </p>
      </div>
    </section>
  );
}
