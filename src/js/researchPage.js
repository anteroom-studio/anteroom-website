import {boot} from './core.js';import {notes} from '../data/artifacts.js';
window.addEventListener('load',()=>{boot();const box=document.querySelector('[data-notes]'); if(box)box.innerHTML=notes.map(n=>`<div class="room reveal"><b>${n.id}</b><div><strong>${n.title}</strong><p>${n.desc}</p></div></div>`).join('');});
