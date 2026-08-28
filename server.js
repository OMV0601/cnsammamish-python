// Python Camp — zero-dependency HTTP server.
//   node server.js            -> http://localhost:3000
//   node server.js --port 8080
//
// Prints the LAN address so kids on the same wifi can join.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { networkInterfaces } from 'node:os';

import * as store from './db.js';
// Lives under public/ so the static demo build can import it in the browser too.
import { courses } from './public/curriculum/index.js';

const here = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(here, 'public');

const argPort = process.argv.indexOf('--port');
const PORT = Number(
  argPort > -1 ? process.argv[argPort + 1] : process.env.PORT || 3000
);
const TEACHER_PASSCODE = process.env.TEACHER_PASSCODE || 'camp2026';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2'
};

function json(res, code, body) {
  const payload = JSON.stringify(body);
  res.writeHead(code, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(payload);
}

async function readBody(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 1_000_000) throw new Error('Body too large');
    chunks.push(chunk);
  }
  if (!chunks.length) return {};
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    throw new Error('Invalid JSON');
  }
}

async function serveStatic(req, res, pathname) {
  let rel = pathname === '/' ? '/index.html' : pathname;
  // Block path traversal before touching the filesystem.
  const safe = normalize(rel).replace(/^(\.\.[\/\\])+/, '');
  const filePath = join(PUBLIC, safe);
  if (!filePath.startsWith(PUBLIC)) return json(res, 403, { error: 'Forbidden' });

  try {
    const info = await stat(filePath);
    if (info.isDirectory()) throw new Error('dir');
    const data = await readFile(filePath);
    res.writeHead(200, {
      'Content-Type': MIME[extname(filePath).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-cache'
    });
    res.end(data);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
  }
}

function requireTeacher(url, res) {
  const given = url.searchParams.get('passcode');
  if (given !== TEACHER_PASSCODE) {
    json(res, 401, { error: 'Wrong passcode' });
    return false;
  }
  return true;
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const path = url.pathname;

  try {
    if (!path.startsWith('/api/')) {
      // Friendly routes
      if (path === '/teacher') return serveStatic(req, res, '/teacher.html');
      if (path === '/play') return serveStatic(req, res, '/app.html');
      return serveStatic(req, res, path);
    }

    /* ------------------------------------------------------------- GET api */
    if (req.method === 'GET') {
      if (path === '/api/curriculum') return json(res, 200, { courses });
      if (path === '/api/students') return json(res, 200, store.listStudents());

      let m = path.match(/^\/api\/students\/(\d+)\/progress$/);
      if (m) {
        const student = store.getStudent(m[1]);
        if (!student) return json(res, 404, { error: 'No such student' });
        return json(res, 200, {
          student,
          progress: store.getProgress(m[1]),
          help: store.listHelp().some((h) => h.student_id === Number(m[1]))
        });
      }

      if (path === '/api/teacher/overview') {
        if (!requireTeacher(url, res)) return;
        return json(res, 200, store.teacherOverview());
      }

      return json(res, 404, { error: 'Unknown endpoint' });
    }

    /* ------------------------------------------------------------ POST api */
    if (req.method === 'POST') {
      const body = await readBody(req);

      if (path === '/api/students') {
        try {
          return json(res, 200, store.createStudent(body.name, body.avatar, body.course));
        } catch (err) {
          return json(res, 400, { error: err.message });
        }
      }

      if (path === '/api/progress') {
        if (!store.getStudent(body.studentId))
          return json(res, 404, { error: 'No such student' });
        return json(res, 200, store.saveProgress(body));
      }

      if (path === '/api/events') {
        if (!store.getStudent(body.studentId))
          return json(res, 404, { error: 'No such student' });
        store.logEvent(body);
        return json(res, 200, { ok: true });
      }

      if (path === '/api/help') {
        if (!store.getStudent(body.studentId))
          return json(res, 404, { error: 'No such student' });
        store.logEvent({
          studentId: body.studentId,
          taskKey: body.taskKey,
          day: body.day,
          kind: body.on ? 'help-raised' : 'help-cleared'
        });
        return json(res, 200, { flag: store.setHelp(body.studentId, body.taskKey, body.on) });
      }

      // Teacher-only mutations
      if (path.startsWith('/api/teacher/')) {
        if (!requireTeacher(url, res)) return;

        if (path === '/api/teacher/rename')
          return json(res, 200, store.renameStudent(body.id, body.name, body.avatar));

        if (path === '/api/teacher/reset-progress') {
          store.resetStudentProgress(body.id);
          return json(res, 200, { ok: true });
        }

        if (path === '/api/teacher/delete-student') {
          store.deleteStudent(body.id);
          return json(res, 200, { ok: true });
        }

        if (path === '/api/teacher/clear-help') {
          store.setHelp(body.id, null, false);
          return json(res, 200, { ok: true });
        }
      }

      return json(res, 404, { error: 'Unknown endpoint' });
    }

    return json(res, 405, { error: 'Method not allowed' });
  } catch (err) {
    console.error('[error]', err);
    return json(res, 500, { error: err.message || 'Server error' });
  }
});

function lanAddresses() {
  const out = [];
  for (const list of Object.values(networkInterfaces())) {
    for (const net of list || []) {
      if (net.family === 'IPv4' && !net.internal) out.push(net.address);
    }
  }
  return out;
}

server.listen(PORT, () => {
  // Plain ASCII here on purpose — the Windows console mangles emoji.
  const bar = '='.repeat(54);
  console.log(`\n${bar}`);
  console.log('   PYTHON CAMP is running');
  console.log(bar);
  console.log(`  You (teacher):   http://localhost:${PORT}/teacher`);
  console.log(`  Teacher passcode: ${TEACHER_PASSCODE}`);
  console.log('');
  console.log('  Kids type this into their browser:');
  const addrs = lanAddresses();
  if (addrs.length) {
    for (const a of addrs) console.log(`      http://${a}:${PORT}`);
  } else {
    console.log(`      http://localhost:${PORT}   (no wifi address found)`);
  }
  console.log(`\n  Stop the camp with Ctrl+C.`);
  console.log(`  Progress is saved in: ${store.dbPath}`);
  console.log(`${bar}\n`);
});
