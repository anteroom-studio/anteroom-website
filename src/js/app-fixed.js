import { rooms, archiveSlabs, researchDocs, corridorMaxims, studioStats, exitRoadmap } from '../data/rooms.js';

const root=document.getElementById('pov');
const loading=document.getElementById('loading');

let presence=0;
let lastMoveTime=Date.now();
document.addEventListener('mousemove',()=>{presence=1;lastMoveTime=Date.now();});
setInterval(()=>{
  if(Date.now()-lastMoveTime>1500)presence*=0.97;
  document.body.style.setProperty('--presence',presence.toFixed(3));
},60);

const studioSignals=[
  'mapping live systems...',
  'indexing research layers...',
  'tracking active builds...',
  'organizing archive records...',
  'awaiting inspection...'
];
let studioSignalIndex=0;
let currentSignals=studioSignals;
let signalLabel='Studio signal';
function rotateSignal(){
  const el=document.querySelector('.room-note span');
  if(el){
    el.classList.add('signal-shift');
    setTimeout(()=>{
      studioSignalIndex=(studioSignalIndex+1)%currentSignals.length;
      el.textContent=currentSignals[studioSignalIndex];
      el.classList.remove('signal-shift');
    },360);
  }
  const delay=(currentSignals===corridorMaxims)?5500:3200;
  setTimeout(rotateSignal,delay);
}
setTimeout(rotateSignal,3200);

function makeVideo(){
  const v=document.createElement('video');
  v.className='scene-video';
  v.autoplay=true;v.muted=true;v.loop=true;v.playsInline=true;v.preload='auto';
  v.setAttribute('webkit-playsinline','');
  v.removeAttribute('poster');v.poster='';
  root.appendChild(v);return v;
}

let front=makeVideo();
let back=makeVideo();
front.classList.add('active');

const travel=document.createElement('video');
travel.className='travel-video';
travel.muted=true;travel.playsInline=true;travel.preload='auto';travel.setAttribute('webkit-playsinline','');
travel.removeAttribute('poster');travel.poster='';
travel.style.cssText='position:fixed;inset:0;width:100vw;height:100vh;object-fit:cover;z-index:999999;background:#000;opacity:0;display:none;pointer-events:none;transition:opacity 100ms ease-out';
document.body.appendChild(travel);

const veil=document.createElement('div');veil.className='transition-veil';root.appendChild(veil);
const sweep=document.createElement('div');sweep.className='lens-sweep';root.appendChild(sweep);
const cursor=document.createElement('div');cursor.className='cursor';document.body.appendChild(cursor);
const mark=document.createElement('div');mark.className='studio-mark';mark.innerHTML='<i></i><span>Anteroom</span>';root.appendChild(mark);
const line=document.createElement('div');line.className='studio-line';line.textContent='Research and engineering studio / ZAI 2019';root.appendChild(line);
const slabLayer=document.createElement('div');slabLayer.className='slab-layer';root.appendChild(slabLayer);
const docLayer=document.createElement('div');docLayer.className='doc-layer';root.appendChild(docLayer);
const roadmapLayer=document.createElement('div');roadmapLayer.className='roadmap-layer';root.appendChild(roadmapLayer);
const statsLayer=document.createElement('div');statsLayer.id='studio-stats';statsLayer.className='studio-stats';root.appendChild(statsLayer);
const preloadVideo=document.createElement('video');preloadVideo.muted=true;preloadVideo.playsInline=true;preloadVideo.preload='auto';preloadVideo.style.cssText='display:none;position:absolute;left:-9999px';document.body.appendChild(preloadVideo);
let pdfActive=false;

const deepDive=document.createElement('div');
deepDive.id='deepDive';
deepDive.className='deep-dive';
deepDive.innerHTML='';
document.body.appendChild(deepDive);

root.style.background='#000';root.style.backgroundImage='none';

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
  currentX+=(targetX-currentX)*0.12;currentY+=(targetY-currentY)*0.12;
  document.body.style.setProperty('--mx',currentX+'px');
  document.body.style.setProperty('--my',currentY+'px');
  requestAnimationFrame(smoothLight);
}
smoothLight();

