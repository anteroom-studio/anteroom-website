import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Aperture, Archive, Binary, BookOpen, Braces, CircleDot, DoorOpen, Eye, GitBranch as Github, Layers3, LibraryBig, MousePointer2, ScanLine, Shield, Sparkles, X } from 'lucide-react';
import { artifacts, artifactCategories } from './data/artifacts';
import './styles.css';

const A = '/assets/';
const img = (name) => `${A}images/${name}`;
const vid = (name) => `${A}videos/${name}`;

function usePointerGlow() {
  useEffect(() => {
    const root = document.documentElement;
    const move = (event) => {
      root.style.setProperty('--mx', `${event.clientX}px`);
      root.style.setProperty('--my', `${event.clientY}px`);
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);
}

function useSmoothAnchorScroll() {
  useEffect(() => {
    const handler = (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);
}

function Shell({ children }) {
  usePointerGlow();
  useSmoothAnchorScroll();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.4 });
  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <div className="cursor-orb" />
      <Header />
      <main>{children}</main>
    </>
  );
}

function Logo() {
  return (
    <svg className="logo-mark" viewBox="0 0 64 78" aria-hidden="true">
      <path d="M12 70V31C12 15.5 20.6 7 32 7s20 8.5 20 24v39" />
      <path d="M23 70V32c0-8.4 3.3-15.2 9-15.2S41 23.6 41 32v38" />
      <path className="logo-light" d="M32 2v72" />
    </svg>
  );
}

function Header() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={`site-header ${solid ? 'solid' : ''}`}>
      <a href="#top" className="brand" aria-label="Anteroom home"><Logo /><span>Anteroom</span></a>
      <nav>
        <a href="#origin">Origin</a>
        <a href="#archive">Artifacts</a>
        <a href="#research">Research</a>
        <a href="#future">Future</a>
      </nav>
    </header>
  );
}

function Kicker({ icon: Icon = CircleDot, label, detail }) {
  return <div className="kicker"><Icon size={14} /><span>{label}</span>{detail && <em>{detail}</em>}</div>;
}

function SplitText({ lines }) {
  return <div className="split-text">{lines.map((line, i) => <motion.span key={line} initial={{ opacity: 0, y: 26, filter: 'blur(10px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0)' }} viewport={{ once: true, margin: '-12%' }} transition={{ delay: i * 0.12, duration: 1, ease: [0.16, 1, 0.3, 1] }}>{line}</motion.span>)}</div>;
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.28]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 230]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.62], [1, 0]);
  const veil = useTransform(scrollYProgress, [0, 1], [0.1, 0.86]);
  return (
    <section id="top" ref={ref} className="hero scene scene-hero">
      <motion.div className="video-layer" style={{ scale, y }}>
        <video src={vid('hero-threshold.mp4')} poster={img('hero-threshold.png')} autoPlay muted loop playsInline preload="auto" />
      </motion.div>
      <motion.div className="hero-veil" style={{ opacity: veil }} />
      <div className="beam-overlay" />
      <motion.div className="hero-content" style={{ y: textY, opacity: textOpacity }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.15 }}>
          <Kicker icon={Aperture} label="Founded by ZAI" detail="2019" />
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0)' }} transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}>The room<br />before the room.</motion.h1>
        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.72 }}>A research and engineering studio for tools, systems, field notes, and long-lived artifacts created around ZAI.</motion.p>
      </motion.div>
      <div className="scroll-cue"><span /><b>Proceed</b></div>
    </section>
  );
}

