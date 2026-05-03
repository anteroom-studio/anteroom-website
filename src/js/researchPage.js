import {boot} from './core.js';
import {notes} from '../data/artifacts.js';
import {researchEntries} from '../data/research.js';

window.addEventListener('load', () => {
  boot();

  const notesBox = document.querySelector('[data-notes]');
  if (notesBox) {
    notesBox.innerHTML = notes.map(n =>
      `<div class="room reveal"><b>${n.id}</b><div><strong>${n.title}</strong><p>${n.desc}</p></div></div>`
    ).join('');
  }

  const grid = document.querySelector('[data-research]');
  if (grid) {
    grid.innerHTML = researchEntries.map(r => {
      const locked = !r.file;
      const cta = locked
        ? `<span class="panel-cta locked">${r.status}</span>`
        : `<button type="button" class="panel-cta" data-open="${r.file}" data-title="${r.title}" data-cat="${r.category}">Open document &rarr;</button>`;
      return `<article class="panel reveal ${locked ? 'is-locked' : ''}" data-cat="${r.category}">
        <b>${r.id} &middot; ${r.category}</b>
        <h3>${r.title}</h3>
        <p>${r.line}</p>
        ${cta}
      </article>`;
    }).join('');

    const io = new IntersectionObserver(
      es => es.forEach(e => e.isIntersecting && e.target.classList.add('in')),
      {threshold: 0.13}
    );
    grid.querySelectorAll('.panel.reveal').forEach(el => io.observe(el));
  }

  const lb = document.getElementById('lb');
  if (!lb) return;
  const lbFrame = lb.querySelector('iframe');
  const lbTitle = lb.querySelector('[data-lb-title]');
  const lbCat = lb.querySelector('[data-lb-cat]');

  const allVideos = () => document.querySelectorAll('video');

  const open = (file, title, cat) => {
    if (lbFrame) lbFrame.src = file + '#toolbar=1&navpanes=0&view=FitH';
    if (lbTitle) lbTitle.textContent = title;
    if (lbCat) lbCat.textContent = cat;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    allVideos().forEach(v => { try { v.pause(); } catch (e) {} });
  };

  const close = () => {
    lb.classList.remove('open');
    if (lbFrame) lbFrame.src = '';
    document.body.style.overflow = '';
    allVideos().forEach(v => { v.play().catch(() => {}); });
  };

  document.addEventListener('click', e => {
    const opener = e.target.closest('[data-open]');
    if (opener) {
      open(opener.dataset.open, opener.dataset.title, opener.dataset.cat);
      return;
    }
    if (e.target.closest('[data-lb-close]') || e.target === lb) close();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lb.classList.contains('open')) close();
  });
});
