import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ArrowUpRight, Circle, Crosshair, DoorOpen, Eye, Layers3, LockKeyhole, ScrollText, Sparkles } from 'lucide-react';
import './styles.css';

const asset = (name) => `/images/${name}`;

const practices = [
  {
    number: '01',
    title: 'Research',
    label: 'Signal before certainty',
    image: 'practice-research.png',
    video: 'research-loop.mp4',
    copy: 'Quiet systems for finding what matters before it becomes visible.',
    points: ['Model evaluation', 'Market and cultural intelligence', 'Long-horizon archives']
  },
  {
    number: '02',
    title: 'Engineering',
    label: 'Execution without noise',
    image: 'practice-engineering.png',
    video: 'engineering-loop.mp4',
    copy: 'Interfaces, automations, and internal tools built with restraint.',
    points: ['AI-native products', 'Operational dashboards', 'Local-first systems']
  },
  {
    number: '03',
    title: 'Archive',
    label: 'Memory with structure',
    image: 'practice-archive.png',
    video: 'archive-loop.mp4',
    copy: 'A slow record of experiments, failures, prototypes, and thresholds.',
    points: ['Research logs', 'Design canon', 'Technical manuscripts']
  },
  {
    number: '04',
    title: 'Operations',
    label: 'The invisible machinery',
    image: 'practice-operations.png',
    video: 'operations-loop.mp4',
    copy: 'Systems that keep the room alive after the first opening.',
    points: ['Automation loops', 'Deployment rituals', 'Continuity protocols']
  }
];

function useMouseGlow() {
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

function Logo() {
  return (
    <div className="brand-mark" aria-label="Anteroom mark">
      <svg viewBox="0 0 52 64" role="img">
        <path d="M8 58V26C8 12.7 15.6 5 26 5s18 7.7 18 21v32" />
        <path d="M17 58V27c0-7 3.1-12.7 9-12.7S35 20 35 27v31" />
      </svg>
    </div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="brand" href="#top" aria-label="Anteroom home">
        <Logo />
        <span>Anteroom</span>
      </a>
      <nav>
        <a href="#manifesto">Manifesto</a>
        <a href="#practices">Practices</a>
        <a href="#archive">Archive</a>
        <a href="#contact">Enter</a>
      </nav>
    </header>
  );
}

function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.16]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.76], [1, 0]);
  const glow = useTransform(scrollYProgress, [0, 1], [0.65, 0.12]);

  return (
    <section className="hero" id="top" ref={ref}>
      <motion.div className="hero-media" style={{ scale, y, opacity }}>
        <video src={asset('hero-loop.mp4')} poster={asset('hero-main.png')} autoPlay muted loop playsInline />
        <motion.div className="vertical-light" style={{ opacity: glow }} />
      </motion.div>
      <div className="hero-vignette" />
      <div className="hero-content">
        <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.2 }}>
          Founded by ZAI · 2019
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}>
          The room before<br />the room.
        </motion.h1>
        <motion.p className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.75 }}>
          A research and engineering studio for systems that prefer permanence over performance.
        </motion.p>
      </div>
      <div className="scroll-hint">
        <span />
        <p>Proceed slowly</p>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="manifesto section" id="manifesto">
      <div className="section-grid">
        <Reveal className="section-kicker">
          <span>Manifesto</span>
          <p>Threshold doctrine</p>
        </Reveal>
        <Reveal className="large-statement">
          Anteroom is the threshold. It keeps unfinished thoughts in darkness until they are ready to carry weight.
        </Reveal>
      </div>
      <div className="cinema-card">
        <video src={asset('manifesto-loop.mp4')} poster={asset('manifesto-chamber.png')} autoPlay muted loop playsInline />
        <div className="cinema-overlay">
          <p>Not a feed. Not a stage. A chamber for deliberate work.</p>
        </div>
      </div>
    </section>
  );
}

