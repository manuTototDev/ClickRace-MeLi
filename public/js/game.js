/**
 * ClickRace — TRÓPICA · Mercado Ads
 * ANIMATED MODE — GSAP + partículas + micro-interacciones
 */

const socket = io();

// ─── Config ───────────────────────────────────────────────────
let CONFIG = { CLICKS_TO_WIN: 50, LEVELS: [] };

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
  },
};

let currentMarket = localStorage.getItem('clickrace_market') || 'AR';

function applyMarket(code) {
  const m = MARKETS[code];
  if (!m) return;
  currentMarket = code;
  localStorage.setItem('clickrace_market', code);

  const titleEl = document.querySelector('.challenge-title');
  if (titleEl) titleEl.innerHTML = `${m.header} <span>${m.subtitle}</span>`;

  const ctaEl = document.querySelector('.cta-bar');
  if (ctaEl) ctaEl.textContent = m.cta;

  document.querySelectorAll('.button-label').forEach(el => {
    const sub = el.querySelector('.button-label-sub');
    if (sub) {
      const subText = sub.outerHTML;
      el.innerHTML = `${m.btnLabel} ${subText}`;
    }
  });

  const countdownLabel = document.querySelector('.overlay-label');
  if (countdownLabel) countdownLabel.textContent = m.countdown;

  const winnerLabel = document.querySelector('.winner-label');
  if (winnerLabel) winnerLabel.textContent = m.winner;

  const playAgainBtn = document.getElementById('btn-play-again');
  if (playAgainBtn) playAgainBtn.textContent = m.playAgain;

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

  if (DOM.badgeText[1]) DOM.badgeText[1].textContent = `Lv.1 · ${m.levels[0]}`;
  if (DOM.badgeText[2]) DOM.badgeText[2].textContent = `Lv.1 · ${m.levels[0]}`;

  document.querySelectorAll('.market-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.market === code);
  });
}

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
// Track previous level to detect level-ups
const prevLevel = { 1: 0, 2: 0 };
// Track displayed number for smooth counting
const displayedValue = { 1: 0, 2: 0 };

// ─── Socket Events ────────────────────────────────────────────
socket.on('state:sync',    ({ gameState, config }) => { CONFIG = config; applyState(gameState); });
socket.on('game:countdown',({ seconds }) => showCountdown(seconds));
socket.on('game:start',    ({ config }) => { CONFIG = config; startGame(); });
socket.on('player:update', ({ player, data }) => updatePlayerUI(player, data));
socket.on('game:finished', ({ winner, players }) => finishGame(winner, players));
socket.on('game:reset',    () => resetUI());

// ─── Event Listeners ──────────────────────────────────────────
DOM.btnStart.addEventListener('click',     () => socket.emit('game:start', { market: currentMarket }));
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

// ─── Market modal ─────────────────────────────────────────────
const marketModal = document.getElementById('market-modal');
const btnMarket   = document.getElementById('btn-market');

btnMarket.addEventListener('click', () => marketModal.classList.toggle('hidden'));

marketModal.addEventListener('click', e => {
  if (e.target === marketModal) marketModal.classList.add('hidden');
});

document.querySelectorAll('.market-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    applyMarket(btn.dataset.market);
    marketModal.classList.add('hidden');
  });
});

document.addEventListener('DOMContentLoaded', () => applyMarket(currentMarket));
if (document.readyState !== 'loading') applyMarket(currentMarket);

// ─── Actions ──────────────────────────────────────────────────
function emitClick(player) {
  if (!gameActive) return;
  socket.emit('player:click', { player });
  animateButtonPress(player);
}

