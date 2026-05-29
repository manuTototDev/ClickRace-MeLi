/**
 * ClickRace - TRÓPICA · Mercado Ads
 * Versión serverless: estado 100% en el navegador, sin servidor.
 * Compatible con Vercel / cualquier CDN estático.
 */

// ─── Mercados / Localización ──────────────────────────────────
const MARKETS = {
  MX: {
    flag: '🇲🇽', name: 'México',
    header:    'AUMENTA TUS SEGUIDORES',
    subtitle:  '¿QUIÉN LLEGA PRIMERO?',
    countdown: '¡A AUMENTAR SEGUIDORES!',
    cta:       '¡CLICKEA Y CONSTRUYE TU AUDIENCIA!',
    btnLabel:  'SEGUIR',
    winner:    '¡TOP OF RETAIL MEDIA!',
    playAgain: '¡OTRA RONDA!',
    markers:   ['AUDIENCIA', 'LEALES', 'COMPRADORES'],
    levels:    ['Sin audiencia', 'Interés', 'Lealtad', '¡Comprador!'],
    splashHeadline: '¡GANA\nSEGUIDORES!',
    splashSub:      'MÁS SEGUIDORES, MÁS VENTAS',
    playerLabel:    'JUGADOR',
    playerShort:    'J',
    goLabel:        '¡YA!',
    levelNames:     ['Lv.1 · Inicio', 'Lv.2 · Comunidad', 'Lv.3 · Leales', 'Lv.4 · ¡CIMA!'],
    modalTitle:     'SELECCIONAR MERCADO',
    splashBanner:   'THE CLICK RACE',
    ctaBarLabel:    '¡CLICKEA Y CONSTRUYE TU AUDIENCIA!',
  },
  BR: {
    flag: '🇧🇷', name: 'Brasil',
    header:    'AUMENTE SEUS SEGUIDORES',
    subtitle:  'QUEM CHEGA PRIMEIRO?',
    countdown: 'A AUMENTAR SEGUIDORES!',
    cta:       'CLIQUE E CONSTRUA SUA AUDIÊNCIA!',
    btnLabel:  'SEGUIR',
    winner:    'TOP OF RETAIL MEDIA!',
    playAgain: 'MAIS UMA RODADA!',
    markers:   ['AUDIÊNCIA', 'FIÉIS', 'COMPRADORES'],
    levels:    ['Sem audiência', 'Interesse', 'Lealdade', 'Comprador!'],
    splashHeadline: 'GANHE\nSEGUIDORES!',
    splashSub:      'MAIS SEGUIDORES, MAIS VENDAS',
    playerLabel:    'JOGADOR',
    playerShort:    'J',
    goLabel:        'JÁ!',
    levelNames:     ['Lv.1 · Início', 'Lv.2 · Comunidade', 'Lv.3 · Fiéis', 'Lv.4 · TOPO!'],
    modalTitle:     'SELECIONAR MERCADO',
    splashBanner:   'THE CLICK RACE',
    ctaBarLabel:    'CLIQUE E CONSTRUA SUA AUDIÊNCIA!',
  },
  AR: {
    flag: '🇦🇷', name: 'Argentina',
    header:    'AUMENTÁ TUS SEGUIDORES',
    subtitle:  '¿QUIÉN LLEGA PRIMERO?',
    countdown: '¡A AUMENTAR SEGUIDORES!',
    cta:       '¡CLICKEÁ Y CONSTRUÍ TU AUDIENCIA!',
    btnLabel:  'SEGUIR',
    winner:    '¡TOP OF RETAIL MEDIA!',
    playAgain: '¡OTRA RONDA!',
    markers:   ['AUDIENCIA', 'LEALES', 'COMPRADORES'],
    levels:    ['Sin audiencia', 'Interés', 'Lealtad', '¡Comprador!'],
    splashHeadline: '¡GANÁ\nSEGUIDORES!',
    splashSub:      'MÁS SEGUIDORES, MÁS VENTAS',
    playerLabel:    'JUGADOR',
    playerShort:    'J',
    goLabel:        '¡YA!',
    levelNames:     ['Lv.1 · Inicio', 'Lv.2 · Comunidad', 'Lv.3 · Leales', 'Lv.4 · ¡CIMA!'],
    modalTitle:     'SELECCIONAR MERCADO',
    splashBanner:   'THE CLICK RACE',
    ctaBarLabel:    '¡CLICKEÁ Y CONSTRUÍ TU AUDIENCIA!',
  },
  CL: {
    flag: '🇨🇱', name: 'Chile',
    header:    'AUMENTA TUS SEGUIDORES',
    subtitle:  '¿QUIÉN LLEGA PRIMERO?',
    countdown: '¡A AUMENTAR SEGUIDORES!',
    cta:       '¡CLICKEA Y CONSTRUYE TU AUDIENCIA!',
    btnLabel:  'SEGUIR',
    winner:    '¡TOP OF RETAIL MEDIA!',
    playAgain: '¡OTRA RONDA!',
    markers:   ['AUDIENCIA', 'LEALES', 'COMPRADORES'],
    levels:    ['Sin audiencia', 'Interés', 'Lealtad', '¡Comprador!'],
    splashHeadline: '¡GANA\nSEGUIDORES!',
    splashSub:      'MÁS SEGUIDORES, MÁS VENTAS',
    playerLabel:    'JUGADOR',
    playerShort:    'J',
    goLabel:        '¡YA!',
    levelNames:     ['Lv.1 · Inicio', 'Lv.2 · Comunidad', 'Lv.3 · Leales', 'Lv.4 · ¡CIMA!'],
    modalTitle:     'SELECCIONAR MERCADO',
    splashBanner:   'THE CLICK RACE',
    ctaBarLabel:    '¡CLICKEA Y CONSTRUYE TU AUDIENCIA!',
  },
  CO: {
    flag: '🇨🇴', name: 'Colombia',
    header:    'AUMENTA TUS SEGUIDORES',
    subtitle:  '¿QUIÉN LLEGA PRIMERO?',
    countdown: '¡A AUMENTAR SEGUIDORES!',
    cta:       '¡CLICKEA Y CONSTRUYE TU AUDIENCIA!',
    btnLabel:  'SEGUIR',
    winner:    '¡TOP OF RETAIL MEDIA!',
    playAgain: '¡OTRA RONDA!',
    markers:   ['AUDIENCIA', 'LEALES', 'COMPRADORES'],
    levels:    ['Sin audiencia', 'Interés', 'Lealtad', '¡Comprador!'],
    splashHeadline: '¡GANA\nSEGUIDORES!',
    splashSub:      'MÁS SEGUIDORES, MÁS VENTAS',
    playerLabel:    'JUGADOR',
    playerShort:    'J',
    goLabel:        '¡YA!',
    levelNames:     ['Lv.1 · Inicio', 'Lv.2 · Comunidad', 'Lv.3 · Leales', 'Lv.4 · ¡CIMA!'],
    modalTitle:     'SELECCIONAR MERCADO',
    splashBanner:   'THE CLICK RACE',
    ctaBarLabel:    '¡CLICKEA Y CONSTRUYE TU AUDIENCIA!',
  },
  UY: {
    flag: '🇺🇾', name: 'Uruguay',
    header:    'AUMENTÁ TUS SEGUIDORES',
    subtitle:  '¿QUIÉN LLEGA PRIMERO?',
    countdown: '¡A AUMENTAR SEGUIDORES!',
    cta:       '¡CLICKEÁ Y CONSTRUÍ TU AUDIENCIA!',
    btnLabel:  'SEGUIR',
    winner:    '¡TOP OF RETAIL MEDIA!',
    playAgain: '¡OTRA RONDA!',
    markers:   ['AUDIENCIA', 'LEALES', 'COMPRADORES'],
    levels:    ['Sin audiencia', 'Interés', 'Lealtad', '¡Comprador!'],
    splashHeadline: '¡GANÁ\nSEGUIDORES!',
    splashSub:      'MÁS SEGUIDORES, MÁS VENTAS',
    playerLabel:    'JUGADOR',
    playerShort:    'J',
    goLabel:        '¡YA!',
    levelNames:     ['Lv.1 · Inicio', 'Lv.2 · Comunidad', 'Lv.3 · Leales', 'Lv.4 · ¡CIMA!'],
    modalTitle:     'SELECCIONAR MERCADO',
    splashBanner:   'THE CLICK RACE',
    ctaBarLabel:    '¡CLICKEÁ Y CONSTRUÍ TU AUDIENCIA!',
  },
};

