import { rooms } from '../data/rooms.js';

const video = document.createElement('video');
video.autoplay = true;
video.muted = true;
video.loop = true;
video.playsInline = true;
video.style.position = 'fixed';
video.style.inset = '0';
video.style.width = '100%';
video.style.height = '100%';
video.style.objectFit = 'cover';
document.body.appendChild(video);

let current = 0;

function pick(list){
  for (const p of list) {
    const v = document.createElement('video');
    v.src = p;
    if (v.canPlayType('video/mp4')) return p;
  }
  return list[0];
}

function load(i){
  const r = rooms[i];
  video.style.opacity = 0;
  setTimeout(()=>{
    video.src = pick(r.video);
    video.play();
    video.style.opacity = 1;
    document.querySelector('#title').innerText = r.title;
    document.querySelector('#desc').innerText = r.copy;
  },600);
}

window.next = function(){
  current = (current + 1) % rooms.length;
  load(current);
}

window.addEventListener('load',()=>{
  const ui = document.createElement('div');
  ui.innerHTML = `
    <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;color:#e8e1d4">
      <h1 id="title"></h1>
      <p id="desc"></p>
      <button onclick="next()" style="padding:12px 28px;background:#c9a961;border:none;margin-top:20px">Continue</button>
    </div>
  `;
  document.body.appendChild(ui);
  load(0);
});
