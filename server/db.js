/**
 * SQLite via sql.js (pure WebAssembly, no native compilation needed)
 * Database stored in-memory, persisted to disk as binary file.
 */
const path = require('path');
const fs   = require('fs');

// ── Data directory ──────────────────────────────────────────
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const DB_PATH = path.join(dataDir, 'clickrace.db');

// ── Lazy-init DB ────────────────────────────────────────────
let _db = null;
let SQL = null;

async function getDb() {
  if (_db) return _db;

  SQL = await require('sql.js')();

  // Load existing DB from disk if present
  if (fs.existsSync(DB_PATH)) {
    const fileBuffer = fs.readFileSync(DB_PATH);
    _db = new SQL.Database(fileBuffer);
  } else {
    _db = new SQL.Database();
  }

  // Create schema
  _db.run(`
    CREATE TABLE IF NOT EXISTS sessions (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      market      TEXT    NOT NULL DEFAULT 'MX',
      started_at  TEXT    DEFAULT (datetime('now')),
      finished_at TEXT,
      winner      INTEGER,
      status      TEXT    DEFAULT 'waiting'
    );

    CREATE TABLE IF NOT EXISTS clicks (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id INTEGER NOT NULL,
      player     INTEGER NOT NULL,
      clicked_at TEXT    DEFAULT (datetime('now'))
    );
  `);

  persist();
  return _db;
}

// Persist to disk after every write
function persist() {
  if (!_db) return;
  const data = _db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

// ── Helpers ────────────────────────────────────────────────
async function createSession(market = 'MX') {
  const db = await getDb();
  db.run(`INSERT INTO sessions (market) VALUES (?)`, [market]);
  const res = db.exec(`SELECT last_insert_rowid() as id`);
  persist();
  return res[0].values[0][0];
}

async function recordClick(sessionId, player) {
  const db = await getDb();
  db.run(`INSERT INTO clicks (session_id, player) VALUES (?, ?)`, [sessionId, player]);
  // Don't persist every click (hot path) — persist on session close
}

async function closeSession(sessionId, winner) {
  const db = await getDb();
  db.run(
    `UPDATE sessions SET finished_at = datetime('now'), winner = ?, status = 'finished' WHERE id = ?`,
    [winner, sessionId]
  );
  persist();
}

async function getLeaderboard(market = null) {
  const db = await getDb();
  const query = market
    ? `SELECT market, winner, COUNT(*) as wins FROM sessions WHERE status='finished' AND market=? GROUP BY winner ORDER BY wins DESC`
    : `SELECT market, winner, COUNT(*) as wins FROM sessions WHERE status='finished' GROUP BY market, winner ORDER BY market, wins DESC`;
  const result = market ? db.exec(query, [market]) : db.exec(query);
  if (!result.length) return [];
  const cols = result[0].columns;
  return result[0].values.map(row =>
    Object.fromEntries(cols.map((c, i) => [c, row[i]]))
  );
}

module.exports = { getDb, createSession, recordClick, closeSession, getLeaderboard };
