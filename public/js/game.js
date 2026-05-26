/**
 * ClickRace - TRÓPICA · Mercado Ads
 * Client-side game logic with Socket.io + GSAP
 * Layout: 9:16 vertical nativo
 */

const socket = io();

// ─── Config (filled from server) ──────────────────────────────
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

  overlay:         $('overlay'),
  overlayCountdown:$('overlay-countdown'),
  overlayWinner:   $('overlay-winner'),
  countdownNumber: $('countdown-number'),
  winnerName:      $('winner-name'),

  btnStart:      $('btn-start'),
  btnReset:      $('btn-reset'),
  startArea:     $('start-area'),
  statusArea:    $('status-area'),
  statusText:    $('status-text'),

  btnPlayer1:    $('btn-player-1'),
  btnPlayer2:    $('btn-player-2'),
  btnPlayAgain:  $('btn-play-again'),
};

// ─── State ────────────────────────────────────────────────────
let gameActive = false;

// ─── Socket Events ────────────────────────────────────────────
socket.on('state:sync', ({ gameState, config }) => {
  CONFIG = config;
  applyState(gameState);
});

socket.on('game:countdown', ({ seconds }) => {
  showCountdown(seconds);
});

socket.on('game:start', ({ config }) => {
  CONFIG = config;
  startGame();
});

socket.on('player:update', ({ player, data }) => {
  updatePlayerUI(player, data);
});

socket.on('game:finished', ({ winner, players }) => {
  finishGame(winner, players);
});

socket.on('game:reset', () => {
  resetUI();
});

// ─── UI Actions ───────────────────────────────────────────────
DOM.btnStart.addEventListener('click', () => {
  socket.emit('game:start', { market: 'MX' });
});

DOM.btnPlayAgain.addEventListener('click', () => {
  socket.emit('game:reset');
});

// Boton Reiniciar - visible durante la partida
DOM.btnReset.addEventListener('click', () => {
  socket.emit('game:reset');
});

// Big buttons
DOM.btnPlayer1.addEventListener('click', () => emitClick(1));
DOM.btnPlayer2.addEventListener('click', () => emitClick(2));

// Keyboard shortcuts for testing: F = P1, J = P2
document.addEventListener('keydown', e => {
  if (e.repeat) return;
  if (e.key === 'f' || e.key === 'F') emitClick(1);
  if (e.key === 'j' || e.key === 'J') emitClick(2);
});

// Add keyboard hint — fuera del viewport-shell, solo visible en desktop
const hint = document.createElement('div');
hint.className = 'key-hint';
hint.innerHTML = 'Teclado: <kbd>F</kbd> = Jugador 1 &nbsp;|&nbsp; <kbd>J</kbd> = Jugador 2';
document.body.appendChild(hint);

function emitClick(player) {
  if (!gameActive) return;
  socket.emit('player:click', { player });
  animateButtonPress(player);
}

// Seguidores exponenciales: progress [0-1] -> 0 a 500K con curva ^1.8
// Lento al inicio, explosivo al final
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
  const pct = data.progress * 100;

  // Seguidores con crecimiento exponencial
  const followers = progressToFollowers(data.progress);
  const display   = formatFollowers(followers);

  // Animate progress bar
  gsap.to(DOM.fill[player], {
    height: `${pct}%`,
    duration: 0.2,
    ease: 'power2.out',
  });

  // Counter: muestra seguidores formateados
  DOM.counter[player].textContent = display;

  // Fuente dinâmica: más chars → más pequeño para que no se salga
  const len = display.length;
  const fontSize = len >= 5 ? '8vmin'
                 : len >= 4 ? '9.5vmin'
                 :            '11vmin';
  DOM.counter[player].style.fontSize = fontSize;

  gsap.fromTo(DOM.counter[player],
    { scale: 1.3 },
    { scale: 1, duration: 0.2, ease: 'back.out(2)' }
  );

  // Update level text & badge
  const levelNames = [
    'Lv.1 · Inicio',
    'Lv.2 · Comunidad',
    'Lv.3 · Leales',
    'Lv.4 · ¡CIMA!',
  ];
  const levelIndex = data.level;
  if (DOM.badgeText[player]) {
    DOM.badgeText[player].textContent = levelNames[levelIndex] || `Lv.${levelIndex + 1}`;
  }

  // Iluminar dots de nivel (bar-dot en bar-level-markers)
  const zoneEl = document.getElementById(`totem-${player}`);
  if (zoneEl) {
    // Los markers están ordenados top→bottom en DOM pero bottom→top en porcentaje
    // Revertimos para que índice 0 = marker de abajo (Inicio)
    const dots = Array.from(zoneEl.querySelectorAll('.bar-dot')).reverse();
    dots.forEach((dot, i) => {
      if (i <= levelIndex) {
        dot.style.background = player === 1 ? '#FFE600' : '#00D4FF';
        dot.style.borderColor = player === 1 ? '#FFE600' : '#00D4FF';
        dot.style.boxShadow = `0 0 2vmin ${player === 1 ? '#FFE600' : '#00D4FF'}`;
      } else {
        dot.style.background = '';
        dot.style.borderColor = '';
        dot.style.boxShadow = '';
      }
    });
  }

  // Spawn particles on level up
  if (data.level > 0 && data.clicks % Math.floor(CONFIG.CLICKS_TO_WIN * (CONFIG.LEVELS[data.level]?.threshold || 1)) === 0) {
    spawnParticles(player);
  }
}