function safePlay(v){const p=v.play();if(p&&p.catch)p.catch(()=>{});}
function keepVideoAlive(v){
  v.loop=true;v.muted=true;v.playsInline=true;
  if(!v.src)return;
  if(v.ended||v.paused||v.readyState<2)safePlay(v);
}
setInterval(()=>{if(travel.style.display!=='block'&&!pdfActive)keepVideoAlive(front);},1200);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)setTimeout(()=>keepVideoAlive(front),250);});

function applyDrift(v,x,y){
  const dx=(x/innerWidth-.5)*10,dy=(y/innerHeight-.5)*8;
  v.style.setProperty('--driftX',dx+'px');v.style.setProperty('--driftY',dy+'px');
  slabLayer.style.setProperty('--sx',dx*-1.4+'px');slabLayer.style.setProperty('--sy',dy*-1.1+'px');
}
function setPresence(x,y){
  lastMove=Date.now();targetX=x;targetY=y;cursor.style.left=x+'px';cursor.style.top=y+'px';
  applyDrift(front,x,y);applyDrift(back,x,y);
}
addEventListener('mousemove',e=>setPresence(e.clientX,e.clientY));
setPresence(innerWidth/2,innerHeight/2);
setInterval(()=>{if(Date.now()-lastMove<1500)return;const t=Date.now()/1600;applyDrift(front,innerWidth/2+Math.sin(t)*34,innerHeight/2+Math.cos(t*.7)*22);},80);

function prepareVideo(v,r,autoplay=true){
  root.style.backgroundImage='none';
  v.removeAttribute('poster');v.poster='';v.loop=true;v.muted=true;v.playsInline=true;
  const url=new URL(r.video[0],location.href).href;
  if(v.src!==url){v.src=r.video[0];v.load();}
  if(autoplay)safePlay(v);
}

function swapVideos(){
  const old=front;front=back;back=old;
  back.className='scene-video';back.removeAttribute('poster');back.poster='';back.style.opacity='';back.style.transition='';back.pause();
  front.classList.add('active');front.style.opacity='';front.style.transition='';
}

function closeInspection(){
  inspecting=false;slabLayer.classList.remove('inspecting');
  slabLayer.querySelectorAll('.artifact-slab').forEach(el=>el.classList.remove('active'));
  docLayer.classList.remove('inspecting');
  docLayer.querySelectorAll('.research-doc').forEach(el=>el.classList.remove('active'));
  roadmapLayer.classList.remove('inspecting');
  roadmapLayer.querySelectorAll('.roadmap-item').forEach(el=>el.classList.remove('active'));
}

function repoList(data, cls){
  return (data.repos||[]).map(r=>'<li><b>'+r.name+'</b><span>'+r.desc+'</span></li>').join('');
}

function openDeepDive(data){
  const repos=repoList(data,'deep-repos');
  deepDive.innerHTML='<button class="deep-close" aria-label="Close">×</button><div class="deep-card"><div class="deep-id">'+data.id+'</div><h2>'+data.title+'</h2><div class="deep-signal">'+(data.signal||'System record')+'</div><p>'+data.desc+'</p>'+(repos?'<ul class="deep-repos">'+repos+'</ul>':'')+'<div class="deep-command">→ '+(data.command||'Access record')+'</div></div>';
  deepDive.classList.add('open');
}

