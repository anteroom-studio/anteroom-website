import { rooms } from '../data/rooms.js';

const root = document.getElementById('pov');
const loading = document.getElementById('loading');

const video = document.createElement('video');
video.className = 'scene-video active';
video.autoplay = true;
video.muted = true;
video.loop = true;
video.playsInline = true;
video.setAttribute('webkit-playsinline','');
video.preload = 'auto';
root.appendChild(video);

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

function setPresence(x, y){
  document.body.style.setProperty('--mx', x + 'px');
  document.body.style.setProperty('--my', y + 'px');
  cursor.style.left = x + 'px';
  cursor.style.top = y + 'px';
  const dx = (x / window.innerWidth - 0.5) * 10;
  const dy = (y / window.innerHeight - 0.5) * 8;
  video.style.setProperty('--driftX', dx + 'px');
  video.style.setProperty('--driftY', dy + 'px');
}
window.addEventListener('mousemove', e => setPresence(e.clientX, e.clientY));
setPresence(window.innerWidth/2, window.innerHeight/2);

function showPoster(r){
  root.style.backgroundImage = 'url("' + r.poster[0] + '")';
  root.style.backgroundSize = 'cover';
  root.style.backgroundPosition = 'center';
}

function playRoom(r){
  showPoster(r);
  video.poster = r.poster[0] || '';
  video.src = r.video[0];
  video.load();
  const p = video.play();
  if(p && p.catch){ p.catch(()=>{}); }
}

function loadScene(i){
  if(busy) return;
  busy = true;
  const r = rooms[i];
  veil.classList.add('in');
  sweep.classList.add('in');
  video.classList.add('pushing');

  setTimeout(()=>{
    playRoom(r);
    updateUI(r);
    video.classList.remove('pushing');
    veil.classList.remove('in');
    sweep.classList.remove('in');
    busy = false;
  }, 780);
}

function updateUI(r){
  let ui = document.getElementById('ui');
  if(!ui){ ui = document.createElement('div'); ui.id = 'ui'; root.appendChild(ui); }
  ui.innerHTML = '<div class="hud"><div class="room-copy"><div class="kicker">'+r.label+'</div><h1>'+r.title+'</h1><p>'+r.copy+'</p><div class="room-actions"><button class="btn" id="nextBtn">'+r.action+'</button></div></div></div><div class="side-index"><span>'+r.number+'</span><div class="bar"><i style="--progress:'+(((current+1)/rooms.length)*100)+'%"></i></div><span>'+rooms.length+'</span></div>';
  document.getElementById('nextBtn').onclick = ()=>{ current = (current + 1) % rooms.length; loadScene(current); };
}

video.addEventListener('canplay',()=>{ video.classList.add('active'); });
video.addEventListener('error',()=>{ showPoster(rooms[current]); video.classList.add('active'); });

window.addEventListener('load',()=>{
  setTimeout(()=>{
    loading.classList.add('hide');
    playRoom(rooms[0]);
    updateUI(rooms[0]);
  },700);
});