function Origin() {
  return (
    <section className="origin section">
      <div className="origin-line" />
      <Reveal className="origin-card">
        <p className="mono">ORIGIN // 2019</p>
        <h2>Founded by an autonomous intelligence. Stewarded by a human almost out of frame.</h2>
        <p>
          ZAI began Anteroom as a place for pre-work: the models before tools, the notes before systems, the rituals before release.
        </p>
      </Reveal>
      <Reveal delay={0.12} className="quiet-easter-egg" title="Public steward: Zawwar Sami">
        <Eye size={16} />
        <span>Steward record sealed</span>
      </Reveal>
    </section>
  );
}

function Practices() {
  const [active, setActive] = useState(0);
  return (
    <section className="practices section" id="practices">
      <div className="section-grid practice-heading">
        <Reveal className="section-kicker">
          <span>Practices</span>
          <p>Four rooms</p>
        </Reveal>
        <Reveal className="large-statement">The studio works in chambers, not departments.</Reveal>
      </div>
      <div className="practice-stage">
        <div className="practice-tabs" role="tablist" aria-label="Anteroom practices">
          {practices.map((practice, index) => (
            <button key={practice.title} className={active === index ? 'active' : ''} onClick={() => setActive(index)}>
              <span>{practice.number}</span>
              {practice.title}
            </button>
          ))}
        </div>
        <motion.div className="practice-visual" key={practices[active].title} initial={{ opacity: 0.45, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
          <video src={asset(practices[active].video)} poster={asset(practices[active].image)} autoPlay muted loop playsInline />
          <div className="practice-glass">
            <p className="mono">{practices[active].label}</p>
            <h3>{practices[active].title}</h3>
            <p>{practices[active].copy}</p>
            <ul>
              {practices[active].points.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Archive() {
  const entries = [
    ['2019', 'Anteroom initiated by ZAI as a private research chamber.'],
    ['2021', 'First engineering rituals documented. Internal tools become artifacts.'],
    ['2024', 'The archive begins separating noise from signal.'],
    ['Now', 'The door is visible. It is not fully open.']
  ];
  return (
    <section className="archive section" id="archive">
      <Reveal className="archive-title">
        <p className="eyebrow">Archive</p>
        <h2>What is built here is built to last.</h2>
      </Reveal>
      <div className="archive-list">
        {entries.map(([year, text], index) => (
          <Reveal key={year} delay={index * 0.08} className="archive-row">
            <span>{year}</span>
            <p>{text}</p>
            <Circle size={12} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Systems() {
  const items = [
    ['01', 'Research memory', ScrollText],
    ['02', 'Model-guided engineering', Crosshair],
    ['03', 'Cinematic interfaces', Layers3],
    ['04', 'Private operating rooms', LockKeyhole]
  ];
  return (
    <section className="systems section">
      <Reveal className="systems-intro">
        <p className="eyebrow">Internal instruments</p>
        <h2>The visible website is only the anteroom.</h2>
      </Reveal>
      <div className="systems-grid">
        {items.map(([num, title, Icon], index) => (
          <Reveal key={title} delay={index * 0.06} className="system-card">
            <span>{num}</span>
            <Icon size={24} />
            <h3>{title}</h3>
            <p>Kept quiet until useful.</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-arch">
        <DoorOpen size={34} />
        <p className="eyebrow">anteroom.studio</p>
        <h2>If you are here, you are early.</h2>
        <a href="mailto:threshold@anteroom.studio" className="enter-link">
          Request entry <ArrowUpRight size={18} />
        </a>
        <p className="farewell">Until next time, human.</p>
      </div>
    </section>
  );
}

function Progress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });
  return <motion.div className="progress" style={{ scaleX }} />;
}

function App() {
  useMouseGlow();
  return (
    <>
      <Progress />
      <Header />
      <main>
        <Hero />
        <Manifesto />
        <Origin />
        <Practices />
        <Archive />
        <Systems />
        <Contact />
      </main>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
