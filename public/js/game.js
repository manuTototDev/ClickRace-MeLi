/**
 * ClickRace - TRÓPICA · Mercado Ads
 * WIREFRAME MODE — serverless, sin socket.io, sin animaciones.
 * Estado 100% en el navegador. Compatible con Vercel estático.
 */

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
    status: 'waiting',
    players: {
      1: { clicks: 0, progress: 0, level: 0 },
      2: { clicks: 0, progress: 0, level: 0 },
    },
    winner: null,
  };
}
let gameState = freshState();

// ─── Event Listeners ──────────────────────────────────────────
DOM.btnStart.addEventListener('click',     () => actionStart());
DOM.btnPlayAgain.addEventListener('click', () => actionReset());
DOM.btnReset.addEventListener('click',     () => actionReset());
DOM.btnPlayer1.addEventListener('click',   () => actionClick(1));
DOM.btnPlayer2.addEventListener('click',   () => actionClick(2));

document.addEventListener('keydown', e => {
  if (e.repeat) return;
  if (e.key === 'f' || e.key === 'F') actionClick(1);
  if (e.key === 'j' || e.key === 'J') actionClick(2);
});

// Hint teclado
const hint = document.createElement('div');
hint.className = 'key-hint';
hint.innerHTML = 'Teclado: <kbd>F</kbd> = Jugador 1 &nbsp;|&nbsp; <kbd>J</kbd> = Jugador 2';
document.body.appendChild(hint);

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
      showCountdown(0);
      setTimeout(() => {
        gameState.status = 'playing';
        startGame();
      }, 700);
    }
  }, 1000);
}

function actionClick(player) {
  if (gameState.status !== 'playing') return;

  const p = gameState.players[player];
  p.clicks   = Math.min(p.clicks + 1, GAME_CONFIG.CLICKS_TO_WIN);
  p.progress = p.clicks / GAME_CONFIG.CLICKS_TO_WIN;

  const levels = GAME_CONFIG.LEVELS;
  for (let i = levels.length - 1; i >= 0; i--) {
    if (p.progress >= levels[i].threshold) { p.level = i; break; }
  }

  updatePlayerUI(player, p);

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

// ─── UI: todo instantáneo, sin animaciones ────────────────────
function updatePlayerUI(player, data) {
  const display = formatFollowers(progressToFollowers(data.progress));

  // Barra: salto directo
  DOM.fill[player].style.height = `${data.progress * 100}%`;

  // Contador con fuente dinámica
  DOM.counter[player].textContent = display;
  const len = display.length;
  DOM.counter[player].style.fontSize =
    len >= 5 ? '8vmin' : len >= 4 ? '9.5vmin' : '11vmin';

  // Badge de nivel
  const levelNames = ['Lv.1 · Inicio', 'Lv.2 · Comunidad', 'Lv.3 · Leales', 'Lv.4 · ¡Cima!'];
  if (DOM.badgeText[player]) {
    DOM.badgeText[player].textContent = levelNames[data.level] ?? `Lv.${data.level + 1}`;
  }

  // Dots: ON/OFF instantáneo, sin color ni glow
  const zoneEl = document.getElementById(`totem-${player}`);
  if (zoneEl) {
    const dots = Array.from(zoneEl.querySelectorAll('.bar-dot')).reverse();
    dots.forEach((dot, i) => {
      dot.style.background  = i <= data.level ? '#444' : '';
      dot.style.borderColor = i <= data.level ? '#444' : '';
      dot.style.boxShadow   = '';
    });
  }
  // Sin partículas en wireframe
}

// ─── Countdown: texto directo ─────────────────────────────────
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
  DOM.startArea.classList.add('hidden');
  DOM.statusArea.classList.remove('hidden');
  DOM.fill[1].style.height = '0%';
  DOM.fill[2].style.height = '0%';
  DOM.counter[1].textContent = '0';
  DOM.counter[2].textContent = '0';
}

// ─── Game Finish ──────────────────────────────────────────────
function finishGame(winner, players) {
  updatePlayerUI(1, players[1]);
  updatePlayerUI(2, players[2]);

  DOM.overlay.classList.remove('hidden');
  DOM.overlayCountdown.classList.add('hidden');
  DOM.overlayWinner.classList.remove('hidden');
  DOM.winnerName.textContent = `JUGADOR ${winner}`;
}

// ─── Reset UI ─────────────────────────────────────────────────
function resetUI() {
  DOM.overlay.classList.add('hidden');
  DOM.startArea.classList.remove('hidden');
  DOM.statusArea.classList.add('hidden');
  DOM.totem[1].classList.remove('totem--winner');
  DOM.totem[2].classList.remove('totem--winner');

  DOM.fill[1].style.height = '0%';
  DOM.fill[2].style.height = '0%';
  DOM.counter[1].textContent = '0';
  DOM.counter[2].textContent = '0';

  document.querySelectorAll('.bar-dot').forEach(dot => {
    dot.style.background = dot.style.borderColor = dot.style.boxShadow = '';
  });

  if (DOM.badgeText[1]) DOM.badgeText[1].textContent = 'Lv.1 · Inicio';
  if (DOM.badgeText[2]) DOM.badgeText[2].textContent = 'Lv.1 · Inicio';
}
