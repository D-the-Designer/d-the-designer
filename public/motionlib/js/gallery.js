// gallery.js — search, filter, sort, hover previews. No Three.js on this page (HANDOFF rule 7).
const PAGE = 48;
let catalog = [], taxonomy = null, shown = PAGE, activeVideo = null;

const $ = (s, el=document) => el.querySelector(s);
const $$ = (s, el=document) => [...el.querySelectorAll(s)];

function mediaUrl(rel){ return (window.__MEDIA_BASE__ || './media/') + rel; }
function fmtDur(s){ return s ? s.toFixed(1)+'s' : ''; }
function humanBytes(b){ if(!b) return ''; const u=['B','KB','MB']; let i=0,v=b; while(v>=1024&&i<2){v/=1024;i++;} return v.toFixed(v>=10?0:1)+' '+u[i]; }

function stateFromURL(){
  const q = new URLSearchParams(location.search);
  return {
    q: q.get('q')||'',
    cat: q.getAll('cat'), region: q.getAll('region'), emotion: q.getAll('emotion'),
    energy: q.getAll('energy'), genre: q.getAll('genre'), decade: q.getAll('decade'),
    shelf: q.getAll('shelf'), dur: q.getAll('dur'), sort: q.get('sort')||'newest',
  };
}
function stateToURL(st){
  const q = new URLSearchParams();
  if(st.q) q.set('q', st.q);
  for(const k of ['cat','region','emotion','energy','genre','decade','shelf','dur']) st[k].forEach(v=>q.append(k,v));
  if(st.sort && st.sort!=='newest') q.set('sort', st.sort);
  history.replaceState(null,'', q.toString()? '?'+q.toString() : location.pathname);
}

function durBucket(d){ return d<3?'lt3': d<=6?'3-6':'gt6'; }

function matches(rec, st){
  if(st.cat.length && !st.cat.includes(rec.category)) return false;
  if(st.region.length && !st.region.some(v=>rec.tags.body_region.includes(v))) return false;
  if(st.emotion.length && !st.emotion.some(v=>(rec.tags.emotion||[]).includes(v))) return false;
  if(st.energy.length && !st.energy.includes(rec.tags.energy)) return false;
  if(st.genre.length && !(rec.inspiration && st.genre.includes(rec.inspiration.genre))) return false;
  if(st.decade.length && !(rec.inspiration && st.decade.includes(rec.inspiration.decade))) return false;
  if(st.shelf.length && !st.shelf.includes(rec.source||'original')) return false;
  if(st.dur.length && !st.dur.includes(durBucket(rec.timing.duration_s))) return false;
  if(st.q){
    const hay = [rec.title, rec.summary, rec.category, ...(rec.tags.body_region||[]), ...(rec.tags.emotion||[]), ...(rec.tags.action||[]), ...(rec.aliases||[]), rec.inspiration?.label||'', rec.inspiration?.genre||'', rec.inspiration?.decade||'', rec.sourceFilm||'', rec.sourceYear||''].join(' ').toLowerCase();
    for(const w of st.q.toLowerCase().split(/\s+/).filter(Boolean)) if(!hay.includes(w)) return false;
  }
  return true;
}