let currentMarket = localStorage.getItem('clickrace_market') || 'AR';

function applyMarket(code) {
  const m = MARKETS[code];
  if (!m) return;
  currentMarket = code;
  localStorage.setItem('clickrace_market', code);

  // ── challenge title (game area) ──
  const titleEl = document.querySelector('.challenge-title');
  if (titleEl) titleEl.innerHTML = `${m.header} <span>${m.subtitle}</span>`;

  // ── CTA bar ──
  const ctaEl = document.querySelector('.cta-bar');
  if (ctaEl) ctaEl.textContent = m.cta;

  // ── Botones SEGUIR (reconstruye con playerLabel localizado) ──
  document.querySelectorAll('.button-label').forEach((el, i) => {
    const sub = el.querySelector('.button-label-sub');
    if (sub) {
      const playerNum = i + 1;
      el.innerHTML = `${m.btnLabel} <span class="button-label-sub">${m.playerLabel} ${playerNum}</span>`;
    }
  });

  // ── Countdown label ──
  const countdownLabel = document.querySelector('.overlay-label');
  if (countdownLabel) countdownLabel.textContent = m.countdown;

  // ── Winner label y play again ──
  const winnerLabel = document.querySelector('.winner-label');
  if (winnerLabel) winnerLabel.textContent = m.winner;

  const playAgainBtn = document.getElementById('btn-play-again');
  if (playAgainBtn) playAgainBtn.textContent = m.playAgain;

  // ── Markers de las barras ──
  const markersP1 = document.querySelectorAll('#totem-1 .bar-marker-label');
  if (markersP1.length >= 3) {
    markersP1[0].textContent = m.markers[2];
    markersP1[1].textContent = m.markers[1];
    markersP1[2].textContent = m.markers[0];
  }
  const markersP2 = document.querySelectorAll('#totem-2 .bar-marker-label');
  if (markersP2.length >= 3) {
    markersP2[0].textContent = m.markers[2];
    markersP2[1].textContent = m.markers[1];
    markersP2[2].textContent = m.markers[0];
  }

  // ── Splash headline y subtítulo ──
  const splashMain = document.querySelector('.splash-headline-main');
  if (splashMain) splashMain.innerHTML = m.splashHeadline.replace('\n', '<br>');
  const splashSub = document.querySelector('.splash-headline-sub');
  if (splashSub) splashSub.textContent = m.splashSub;

  // ── Nombres de jugadores (game area) ──
  document.querySelectorAll('.player-name').forEach((el, i) => {
    el.textContent = `${m.playerLabel} ${i + 1}`;
  });

  // ── Etiquetas cortas (J1 / J2) ──
  const tags = document.querySelectorAll('.player-tag');
  tags.forEach((tag, i) => { tag.textContent = `${m.playerShort}${i + 1}`; });

  // ── Badges de nivel (estado inicial) ──
  const badge1 = document.getElementById('badge-text-1');
  const badge2 = document.getElementById('badge-text-2');
  if (badge1 && !badge1.dataset.active) badge1.textContent = m.levelNames[0];
  if (badge2 && !badge2.dataset.active) badge2.textContent = m.levelNames[0];

  // ── Winner name si ya hay ganador ──
  const winnerName = document.getElementById('winner-name');
  if (winnerName && winnerName.dataset.winner) {
    winnerName.textContent = `${m.playerLabel} ${winnerName.dataset.winner}`;
  }

  // ── Título del modal ──
  const modalTitleEl = document.querySelector('.market-modal-title');
  if (modalTitleEl) modalTitleEl.textContent = m.modalTitle ?? 'SELECCIONAR MERCADO';

  // ── Splash banner ──
  const splashBannerEl = document.querySelector('.splash-banner');
  if (splashBannerEl) splashBannerEl.textContent = m.splashBanner ?? 'THE CLICK RACE';

  // ── Botones del market: marcar activo y actualizar nombre con playerLabel si aplica ──
  document.querySelectorAll('.market-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.market === code);
  });
}

