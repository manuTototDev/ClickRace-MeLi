/**
 * ClickRace - TRÓPICA · Mercado Ads
 * WIREFRAME MODE — serverless, sin socket.io, sin animaciones.
 * Estado 100% en el navegador. Compatible con Vercel / CDN estático.
 */

// ─── Config ───────────────────────────────────────────────────
const GAME_CONFIG = {
  CLICKS_TO_WIN: 50,
  LEVELS: [
    { label: 'Sin audiencia',  threshold: 0    },
    { label: 'Interés',        threshold: 0.25 },
    { label: 'Lealtad',        threshold: 0.55 },
    { label: '¡Comprador!',    threshold: 1.0  },
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

  overlay:          $('overlay'),
  overlayCountdown: $('overlay-countdown'),
  overlayWinner:    $('overlay-winner'),
  countdownNumber:  $('countdown-number'),
  winnerName:       $('winner-name'),

  btnStart:     $('btn-start'),
  btnReset:     $('btn-reset'),
  startArea:    $('start-area'),
  statusArea:   $('status-area'),

  btnPlayer1:   $('btn-player-1'),
  btnPlayer2:   $('btn-player-2'),
  btnPlayAgain: $('btn-play-again'),
};

// ─── State ────────────────────────────────────────────────────
function freshState() {
  return {
    status: 'waiting',   // waiting | countdown | playing | finished
    players: {
      1: { clicks: 0, progress: 0, level: 0 },
      2: { clicks: 0, progress: 0, level: 0 },
    },
    winner: null,
  };
}
let gameState = freshState();

// ─── Auto-reset timer (8s sin presionar "otra ronda") ─────────
const AUTO_RESET_SECS = 8;
let autoResetTimer = null;
let autoResetTick  = null;

function startAutoReset() {
  const bar   = $('auto-reset-bar');
  const count = $('auto-reset-count');
  if (!bar || !count) return;

  let remaining = AUTO_RESET_SECS;
  count.textContent = remaining;

  // Barra: reducción directa via JS (sin CSS animation)
  bar.style.transformOrigin = 'left';
  bar.style.transform = 'scaleX(1)';

  autoResetTick = setInterval(function () {
    remaining--;
    if (count) count.textContent = remaining;
    if (bar)   bar.style.transform = 'scaleX(' + (remaining / AUTO_RESET_SECS) + ')';
    if (remaining <= 0) clearInterval(autoResetTick);
  }, 1000);

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
  var splash = $('splash');
  if (!splash) return;
  splash.style.pointerEvents = '';
  splash.style.display = '';
}

// ─── Followers: 0 → 500K exponencial ─────────────────────────
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

// ─── UI: sin animaciones, todo instantáneo ────────────────────
function updatePlayerUI(player, data) {
  const display = formatFollowers(progressToFollowers(data.progress));

  // Barra: salto directo
  DOM.fill[player].style.height = (data.progress * 100) + '%';

  // Contador
  DOM.counter[player].textContent = display;
  const len = display.length;
  DOM.counter[player].style.fontSize =
    len >= 5 ? '8vmin' : len >= 4 ? '9.5vmin' : '11vmin';

  // Badge de nivel
  const levelNames = ['Lv.1 · Sin audiencia', 'Lv.2 · Interés', 'Lv.3 · Lealtad', 'Lv.4 · ¡Comprador!'];
  if (DOM.badgeText[player]) {
    DOM.badgeText[player].textContent = levelNames[data.level] ?? ('Lv.' + (data.level + 1));
  }

  // Dots: ON/OFF instantáneo
  const zoneEl = document.getElementById('totem-' + player);
  if (zoneEl) {
    const dots = Array.from(zoneEl.querySelectorAll('.bar-dot')).reverse();
    dots.forEach((dot, i) => {
      dot.style.background  = i <= data.level ? '#444' : '';
      dot.style.borderColor = i <= data.level ? '#444' : '';
      dot.style.boxShadow   = '';
    });
  }
}

// ─── Countdown: texto directo, sin fade ───────────────────────
function showCountdown(seconds) {
  DOM.overlay.classList.remove('hidden');
  DOM.overlayCountdown.classList.remove('hidden');
  DOM.overlayWinner.classList.add('hidden');

  if (seconds === 0) {
    DOM.countdownNumber.textContent = '¡YA!';
    setTimeout(() => DOM.overlay.classList.add('hidden'), 700);
  } else {
    DOM.countdownNumber.textContent = seconds;
  }
}

// ─── Game Start ───────────────────────────────────────────────
function startGame() {
  DOM.fill[1].style.height = '0%';
  DOM.fill[2].style.height = '0%';
  DOM.counter[1].textContent = '0';
  DOM.counter[2].textContent = '0';
}

// ─── Game Finish ──────────────────────────────────────────────
function finishGame(winner) {
  gameState.status = 'finished';

  DOM.overlay.classList.remove('hidden');
  DOM.overlayCountdown.classList.add('hidden');
  DOM.overlayWinner.classList.remove('hidden');
  DOM.winnerName.textContent = 'JUGADOR ' + winner;

  startAutoReset();
}

// ─── Reset ────────────────────────────────────────────────────
function actionReset() {
  cancelAutoReset();
  gameState = freshState();

  DOM.overlay.classList.add('hidden');
  DOM.totem[1].classList.remove('totem--winner');
  DOM.totem[2].classList.remove('totem--winner');

  DOM.fill[1].style.height = '0%';
  DOM.fill[2].style.height = '0%';
  DOM.counter[1].textContent = '0';
  DOM.counter[2].textContent = '0';

  document.querySelectorAll('.bar-dot').forEach(dot => {
    dot.style.background = dot.style.borderColor = dot.style.boxShadow = '';
  });

  if (DOM.badgeText[1]) DOM.badgeText[1].textContent = 'Lv.1 · Sin audiencia';
  if (DOM.badgeText[2]) DOM.badgeText[2].textContent = 'Lv.1 · Sin audiencia';
}

// ─── Action: iniciar ──────────────────────────────────────────
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
      showCountdown(0);
      setTimeout(() => {
        gameState.status = 'playing';
        startGame();
      }, 800);
    }
  }, 1000);
}