// ─── Button press micro-animation ────────────────────────────
function animateButtonPress(player) {
  const btn = player === 1 ? DOM.btnPlayer1 : DOM.btnPlayer2;
  const inner = btn.querySelector('.button-label');
  if (!inner) return;
  gsap.fromTo(inner,
    { scale: 0.92, backgroundColor: '#333' },
    { scale: 1, backgroundColor: '#111111', duration: 0.35, ease: 'back.out(2)' }
  );
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

// ─── Update Player UI — con GSAP ─────────────────────────────
function updatePlayerUI(player, data) {
  const targetVal   = progressToFollowers(data.progress);
  const targetPct   = data.progress * 100;

  // ── 1. Barra: animación suave con GSAP ──
  gsap.to(DOM.fill[player], {
    height: `${targetPct}%`,
    duration: 0.45,
    ease: 'power2.out',
  });

  // ── 2. Contador: pop + número animado ──
  const counterEl = DOM.counter[player];
  const from = displayedValue[player];
  displayedValue[player] = targetVal;

  gsap.to({ val: from }, {
    val: targetVal,
    duration: 0.4,
    ease: 'power1.out',
    onUpdate: function () {
      const v = Math.round(this.targets()[0].val);
      const display = formatFollowers(v);
      counterEl.textContent = display;
      const len = display.length;
      counterEl.style.fontSize = len >= 5 ? '8vmin' : len >= 4 ? '9.5vmin' : '12vmin';
    },
  });

  // Pop de escala en el counter
  gsap.fromTo(counterEl,
    { scale: 1.12 },
    { scale: 1, duration: 0.3, ease: 'back.out(1.5)' }
  );

  // ── 3. Badge de nivel ──
  const m = MARKETS[currentMarket] || MARKETS['AR'];
  const levelNames = m.levels.map((lv, i) => `Lv.${i + 1} · ${lv}`);
  if (DOM.badgeText[player]) {
    const newText = levelNames[data.level] ?? `Lv.${data.level + 1}`;
    if (DOM.badgeText[player].textContent !== newText) {
      gsap.fromTo(DOM.badge[player],
        { scale: 1.15, backgroundColor: '#FFE600', color: '#111' },
        { scale: 1, backgroundColor: '', color: '', duration: 0.5, ease: 'back.out(2)', clearProps: 'backgroundColor,color' }
      );
      DOM.badgeText[player].textContent = newText;
    }
  }

  // ── 4. Level-up explosion ──
  if (data.level > prevLevel[player]) {
    prevLevel[player] = data.level;
    spawnLevelUpBurst(player);
  }

  // ── 5. Dots de nivel ──
  const zoneEl = document.getElementById(`totem-${player}`);
  if (zoneEl) {
    const dots = Array.from(zoneEl.querySelectorAll('.bar-dot')).reverse();
    dots.forEach((dot, i) => {
      const active = i <= data.level;
      gsap.to(dot, {
        backgroundColor: active ? '#FFE600' : 'rgba(255,255,255,0.35)',
        borderColor:     active ? '#111111' : 'rgba(0,0,0,0.15)',
        scale:           active ? 1.25 : 1,
        duration: 0.25,
        ease: 'back.out(1.7)',
      });
    });
  }

  // ── 6. Partículas en la barra ──
  spawnBarParticles(player);
}

// ─── Partículas en la barra ───────────────────────────────────
function spawnBarParticles(player) {
  const container = DOM.particles[player];
  if (!container) return;

  const COLORS = ['#FFE600', '#a855f7', '#ffffff', '#fbbf24'];
  const count = 4;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
    p.style.left = `${20 + Math.random() * 60}%`;
    p.style.bottom = '5px';
    p.style.width = p.style.height = `${0.6 + Math.random() * 0.8}vmin`;
    container.appendChild(p);

    gsap.fromTo(p,
      { opacity: 1, y: 0, x: 0, scale: 1 },
      {
        opacity: 0,
        y: -(20 + Math.random() * 40),
        x: (Math.random() - 0.5) * 20,
        scale: 0.2,
        duration: 0.6 + Math.random() * 0.4,
        ease: 'power2.out',
        onComplete: () => p.remove(),
      }
    );
  }
}

// ─── Explosión de nivel ───────────────────────────────────────
function spawnLevelUpBurst(player) {
  const fill = DOM.fill[player];
  if (!fill) return;

  // Flash en la barra
  gsap.fromTo(fill,
    { filter: 'brightness(2.5)' },
    { filter: 'brightness(1)', duration: 0.5, ease: 'power2.out' }
  );

  // Flash del totem completo
  const totem = DOM.totem[player];
  if (totem) {
    gsap.fromTo(totem,
      { backgroundColor: 'rgba(255,230,0,0.25)' },
      { backgroundColor: 'rgba(255,230,0,0)', duration: 0.7, ease: 'power2.out', clearProps: 'backgroundColor' }
    );
  }

  // Muchas partículas
  const container = DOM.particles[player];
  if (!container) return;
  const COLORS = ['#FFE600', '#a855f7', '#c084fc', '#ffffff', '#fbbf24'];
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
    p.style.left = `${10 + Math.random() * 80}%`;
    p.style.bottom = `${20 + Math.random() * 60}%`;
    p.style.width = p.style.height = `${0.8 + Math.random() * 1.2}vmin`;
    container.appendChild(p);

    gsap.fromTo(p,
      { opacity: 1, y: 0, x: 0, scale: 1 },
      {
        opacity: 0,
        y: -(40 + Math.random() * 80),
        x: (Math.random() - 0.5) * 50,
        scale: 0,
        duration: 0.8 + Math.random() * 0.6,
        delay: Math.random() * 0.15,
        ease: 'power2.out',
        onComplete: () => p.remove(),
      }
    );
  }
}

