/* Teacher dashboard — polls the server every few seconds. */

let passcode = sessionStorage.getItem('camp.pass') || '';
let curriculum = null;
let data = null;
let selected = null;

const $ = (sel) => document.querySelector(sel);
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html !== undefined) n.innerHTML = html;
  return n;
};
const escapeHtml = (t) => String(t).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

async function fetchOverview(code) {
  const res = await fetch(`/api/teacher/overview?passcode=${encodeURIComponent(code)}`);
  if (!res.ok) throw new Error('bad passcode');
  return res.json();
}

async function post(path, body) {
  await fetch(`${path}?passcode=${encodeURIComponent(passcode)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  refresh();
}

/* --------------------------------------------------------------- helpers */

const taskByKey = new Map();

function dayOf(n) { return curriculum.days[n - 1]; }

function studentDone(studentId, taskKey) {
  return data.progress.some((p) => p.student_id === studentId && p.task_key === taskKey && p.done);
}

function dayPct(studentId, day) {
  const done = day.tasks.filter((t) => studentDone(studentId, t.key)).length;
  return { done, total: day.tasks.length, pct: Math.round((done / day.tasks.length) * 100) };
}

function studentXp(studentId) {
  return data.progress
    .filter((p) => p.student_id === studentId && p.done)
    .reduce((sum, p) => sum + p.xp, 0);
}

function lastSeenOf(studentId) {
  const row = data.lastSeen.find((l) => l.student_id === studentId);
  return row ? new Date(row.at) : null;
}

function ago(date) {
  if (!date) return 'not started';
  const mins = Math.floor((Date.now() - date.getTime()) / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min ago`;
  return `${Math.floor(mins / 60)} h ago`;
}

/* Where is this student right now? First unfinished task. */
function currentSpot(studentId) {
  for (const day of curriculum.days) {
    for (const task of day.tasks) {
      if (!studentDone(studentId, task.key)) return { day, task };
    }
  }
  return null;
}

/* --------------------------------------------------------------- painting */

function paintAlerts() {
  const box = $('#alerts');
  box.innerHTML = '';

  for (const flag of data.help) {
    const student = data.students.find((s) => s.id === flag.student_id);
    if (!student) continue;
    const task = taskByKey.get(flag.task_key);
    const alert = el('div', 'alert');
    alert.innerHTML = `<span style="font-size:1.6rem">🙋</span>
      <div><b>${escapeHtml(student.name)}</b> needs help
      <div class="small">${task ? `Day ${task.day} · ${escapeHtml(task.title)}` : ''} · raised ${ago(new Date(flag.raised_at))}</div></div>`;
    const clear = el('button', 'small', 'Sorted ✓');
    clear.onclick = () => post('/api/teacher/clear-help', { id: student.id });
    alert.append(el('div', 'spacer'), clear);
    box.appendChild(alert);
  }

  // Quietly stuck: 4+ failed attempts on something still unfinished.
  for (const p of data.progress) {
    if (p.done || p.attempts < 4) continue;
    if (data.help.some((h) => h.student_id === p.student_id)) continue;
    const student = data.students.find((s) => s.id === p.student_id);
    const task = taskByKey.get(p.task_key);
    if (!student || !task) continue;
    const note = el('div', 'alert');
    note.style.background = 'var(--warn-soft)';
    note.style.borderColor = 'var(--warn)';
    note.innerHTML = `<span style="font-size:1.4rem">😬</span>
      <div><b>${escapeHtml(student.name)}</b> has tried <b>${p.attempts}×</b> on
      Day ${task.day} · ${escapeHtml(task.title)} without getting it.</div>`;
    box.appendChild(note);
  }
}

function paintTable() {
  const table = $('#table');
  table.innerHTML = '';

  const head = el('tr');
  head.innerHTML = '<th>Student</th>' +
    curriculum.days.map((d) => `<th>Day ${d.day}<br><span style="font-weight:400;text-transform:none">${d.title}</span></th>`).join('') +
    '<th>XP</th><th>Working on</th><th></th>';
  table.appendChild(head);

  if (!data.students.length) {
    const row = el('tr');
    row.innerHTML = `<td colspan="${curriculum.days.length + 4}" class="muted">Nobody has joined yet. Send the kids to the address in the terminal.</td>`;
    table.appendChild(row);
    return;
  }

  const sorted = [...data.students].sort((a, b) => studentXp(b.id) - studentXp(a.id));

  for (const s of sorted) {
    const row = el('tr');
    const seen = lastSeenOf(s.id);
    const live = seen && Date.now() - seen.getTime() < 5 * 60000;
    const spot = currentSpot(s.id);

    const nameCell = el('td');
    nameCell.innerHTML = `<span class="dot ${live ? 'live' : ''}"></span>${s.avatar} <b>${escapeHtml(s.name)}</b>
      <div class="small muted" style="margin-left:16px">${ago(seen)}</div>`;
    nameCell.style.cursor = 'pointer';
    nameCell.onclick = () => { selected = s.id; paintDetail(); };
    row.appendChild(nameCell);

    for (const day of curriculum.days) {
      const stats = dayPct(s.id, day);
      const cell = el('td');
      cell.innerHTML = `<div class="cellbar"><i style="width:${stats.pct}%;background:${stats.pct === 100 ? 'var(--good)' : day.color}"></i></div>
        <span class="small muted">${stats.done}/${stats.total}${stats.pct === 100 ? ' ' + day.badge : ''}</span>`;
      row.appendChild(cell);
    }

    row.appendChild(el('td', null, `<b>${studentXp(s.id)}</b>`));
    row.appendChild(el('td', 'small', spot ? `Day ${spot.day.day} · ${escapeHtml(spot.task.title)}` : '🏆 Finished everything!'));

    const actions = el('td');
    const del = el('button', 'small ghost', '⋯');
    del.title = 'Reset or remove this student';
    del.onclick = () => {
      const what = prompt(`Type RESET to wipe ${s.name}'s progress, or DELETE to remove them completely.`);
      if (what === 'RESET') post('/api/teacher/reset-progress', { id: s.id });
      else if (what === 'DELETE') post('/api/teacher/delete-student', { id: s.id });
    };
    actions.appendChild(del);
    row.appendChild(actions);

    table.appendChild(row);
  }
}

function paintFeed() {
  const feed = $('#feed');
  feed.innerHTML = '';
  const labels = {
    login: 'joined the camp',
    open: 'opened',
    complete: '✅ finished',
    'attempt-fail': '❌ tried',
    hint: '💡 used a hint on',
    'help-raised': '🙋 asked for help on',
    'help-cleared': 'cancelled their help request'
  };
  for (const e of data.recent) {
    const task = taskByKey.get(e.task_key);
    const line = el('div');
    line.innerHTML = `<span class="muted small">${new Date(e.created_at).toLocaleTimeString()}</span>
      &nbsp;${e.student_avatar} <b>${escapeHtml(e.student_name)}</b> ${labels[e.kind] || e.kind}
      ${task ? `<i>${escapeHtml(task.title)}</i>` : ''}`;
    feed.appendChild(line);
  }
}

function paintDetail() {
  const box = $('#detail');
  const title = $('#detailTitle');
  if (!selected) return;

  const s = data.students.find((x) => x.id === selected);
  if (!s) { selected = null; return; }

  title.textContent = `${s.avatar} ${s.name}`;
  box.innerHTML = '';
  box.className = '';

  const rows = data.progress
    .filter((p) => p.student_id === selected)
    .sort((a, b) => (a.task_key > b.task_key ? 1 : -1));

  if (!rows.length) {
    box.innerHTML = '<p class="muted small">No work yet.</p>';
    return;
  }

  for (const p of rows) {
    const task = taskByKey.get(p.task_key);
    if (!task) continue;
    const item = el('div');
    item.style.borderBottom = '1px dashed var(--line)';
    item.style.padding = '7px 0';
    item.innerHTML = `<b>${p.done ? '✅' : '⬜'} Day ${task.day} · ${escapeHtml(task.title)}</b>
      <span class="small muted"> — ${p.attempts} attempt${p.attempts === 1 ? '' : 's'}</span>`;
    if (p.last_code) {
      const toggle = el('button', 'small ghost', 'see code');
      const pre = el('pre', 'hidden', escapeHtml(p.last_code));
      toggle.onclick = () => pre.classList.toggle('hidden');
      item.append(' ', toggle, pre);
    }
    box.appendChild(item);
  }
}

function paintPlan() {
  const box = $('#plan');
  box.innerHTML = '';
  for (const day of curriculum.days) {
    const card = el('div');
    card.style.padding = '9px 0';
    card.style.borderBottom = '1px dashed var(--line)';
    card.innerHTML = `<b>${day.emoji} Day ${day.day}: ${day.title}</b>
      <span class="small muted">— ${day.subtitle} · ${day.totalXp} XP · about ${day.totalMinutes} min of material</span>
      <div class="small muted">${day.tasks.map((t) => escapeHtml(t.title)).join(' → ')}</div>`;
    box.appendChild(card);
  }
}

/* ----------------------------------------------------------------- loop */

async function refresh() {
  try {
    data = await fetchOverview(passcode);
  } catch {
    return;
  }
  paintAlerts();
  paintTable();
  paintFeed();
  paintPlan();
  if (selected) paintDetail();
  $('#clock').textContent = 'updated ' + new Date().toLocaleTimeString();
}

async function open(code) {
  try {
    data = await fetchOverview(code);
  } catch {
    $('#gateErr').textContent = 'That passcode is not right.';
    $('#gateErr').classList.remove('hidden');
    return;
  }
  passcode = code;
  sessionStorage.setItem('camp.pass', code);
  curriculum = await (await fetch('/api/curriculum')).json();
  for (const day of curriculum.days) for (const t of day.tasks) taskByKey.set(t.key, t);
  $('#gate').classList.add('hidden');
  $('#board').classList.remove('hidden');
  refresh();
  setInterval(refresh, 6000);
}

$('#go').onclick = () => open($('#pass').value.trim());
$('#pass').addEventListener('keydown', (e) => { if (e.key === 'Enter') open($('#pass').value.trim()); });
$('#refresh').onclick = refresh;

// The dashboard needs the local server. On the static demo, say so plainly
// rather than showing a passcode box that can never work.
(async () => {
  try {
    const res = await fetch('/api/curriculum', { cache: 'no-store' });
    if (!res.ok) throw new Error('no server');
  } catch {
    $('#gate').innerHTML = `
      <h2>📋 Teacher dashboard</h2>
      <p>The dashboard tracks every student in one place, so it needs the camp server running.
         It is not part of the online demo.</p>
      <p class="small muted">Run <code>START CAMP.bat</code> on the instructor laptop, then open
         <code>/teacher</code> from the address it prints.</p>
      <p><a href="/">← Back to the lessons</a></p>`;
    return;
  }
  if (passcode) open(passcode);
})();