// ─── Action: click de jugador ─────────────────────────────────
function actionClick(player) {
  if (gameState.status !== 'playing') return;

  const p = gameState.players[player];
  p.clicks   = Math.min(p.clicks + 1, GAME_CONFIG.CLICKS_TO_WIN);
  p.progress = p.clicks / GAME_CONFIG.CLICKS_TO_WIN;

  // Nivel
  const levels = GAME_CONFIG.LEVELS;
  for (let i = levels.length - 1; i >= 0; i--) {
    if (p.progress >= levels[i].threshold) { p.level = i; break; }
  }

  updatePlayerUI(player, p);

  // Win check
  if (p.clicks >= GAME_CONFIG.CLICKS_TO_WIN) {
    finishGame(player);
  }
}

// ─── Event Listeners ──────────────────────────────────────────
DOM.btnStart.addEventListener('click',     () => actionStart());
DOM.btnPlayAgain.addEventListener('click', () => {
  cancelAutoReset();
  actionReset();
  setTimeout(() => actionStart(), 300);
});
DOM.btnReset.addEventListener('click',     () => { actionReset(); showSplash(); });
DOM.btnPlayer1.addEventListener('click',   () => actionClick(1));
DOM.btnPlayer2.addEventListener('click',   () => actionClick(2));

// Atajos de teclado
document.addEventListener('keydown', e => {
  if (e.repeat) return;
  if (e.key === 'f' || e.key === 'F') actionClick(1);
  if (e.key === 'j' || e.key === 'J') actionClick(2);
});
