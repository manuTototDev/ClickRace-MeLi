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

  // Helper: set textContent en todos los elementos por selector
  const setAllText = (sel, txt) => document.querySelectorAll(sel).forEach(el => el.textContent = txt);
  const setAllHTML = (sel, html) => document.querySelectorAll(sel).forEach(el => el.innerHTML = html);

  // ── challenge title (game area) ──
  setAllHTML('.challenge-title', `${m.header} <span>${m.subtitle}</span>`);

  // ── CTA bar (una por tótem) ──
  setAllText('.cta-bar', m.cta);

  // ── Botones SEGUIR (cada botón ya tiene data-player) ──
  document.querySelectorAll('.button-label').forEach(el => {
    const btn = el.closest('.big-button');
    const playerNum = btn?.dataset.player ?? '1';
    el.innerHTML = `${m.btnLabel} <span class="button-label-sub">${m.playerLabel} ${playerNum}</span>`;
  });

  // ── Countdown label ──
  setAllText('.overlay-label', m.countdown);

  // ── Winner label y play again ──
  setAllText('.winner-label', m.winner);
  setAllText('.btn-play-again', m.playAgain);

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

  // ── Splash headline y subtítulo (uno por tótem) ──
  setAllHTML('.splash-headline-main', m.splashHeadline.replace('\n', '<br>'));
  setAllText('.splash-headline-sub', m.splashSub);

  // ── Nombres de jugadores (cada tótem tiene 1, con data-player) ──
  document.querySelectorAll('.player-name').forEach(el => {
    const p = el.dataset.player ?? '1';
    el.textContent = `${m.playerLabel} ${p}`;
  });

  // ── Etiquetas cortas (J1 / J2), con data-player ──
  document.querySelectorAll('.player-tag').forEach(tag => {
    const p = tag.dataset.player ?? '1';
    tag.textContent = `${m.playerShort}${p}`;
  });

  // ── Badges de nivel (estado inicial) ──
  const badge1 = document.getElementById('badge-text-1');
  const badge2 = document.getElementById('badge-text-2');
  if (badge1 && !badge1.dataset.active) badge1.textContent = m.levelNames[0];
  if (badge2 && !badge2.dataset.active) badge2.textContent = m.levelNames[0];

  // ── Winner name si ya hay ganador (refleja en todos los tótems) ──
  document.querySelectorAll('.winner-name').forEach(el => {
    if (el.dataset.winner) {
      el.textContent = `${m.playerLabel} ${el.dataset.winner}`;
    }
  });

  // ── Título del modal ──
  setAllText('.market-modal-title', m.modalTitle ?? 'SELECCIONAR MERCADO');

  // ── Splash banner ──
  setAllText('.splash-banner', m.splashBanner ?? 'THE CLICK RACE');

  // ── Botones del market: marcar activo ──
  document.querySelectorAll('.market-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.market === code);
  });
}

// ─── Config ───────────────────────────────────────────────────
const GAME_CONFIG = {
  CLICKS_TO_WIN: 75,
  LEVELS: [
    { label: 'Punto de Partida',    threshold: 0    },
    { label: 'Comunidad Creciente', threshold: 0.25 },
    { label: 'Seguidores Leales',   threshold: 0.55 },
    { label: 'Cima de Seguidores',  threshold: 1.0  },
  ],
};


// ─── DOM References ───────────────────────────────────────────
const $ = id => document.getElementById(id);

const $$ = sel => document.querySelectorAll(sel);