function spawnParticles(player) {
  const container = DOM.particles[player];
  const color = player === 1 ? '#FFE600' : '#00D4FF';

  for (let i = 0; i < 8; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.background = color;
    p.style.left = `${Math.random() * 100}%`;
    p.style.bottom = `0%`;
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
    // "¡YA!" flash then hide
    DOM.countdownNumber.textContent = '¡YA!';
    gsap.fromTo(DOM.countdownNumber,
      { scale: 0.5, opacity: 0 },
      { scale: 1.2, opacity: 1, duration: 0.3, ease: 'back.out(3)',
        onComplete: () => {
          gsap.to(DOM.countdownNumber, {
            scale: 2, opacity: 0, duration: 0.4,
            onComplete: () => { DOM.overlay.classList.add('hidden'); }
          });
        }
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
  gameActive = true;
  DOM.startArea.classList.add('hidden');
  DOM.statusArea.classList.remove('hidden');

  // Reset bar heights (vertical)
  gsap.set([DOM.fill[1], DOM.fill[2]], { height: '0%' });
  DOM.counter[1].textContent = '0';
  DOM.counter[2].textContent = '0';

  // Animate totems in
  gsap.fromTo([DOM.totem[1], DOM.totem[2]],
    { scale: 0.96, opacity: 0.7 },
    { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.5)' }
  );
}

// ─── Game Finish ──────────────────────────────────────────────
function finishGame(winner, players) {
  gameActive = false;

  // Update final bars
  updatePlayerUI(1, players[1]);
  updatePlayerUI(2, players[2]);

  // Highlight winner totem
  const loser = winner === 1 ? 2 : 1;
  DOM.totem[winner].classList.add('totem--winner');
  gsap.to(DOM.totem[loser], { opacity: 0.4, scale: 0.97, duration: 0.5 });

  // Show winner overlay after delay
  setTimeout(() => {
    DOM.overlay.classList.remove('hidden');
    DOM.overlayCountdown.classList.add('hidden');
    DOM.overlayWinner.classList.remove('hidden');
    DOM.winnerName.textContent = `JUGADOR ${winner}`;

    gsap.fromTo(DOM.overlayWinner,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(2)' }
    );
  }, 600);
}

// ─── Reset ────────────────────────────────────────────────────
function resetUI() {
  gameActive = false;

  DOM.overlay.classList.add('hidden');
  DOM.startArea.classList.remove('hidden');
  DOM.statusArea.classList.add('hidden');
  DOM.totem[1].classList.remove('totem--winner');
  DOM.totem[2].classList.remove('totem--winner');

  gsap.to([DOM.totem[1], DOM.totem[2]], { opacity: 1, scale: 1, duration: 0.4 });
  gsap.to([DOM.fill[1], DOM.fill[2]], { height: '0%', duration: 0.6, ease: 'power2.inOut' });

  DOM.counter[1].textContent = '0';
  DOM.counter[2].textContent = '0';

  // Reset bar dots
  document.querySelectorAll('.bar-dot').forEach(dot => {
    dot.style.background = '';
    dot.style.borderColor = '';
    dot.style.boxShadow = '';
  });

  // Reset badges
  if (DOM.badgeText[1]) DOM.badgeText[1].textContent = 'Lv.1 · Inicio';
  if (DOM.badgeText[2]) DOM.badgeText[2].textContent = 'Lv.1 · Inicio';
}

// ─── Apply server state (on reconnect) ────────────────────────
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
