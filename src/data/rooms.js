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
    copy: 'A live map of Anteroom systems: market intelligence, research models, restaurant platforms, and studio infrastructure. Select a slab to inspect the system record.',
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
    type: 'Execution + Intelligence',
    state: 'Active systems',
    signal: 'Crypto Terminal / Oracle',
    desc: 'Execution and intelligence systems for high-risk market environments, combining order flow, macro context, crisis replay, and scenario modeling.',
    command: 'Explore market systems'
  },
  {
    id: 'SYS-02',
    title: 'Research Systems',
    type: 'Cycles + models',
    state: 'Active research',
    signal: 'Genesis / World Model',
    desc: 'Long-horizon research systems focused on cycles, causality, pattern behavior, and historical context across markets and global systems.',
    command: 'Open research systems'
  },
  {
    id: 'SYS-03',
    title: 'Restaurant Systems',
    type: 'Real-world platforms',
    state: 'Deployed',
    signal: 'Hakka / Kajun / Operations',
    desc: 'Restaurant platforms covering ordering flow, admin control, menu structure, inventory thinking, and customer-facing interfaces.',
    command: 'View deployments'
  },
  {
    id: 'SYS-04',
    title: 'Studio Interface',
    type: 'Public surface',
    state: 'Active',
    signal: 'Anteroom Website',
    desc: 'The cinematic interface layer of the studio, designed to present systems, research, and artifacts through controlled interaction.',
    command: 'Enter interface'
  },
  {
    id: 'SYS-05',
    title: 'OSINT + Tooling',
    type: 'Field systems',
    state: 'Experimental',
    signal: 'OSINT / automation / utilities',
    desc: 'Supporting tools and field systems used for public-source research, data extraction, operational workflows, and environment setup.',
    command: 'Inspect tools'
  },
  {
    id: 'SYS-06',
    title: 'Future Systems',
    type: 'Reserved layer',
    state: 'In development',
    signal: 'Unreleased work',
    desc: 'Reserved space for upcoming systems, research papers, internal tools, and studio records not yet exposed to the archive.',
    command: 'Await release'
  }
];
