export function boot(){
  document.querySelector('.loader')?.classList.add('hide');
  const progress=document.querySelector('.progress');
  const cursor=document.querySelector('.cursor');
  window.addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-innerHeight; if(progress)progress.style.width=(scrollY/h*100)+'%'; parallax();},{passive:true});
  window.addEventListener('mousemove',e=>{if(cursor){cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'}});
  document.querySelectorAll('a,button,.artifact-card').forEach(el=>{el.addEventListener('mouseenter',()=>cursor?.classList.add('big'));el.addEventListener('mouseleave',()=>cursor?.classList.remove('big'))});
  observe(); setupNav(); setupVideoFallbacks();
}
function observe(){
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.13});
  document.querySelectorAll('.reveal,.manifesto-lines span').forEach(el=>io.observe(el));
}
function parallax(){
  document.querySelectorAll('[data-speed]').forEach(el=>{const r=el.getBoundingClientRect(); const s=parseFloat(el.dataset.speed||0); if(r.bottom>0&&r.top<innerHeight) el.style.transform=`translate3d(0,${r.top*s}px,0)`});
}
function setupNav(){
 const btn=document.querySelector('.mobile-open'); const links=document.querySelector('.nav-links'); btn?.addEventListener('click',()=>links?.classList.toggle('open'));
 const path=location.pathname.split('/').filter(Boolean).pop()?.replace('.html','')||'home';
 document.querySelectorAll('.nav-links a').forEach(a=>{const href=a.getAttribute('href')||''; if((path==='home'&&href.includes('index'))||href.includes(path))a.classList.add('active')});
}
function setupVideoFallbacks(){document.querySelectorAll('video').forEach(v=>{v.muted=true;v.playsInline=true;v.play().catch(()=>{});});}
export function mountArchive(artifacts,categories){
 const filterBox=document.querySelector('[data-filters]'); const wall=document.querySelector('[data-wall]'); if(!filterBox||!wall)return;
 filterBox.innerHTML=categories.map((c,i)=>`<button class="filter ${i===0?'active':''}" data-cat="${c}">${c}</button>`).join('');
 wall.innerHTML=artifacts.map(a=>`<a class="artifact-card reveal" href="artifacts/${a.slug}.html" data-cat="${a.category}" data-speed="${(Math.random()*0.035-0.015).toFixed(3)}"><div class="card-top"><span>${a.id}</span><span>${a.status}</span></div><h3>${a.title}</h3><p>${a.line}</p><div class="card-meta"><span class="tag">${a.category}</span><span class="tag">${a.year}</span></div></a>`).join('');
 filterBox.addEventListener('click',e=>{const b=e.target.closest('button'); if(!b)return; filterBox.querySelectorAll('.filter').forEach(x=>x.classList.remove('active')); b.classList.add('active'); const cat=b.dataset.cat; wall.querySelectorAll('.artifact-card').forEach(card=>card.classList.toggle('hide',cat!=='All'&&card.dataset.cat!==cat));});
 observeCards();
}
function observeCards(){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.08});document.querySelectorAll('.artifact-card.reveal').forEach(el=>io.observe(el));}
