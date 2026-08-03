/* Python Camp — the learner app. */
import { startPython, onRunnerStatus, runPython, friendlyError, checkTask } from './runner.js';
import * as store from './store.js';

/* ------------------------------------------------------------------ state */

const student = JSON.parse(localStorage.getItem('camp.student') || 'null');
if (!student) location.href = '/';

let curriculum = null;
let progress = new Map();   // taskKey -> row
let helpOn = false;
let view = { day: 1, taskIndex: 0, mode: 'task' };

const $ = (sel) => document.querySelector(sel);
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html !== undefined) n.innerHTML = html;
  return n;
};

/* ------------------------------------------------------------------ store */

const logEvent = (kind, task, detail) =>
  store.logEvent({
    studentId: student.id,
    taskKey: task ? task.key : null,
    day: task ? task.day : null,
    kind,
    detail
  }).catch(() => {});

async function saveTask(task, { done = false, code, attemptDelta = 0 } = {}) {
  const row = await store.saveProgress({
    studentId: student.id,
    taskKey: task.key,
    day: task.day,
    done,
    xp: task.xp,
    code,
    attemptDelta
  });
  progress.set(task.key, row);
  paintHeader();
  paintDays();
  paintTaskNav();
  return row;
}

/* ------------------------------------------------------------ small bits */

function toast(text, win = false) {
  const t = el('div', 'toast' + (win ? ' win' : ''), '');
  t.textContent = text;
  $('#toasts').appendChild(t);
  setTimeout(() => t.remove(), 3200);
}

function confetti() {
  const box = $('#celebrate');
  const colours = ['#ff8a3d', '#7c5cff', '#1f9d5a', '#e0457b', '#0d9be0', '#ffcc33'];
  for (let i = 0; i < 60; i++) {
    const bit = el('div', 'confetti');
    bit.style.left = Math.random() * 100 + 'vw';
    bit.style.background = colours[i % colours.length];
    bit.style.animationDuration = 1.6 + Math.random() * 1.4 + 's';
    bit.style.animationDelay = Math.random() * 0.35 + 's';
    box.appendChild(bit);
    setTimeout(() => bit.remove(), 3400);
  }
}

const isDone = (key) => Boolean(progress.get(key)?.done);
const totalXp = () => [...progress.values()].reduce((sum, r) => sum + (r.done ? r.xp : 0), 0);

function dayStats(day) {
  const done = day.tasks.filter((t) => isDone(t.key)).length;
  return { done, total: day.tasks.length, pct: Math.round((done / day.tasks.length) * 100) };
}

function dayUnlocked(dayNumber) {
  if (dayNumber === 1) return true;
  const prev = curriculum.days[dayNumber - 2];
  return dayStats(prev).pct >= 60;
}

function currentRank() {
  const xp = totalXp();
  let rank = curriculum.ranks[0];
  for (const r of curriculum.ranks) if (xp >= r.at) rank = r;
  return rank;
}

/* ---------------------------------------------------------------- header */

function paintHeader() {
  $('#meFace').textContent = student.avatar;
  $('#meName').textContent = student.name;

  const xp = totalXp();
  const rank = currentRank();
  $('#meRank').textContent = `${rank.icon} ${rank.name}`;
  $('#xpFill').style.width = Math.min(100, (xp / curriculum.totalXp) * 100) + '%';
  $('#xpText').textContent = `${xp} / ${curriculum.totalXp} XP`;

  const badges = $('#badges');
  badges.innerHTML = '';
  for (const day of curriculum.days) {
    const earned = dayStats(day).pct === 100;
    const b = el('div', 'badge' + (earned ? ' earned' : ''),
      `<span class="ico">${day.badge}</span>${day.badgeName}`);
    b.title = earned ? `Earned: ${day.badgeName}` : `Finish Day ${day.day} to earn this`;
    badges.appendChild(b);
  }
}

/* ------------------------------------------------------------- day list */

