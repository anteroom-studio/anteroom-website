import { rooms, archiveSlabs } from '../data/rooms.js';

const root = document.getElementById('pov');
const loading = document.getElementById('loading');

function makeVideo(){
  const v=document.createElement('video');
  v.className='scene-video';
  v.autoplay=true;v.muted=true;v.loop=true;v.playsInline=true;v.preload='auto';
  v.setAttribute('webkit-playsinline','');
  root.appendChild(v);
  return v;
}

let front=makeVideo();
let back=makeVideo();
front.classList.add('active');

const travel=document.createElement('video');
travel.className='travel-video';
travel.muted=true;travel.playsInline=true;travel.preload='auto';
travel.setAttribute('webkit-playsinline','');
travel.style.cssText='position:fixed;inset:0;width:100vw;height:100vh;object-fit:cover;z-index:999999;background:#000;opacity:0;display:none;pointer-events:none;transition:opacity 180ms ease';
document.body.appendChild(travel);

const veil=document.createElement('div');veil.className='transition-veil';root.appendChild(veil);
const sweep=document.createElement('div');sweep.className='lens-sweep';root.appendChild(sweep);
const cursor=document.createElement('div');cursor.className='cursor';document.body.appendChild(cursor);
const mark=document.createElement('div');mark.className='studio-mark';mark.innerHTML='<i></i><span>Anteroom</span>';root.appendChild(mark);
const line=document.createElement('div');line.className='studio-line';line.textContent='Research and engineering studio / ZAI 2019';root.appendChild(line);
const slabLayer=document.createElement('div');slabLayer.className='slab-layer';root.appendChild(slabLayer);

root.style.background='#000';

let current=0,busy=false,inspecting=false,lastMove=Date.now();
let targetX=innerWidth/2,targetY=innerHeight/2,currentX=targetX,currentY=targetY;

const travelMap={
  'threshold:corridor':'assets/videos/transition_threshold_to_passage.mp4',
  'corridor:archive':'assets/videos/transition_passage_to_archive.mp4',
  'archive:research':'assets/videos/transition_archive_to_chamber.mp4',
  'research:exit':'assets/videos/transition_chamber_to_last.mp4',
  'exit:threshold':'assets/videos/transition_last_to_threshold.mp4'
};

function smoothLight(){
  currentX+=(targetX-currentX)*0.12;
  currentY+=(targetY-currentY)*0.12;
  document.body.style.setProperty('--mx',currentX+'px');
  document.body.style.setProperty('--my',currentY+'px');
  requestAnimationFrame(smoothLight);
}
smoothLight();

function keepVideoAlive(v){
  v.loop=true;v.muted=true;v.playsInline=true;
  if(!v.src)return;
  if(v.ended||v.paused||v.readyState<2){const p=v.play();if(p&&p.catch)p.catch(()=>{});}
}
setInterval(()=>{if(travel.style.display!=='block')keepVideoAlive(front);},1200);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)setTimeout(()=>keepVideoAlive(front),250);});

function applyDrift(v,x,y){
  const dx=(x/innerWidth-.5)*10,dy=(y/innerHeight-.5)*8;
  v.style.setProperty('--driftX',dx+'px');
  v.style.setProperty('--driftY',dy+'px');
  slabLayer.style.setProperty('--sx',dx*-1.4+'px');
  slabLayer.style.setProperty('--sy',dy*-1.1+'px');
}
function setPresence(x,y){
  lastMove=Date.now();targetX=x;targetY=y;
  cursor.style.left=x+'px';cursor.style.top=y+'px';
  applyDrift(front,x,y);applyDrift(back,x,y);
}
addEventListener('mousemove',e=>setPresence(e.clientX,e.clientY));
setPresence(innerWidth/2,innerHeight/2);
setInterval(()=>{if(Date.now()-lastMove<1500)return;const t=Date.now()/1600;applyDrift(front,innerWidth/2+Math.sin(t)*34,innerHeight/2+Math.cos(t*.7)*22);},80);

function prepareVideo(v,r){
  root.style.backgroundImage='none';
  v.removeAttribute('poster');
  v.poster='';
  v.loop=true;v.muted=true;v.playsInline=true;v.src=r.video[0];v.load();
  const p=v.play();if(p&&p.catch)p.catch(()=>{});
}
function swapVideos(){const old=front;front=back;back=old;back.className='scene-video';back.removeAttribute('poster');back.poster='';back.pause();}
function closeInspection(){inspecting=false;slabLayer.classList.remove('inspecting');slabLayer.querySelectorAll('.artifact-slab').forEach(el=>el.classList.remove('active'));}
function renderSlabs(show){
  closeInspection();
  if(!show){slabLayer.classList.remove('show');return;}
  slabLayer.innerHTML=archiveSlabs.map((s,i)=>'<button class="artifact-slab slab-'+i+'" data-i="'+i+'"><b>'+s.id+'</b><strong>'+s.title+'</strong><small>'+s.type+' / '+s.state+'</small></button>').join('');
  requestAnimationFrame(()=>slabLayer.classList.add('show'));
  slabLayer.querySelectorAll('.artifact-slab').forEach(el=>{el.onclick=e=>{e.stopPropagation();if(inspecting)return;inspecting=true;slabLayer.classList.add('inspecting');el.classList.add('active');};});
}
addEventListener('click',()=>{if(inspecting)closeInspection();});
addEventListener('keydown',e=>{if(e.key==='Escape'&&inspecting)closeInspection();});

