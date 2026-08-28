/* Storage layer with two backends, picked automatically at boot.
 *
 *   server mode — the local camp server is running. Progress goes to SQLite,
 *                 shared across devices, and the teacher dashboard works.
 *   demo mode   — no server (e.g. deployed as a static site). Progress lives
 *                 in this browser's localStorage only.
 *
 * Everything above this layer is identical in both modes.
 */

export let mode = 'server';

const LS_KEY = 'camp.demo.v1';

/* ------------------------------------------------------------ local store */

function readLocal() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) || null;
  } catch {
    return null;
  }
}

function blank() {
  return { students: [], progress: {}, help: {}, events: [], nextId: 1 };
}

function localData() {
  return readLocal() || blank();
}

function writeLocal(data) {
  localStorage.setItem(LS_KEY, JSON.stringify(data));
}

const rowKey = (studentId, taskKey) => `${studentId}::${taskKey}`;
const now = () => new Date().toISOString();

/* ------------------------------------------------------------------ fetch */

async function api(path, body) {
  const opts = body
    ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
    : {};
  const res = await fetch(path, opts);
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Request failed');
  return res.json();
}

/* ------------------------------------------------------------------- boot */

/** Detects which backend is available. Call once, before anything else. */
export async function initStore() {
  try {
    const res = await fetch('/api/curriculum', { cache: 'no-store' });
    if (res.ok) {
      mode = 'server';
      cachedCurriculum = await res.json();
      return mode;
    }
  } catch {
    /* no server here — fall through to demo mode */
  }
  mode = 'demo';
  const module = await import('/curriculum/index.js');
  cachedCurriculum = { courses: module.courses };
  return mode;
}

let cachedCurriculum = null;

export function getCurriculum() {
  if (!cachedCurriculum) throw new Error('initStore() must run first');
  return cachedCurriculum;
}

/** All courses on offer. */
export function getCourses() {
  return getCurriculum().courses;
}

/** One course by id, falling back to the first if the id is unknown. */
export function getCourse(id) {
  const list = getCourses();
  return list.find((c) => c.id === id) || list[0];
}

/* --------------------------------------------------------------- students */

export async function listStudents() {
  if (mode === 'server') return api('/api/students');
  return localData().students;
}

export async function createStudent(name, avatar, course) {
  const clean = String(name || '').trim().slice(0, 24);
  if (!clean) throw new Error('A name is required');

  if (mode === 'server') return api('/api/students', { name: clean, avatar, course });

  const data = localData();
  const existing = data.students.find((s) => s.name.toLowerCase() === clean.toLowerCase());
  if (existing) {
    if (course && course !== existing.course) {
      existing.course = course;
      writeLocal(data);
    }
    return existing;
  }

  const student = {
    id: data.nextId++, name: clean, avatar: avatar || '🐍',
    course: course || 'level1', created_at: now()
  };
  data.students.push(student);
  writeLocal(data);
  return student;
}

/* --------------------------------------------------------------- progress */

export async function getStudentProgress(studentId) {
  if (mode === 'server') return api(`/api/students/${studentId}/progress`);

  const data = localData();
  const student = data.students.find((s) => s.id === Number(studentId));
  const progress = Object.values(data.progress).filter((r) => r.student_id === Number(studentId));
  return { student, progress, help: Boolean(data.help[studentId]) };
}

export async function saveProgress({ studentId, taskKey, course, day, done, xp, code, attemptDelta }) {
  if (mode === 'server')
    return api('/api/progress', { studentId, taskKey, course, day, done, xp, code, attemptDelta });

  const data = localData();
  const key = rowKey(studentId, taskKey);
  const prev = data.progress[key] || {
    student_id: Number(studentId),
    task_key: taskKey,
    course: course || 'camp',
    day: Number(day),
    done: 0,
    attempts: 0,
    xp: 0,
    last_code: null,
    started_at: now(),
    completed_at: null
  };

  // Same rules as the server: done is sticky, xp keeps the best, attempts add up.
  prev.done = done ? 1 : prev.done;
  prev.xp = done ? Math.max(prev.xp, Number(xp) || 0) : prev.xp;
  prev.attempts += Number(attemptDelta) || 0;
  if (code !== undefined && code !== null) prev.last_code = String(code).slice(0, 8000);
  if (prev.done && !prev.completed_at) prev.completed_at = now();

  data.progress[key] = prev;
  writeLocal(data);
  return prev;
}

/* ----------------------------------------------------------- events, help */

export async function logEvent(payload) {
  if (mode === 'server') return api('/api/events', payload).catch(() => {});
  const data = localData();
  data.events.push({ ...payload, created_at: now() });
  if (data.events.length > 200) data.events = data.events.slice(-200);
  writeLocal(data);
}

export async function setHelp({ studentId, taskKey, day, on }) {
  if (mode === 'server') return api('/api/help', { studentId, taskKey, day, on });
  const data = localData();
  if (on) data.help[studentId] = { task_key: taskKey, raised_at: now() };
  else delete data.help[studentId];
  writeLocal(data);
  return { flag: data.help[studentId] || null };
}

/** Wipes this browser's demo progress. Demo mode only. */
export function resetDemo() {
  localStorage.removeItem(LS_KEY);
}
