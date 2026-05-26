/**
 * ClickRace - TRÓPICA · Mercado Ads
 * WIREFRAME MODE — sin animaciones, updates directos al DOM
 */

const socket = io();

// ─── Config ───────────────────────────────────────────────────
let CONFIG = { CLICKS_TO_WIN: 50, LEVELS: [] };

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
let gameActive = false;

// ─── Socket Events ────────────────────────────────────────────
socket.on('state:sync',    ({ gameState, config }) => { CONFIG = config; applyState(gameState); });
socket.on('game:countdown',({ seconds }) => showCountdown(seconds));
socket.on('game:start',    ({ config }) => { CONFIG = config; startGame(); });
socket.on('player:update', ({ player, data }) => updatePlayerUI(player, data));
socket.on('game:finished', ({ winner, players }) => finishGame(winner, players));
socket.on('game:reset',    () => resetUI());

// ─── Event Listeners ──────────────────────────────────────────
DOM.btnStart.addEventListener('click',     () => socket.emit('game:start', { market: 'MX' }));
DOM.btnPlayAgain.addEventListener('click', () => socket.emit('game:reset'));
DOM.btnReset.addEventListener('click',     () => socket.emit('game:reset'));
DOM.btnPlayer1.addEventListener('click',   () => emitClick(1));
DOM.btnPlayer2.addEventListener('click',   () => emitClick(2));

document.addEventListener('keydown', e => {
  if (e.repeat) return;
  if (e.key === 'f' || e.key === 'F') emitClick(1);
  if (e.key === 'j' || e.key === 'J') emitClick(2);
});

// Hint teclado
const hint = document.createElement('div');
hint.className = 'key-hint';
hint.innerHTML = 'Teclado: <kbd>F</kbd> = Jugador 1 &nbsp;|&nbsp; <kbd>J</kbd> = Jugador 2';
document.body.appendChild(hint);

// ─── Actions ──────────────────────────────────────────────────
function emitClick(player) {
  if (!gameActive) return;
  socket.emit('player:click', { player });
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
  DOM.fill[player].style.height = `${data.progress * 100}%`;

  // Contador con fuente dinámica
  DOM.counter[player].textContent = display;
  const len = display.length;
  DOM.counter[player].style.fontSize =
    len >= 5 ? '8vmin' : len >= 4 ? '9.5vmin' : '11vmin';

  // Badge de nivel — texto corto estilo wireframe
  const levelNames = ['Lv.1 · Sin audiencia', 'Lv.2 · Interés', 'Lv.3 · Lealtad', 'Lv.4 · ¡Comprador!'];
  if (DOM.badgeText[player]) {
    DOM.badgeText[player].textContent = levelNames[data.level] ?? `Lv.${data.level + 1}`;
  }

  // Dots: ON/OFF instantáneo, sin color
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
  gameActive = true;
  DOM.startArea.classList.add('hidden');
  DOM.statusArea.classList.remove('hidden');

  DOM.fill[1].style.height = '0%';
  DOM.fill[2].style.height = '0%';
  DOM.counter[1].textContent = '0';
  DOM.counter[2].textContent = '0';
}

// ─── Game Finish ──────────────────────────────────────────────
function finishGame(winner, players) {
  gameActive = false;
  updatePlayerUI(1, players[1]);
  updatePlayerUI(2, players[2]);

  DOM.overlay.classList.remove('hidden');
  DOM.overlayCountdown.classList.add('hidden');
  DOM.overlayWinner.classList.remove('hidden');
  DOM.winnerName.textContent = `JUGADOR ${winner}`;
}

// ─── Reset ────────────────────────────────────────────────────
function resetUI() {
  gameActive = false;

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

  if (DOM.badgeText[1]) DOM.badgeText[1].textContent = 'Lv.1 · Sin audiencia';
  if (DOM.badgeText[2]) DOM.badgeText[2].textContent = 'Lv.1 · Sin audiencia';
}

// ─── Apply state on reconnect ─────────────────────────────────
function applyState(gs) {
  if (!gs) return;
  if (gs.status === 'playing') {
    gameActive = true;
    DOM.startArea.classList.add('hidden');
    DOM.statusArea.classList.remove('hidden');
    updatePlayerUI(1, gs.players[1]);
    updatePlayerUI(2, gs.players[2]);
  } else if (gs.status === 'finished') {
    finishGame(gs.winner, gs.players);
  }
}