// ─── Config ───────────────────────────────────────────────────
const GAME_CONFIG = {
  CLICKS_TO_WIN: 50,
  LEVELS: [
    { label: 'Punto de Partida',    threshold: 0    },
    { label: 'Comunidad Creciente', threshold: 0.25 },
    { label: 'Seguidores Leales',   threshold: 0.55 },
    { label: 'Cima de Seguidores',  threshold: 1.0  },
  ],
};


// ─── DOM References ───────────────────────────────────────────
const $ = id => document.getElementById(id);

const DOM = {
  fill:       { 1: $('fill-1'),       2: $('fill-2')       },
  counter:    { 1: $('counter-1'),    2: $('counter-2')    },
  badge:      { 1: $('badge-1'),      2: $('badge-2')      },
  badgeText:  { 1: $('badge-text-1'), 2: $('badge-text-2') },
  totem:      { 1: $('totem-1'),      2: $('totem-2')      },
  particles:  { 1: $('particles-1'),  2: $('particles-2')  },

  overlay:          $('overlay'),
  overlayCountdown: $('overlay-countdown'),
  overlayWinner:    $('overlay-winner'),
  countdownNumber:  $('countdown-number'),
  winnerName:       $('winner-name'),

  btnStart:     $('btn-start'),
  btnReset:     $('btn-reset'),
  startArea:    $('start-area'),
  statusArea:   $('status-area'),
  statusText:   $('status-text'),

  btnPlayer1:   $('btn-player-1'),
  btnPlayer2:   $('btn-player-2'),
  btnPlayAgain: $('btn-play-again'),
};

