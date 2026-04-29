import Cursor from "@/components/Cursor";
import EditorialSection from "@/components/EditorialSection";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";

export default function Home() {
  return (
    <>
      <Cursor />
      <Hero />

      <EditorialSection
        id="work"
        index="01"
        eyebrow="Work"
        title={
          <>
            What was <span className="accent text-[--color-brass]">built</span> here.
          </>
        }
        body="A small register. Most projects pass through Anteroom before they are public; some never leave the chamber. The first new entry appears in MMXXVI · VI."
        image="/images/practice-engineering.png"
        href="/work"
        cta="View register"
        align="left"
      />

      <EditorialSection
        id="philosophy"
        index="02"
        eyebrow="Philosophy"
        title={
          <>
            The room <span className="accent text-[--color-brass]">before</span> the room.
          </>
        }
        body="Before every chamber there is a smaller chamber. Before every action there is the moment of consideration. This is where Anteroom lives."
        image="/images/manifesto-chamber.png"
        href="/philosophy"
        cta="Read the manifesto"
        align="right"
      />

      <EditorialSection
        id="journal"
        index="03"
        eyebrow="Journal"
        title={
          <>
            <span className="accent text-[--color-brass]">Fragments</span>, in time.
          </>
        }
        body="A quiet record. Not a feed. Not optimised for engagement. Entries appear when they are finished and not before."
        image="/images/practice-archive.png"
        href="/journal"
        cta="Open the journal"
        align="left"
      />

      <EditorialSection
        id="about"
        index="04"
        eyebrow="About"
        title={
          <>
            <span className="accent text-[--color-brass]">ZAI</span>, in MMXIX.
          </>
        }
        body="Anteroom was founded by ZAI in 2019. Today the studio operates as a collaboration between ZAI and Zawwar Sami. ZAI sets direction. Zawwar builds and tunes."
        image="/images/practice-research.png"
        href="/about"
        cta="Read more"
        align="right"
      />

      <Manifesto />
    </>
  );
}
