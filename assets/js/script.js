/* Ansima — happy birthday. Editable content lives in assets/js/content.js */
const C = CONTENT;
const STORAGE_KEY = 'ansima-hbd-v3';
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

function toast(s) {
  let t = $('#toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; t.setAttribute('role', 'status'); document.body.append(t); }
  t.textContent = s;
  t.classList.add('show');
  clearTimeout(toast.id);
  toast.id = setTimeout(() => t.classList.remove('show'), 2800);
}

/* ============================================================
   1. OPENING SCREEN: clear photo, then it blurs while the text is typed
   ============================================================ */
let skip = false;

async function runSplash() {
  const lines = C.splashLines, box = $('#splashText'), photo = $('#splashPhoto'), shade = $('#splashShade'), btn = $('#enterBtn');
  const total = lines.join('').length;
  let typed = 0;
  const probe = new Image();
  probe.onload = () => { if (probe.naturalWidth >= probe.naturalHeight) $('#splash').classList.add('land'); };
  probe.src = 'assets/images/a.jpeg';
  const els = lines.map((t, i) => {
    const p = document.createElement('p');
    p.className = 'sline sl-' + i;
    p.innerHTML = `<span class="on"></span><span class="off">${esc(t)}</span>`;   // reserves the space so nothing jumps
    box.append(p);
    return p;
  });
  const look = () => {
    const p = total ? typed / total : 1;
    photo.style.filter = `blur(${(p * 16).toFixed(1)}px)`;
    shade.style.opacity = (p * 0.72).toFixed(2);
  };
  look();
  for (let t = 0; t < 28 && !skip && !reduceMotion; t++) await sleep(100);   // the photo stays sharp for a moment
  if (reduceMotion) skip = true;
  for (let i = 0; i < lines.length && !skip; i++) {
    const on = els[i].querySelector('.on'), off = els[i].querySelector('.off'), chars = [...lines[i]];
    els[i].classList.add('typing');
    for (let j = 0; j < chars.length && !skip; j++) {
      on.textContent += chars[j];
      off.textContent = chars.slice(j + 1).join('');
      typed++; look();
      await sleep(/[.,:…]/.test(chars[j]) ? 240 : 48);
    }
    els[i].classList.remove('typing');
    if (!skip) await sleep(600);
  }
  els.forEach((p, i) => { p.querySelector('.on').textContent = lines[i]; p.querySelector('.off').textContent = ''; p.classList.remove('typing'); });
  typed = total; look();
  btn.classList.add('show');
}

function enterSite() {
  const splash = $('#splash');
  if (splash.classList.contains('leaving')) return;
  skip = true;
  splash.classList.add('leaving');
  setTimeout(() => splash.remove(), 1000);
  const wrap = $('#introv'), v = $('#bdayVideo'), hint = $('#introHint');
  wrap.classList.add('show');
  v.addEventListener('ended', () => { hint.textContent = 'Happy birthday, Ansima. Replay it, or continue to the site.'; });
  v.addEventListener('error', () => { v.classList.add('hidden'); hint.textContent = 'Video not found: add assets/videos/1.mp4'; }, { once: true });
  v.currentTime = 0;
  v.play().catch(() => {});
}

function leaveIntro() {
  $('#bdayVideo').pause();
  $('#introv').classList.remove('show');
  document.body.classList.remove('locked');
  window.scrollTo(0, 0);
  startReveal();
}

/* ============================================================
   2. SUBTLE REVEAL ON SCROLL
   ============================================================ */
function startReveal() {
  if (reduceMotion || !('IntersectionObserver' in window)) { $$('.rv,.sec').forEach(e => e.classList.add('in')); $$('[data-split]').forEach(e => e.classList.add('open')); return; }
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
  $$('.rv,.sec').forEach(el => io.observe(el));
  const so = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('open'); so.unobserve(e.target); }
  }), { threshold: 0.4 });
  $$('[data-split]').forEach(el => so.observe(el));
}

/* ============================================================
   3. BIRTHDAY DETAILS: bunting + cake candles
   ============================================================ */
