// performance.js — clips-only page controller (product definition 2026-11-16):
// camera-treatment switching for the player + "Download this camera", and beat seek chips.
// No 3D, no viewer — the page is a video, a small camera menu, and downloads.
const $ = (s, el=document) => el.querySelector(s);
const $$ = (s, el=document) => [...el.querySelectorAll(s)];

const player = $('#player');
const dlCurrent = $('#dl-current');

$$('[data-variant]').forEach(btn => {
  btn.addEventListener('click', () => {
    if (!player) return;
    const wasPlaying = !player.paused;
    const t = player.currentTime || 0;
    $$('[data-variant]').forEach(b => b.setAttribute('aria-pressed', 'false'));
    btn.setAttribute('aria-pressed', 'true');
    player.src = btn.dataset.src;
    if (dlCurrent) dlCurrent.href = btn.dataset.src;
    player.addEventListener('loadedmetadata', () => {
      try { player.currentTime = Math.min(t, (player.duration || t) - 0.05); } catch {}
      if (wasPlaying) player.play().catch(() => {});
    }, { once: true });
  });
});

$$('[data-seek]').forEach(btn => {
  btn.addEventListener('click', () => {
    if (!player) return;
    player.currentTime = Number(btn.dataset.seek);
    player.play().catch(() => {});
  });
});