const DOM = {
  fill:       { 1: $('fill-1'),       2: $('fill-2')       },
  counter:    { 1: $('counter-1'),    2: $('counter-2')    },
  badge:      { 1: $('badge-1'),      2: $('badge-2')      },
  badgeText:  { 1: $('badge-text-1'), 2: $('badge-text-2') },
  totem:      { 1: $('totem-1'),      2: $('totem-2')      },
  particles:  { 1: $('particles-1'),  2: $('particles-2')  },

  // Compartidos: hay una instancia en cada tótem, se controlan en simultáneo
  overlays:          $$('.overlay-shared'),
  overlayCountdowns: $$('.overlay-countdown'),
  overlayWinners:    $$('.overlay-winner'),
  countdownNumbers:  $$('.countdown-number'),
  winnerNames:       $$('.winner-name'),

  btnStart:     $('btn-start'),
  btnReset:     $('btn-reset'),
  startArea:    $('start-area'),
  statusArea:   $('status-area'),
  statusText:   $('status-text'),

  btnPlayer1:    $('btn-player-1'),
  btnPlayer2:    $('btn-player-2'),
  btnsPlayAgain: $$('.btn-play-again'),
};

// Helpers para mostrar/ocultar elementos compartidos en ambos tótems
function showAll(nodeList)    { nodeList.forEach(el => el.classList.remove('hidden')); }
function hideAll(nodeList)    { nodeList.forEach(el => el.classList.add('hidden')); }
function setAllText(nodeList, txt) { nodeList.forEach(el => el.textContent = txt); }

// ─── Person Icons — sistema de partículas flotantes ───────────────────
const PLAYER_COLORS = { 1: '#FFE600', 2: '#00D4FF' };

function createPersonSVG(color) {
  return [
    '<svg viewBox="0 0 20 28" xmlns="http://www.w3.org/2000/svg">',
    `  <circle class="pi-head" cx="10" cy="7" r="5.5" fill="${color}"/>`,
    `  <path   class="pi-body" d="M1 27c0-5 4-9 9-9s9 4 9 9z" fill="${color}"/>`,
    '</svg>',
  ].join('');
}

// Spawnea 4 personas flotantes en la altura Y del progreso actual
function spawnPersonIcons(player, progress) {
  const container = DOM.fill[player];
  if (!container) return;

  const color      = PLAYER_COLORS[player];
  // Y base sube con el progreso: 0% = fondo, ~88% = tope
  const baseBottom = progress * 88;

  for (let i = 0; i < 4; i++) {
    const icon = document.createElement('div');
    icon.className = 'float-person';

    const x      = -5 + Math.random() * 75;       // X: -5% – 70% (bordes recortados por overflow)
    const yOff   = (Math.random() - 0.5) * 5;     // ±2.5% jitter en Y
    const bottom = Math.max(0, Math.min(90, baseBottom + yOff));
    const rot    = (Math.random() - 0.5) * 50;    // rotación: −25° – +25°
    const size   = 28 + Math.random() * 14;        // ancho: 28% – 42% del track
    const delay  = i * 55;                         // stagger entre los 4

    icon.style.left           = `${x}%`;
    icon.style.bottom         = `${bottom}%`;
    icon.style.width          = `${size}%`;
    icon.style.animationDelay = `${delay}ms`;
    icon.style.setProperty('--rot', `${rot}deg`);
    icon.innerHTML = createPersonSVG(color);

    container.appendChild(icon);
    // Los iconos se quedan fijos — no hay setTimeout de borrado
  }
}

