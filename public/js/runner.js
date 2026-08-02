/* Page-side manager for the Python worker: booting, running with a timeout,
   tidying up error messages, and checking output against a task's rules. */

const RUN_TIMEOUT_MS = 10000;

let worker = null;
let ready = false;
let bootPromise = null;
const pending = new Map();
let nextId = 1;
const statusListeners = [];

export function onRunnerStatus(fn) {
  statusListeners.push(fn);
  fn(ready ? 'ready' : 'loading');
}
function announce(state, detail) {
  for (const fn of statusListeners) fn(state, detail);
}

function spawnWorker() {
  worker = new Worker('/js/pyworker.js');
  worker.onmessage = (event) => {
    const msg = event.data || {};
    if (msg.type === 'ready') {
      ready = true;
      announce('ready');
    } else if (msg.type === 'boot-failed') {
      ready = false;
      announce('failed', msg.error);
    } else if (msg.type === 'result') {
      const entry = pending.get(msg.id);
      if (entry) {
        clearTimeout(entry.timer);
        pending.delete(msg.id);
        entry.resolve({ stdout: msg.stdout, error: msg.error });
      }
    }
  };
  worker.onerror = () => {
    ready = false;
    announce('failed', 'The Python engine could not start. Check the internet connection.');
  };
  worker.postMessage({ type: 'boot' });
}

export function startPython() {
  if (bootPromise) return bootPromise;
  bootPromise = new Promise((resolve) => {
    spawnWorker();
    const check = setInterval(() => {
      if (ready) {
        clearInterval(check);
        resolve(true);
      }
    }, 120);
  });
  return bootPromise;
}

function restartWorker() {
  try { worker.terminate(); } catch { /* already gone */ }
  ready = false;
  announce('loading');
  for (const [, entry] of pending) clearTimeout(entry.timer);
  pending.clear();
  spawnWorker();
}

export function isReady() { return ready; }

/** Run Python. Resolves to { stdout, error, timedOut }. */
export function runPython(code, stdin = []) {
  if (!ready) {
    return Promise.resolve({
      stdout: '',
      error: 'Python is still loading — give it a few seconds and press Run again.',
      timedOut: false
    });
  }

  const id = nextId++;
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      pending.delete(id);
      restartWorker();
      resolve({
        stdout: '',
        timedOut: true,
        error:
          'Your program ran for 10 seconds without finishing, so it was stopped.\n' +
          'That almost always means a loop that never ends. Check that something ' +
          'inside your while loop changes, so the condition can become False.'
      });
    }, RUN_TIMEOUT_MS);

    pending.set(id, { resolve, timer });
    worker.postMessage({ type: 'run', id, code, stdin });
  });
}

/* ------------------------------------------------- friendlier tracebacks - */

const HUMAN_ERRORS = [
  [/SyntaxError.*was never closed/i, 'You opened a bracket or quote mark and never closed it. Count them on that line.'],
  [/unterminated string literal/i, 'A quote mark is missing. Every " needs a partner " on the same line.'],
  [/SyntaxError: invalid syntax/i, 'Python got confused by that line. Check for a missing colon (:), bracket or quote mark.'],
  [/expected ':'/i, 'A colon is missing at the end of that line. if, else, elif, for, while and def all need one.'],
  [/IndentationError: expected an indented block/i, 'The line after a colon must be pushed in by 4 spaces.'],
  [/IndentationError|unexpected indent/i, 'The spaces at the start of that line are not lining up. Lines in the same block need the same indentation.'],
  [/NameError: name '(.+?)' is not defined/i, "Python has never seen that name before. Check the spelling, and make sure you created it BEFORE using it. (Text needs quote marks!)"],
  [/can only concatenate str.*to str|unsupported operand type.*str.*int/i, 'You are trying to join text and a number with +. Wrap the number in str(), or use commas in print instead.'],
  [/invalid literal for int\(\)/i, 'int() was given something that is not a whole number, so it could not convert it.'],
  [/IndexError/i, 'You asked for an item that does not exist in the list. Remember the first item is [0].'],
  [/ZeroDivisionError/i, 'Nothing can be divided by zero — not even by Python.'],
  [/TypeError: .*object is not callable/i, 'Check your brackets — you may have used () on something that is not a function.'],
  [/AttributeError/i, 'That thing does not have the part you asked for. Check the spelling after the dot.']
];

/** Strips our wrapper frames out of a traceback and adds a kid-level hint. */
export function friendlyError(raw) {
  if (!raw) return '';
  const lines = String(raw).split('\n');
  const kept = [];

  for (let i = 0; i < lines.length; i++) {
    const fileMatch = lines[i].match(/^\s+File "(.*?)", line/);
    if (fileMatch) {
      if (fileMatch[1] === 'your_program.py') {
        kept.push(lines[i].replace(', in <module>', ''));
        if (lines[i + 1] && /^\s{4,}/.test(lines[i + 1])) kept.push(lines[++i]);
      } else if (lines[i + 1] && /^\s{4,}/.test(lines[i + 1])) {
        i++; // skip this frame and its source line
      }
      continue;
    }
    kept.push(lines[i]);
  }

  let text = kept.join('\n').replace(/\n{3,}/g, '\n\n').trim();
  for (const [pattern, help] of HUMAN_ERRORS) {
    if (pattern.test(text)) {
      text += `\n\n💡 ${help}`;
      break;
    }
  }
  return text;
}

/* ------------------------------------------------------- output checking - */

function normalise(text) {
  return String(text)
    .split('\n')
    .map((line) => line.trim().replace(/\s+/g, ' '))
    .filter((line) => line.length)
    .join('\n')
    .toLowerCase();
}

function countLines(text) {
  return String(text).split('\n').filter((line) => line.trim().length).length;
}

/**
 * Runs every check for a task.
 * Returns { passed, failures: [message], runs: [{stdin, stdout, error}] }
 */
export async function checkTask(task, code) {
  const failures = [];

  for (const rule of task.requires || []) {
    if (!code.includes(rule.text)) failures.push(rule.message);
  }

  const checks = task.checks || [];
  const runs = [];

  // Each check may bring its own stdin; group so we do not re-run identical inputs.
  const groups = new Map();
  for (const check of checks) {
    const feed = check.stdin || task.stdin || [];
    const key = JSON.stringify(feed);
    if (!groups.has(key)) groups.set(key, { stdin: feed, checks: [] });
    groups.get(key).checks.push(check);
  }
  if (!groups.size) groups.set('[]', { stdin: task.stdin || [], checks: [] });

  for (const [, group] of groups) {
    const result = await runPython(code, group.stdin);
    runs.push({ stdin: group.stdin, ...result });

    if (result.error) {
      failures.push(
        group.stdin.length
          ? `Your program crashed when it was tested with: ${group.stdin.join(', ')}`
          : 'Your program has an error — read the red message under the Run button.'
      );
      continue;
    }

    const out = normalise(result.stdout);
    for (const check of group.checks) {
      let ok = true;
      if (check.mode === 'exact') ok = out === normalise(check.expect);
      else if (check.mode === 'contains') ok = out.includes(normalise(check.expect));
      else if (check.mode === 'notcontains') ok = !out.includes(normalise(check.expect));
      else if (check.mode === 'minlines') ok = countLines(result.stdout) >= Number(check.expect);
      else if (check.mode === 'regex') ok = new RegExp(check.expect, 'i').test(result.stdout);
      if (!ok) failures.push(check.message || 'That output is not quite right yet.');
    }
  }

  return { passed: failures.length === 0, failures: [...new Set(failures)], runs };
}
