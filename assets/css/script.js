/* ============================================================
   RÉGLAGES — modifie ici le nombre de fichiers et les réponses
   ============================================================ */
const CONFIG = {
  videos: 7,          // assets/videos/video-01.mp4 … video-07.mp4
  audios: 5,          // assets/audio/audio-01.mp3 … audio-05.mp3
  photos: 7,          // assets/images/photo-01.jpg … photo-07.jpg
  winsForVault: 3,    // victoires nécessaires pour ouvrir photos + lettre
  guessAnswer: 'bougie'
};
const STORAGE_KEY = 'ansima-hbd-v1';

/* ============================================================
   OUTILS
   ============================================================ */
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const pad = n => String(n).padStart(2, '0');
const shuffle = a => { const r = [...a]; for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };

const dialog = $('#dialog'), body = $('#gameBody'), feedback = $('#feedback');

function toast(s) {
  const t = $('#toast');
  t.textContent = s;
  t.classList.add('show');
  clearTimeout(toast.id);
  toast.id = setTimeout(() => t.classList.remove('show'), 2800);
}

function confetti(n = 80) {
  const layer = $('#confettiLayer'), colors = ['#cf2a3a', '#4b2e22', '#1f9d55', '#8fd3f4', '#ffffff', '#0f1a24'];
  for (let i = 0; i < n; i++) {
    const p = document.createElement('i');
    p.className = 'confetti';
    p.style.left = Math.random() * 100 + '%';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.animationDelay = Math.random() + 's';
    layer.append(p);
    setTimeout(() => p.remove(), 4200);
  }
}

/* ============================================================
   CADEAUX : 7 vidéos + 5 audios mélangés
   ============================================================ */
const MEDIA = [];
for (let i = 1; i <= CONFIG.videos; i++) MEDIA.push({ id: 'v' + pad(i), type: 'video', n: i, src: `assets/videos/video-${pad(i)}.mp4` });
for (let i = 1; i <= CONFIG.audios; i++) MEDIA.push({ id: 'a' + pad(i), type: 'audio', n: i, src: `assets/audio/audio-${pad(i)}.mp3` });
const byId = id => MEDIA.find(m => m.id === id);

/* ============================================================
   ÉTAT (sauvegardé dans le navigateur)
   ============================================================ */
let state = { wins: [], opened: [], pending: 0, order: [] };
try {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (saved && Array.isArray(saved.wins)) state = Object.assign(state, saved);
} catch (e) { /* stockage indisponible : on continue en mémoire */ }
// Ordre d'affichage mélangé une fois pour toutes : on ne devine pas le type d'après la position
if (state.order.length !== MEDIA.length) state.order = shuffle(MEDIA.map(m => m.id));
const save = () => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {} };

/* ============================================================
   AFFICHAGE : progression, coffre, collection
   ============================================================ */
function refresh() {
  const w = state.wins.length, remaining = MEDIA.length - state.opened.length;

  $('#progress').style.width = (w / 5 * 100) + '%';
  $('#count').textContent = `${w} / 5 épreuves gagnées`;
  $('#status').textContent = w >= CONFIG.winsForVault ? 'COFFRE OUVERT' : 'VERROUILLÉ';
  $('#giftCount').textContent = `${state.opened.length} / ${MEDIA.length}`;

  $$('.game').forEach(g => {
    const k = g.querySelector('[data-game]').dataset.game, won = state.wins.includes(k);
    g.classList.toggle('won', won);
    g.querySelector('.gstate').textContent = won ? '✓ gagnée' : 'à jouer';
  });

  // Bouton principal de la carte cadeaux
  const btn = $('#unlock'), txt = $('#unlockText');
  if (state.pending > 0) {
    btn.disabled = false;
    btn.textContent = `Choisir ma boîte 🎁 (${state.pending})`;
    txt.textContent = 'Une boîte mystère t’attend. Vidéo ou audio ? Tu le sauras en l’ouvrant.';
  } else if (w > 0) {
    btn.disabled = false;
    btn.textContent = 'Voir mes cadeaux ✨';
    txt.textContent = 'Réussis une autre épreuve pour gagner une nouvelle boîte.';
  } else {
    btn.disabled = true;
    btn.textContent = 'Gagne une épreuve';
    txt.textContent = 'Gagne une épreuve pour choisir ta première boîte.';
  }

  // Bonus final : toutes les épreuves gagnées -> on peut ouvrir le reste
  $('#bonus').classList.toggle('hidden', !(w >= 5 && remaining > 0 && state.pending === 0));
  $('#bonus').textContent = `Ouvrir les ${remaining} boîtes restantes 🎉`;

  renderGifts();

  const vaultOpen = w >= CONFIG.winsForVault;
  $$('[data-needs]').forEach(p => {
    p.querySelector('.lockbox').classList.toggle('hidden', vaultOpen);
    p.querySelector('.unlocked').classList.toggle('hidden', !vaultOpen);
  });
}

