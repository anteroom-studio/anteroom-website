import {boot, mountArchive} from './core.js';
import {artifacts,categories} from '../data/artifacts.js';
window.addEventListener('load',()=>{boot(); mountArchive(artifacts,categories); document.querySelectorAll('.artifact-card').forEach(a=>{a.href='../'+a.getAttribute('href')})});