function paintDays() {
  const box = $('#dayList');
  box.innerHTML = '';
  for (const day of curriculum.days) {
    const stats = dayStats(day);
    const unlocked = dayUnlocked(day.day);
    const card = el('div', 'day-card' + (unlocked ? '' : ' locked') + (day.day === view.day ? ' current' : ''));
    card.innerHTML = `
      <div class="dtitle"><span style="font-size:1.3rem">${unlocked ? day.emoji : '🔒'}</span>
        <span>Day ${day.day}: ${day.title}</span></div>
      <div class="dsub">${day.subtitle} · ${stats.done}/${stats.total} done</div>
      <div class="minibar"><i style="width:${stats.pct}%;background:${day.color}"></i></div>`;
    card.onclick = () => {
      if (!unlocked && !confirm(
        `You have not finished Day ${day.day - 1} yet.\n\nDay ${day.day} builds on it, so things may not make sense.\nOpen it anyway?`
      )) return;
      view = { day: day.day, taskIndex: 0, mode: 'task' };
      render();
    };
    box.appendChild(card);
  }
}

/* -------------------------------------------------------- task nav strip */

const KIND_LABEL = { lesson: 'Learn', blanks: 'Fill the blanks', quiz: 'Quiz', code: 'Code it', project: 'Mini project' };

function paintTaskNav() {
  const day = curriculum.days[view.day - 1];
  const box = $('#taskNav');
  box.innerHTML = `<div class="small muted" style="margin-bottom:4px">Day ${day.day} · ${day.title}</div>`;
  const list = el('div', 'task-list');
  day.tasks.forEach((task, i) => {
    const item = el('div', 'task-item' + (isDone(task.key) ? ' done' : '') + (i === view.taskIndex && view.mode === 'task' ? ' on' : ''));
    item.innerHTML = `<div class="tick">${isDone(task.key) ? '✔' : i + 1}</div>
      <div><div class="tname"></div><div class="tkind">${KIND_LABEL[task.type]} · ${task.xp} XP</div></div>`;
    item.querySelector('.tname').textContent = task.title;
    item.onclick = () => { view = { day: view.day, taskIndex: i, mode: 'task' }; render(); };
    list.appendChild(item);
  });
  box.appendChild(list);
}

/* ------------------------------------------------------------ code editor */

function makeEditor(initial, { minHeight } = {}) {
  const shell = el('div', 'editor-shell');
  shell.innerHTML = `<div class="editor-bar">🐍 your_program.py</div>`;
  const area = el('textarea', 'editor');
  area.value = initial || '';
  area.spellcheck = false;
  if (minHeight) area.style.minHeight = minHeight;

  area.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const { selectionStart: a, selectionEnd: b } = area;
      area.value = area.value.slice(0, a) + '    ' + area.value.slice(b);
      area.selectionStart = area.selectionEnd = a + 4;
    }
    if (e.key === 'Enter') {
      const upto = area.value.slice(0, area.selectionStart);
      const line = upto.slice(upto.lastIndexOf('\n') + 1);
      const indent = (line.match(/^[ ]*/) || [''])[0];
      const extra = line.trim().endsWith(':') ? '    ' : '';
      if (indent || extra) {
        e.preventDefault();
        const pos = area.selectionStart;
        const insert = '\n' + indent + extra;
        area.value = area.value.slice(0, pos) + insert + area.value.slice(area.selectionEnd);
        area.selectionStart = area.selectionEnd = pos + insert.length;
      }
    }
  });

  const out = el('pre', 'output');
  out.innerHTML = '<span class="sys">Output will appear here when you press Run.</span>';
  shell.append(area, out);
  return { shell, area, out };
}

async function runInto(area, out, stdin, button) {
  out.innerHTML = '<span class="sys">Running…</span>';
  if (button) button.disabled = true;
  const result = await runPython(area.value, stdin || []);
  if (button) button.disabled = false;

  const parts = [];
  if (result.stdout) parts.push(escapeHtml(result.stdout.replace(/\n$/, '')));
  if (result.error) parts.push(`<span class="err">${escapeHtml(friendlyError(result.error))}</span>`);
  if (!parts.length) parts.push('<span class="sys">(your program finished without printing anything)</span>');
  out.innerHTML = parts.join('\n');
  return result;
}

function escapeHtml(text) {
  return String(text).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
}

/* --------------------------------------------------------------- lessons */

