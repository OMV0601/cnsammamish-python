// Database layer. Uses Node's built-in SQLite (node:sqlite) so there is
// nothing to npm install. The whole camp lives in one file: data/camp.db
import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

// Set CAMP_DB to keep the database somewhere else — worth doing if this folder
// is inside OneDrive/Dropbox, since a sync client can lock a live SQLite file.
export const dbPath = process.env.CAMP_DB || join(here, 'data', 'camp.db');
mkdirSync(dirname(dbPath), { recursive: true });

export const db = new DatabaseSync(dbPath);

db.exec(`
  PRAGMA journal_mode = WAL;

  CREATE TABLE IF NOT EXISTS students (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT NOT NULL UNIQUE,
    avatar     TEXT NOT NULL DEFAULT '🐍',
    course     TEXT NOT NULL DEFAULT 'level1',
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS progress (
    student_id  INTEGER NOT NULL,
    task_key    TEXT    NOT NULL,
    course      TEXT    NOT NULL DEFAULT 'camp',
    day         INTEGER NOT NULL,
    done        INTEGER NOT NULL DEFAULT 0,
    attempts    INTEGER NOT NULL DEFAULT 0,
    xp          INTEGER NOT NULL DEFAULT 0,
    last_code   TEXT,
    started_at  TEXT,
    completed_at TEXT,
    PRIMARY KEY (student_id, task_key)
  );

  CREATE TABLE IF NOT EXISTS events (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    task_key   TEXT,
    day        INTEGER,
    kind       TEXT NOT NULL,
    detail     TEXT,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS help_flags (
    student_id INTEGER PRIMARY KEY,
    task_key   TEXT,
    raised_at  TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_events_student ON events(student_id, created_at);
`);

/* Databases created before courses existed are missing these columns. Adding
   them here means an in-progress camp keeps working after an update; the
   default of 'camp' is correct because that is all those rows can be. */