function buildBunting() {
  const cols = ['#c0212f', '#ffffff', '#4b2e22'], N = 15;
  let out = '<path d="M0 6 Q600 80 1200 6" fill="none" stroke="#ffffff" stroke-width="2.5" opacity=".9"/>';
  for (let i = 0; i < N; i++) {
    const t = (i + 0.5) / N;
    const x = 2 * (1 - t) * t * 600 + t * t * 1200;
    const y = (1 - t) * (1 - t) * 6 + 2 * (1 - t) * t * 80 + t * t * 6;
    const ang = Math.atan2(148 * (1 - 2 * t), 1200) * 180 / Math.PI;
    out += `<polygon transform="rotate(${ang.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})" points="${(x - 24).toFixed(1)},${y.toFixed(1)} ${(x + 24).toFixed(1)},${y.toFixed(1)} ${x.toFixed(1)},${(y + 46).toFixed(1)}" fill="${cols[i % 3]}"/>`;
  }
  $('#bunting').innerHTML = out;
}

function buildCake() {
  const xs = [112, 136, 160, 184, 208], cc = ['#c0212f', '#ffffff', '#2e8fc7', '#1f7a4d', '#c0212f'];
  $('#candles').innerHTML = xs.map((x, i) =>
    `<rect x="${x - 4}" y="78" width="8" height="36" rx="2" fill="${cc[i]}" stroke="#111" stroke-opacity=".2"/>
     <path class="smoke" transform="translate(${x} 72)" d="M0 0 q-6 -9 0 -16 q6 -8 0 -16" fill="none" stroke="#8a8a8a" stroke-width="3" stroke-linecap="round"/>
     <g transform="translate(${x} 76)"><g class="flame" style="--i:${i}"><path d="M0 -26 C9 -14 9 -3 0 2 C-9 -3 -9 -14 0 -26Z" fill="#e8891a"/><path d="M0 -13 C5 -8 5 -3 0 0 C-5 -3 -5 -8 0 -13Z" fill="#f6c343"/></g></g>`).join('');
}
const WISHES = ['Your wish is on its way. We keep the secret.', 'Well blown. May it come true.', 'Wished. It has good chances.', 'Done. Now, smile.'];
function toggleCandles() {
  const cake = $('#cake'), btn = $('#blow'), out = !cake.classList.contains('out');
  cake.classList.toggle('out', out);
  btn.textContent = out ? 'Light the candles again' : 'Blow out the candles';
  btn.setAttribute('aria-pressed', out);
  $('#wishMsg').textContent = out ? WISHES[Math.floor(Math.random() * WISHES.length)] : '';
}

/* ============================================================
   4. THE GAME: 7 questions, a random surprise after a right answer (optional)
   ============================================================ */
const Q = C.questions;
const ITEMS = [
  ...[...C.videos].map(l => ({ id: 'v' + l, type: 'video', l, src: `assets/videos/${l}.mp4` })),
  ...[...C.audios].map(l => ({ id: 'a' + l, type: 'audio', l, src: `assets/audio/${l}.mp3` }))
];
const itemName = it => (it.type === 'video' ? 'Video ' : 'Voice message ') + it.l.toUpperCase();

let st = { q: 0, answered: 0, opened: [], done: false };
try { const s = JSON.parse(localStorage.getItem(STORAGE_KEY)); if (s && typeof s.q === 'number') st = Object.assign(st, s); } catch (e) {}
const save = () => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(st)); } catch (e) {} };
let phase = st.done ? 'done' : 'question';
const played = () => st.answered > 0 || st.done;

function makeMedia(it, autoplay) {
  const el = document.createElement(it.type);
  el.controls = true;
  el.preload = 'metadata';
  el.src = it.src;
  if (it.type === 'video') el.playsInline = true;
  el.addEventListener('error', () => el.replaceWith(Object.assign(document.createElement('div'), { className: 'missing', textContent: `File not found: ${it.src}` })), { once: true });
  if (autoplay) el.play().catch(() => {});
  return el;
}

function candles() {
  const lit = phase === 'done' ? Q.length : st.answered;
  return '<ol class="candles" aria-label="Progress">' + Q.map((_, i) => `<li class="${i < lit ? 'lit' : ''}"></li>`).join('') + '</ol>';
}