// Watermark — fondo tenue que crece con el progreso
function ensureWatermark(player) {
  if (!DOM.fill[player]) return null;
  let wm = DOM.fill[player].querySelector('.bar-watermark');
  if (!wm) {
    wm = document.createElement('div');
    wm.className = `bar-watermark bar-watermark--p${player}`;
    DOM.fill[player].prepend(wm);
  }
  return wm;
}


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
  const bars   = document.querySelectorAll('.auto-reset-bar');
  const counts = document.querySelectorAll('.auto-reset-count');
  if (!bars.length || !counts.length) return;

  let remaining = AUTO_RESET_SECS;
  counts.forEach(c => c.textContent = remaining);

  // Barra CSS animada en todos los tótems
  bars.forEach(bar => {
    bar.style.setProperty('--drain-dur', AUTO_RESET_SECS + 's');
    bar.classList.remove('running');
    void bar.offsetWidth; // reflow para reiniciar animación
    bar.style.setProperty('animation-duration', AUTO_RESET_SECS + 's');
    bar.classList.add('running');
  });

  // Contador de segundos
  autoResetTick = setInterval(function () {
    remaining--;
    counts.forEach(c => c.textContent = remaining);
    if (remaining <= 0) clearInterval(autoResetTick);
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

// ── Idle timer: si nadie clickea en 10s durante el juego, volver al splash ──
const IDLE_LIMIT_MS = 10000;
let idleTimer = null;

function resetIdleTimer() {
  clearTimeout(idleTimer);
  if (gameState.status !== 'playing') return;
  idleTimer = setTimeout(() => {
    if (gameState.status !== 'playing') return;
    actionReset();
    showSplash();
  }, IDLE_LIMIT_MS);
}

function clearIdleTimer() {
  clearTimeout(idleTimer);
  idleTimer = null;
}

function showSplash() {
  document.querySelectorAll('.splash').forEach(splash => {
    splash.classList.remove('splash--out');
    splash.style.display = '';
    splash.style.pointerEvents = '';
    // re-trigger animation
    splash.style.animation = 'none';
    void splash.offsetWidth;
    splash.style.animation = '';
  });
}

// ─── Event Listeners ──────────────────────────────────────────
DOM.btnStart.addEventListener('click',     () => actionStart());
// Cualquier botón "¡OTRA RONDA!" de cualquiera de los tótems reinicia
DOM.btnsPlayAgain.forEach(btn => {
  btn.addEventListener('click', () => {
    cancelAutoReset();
    actionReset();
    // Pequeño delay para que el overlay se oculte antes del countdown
    setTimeout(() => actionStart(), 300);
  });
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



// ─── Market modal (uno por tótem, sincronizados) ──────────────
const marketModals = document.querySelectorAll('.market-modal');
const btnMarket    = document.getElementById('btn-market');

function openMarketModals()  { marketModals.forEach(m => m.classList.remove('hidden')); }
function closeMarketModals() { marketModals.forEach(m => m.classList.add('hidden')); }

btnMarket.addEventListener('click', () => {
  // Si alguno está abierto, cerramos todos; si no, abrimos todos
  const anyOpen = Array.from(marketModals).some(m => !m.classList.contains('hidden'));
  if (anyOpen) closeMarketModals(); else openMarketModals();
});

marketModals.forEach(modal => {
  modal.addEventListener('click', e => {
    if (e.target === modal) closeMarketModals();
  });
});

document.querySelectorAll('.market-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    applyMarket(btn.dataset.market);
    closeMarketModals();
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

  resetIdleTimer();

  const p = gameState.players[player];
  const prevLevel = p.level;
  p.clicks   = Math.min(p.clicks + 1, GAME_CONFIG.CLICKS_TO_WIN);
  p.progress = p.clicks / GAME_CONFIG.CLICKS_TO_WIN;

  // Actualizar nivel
  const levels = GAME_CONFIG.LEVELS;
  for (let i = levels.length - 1; i >= 0; i--) {
    if (p.progress >= levels[i].threshold) { p.level = i; break; }
  }

  updatePlayerUI(player, p);
  animateButtonPress(player);

  // Celebración cuando cruza a un nivel nuevo (1, 2 o 3)
  if (p.level > prevLevel && p.level >= 1) {
    spawnCelebrationIcons(player, p.level);
  }

  // ¿Ganó?
  if (p.clicks >= GAME_CONFIG.CLICKS_TO_WIN) {
    gameState.status = 'finished';
    gameState.winner = player;
    finishGame(player, gameState.players);
  }
}

function actionReset() {
  clearIdleTimer();
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

  // ── Personas flotantes + watermark de nivel ───────────────────────
  spawnPersonIcons(player, data.progress);
  const wm = ensureWatermark(player);
  if (wm) gsap.to(wm, { height: `${data.progress * 85}%`, duration: 0.4, ease: 'power2.out' });


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

  // (la celebración por cruce de hito se dispara desde actionClick, donde
  // tenemos el level previo para comparar)
}

function spawnParticles(player) {
  // (efecto antiguo, ya no se llama — reemplazado por spawnCelebrationIcons)
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

// ─── Celebration: personas suben desde abajo, más ícones por hito ─────
// levelIdx: 1 = audiencia, 2 = leales, 3 = compradores
const MILESTONE_FILL_PCT  = { 1: 30, 2: 65, 3: 100 };
const CELEBRATION_COUNTS  = { 1: 15, 2: 35, 3: 70 };  // escala con el hito
const CELEBRATION_COLOR   = '#111111';                  // todos negros

function ensureCelebrationLayer(player) {
  const shell = DOM.totem[player]?.closest('.viewport-shell');
  if (!shell) return null;
  let layer = shell.querySelector('.celebration-layer');
  if (!layer) {
    layer = document.createElement('div');
    layer.className = 'celebration-layer';
    shell.appendChild(layer);
  }
  return layer;
}

function spawnCelebrationIcons(player, levelIdx) {
  const layer = ensureCelebrationLayer(player);
  if (!layer) return;

  const fillPct = MILESTONE_FILL_PCT[levelIdx] ?? 50;
  const count   = CELEBRATION_COUNTS[levelIdx] ?? 20;
  const isFinal = levelIdx === 3;

  for (let i = 0; i < count; i++) {
    const icon = document.createElement('div');
    icon.className = 'celebration-icon';
    icon.innerHTML = createPersonSVG(CELEBRATION_COLOR);

    const size      = 5 + Math.random() * 8;              // 5–13 vmin
    const xPct      = Math.random() * 92;                 // 0–92%
    // bottom: 0% = pegado al piso. Hasta fillPct = altura del hito.
    const bottomPct = Math.random() * fillPct;
    const rotStart  = (Math.random() - 0.5) * 30;
    const rotEnd    = rotStart + (Math.random() - 0.5) * 80;
    const delay     = Math.random() * 350;

    icon.style.left   = `${xPct}%`;
    icon.style.bottom = `${bottomPct}%`;
    icon.style.width  = `${size}vmin`;

    layer.appendChild(icon);   // ← insertar en DOM ANTES de animar

    const tl = gsap.timeline({ delay: delay / 1000 });
    tl.fromTo(icon,
      { y: '50vh', opacity: 0, rotation: rotStart, scale: 0.6 },
      { y: 0, opacity: 1, rotation: rotStart, scale: 1,
        duration: 0.55, ease: 'power2.out' }
    );

    if (isFinal) {
      // Compradores: se quedan llenando la pantalla hasta el reset
      tl.to(icon, { opacity: 0.92, duration: 0.3 });
    } else {
      // Audiencia / Leales: caen como festejo
      tl.to(icon, {
        y: '60vh', opacity: 0, rotation: rotEnd,
        duration: 0.85, ease: 'power2.in', delay: 0.35,
        onComplete: () => icon.remove(),
      });
    }
  }
}

function clearCelebrationLayers() {
  document.querySelectorAll('.celebration-layer').forEach(layer => {
    layer.innerHTML = '';
  });
}

// ─── Countdown ────────────────────────────────────────────────
function showCountdown(seconds) {
  showAll(DOM.overlays);
  showAll(DOM.overlayCountdowns);
  hideAll(DOM.overlayWinners);

  if (seconds === 0) {
    const goText = MARKETS[currentMarket]?.goLabel ?? '¡YA!';
    setAllText(DOM.countdownNumbers, goText);
    gsap.fromTo(DOM.countdownNumbers,
      { scale: 0.5, opacity: 0 },
      {
        scale: 1.2, opacity: 1, duration: 0.3, ease: 'back.out(3)',
        onComplete: () => {
          gsap.to(DOM.countdownNumbers, {
            scale: 2, opacity: 0, duration: 0.4,
            onComplete: () => hideAll(DOM.overlays),
          });
        },
      }
    );
  } else {
    setAllText(DOM.countdownNumbers, seconds);
    gsap.fromTo(DOM.countdownNumbers,
      { scale: 1.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' }
    );
  }
}

// ─── Game Start ───────────────────────────────────────────────
function startGame() {
  DOM.startArea.classList.add('hidden');
  DOM.statusArea.classList.remove('hidden');

  DOM.counter[1].textContent = '0';
  DOM.counter[2].textContent = '0';

  gsap.fromTo([DOM.totem[1], DOM.totem[2]],
    { scale: 0.96, opacity: 0.7 },
    { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.5)' }
  );

  resetIdleTimer();
}

// ─── Game Finish ──────────────────────────────────────────────
function finishGame(winner, players) {
  clearIdleTimer();
  updatePlayerUI(1, players[1]);
  updatePlayerUI(2, players[2]);

  const loser = winner === 1 ? 2 : 1;
  DOM.totem[winner].classList.add('totem--winner');
  gsap.to(DOM.totem[loser], { opacity: 0.4, scale: 0.97, duration: 0.5 });

  // Dejamos que la celebración de COMPRADORES llene la pantalla antes del winner
  setTimeout(() => {
    showAll(DOM.overlays);
    hideAll(DOM.overlayCountdowns);
    showAll(DOM.overlayWinners);
    const mWinner = MARKETS[currentMarket];
    const winnerLabel = `${mWinner?.playerLabel ?? 'JUGADOR'} ${winner}`;
    DOM.winnerNames.forEach(el => {
      el.textContent = winnerLabel;
      el.dataset.winner = winner;
    });

    gsap.fromTo(DOM.overlayWinners,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(2)',
        onComplete: () => startAutoReset()
      }
    );
  }, 1400);
}

// ─── Reset UI ─────────────────────────────────────────────────
function resetUI() {
  hideAll(DOM.overlays);
  DOM.startArea.classList.remove('hidden');
  DOM.statusArea.classList.add('hidden');
  DOM.totem[1].classList.remove('totem--winner');
  DOM.totem[2].classList.remove('totem--winner');

  gsap.to([DOM.totem[1], DOM.totem[2]], { opacity: 1, scale: 1, duration: 0.4 });

  // Limpiar personas flotantes y resetear watermarks
  [1, 2].forEach(p => {
    if (!DOM.fill[p]) return;
    DOM.fill[p].querySelectorAll('.float-person').forEach(el => el.remove());
    const wm = DOM.fill[p].querySelector('.bar-watermark');
    if (wm) gsap.to(wm, { height: '0%', duration: 0.5, ease: 'power2.inOut' });
  });

  // Limpiar capas de celebración
  clearCelebrationLayers();

  DOM.counter[1].textContent = '0';
  DOM.counter[2].textContent = '0';

  document.querySelectorAll('.bar-dot').forEach(dot => {
    dot.style.background = dot.style.borderColor = dot.style.boxShadow = '';
  });

  // Limpia el ganador almacenado en cada winner-name
  DOM.winnerNames.forEach(el => { delete el.dataset.winner; });

  const mReset = MARKETS[currentMarket];
  const resetLevel = mReset?.levelNames?.[0] ?? 'Lv.1 · Inicio';
  if (DOM.badgeText[1]) { DOM.badgeText[1].textContent = resetLevel; delete DOM.badgeText[1].dataset.active; }
  if (DOM.badgeText[2]) { DOM.badgeText[2].textContent = resetLevel; delete DOM.badgeText[2].dataset.active; }
}