function ensureColumn(table, column, declaration) {
  const columns = db.prepare(`PRAGMA table_info(${table})`).all();
  if (!columns.some((c) => c.name === column)) {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${declaration}`);
  }
}
ensureColumn('students', 'course', "TEXT NOT NULL DEFAULT 'camp'");
ensureColumn('progress', 'course', "TEXT NOT NULL DEFAULT 'camp'");

const now = () => new Date().toISOString();

/* ---------------------------------------------------------------- students */

export function listStudents() {
  return db.prepare(`SELECT * FROM students ORDER BY name COLLATE NOCASE`).all();
}

export function createStudent(name, avatar, course) {
  const clean = String(name || '').trim().slice(0, 24);
  if (!clean) throw new Error('A name is required');

  const existing = db
    .prepare(`SELECT * FROM students WHERE name = ? COLLATE NOCASE`)
    .get(clean);
  if (existing) {
    // Returning students may be joining a different course this term.
    if (course && course !== existing.course) return setStudentCourse(existing.id, course);
    return existing;
  }

  db.prepare(`INSERT INTO students (name, avatar, course, created_at) VALUES (?, ?, ?, ?)`)
    .run(clean, avatar || '🐍', course || 'level1', now());
  return db.prepare(`SELECT * FROM students WHERE name = ? COLLATE NOCASE`).get(clean);
}

export function setStudentCourse(id, course) {
  db.prepare(`UPDATE students SET course = ? WHERE id = ?`).run(String(course), Number(id));
  return getStudent(id);
}

export function getStudent(id) {
  return db.prepare(`SELECT * FROM students WHERE id = ?`).get(Number(id));
}

export function renameStudent(id, name, avatar) {
  db.prepare(`UPDATE students SET name = ?, avatar = ? WHERE id = ?`)
    .run(String(name).trim().slice(0, 24), avatar || '🐍', Number(id));
  return getStudent(id);
}

export function deleteStudent(id) {
  const sid = Number(id);
  db.prepare(`DELETE FROM progress   WHERE student_id = ?`).run(sid);
  db.prepare(`DELETE FROM events     WHERE student_id = ?`).run(sid);
  db.prepare(`DELETE FROM help_flags WHERE student_id = ?`).run(sid);
  db.prepare(`DELETE FROM students   WHERE id = ?`).run(sid);
}

/* ---------------------------------------------------------------- progress */

export function getProgress(studentId) {
  return db
    .prepare(`SELECT * FROM progress WHERE student_id = ?`)
    .all(Number(studentId));
}

export function saveProgress({ studentId, taskKey, course, day, done, xp, code, attemptDelta }) {
  const sid = Number(studentId);
  const stamp = now();

  db.prepare(
    `INSERT INTO progress (student_id, task_key, course, day, done, attempts, xp, last_code, started_at)
     VALUES (?, ?, ?, ?, 0, 0, 0, NULL, ?)
     ON CONFLICT(student_id, task_key) DO NOTHING`
  ).run(sid, taskKey, course || 'camp', Number(day), stamp);

  const row = db
    .prepare(`SELECT * FROM progress WHERE student_id = ? AND task_key = ?`)
    .get(sid, taskKey);

  const nextDone = done ? 1 : row.done;
  const nextXp = done ? Math.max(row.xp, Number(xp) || 0) : row.xp;
  const nextAttempts = row.attempts + (Number(attemptDelta) || 0);
  const completedAt = nextDone && !row.completed_at ? stamp : row.completed_at;

  db.prepare(
    `UPDATE progress
        SET done = ?, attempts = ?, xp = ?, last_code = ?, completed_at = ?
      WHERE student_id = ? AND task_key = ?`
  ).run(
    nextDone,
    nextAttempts,
    nextXp,
    code === undefined || code === null ? row.last_code : String(code).slice(0, 8000),
    completedAt,
    sid,
    taskKey
  );

  return db
    .prepare(`SELECT * FROM progress WHERE student_id = ? AND task_key = ?`)
    .get(sid, taskKey);
}

export function resetStudentProgress(studentId) {
  const sid = Number(studentId);
  db.prepare(`DELETE FROM progress WHERE student_id = ?`).run(sid);
  db.prepare(`DELETE FROM help_flags WHERE student_id = ?`).run(sid);
}

/* ------------------------------------------------------------------ events */

export function logEvent({ studentId, taskKey, day, kind, detail }) {
  db.prepare(
    `INSERT INTO events (student_id, task_key, day, kind, detail, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).run(
    Number(studentId),
    taskKey || null,
    day === undefined || day === null ? null : Number(day),
    String(kind),
    detail ? String(detail).slice(0, 2000) : null,
    now()
  );
}

/* -------------------------------------------------------------- help flags */

export function setHelp(studentId, taskKey, on) {
  const sid = Number(studentId);
  if (on) {
    db.prepare(
      `INSERT INTO help_flags (student_id, task_key, raised_at) VALUES (?, ?, ?)
       ON CONFLICT(student_id) DO UPDATE SET task_key = excluded.task_key, raised_at = excluded.raised_at`
    ).run(sid, taskKey || null, now());
  } else {
    db.prepare(`DELETE FROM help_flags WHERE student_id = ?`).run(sid);
  }
  return db.prepare(`SELECT * FROM help_flags WHERE student_id = ?`).get(sid) || null;
}

export function listHelp() {
  return db.prepare(`SELECT * FROM help_flags`).all();
}

/* ------------------------------------------------------------ teacher view */

export function teacherOverview() {
  const students = listStudents();
  const progress = db.prepare(`SELECT * FROM progress`).all();
  const help = listHelp();
  const recent = db
    .prepare(
      `SELECT e.*, s.name AS student_name, s.avatar AS student_avatar
         FROM events e JOIN students s ON s.id = e.student_id
        ORDER BY e.id DESC LIMIT 60`
    )
    .all();

  const lastSeen = db
    .prepare(`SELECT student_id, MAX(created_at) AS at FROM events GROUP BY student_id`)
    .all();

  return { students, progress, help, recent, lastSeen };
}