function loadScene(i,force=false){
  if(busy&&!force)return;busy=true;
  const r=rooms[i],oldCopy=document.querySelector('.room-copy');
  if(oldCopy)oldCopy.classList.add('out');
  renderSlabs(false);prepareVideo(back,r);veil.classList.add('in');sweep.classList.add('in');front.classList.add('pushing');
  setTimeout(()=>{back.classList.add('active');front.classList.add('leaving');},180);
  setTimeout(()=>{swapVideos();updateUI(r);renderSlabs(r.id==='archive');keepVideoAlive(front);front.classList.remove('pushing');veil.classList.remove('in');sweep.classList.remove('in');busy=false;},860);
}
function arriveScene(i){
  const r=rooms[i];renderSlabs(false);prepareVideo(back,r);back.classList.add('active');front.classList.add('leaving');
  setTimeout(()=>{swapVideos();updateUI(r);renderSlabs(r.id==='archive');keepVideoAlive(front);front.classList.remove('pushing');front.classList.remove('leaving');busy=false;},260);
}
function playTravelTransition(nextIndex,src){
  if(busy)return;busy=true;let finished=false;
  const oldCopy=document.querySelector('.room-copy');if(oldCopy)oldCopy.classList.add('out');
  renderSlabs(false);front.classList.add('pushing');targetX=innerWidth/2;targetY=innerHeight/2;
  setTimeout(()=>{
    travel.pause();travel.removeAttribute('poster');travel.poster='';travel.src=src;travel.load();travel.currentTime=0;travel.style.display='block';travel.style.opacity='0';travel.style.transition='opacity 180ms ease';
    requestAnimationFrame(()=>{travel.style.opacity='1';});
    function finishTravel(){if(finished)return;finished=true;travel.pause();travel.style.opacity='0';setTimeout(()=>{travel.style.display='none';},220);setTimeout(()=>{arriveScene(nextIndex);},180);}
    const fallbackTimer=setTimeout(finishTravel,8200);
    travel.onended=()=>{clearTimeout(fallbackTimer);finishTravel();};
    const p=travel.play();if(p&&p.catch)p.catch(()=>{clearTimeout(fallbackTimer);finishTravel();});
  },220);
}
function updateUI(r){
  if(r.id==='archive')document.body.classList.add('archive-mode');else document.body.classList.remove('archive-mode');
  let ui=document.getElementById('ui');if(!ui){ui=document.createElement('div');ui.id='ui';root.appendChild(ui);}
  ui.innerHTML='<div class="hud"><div class="room-copy"><div class="kicker">'+r.label+'</div><h1>'+r.title+'</h1><p>'+r.copy+'</p><div class="room-actions"><button class="btn" id="nextBtn">'+r.action+'</button></div></div></div><div class="side-index"><span>'+r.number+'</span><div class="bar"><i style="--progress:'+((current+1)/rooms.length)*100+'%"></i></div><span>'+rooms.length+'</span></div><div class="room-note"><b>Studio record</b><span>The interface reveals only what the room is ready to show.</span></div>';
  document.getElementById('nextBtn').onclick=goNext;
  requestAnimationFrame(()=>{const copy=document.querySelector('.room-copy');if(copy)copy.classList.add('show');});
}
function goNext(){
  if(inspecting){closeInspection();return;}
  const from=rooms[current],nextIndex=(current+1)%rooms.length,to=rooms[nextIndex],travelSrc=travelMap[from.id+':'+to.id];
  current=nextIndex;
  if(travelSrc)playTravelTransition(nextIndex,travelSrc);else loadScene(nextIndex);
}
addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='Enter'||e.key===' ')goNext();});
front.addEventListener('canplay',()=>{front.classList.add('active');keepVideoAlive(front);});
front.addEventListener('ended',()=>{front.currentTime=0;keepVideoAlive(front);});
front.addEventListener('pause',()=>{if(travel.style.display!=='block')keepVideoAlive(front);});
front.addEventListener('error',()=>{front.classList.add('active');});
back.addEventListener('canplay',()=>{back.loop=true;});
back.addEventListener('ended',()=>{back.currentTime=0;keepVideoAlive(back);});
back.addEventListener('error',()=>{});
addEventListener('load',()=>{setTimeout(()=>{loading.classList.add('hide');prepareVideo(front,rooms[0]);updateUI(rooms[0]);},700);});
