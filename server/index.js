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

// ─── Matchmaking & Sockets State ──────────────────────────────────────────────
let matchmakingQueue = [];
let activeMatches = new Map();

// ─── Socket.io ────────────────────────────────────────────────
io.on('connection', (socket) => {
  console.log(`[+] Socket connected: ${socket.id}`);

  // Send initial configs
  socket.emit('config:sync', GAME_CONFIG);

  // If client is a spectator, sync current match state
  socket.on('spectator:init', () => {
    socket.join('spectators');
    // Find if there is any active match
    let runningMatch = null;
    for (const match of activeMatches.values()) {
      if (match.status === 'playing' || match.status === 'countdown') {
        runningMatch = match;
        break;
      }
    }
    socket.emit('spectator:sync', {
      activeMatch: runningMatch ? {
        matchId: runningMatch.matchId,
        status: runningMatch.status,
        players: runningMatch.players,
        market: runningMatch.market
      } : null,
      queueCount: matchmakingQueue.length
    });
  });

  // ── JOIN QUEUE ─────────────────────────────────────────────────────────────
  socket.on('join:queue', async ({ name, market = 'MX' }) => {
    // Prevent duplicate entries
    if (matchmakingQueue.some(p => p.socketId === socket.id)) return;

    // Check if player is already in an active game
    for (const match of activeMatches.values()) {
      if (match.players[1].socketId === socket.id || match.players[2].socketId === socket.id) {
        return; // Don't allow joining queue while playing
      }
    }

    const player = {
      socketId: socket.id,
      socket,
      name: name ? name.trim().substring(0, 15) : 'Invitado',
      market
    };

    matchmakingQueue.push(player);
    console.log(`[+] Added to queue: ${player.name} (${socket.id}). Queue size: ${matchmakingQueue.length}`);

    socket.emit('queue:joined', { position: matchmakingQueue.length });
    io.emit('queue:update', { count: matchmakingQueue.length });
    io.to('spectators').emit('queue:update', { count: matchmakingQueue.length });

    // Matchmaking check
    if (matchmakingQueue.length >= 2) {
      const p1 = matchmakingQueue.shift();
      const p2 = matchmakingQueue.shift();

      // Create SQLite session
      const sessionId = await createSession(p1.market);
      const matchId = String(sessionId);

      const match = {
        matchId,
        status: 'countdown',
        market: p1.market,
        players: {
          1: { socketId: p1.socketId, name: p1.name, clicks: 0, progress: 0, level: 0 },
          2: { socketId: p2.socketId, name: p2.name, clicks: 0, progress: 0, level: 0 }
        },
        winner: null
      };

      activeMatches.set(matchId, match);
      
      p1.socket.join(matchId);
      p2.socket.join(matchId);

      console.log(`[x] Match started: ${p1.name} vs ${p2.name} (Match ID: ${matchId})`);

      // Notify players
      p1.socket.emit('match:found', { matchId, role: 1, name: p1.name, opponent: p2.name });
      p2.socket.emit('match:found', { matchId, role: 2, name: p2.name, opponent: p1.name });

      // Notify spectators
      io.to('spectators').emit('spectator:match:found', {
        matchId,
        players: {
          1: { name: p1.name },
          2: { name: p2.name }
        },
        market: p1.market
      });

      io.emit('queue:update', { count: matchmakingQueue.length });

      // Server-side Countdown
      let seconds = 3;
      io.to(matchId).emit('game:countdown', { seconds });
      io.to('spectators').emit('spectator:game:countdown', { matchId, seconds });

      const countdownTimer = setInterval(() => {
        seconds--;
        if (seconds > 0) {
          io.to(matchId).emit('game:countdown', { seconds });
          io.to('spectators').emit('spectator:game:countdown', { matchId, seconds });
        } else {
          clearInterval(countdownTimer);
          io.to(matchId).emit('game:countdown', { seconds: 0 });
          io.to('spectators').emit('spectator:game:countdown', { matchId, seconds: 0 });

          // Start game after 800ms
          setTimeout(() => {
            match.status = 'playing';
            io.to(matchId).emit('game:start', { matchId });
            io.to('spectators').emit('spectator:game:start', { matchId });
          }, 800);
        }
      }, 1000);
    }
  });

  // ── LEAVE QUEUE ────────────────────────────────────────────────────────────
  socket.on('leave:queue', () => {
    matchmakingQueue = matchmakingQueue.filter(p => p.socketId !== socket.id);
    console.log(`[-] Removed from queue: ${socket.id}. Queue size: ${matchmakingQueue.length}`);
    socket.emit('queue:left');
    io.emit('queue:update', { count: matchmakingQueue.length });
    io.to('spectators').emit('queue:update', { count: matchmakingQueue.length });
  });

  // ── CLICK EVENT ────────────────────────────────────────────────────────────
  socket.on('game:click', ({ matchId }) => {
    const match = activeMatches.get(matchId);
    if (!match || match.status !== 'playing') return;

    let role = null;
    if (socket.id === match.players[1].socketId) role = 1;
    else if (socket.id === match.players[2].socketId) role = 2;

    if (!role) return; // Ignore if not a player in this match

    const p = match.players[role];
    p.clicks = Math.min(p.clicks + 1, GAME_CONFIG.CLICKS_TO_WIN);
    p.progress = p.clicks / GAME_CONFIG.CLICKS_TO_WIN;

    // Calculate level
    const levels = GAME_CONFIG.LEVELS;
    for (let i = levels.length - 1; i >= 0; i--) {
      if (p.progress >= levels[i].threshold) {
        p.level = i;
        break;
      }
    }

    // SQLite recording (async)
    recordClick(Number(matchId), role);

    // Win condition check
    if (p.clicks >= GAME_CONFIG.CLICKS_TO_WIN) {
      match.status = 'finished';
      match.winner = role;
      closeSession(Number(matchId), role);

      console.log(`[v] Winner in match ${matchId}: ${p.name} (Player ${role})`);

      io.to(matchId).emit('game:finished', { winner: role, winnerName: p.name, players: match.players });
      io.to('spectators').emit('spectator:game:finished', { matchId, winner: role, winnerName: p.name, players: match.players });

      // Clean up after 15 seconds to allow animations to complete
      setTimeout(() => {
        activeMatches.delete(matchId);
      }, 15000);
    } else {
      io.to(matchId).emit('game:update', { players: match.players });
      io.to('spectators').emit('spectator:game:update', { matchId, players: match.players });
    }
  });

  // ── DISCONNECT ─────────────────────────────────────────────────────────────
  socket.on('disconnect', () => {
    console.log(`[-] Socket disconnected: ${socket.id}`);
    
    // Remove from queue if present
    const inQueueBefore = matchmakingQueue.length;
    matchmakingQueue = matchmakingQueue.filter(p => p.socketId !== socket.id);
    if (matchmakingQueue.length !== inQueueBefore) {
      io.emit('queue:update', { count: matchmakingQueue.length });
      io.to('spectators').emit('queue:update', { count: matchmakingQueue.length });
    }

    // Check if in active game
    for (const [matchId, match] of activeMatches.entries()) {
      if (match.players[1].socketId === socket.id || match.players[2].socketId === socket.id) {
        if (match.status === 'playing' || match.status === 'countdown') {
          const disconnectedRole = match.players[1].socketId === socket.id ? 1 : 2;
          const otherRole = disconnectedRole === 1 ? 2 : 1;
          const otherPlayer = match.players[otherRole];

          match.status = 'finished';
          match.winner = otherRole;
          closeSession(Number(matchId), otherRole);

          console.log(`[!] Forfeit in match ${matchId}: Opponent disconnected. ${otherPlayer.name} wins.`);

          io.to(matchId).emit('opponent:disconnected', { winner: otherRole, winnerName: otherPlayer.name });
          io.to('spectators').emit('spectator:game:finished', {
            matchId,
            winner: otherRole,
            winnerName: otherPlayer.name,
            forfeit: true
          });

          // Clean up match
          activeMatches.delete(matchId);
        }
        break;
      }
    }
  });
});

function resetGame() {
  gameState = createFreshState();
  matchmakingQueue = [];
  activeMatches.clear();
  io.emit('game:reset', {});
}

// ─── Boot ─────────────────────────────────────────────────────────────────────
server.listen(PORT, () => {
  console.log(`\n🚀 ClickRace → http://localhost:${PORT}`);
  console.log(`   Meta: ${GAME_CONFIG.CLICKS_TO_WIN} clics | ${GAME_CONFIG.LEVELS.length} niveles`);
});