function openDocDive(d){
  const isFile=!!d.file;
  const stateSlug=(d.state||'').toLowerCase().replace(/\s+/g,'-');
  const head='<div class="deep-id">'+d.id+' · '+(d.type||'Document')+'</div>'+
    '<h2>'+d.title+'</h2>'+
    '<div class="deep-state state-'+stateSlug+'">'+d.state+'</div>'+
    '<div class="deep-signal">'+(d.signal||'')+'</div>';
  const body=isFile
    ? '<div class="deep-pdf"><iframe src="'+d.file+'#toolbar=1&navpanes=0&view=FitH" title="'+d.title+'" loading="lazy"></iframe></div>'+
      '<div class="deep-doc-meta">'+(d.pages?'<span>'+d.pages+' pages</span>':'')+(d.revised?'<span>revised '+d.revised+'</span>':'')+'</div>'
    : '<p class="deep-held">'+(d.desc||'')+'</p>'+
      '<div class="deep-seal">— this chamber is sealed —</div>'+
      (d.revised?'<div class="deep-doc-meta"><span>last revised '+d.revised+'</span></div>':'');
  deepDive.innerHTML='<button class="deep-close" aria-label="Close">×</button>'+
    '<div class="deep-card deep-card--doc '+(isFile?'is-released':'is-sealed')+'">'+head+body+'</div>';
  deepDive.classList.add('open');
  if(isFile){pdfActive=true;try{front.pause();back.pause();}catch(e){}}
}

function mountThreshold(show){
  if(!show){statsLayer.classList.remove('show');return;}
  statsLayer.innerHTML=
    '<div><span class="stat-label">Founded</span><span class="stat-value">'+studioStats.founded+'</span></div>'+
    '<div><span class="stat-label">Systems</span><span class="stat-value">'+studioStats.systems+'</span></div>'+
    '<div><span class="stat-label">Records</span><span class="stat-value">'+studioStats.records+'</span></div>'+
    '<div><span class="stat-label">Documents</span><span class="stat-value">'+studioStats.documents+'</span></div>'+
    '<div><span class="stat-label">Rooms</span><span class="stat-value">'+rooms.length+'</span></div>';
  requestAnimationFrame(()=>statsLayer.classList.add('show'));
}

function mountExit(show){
  if(!show){roadmapLayer.classList.remove('show');roadmapLayer.innerHTML='';return;}
  roadmapLayer.innerHTML=exitRoadmap.map((r,i)=>{
    const stateSlug=(r.state||'').toLowerCase().replace(/\s+/g,'-');
    const isNow=r.state==='Now';
    return '<button class="roadmap-item'+(isNow?' is-now':'')+' item-'+i+'" data-i="'+i+'" data-state="'+r.state+'">'+
      '<span class="roadmap-spine" aria-hidden="true"></span>'+
      '<div class="roadmap-top"><span class="roadmap-id">'+r.id+'</span><span class="roadmap-state state-'+stateSlug+'">'+r.state+'</span></div>'+
      '<strong>'+r.title+'</strong>'+
      '<small>'+r.signal+(r.eta?' · '+r.eta:'')+'</small>'+
      '<p>'+r.desc+'</p>'+
    '</button>';
  }).join('');
  requestAnimationFrame(()=>roadmapLayer.classList.add('show'));
  roadmapLayer.querySelectorAll('.roadmap-item').forEach(el=>{
    el.onclick=e=>{
      e.stopPropagation();
      const i=Number(el.dataset.i);
      const item=exitRoadmap[i];
      if(!item)return;
      inspecting=true;
      roadmapLayer.classList.add('inspecting');
      el.classList.add('active');
      const stateSlug=(item.state||'').toLowerCase().replace(/\s+/g,'-');
      deepDive.innerHTML='<button class="deep-close" aria-label="Close">×</button>'+
        '<div class="deep-card deep-card--roadmap state-'+stateSlug+'">'+
          '<div class="deep-id">'+item.id+' · '+item.state+'</div>'+
          '<h2>'+item.title+'</h2>'+
          '<div class="deep-signal">'+(item.signal||'')+'</div>'+
          '<p class="deep-held">'+(item.desc||'')+'</p>'+
          '<div class="deep-doc-meta"><span>ETA · '+item.eta+'</span></div>'+
        '</div>';
      deepDive.classList.add('open');
    };
  });
}

function preloadNext(idx){
  const ni=(idx+1)%rooms.length;
  const nr=rooms[ni];
  if(!nr||!nr.video||!nr.video[0])return;
  const url=new URL(nr.video[0],location.href).href;
  if(preloadVideo.src===url)return;
  preloadVideo.src=nr.video[0];
  preloadVideo.load();
}

