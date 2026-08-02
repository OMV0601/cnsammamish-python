/* Web Worker that runs real Python via Pyodide.
   Living in a worker means an infinite loop only wedges the worker, and the
   page can terminate it and start a fresh one. */

const PYODIDE_VERSIONS = ['0.26.4', '0.27.2', '0.25.1', '0.24.1'];

let pyodide = null;

// Overrides input() so the browser can feed pre-written answers in, and prints
// the prompt + answer so the output reads like a real terminal session.
const PRELUDE = `
import builtins, sys

_camp_stdin = []

def _camp_input(prompt=""):
    sys.stdout.write(str(prompt))
    if _camp_stdin:
        value = str(_camp_stdin.pop(0))
    else:
        value = ""
    sys.stdout.write(value + "\\n")
    return value

builtins.input = _camp_input
`;

async function boot() {
  let lastError = null;
  for (const version of PYODIDE_VERSIONS) {
    try {
      self.importScripts(`https://cdn.jsdelivr.net/pyodide/v${version}/full/pyodide.js`);
      pyodide = await self.loadPyodide({
        indexURL: `https://cdn.jsdelivr.net/pyodide/v${version}/full/`
      });
      pyodide.runPython(PRELUDE);
      postMessage({ type: 'ready', version });
      return;
    } catch (err) {
      lastError = err;
    }
  }
  postMessage({
    type: 'boot-failed',
    error: String(lastError && lastError.message ? lastError.message : lastError)
  });
}

function runCode(id, code, stdin) {
  if (!pyodide) {
    postMessage({ type: 'result', id, stdout: '', error: 'Python is still waking up. Try again in a moment.' });
    return;
  }

  const globals = pyodide.globals;
  globals.set('_camp_source', String(code));
  globals.set('_camp_feed', JSON.stringify(stdin || []));

  let stdout = '';
  let error = '';

  try {
    pyodide.runPython(`
import io, sys, json, traceback, linecache

_camp_stdin.clear()
_camp_stdin.extend(json.loads(_camp_feed))

# Registering the source means tracebacks can show the actual line that broke,
# even though the code never touched a real file.
linecache.cache["your_program.py"] = (
    len(_camp_source), None, _camp_source.splitlines(True), "your_program.py"
)

_camp_out = io.StringIO()
_camp_saved = sys.stdout
sys.stdout = _camp_out
try:
    exec(compile(_camp_source, "your_program.py", "exec"), {"__name__": "__main__"})
    _camp_error = ""
except SystemExit:
    _camp_error = ""
except BaseException:
    _camp_error = traceback.format_exc()
finally:
    sys.stdout = _camp_saved

_camp_result = _camp_out.getvalue()
`);
    stdout = globals.get('_camp_result') || '';
    error = globals.get('_camp_error') || '';
  } catch (err) {
    error = String(err && err.message ? err.message : err);
  }

  postMessage({ type: 'result', id, stdout: String(stdout), error: String(error) });
}

self.onmessage = (event) => {
  const msg = event.data || {};
  if (msg.type === 'boot') boot();
  else if (msg.type === 'run') runCode(msg.id, msg.code, msg.stdin);
};
