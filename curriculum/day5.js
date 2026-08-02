// DAY 5 — Your Own Commands  (functions) + final project
export default {
  day: 5,
  title: 'Your Own Commands',
  subtitle: 'Functions, and the big finale',
  emoji: '⚡',
  color: '#0d9be0',
  badge: '🏆',
  badgeName: 'Python Coder',
  bigIdea: 'You have used other people\'s commands all week — print, input, len. Today you invent your own.',
  tasks: [
    /* ---------------------------------------------------------------- 5.1 */
    {
      key: 'd5-1',
      type: 'lesson',
      title: 'Inventing a command',
      xp: 10,
      minutes: 10,
      blocks: [
        { t: 'p', html: 'A <b>function</b> is a set of instructions with a name. You write it once, then use it as many times as you like — like teaching the computer a new word.' },
        { t: 'code', code: 'def greet():\n    print("Hello there!")\n    print("Welcome to Python Camp")\n\ngreet()\ngreet()', run: true },
        { t: 'h', text: 'Two separate steps' },
        { t: 'list', items: [
          '<b>Defining</b> — <code>def greet():</code> and the indented lines underneath. This teaches Python the new command but does <i>not</i> run it.',
          '<b>Calling</b> — <code>greet()</code> on its own line. This actually runs it.'
        ] },
        { t: 'p', html: 'Delete the two <code>greet()</code> lines at the bottom and run it again. Nothing happens! A function that is never called never does anything.' },
        { t: 'h', text: 'The shape of a function' },
        { t: 'list', items: [
          'the word <code>def</code> (short for define)',
          'the name you invented, then empty brackets <code>()</code>',
          'a <b>colon</b>',
          'the instructions, <b>indented</b> underneath'
        ] },
        { t: 'warn', html: 'Do not forget the brackets when you call it. <code>greet</code> on its own does nothing useful; <code>greet()</code> runs it.' },
        { t: 'h', text: 'Why bother?' },
        { t: 'code', code: 'def line():\n    print("-" * 20)\n\nline()\nprint("MENU")\nline()\nprint("1. Pizza")\nprint("2. Pasta")\nline()', run: true, note: 'Bonus: "-" * 20 makes a string of twenty dashes!' },
        { t: 'tip', html: 'If you find yourself copying and pasting the same few lines, that is your signal to make a function instead.' }
      ]
    },

    /* ---------------------------------------------------------------- 5.2 */
    {
      key: 'd5-2',
      type: 'blanks',
      title: 'Defining and calling',
      xp: 20,
      minutes: 8,
      intro: 'Fill the gaps to build working functions.',
      items: [
        {
          prompt: 'Create a function called <code>cheer</code>.',
          code: '[[1]] cheer():\n    print("Go team!")\n\ncheer()',
          blanks: [{ id: 1, accept: ['def'], hint: 'Three letters, short for define.' }]
        },
        {
          prompt: 'The function is defined but never runs. Make it run.',
          code: 'def wave():\n    print("👋")\n\n[[1]]',
          blanks: [{ id: 1, accept: ['wave()'], hint: 'The name plus empty round brackets.' }]
        },
        {
          prompt: 'The punctuation at the end of the def line is missing.',
          code: 'def hello()[[1]]\n    print("hi")\n\nhello()',
          blanks: [{ id: 1, accept: [':'], hint: 'Same mark that ends if and for lines.' }]
        },
        {
          prompt: 'This function needs a name — call it <code>star_line</code>.',
          code: 'def [[1]]():\n    print("*****")\n\nstar_line()',
          blanks: [{ id: 1, accept: ['star_line'], hint: 'Copy exactly what is called at the bottom, without the brackets.' }]
        }
      ]
    },

    /* ---------------------------------------------------------------- 5.3 */
    {
      key: 'd5-3',
      type: 'quiz',
      title: 'Function quiz',
      xp: 20,
      minutes: 6,
      questions: [
        {
          q: 'What does <code>def</code> mean?',
          options: ['Delete', 'Define — teach Python a new command', 'Default', 'Definitely run this now'],
          answer: 1,
          why: 'def defines the function. Nothing runs until you call it.'
        },
        {
          q: 'What does this print?<br><code>def hi():<br>&nbsp;&nbsp;&nbsp;&nbsp;print("hi")</code>',
          options: ['hi', 'hi hi', 'Nothing — it was never called', 'An error'],
          answer: 2,
          why: 'Defining a function only teaches it. You still have to call hi().'
        },
        {
          q: 'How do you run a function called <code>start</code>?',
          options: ['start', 'start()', 'def start()', 'run start'],
          answer: 1,
          why: 'The brackets are what actually launch it.'
        },
        {
          q: 'What is the main reason to use functions?',
          options: [
            'They make the file bigger',
            'So you can reuse the same code without copying it',
            'Python requires them',
            'They make the program run faster'
          ],
          answer: 1,
          why: 'Write once, use many times — and give the idea a name so your code reads clearly.'
        },
        {
          q: 'What is wrong here?<br><code>def go():<br>print("hello")</code>',
          options: [
            'The print should be indented',
            'def should be capital',
            'It needs quote marks around go',
            'Nothing is wrong'
          ],
          answer: 0,
          why: 'The body of a function must be indented, or Python does not know it belongs to the function.'
        }
      ]
    },

    /* ---------------------------------------------------------------- 5.4 */
    {
      key: 'd5-4',
      type: 'lesson',
      title: 'Functions that take information',
      xp: 10,
      minutes: 10,
      blocks: [
        { t: 'p', html: 'A function is far more useful when you can hand it something. Those handed-over items go in the brackets and are called <b>parameters</b>.' },
        { t: 'code', code: 'def greet(name):\n    print("Hello, " + name + "!")\n\ngreet("Sam")\ngreet("Priya")\ngreet("Max")', run: true, output: 'Hello, Sam!\nHello, Priya!\nHello, Max!' },
        { t: 'p', html: 'One function, three different results. Whatever you put inside the brackets when you call it lands in <code>name</code> for that run.' },
        { t: 'h', text: 'More than one parameter' },
        { t: 'code', code: 'def score_report(player, points):\n    print(player, "scored", points, "points")\n\nscore_report("Ana", 30)\nscore_report("Ben", 12)', run: true },
        { t: 'p', html: 'Separate them with commas. <b>Order matters</b> — the first thing you pass in goes into the first parameter.' },
        { t: 'h', text: 'Mixing loops and functions' },
        { t: 'code', code: 'def times_table(number):\n    for n in range(1, 6):\n        print(n, "x", number, "=", n * number)\n    print("---")\n\ntimes_table(3)\ntimes_table(8)', run: true },
        { t: 'p', html: 'Look at the double indentation: the <code>for</code> is inside the function, and the <code>print</code> is inside the <code>for</code>. Each level pushes in another 4 spaces.' },
        { t: 'tip', html: 'Reading indentation is a real skill. Line up the left edges with your finger to see what is inside what.' }
      ]
    },

    /* ---------------------------------------------------------------- 5.5 */
    {
      key: 'd5-5',
      type: 'code',
      title: 'Personal greeter',
      xp: 30,
      minutes: 12,
      brief:
        'Write a function called <code>welcome</code> that takes one parameter <code>name</code> and prints <code>Welcome to camp, NAME!</code><br><br>Then call it three times with three different names.',
      starter: 'def welcome(name):\n    # print the welcome message here\n\n\nwelcome("Ana")\n# call it twice more\n',
      hints: [
        'Inside the function: print("Welcome to camp, " + name + "!")',
        'Or use commas: print("Welcome to camp,", name)',
        'Calling it looks like welcome("Ben") — the name goes in the brackets, in quote marks.'
      ],
      requires: [
        { text: 'def welcome', message: 'Your function must be called welcome.' }
      ],
      checks: [
        { mode: 'contains', expect: 'Welcome to camp', message: 'The message should say "Welcome to camp".' },
        { mode: 'contains', expect: 'Ana', message: 'Call your function with Ana as one of the names.' },
        { mode: 'minlines', expect: 3, message: 'Call the function three times so you get three lines.' }
      ]
    },

    /* ---------------------------------------------------------------- 5.6 */
    {
      key: 'd5-6',
      type: 'lesson',
      title: 'Functions that hand something back',
      xp: 10,
      minutes: 10,
      blocks: [
        { t: 'p', html: 'So far our functions <i>print</i>. Sometimes you want a function to work something out and <b>hand the answer back</b> so you can use it later. That is <code>return</code>.' },
        { t: 'code', code: 'def double(number):\n    return number * 2\n\nanswer = double(7)\nprint(answer)\nprint(double(50))', run: true, output: '14\n100' },
        { t: 'p', html: 'The function does not print anything itself. It hands back a value, and <i>you</i> decide what to do with it — store it in a box, print it, or use it in more maths.' },
        { t: 'h', text: 'print versus return' },
        { t: 'list', items: [
          '<b>print</b> — shows something to the human. The program cannot reuse it.',
          '<b>return</b> — hands a value back to the program. Nothing appears on screen unless you print it.'
        ] },
        { t: 'code', code: 'def add(a, b):\n    return a + b\n\ntotal = add(3, 4)\nbigger = add(total, 100)\nprint(bigger)', run: true, output: '107' },
        { t: 'warn', html: '<code>return</code> ends the function immediately. Any lines after it inside the function are skipped.' },
        { t: 'h', text: 'Putting the whole week together' },
        { t: 'code', code: 'def check_answer(guess, secret):\n    if guess == secret:\n        return "Correct!"\n    elif guess < secret:\n        return "Too low"\n    else:\n        return "Too high"\n\nfor g in [3, 9, 7]:\n    print(g, "->", check_answer(g, 7))', run: true },
        { t: 'p', html: 'That one snippet uses functions, parameters, return, if/elif/else, comparisons, a list and a loop — everything from all five days.' }
      ]
    },

    /* ---------------------------------------------------------------- 5.7 */
    {
      key: 'd5-7',
      type: 'code',
      title: 'The calculator function',
      xp: 30,
      minutes: 12,
      brief:
        'Write a function called <code>area</code> that takes <code>width</code> and <code>height</code> and <b>returns</b> width × height.<br><br>Then print the area of a 5×3 rectangle and a 10×10 rectangle.',
      starter: 'def area(width, height):\n    # return the answer here\n\n\nprint(area(5, 3))\nprint(area(10, 10))\n',
      hints: [
        'return width * height',
        'Do not print inside the function — hand the number back with return.',
        'The two calls at the bottom should show 15 and 100.'
      ],
      requires: [
        { text: 'def area', message: 'Your function must be called area.' },
        { text: 'return', message: 'This one must use return, not print, inside the function.' }
      ],
      checks: [
        { mode: 'contains', expect: '15', message: 'area(5, 3) should give 15.' },
        { mode: 'contains', expect: '100', message: 'area(10, 10) should give 100.' }
      ]
    },

    /* ---------------------------------------------------------------- 5.8 */
    {
      key: 'd5-8',
      type: 'project',
      title: 'FINAL PROJECT: Guess the number',
      xp: 100,
      minutes: 30,
      brief:
        'The big one. Build a guessing game that uses everything from the week.<br><br>The secret number is <b>7</b>. Keep asking the player to guess. Tell them <code>Too low</code> or <code>Too high</code>, and when they get it right print <code>Correct!</code> and stop.<br><br>It will be tested with the guesses <b>3</b>, then <b>9</b>, then <b>7</b>.',
      checklist: [
        'A variable holding the secret number 7',
        'A while loop that keeps going until the guess is right',
        'input() wrapped in int() to read each guess',
        'if / elif / else giving "Too low", "Too high" or "Correct!"',
        'Something that stops the loop when they win',
        'Bonus: count the guesses and print "You took 3 guesses"',
        'Bonus: put the checking part inside a function'
      ],
      starter:
        '# Guess the number\nsecret = 7\nguess = 0\n\nwhile guess != secret:\n    guess = int(input("Guess a number: "))\n    # tell them too low, too high, or correct\n\n',
      hints: [
        'The while condition guess != secret means "keep going while the guess is wrong".',
        'Inside the loop: if guess < secret: print("Too low") elif guess > secret: print("Too high") else: print("Correct!")',
        'Start guess at 0 so the loop runs at least once.',
        'To count guesses: tries = 0 before the loop, then tries = tries + 1 inside it.'
      ],
      stdin: ['3', '9', '7'],
      requires: [
        { text: 'while', message: 'Use a while loop so it keeps asking until they are right.' },
        { text: 'input', message: 'Use input to read each guess.' }
      ],
      checks: [
        { mode: 'contains', expect: 'Too low', message: 'The guess 3 should give "Too low".' },
        { mode: 'contains', expect: 'Too high', message: 'The guess 9 should give "Too high".' },
        { mode: 'contains', expect: 'Correct!', message: 'The guess 7 should give "Correct!" and end the game.' }
      ]
    }
  ]
};