function renderGifts() {
  const grid = $('#giftGrid');
  grid.innerHTML = '';
  state.order.forEach((id, idx) => {
    const m = byId(id);
    if (state.opened.includes(id)) {
      const b = document.createElement('button');
      b.className = 'gift open';
      b.innerHTML = `<span>${m.type === 'video' ? '🎬' : '🎧'}</span>${m.type === 'video' ? 'Vidéo' : 'Audio'} ${pad(m.n)}`;
      b.onclick = () => showMedia(m, false);
      grid.append(b);
    } else {
      const d = document.createElement('div');
      d.className = 'gift';
      d.innerHTML = `<span>🎁</span>Mystère ${pad(idx + 1)}`;
      grid.append(d);
    }
  });
}

/* ============================================================
   VICTOIRE -> BOÎTE MYSTÈRE
   ============================================================ */
function win(k, msg) {
  feedback.textContent = msg;
  if (state.wins.includes(k)) {
    feedback.textContent += ' (Épreuve déjà gagnée : pas de nouvelle boîte.)';
    return;
  }
  state.wins.push(k);
  state.pending++;
  save();
  refresh();
  confetti(70);
  if (state.wins.length === CONFIG.winsForVault) setTimeout(() => toast('Photos et lettre débloquées ! 🔓'), 600);
  setTimeout(showReward, 1500);
}

function openDialog(kicker, title) {
  $('#gameKicker').textContent = kicker;
  $('#gameTitle').textContent = title;
  feedback.textContent = '';
  if (!dialog.open) dialog.showModal();
}

function showReward() {
  if (state.pending <= 0) return;
  openDialog('CADEAU MYSTÈRE', 'Choisis une boîte');
  body.innerHTML = `<p>Bravo ! Trois boîtes, un cadeau à l’intérieur : une vidéo ou un audio. À toi de choisir.</p>
    <div class="giftrow">
      <button class="giftbox" aria-label="Boîte 1">🎁</button>
      <button class="giftbox" aria-label="Boîte 2">🎀</button>
      <button class="giftbox" aria-label="Boîte 3">🎊</button>
    </div>`;
  $$('.giftbox').forEach(b => b.onclick = pickGift);
}

function pickGift() {
  const left = MEDIA.filter(m => !state.opened.includes(m.id));
  if (!left.length) { body.innerHTML = '<p>Tous les cadeaux ont déjà été ouverts. 💗</p>'; return; }
  const m = left[Math.floor(Math.random() * left.length)];
  state.opened.push(m.id);
  state.pending = Math.max(0, state.pending - 1);
  save();
  refresh();
  showMedia(m, true);
}

function showMedia(m, fresh) {
  const isVideo = m.type === 'video';
  openDialog(fresh ? 'TON CADEAU MYSTÈRE' : 'SOUVENIR', isVideo ? `Vidéo ${pad(m.n)}` : `Message audio ${pad(m.n)}`);
  body.innerHTML = '<div class="media-reveal"></div>';
  const box = body.firstElementChild;
  if (fresh) box.insertAdjacentHTML('beforeend', `<p>${isVideo ? 'C’était une vidéo ! 🎬' : 'C’était un message audio ! 🎧'}</p>`);
  if (!isVideo) box.insertAdjacentHTML('beforeend', '<div class="bigicon">🎧</div>');

  const el = document.createElement(m.type);
  el.controls = true;
  el.preload = 'metadata';
  el.src = m.src;
  if (isVideo) el.playsInline = true;
  el.onerror = () => {
    el.replaceWith(Object.assign(document.createElement('div'), {
      className: 'missing',
      textContent: `Fichier introuvable : ${m.src}. Ajoute-le dans le dossier du site.`
    }));
  };
  box.append(el);
  if (fresh) el.play().catch(() => {});

  if (fresh && state.pending > 0) {
    const more = document.createElement('button');
    more.className = 'primary';
    more.textContent = `Ouvrir une autre boîte (${state.pending})`;
    more.onclick = showReward;
    box.append(more);
  }
}