function renderGame(item) {
  const card = $('#gameCard'), last = st.q === Q.length - 1;
  const nextLabel = last ? 'Finish the game' : 'Next question';

  if (phase === 'done') {
    card.innerHTML = candles() + `<p class="big">You finished the game.</p><p class="muted">Every video and every voice message is now unlocked, and the story is open for you.</p>
      <div class="choices"><a class="btn primary" href="#surprises">See the surprises</a><button class="btn ghost" id="again">Play again</button></div>`;
    $('#again').onclick = () => { st.q = 0; st.answered = 0; phase = 'question'; save(); renderGame(); refreshLocks(); };
    return;
  }

  if (phase === 'choice') {
    card.innerHTML = candles() + `<p class="big">Correct.</p>
      <p class="muted">Would you like to open a surprise now? It will be a video or a voice message, chosen at random. You can also skip it and keep playing: at the end, you get to see everything.</p>
      <div class="choices"><button class="btn primary" id="openS">Open a surprise</button><button class="btn ghost" id="nextQ">${nextLabel}</button></div>`;
    $('#openS').onclick = () => {
      const pool = ITEMS.filter(i => !st.opened.includes(i.id));
      const it = (pool.length ? pool : ITEMS)[Math.floor(Math.random() * (pool.length || ITEMS.length))];   // random: video or audio
      if (!st.opened.includes(it.id)) st.opened.push(it.id);
      save(); renderVault();
      phase = 'media'; renderGame(it);
    };
    $('#nextQ').onclick = advance;
    return;
  }

  if (phase === 'media') {
    card.innerHTML = candles() + `<p class="qno">${item.type === 'video' ? 'A video' : 'A voice message'}</p><p class="big">Here is your surprise.</p>
      <div class="media-box"></div><div class="choices"><button class="btn primary" id="nextQ">${nextLabel}</button></div>`;
    card.querySelector('.media-box').append(makeMedia(item, true));
    $('#nextQ').onclick = advance;
    return;
  }

  const qq = Q[st.q];
  card.innerHTML = candles() + `<p class="qno">Question ${st.q + 1} of ${Q.length}</p><p class="qtext">${esc(qq.q)}</p>` +
    (qq.type === 'choice'
      ? `<div class="opts">${qq.options.map((o, i) => `<button class="opt" data-i="${i}">${esc(o)}</button>`).join('')}</div>`
      : '<input class="field" id="ans" placeholder="Type your answer" autocomplete="off"><button class="btn primary" id="chk">Check</button>') +
    '<p class="fb" id="fb"></p>';
  const fb = $('#fb');
  const right = () => {
    fb.className = 'fb ok'; fb.textContent = 'Correct.';
    st.answered = Math.max(st.answered, st.q + 1); save(); refreshLocks();
    setTimeout(() => { phase = 'choice'; renderGame(); }, 650);
  };
  if (qq.type === 'choice') {
    $$('.opt').forEach(b => b.onclick = () => {
      if (+b.dataset.i === qq.answer) { b.classList.add('ok'); $$('.opt').forEach(x => x.disabled = true); right(); }
      else { b.classList.add('bad'); b.disabled = true; fb.className = 'fb bad'; fb.textContent = 'Not quite. ' + (qq.hint || 'Try again.'); }
    });
  } else {
    const check = () => {
      const v = $('#ans').value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
      if (qq.answers.some(a => v === a || v.split(/\s+/).includes(a))) { $('#ans').disabled = true; $('#chk').disabled = true; right(); }
      else { fb.className = 'fb bad'; fb.textContent = 'Not quite. ' + (qq.hint || 'Try again.'); }
    };
    $('#chk').onclick = check;
    $('#ans').addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
  }
}