// ─── State ────────────────────────────────────────────────────
function freshState() {
  return {
    status: 'waiting',  // waiting | countdown | playing | finished
    players: {
      1: { clicks: 0, progress: 0, level: 0 },
      2: { clicks: 0, progress: 0, level: 0 },
    },
    winner: null,
  };
}

let gameState = freshState();

// ── Auto-reset timer ──────────────────────────────────────────
const AUTO_RESET_SECS = 8;
let autoResetTimer  = null;
let autoResetTick   = null;

function startAutoReset() {
  const bar   = document.getElementById('auto-reset-bar');
  const count = document.getElementById('auto-reset-count');
  if (!bar || !count) return;

  let remaining = AUTO_RESET_SECS;
  count.textContent = remaining;

  // Barra CSS animada
  bar.style.setProperty('--drain-dur', AUTO_RESET_SECS + 's');
  bar.classList.remove('running');
  // forzar reflow para reiniciar animación
  void bar.offsetWidth;
  bar.style.setProperty('animation-duration', AUTO_RESET_SECS + 's');
  bar.classList.add('running');

  // Contador de segundos
  autoResetTick = setInterval(function () {
    remaining--;
    if (count) count.textContent = remaining;
    if (remaining <= 0) {
      clearInterval(autoResetTick);
    }
  }, 1000);

  // Trigger de reset
  autoResetTimer = setTimeout(function () {
    clearInterval(autoResetTick);
    actionReset();
    showSplash();
  }, AUTO_RESET_SECS * 1000);
}

function cancelAutoReset() {
  clearTimeout(autoResetTimer);
  clearInterval(autoResetTick);
  autoResetTimer = null;
}

function showSplash() {
  var splash = document.getElementById('splash');
  if (!splash) return;
  splash.classList.remove('splash--out');
  splash.style.display = '';
  // re-trigger animation
  splash.style.animation = 'none';
  void splash.offsetWidth;
  splash.style.animation = '';
}

// ─── Event Listeners ──────────────────────────────────────────
DOM.btnStart.addEventListener('click',     () => actionStart());
DOM.btnPlayAgain.addEventListener('click', () => {
  cancelAutoReset();
  actionReset();
  // Pequeño delay para que el overlay se oculte antes del countdown
  setTimeout(() => actionStart(), 300);
});
DOM.btnReset.addEventListener('click',     () => actionReset());
DOM.btnPlayer1.addEventListener('click',   () => actionClick(1));
DOM.btnPlayer2.addEventListener('click',   () => actionClick(2));

// Atajos de teclado (debug/escritorio)
document.addEventListener('keydown', e => {
  if (e.repeat) return;
  if (e.key === 'f' || e.key === 'F') actionClick(1);
  if (e.key === 'j' || e.key === 'J') actionClick(2);
});



// ─── Market modal ─────────────────────────────────────────────
const marketModal = document.getElementById('market-modal');
const btnMarket   = document.getElementById('btn-market');

btnMarket.addEventListener('click', () => {
  marketModal.classList.toggle('hidden');
});

marketModal.addEventListener('click', e => {
  if (e.target === marketModal) marketModal.classList.add('hidden');
});

document.querySelectorAll('.market-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    applyMarket(btn.dataset.market);
    marketModal.classList.add('hidden');
  });
});

// Inicializar mercado al cargar
applyMarket(currentMarket);


// ─── Game Actions ─────────────────────────────────────────────

function actionStart() {
  if (gameState.status !== 'waiting') return;
  gameState.status = 'countdown';

  let count = 3;
  showCountdown(count);

  const timer = setInterval(() => {
    count--;
    if (count > 0) {
      showCountdown(count);
    } else {
      clearInterval(timer);
      showCountdown(0); // muestra "¡YA!"
      setTimeout(() => {
        gameState.status = 'playing';
        startGame();
      }, 800);
    }
  }, 1000);
}

