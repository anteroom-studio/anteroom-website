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
    title: 'ZAI Terminal',
    type: 'Execution System',
    state: 'Active',
    signal: 'Market pressure / order flow / risk gates',
    desc: 'A futures-first intelligence terminal built around structured execution logic: imbalance, depth, spread, drift, and decision discipline before trade entry.',
    command: 'Read execution record'
  },
  {
    id: 'SYS-02',
    title: 'Oracle',
    type: 'Intelligence System',
    state: 'Evolving',
    signal: 'Macro / news / scenario simulation',
    desc: 'A wide-field observation engine for macro pressure, world events, regime shifts, and probabilistic future states — designed to behave like an intelligence desk.',
    command: 'Open intelligence layer'
  },
  {
    id: 'SYS-03',
    title: 'Restaurant Engine',
    type: 'Operational System',
    state: 'Deployed',
    signal: 'Inventory / EOD / branch logic',
    desc: 'A real-world operations system for product usage, stock movement, EOD reporting, location isolation, and management visibility across restaurant branches.',
    command: 'Inspect operations core'
  },
  {
    id: 'SYS-04',
    title: 'Research Library',
    type: 'Knowledge System',
    state: 'Curated',
    signal: 'Notes / frameworks / references',
    desc: 'A disciplined research environment for collecting notes, comparing sources, preserving design logic, and turning scattered ideas into usable frameworks.',
    command: 'Review research protocol'
  },
  {
    id: 'SYS-05',
    title: 'World Model',
    type: 'Cognitive System',
    state: 'Experimental',
    signal: 'Causality / memory / simulation',
    desc: 'A long-horizon modeling layer for connecting events across domains and asking how systems influence each other over time.',
    command: 'Observe model state'
  },
  {
    id: 'SYS-06',
    title: 'Archive Interface',
    type: 'Experience System',
    state: 'Forming',
    signal: 'Narrative / motion / presence',
    desc: 'The visible surface of the studio: cinematic navigation, artifact-based content, restrained motion, and a world that reveals itself through interaction.',
    command: 'Enter interface logic'
  }
];