function renderDocs(show){
  if(!show){docLayer.classList.remove('show');docLayer.innerHTML='';return;}
  docLayer.innerHTML=researchDocs.map((d,i)=>{
    const stateSlug=(d.state||'').toLowerCase().replace(/\s+/g,'-');
    const released=!!d.file;
    return '<button class="research-doc doc-'+i+(released?' is-released':'')+'" data-i="'+i+'" data-state="'+d.state+'">'+
      '<span class="doc-seal" aria-hidden="true"></span>'+
      '<span class="doc-spine" aria-hidden="true"></span>'+
      '<span class="doc-light" aria-hidden="true"></span>'+
      '<div class="doc-top"><span class="doc-id">'+d.id+'</span><span class="doc-state state-'+stateSlug+'">'+d.state+'</span></div>'+
      '<strong>'+d.title+'</strong>'+
      '<small>'+d.type+(d.pages?' · '+d.pages+' pages':'')+'</small>'+
      '<em>'+(d.signal||'')+'</em>'+
      '<p>'+d.desc+'</p>'+
      '<span class="doc-cta">'+(released?'Open document →':'Held')+'</span>'+
    '</button>';
  }).join('');
  requestAnimationFrame(()=>docLayer.classList.add('show'));
  docLayer.querySelectorAll('.research-doc').forEach(el=>{
    el.onclick=e=>{
      e.stopPropagation();
      const i=Number(el.dataset.i);
      const d=researchDocs[i];
      if(!d)return;
      inspecting=true;
      docLayer.classList.add('inspecting');
      el.classList.add('active');
      openDocDive(d);
    };
  });
}

function closeDeepDive(){
  deepDive.classList.remove('open');
  closeInspection();
  if(pdfActive){pdfActive=false;setTimeout(()=>keepVideoAlive(front),60);}
}

deepDive.addEventListener('click',e=>{if(e.target===deepDive||e.target.classList.contains('deep-close'))closeDeepDive();});

function renderSlabs(show){
  closeInspection();
  if(!show){slabLayer.classList.remove('show');slabLayer.innerHTML='';return;}
  const center='<div class="archive-center-signal"><span>systems</span><span>records</span><span>signals</span><span>execution</span></div>';
  const slabs=archiveSlabs.map((s,i)=>{
    const repos=repoList(s,'slab-repos');
    return '<button class="artifact-slab slab-'+i+'" data-i="'+i+'"><div class="slab-top"><span class="slab-id">'+s.id+'</span><span class="slab-state">'+s.state+'</span></div><strong>'+s.title+'</strong><small>'+s.type+'</small><em>'+s.signal+'</em><p>'+s.desc+'</p>'+(repos?'<ul class="slab-repos">'+repos+'</ul>':'')+'<span class="slab-command">'+s.command+'</span></button>';
  }).join('');
  slabLayer.innerHTML=center+slabs;
  requestAnimationFrame(()=>slabLayer.classList.add('show'));
  slabLayer.querySelectorAll('.artifact-slab').forEach(el=>{
    el.onclick=e=>{
      e.stopPropagation();
      const i=Number(el.dataset.i);
      if(!archiveSlabs[i])return;
      inspecting=true;
      slabLayer.classList.add('inspecting');
      el.classList.add('active');
      openDeepDive(archiveSlabs[i]);
    };
  });
}
addEventListener('click',()=>{if(inspecting&&!deepDive.classList.contains('open'))closeInspection();});
addEventListener('keydown',e=>{if(e.key==='Escape'){if(deepDive.classList.contains('open'))closeDeepDive();else if(inspecting)closeInspection();}});

function loadScene(i,force=false){
  if(busy&&!force)return;busy=true;
  const r=rooms[i],oldCopy=document.querySelector('.room-copy');if(oldCopy)oldCopy.classList.add('out');
  closeDeepDive();renderSlabs(false);prepareVideo(back,r,true);veil.classList.add('in');sweep.classList.add('in');front.classList.add('pushing');
  setTimeout(()=>{back.classList.add('active');front.classList.add('leaving');},180);
  setTimeout(()=>{swapVideos();updateUI(r);renderSlabs(r.id==='archive');renderDocs(r.id==='research');mountExit(r.id==='exit');mountThreshold(r.id==='threshold');keepVideoAlive(front);front.classList.remove('pushing');veil.classList.remove('in');sweep.classList.remove('in');busy=false;setTimeout(()=>preloadNext(i),900);},860);
}

