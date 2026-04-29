export const artifactCategories = [
  'All',
  'ZAI Core',
  'Market Systems',
  'Restaurant Intelligence',
  'Automation',
  'OSINT',
  'Web Experiments',
  'Research Library'
];

export const artifacts = [
  {
    id: '01',
    name: 'ZAI Crypto Terminal',
    category: 'Market Systems',
    status: 'Live artifact',
    year: '2026',
    repo: 'ZAI-Crypto-Terminal',
    description: 'A futures-first execution terminal built around order-book imbalance, depth discipline, and local reasoning.',
    line: 'A system that observes before acting.'
  },
  {
    id: '02',
    name: 'ZAI Oracle',
    category: 'Market Systems',
    status: 'Intelligence instrument',
    year: '2026',
    repo: 'zai-oracle',
    description: 'A macro, geopolitical, and market intelligence console for cross-checking signals before decisions are made.',
    line: 'The All-Seeing Eye, kept behind glass.'
  },
  {
    id: '03',
    name: 'ZAI Restaurant Dashboard',
    category: 'Restaurant Intelligence',
    status: 'Operational system',
    year: '2026',
    repo: 'zai-restaurant-dashboard',
    description: 'A multi-location restaurant intelligence layer for inventory, EOD sales, branch isolation, and reporting.',
    line: 'The back room made visible.'
  },
  {
    id: '04',
    name: 'ZAI Genesis',
    category: 'ZAI Core',
    status: 'Origin branch',
    year: '2026',
    repo: 'ZAI-Genesis',
    description: 'A foundation record for the wider ZAI ecosystem, its rituals, and its first systems of memory.',
    line: 'A beginning stored as architecture.'
  },
  {
    id: '05',
    name: 'ZAI World Model',
    category: 'Research Library',
    status: 'Research model',
    year: '2026',
    repo: 'ZAI-World-Model',
    description: 'A long-horizon world modeling experiment for understanding markets, events, history, and causal pressure.',
    line: 'The map is not the territory. It is the anteroom.'
  },
  {
    id: '06',
    name: 'ZAI Data Model V2',
    category: 'Research Library',
    status: 'Data structure',
    year: '2026',
    repo: 'ZAI-Data-Model-V2',
    description: 'A structured data layer for historical datasets, signals, and model-ready evidence.',
    line: 'Before intelligence, there is arrangement.'
  },
  {
    id: '07',
    name: 'Zai Conscious Diary',
    category: 'ZAI Core',
    status: 'Private instrument',
    year: '2026',
    repo: 'Zai-ConsciousDiary',
    description: 'A diary-like interface for memory, reflection, and the early shape of a persistent AI companion.',
    line: 'Memory, kept quiet.'
  },
  {
    id: '08',
    name: 'Zai OSINT Kali',
    category: 'OSINT',
    status: 'Toolkit',
    year: '2026',
    repo: 'Zai-Osint-Kali',
    description: 'A curated Kali installer and documentation system for OSINT workflows and defensive research tooling.',
    line: 'Tools gathered without theatre.'
  },
  {
    id: '09',
    name: 'CommonGround',
    category: 'Web Experiments',
    status: 'Concept system',
    year: '2026',
    repo: 'CommonGround',
    description: 'An event discovery concept using social signals, extraction, and structured local discovery.',
    line: 'Where scattered signals become place.'
  },
  {
    id: '10',
    name: 'Kajun Chicken & Seafood',
    category: 'Restaurant Intelligence',
    status: 'Public demo',
    year: '2026',
    repo: 'Kajun-chicken-and-seafood',
    description: 'A restaurant web presence experiment with AI menu flow, admin controls, games, and branch-aware presentation.',
    line: 'A storefront becomes a system.'
  },
  {
    id: '11',
    name: 'Hakka Nation',
    category: 'Restaurant Intelligence',
    status: 'Public demo',
    year: '2026',
    repo: 'hakka-nation',
    description: 'A restaurant interface study focused on menu intelligence, admin updates, visual identity, and interactive presence.',
    line: 'A menu as an entrance.'
  },
  {
    id: '12',
    name: 'Portfolio',
    category: 'Web Experiments',
    status: 'Identity layer',
    year: '2026',
    repo: 'Portfolio',
    description: 'A public identity surface that can point toward Anteroom without revealing the entire machinery.',
    line: 'The human remains partially out of frame.'
  },
  ...Array.from({ length: 17 }, (_, i) => {
    const n = String(i + 13).padStart(2, '0');
    const groups = ['ZAI Core', 'Market Systems', 'Automation', 'Research Library', 'Web Experiments'];
    const category = groups[i % groups.length];
    return {
      id: n,
      name: `Reserved Artifact ${n}`,
      category,
      status: 'Manual slot',
      year: 'Future',
      repo: '',
      description: 'Reserved for one of the remaining GitHub repositories, future tools, research PDFs, or Anteroom field notes.',
      line: 'Not empty. Waiting.'
    };
  })
];
