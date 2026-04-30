export const rooms = [
  {
    id: 'threshold',
    number: '000',
    title: 'The threshold',
    label: 'Arrival / ZAI 2019',
    copy: 'The room before the room. A first-person entry into the studio founded around ZAI.',
    action: 'Enter the passage',
    next: 'corridor',
    poster: ['assets/images/DOORWAY.png','assets/images/hero-threshold.png','assets/images/THE THRESHOLD.png'],
    video: ['assets/videos/DOORWAY4K.mp4','assets/videos/hero.mp4','assets/videos/hero-threshold.mp4','assets/videos/Gen-4_5 - A sacred architectural chamber begins almost completely in darkness A thin vertical amber.mp4']
  },
  {
    id: 'corridor',
    number: '001',
    title: 'The passage',
    label: 'First-person movement',
    copy: 'A quiet corridor between thought and execution. Navigation becomes walking, not clicking.',
    action: 'Continue inward',
    next: 'archive',
    poster: ['assets/images/CORRIDOR.png','assets/images/hero-threshold.png'],
    video: ['assets/videos/CORRIDOR.mp4','assets/videos/hero-threshold.mp4']
  },
  {
    id: 'archive',
    number: '002',
    title: 'Field of artifacts',
    label: 'Objects / public record',
    copy: 'Repositories, tools, notes, and future research enter as slabs inside a single dark world.',
    action: 'Approach research',
    next: 'research',
    poster: ['assets/images/ARCHIVE.png','assets/images/archive-field.png'],
    video: ['assets/videos/ARCHIVE4K.mp4','assets/videos/archive-field.mp4','assets/videos/archieve.mp4','assets/videos/Gen-4_5 - A vast dark archive chamber filled with floating rectangular stone slabs suspended in dept.mp4']
  },
  {
    id: 'research',
    number: '003',
    title: 'Research chamber',
    label: 'Records / intelligence',
    copy: 'PDFs, protocols, model notes, systems, experiments, and long records will live here when they are ready.',
    action: 'Leave the chamber',
    next: 'exit',
    poster: ['assets/images/RESEARCH.png','assets/images/research-chamber.png'],
    video: ['assets/videos/RESEARCH4K.mp4','assets/videos/research-chamber.mp4','assets/videos/Gen-4_5 - A silent research chamber with a central brass plinth under a thin amber light beam Very.mp4']
  },
  {
    id: 'exit',
    number: '004',
    title: 'Until next time, human.',
    label: 'Exit / darkness',
    copy: 'The studio remains open, but it does not follow. Return when there is something worth keeping.',
    action: 'Begin again',
    next: 'threshold',
    poster: ['assets/images/EXIT.png','assets/images/exit-corridor.png'],
    video: ['assets/videos/EXIT4K.mp4','assets/videos/exit-corridor.mp4','assets/videos/exit1.mp4','assets/videos/exit2.mp4','assets/videos/exit3.mp4','assets/videos/exit4.mp4']
  }
];

export const archiveSlabs = [
  { id: 'A01', title: 'ZAI Terminal', type: 'market system', state: 'rename pending' },
  { id: 'A02', title: 'Oracle Room', type: 'intelligence', state: 'rename pending' },
  { id: 'A03', title: 'Restaurant Engine', type: 'operations', state: 'rename pending' },
  { id: 'A04', title: 'OSINT Chamber', type: 'research', state: 'rename pending' },
  { id: 'A05', title: 'Future Tool', type: 'reserved', state: 'empty slab' },
  { id: 'A06', title: 'Research PDF', type: 'library', state: 'waiting' }
];