function blendIntoScene(nextIndex){
  const r=rooms[nextIndex];
  closeDeepDive();renderSlabs(false);prepareVideo(back,r,true);
  back.classList.add('active');back.style.opacity='0';back.style.transition='opacity 160ms ease-out';
  front.style.transition='opacity 160ms ease-out';
  requestAnimationFrame(()=>{back.style.opacity='1';front.style.opacity='0';setTimeout(()=>{swapVideos();updateUI(r);renderSlabs(r.id==='archive');renderDocs(r.id==='research');mountExit(r.id==='exit');mountThreshold(r.id==='threshold');keepVideoAlive(front);front.classList.remove('pushing');front.classList.remove('leaving');busy=false;setTimeout(()=>preloadNext(nextIndex),900);},180);});
}

function playTravelTransition(nextIndex,src){
  if(busy)return;busy=true;
  let finished=false;
  const nextRoom=rooms[nextIndex],oldCopy=document.querySelector('.room-copy');
  if(oldCopy)oldCopy.classList.add('out');
  closeDeepDive();renderSlabs(false);front.classList.add('pushing');targetX=innerWidth/2;targetY=innerHeight/2;
  prepareVideo(back,nextRoom,false);
  travel.pause();travel.removeAttribute('poster');travel.poster='';travel.src=src;travel.load();travel.currentTime=0;
  travel.style.display='block';travel.style.opacity='0';travel.style.transition='opacity 100ms ease-out';
  function finishTravel(){if(finished)return;finished=true;travel.pause();travel.style.opacity='0';setTimeout(()=>{travel.style.display='none';blendIntoScene(nextIndex);},90);}
  const fallbackTimer=setTimeout(finishTravel,8200);
  travel.onended=()=>{clearTimeout(fallbackTimer);finishTravel();};
  requestAnimationFrame(()=>{const p=travel.play();if(p&&p.catch)p.catch(()=>{clearTimeout(fallbackTimer);finishTravel();});requestAnimationFrame(()=>{travel.style.opacity='1';});});
}

function updateUI(r){
  ['threshold','corridor','archive','research','exit'].forEach(m=>document.body.classList.toggle(m+'-mode',r.id===m));
  document.title='Anteroom — '+r.title;
  if(r.id==='corridor'){currentSignals=corridorMaxims;signalLabel='Operating principle';}
  else{currentSignals=studioSignals;signalLabel='Studio signal';}
  studioSignalIndex=0;
  if(r.id!=='exit')mountExit(false);
  if(r.id!=='threshold')mountThreshold(false);
  let ui=document.getElementById('ui');if(!ui){ui=document.createElement('div');ui.id='ui';root.appendChild(ui);}
  ui.innerHTML='<div class="hud"><div class="room-copy"><div class="kicker">'+r.label+'</div><h1>'+r.title+'</h1><p>'+r.copy+'</p><div class="room-actions"><button class="btn" id="nextBtn">'+r.action+'</button></div></div></div><div class="side-index"><span>'+r.number+'</span><div class="bar"><i style="--progress:'+((current+1)/rooms.length)*100+'%"></i></div><span>'+rooms.length+'</span></div><div class="room-note"><b>'+signalLabel+'</b><span>'+currentSignals[studioSignalIndex]+'</span></div>';
  document.getElementById('nextBtn').onclick=goNext;
  requestAnimationFrame(()=>{const copy=document.querySelector('.room-copy');if(copy)copy.classList.add('show');});
}

function goPrev(){
  if(deepDive.classList.contains('open')){closeDeepDive();return;}
  if(inspecting){closeInspection();return;}
  if(busy)return;
  current=(current-1+rooms.length)%rooms.length;
  loadScene(current,true);
}