function cardHTML(rec){
  const poster = rec.poster ? `<img loading="lazy" width="${rec.poster.width||800}" height="${rec.poster.height||450}" src="${mediaUrl(rec.poster.src)}" alt="${escapeHtml(rec.summary)}">` : '';
  const preview = rec.previewSrc ? ` data-preview="${mediaUrl(rec.previewSrc)}"` : '';
  const badges = `${rec.source==='public-domain'?'<span class="badge">PD FILM</span>':''}<span class="badge">MP4</span>${rec.has.gif?'<span class="badge">GIF</span>':''}`;
  const tags = [...(rec.tags.emotion||[]).slice(0,2), rec.tags.energy].filter(Boolean).map(t=>`<span class="tag">${escapeHtml(labelFor(t))}</span>`).join('');
  return `<article class="card">
    <a class="card-media" href="./p/${rec.id}/"${preview} aria-label="${escapeHtml(rec.title)}">${poster}<span class="card-badges">${badges}</span></a>
    <div class="card-body"><h3><a href="./p/${rec.id}/">${escapeHtml(rec.title)}</a></h3>
    <p>${escapeHtml(rec.summary)}</p>
    <div class="card-meta"><span class="tag">${escapeHtml(labelFor(rec.category))}</span><span class="tag">${fmtDur(rec.timing.duration_s)}</span>${tags}</div></div></article>`;
}
function escapeHtml(s){ return String(s??'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function labelFor(v){
  if(!taxonomy) return v;
  for(const group of Object.values(taxonomy)) if(group && typeof group==='object' && group[v]) return group[v];
  return v;
}

function render(){
  const st = readControls();
  stateToURL(st);
  let list = catalog.filter(r=>matches(r,st));
  if(st.sort==='az') list.sort((a,b)=>a.title.localeCompare(b.title));
  else if(st.sort==='shortest') list.sort((a,b)=>a.timing.duration_s-b.timing.duration_s);
  else if(st.sort==='longest') list.sort((a,b)=>b.timing.duration_s-a.timing.duration_s);
  else list.sort((a,b)=>b.added.localeCompare(a.added));
  $('#count').textContent = `${list.length} performance${list.length===1?'':'s'}`;
  const slice = list.slice(0, shown);
  $('#grid').innerHTML = slice.length ? slice.map(cardHTML).join('') : '<p class="muted">No performances match. Try clearing a filter.</p>';
  $('#more-wrap').style.display = list.length>shown ? '' : 'none';
  wirePreviews();
}
function readControls(){
  const get = name => $$(`[data-facet="${name}"][aria-pressed="true"]`).map(b=>b.dataset.value);
  return { q: $('#q').value.trim(), cat:get('cat'), region:get('region'), emotion:get('emotion'), energy:get('energy'), genre:get('genre'), decade:get('decade'), shelf:get('shelf'), dur:get('dur'), sort: $('#sort').value };
}
function wirePreviews(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  $$('.card-media[data-preview]').forEach(a=>{
    a.addEventListener('pointerenter', ()=>{
      if(activeVideo && activeVideo.parentElement!==a) stopPreview();
      if(a.querySelector('video')) return;
      const v=document.createElement('video'); v.muted=true; v.loop=true; v.playsInline=true; v.preload='none'; v.src=a.dataset.preview;
      v.setAttribute('aria-hidden','true');
      a.appendChild(v); activeVideo=v; v.play().catch(()=>{});
    });
    a.addEventListener('pointerleave', ()=>{ if(activeVideo && activeVideo.parentElement===a) stopPreview(); });
  });
}
function stopPreview(){ if(!activeVideo) return; const v=activeVideo; activeVideo=null; v.pause(); v.remove(); }

function facetHTML(id, label, entries){
  return `<fieldset class="facet"><legend>${label}</legend><div class="row">${entries.map(([k,v])=>`<button type="button" class="chip" data-facet="${id}" data-value="${k}" aria-pressed="false">${v}</button>`).join('')}</div></fieldset>`;
}
async function init(){
  const [catRes, taxRes] = await Promise.all([fetch('./catalog.json'), fetch('./taxonomy.json').catch(()=>null)]);
  catalog = await catRes.json();
  // taxonomy is embedded by build into a script tag if present; otherwise derive minimal labels
  const embedded = document.getElementById('taxonomy');
  if(embedded) { try{ taxonomy = JSON.parse(embedded.textContent); }catch{} }
  if(!taxonomy && taxRes && taxRes.ok) taxonomy = await taxRes.json();
  const st = stateFromURL();
  $('#q').value = st.q; $('#sort').value = st.sort;
  const facetsEl = $('#facets');
  if(taxonomy){
    const decades = [...new Set(catalog.map(r=>r.inspiration?.decade).filter(Boolean))].sort();
    facetsEl.innerHTML = [
      facetHTML('cat','Category', Object.entries(taxonomy.category||{})),
      facetHTML('region','Body region', Object.entries(taxonomy.body_region||{})),
      facetHTML('emotion','Emotion', Object.entries(taxonomy.emotion||{})),
      facetHTML('energy','Energy', Object.entries(taxonomy.energy||{})),
      facetHTML('genre','Genre', Object.entries(taxonomy.genre||{})),
      facetHTML('decade','Decade', decades.map(d=>[d,d])),
      facetHTML('shelf','Shelf', [['original','Original performances'],['public-domain','PD film clips']]),
      facetHTML('dur','Duration', [['lt3','Under 3s'],['3-6','3–6s'],['gt6','Over 6s']]),
    ].join('');
    // restore pressed state
    const map={cat:st.cat,region:st.region,emotion:st.emotion,energy:st.energy,genre:st.genre,decade:st.decade,shelf:st.shelf,dur:st.dur};
    for(const [f, vals] of Object.entries(map)) vals.forEach(v=>{ const b=$(`[data-facet="${f}"][data-value="${CSS.escape(v)}"]`); if(b) b.setAttribute('aria-pressed','true'); });
  }
  let t;
  $('#q').addEventListener('input', ()=>{ clearTimeout(t); t=setTimeout(()=>{shown=PAGE; render();},150); });
  $('#sort').addEventListener('change', ()=>{ shown=PAGE; render(); });
  facetsEl.addEventListener('click', e=>{ const b=e.target.closest('.chip'); if(!b) return; b.setAttribute('aria-pressed', b.getAttribute('aria-pressed')==='true'?'false':'true'); shown=PAGE; render(); });
  $('#clear').addEventListener('click', ()=>{ $('#q').value=''; $('#sort').value='newest'; $$('.chip[aria-pressed="true"]').forEach(b=>b.setAttribute('aria-pressed','false')); shown=PAGE; render(); });
  $('#more').addEventListener('click', ()=>{ shown+=PAGE; render(); });
  window.addEventListener('popstate', ()=>location.reload());
  render();
}
init();