function actionClick(player) {
  if (gameState.status !== 'playing') return;

  const p = gameState.players[player];
  p.clicks   = Math.min(p.clicks + 1, GAME_CONFIG.CLICKS_TO_WIN);
  p.progress = p.clicks / GAME_CONFIG.CLICKS_TO_WIN;

  // Actualizar nivel
  const levels = GAME_CONFIG.LEVELS;
  for (let i = levels.length - 1; i >= 0; i--) {
    if (p.progress >= levels[i].threshold) { p.level = i; break; }
  }

  updatePlayerUI(player, p);
  animateButtonPress(player);

  // ¿Ganó?
  if (p.clicks >= GAME_CONFIG.CLICKS_TO_WIN) {
    gameState.status = 'finished';
    gameState.winner = player;
    finishGame(player, gameState.players);
  }
}

function actionReset() {
  gameState = freshState();
  resetUI();
}

// ─── Followers: crecimiento exponencial 0 → 500K ──────────────
function progressToFollowers(progress) {
  if (progress <= 0) return 0;
  if (progress >= 1) return 500000;
  return Math.round(500000 * Math.pow(progress, 1.8));
}

function formatFollowers(n) {
  if (n >= 500000) return '500K';
  if (n >= 100000) return Math.round(n / 1000) + 'K';
  if (n >= 10000)  return (n / 1000).toFixed(1) + 'K';
  if (n >= 1000)   return (n / 1000).toFixed(1) + 'K';
  return n.toLocaleString();
}

// ─── Animations ───────────────────────────────────────────────
function animateButtonPress(player) {
  const btn = player === 1 ? DOM.btnPlayer1 : DOM.btnPlayer2;
  gsap.fromTo(btn,
    { scale: 0.88 },
    { scale: 1, duration: 0.3, ease: 'back.out(2)' }
  );
}

function updatePlayerUI(player, data) {
  const pct      = data.progress * 100;
  const followers = progressToFollowers(data.progress);
  const display   = formatFollowers(followers);

  // Barra de progreso
  gsap.to(DOM.fill[player], {
    height: `${pct}%`,
    duration: 0.2,
    ease: 'power2.out',
  });

  // Contador con tamaño dinámico
  DOM.counter[player].textContent = display;
  const len = display.length;
  DOM.counter[player].style.fontSize =
    len >= 5 ? '8vmin' : len >= 4 ? '9.5vmin' : '11vmin';

  gsap.fromTo(DOM.counter[player],
    { scale: 1.3 },
    { scale: 1, duration: 0.2, ease: 'back.out(2)' }
  );

  // Badge de nivel (usa traducción del mercado actual)
  const m = MARKETS[currentMarket];
  const levelNames = m?.levelNames ?? [
    'Lv.1 · Inicio',
    'Lv.2 · Comunidad',
    'Lv.3 · Leales',
    'Lv.4 · ¡CIMA!',
  ];
  if (DOM.badgeText[player]) {
    DOM.badgeText[player].dataset.active = '1';
    DOM.badgeText[player].textContent = levelNames[data.level] ?? `Lv.${data.level + 1}`;
  }

  // Dots de nivel en la barra
  const zoneEl = document.getElementById(`totem-${player}`);
  if (zoneEl) {
    const dots = Array.from(zoneEl.querySelectorAll('.bar-dot')).reverse();
    dots.forEach((dot, i) => {
      if (i <= data.level) {
        dot.style.background  = player === 1 ? '#FFE600' : '#00D4FF';
        dot.style.borderColor = player === 1 ? '#FFE600' : '#00D4FF';
        dot.style.boxShadow   = `0 0 2vmin ${player === 1 ? '#FFE600' : '#00D4FF'}`;
      } else {
        dot.style.background = dot.style.borderColor = dot.style.boxShadow = '';
      }
    });
  }

  // Partículas al subir de nivel
  const threshold = GAME_CONFIG.LEVELS[data.level]?.threshold ?? 1;
  if (data.level > 0 && data.clicks === Math.floor(GAME_CONFIG.CLICKS_TO_WIN * threshold)) {
    spawnParticles(player);
  }
}

