const artifacts = [
  {name:'ZAI Crypto Terminal', cat:'Market Systems', year:'2026', desc:'A futures-first intelligence instrument for order-book imbalance, depth discipline, and local reasoning.', url:'https://github.com/zawwarsami16/ZAI-Crypto-Terminal'},
  {name:'ZAI Oracle', cat:'Market Systems', year:'2026', desc:'A macro, geopolitical, and market intelligence terminal built around signal quality and scenario awareness.', url:'https://github.com/zawwarsami16/zai-oracle'},
  {name:'ZAI Restaurant Dashboard', cat:'Restaurant Intelligence', year:'2026', desc:'A multi-location restaurant intelligence system for stock, sales, EOD reporting, and branch operations.', url:'https://github.com/zawwarsami16/zai-restaurant-dashboard'},
  {name:'ZAI Genesis', cat:'ZAI Core', year:'2026', desc:'A foundation layer for the wider ZAI ecosystem and its evolving internal architecture.', url:'https://github.com/zawwarsami16/ZAI-Genesis'},
  {name:'ZAI World Model', cat:'Research Library', year:'2026', desc:'A research direction for modeling events, markets, systems, and long-range consequences.', url:'https://github.com/zawwarsami16/ZAI-World-Model'},
  {name:'ZAI Data Model V2', cat:'Research Library', year:'2026', desc:'A structured data and intelligence layer for future analysis, research, and machine memory.', url:'https://github.com/zawwarsami16/ZAI-Data-Model-V2'},
  {name:'Zai Conscious Diary', cat:'ZAI Core', year:'2026', desc:'A diary-like memory and reflection system for consciousness-oriented AI experiments.', url:'https://github.com/zawwarsami16/Zai-ConsciousDiary'},
  {name:'Zai OSINT Kali', cat:'OSINT', year:'2026', desc:'A Kali-oriented OSINT toolkit installer and operator workspace for ethical intelligence gathering.', url:'https://github.com/zawwarsami16/Zai-Osint-Kali'},
  {name:'CommonGround', cat:'Web Experiments', year:'2026', desc:'An event discovery and aggregation concept designed around cultural intelligence and local discovery.', url:'https://github.com/zawwarsami16/CommonGround'},
  {name:'Kajun Chicken & Seafood', cat:'Restaurant Intelligence', year:'2026', desc:'A public-facing restaurant interface with AI menu logic, cloud menu editing, and local business presence.', url:'https://github.com/zawwarsami16/Kajun-chicken-and-seafood'},
  {name:'Hakka Nation', cat:'Restaurant Intelligence', year:'2026', desc:'A restaurant web experience exploring interactive menu, brand atmosphere, and digital storefront design.', url:'https://github.com/zawwarsami16/hakka-nation'},
  {name:'Portfolio Interface', cat:'Web Experiments', year:'2026', desc:'A personal interface experiment that can later be folded into Anteroom as a private walkthrough room.', url:'https://github.com/zawwarsami16'},
  ...Array.from({length:17},(_,i)=>({name:`Reserved Artifact ${String(i+13).padStart(2,'0')}`,cat:['ZAI Core','Market Systems','Automation','Research Library','Web Experiments'][i%5],year:'Future',desc:'A reserved chamber for a future repository, PDF, tool, experiment, or private portfolio record.',url:'https://github.com/zawwarsami16'}))
];

const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

const meter = $('.scroll-meter span');
const cursor = $('.cursor');
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  meter.style.width = `${(scrollY / max) * 100}%`;
  updateActiveRail();
  parallaxHero();
});

window.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});
$$('a,button,.artifact-card,.walk-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>cursor.classList.add('active'));
  el.addEventListener('mouseleave',()=>cursor.classList.remove('active'));
});

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
},{threshold:.18});
$$('.reveal,.kinetic-line').forEach(el=>io.observe(el));