function advance() {
  if (st.q >= Q.length - 1) { st.done = true; phase = 'done'; }
  else { st.q++; phase = 'question'; }
  save(); renderGame(); renderVault(); refreshLocks();
  $('#gameCard').scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

/* ---------- Surprises: locked until she has played, everything at the end ---------- */
const player = $('#player');
function openItem(it) {
  $('#playerKind').textContent = it.type === 'video' ? 'Video' : 'Voice message';
  $('#playerTitle').textContent = itemName(it);
  $('#playerBody').replaceChildren(makeMedia(it, true));
  if (!player.open) player.showModal();
}
player.addEventListener('close', () => $('#playerBody').replaceChildren());   // stops playback
$('#playerClose').onclick = () => player.close();
player.addEventListener('click', e => { if (e.target === player) player.close(); });

function renderVault() {
  const grid = $('#tagGrid'), note = $('#vaultNote');
  grid.innerHTML = '';
  if (!played()) {
    note.textContent = 'Nothing opens before you have played.';
    grid.innerHTML = '<div class="lockbox">Locked. Answer your first question to begin.</div>';
    return;
  }
  const list = st.done ? ITEMS : ITEMS.filter(i => st.opened.includes(i.id));
  note.textContent = st.done
    ? 'You finished the game: everything is yours. Tap any tag to watch or listen.'
    : `${st.opened.length} opened so far. Finish the game and the rest unlocks.`;
  if (!list.length) { grid.innerHTML = '<div class="lockbox">Open a surprise after a right answer and it will be kept here.</div>'; return; }
  list.forEach(it => {
    const b = document.createElement('button');
    b.className = 'tag ' + it.type;
    b.innerHTML = `<small>${it.type === 'video' ? 'Video' : 'Voice message'}</small><b>${it.l.toUpperCase()}</b>`;
    b.onclick = () => openItem(it);
    grid.append(b);
  });
}

function refreshLocks() {
  const ok = played();
  $('#bookCard').classList.toggle('locked', !ok);
  $('#bookCard').setAttribute('aria-disabled', !ok);
  renderVault();
}

/* ============================================================
   5. YEARS
   ============================================================ */
function buildYears() {
  $('#tl').innerHTML = C.years.map((y, i) => `<article class="chap rv ${i % 2 ? 'rv-r' : 'rv-l'}">
    <div class="txt"><span class="year">${y.y}</span><p class="ctitle">${esc(y.title)}</p><p class="ctext">${esc(y.text)}</p></div>
    <figure class="ph" data-file="${y.y}.jpeg"><img loading="lazy" decoding="async" src="assets/images/${y.y}.jpeg" alt="Ansima in ${y.y}"></figure>
  </article>`).join('');
  $('#yq').textContent = '“' + C.yearsQuote + '”';
  $('#yqBy').textContent = C.yearsQuoteBy;
  $('#yEnd').textContent = C.yearsEnd;
}

/* Each frame follows the real shape of its photo (portrait, square or landscape), within sensible limits */
function fitImages() {
  $$('.photo img, .ph img').forEach(img => {
    const apply = () => {
      if (!img.naturalWidth || !img.parentElement) return;
      const fig = img.parentElement;
      const [lo, hi] = fig.classList.contains('arch') ? [0.7, 0.95] : fig.classList.contains('ph') ? [0.75, 1.25] : [0.66, 1.4];
      const r = Math.max(lo, Math.min(hi, img.naturalWidth / img.naturalHeight));
      fig.style.setProperty('--ar', r.toFixed(3));
    };
    img.complete ? apply() : img.addEventListener('load', apply, { once: true });
  });
}

function wireImages() {
  $$('.photo img, .ph img').forEach(img => {
    const bad = () => { const par = img.parentElement; if (!par) return; par.classList.add('nofile'); img.remove(); };
    img.addEventListener('error', bad, { once: true });
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) bad();
  });
}

/* ============================================================
   6. THE BOOK: opens, turns pages, closes
   ============================================================ */
const reader = $('#reader'), bk = $('#bk'), B = C.book;
let lang = 'en', idx = 0, L = 0, cols = 2, maxIdx = 0, leaves = [], seqN = 0, pageCount = 0, token = 0;

