import {boot, mountArchive} from './core.js';
import {artifacts,categories,notes} from '../data/artifacts.js';
window.addEventListener('load',()=>{boot(); mountArchive(artifacts,categories); mountNotes();});
function mountNotes(){const box=document.querySelector('[data-notes]'); if(!box)return; box.innerHTML=notes.map(n=>`<div class="room reveal"><b>${n.id}</b><div><strong>${n.title}</strong><p>${n.desc}</p></div></div>`).join('');}