/* ============================================================
   LES 5 ÉPREUVES
   ============================================================ */
const LABELS = {
  quiz: 'ÉPREUVE 01 · QCM', riddle: 'ÉPREUVE 02 · ÉNIGME', guess: 'ÉPREUVE 03 · DEVINETTE',
  memory: 'ÉPREUVE 04 · MÉMOIRE', lucky: 'ÉPREUVE 05 · HASARD'
};

function answers(k, list, okMsg, badMsg) {
  $$('.answer').forEach(b => b.onclick = () => {
    if (b.dataset.ok === '1') {
      b.classList.add('correct');
      $$('.answer').forEach(x => x.disabled = true);
      win(k, okMsg);
    } else {
      b.classList.add('wrong');
      feedback.textContent = badMsg;
    }
  });
}

function openGame(k) {
  openDialog(LABELS[k], 'Prête ?');

  if (k === 'quiz') {
    $('#gameTitle').textContent = 'Question pour une championne';
    body.innerHTML = `<p>Quelle est la meilleure façon de célébrer une personne exceptionnelle ?</p>
      <div class="answers">
        <button class="answer" data-ok="0">Faire comme si c’était un lundi normal 😴</button>
        <button class="answer" data-ok="1">Lui rappeler qu’elle mérite plein de bonheur 💗</button>
        <button class="answer" data-ok="0">Lui donner des devoirs supplémentaires 📚</button>
        <button class="answer" data-ok="0">Annuler le gâteau. Jamais ! 🎂</button>
      </div>`;
    answers(k, null, 'Bonne réponse ! Badge « reine du jour » débloqué 👑', 'Mauvaise réponse… essaie encore 😏');
  }

  if (k === 'riddle') {
    $('#gameTitle').textContent = 'L’énigme du gâteau';
    body.innerHTML = `<p>Je grandis chaque année, mais je ne suis pas un arbre. On me célèbre avec des bougies, mais je ne suis pas une fête nationale. Qui suis-je ?</p>
      <div class="answers">
        <button class="answer" data-ok="0">Un volcan 🌋</button>
        <button class="answer" data-ok="1">Un anniversaire 🎂</button>
        <button class="answer" data-ok="0">Une connexion Wi-Fi 📶</button>
      </div>`;
    answers(k, null, 'Exact ! Ton cerveau est en mode fête 🧠✨', 'Pas tout à fait… relis bien l’énigme !');
  }

  if (k === 'guess') {
    $('#gameTitle').textContent = 'Qui suis-je ?';
    body.innerHTML = `<p>Indice 1 : je peux être soufflé, mais je ne suis pas le vent.<br>Indice 2 : plus il y en a, plus la fête est jolie.<br>Indice 3 : on me place sur le gâteau. 🕯️</p>
      <input class="gameinput" id="guessInput" placeholder="Ta réponse…" autocomplete="off">
      <button class="primary" id="checkGuess">Valider ma réponse</button>`;
    const check = () => {
      const v = $('#guessInput').value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
      v.includes(CONFIG.guessAnswer)
        ? win(k, 'Bien deviné ! Part de gâteau virtuelle 🍰')
        : (feedback.textContent = 'Indice bonus : on les allume avant de souffler… 😉');
    };
    $('#checkGuess').onclick = check;
    $('#guessInput').addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
  }

  if (k === 'memory') {
    $('#gameTitle').textContent = 'Retrouve les paires';
    const cards = shuffle(['🎂', '💗', '🎁', '🌸', '🎉', '⭐', '🎂', '💗', '🎁', '🌸', '🎉', '⭐']);
    body.innerHTML = `<p>Retourne les cartes et retrouve les 6 paires. C’est plus facile que de résister au gâteau.</p>
      <div class="memoryboard">${cards.map((e, i) => `<button class="memorycard" data-i="${i}" data-e="${e}" aria-label="Carte ${i + 1}">?</button>`).join('')}</div>
      <p id="score">Paires trouvées : 0 / 6</p>`;
    const cs = $$('.memorycard');
    let opened = [], matched = 0, busy = false;
    cs.forEach(c => c.onclick = () => {
      if (busy || c.classList.contains('matched') || opened.includes(c)) return;
      c.textContent = c.dataset.e;
      opened.push(c);
      if (opened.length < 2) return;
      const [a, b] = opened;
      if (a.dataset.e === b.dataset.e) {
        a.classList.add('matched'); b.classList.add('matched');
        opened = []; matched++;
        $('#score').textContent = `Paires trouvées : ${matched} / 6`;
        if (matched === 6) win(k, 'Mémoire légendaire ! Toutes les paires retrouvées 🏆');
      } else {
        busy = true;
        setTimeout(() => { a.textContent = '?'; b.textContent = '?'; opened = []; busy = false; }, 650);
      }
    });
  }

  if (k === 'lucky') {
    $('#gameTitle').textContent = 'La roue des surprises';
    body.innerHTML = `<p>La roue a quelque chose à te dire. Fais-la tourner et découvre ton message du jour.</p>
      <div id="wheel" aria-hidden="true">✦</div>
      <div class="center"><button class="primary" id="spin">Faire tourner la roue</button></div>`;
    let turn = 0;
    $('#spin').onclick = () => {
      turn++;
      $('#wheel').style.transform = `rotate(${turn * 720 + Math.random() * 360}deg)`;
      $('#spin').disabled = true;
      setTimeout(() => {
        const msgs = ['Tu mérites une journée magique ✨', 'Un beau souvenir t’attend bientôt 📸', 'Ton sourire est obligatoire 😁', 'Une pluie de bonnes nouvelles arrive 🌸', 'Tu es la star de cette mission 👑', 'Garde une part de gâteau 🍰'];
        win(k, 'La roue a parlé : ' + msgs[Math.floor(Math.random() * msgs.length)]);
        $('#spin').disabled = false;
      }, 2000);
    };
  }
}