function tokens(raw) {
  const out = [];
  raw.split('**').forEach((seg, i) => seg.split(/\s+/).filter(Boolean).forEach(w => out.push({ w, b: i % 2 === 1 })));
  return out;
}
function render(ts) {
  const segs = [];
  for (const t of ts) { const l = segs[segs.length - 1]; if (l && l.b === t.b) l.w.push(t.w); else segs.push({ b: t.b, w: [t.w] }); }
  return segs.map(s => s.b ? `<strong>${esc(s.w.join(' '))}</strong>` : esc(s.w.join(' '))).join(' ');
}

/* Splits the text into pages by measuring real page boxes */
function paginate(paras) {
  const m = document.createElement('div');
  m.className = 'face measure';
  m.innerHTML = '<div class="pgin"></div>';
  bk.append(m);
  const pg = m.firstChild, pages = [];
  let cur = [];
  const set = arr => { pg.innerHTML = arr.map(h => `<p>${h}</p>`).join(''); };
  const fits = () => pg.scrollHeight <= pg.clientHeight + 1;
  for (const raw of paras) {
    let rest = tokens(raw);
    while (rest.length) {
      set([...cur, render(rest)]);
      if (fits()) { cur.push(render(rest)); rest = []; break; }
      if (cur.length && rest.length < 40) { pages.push(cur); cur = []; continue; }   // short paragraph: start a new page
      let lo = 0, hi = rest.length - 1;
      while (lo < hi) { const mid = Math.ceil((lo + hi) / 2); set([...cur, render(rest.slice(0, mid))]); fits() ? lo = mid : hi = mid - 1; }
      if (lo === 0) { if (cur.length) { pages.push(cur); cur = []; continue; } lo = 1; }
      cur.push(render(rest.slice(0, lo)));
      rest = rest.slice(lo);
      pages.push(cur); cur = [];
    }
  }
  if (cur.length) pages.push(cur);
  m.remove();
  return pages;
}

function buildBook(targetFrac) {
  const single = innerWidth < 760;
  cols = single ? 1 : 2;
  const aw = Math.min(innerWidth - 24, 1000), ah = innerHeight - 175;
  const pw = Math.max(150, Math.min(520, single ? Math.min(aw, ah * 0.72) : Math.min(aw / 2, ah * 0.72)));
  bk.style.setProperty('--pw', pw + 'px');
  bk.style.setProperty('--ph', (pw / 0.72) + 'px');
  bk.style.setProperty('--cols', cols);
  bk.style.setProperty('--fs', Math.max(12.5, Math.min(19, pw * 0.043)) + 'px');
  bk.innerHTML = '';

  const pages = paginate(B[lang]);
  pageCount = pages.length;
  const seq = [{ cls: 'cover', html: `<span class="bc-title">${esc(B.title)}</span><span class="bc-sub">${esc(B.subtitle)}</span>` }];
  if (!single) seq.push({ cls: 'ded', html: esc(B.dedication) });
  pages.forEach((p, i) => seq.push({ cls: 'page', html: `<div class="pgin">${p.map(h => `<p>${h}</p>`).join('')}</div><div class="pn">${i + 1}</div>` }));
  seq.push({ cls: 'end', html: esc(B.end) });
  if (!single && seq.length % 2) seq.push({ cls: 'blank', html: '' });
  seqN = seq.length;
  const per = single ? 1 : 2;
  L = Math.ceil(seq.length / per);
  maxIdx = single ? L - 1 : L;

  bk.insertAdjacentHTML('beforeend', '<div class="base"></div>');
  leaves = [];
  for (let k = 0; k < L; k++) {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    const f = seq[k * per], b = seq[k * per + 1];
    leaf.innerHTML = `<div class="face right ${f.cls}">${f.html}</div>` + (b ? `<div class="face back left ${b.cls}">${b.html}</div>` : '');
    bk.append(leaf);
    leaves.push(leaf);
  }
  idx = Math.min(maxIdx, Math.round((targetFrac || 0) * maxIdx));
  leaves.forEach((lf, i) => lf.classList.toggle('flip', i < idx));
  bk.style.transition = 'none';
  update();
  requestAnimationFrame(() => requestAnimationFrame(() => { bk.style.transition = ''; }));
}

