<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#4b2e22">
  <title>Joyeux anniversaire, Ansima</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@500&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Great+Vibes&family=Inter:wght@400;500;600&family=Lora:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body class="locked">

  <!-- Écran de démarrage -->
  <div class="splash" id="splash">
    <div class="splash-photo" id="splashPhoto"></div>
    <div class="splash-shade" id="splashShade"></div>
    <div class="splash-ui">
      <button class="skip" id="skip">Passer</button>
      <div class="splash-text" id="splashText" aria-live="polite"></div>
      <button class="btn primary enter" id="enterBtn">Entrer dans l'aventure</button>
    </div>
  </div>

  <!-- Vidéo d'introduction -->
  <div class="introv" id="introv" role="dialog" aria-modal="true">
    <div class="introbox">
      <video id="bdayVideo" src="assets/videos/1.mp4" preload="auto" playsinline controls></video>
      <div class="introbar">
        <span id="introHint">Installe-toi confortablement et profite de ta vidéo.</span>
        <button class="btn primary" id="introGo">Continuer</button>
      </div>
    </div>
  </div>

  <header>
    <a class="brand" href="#home">Ansima<span> · 05.11</span></a>
    <nav aria-label="Navigation">
      <a href="#game">Épreuves</a><a href="#surprises">Trésors</a><a href="#story">Histoire</a>
    </nav>
  </header>

  <main>
    <!-- Hero -->
    <section class="hero" id="home">
      <div class="hero-bg" aria-hidden="true"></div>
      <svg class="bunting" id="bunting" viewBox="0 0 1200 110" preserveAspectRatio="none" aria-hidden="true"></svg>
      <div class="wrap hero-in">
        <p class="eyebrow rv">5 Novembre · Jour spécial</p>
        <h1 class="rv" style="--d:.1s">Joyeux anniversaire,<span class="script">Ansima</span></h1>
        <p class="lead rv" style="--d:.2s">Des épreuves à relever, des surprises cachées dans des boîtes mystères, et une histoire écrite spécialement pour toi. Relève les défis pour tout débloquer !</p>
        <div class="actions rv" style="--d:.3s">
          <a class="btn primary" href="#game">Commencer les épreuves</a>
          <a class="btn ghost light" href="#wish">Faire un vœu</a>
        </div>
        <ul class="facts rv" style="--d:.4s">
          <li><b>7</b><span>épreuves</span></li>
          <li><b data-fill="items">16</b><span>surprises</span></li>
          <li><b>∞</b><span>sourires</span></li>
        </ul>
      </div>
    </section>

    <!-- Le Gâteau & Vœu -->
    <section class="sec tint" id="wish">
      <div class="wrap g g-wish">
        <div class="cakewrap rv rv-l" id="cakewrap">
          <svg class="cake-svg" id="cake" viewBox="0 0 320 300" role="img" aria-label="Gâteau d'anniversaire">
            <ellipse cx="160" cy="276" rx="150" ry="14" fill="#e9e5df"/>
            <ellipse cx="160" cy="270" rx="132" ry="10" fill="#fff"/>
            <rect x="48" y="172" width="224" height="96" rx="12" fill="#4b2e22"/>
            <rect x="48" y="172" width="224" height="26" rx="12" fill="#fff"/>
            <g fill="#fff"><circle cx="62" cy="196" r="14"/><circle cx="90" cy="196" r="14"/><circle cx="118" cy="196" r="14"/><circle cx="146" cy="196" r="14"/><circle cx="174" cy="196" r="14"/><circle cx="202" cy="196" r="14"/><circle cx="230" cy="196" r="14"/><circle cx="258" cy="196" r="14"/></g>
            <rect x="88" y="110" width="144" height="66" rx="12" fill="#6b4231"/>
            <rect x="88" y="110" width="144" height="22" rx="11" fill="#fff"/>
            <g id="candles"></g>
          </svg>
        </div>
        <div class="hd rv rv-r">
          <p class="eyebrow">01 · Tradition</p>
          <h2 class="h2">Ferme les yeux<br>et fais un vœu.</h2>
        </div>
        <div class="bd rv rv-r">
          <p class="muted">Cinq bougies, un souffle magique. Clique sur le gâteau pour souffler les bougies et garder ton vœu secret.</p>
          <button class="btn primary" id="blow" aria-pressed="false">Souffler les bougies</button>
          <p class="wishmsg hand" id="wishMsg" aria-live="polite"></p>
        </div>
      </div>
    </section>

    <!-- Zone de jeu / Épreuves -->
    <section class="sec" id="game">
      <div class="wrap g g-game">
        <figure class="photo frame rv rv-l" data-file="d.jpeg"><img loading="lazy" src="assets/images/d.jpeg" alt="Ansima"></figure>
        <div class="hd rv rv-r">
          <p class="eyebrow">02 · Les épreuves</p>
          <h2 class="h2">Relève les défis.</h2>
        </div>
        <div class="card rv" id="gameCard" aria-live="polite"></div>
      </div>
    </section>

    <!-- Coffre des surprises -->
    <section class="sec tint" id="surprises">
      <div class="wrap">
        <div class="rv rv-r">
          <p class="eyebrow">03 · Trésors cachés</p>
          <h2 class="h2">Vidéos &amp; messages audio.</h2>
          <p class="muted" id="vaultNote"></p>
        </div>
        <div class="tags" id="tagGrid"></div>
      </div>
    </section>

    <!-- Histoire / Livre -->
    <section class="sec" id="story">
      <div class="wrap g g-story">
        <div class="hd rv rv-l">
          <p class="eyebrow">04 · L'histoire</p>
          <h2 class="h2">Un livre ouvert<br>rien que pour toi.</h2>
        </div>
        <figure class="photo passe rv rv-l" data-file="e.jpeg"><img loading="lazy" src="assets/images/e.jpeg" alt="Ansima"></figure>
        <button class="bookcover rv rv-r" id="bookCard" aria-label="Ouvrir le livre">
          <span class="bc-title">Ansima</span>
          <span class="bc-sub">Une histoire pour ton anniversaire</span>
          <span class="bc-lock" id="bookLock">Réponds à la première question pour déverrouiller</span>
        </button>
        <div class="bd rv rv-r">
          <p class="muted">Tourne les pages, plonge dans les souvenirs et savoure chaque mot. Disponible en français et en anglais.</p>
        </div>
      </div>
    </section>

    <!-- Finale -->
    <section class="photoband" data-split>
      <div class="wrap"><p class="quote rv">Que cette nouvelle année te ressemble :<br>lumineuse, courageuse et pleine de joie.</p></div>
    </section>

    <section class="finale" data-split>
      <div class="wrap">
        <p class="script big rv">Joyeux anniversaire, Ansima.</p>
        <p class="closing rv" id="closing"></p>
        <a class="btn primary rv" href="#home">Retour en haut</a>
      </div>
    </section>
  </main>

  <footer>
    <span>Ansima · 05.11.2026</span>
    <a href="#home">Haut de page ↑</a>
  </footer>

  <!-- Modale média -->
  <dialog id="player" aria-labelledby="playerTitle">
    <button class="close" id="playerClose" aria-label="Fermer">×</button>
    <p class="eyebrow" id="playerKind"></p>
    <h3 id="playerTitle"></h3>
    <div id="playerBody"></div>
  </dialog>

  <dialog id="lightbox" class="lb" aria-label="Agrandissement photo">
    <button class="close" id="lbClose" aria-label="Fermer">×</button>
    <img id="lbImg" alt="">
  </dialog>

  <!-- Lecteur de livre interactif -->
  <div class="reader" id="reader" role="dialog" aria-modal="true" aria-label="Le livre">
    <div class="rbar">
      <div class="lang" role="group" aria-label="Langue">
        <button id="langFr" class="on">FR</button>
        <button id="langEn">EN</button>
      </div>
      <button class="rclose" id="readerClose">Fermer ×</button>
    </div>
    <div class="stage" id="stage"><div class="bk" id="bk"></div></div>
    <div class="rnav">
      <button class="btn ghost light" id="prevPage">← Précédent</button>
      <span id="pageInfo"></span>
      <button class="btn ghost light" id="shutBook">Fermer la couverture</button>
      <button class="btn primary" id="nextPage">Suivant →</button>
    </div>
  </div>

  <script src="assets/js/content.js"></script>
  <script src="assets/js/script.js"></script>
</body>
</html>