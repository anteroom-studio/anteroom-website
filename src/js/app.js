import { rooms, archiveSlabs } from '../data/rooms.js';

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

const slabLayer = document.createElement('div');
slabLayer.className = 'slab-layer';
root.appendChild(slabLayer);

let inspecting = false;

function renderSlabs(show){
  if(!show){ slabLayer.classList.remove('show'); return; }

  slabLayer.innerHTML = archiveSlabs.map((s,i)=>
    '<button class="artifact-slab slab-'+i+'" data-i="'+i+'">'+
    '<b>'+s.id+'</b><strong>'+s.title+'</strong><small>'+s.type+' / '+s.state+'</small></button>'
  ).join('');

  requestAnimationFrame(()=>slabLayer.classList.add('show'));

  slabLayer.querySelectorAll('.artifact-slab').forEach(el=>{
    el.onclick=(e)=>{
      e.stopPropagation();
      if(inspecting) return;
      inspecting=true;
      slabLayer.classList.add('inspecting');
      el.classList.add('active');
    };
  });
}

window.addEventListener('click',()=>{
  if(!inspecting) return;
  inspecting=false;
  slabLayer.classList.remove('inspecting');
  slabLayer.querySelectorAll('.artifact-slab').forEach(el=>el.classList.remove('active'));
});

window.addEventListener('keydown',e=>{
  if(e.key==='Escape' && inspecting){
    inspecting=false;
    slabLayer.classList.remove('inspecting');
    slabLayer.querySelectorAll('.artifact-slab').forEach(el=>el.classList.remove('active'));
  }
});

window.addEventListener('load',()=>{
  setTimeout(()=>{
    loading.classList.add('hide');
    renderSlabs(true);
  },600);
});
