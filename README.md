# 🐍 Python Camp

A gamified, self-paced Python course for ~8 kids aged 10, built for a **5-session camp, 2 hours per session**. Kids read short lessons, fill in blanks, take quizzes, and write **real Python that runs in the browser**. Everything they do is saved to a database, and you get a live dashboard showing where all 8 of them are.

No installs on the kids' machines. No accounts. No internet needed for the app itself.

---

## Running it

**Double-click `START CAMP.bat`.**

Or from a terminal in this folder:

```bash
node server.js
```

The terminal prints something like:

```
  You (teacher):    http://localhost:3000/teacher
  Teacher passcode: camp2026

  Kids type this into their browser:
      http://192.168.1.24:3000
```

Kids type that `192.168.x.x` address into any browser on the same wifi. That's the whole setup.

To use a different port: `node server.js --port 8080`
To change the teacher passcode: set `TEACHER_PASSCODE` before starting.

> **⚠️ OneDrive note.** This folder sits inside OneDrive, and sync clients can lock a live SQLite file mid-write. It will very likely be fine, but to remove the risk entirely, keep the database outside OneDrive:
>
> ```bash
> set CAMP_DB=C:\PythonCamp\camp.db
> node server.js
> ```
>
> The server prints the database path it's actually using on startup.

**Requires Node 22.5+** (this uses Node's built-in SQLite). You have Node 24 — you're fine. There are **zero npm dependencies**; there is nothing to install and nothing to break.

---

## ⚠️ Do not deploy this to Vercel / Netlify / Cloudflare Pages

This is a **local-first app, on purpose**. It will crash on serverless hosting, and it is not worth "fixing":

- `db.js` creates and writes a **SQLite file on disk**. Serverless filesystems are read-only apart from `/tmp`, so the function dies on the first request with `FUNCTION_INVOCATION_FAILED`.
- Even pointed at `/tmp`, serverless instances are **stateless and disposable**. Kids would land on different instances and instances get recycled mid-session, so **progress would randomly disappear** — the exact thing this app exists to prevent.
- `server.js` is a long-running server that holds a port. Serverless platforms want a per-request handler instead.

Hosting buys nothing here: everyone is in one room on one wifi network, and running locally means the camp still works if the venue's internet drops. If you ever genuinely need it reachable from home, the storage has to move to a hosted database (Turso, Neon) — that's a real rewrite of `db.js`, not a config change.

The Python execution is client-side (Pyodide), so it is unaffected either way.

---

## What the kids see

1. **Pick a character and type their first name** — that's the whole login.
2. A **map of 5 days**. Day 1 is open; each next day unlocks at 60% of the previous one (they can push past it with a warning if you tell them to).
3. Inside a day, a numbered list of tasks that always runs in the same rhythm:

   **Learn → Fill the blanks → Quiz → Code it → Mini project**

4. Every task gives **XP**. XP moves them up ranks (🥚 Egg → 🐣 Hatchling → 🐍 Coder → 🔦 Bug Hunter → 🧙 Code Wizard → 👑 Python Legend). Finishing a whole day earns that day's **badge**. Confetti fires on every win.
5. At the end there's a **printable certificate** with their badges on it.
6. A **🙋 I need help** button at the top. One tap lights them up red on your dashboard.

---

## What you see (`/teacher`)

- A grid of **all 8 kids × 5 days**, with a progress bar per cell — one glance tells you who's flying and who's stuck.
- 🙋 **Help requests** at the top, with the exact task they're stuck on.
- 😬 **Automatic stuck detection** — anyone who has failed the same task 4+ times without solving it shows up even if they didn't ask.
- A **live activity feed** (joined / finished / tried / used a hint).
- Click any name to read **the actual code they wrote** on every task. Great for spotting a shared misconception before you re-explain it to the room.
- Buttons to reset a kid's progress or remove them (type `RESET` or `DELETE` when prompted).

The dashboard refreshes itself every 6 seconds. Leave it open on your laptop or a second screen.

---

## The 5 days

| Day | Title | Covers | Mini project |
|-----|-------|--------|--------------|
| 1 | 👋 Hello, Python! | `print`, strings, quotes, `+` vs commas, comments, reading errors | Trading card |
| 2 | 📦 Boxes That Remember | variables, `input`, `int()`, maths operators, `score = score + 1` | Dog years calculator |
| 3 | 🔀 Making Choices | `==` vs `=`, comparisons, `if` / `else` / `elif`, indentation, `and` / `or` | The secret door |
| 4 | 🔁 Doing It Again | `for`, `range`, lists, `len`, `append`, looping a list, `while` | Rocket launch |
| 5 | ⚡ Your Own Commands | `def`, calling, parameters, `return`, print vs return | **Guess the number** (uses everything) |

Each day is **8 tasks, roughly 85–95 minutes of material**. That deliberately leaves ~25 minutes per session for you to introduce the day, do a demo on the projector, and wrap up. Fast kids will finish early — point them at the **Bonus** lines in each mini project's checklist, which are open-ended on purpose.

### Suggested 2-hour shape

| Time | What |
|------|------|
| 0:00–0:10 | You demo the day's big idea on the projector (it's printed at the top of each day) |
| 0:10–1:00 | Kids work through Learn → Blanks → Quiz at their own pace |
| 1:00–1:10 | Break / stretch |
| 1:10–1:50 | Code tasks + the mini project |
| 1:50–2:00 | Two or three kids share their project on the projector |

---

## How the code checking works

Kids write Python in a real editor and press **▶ Run**. It executes actual CPython compiled to WebAssembly (Pyodide) inside a Web Worker in their browser — real output, real error messages.

- **▶ Run** just runs it, so they can experiment.
- **✅ Check my answer** runs it against the task's tests and either awards XP or gives specific, friendly feedback ("The first line should read: 1 x 7 = 7").
- Output matching ignores capitalisation, blank lines and extra spaces, so kids don't lose a point over a stray space.
- Tasks that use `input()` have the answers pre-typed for them, and the panel shows what they were (e.g. "Test answers typed in for you: 3, 9, 7").
- Error messages get **translated into kid English** — a `NameError` becomes "Python has never seen that name before. Check the spelling…".
- An infinite loop is killed after **10 seconds** with an explanation, and the Python engine restarts itself. A kid cannot freeze their own laptop.

**One internet note:** the Python engine (Pyodide, ~10 MB) downloads from a CDN the first time each browser loads it, then the browser caches it. So the *first* load on each machine needs internet. Everything else — lessons, quizzes, blanks, progress, the dashboard — works fully offline. If you're worried about the venue's wifi, open the app once on each machine beforehand to warm the cache.

---

## Files

```
python-camp/
  START CAMP.bat      double-click to run
  server.js           zero-dependency web server + API
  db.js               SQLite schema and queries
  curriculum/         day1.js … day5.js — all lessons, quizzes and tests
  public/             the web app (no build step, plain HTML/CSS/JS)
  data/camp.db        created on first run — this is all the kids' progress
```

**Back up `data/camp.db`** between sessions if you care about the progress — it's a single file, just copy it.

## Editing the content

Everything a kid reads lives in `curriculum/day1.js` … `day5.js`. Each task is a plain object. Change a quiz question, reword a hint, or add a task to a day, then restart the server. XP totals recalculate themselves.