function update() {
  leaves.forEach((lf, i) => { lf.style.zIndex = i < idx ? i + 1 : 1000 - i; });
  bk.classList.toggle('shut-front', cols === 2 && idx === 0);
  $('#prevPage').disabled = idx === 0;
  $('#nextPage').disabled = idx >= maxIdx;
  $('#shutBook').disabled = idx === 0;
  let info = 'Cover';
  if (idx > 0) {
    const first = cols === 2 ? 2 * idx - 1 : idx, second = cols === 2 ? 2 * idx : -1, off = cols === 2 ? 2 : 1;
    const nums = [first, second].filter(s => s >= 0).map(s => s - off + 1).filter(n => n >= 1 && n <= pageCount);
    info = nums.length ? (nums.length > 1 ? `Pages ${nums[0]}–${nums[1]}` : `Page ${nums[0]}`) + ` of ${pageCount}` : (idx * (cols === 2 ? 2 : 1) >= seqN - 1 ? 'The end' : 'Dedication');
  }
  $('#pageInfo').textContent = info;
}

async function goTo(n) {
  const my = ++token;
  n = Math.max(0, Math.min(maxIdx, n));
  while (idx !== n && my === token) {
    if (idx < n) { leaves[idx].classList.add('flip'); idx++; }
    else { idx--; leaves[idx].classList.remove('flip'); }
    update();
    if (idx !== n) await sleep(140);
  }
}

function openBook() {
  if (!played()) { toast('Answer your first question to unlock the story.'); return; }
  reader.classList.add('open');
  document.documentElement.style.overflow = 'hidden';
  buildBook(0);
}
function closeBook() {
  token++;
  reader.classList.remove('open');
  document.documentElement.style.overflow = '';
  bk.innerHTML = '';
}
function rebuildKeep() { if (reader.classList.contains('open')) buildBook(maxIdx ? idx / maxIdx : 0); }

/* photos open large */
const lbox = $('#lightbox');
document.addEventListener('click', e => {
  const img = e.target.closest('.photo img, .ph img');
  if (!img) return;
  $('#lbImg').src = img.currentSrc || img.src; $('#lbImg').alt = img.alt; lbox.showModal();
});
$('#lbClose').onclick = () => lbox.close();
lbox.addEventListener('click', e => { if (e.target === lbox) lbox.close(); });

/* ============================================================
   7. EVENTS
   ============================================================ */
$('#skip').onclick = () => { skip = true; };
$('#enterBtn').onclick = enterSite;
$('#introGo').onclick = leaveIntro;
$('#blow').onclick = toggleCandles;
$('#cakewrap').onclick = toggleCandles;
$('#bookCard').onclick = openBook;
$('#readerClose').onclick = closeBook;
$('#prevPage').onclick = () => goTo(idx - 1);
$('#nextPage').onclick = () => goTo(idx + 1);
$('#shutBook').onclick = () => goTo(0);
$('#langEn').onclick = () => { lang = 'en'; $('#langEn').classList.add('on'); $('#langFr').classList.remove('on'); rebuildKeep(); };
$('#langFr').onclick = () => { lang = 'fr'; $('#langFr').classList.add('on'); $('#langEn').classList.remove('on'); rebuildKeep(); };
document.addEventListener('keydown', e => {
  if (!reader.classList.contains('open')) return;
  if (e.key === 'ArrowRight') goTo(idx + 1);
  if (e.key === 'ArrowLeft') goTo(idx - 1);
  if (e.key === 'Escape') closeBook();
});
$('#stage').addEventListener('click', e => {
  const r = bk.getBoundingClientRect(), x = e.clientX - r.left;
  if (e.clientX < r.left - 30 || e.clientX > r.right + 30) return;
  if (idx === 0) return goTo(1);
  (cols === 2 ? x < r.width / 2 : x < r.width * 0.35) ? goTo(idx - 1) : goTo(idx + 1);
});
let tx = 0;
$('#stage').addEventListener('touchstart', e => { tx = e.changedTouches[0].clientX; }, { passive: true });
$('#stage').addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 45) goTo(dx < 0 ? idx + 1 : idx - 1); }, { passive: true });
let rz; addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(rebuildKeep, 250); });

