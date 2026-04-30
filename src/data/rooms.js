export const rooms = [
  {
    id: 'threshold',
    number: '000',
    title: 'The Anteroom',
    label: 'Entry / controlled environment',
    copy: 'This is not a website. It is a controlled environment — a space where systems are observed, built, and refined before they are allowed to exist outside. Everything here is intentional. Nothing is decorative.',
    action: 'Step forward',
    next: 'corridor',
    poster: ['assets/images/hero-threshold.png','assets/images/THE THRESHOLD.png','assets/images/DOORWAY.png'],
    video: ['assets/videos/DOORWAY4K.mp4','assets/videos/hero.mp4','assets/videos/hero-threshold.mp4','assets/videos/Gen-4_5 - A sacred architectural chamber begins almost completely in darkness A thin vertical amber.mp4']
  },
  {
    id: 'corridor',
    number: '001',
    title: 'Where Systems Form',
    label: 'Process / refinement',
    copy: 'Every system begins as a question. Here, ideas are not collected — they are tested, stripped, and rebuilt until only what works remains. This is where structure replaces noise.',
    action: 'Continue',
    next: 'archive',
    poster: ['assets/images/hero-threshold.png','assets/images/CORRIDOR.png'],
    video: ['assets/videos/CORRIDOR.mp4','assets/videos/hero-threshold.mp4']
  },
  {
    id: 'archive',
    number: '002',
    title: 'Recorded Systems',
    label: 'Work / proof of execution',
    copy: 'Nothing here is theoretical. Each artifact represents a system that was designed, tested, and made functional. This is not a portfolio — it is a record of execution.',
    action: 'Observe',
    next: 'research',
    poster: ['assets/images/archive-field.png','assets/images/ARCHIVE.png'],
    video: ['assets/videos/ARCHIVE4K.mp4','assets/videos/archive-field.mp4','assets/videos/archieve.mp4','assets/videos/Gen-4_5 - A vast dark archive chamber filled with floating rectangular stone slabs suspended in dept.mp4']
  },
  {
    id: 'research',
    number: '003',
    title: 'Underlying Logic',
    label: 'Thinking / frameworks',
    copy: 'Every system is built on a way of thinking. This space holds the frameworks, patterns, and reasoning behind what you see. If you understand this, you understand everything else.',
    action: 'Understand',
    next: 'exit',
    poster: ['assets/images/research-chamber.png','assets/images/RESEARCH.png'],
    video: ['assets/videos/RESEARCH4K.mp4','assets/videos/research-chamber.mp4','assets/videos/Gen-4_5 - A silent research chamber with a central brass plinth under a thin amber light beam Very.mp4']
  },
  {
    id: 'exit',
    number: '004',
    title: 'What Comes Next',
    label: 'Future / continuation',
    copy: 'This system is not complete. It evolves with every iteration, every test, every failure. What you have seen is a snapshot — not the limit.',
    action: 'Return',
    next: 'threshold',
    poster: ['assets/images/exit-corridor.png','assets/images/EXIT.png'],
    video: ['assets/videos/EXIT4K.mp4','assets/videos/exit-corridor.mp4','assets/videos/exit1.mp4','assets/videos/exit2.mp4','assets/videos/exit3.mp4','assets/videos/exit4.mp4']
  }
];

export const archiveSlabs = [
  {
    id: 'SYS-01',
    title: 'ZAI Terminal',
    type: 'Execution System',
    state: 'Active',
    desc: 'A decision engine designed to interpret market conditions and produce structured execution logic.'
  },
  {
    id: 'SYS-02',
    title: 'Oracle',
    type: 'Intelligence System',
    state: 'Evolving',
    desc: 'A system focused on observing macro patterns, conflict signals, and probabilistic future states.'
  },
  {
    id: 'SYS-03',
    title: 'Restaurant Engine',
    type: 'Operational System',
    state: 'Deployed',
    desc: 'A real-world system for tracking inventory, sales, and operational flow across locations.'
  },
  {
    id: 'SYS-04',
    title: 'OSINT Chamber',
    type: 'Surveillance System',
    state: 'Restricted',
    desc: 'A structured environment for gathering, filtering, and analyzing open-source intelligence.'
  },
  {
    id: 'SYS-05',
    title: 'World Model',
    type: 'Cognitive System',
    state: 'Experimental',
    desc: 'A system attempting to simulate and understand how different domains interact over time.'
  },
  {
    id: 'SYS-06',
    title: 'Research Library',
    type: 'Knowledge System',
    state: 'Forming',
    desc: 'A reserved layer for frameworks, notes, and long-form research records.'
  }
];
