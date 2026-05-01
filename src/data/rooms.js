export const rooms = [
  {
    id: 'threshold',
    number: '000',
    title: 'The Anteroom',
    label: 'Approach / controlled silence',
    copy: 'A narrow point of entry into a heavier system. The first rule is restraint: no noise, no decoration, no false motion. Only the door, the dark, and the decision to step forward.',
    action: 'Approach the door',
    next: 'corridor',
    poster: ['assets/images/hero-threshold.png','assets/images/THE THRESHOLD.png','assets/images/DOORWAY.png'],
    video: ['assets/videos/DOORWAY4K.mp4','assets/videos/hero.mp4','assets/videos/hero-threshold.mp4','assets/videos/Gen-4_5 - A sacred architectural chamber begins almost completely in darkness A thin vertical amber.mp4']
  },
  {
    id: 'corridor',
    number: '001',
    title: 'The Passage',
    label: 'Transition / pressure corridor',
    copy: 'The corridor removes urgency. Every step narrows attention. What remains is structure: a path built for systems that need to be tested before they are trusted.',
    action: 'Enter the archive',
    next: 'archive',
    poster: ['assets/images/hero-threshold.png','assets/images/CORRIDOR.png'],
    video: ['assets/videos/CORRIDOR.mp4','assets/videos/hero-threshold.mp4']
  },
  {
    id: 'archive',
    number: '002',
    title: 'The Living Archive',
    label: 'Artifacts / proof of execution',
    copy: 'A live map of Anteroom systems: market intelligence, research models, restaurant platforms, studio infrastructure, and field tooling. Open a slab to inspect the systems inside.',
    action: 'Move deeper',
    next: 'research',
    poster: ['assets/images/archive-field.png','assets/images/ARCHIVE.png'],
    video: ['assets/videos/ARCHIVE4K.mp4','assets/videos/archive-field.mp4','assets/videos/archieve.mp4','assets/videos/Gen-4_5 - A vast dark archive chamber filled with floating rectangular stone slabs suspended in dept.mp4']
  },
  {
    id: 'research',
    number: '003',
    title: 'Research Chamber',
    label: 'Logic / hidden intelligence',
    copy: 'This room is where the system thinks before it speaks. Frameworks, models, constraints, and failures are kept here so the final interface can feel simple without being shallow.',
    action: 'See the next state',
    next: 'exit',
    poster: ['assets/images/research-chamber.png','assets/images/RESEARCH.png'],
    video: ['assets/videos/RESEARCH4K.mp4','assets/videos/research-chamber.mp4','assets/videos/Gen-4_5 - A silent research chamber with a central brass plinth under a thin amber light beam Very.mp4']
  },
  {
    id: 'exit',
    number: '004',
    title: 'The Unfinished Door',
    label: 'Future / continuation protocol',
    copy: 'The archive does not end. It waits for the next system, the next test, the next impossible thing made visible. This is a snapshot, not a boundary.',
    action: 'Return to origin',
    next: 'threshold',
    poster: ['assets/images/exit-corridor.png','assets/images/EXIT.png'],
    video: ['assets/videos/EXIT4K.mp4','assets/videos/exit-corridor.mp4','assets/videos/exit1.mp4','assets/videos/exit2.mp4','assets/videos/exit3.mp4','assets/videos/exit4.mp4']
  }
];

export const archiveSlabs = [
  {
    id: 'SYS-01',
    title: 'Market Systems',
    type: 'Execution + intelligence',
    state: 'Active systems',
    signal: 'Crypto Terminal / Oracle',
    desc: 'Systems for market execution, macro context, crisis replay, and scenario modeling.',
    command: 'Expand market layer',
    repos: [
      {name:'Anteroom Crypto Terminal', desc:'Execution terminal for order flow, spread discipline, and risk checks.'},
      {name:'Anteroom Oracle', desc:'Macro and geopolitical intelligence terminal for regime research.'}
    ]
  },
  {
    id: 'SYS-02',
    title: 'Research Systems',
    type: 'Cycles + models',
    state: 'Active research',
    signal: 'Genesis / World Model / Data Model',
    desc: 'Long-horizon research infrastructure for cycles, causality, pattern behavior, and historical context.',
    command: 'Expand research layer',
    repos: [
      {name:'ZAI Genesis', desc:'Market-cycle and natural-pattern research terminal.'},
      {name:'Anteroom World Model', desc:'Cross-domain event modeling before signals become obvious.'},
      {name:'Anteroom Data Model', desc:'Structured memory layer for durable intelligence records.'}
    ]
  },
  {
    id: 'SYS-03',
    title: 'Restaurant Systems',
    type: 'Operational platforms',
    state: 'Deployed + demo',
    signal: 'Hakka / Kajun / Restaurant Intelligence',
    desc: 'Restaurant platforms covering ordering flow, admin control, menu structure, and operational visibility.',
    command: 'Expand restaurant layer',
    repos: [
      {name:'Hakka Nation', desc:'Restaurant website and ordering interface system.'},
      {name:'Kajun Chicken & Seafood', desc:'Menu and ordering interface for restaurant operations.'},
      {name:'Anteroom Restaurant Intelligence', desc:'Back-office layer for stock, EOD reporting, and branch operations.'}
    ]
  },
  {
    id: 'SYS-04',
    title: 'Studio Infrastructure',
    type: 'Public surface',
    state: 'Live',
    signal: 'Anteroom Website / Archive Interface',
    desc: 'The cinematic interface layer that presents systems, research, and artifacts through controlled interaction.',
    command: 'Expand studio layer',
    repos: [
      {name:'Anteroom Website', desc:'Public archive and studio surface for systems and records.'}
    ]
  },
  {
    id: 'SYS-05',
    title: 'Field Tooling',
    type: 'OSINT + automation',
    state: 'Experimental',
    signal: 'OSINT / CLI / utilities',
    desc: 'Supporting tools for public-source research, data extraction, environment setup, and workflow automation.',
    command: 'Expand tooling layer',
    repos: [
      {name:'ZAI OSINT Kali', desc:'Public-source investigation toolkit for Kali environments.'},
      {name:'ZAI CLI Private', desc:'Internal command workflow and toolchain experiments.'},
      {name:'ZAI Runtime Private', desc:'Runtime layer for private tooling and local execution experiments.'}
    ]
  },
  {
    id: 'SYS-06',
    title: 'Future Systems',
    type: 'Reserved chamber',
    state: 'In development',
    signal: 'Unreleased records',
    desc: 'Reserved space for future systems, research papers, private builds, and studio records not yet exposed.',
    command: 'Await release',
    repos: [
      {name:'Reserved Artifact Index', desc:'Future tools, studies, interface experiments, and private records.'}
    ]
  }
];