/* ============================================================
   SECTION BREAKS: scroll-driven transitions between sections
   tear-x: a screen tears in two, left and right
   tear-y: a screen tears in two, top and bottom
   shine : a light sweeps over the screen, then it lifts away
   ============================================================ */
const clamp01 = v => Math.max(0, Math.min(1, v));
const smooth = t => t * t * (3 - 2 * t);
const JAG = [0, 3.2, -2.4, 4, -3, 2.2, -4, 3.4, -2, 3.6, -3.2, 2, -3.8, 2.6, 0];   // the torn edge

function seam(axis) {
  const n = JAG.length - 1, A = [], B = [];
  if (axis === 'x') {
    A.push('0 0'); B.push('100% 0');
    JAG.forEach((o, i) => { const p = `${(50 + o).toFixed(1)}% ${(i / n * 100).toFixed(1)}%`; A.push(p); B.push(p); });
    A.push('0 100%'); B.push('100% 100%');
  } else {
    A.push('0 0'); B.push('0 100%');
    JAG.forEach((o, i) => { const p = `${(i / n * 100).toFixed(1)}% ${(50 + o).toFixed(1)}%`; A.push(p); B.push(p); });
    A.push('100% 0'); B.push('100% 100%');
  }
  return [`polygon(${A.join(',')})`, `polygon(${B.join(',')})`];
}

function applyBreak(it, p) {
  if (it.type === 'shine') {
    const g = clamp01(p / 0.6), l = smooth(clamp01((p - 0.5) / 0.5));
    it.glare.style.transform = `translateX(${(-130 + 260 * g).toFixed(1)}%)`;
    it.a.style.transform = `translate3d(0,${(-l * 101).toFixed(2)}%,0)`;
    it.under.style.transform = `scale(${(0.92 + 0.08 * l).toFixed(3)})`;
    it.under.style.opacity = (0.4 + 0.6 * l).toFixed(2);
  } else {
    const q = smooth(clamp01((p - 0.12) / 0.7)), d = (q * 101).toFixed(2), ax = it.type === 'tear-x' ? 'X' : 'Y';
    it.a.style.transform = `translate${ax}(${-d}%)`;
    it.b.style.transform = `translate${ax}(${d}%)`;
    it.under.style.transform = `scale(${(0.9 + 0.1 * q).toFixed(3)})`;
    it.under.style.opacity = (0.35 + 0.65 * q).toFixed(2);
  }
}

function buildBreaks() {
  if (reduceMotion) return;
  const items = $$('[data-brk]').map(el => {
    const type = el.dataset.brk, a = el.querySelector('.brk-half'), under = el.querySelector('.brk-under'), glare = el.querySelector('.glare');
    let b = null;
    if (type !== 'shine') {
      b = a.cloneNode(true);                       // the second half is a copy of the first, clipped on the other side of the tear
      b.classList.remove('a'); b.classList.add('b');
      a.after(b);
      const [pa, pb] = seam(type === 'tear-x' ? 'x' : 'y');
      a.style.clipPath = a.style.webkitClipPath = pa;
      b.style.clipPath = b.style.webkitClipPath = pb;
    }
    const it = { el, type, a, b, under, glare, vis: false };
    applyBreak(it, 0);
    return it;
  });
  const io = new IntersectionObserver(es => es.forEach(e => { items.find(i => i.el === e.target).vis = e.isIntersecting; }), { rootMargin: '150px' });
  items.forEach(i => io.observe(i.el));
  let ticking = false;
  const frame = () => {
    ticking = false;
    items.forEach(it => {
      if (!it.vis) return;
      const h = it.el.offsetHeight - innerHeight;
      applyBreak(it, h > 0 ? clamp01(-it.el.getBoundingClientRect().top / h) : 0);
    });
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
  addEventListener('resize', () => requestAnimationFrame(frame));
}

/* ============================================================
   8. START
   ============================================================ */
$$('[data-fill="items"]').forEach(e => { e.textContent = ITEMS.length; });
$('#closing').textContent = C.closing;
buildBreaks();
buildBunting();
buildCake();
buildYears();
wireImages();
fitImages();
renderGame();
refreshLocks();
runSplash();