// ─── Countdown — con GSAP fade + scale ───────────────────────
function showCountdown(seconds) {
  const overlay = DOM.overlay;
  const numEl   = DOM.countdownNumber;

  overlay.classList.remove('hidden');
  DOM.overlayCountdown.classList.remove('hidden');
  DOM.overlayWinner.classList.add('hidden');

  if (seconds === 0) {
    numEl.textContent = '¡YA!';
    gsap.fromTo(numEl,
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)',
        onComplete: () => {
          gsap.to(overlay, {
            opacity: 0, duration: 0.5, delay: 0.4, ease: 'power2.in',
            onComplete: () => {
              overlay.classList.add('hidden');
              gsap.set(overlay, { opacity: 1 });
            }
          });
        }
      }
    );
  } else {
    numEl.textContent = seconds;
    gsap.fromTo(numEl,
      { scale: 1.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.5)' }
    );
  }
}

// ─── Game Start ───────────────────────────────────────────────
function startGame() {
  gameActive = true;
  DOM.startArea.classList.add('hidden');
  DOM.statusArea.classList.remove('hidden');

  gsap.to([DOM.fill[1], DOM.fill[2]], { height: '0%', duration: 0.3 });
  DOM.counter[1].textContent = '0';
  DOM.counter[2].textContent = '0';
  displayedValue[1] = 0;
  displayedValue[2] = 0;
  prevLevel[1] = 0;
  prevLevel[2] = 0;
}

// ─── Game Finish ──────────────────────────────────────────────
function finishGame(winner, players) {
  gameActive = false;
  updatePlayerUI(1, players[1]);
  updatePlayerUI(2, players[2]);

  DOM.totem[winner].classList.add('totem--winner');

  DOM.overlay.classList.remove('hidden');
  DOM.overlayCountdown.classList.add('hidden');
  DOM.overlayWinner.classList.remove('hidden');
  DOM.winnerName.textContent = `JUGADOR ${winner}`;

  // Animación de entrada del overlay ganador
  gsap.fromTo(DOM.overlayWinner,
    { scale: 0.85, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.55, ease: 'back.out(1.8)' }
  );

  // Lluvia de partículas de celebración
  spawnCelebration();
}

// ─── Celebración ──────────────────────────────────────────────
function spawnCelebration() {
  const overlay = DOM.overlay;
  const COLORS  = ['#FFE600', '#a855f7', '#c084fc', '#ffffff', '#f97316', '#22c55e'];

  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.style.cssText = `
      position: absolute;
      width: ${1 + Math.random() * 1.5}vmin;
      height: ${1 + Math.random() * 1.5}vmin;
      background: ${COLORS[Math.floor(Math.random() * COLORS.length)]};
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      left: ${Math.random() * 100}%;
      top: -10px;
      pointer-events: none;
      z-index: 101;
    `;
    overlay.appendChild(p);

    gsap.to(p, {
      y: window.innerHeight + 40,
      x: (Math.random() - 0.5) * 80,
      rotation: Math.random() * 720 - 360,
      opacity: 0,
      duration: 1.5 + Math.random() * 1.5,
      delay: Math.random() * 0.8,
      ease: 'power1.in',
      onComplete: () => p.remove(),
    });
  }
}

// ─── Reset ────────────────────────────────────────────────────
function resetUI() {
  gameActive = false;

  gsap.to(DOM.overlay, {
    opacity: 0, duration: 0.35, ease: 'power2.in',
    onComplete: () => {
      DOM.overlay.classList.add('hidden');
      gsap.set(DOM.overlay, { opacity: 1 });
    }
  });

  DOM.startArea.classList.remove('hidden');
  DOM.statusArea.classList.add('hidden');
  DOM.totem[1].classList.remove('totem--winner');
  DOM.totem[2].classList.remove('totem--winner');

  gsap.to([DOM.fill[1], DOM.fill[2]], { height: '0%', duration: 0.5, ease: 'power2.inOut' });
  DOM.counter[1].textContent = '0';
  DOM.counter[2].textContent = '0';
  displayedValue[1] = 0;
  displayedValue[2] = 0;
  prevLevel[1] = 0;
  prevLevel[2] = 0;

  document.querySelectorAll('.bar-dot').forEach(dot => {
    gsap.to(dot, {
      backgroundColor: 'rgba(255,255,255,0.35)',
      borderColor: 'rgba(0,0,0,0.15)',
      scale: 1,
      duration: 0.2,
    });
  });

  const m = MARKETS[currentMarket] || MARKETS['AR'];
  if (DOM.badgeText[1]) DOM.badgeText[1].textContent = `Lv.1 · ${m.levels[0]}`;
  if (DOM.badgeText[2]) DOM.badgeText[2].textContent = `Lv.1 · ${m.levels[0]}`;
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
