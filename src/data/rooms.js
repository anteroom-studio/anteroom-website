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
    copy: 'The slabs are not cards. They are records. Each one holds a system, a problem, a method, and the trace of execution. Hover to wake them. Select one to inspect the record.',
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
    title: 'Terminal',
    type: 'Execution Layer',
    state: 'Active — market-facing',
    signal: 'Order flow / pressure / decision gates',
    desc: 'A futures-first execution system focused on imbalance, depth, spread control, and disciplined trade entry logic.',
    command: 'View execution system'
  },
  {
    id: 'SYS-02',
    title: 'Oracle',
    type: 'Intelligence Layer',
    state: 'Evolving — macro-aware',
    signal: 'Global signals / regime shifts',
    desc: 'A wide-field intelligence system tracking geopolitical pressure, market regimes, and probabilistic future states.',
    command: 'Open intelligence system'
  },
  {
    id: 'SYS-03',
    title: 'Restaurant Systems',
    type: 'Operational Layer',
    state: 'Deployed — real-world use',
    signal: 'Inventory / EOD / branch logic',
    desc: 'A real-world operations layer for restaurant environments, covering product flow, reporting, and multi-location control.',
    command: 'Inspect operational systems'
  },
  {
    id: 'SYS-04',
    title: 'Research Library',
    type: 'Knowledge Layer',
    state: 'Curated — internal use',
    signal: 'Frameworks / notes / models',
    desc: 'A structured environment for preserving research, building frameworks, and turning raw ideas into usable systems.',
    command: 'Access research layer'
  },
  {
    id: 'SYS-05',
    title: 'World Model',
    type: 'Cognitive Layer',
    state: 'Experimental — long horizon',
    signal: 'Causality / simulation / memory',
    desc: 'A modeling system exploring how events connect across domains and evolve over time.',
    command: 'Observe model'
  },
  {
    id: 'SYS-06',
    title: 'Archive Interface',
    type: 'Interface Layer',
    state: 'Forming — public surface',
    signal: 'Narrative / motion / presence',
    desc: 'The visible interface of the studio — a controlled environment where systems are revealed through interaction.',
    command: 'Enter interface'
  }
];