function spawnParticles(player) {
  const container = DOM.particles[player];
  const color     = player === 1 ? '#FFE600' : '#00D4FF';

  for (let i = 0; i < 8; i++) {
    const p = document.createElement('div');
    p.className   = 'particle';
    p.style.background = color;
    p.style.left  = `${Math.random() * 100}%`;
    p.style.bottom = '0%';
    container.appendChild(p);

    gsap.fromTo(p,
      { y: 0, x: 0, opacity: 1, scale: 1 },
      {
        y: -(30 + Math.random() * 60),
        x: (Math.random() - 0.5) * 30,
        opacity: 0,
        scale: 0,
        duration: 0.6 + Math.random() * 0.4,
        ease: 'power2.out',
        onComplete: () => p.remove(),
      }
    );
  }
}

// ─── Countdown ────────────────────────────────────────────────
function showCountdown(seconds) {
  DOM.overlay.classList.remove('hidden');
  DOM.overlayCountdown.classList.remove('hidden');
  DOM.overlayWinner.classList.add('hidden');

  if (seconds === 0) {
    const goText = MARKETS[currentMarket]?.goLabel ?? '¡YA!';
    DOM.countdownNumber.textContent = goText;
    gsap.fromTo(DOM.countdownNumber,
      { scale: 0.5, opacity: 0 },
      {
        scale: 1.2, opacity: 1, duration: 0.3, ease: 'back.out(3)',
        onComplete: () => {
          gsap.to(DOM.countdownNumber, {
            scale: 2, opacity: 0, duration: 0.4,
            onComplete: () => DOM.overlay.classList.add('hidden'),
          });
        },
      }
    );
  } else {
    DOM.countdownNumber.textContent = seconds;
    gsap.fromTo(DOM.countdownNumber,
      { scale: 1.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' }
    );
  }
}

// ─── Game Start ───────────────────────────────────────────────
function startGame() {
  DOM.startArea.classList.add('hidden');
  DOM.statusArea.classList.remove('hidden');

  gsap.set([DOM.fill[1], DOM.fill[2]], { height: '0%' });
  DOM.counter[1].textContent = '0';
  DOM.counter[2].textContent = '0';

  gsap.fromTo([DOM.totem[1], DOM.totem[2]],
    { scale: 0.96, opacity: 0.7 },
    { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.5)' }
  );
}

// ─── Game Finish ──────────────────────────────────────────────
function finishGame(winner, players) {
  updatePlayerUI(1, players[1]);
  updatePlayerUI(2, players[2]);

  const loser = winner === 1 ? 2 : 1;
  DOM.totem[winner].classList.add('totem--winner');
  gsap.to(DOM.totem[loser], { opacity: 0.4, scale: 0.97, duration: 0.5 });

  setTimeout(() => {
    DOM.overlay.classList.remove('hidden');
    DOM.overlayCountdown.classList.add('hidden');
    DOM.overlayWinner.classList.remove('hidden');
    const mWinner = MARKETS[currentMarket];
    DOM.winnerName.textContent = `${mWinner?.playerLabel ?? 'JUGADOR'} ${winner}`;
    DOM.winnerName.dataset.winner = winner;

    gsap.fromTo(DOM.overlayWinner,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(2)',
        onComplete: () => startAutoReset()
      }
    );
  }, 600);
}

// ─── Reset UI ─────────────────────────────────────────────────
function resetUI() {
  DOM.overlay.classList.add('hidden');
  DOM.startArea.classList.remove('hidden');
  DOM.statusArea.classList.add('hidden');
  DOM.totem[1].classList.remove('totem--winner');
  DOM.totem[2].classList.remove('totem--winner');

  gsap.to([DOM.totem[1], DOM.totem[2]], { opacity: 1, scale: 1, duration: 0.4 });
  gsap.to([DOM.fill[1], DOM.fill[2]], { height: '0%', duration: 0.6, ease: 'power2.inOut' });

  DOM.counter[1].textContent = '0';
  DOM.counter[2].textContent = '0';

  document.querySelectorAll('.bar-dot').forEach(dot => {
    dot.style.background = dot.style.borderColor = dot.style.boxShadow = '';
  });

  const mReset = MARKETS[currentMarket];
  const resetLevel = mReset?.levelNames?.[0] ?? 'Lv.1 · Inicio';
  if (DOM.badgeText[1]) { DOM.badgeText[1].textContent = resetLevel; delete DOM.badgeText[1].dataset.active; }
  if (DOM.badgeText[2]) { DOM.badgeText[2].textContent = resetLevel; delete DOM.badgeText[2].dataset.active; }
}