function goNext(){
  if(deepDive.classList.contains('open')){closeDeepDive();return;}
  if(inspecting){closeInspection();return;}
  const from=rooms[current],nextIndex=(current+1)%rooms.length,to=rooms[nextIndex],travelSrc=travelMap[from.id+':'+to.id];
  current=nextIndex;
  if(travelSrc)playTravelTransition(nextIndex,travelSrc);else loadScene(nextIndex);
}

addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowDown'||e.key==='Enter'||e.key===' '){e.preventDefault();goNext();}if(e.key==='ArrowLeft'||e.key==='ArrowUp'||e.key==='Backspace'){e.preventDefault();goPrev();}});
front.addEventListener('canplay',()=>{front.classList.add('active');keepVideoAlive(front);});
front.addEventListener('ended',()=>{front.currentTime=0;keepVideoAlive(front);});
front.addEventListener('pause',()=>{if(travel.style.display!=='block')keepVideoAlive(front);});
front.addEventListener('error',()=>{front.classList.add('active');});
back.addEventListener('canplay',()=>{back.loop=true;});
back.addEventListener('ended',()=>{back.currentTime=0;keepVideoAlive(back);});
back.addEventListener('error',()=>{});

// === Scroll & swipe navigation (vertical or horizontal, debounced) ===
let navLock=false;
function lockNav(ms){navLock=true;setTimeout(()=>{navLock=false;},ms||960);}
function isInScrollable(el){
  while(el&&el!==document.body){
    if(el.classList&&(el.classList.contains('slab-layer')||el.classList.contains('doc-layer')||el.classList.contains('roadmap-layer')||el.classList.contains('deep-dive')||el.classList.contains('deep-card')))return true;
    const cs=getComputedStyle(el);
    if((cs.overflowY==='auto'||cs.overflowY==='scroll')&&el.scrollHeight>el.clientHeight)return true;
    el=el.parentElement;
  }
  return false;
}
function navBlocked(target){
  if(navLock||busy)return true;
  if(loading&&loading.classList&&!loading.classList.contains('hide'))return true;
  if(deepDive.classList.contains('open'))return true;
  if(inspecting)return true;
  if(target&&isInScrollable(target))return true;
  return false;
}

addEventListener('wheel',e=>{
  if(navBlocked(e.target))return;
  const dy=e.deltaY,dx=e.deltaX;
  if(Math.abs(dy)<24&&Math.abs(dx)<24)return;
  if(Math.abs(dy)>=Math.abs(dx)){if(dy>0)goNext();else goPrev();}
  else{if(dx>0)goNext();else goPrev();}
  lockNav(960);
},{passive:true});

let _tsy=0,_tsx=0,_tt=0;
addEventListener('touchstart',e=>{
  const t=e.touches[0];_tsy=t.clientY;_tsx=t.clientX;_tt=Date.now();
},{passive:true});
addEventListener('touchend',e=>{
  if(navBlocked(e.target))return;
  if(Date.now()-_tt>720)return;
  const t=e.changedTouches[0];
  const dy=_tsy-t.clientY,dx=_tsx-t.clientX;
  const TH=64;
  if(Math.abs(dy)<TH&&Math.abs(dx)<TH)return;
  if(Math.abs(dy)>=Math.abs(dx)){if(dy>0)goNext();else goPrev();}
  else{if(dx>0)goNext();else goPrev();}
  lockNav(960);
},{passive:true});

addEventListener('load',()=>{
  prepareVideo(front,rooms[0],true);
  updateUI(rooms[0]);
  if(rooms[0].id==='threshold')mountThreshold(true);
  let canPlay=false,minElapsed=false,revealed=false;
  const tryReveal=()=>{
    if(revealed||!canPlay||!minElapsed)return;
    revealed=true;
    loading.classList.add('hide');
    setTimeout(()=>preloadNext(0),900);
  };
  front.addEventListener('canplay',()=>{canPlay=true;tryReveal();},{once:true});
  setTimeout(()=>{minElapsed=true;tryReveal();},800);
  setTimeout(()=>{canPlay=true;minElapsed=true;tryReveal();},5500);
});
