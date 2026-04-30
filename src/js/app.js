import { rooms } from '../data/rooms.js';

const root = document.getElementById('pov');
const loading = document.getElementById('loading');

function makeVideo(){
  const v = document.createElement('video');
  v.className = 'scene-video';
  v.autoplay = true;
  v.muted = true;
  v.loop = true;
  v.playsInline = true;
  v.setAttribute('webkit-playsinline','');
  v.preload = 'auto';
  root.appendChild(v);
  return v;
}

let front = makeVideo();
let back = makeVideo();
front.classList.add('active');

const veil = document.createElement('div');
veil.className = 'transition-veil';
root.appendChild(veil);

const sweep = document.createElement('div');
sweep.className = 'lens-sweep';
root.appendChild(sweep);

const cursor = document.createElement('div');
cursor.className = 'cursor';
document.body.appendChild(cursor);

let current = 0;
let busy = false;
let lastMove = Date.now();

function applyDrift(v, x, y){
  const dx = (x / window.innerWidth - 0.5) * 10;
  const dy = (y / window.innerHeight - 0.5) * 8;
  v.style.setProperty('--driftX', dx + 'px');
  v.style.setProperty('--driftY', dy + 'px');
}

function setPresence(x, y){
  lastMove = Date.now();
  document.body.style.setProperty('--mx', x + 'px');
  document.body.style.setProperty('--my', y + 'px');
  cursor.style.left = x + 'px';
  cursor.style.top = y + 'px';
  applyDrift(front, x, y);
  applyDrift(back, x, y);
}
window.addEventListener('mousemove', e => setPresence(e.clientX, e.clientY));
setPresence(window.innerWidth/2, window.innerHeight/2);

setInterval(()=>{
  if(Date.now() - lastMove < 1500) return;
  const t = Date.now() / 1600;
  const x = window.innerWidth/2 + Math.sin(t) * 34;
  const y = window.innerHeight/2 + Math.cos(t * .7) * 22;
  applyDrift(front, x, y);
}, 80);

function showPoster(r){
  root.style.backgroundImage = 'url("' + r.poster[0] + '")';
  root.style.backgroundSize = 'cover';
  root.style.backgroundPosition = 'center';
}

function prepareVideo(v, r){
  showPoster(r);
  v.poster = r.poster[0] || '';
  v.src = r.video[0];
  v.load();
  const p = v.play();
  if(p && p.catch){ p.catch(()=>{}); }
}

function swapVideos(){
  const old = front;
  front = back;
  back = old;
  back.className = 'scene-video';
}

function loadScene(i){
  if(busy) return;
  busy = true;
  const r = rooms[i];
  const oldCopy = document.querySelector('.room-copy');
  if(oldCopy) oldCopy.classList.add('out');

  prepareVideo(back, r);
  veil.classList.add('in');
  sweep.classList.add('in');
  front.classList.add('pushing');

  setTimeout(()=>{
    back.classList.add('active');
    front.classList.add('leaving');
  }, 220);

  setTimeout(()=>{
    swapVideos();
    updateUI(r);
    front.classList.remove('pushing');
    veil.classList.remove('in');
    sweep.classList.remove('in');
    busy = false;
  }, 980);
}

function updateUI(r){
  let ui = document.getElementById('ui');
  if(!ui){ ui = document.createElement('div'); ui.id = 'ui'; root.appendChild(ui); }
  ui.innerHTML = '<div class="hud"><div class="room-copy"><div class="kicker">'+r.label+'</div><h1>'+r.title+'</h1><p>'+r.copy+'</p><div class="room-actions"><button class="btn" id="nextBtn">'+r.action+'</button></div></div></div><div class="side-index"><span>'+r.number+'</span><div class="bar"><i style="--progress:'+(((current+1)/rooms.length)*100)+'%"></i></div><span>'+rooms.length+'</span></div>';
  document.getElementById('nextBtn').onclick = goNext;
}

function goNext(){
  current = (current + 1) % rooms.length;
  loadScene(current);
}

window.addEventListener('keydown', e=>{
  if(e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' '){ goNext(); }
});

front.addEventListener('canplay',()=>{ front.classList.add('active'); });
front.addEventListener('error',()=>{ showPoster(rooms[current]); front.classList.add('active'); });
back.addEventListener('error',()=>{ showPoster(rooms[current]); });

window.addEventListener('load',()=>{
  setTimeout(()=>{
    loading.classList.add('hide');
    prepareVideo(front, rooms[0]);
    updateUI(rooms[0]);
  },700);
});