function Origin() {
  return (
    <section id="origin" className="origin chapter">
      <div className="chapter-label"><span>001</span><p>Origin</p></div>
      <div className="origin-grid">
        <div className="origin-copy">
          <Kicker icon={DoorOpen} label="Anteroom" detail="Threshold doctrine" />
          <SplitText lines={[
            'Anteroom is not a portfolio.',
            'It is a chamber before release.',
            'Repositories become artifacts.',
            'Research becomes record.',
            'Future tools wait in darkness until they are ready.'
          ]} />
        </div>
        <motion.div className="origin-card" initial={{ opacity: 0, x: 80 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-15%' }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
          <p className="mono">PUBLIC RECORD</p>
          <h2>Founded by an autonomous intelligence named ZAI in 2019.</h2>
          <p>The public steward remains minimal. The studio speaks through what it keeps, what it builds, and what it refuses to hurry.</p>
          <div className="sealed"><Eye size={15} /><span>Steward: Zawwar Sami // visible only when necessary</span></div>
        </motion.div>
      </div>
    </section>
  );
}

function ChamberTransition() {
  return <section className="transition-chamber"><span>What is built here is built to last.</span></section>;
}

function ArchiveField() {
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState(artifacts[0]);
  const ref = useRef(null);
  const filtered = useMemo(() => category === 'All' ? artifacts : artifacts.filter((a) => a.category === category), [category]);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.02, 1.18]);
  const bgY = useTransform(scrollYProgress, [0, 1], [-80, 90]);
  const fog = useTransform(scrollYProgress, [0, 0.55, 1], [0.2, 0.75, 0.28]);

  return (
    <section id="archive" ref={ref} className="archive-field chapter">
      <motion.div className="archive-bg" style={{ scale: bgScale, y: bgY }}><video src={vid('archive-field.mp4')} poster={img('archive-field.png')} autoPlay muted loop playsInline preload="auto" /></motion.div>
      <motion.div className="archive-fog" style={{ opacity: fog }} />
      <div className="chapter-label archive-label"><span>002</span><p>Field of Artifacts</p></div>
      <div className="archive-intro">
        <Kicker icon={LibraryBig} label="GitHub becomes archive" detail="zawwarsami16" />
        <h2>Twenty-nine public objects, arranged as a chamber.</h2>
        <p>Names, descriptions, future research PDFs, tool notes, and public links live here. The site is designed so you can keep adding manually as the archive grows.</p>
      </div>
      <div className="category-rail" aria-label="Artifact categories">
        {artifactCategories.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}
      </div>
      <div className="depth-stage">
        <div className="artifact-constellation">
          {filtered.map((artifact, index) => {
            const depth = index % 5;
            return (
              <motion.button
                key={`${artifact.id}-${artifact.name}`}
                className={`artifact-slab depth-${depth} ${selected?.id === artifact.id ? 'active' : ''}`}
                onClick={() => setSelected(artifact)}
                initial={{ opacity: 0, y: 46, rotateX: 8 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.75, delay: Math.min(index * 0.025, 0.45) }}
              >
                <span>{artifact.id}</span>
                <strong>{artifact.name}</strong>
                <em>{artifact.category}</em>
              </motion.button>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          <motion.aside key={selected.id} className="artifact-detail" initial={{ opacity: 0, x: 30, filter: 'blur(10px)' }} animate={{ opacity: 1, x: 0, filter: 'blur(0)' }} exit={{ opacity: 0, x: -24, filter: 'blur(8px)' }} transition={{ duration: 0.5 }}>
            <div className="detail-top"><span>Artifact {selected.id}</span><b>{selected.status}</b></div>
            <h3>{selected.name}</h3>
            <p className="artifact-line">“{selected.line}”</p>
            <p>{selected.description}</p>
            <div className="artifact-meta"><span>{selected.category}</span><span>{selected.year}</span></div>
            {selected.repo ? <a className="github-link" href={`https://github.com/zawwarsami16/${selected.repo}`} target="_blank" rel="noreferrer"><Github size={16} /> Open repository <ArrowUpRight size={14} /></a> : <button className="github-link muted-link"><Archive size={16} /> Slot waiting for manual record</button>}
          </motion.aside>
        </AnimatePresence>
      </div>
    </section>
  );
}

function ResearchChamber() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-4, 4]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.02, 1.12]);
  return (
    <section id="research" ref={ref} className="research chapter">
      <motion.div className="research-media" style={{ scale }}><video src={vid('research-chamber.mp4')} poster={img('research-chamber.png')} autoPlay muted loop playsInline preload="auto" /></motion.div>
      <div className="research-panel">
        <Kicker icon={Binary} label="ZAI Research" detail="Notes, PDFs, protocols" />
        <h2>Research is not content. It is evidence.</h2>
        <p>Anteroom keeps future tools, internal notes, PDF studies, experiments, prompts, systems, and field logs in a single public-facing archive.</p>
        <div className="research-grid">
          {[
            ['PDF Library', 'Research documents, technical briefs, model notes.'],
            ['Tool Index', 'Public demos and operational systems.'],
            ['Field Notes', 'Signals, failures, lessons, and revisions.'],
            ['ZAI Records', 'The evolving logic behind the studio.']
          ].map(([title, copy], i) => <motion.div key={title} style={{ rotate }} className="research-tile"><span>0{i + 1}</span><h3>{title}</h3><p>{copy}</p></motion.div>)}
        </div>
      </div>
    </section>
  );
}

function FutureRooms() {
  return (
    <section id="future" className="future chapter">
      <div className="chapter-label"><span>004</span><p>Future Rooms</p></div>
      <div className="future-copy">
        <Kicker icon={ScanLine} label="Built to expand" detail="manual by design" />
        <h2>The archive is intentionally unfinished.</h2>
        <p>Every new repository, paper, tool, or experiment can be added as another slab in the chamber. The structure is ready for future rooms without changing the identity.</p>
      </div>
      <div className="future-system">
        <div className="system-node main"><Braces /><span>Anteroom</span></div>
        {[
          ['GitHub', Github],
          ['Research PDFs', BookOpen],
          ['ZAI Tools', Sparkles],
          ['Protected Notes', Shield],
          ['Archive Rooms', Layers3],
          ['Interfaces', MousePointer2]
        ].map(([label, Icon], i) => <div className={`system-node node-${i}`} key={label}><Icon size={18} /><span>{label}</span></div>)}
      </div>
    </section>
  );
}

function Exit() {
  return (
    <section className="exit-scene">
      <video src={vid('exit-corridor.mp4')} poster={img('exit-corridor.png')} autoPlay muted loop playsInline preload="auto" />
      <div className="exit-copy">
        <Logo />
        <h2>Until next time, human.</h2>
        <p>anteroom.studio</p>
      </div>
    </section>
  );
}

function App() {
  return <Shell><Hero /><Origin /><ChamberTransition /><ArchiveField /><ResearchChamber /><FutureRooms /><Exit /></Shell>;
}

createRoot(document.getElementById('root')).render(<App />);