function renderLesson(task, pane) {
  const body = el('div', 'lesson-body');
  for (const block of task.blocks) {
    if (block.t === 'p') body.appendChild(el('p', null, block.html));
    else if (block.t === 'h') body.appendChild(el('h3', null, escapeHtml(block.text)));
    else if (block.t === 'tip') body.appendChild(el('div', 'callout tip', '💡 ' + block.html));
    else if (block.t === 'warn') body.appendChild(el('div', 'callout warn', '⚠️ ' + block.html));
    else if (block.t === 'list') {
      const ul = el('ul');
      for (const item of block.items) ul.appendChild(el('li', null, item));
      body.appendChild(ul);
    } else if (block.t === 'code') {
      if (!block.run) {
        body.appendChild(el('pre', null, escapeHtml(block.code)));
      } else {
        const wrap = el('div', null, '');
        const ed = makeEditor(block.code, { minHeight: '120px' });
        const bar = el('div', 'runbar');
        const runBtn = el('button', 'go', '▶ Run');
        bar.appendChild(runBtn);
        if (block.note) bar.appendChild(el('span', 'small muted', block.note));
        runBtn.onclick = () => runInto(ed.area, ed.out, block.stdin, runBtn);
        wrap.append(ed.shell, bar);
        body.appendChild(wrap);
      }
    }
  }
  pane.appendChild(body);

  const done = isDone(task.key);
  const btn = el('button', 'go', done ? '✔ Already done — next →' : "✓ I've got this!");
  btn.style.marginTop = '18px';
  btn.onclick = async () => {
    if (!done) {
      await saveTask(task, { done: true });
      toast(`+${task.xp} XP`, true);
      logEvent('complete', task);
    }
    nextTask();
  };
  pane.appendChild(btn);
}

/* ---------------------------------------------------------------- blanks */

function renderBlanks(task, pane) {
  pane.appendChild(el('p', null, task.intro));
  const inputs = [];

  task.items.forEach((item, idx) => {
    const box = el('div', 'blank-item');
    box.appendChild(el('div', null, `<b>${idx + 1}.</b> ${item.prompt}`));

    const codeBox = el('div', 'blank-code');
    const pieces = item.code.split(/(\[\[\d+\]\])/g);
    for (const piece of pieces) {
      const hit = piece.match(/^\[\[(\d+)\]\]$/);
      if (hit) {
        const spec = item.blanks.find((b) => b.id === Number(hit[1]));
        const input = el('input', 'blank');
        input.type = 'text';
        input.spellcheck = false;
        input.dataset.hint = spec.hint;
        input._accept = spec.accept;
        inputs.push(input);
        codeBox.appendChild(input);
      } else {
        codeBox.appendChild(document.createTextNode(piece));
      }
    }
    box.appendChild(codeBox);
    pane.appendChild(box);
  });

  const bar = el('div', 'runbar');
  const checkBtn = el('button', null, 'Check my answers');
  const hintBtn = el('button', 'ghost small', 'Show a hint for the empty ones');
  bar.append(checkBtn, hintBtn);
  pane.appendChild(bar);

  const verdict = el('div');
  pane.appendChild(verdict);

  hintBtn.onclick = () => {
    const stuck = inputs.filter((i) => !i.classList.contains('ok'));
    verdict.innerHTML = '';
    const box = el('div', 'hintbox', '<b>Hints:</b>');
    const ul = el('ul');
    for (const i of stuck.slice(0, 3)) ul.appendChild(el('li', null, i.dataset.hint));
    box.appendChild(ul);
    verdict.appendChild(box);
  };

  checkBtn.onclick = async () => {
    let wrong = 0;
    for (const input of inputs) {
      const typed = input.value;
      const ok = input._accept.some(
        (a) => typed === a || typed.trim() === a.trim() || typed.trim().toLowerCase() === a.trim().toLowerCase()
      );
      input.classList.toggle('ok', ok);
      input.classList.toggle('no', !ok);
      if (!ok) wrong++;
    }
    verdict.innerHTML = '';
    if (wrong === 0) {
      verdict.appendChild(el('div', 'verdict ok', `🎉 All correct! <b>+${task.xp} XP</b>`));
      if (!isDone(task.key)) {
        await saveTask(task, { done: true, attemptDelta: 1 });
        confetti();
        toast(`+${task.xp} XP`, true);
        logEvent('complete', task);
      }
      const next = el('button', 'go', 'Next →');
      next.style.marginTop = '12px';
      next.onclick = nextTask;
      verdict.appendChild(next);
    } else {
      verdict.appendChild(el('div', 'verdict no',
        `${wrong} ${wrong === 1 ? 'gap is' : 'gaps are'} not right yet — the red ones. Try again, or press the hint button.`));
      await saveTask(task, { attemptDelta: 1 });
      logEvent('attempt-fail', task, `${wrong} blanks wrong`);
    }
  };
}