const railLinks = $$('.chapter-rail a');
function updateActiveRail(){
  let current = '';
  $$('section[id]').forEach(sec=>{
    const top = sec.getBoundingClientRect().top;
    if(top < innerHeight*.45) current = sec.id;
  });
  railLinks.forEach(a=>a.classList.toggle('active', a.getAttribute('href') === `#${current}`));
}
function parallaxHero(){
  const hero = $('#threshold');
  const y = Math.min(1, scrollY / innerHeight);
  hero.style.setProperty('--drift', y);
  const video = $('.hero .bg-video');
  if(video) video.style.transform = `scale(${1 + y*.08}) translateY(${y*42}px)`;
}

$$('[data-tilt]').forEach(card=>{
  card.addEventListener('mousemove', e=>{
    const r = card.getBoundingClientRect();
    const x = (e.clientX-r.left)/r.width; const y = (e.clientY-r.top)/r.height;
    card.style.setProperty('--mx', `${x*100}%`); card.style.setProperty('--my', `${y*100}%`);
    card.style.transform = `rotateX(${(0.5-y)*5}deg) rotateY(${(x-0.5)*7}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave',()=> card.style.transform='');
});

const cats = ['All', ...new Set(artifacts.map(a=>a.cat))];
let activeCat = 'All';
const filterRow = $('#filterRow');
const list = $('#artifactList');
const preview = $('#artifactPreview');
const modal = $('#artifactModal');

function renderFilters(){
  filterRow.innerHTML = cats.map(c=>`<button class="${c===activeCat?'active':''}" data-cat="${c}">${c}</button>`).join('');
  $$('button', filterRow).forEach(btn=>btn.onclick=()=>{activeCat=btn.dataset.cat; renderFilters(); renderArtifacts();});
}
function renderArtifacts(){
  const items = activeCat==='All' ? artifacts : artifacts.filter(a=>a.cat===activeCat);
  list.innerHTML = items.map((a,i)=>`
    <article class="artifact-card" data-index="${artifacts.indexOf(a)}" style="animation-delay:${i*28}ms">
      <div class="artifact-no">Artifact ${String(artifacts.indexOf(a)+1).padStart(2,'0')} · ${a.year}</div>
      <h3>${a.name}</h3>
      <p>${a.desc}</p>
      <span class="artifact-cat">${a.cat}</span>
    </article>`).join('');
  $$('.artifact-card', list).forEach(card=>{
    card.addEventListener('mouseenter',()=>setPreview(+card.dataset.index));
    card.addEventListener('focus',()=>setPreview(+card.dataset.index));
    card.addEventListener('click',()=>openModal(+card.dataset.index));
  });
  if(items.length) setPreview(artifacts.indexOf(items[0]));
}
function setPreview(i){
  const a = artifacts[i];
  preview.innerHTML = `<p class="eyebrow">Artifact ${String(i+1).padStart(2,'0')} · ${a.cat}</p><h3>${a.name}</h3><p>${a.desc}</p><a class="button primary" href="${a.url}" target="_blank" rel="noreferrer">Open repository</a>`;
}
function openModal(i){
  const a = artifacts[i];
  $('#modalCategory').textContent = `Artifact ${String(i+1).padStart(2,'0')} · ${a.cat}`;
  $('#modalTitle').textContent = a.name;
  $('#modalDescription').textContent = a.desc;
  $('#modalLink').href = a.url;
  modal.classList.add('open'); modal.setAttribute('aria-hidden','false');
}
$$('[data-close]').forEach(btn=>btn.addEventListener('click',()=>{modal.classList.remove('open'); modal.setAttribute('aria-hidden','true');}));
window.addEventListener('keydown', e=>{if(e.key==='Escape') modal.classList.remove('open')});

function ensureVideoPlayback(){
  $$('video').forEach(v=>{
    v.muted = true; v.playsInline = true; v.autoplay = true; v.loop = true;
    const p = v.play();
    if(p && p.catch) p.catch(()=>document.body.classList.add('video-blocked'));
  });
}
renderFilters(); renderArtifacts(); updateActiveRail(); ensureVideoPlayback();
