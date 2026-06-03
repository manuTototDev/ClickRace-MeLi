const express = require('express');
const http    = require('http');
const { Server } = require('socket.io');
const path    = require('path');
const { createSession, recordClick, closeSession, getLeaderboard } = require('./db');

const app    = express();
const server = http.createServer(app);
const io     = new Server(server);

const PORT = process.env.PORT || 3000;

// ─── Config ───────────────────────────────────────────────────────────────────
const GAME_CONFIG = {
  CLICKS_TO_WIN: 50,
  LEVELS: [
    { label: 'Punto de Partida',    threshold: 0    },
    { label: 'Comunidad Creciente', threshold: 0.25 },
    { label: 'Seguidores Leales',   threshold: 0.55 },
    { label: 'Cima de Seguidores',  threshold: 1.0  },
  ],
};

// ─── Game State ───────────────────────────────────────────────────────────────
let gameState = createFreshState();

function createFreshState() {
  return {
    status:    'waiting',   // waiting | countdown | playing | finished
    sessionId: null,
    market:    'MX',
    players: {
      1: { clicks: 0, progress: 0, level: 0 },
      2: { clicks: 0, progress: 0, level: 0 },
    },
    winner: null,
  };
}

// ─── Static ───────────────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());

// ─── Pages ────────────────────────────────────────────────────────────────────
app.get('/emojis', (req, res) => res.sendFile(path.join(__dirname, '..', 'public', 'emojis.html')));
app.get('/copys',  (req, res) => res.sendFile(path.join(__dirname, '..', 'public', 'copys.html')));

// ─── REST API ─────────────────────────────────────────────────────────────────
app.get('/api/config', (req, res) => res.json(GAME_CONFIG));
app.get('/api/state',  (req, res) => res.json(gameState));
app.get('/api/leaderboard', async (req, res) => {
  const data = await getLeaderboard(req.query.market);
  res.json(data);
});
app.post('/api/reset', (req, res) => {
  resetGame();
  res.json({ ok: true });
});

// ─── Socket.io ────────────────────────────────────────────────────────────────
io.on('connection', (socket) => {
  console.log(`[+] ${socket.id}`);

  // Sync current state to new client
  socket.emit('state:sync', { gameState, config: GAME_CONFIG });

  // ── START ──────────────────────────────────────────────────────────────────
  socket.on('game:start', async ({ market = 'MX' } = {}) => {
    if (gameState.status !== 'waiting') return;

    gameState.market = market;
    gameState.status = 'countdown';
    io.emit('game:countdown', { seconds: 3 });

    let count = 3;
    const timer = setInterval(async () => {
      count--;
      if (count > 0) {
        io.emit('game:countdown', { seconds: count });
      } else {
        clearInterval(timer);
        // Emit "0" so the client shows "¡YA!" and closes the overlay
        io.emit('game:countdown', { seconds: 0 });
        // Give the animation 800ms to run before starting the game
        setTimeout(async () => {
          gameState.status    = 'playing';
          gameState.sessionId = await createSession(market);
          io.emit('game:start', { sessionId: gameState.sessionId, config: GAME_CONFIG });
        }, 800);
      }
    }, 1000);
  });

  // ── CLICK ──────────────────────────────────────────────────────────────────
  socket.on('player:click', async ({ player }) => {
    if (gameState.status !== 'playing') return;
    player = Number(player);
    if (![1, 2].includes(player)) return;

    const p = gameState.players[player];
    p.clicks = Math.min(p.clicks + 1, GAME_CONFIG.CLICKS_TO_WIN);
    p.progress = p.clicks / GAME_CONFIG.CLICKS_TO_WIN;

    // Level
    const levels = GAME_CONFIG.LEVELS;
    for (let i = levels.length - 1; i >= 0; i--) {
      if (p.progress >= levels[i].threshold) { p.level = i; break; }
    }

    // Record (async, non-blocking)
    if (gameState.sessionId) recordClick(gameState.sessionId, player);

    // Win check
    if (p.clicks >= GAME_CONFIG.CLICKS_TO_WIN) {
      gameState.status = 'finished';
      gameState.winner = player;
      if (gameState.sessionId) await closeSession(gameState.sessionId, player);
      io.emit('game:finished', { winner: player, players: gameState.players });
      return;
    }

    io.emit('player:update', { player, data: p });
  });

  // ── RESET ──────────────────────────────────────────────────────────────────
  socket.on('game:reset', () => resetGame());

  socket.on('disconnect', () => console.log(`[-] ${socket.id}`));
});

function resetGame() {
  gameState = createFreshState();
  io.emit('game:reset', {});
}

// ─── Boot ─────────────────────────────────────────────────────────────────────
server.listen(PORT, () => {
  console.log(`\n🚀 ClickRace → http://localhost:${PORT}`);
  console.log(`   Meta: ${GAME_CONFIG.CLICKS_TO_WIN} clics | ${GAME_CONFIG.LEVELS.length} niveles`);
});