/* ============================================================
   COLLAGE PHOTO : 7 emplacements, ordre / tailles / angles aléatoires
   ============================================================ */
function buildCollage() {
  const ratios = shuffle(['3/4', '1/1', '4/5', '4/3', '2/3', '1/1', '3/4']);
  const order = shuffle(Array.from({ length: CONFIG.photos }, (_, i) => i + 1));
  order.forEach((num, i) => {
    const n = pad(num), el = document.createElement('figure');
    el.className = 'frame';
    el.style.aspectRatio = ratios[i % ratios.length];
    el.style.setProperty('--tilt', ((Math.random() * 4 - 2)).toFixed(1) + 'deg');
    el.innerHTML = `<span class="symbol">✧</span><small>Photo ${n}<br>assets/images/photo-${n}.jpg</small>`;
    const img = new Image();
    img.alt = `Souvenir ${n}`;
    img.onload = () => { el.innerHTML = ''; el.append(img); };
    img.src = `assets/images/photo-${n}.jpg`;
    $('#photoGrid').append(el);
  });
}

/* ============================================================
   ÉVÉNEMENTS
   ============================================================ */
$$('[data-game]').forEach(b => b.onclick = () => openGame(b.dataset.game));
$('#close').onclick = () => dialog.close();
dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => { body.innerHTML = ''; feedback.textContent = ''; }); // arrête les médias en cours

$('#start').onclick = () => $('#games').scrollIntoView({ behavior: 'smooth' });
$('#unlock').onclick = () => state.pending > 0 ? showReward() : $('#vault').scrollIntoView({ behavior: 'smooth' });
$('#bonus').onclick = () => {
  MEDIA.forEach(m => { if (!state.opened.includes(m.id)) state.opened.push(m.id); });
  save(); refresh(); confetti(160);
  toast('Toutes les boîtes sont ouvertes ! 🎉');
  $('#vault').scrollIntoView({ behavior: 'smooth' });
};
$$('.tabs button').forEach(b => b.onclick = () => {
  $$('.tabs button').forEach(x => x.classList.toggle('active', x === b));
  $$('.panel').forEach(p => p.classList.toggle('active', p.id === b.dataset.tab));
});
$('#confetti').onclick = () => { confetti(150); toast('Vœux de bonheur envoyés dans l’univers 💗'); };
$('#sound').onclick = () => toast('Le site est silencieux : les audios sont dans tes cadeaux mystère.');

buildCollage();
refresh();
