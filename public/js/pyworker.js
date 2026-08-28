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

/* --------------------------------------------------------------- turtle --
 * Pyodide has no Tk, so the real turtle module cannot run. This is a stand-in
 * that does the geometry in Python and records what was drawn. The page then
 * paints those records onto a <canvas>. Kids write ordinary turtle code and
 * see ordinary turtle drawings; they never find out it is not the real thing.
 *
 * Coordinates follow turtle convention: origin in the middle, y pointing up,
 * heading 0 = east and angles counter-clockwise. The canvas flips y.
 */
const TURTLE = `
import math, sys, types

_camp_turtle = types.ModuleType("turtle")
_camp_ops = []
_camp_meta = {"bg": "white", "used": False, "overflow": False}
_CAMP_MAX_OPS = 20000

def _camp_emit(op):
    if len(_camp_ops) >= _CAMP_MAX_OPS:
        _camp_meta["overflow"] = True
        return
    _camp_ops.append(op)

class _CampTurtle:
    def __init__(self, shape="classic", **kw):
        self.x = 0.0
        self.y = 0.0
        self.heading = 0.0
        self.is_down = True
        self.pen_color = "black"
        self.fill_color = "black"
        self.pen_width = 1
        self.visible = True
        self._filling = False
        self._path = []
        _camp_meta["used"] = True

    # ---------------------------------------------------------- movement --
    def _move_to(self, nx, ny):
        if self.is_down:
            _camp_emit({"op": "line", "x1": self.x, "y1": self.y, "x2": nx, "y2": ny,
                        "color": self.pen_color, "width": self.pen_width})
        if self._filling:
            self._path.append([nx, ny])
        self.x = nx
        self.y = ny

    def forward(self, distance):
        r = math.radians(self.heading)
        self._move_to(self.x + distance * math.cos(r), self.y + distance * math.sin(r))
    fd = forward

    def backward(self, distance):
        self.forward(-distance)
    bk = backward
    back = backward

    def right(self, angle):
        self.heading = (self.heading - angle) % 360.0
    rt = right

    def left(self, angle):
        self.heading = (self.heading + angle) % 360.0
    lt = left

    def goto(self, x, y=None):
        if y is None:
            x, y = x
        self._move_to(float(x), float(y))
    setpos = goto
    setposition = goto

    def setx(self, x):
        self._move_to(float(x), self.y)

    def sety(self, y):
        self._move_to(self.x, float(y))

    def home(self):
        self._move_to(0.0, 0.0)
        self.heading = 0.0

    def setheading(self, angle):
        self.heading = float(angle) % 360.0
    seth = setheading

    def circle(self, radius, extent=None, steps=None):
        if extent is None:
            extent = 360.0
        if steps is None:
            steps = max(6, int(abs(extent) / 8.0) + 3)
        step_angle = float(extent) / steps
        chord = 2.0 * float(radius) * math.sin(math.radians(step_angle) / 2.0)
        for _ in range(steps):
            self.left(step_angle / 2.0)
            self.forward(chord)
            self.left(step_angle / 2.0)

    def dot(self, size=None, color=None):
        _camp_emit({"op": "dot", "x": self.x, "y": self.y,
                    "size": float(size) if size else max(4, self.pen_width + 4),
                    "color": color if color else self.pen_color})

    def stamp(self):
        _camp_emit({"op": "stamp", "x": self.x, "y": self.y,
                    "heading": self.heading, "color": self.pen_color})

    def write(self, text, move=False, align="left", font=("Arial", 12, "normal")):
        try:
            size = int(font[1])
        except Exception:
            size = 12
        _camp_emit({"op": "text", "x": self.x, "y": self.y, "text": str(text),
                    "size": size, "align": str(align), "color": self.pen_color})

    # --------------------------------------------------------------- pen --
    def penup(self):
        self.is_down = False
    pu = penup
    up = penup

    def pendown(self):
        self.is_down = True
    pd = pendown
    down = pendown

    def isdown(self):
        return self.is_down

    def pensize(self, width=None):
        if width is None:
            return self.pen_width
        self.pen_width = max(1, float(width))
    width = pensize

    def pencolor(self, *args):
        if not args:
            return self.pen_color
        self.pen_color = _camp_colour(*args)

    def fillcolor(self, *args):
        if not args:
            return self.fill_color
        self.fill_color = _camp_colour(*args)

    def color(self, *args):
        if not args:
            return (self.pen_color, self.fill_color)
        if len(args) == 2 and isinstance(args[0], str) and isinstance(args[1], str):
            self.pen_color = _camp_colour(args[0])
            self.fill_color = _camp_colour(args[1])
        else:
            c = _camp_colour(*args)
            self.pen_color = c
            self.fill_color = c

    def begin_fill(self):
        self._filling = True
        self._path = [[self.x, self.y]]

    def end_fill(self):
        if self._filling and len(self._path) > 2:
            _camp_emit({"op": "fill", "points": self._path, "color": self.fill_color})
        self._filling = False
        self._path = []

    # ------------------------------------------------------------- state --
    def position(self):
        return (round(self.x, 2), round(self.y, 2))
    pos = position

    def xcor(self):
        return round(self.x, 2)

    def ycor(self):
        return round(self.y, 2)

    def towards(self, x, y=None):
        if y is None:
            x, y = x
        return math.degrees(math.atan2(float(y) - self.y, float(x) - self.x)) % 360.0

    def distance(self, x, y=None):
        if y is None:
            x, y = x
        return math.hypot(float(x) - self.x, float(y) - self.y)

    def clear(self):
        _camp_ops.clear()

    def reset(self):
        _camp_ops.clear()
        self.__init__()

    # Cosmetic or windowing calls that have no meaning on a canvas.
    def speed(self, *a): return 0
    def hideturtle(self): self.visible = False
    def showturtle(self): self.visible = True
    ht = hideturtle
    st = showturtle
    def isvisible(self): return self.visible
    def shape(self, *a): return "classic"
    def shapesize(self, *a): pass
    def tracer(self, *a): pass
    def delay(self, *a): pass
    def update(self): pass
    def getscreen(self): return _camp_screen

def _camp_colour(*args):
    """Accepts 'red', '#ff0000' or an (r, g, b) triple like real turtle does."""
    if len(args) == 1:
        c = args[0]
        if isinstance(c, (tuple, list)) and len(c) == 3:
            r, g, b = c
        else:
            return str(c)
    elif len(args) == 3:
        r, g, b = args
    else:
        return "black"
    if max(r, g, b) <= 1.0:
        r, g, b = r * 255, g * 255, b * 255
    return "#%02x%02x%02x" % (int(r) & 255, int(g) & 255, int(b) & 255)

class _CampScreen:
    def bgcolor(self, *args):
        if not args:
            return _camp_meta["bg"]
        _camp_meta["bg"] = _camp_colour(*args)
        _camp_meta["used"] = True
    def setup(self, *a, **k): pass
    def title(self, *a): pass
    def screensize(self, *a, **k): pass
    def tracer(self, *a, **k): pass
    def update(self): pass
    def delay(self, *a): pass
    def exitonclick(self): pass
    def bye(self): pass
    def mainloop(self): pass
    def clear(self): _camp_ops.clear()
    def reset(self): _camp_ops.clear()
    def listen(self, *a, **k): pass
    def onkey(self, *a, **k): pass
    def onkeypress(self, *a, **k): pass
    def onclick(self, *a, **k): pass
    def textinput(self, *a, **k): return ""
    def numinput(self, *a, **k): return 0

_camp_screen = _CampScreen()
_camp_default = None

def _camp_get_default():
    global _camp_default
    if _camp_default is None:
        _camp_default = _CampTurtle()
    return _camp_default

def _camp_bind(name):
    """Module-level forward()/right()/... that drive the default turtle."""
    def wrapper(*args, **kwargs):
        return getattr(_camp_get_default(), name)(*args, **kwargs)
    wrapper.__name__ = name
    return wrapper

_CAMP_FORWARDED = [
    "forward", "fd", "backward", "bk", "back", "right", "rt", "left", "lt",
    "goto", "setpos", "setposition", "setx", "sety", "home", "setheading", "seth",
    "circle", "dot", "stamp", "write", "penup", "pu", "up", "pendown", "pd", "down",
    "isdown", "pensize", "width", "pencolor", "fillcolor", "color", "begin_fill",
    "end_fill", "position", "pos", "xcor", "ycor", "towards", "distance", "clear",
    "reset", "speed", "hideturtle", "showturtle", "ht", "st", "isvisible", "shape",
    "shapesize", "tracer", "delay", "update"
]
for _name in _CAMP_FORWARDED:
    setattr(_camp_turtle, _name, _camp_bind(_name))

def _camp_bgcolor(*args):
    return _camp_screen.bgcolor(*args)

_camp_turtle.Turtle = _CampTurtle
_camp_turtle.Pen = _CampTurtle
_camp_turtle.Screen = lambda: _camp_screen
_camp_turtle.getscreen = lambda: _camp_screen
_camp_turtle.bgcolor = _camp_bgcolor
_camp_turtle.done = lambda: None
_camp_turtle.mainloop = lambda: None
_camp_turtle.exitonclick = lambda: None
_camp_turtle.bye = lambda: None
_camp_turtle.setup = lambda *a, **k: None
_camp_turtle.title = lambda *a: None
_camp_turtle.listen = lambda *a, **k: None

sys.modules["turtle"] = _camp_turtle

def _camp_turtle_reset():
    global _camp_default
    _camp_ops.clear()
    _camp_meta["bg"] = "white"
    _camp_meta["used"] = False
    _camp_meta["overflow"] = False
    _camp_default = None
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
      pyodide.runPython(TURTLE);
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
  let turtle = null;

  try {
    pyodide.runPython(`
import io, sys, json, traceback, linecache

_camp_stdin.clear()
_camp_stdin.extend(json.loads(_camp_feed))
_camp_turtle_reset()

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
_camp_drawing = json.dumps({
    "ops": _camp_ops,
    "bg": _camp_meta["bg"],
    "overflow": _camp_meta["overflow"]
}) if _camp_meta["used"] else ""
`);
    stdout = globals.get('_camp_result') || '';
    error = globals.get('_camp_error') || '';
    const drawing = globals.get('_camp_drawing') || '';
    if (drawing) {
      try { turtle = JSON.parse(drawing); } catch { turtle = null; }
    }
  } catch (err) {
    error = String(err && err.message ? err.message : err);
  }

  postMessage({ type: 'result', id, stdout: String(stdout), error: String(error), turtle });
}

self.onmessage = (event) => {
  const msg = event.data || {};
  if (msg.type === 'boot') boot();
  else if (msg.type === 'run') runCode(msg.id, msg.code, msg.stdin);
};
