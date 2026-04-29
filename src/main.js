const artifacts = [
  ['01','ZAI Crypto Terminal','Market system observing depth before action.'],
  ['02','ZAI Oracle','Macro, crisis replay, and regime intelligence.'],
  ['03','Restaurant Dashboard','Operational intelligence for branch-level stock.'],
  ['04','ZAI Genesis','Foundational systems and memory architecture.'],
  ['05','World Model','A research map for events and consequence.'],
  ['06','Data Model V2','Long-horizon datasets and structured signals.'],
  ['07','Conscious Diary','Private machine memory and reflection.'],
  ['08','OSINT Kali','A curated installer for open-source intelligence.'],
  ['09','CommonGround','Event discovery and social extraction system.'],
  ['10','Kajun Digital Presence','A public restaurant interface experiment.'],
  ['11','Hakka Nation','Menu intelligence and brand interface study.'],
  ['12','Reserved Room','Future tool, paper, or artifact.']
];
const cloud = document.getElementById('artifactCloud');
const panel = document.getElementById('artifactPanel');
const positions = [
  ['60vw','17vh','-12deg','4deg'], ['75vw','36vh','10deg','-3deg'], ['46vw','52vh','-7deg','2deg'], ['23vw','45vh','13deg','-5deg'],
  ['8vw','23vh','-8deg','4deg'], ['62vw','70vh','5deg','2deg'], ['33vw','72vh','-14deg','0deg'], ['82vw','66vh','12deg','-4deg'],
  ['16vw','68vh','6deg','4deg'], ['41vw','28vh','-5deg','-3deg'], ['70vw','12vh','7deg','2deg'], ['5vw','51vh','-9deg','-2deg']
];
artifacts.forEach((a,i)=>{
  const el=document.createElement('button'); el.className='artifact'; el.type='button';
  const p=positions[i%positions.length];
  el.style.setProperty('--x', p[0]); el.style.setProperty('--y', p[1]); el.style.setProperty('--ry', p[2]); el.style.setProperty('--rx', p[3]);
  el.innerHTML=`<span class="num">ARTIFACT ${a[0]}</span><h4>${a[1]}</h4><p>${a[2]}</p>`;
  el.addEventListener('click',()=>{
    panel.innerHTML=`<span class="panel-kicker">Artifact ${a[0]}</span><h3>${a[1]}</h3><p>${a[2]} This slot can hold GitHub links, images, PDFs, notes, and future release logs.</p><a href="https://github.com/zawwarsami16" target="_blank" rel="noreferrer">Open GitHub</a>`;
  });
  cloud.appendChild(el);
});

const glow=document.getElementById('cursorGlow');
window.addEventListener('pointermove', e=>{
  glow.style.left=e.clientX+'px'; glow.style.top=e.clientY+'px';
  document.documentElement.style.setProperty('--mx', e.clientX/window.innerWidth-.5);
  document.documentElement.style.setProperty('--my', e.clientY/window.innerHeight-.5);
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      document.querySelectorAll('.room').forEach(r=>r.classList.remove('active'));
      entry.target.classList.add('active');
      const v=entry.target.querySelector('video');
      if(v){ v.play().catch(()=>{}); }
    }
  });
},{threshold:.55});
document.querySelectorAll('[data-room]').forEach(r=>observer.observe(r));

let raf=false;
window.addEventListener('scroll',()=>{
  if(raf) return; raf=true;
  requestAnimationFrame(()=>{
    const y=window.scrollY;
    document.querySelectorAll('.artifact').forEach((el,i)=>{
      const drift = Math.sin((y/320)+(i*.8))*8;
      el.style.marginTop = drift+'px';
    });
    raf=false;
  });
});