/* ------------------------------------------------------------------ quiz */

function renderQuiz(task, pane) {
  pane.appendChild(el('p', 'muted', 'Pick an answer. Got it wrong? You will see why, then you can try again.'));
  const solved = new Set();

  task.questions.forEach((q, qi) => {
    const box = el('div', 'q-block');
    box.appendChild(el('div', 'q-text', `${qi + 1}. ${q.q}`));
    const why = el('div', 'why hidden');

    q.options.forEach((text, oi) => {
      const opt = el('div', 'opt');
      opt.innerHTML = `<span class="letter">${'ABCD'[oi]}</span><span></span>`;
      opt.querySelector('span:last-child').textContent = text;
      opt.onclick = async () => {
        if (solved.has(qi)) return;
        if (oi === q.answer) {
          opt.classList.add('right');
          solved.add(qi);
          why.innerHTML = '✅ ' + q.why;
          why.classList.remove('hidden');
          if (solved.size === task.questions.length) finishQuiz();
        } else {
          opt.classList.add('wrong');
          why.innerHTML = '❌ Not that one. ' + (q.why ? '<i>Think about it: ' + q.why + '</i>' : '');
          why.classList.remove('hidden');
          await saveTask(task, { attemptDelta: 1 });
          logEvent('attempt-fail', task, `Q${qi + 1}`);
        }
      };
      box.appendChild(opt);
    });

    box.appendChild(why);
    pane.appendChild(box);
  });

  const verdict = el('div');
  pane.appendChild(verdict);

  async function finishQuiz() {
    verdict.innerHTML = '';
    verdict.appendChild(el('div', 'verdict ok', `🎉 Quiz complete! <b>+${task.xp} XP</b>`));
    if (!isDone(task.key)) {
      await saveTask(task, { done: true });
      confetti();
      toast(`+${task.xp} XP`, true);
      logEvent('complete', task);
    }
    const next = el('button', 'go', 'Next →');
    next.style.marginTop = '12px';
    next.onclick = nextTask;
    verdict.appendChild(next);
    verdict.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

/* --------------------------------------------------------- code / project */

function renderCode(task, pane) {
  pane.appendChild(el('div', 'lesson-body', task.brief));

  if (task.checklist) {
    const ul = el('ul', 'checklist');
    for (const line of task.checklist) ul.appendChild(el('li', null, line));
    pane.appendChild(el('div', null, '<b>Your checklist:</b>'));
    pane.appendChild(ul);
  }

  const saved = progress.get(task.key)?.last_code;
  const ed = makeEditor(saved || task.starter || '', { minHeight: task.type === 'project' ? '280px' : '210px' });
  pane.appendChild(ed.shell);

  const bar = el('div', 'runbar');
  const runBtn = el('button', 'go', '▶ Run');
  const checkBtn = el('button', null, '✅ Check my answer');
  const hintBtn = el('button', 'ghost small', '💡 Hint');
  const resetBtn = el('button', 'ghost small', '↺ Start over');
  bar.append(runBtn, checkBtn, hintBtn, resetBtn);
  if (task.stdin?.length) {
    bar.appendChild(el('span', 'small muted',
      `Test answers typed in for you: ${task.stdin.join(', ')}`));
  }
  pane.appendChild(bar);

  const hints = el('div');
  const verdict = el('div');
  pane.append(hints, verdict);

  let hintsShown = 0;
  hintBtn.onclick = () => {
    const all = task.hints || [];
    if (hintsShown >= all.length) { toast('That was the last hint — ask your teacher! 🙋'); return; }
    hintsShown++;
    logEvent('hint', task, `hint ${hintsShown}`);
    hints.innerHTML = '';
    const box = el('div', 'hintbox', `<b>Hint ${hintsShown} of ${all.length}</b>`);
    for (let i = 0; i < hintsShown; i++) box.appendChild(el('div', null, '• ' + all[i]));
    hints.appendChild(box);
  };

  resetBtn.onclick = () => {
    if (confirm('Throw away your code and start from the beginning?')) ed.area.value = task.starter || '';
  };

  runBtn.onclick = () => runInto(ed.area, ed.out, task.stdin, runBtn);

  checkBtn.onclick = async () => {
    checkBtn.disabled = true;
    verdict.innerHTML = '<div class="verdict">Checking…</div>';
    const result = await checkTask(task, ed.area.value);
    checkBtn.disabled = false;

    const shown = result.runs[result.runs.length - 1];
    if (shown) {
      const parts = [];
      if (shown.stdout) parts.push(escapeHtml(shown.stdout.replace(/\n$/, '')));
      if (shown.error) parts.push(`<span class="err">${escapeHtml(friendlyError(shown.error))}</span>`);
      ed.out.innerHTML = parts.join('\n') || '<span class="sys">(nothing was printed)</span>';
    }

    verdict.innerHTML = '';
    if (result.passed) {
      verdict.appendChild(el('div', 'verdict ok',
        `🎉 <b>That works!</b> ${task.type === 'project' ? 'Brilliant project.' : ''} <b>+${task.xp} XP</b>`));
      if (!isDone(task.key)) {
        await saveTask(task, { done: true, code: ed.area.value, attemptDelta: 1 });
        confetti();
        toast(`+${task.xp} XP`, true);
        logEvent('complete', task);
      } else {
        await saveTask(task, { done: true, code: ed.area.value });
      }
      const next = el('button', 'go', 'Next →');
      next.style.marginTop = '12px';
      next.onclick = nextTask;
      verdict.appendChild(next);
    } else {
      const box = el('div', 'verdict no', '<b>Not yet — but you are close. Here is what to look at:</b>');
      const ul = el('ul');
      for (const message of result.failures) ul.appendChild(el('li', null, escapeHtml(message)));
      box.appendChild(ul);
      verdict.appendChild(box);
      await saveTask(task, { code: ed.area.value, attemptDelta: 1 });
      logEvent('attempt-fail', task, result.failures[0]);

      const row = progress.get(task.key);
      if (row && row.attempts >= 4) {
        const nudge = el('div', 'hintbox',
          '😅 Tried a few times now? Press <b>💡 Hint</b>, or tap <b>🙋 I need help</b> at the top so your teacher comes over.');
        verdict.appendChild(nudge);
      }
    }
  };
}

/* ---------------------------------------------------------- certificate */

function renderCertificate(pane) {
  const xp = totalXp();
  const earned = curriculum.days.filter((d) => dayStats(d).pct === 100);
  const rank = currentRank();

  const cert = el('div', 'cert');
  cert.innerHTML = `
    <div style="font-size:3rem">${student.avatar}</div>
    <div class="small muted" style="letter-spacing:.2em;text-transform:uppercase">Python Camp</div>
    <div class="big" id="certName"></div>
    <p>completed <b>${earned.length} of 5</b> days and earned <b>${xp} XP</b>,<br>
       reaching the rank of <b>${rank.icon} ${rank.name}</b>.</p>
    <div class="badge-row">
      ${curriculum.days.map((d) => {
        const got = dayStats(d).pct === 100;
        return `<div class="badge ${got ? 'earned' : ''}"><span class="ico">${d.badge}</span>${d.badgeName}</div>`;
      }).join('')}
    </div>
    <p class="small muted" style="margin-top:18px">${new Date().toLocaleDateString()}</p>`;
  cert.querySelector('#certName').textContent = student.name;
  pane.appendChild(cert);

  const bar = el('div', 'runbar');
  bar.style.marginTop = '16px';
  const printBtn = el('button', null, '🖨️ Print my certificate');
  printBtn.onclick = () => window.print();
  const backBtn = el('button', 'ghost', '← Back to learning');
  backBtn.onclick = () => { view.mode = 'task'; render(); };
  bar.append(printBtn, backBtn);
  pane.appendChild(bar);
}

/* ---------------------------------------------------------------- render */

function nextTask() {
  const day = curriculum.days[view.day - 1];
  if (view.taskIndex + 1 < day.tasks.length) {
    view.taskIndex++;
  } else if (view.day < curriculum.days.length) {
    const stats = dayStats(day);
    if (stats.pct === 100) { confetti(); toast(`Day ${day.day} complete — badge unlocked! ${day.badge}`, true); }
    view = { day: view.day + 1, taskIndex: 0, mode: 'task' };
  } else {
    view.mode = 'cert';
  }
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function render() {
  paintHeader();
  paintDays();

  const pane = $('#pane');
  pane.innerHTML = '';

  if (view.mode === 'cert') {
    $('#taskNav').classList.add('hidden');
    renderCertificate(pane);
    return;
  }
  $('#taskNav').classList.remove('hidden');
  paintTaskNav();

  const day = curriculum.days[view.day - 1];
  const task = day.tasks[view.taskIndex];

  const head = el('div', 'task-head');
  head.innerHTML = `
    <div style="font-size:2rem">${day.emoji}</div>
    <div style="flex:1;min-width:220px">
      <div class="small muted">Day ${day.day} · ${day.title}</div>
      <h2 id="taskTitle" style="margin:0"></h2>
      <div class="row wrap" style="gap:8px;margin-top:6px">
        <span class="pill">${KIND_LABEL[task.type]}</span>
        <span class="pill xp">${task.xp} XP</span>
        <span class="pill">~${task.minutes} min</span>
        ${isDone(task.key) ? '<span class="pill" style="background:#e4f6ec;color:#1f9d5a">✔ Done</span>' : ''}
      </div>
    </div>`;
  head.querySelector('#taskTitle').textContent = task.title;
  pane.appendChild(head);

  if (view.taskIndex === 0) {
    pane.appendChild(el('div', 'callout tip', `<b>Today's big idea:</b> ${day.bigIdea}`));
  }

  if (task.type === 'lesson') renderLesson(task, pane);
  else if (task.type === 'blanks') renderBlanks(task, pane);
  else if (task.type === 'quiz') renderQuiz(task, pane);
  else renderCode(task, pane);

  logEvent('open', task);
}

/* ------------------------------------------------------------- top bar */

$('#switchBtn').onclick = () => {
  localStorage.removeItem('camp.student');
  location.href = '/';
};

$('#certBtn').onclick = () => { view.mode = 'cert'; render(); };

$('#helpBtn').onclick = async () => {
  helpOn = !helpOn;
  const day = curriculum.days[view.day - 1];
  const task = day.tasks[view.taskIndex];
  await store.setHelp({ studentId: student.id, taskKey: task?.key, day: view.day, on: helpOn });
  $('#helpBtn').textContent = helpOn ? '🙋 Help is coming — tap to cancel' : '🙋 I need help';
  $('#helpBtn').classList.toggle('danger', helpOn);
  $('#helpBtn').classList.toggle('ghost', !helpOn);
  toast(helpOn ? 'Your teacher has been told 🙋' : 'Help request cancelled');
};

onRunnerStatus((state, detail) => {
  const node = $('#pyStatus');
  if (state === 'ready') node.textContent = 'Python: ready ✅';
  else if (state === 'failed') {
    node.textContent = 'Python: offline ⚠️';
    node.title = detail || '';
  } else node.textContent = 'Python: waking up…';
});

/* ------------------------------------------------------------------ boot */

(async function boot() {
  await store.initStore();
  curriculum = store.getCurriculum();

  const data = await store.getStudentProgress(student.id);
  if (!data.student) {
    // Demo progress was cleared, or this student belongs to another browser.
    localStorage.removeItem('camp.student');
    location.href = '/';
    return;
  }
  progress = new Map(data.progress.map((row) => [row.task_key, row]));
  helpOn = data.help;

  if (store.mode === 'demo') {
    $('#helpBtn').classList.add('hidden');
    document.title = 'Python Camp (demo)';
  }
  if (helpOn) {
    $('#helpBtn').textContent = '🙋 Help is coming — tap to cancel';
    $('#helpBtn').classList.add('danger');
  }

  // Drop the learner on the first thing they have not finished.
  outer: for (const day of curriculum.days) {
    for (let i = 0; i < day.tasks.length; i++) {
      if (!isDone(day.tasks[i].key)) { view = { day: day.day, taskIndex: i, mode: 'task' }; break outer; }
    }
  }

  render();
  startPython();
  logEvent('login');
})();
