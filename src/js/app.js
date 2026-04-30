import { rooms } from '../data/rooms.js';

const root = document.getElementById('pov');
const loading = document.getElementById('loading');

const video = document.createElement('video');
video.className = 'scene-video';
video.autoplay = true;
video.muted = true;
video.loop = true;
video.playsInline = true;
root.appendChild(video);

const veil = document.createElement('div');
veil.className = 'transition-veil';
root.appendChild(veil);

let current = 0;

function loadScene(i){
  const r = rooms[i];
  veil.classList.add('in');
  video.classList.add('dim');

  setTimeout(()=>{
    video.src = r.video[0];
    video.play();

    video.classList.remove('dim');
    veil.classList.remove('in');

    updateUI(r);
  },700);
}

function updateUI(r){
  let ui = document.getElementById('ui');
  if(!ui){
    ui = document.createElement('div');
    ui.id = 'ui';
    root.appendChild(ui);
  }

  ui.innerHTML = '<div class="hud"><div class="room-copy"><div class="kicker">'+r.label+'</div><h1>'+r.title+'</h1><p>'+r.copy+'</p><div class="room-actions"><button class="btn" id="nextBtn">'+r.action+'</button></div></div></div>';

  document.getElementById('nextBtn').onclick = ()=>{
    current = (current + 1) % rooms.length;
    loadScene(current);
  };
}

window.addEventListener('load',()=>{
  setTimeout(()=>{
    loading.classList.add('hide');
    loadScene(0);
  },1000);
});
