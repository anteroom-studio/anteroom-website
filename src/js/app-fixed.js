import { rooms, archiveSlabs } from '../data/rooms.js';

const root = document.getElementById('pov');
const loading = document.getElementById('loading');

function makeVideo(){
  const v=document.createElement('video');
  v.className='scene-video';
  v.autoplay=true;
  v.muted=true;
  v.loop=true;
  v.playsInline=true;
  v.preload='auto';
  v.removeAttribute('poster');
  v.poster='';
  root.appendChild(v);
  return v;
}

let front=makeVideo();
let back=makeVideo();
front.classList.add('active');

const travel=document.createElement('video');
travel.className='travel-video';
travel.muted=true;
travel.playsInline=true;
travel.preload='auto';
travel.style.cssText='position:fixed;inset:0;width:100vw;height:100vh;object-fit:cover;z-index:999999;background:#000;opacity:0;display:none;pointer-events:none;transition:opacity 100ms ease-out';
document.body.appendChild(travel);

root.style.background='#000';

let current=0;
let busy=false;

const travelMap={
  'threshold:corridor':'assets/videos/transition_threshold_to_passage.mp4',
  'corridor:archive':'assets/videos/transition_passage_to_archive.mp4',
  'archive:research':'assets/videos/transition_archive_to_chamber.mp4',
  'research:exit':'assets/videos/transition_chamber_to_last.mp4',
  'exit:threshold':'assets/videos/transition_last_to_threshold.mp4'
};

function prepareVideo(v,r,auto=true){
  v.removeAttribute('poster');
  v.poster='';
  v.src=r.video[0];
  v.load();

  if(auto){
    const p=v.play();
    if(p&&p.catch)p.catch(()=>{});
  }
}

function swapVideos(){
  const old=front;
  front=back;
  back=old;
  back.pause();
}

function blendScene(nextIndex){
  const r=rooms[nextIndex];

  prepareVideo(back,r,true);

  back.style.opacity='0';
  back.classList.add('active');

  requestAnimationFrame(()=>{
    back.style.transition='opacity 160ms ease';
    front.style.transition='opacity 160ms ease';

    back.style.opacity='1';
    front.style.opacity='0';

    setTimeout(()=>{
      swapVideos();
      front.style.opacity='1';
      front.style.transition='none';
      busy=false;
    },180);
  });
}

function playTravel(nextIndex,src){
  if(busy)return;
  busy=true;

  const nextRoom=rooms[nextIndex];
  prepareVideo(back,nextRoom,false);

  travel.src=src;
  travel.load();
  travel.currentTime=0;
  travel.style.display='block';
  travel.style.opacity='0';

  requestAnimationFrame(()=>{
    const p=travel.play();
    if(p&&p.catch)p.catch(()=>finish());

    requestAnimationFrame(()=>{
      travel.style.opacity='1';
    });
  });

  function finish(){
    travel.pause();
    travel.style.opacity='0';

    setTimeout(()=>{
      travel.style.display='none';
      blendScene(nextIndex);
    },90);
  }

  travel.onended=finish;
  setTimeout(finish,8000);
}

function goNext(){
  const nextIndex=(current+1)%rooms.length;
  const from=rooms[current];
  const to=rooms[nextIndex];

  const src=travelMap[from.id+':'+to.id];
  current=nextIndex;

  if(src) playTravel(nextIndex,src);
  else blendScene(nextIndex);
}

document.addEventListener('click',goNext);

window.addEventListener('load',()=>{
  setTimeout(()=>{
    loading.classList.add('hide');
    prepareVideo(front,rooms[0],true);
  },500);
});
