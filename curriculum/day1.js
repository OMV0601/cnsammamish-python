// DAY 1 — Hello, Python!  (printing, strings, comments)
export default {
  day: 1,
  title: 'Hello, Python!',
  subtitle: 'Make the computer talk',
  emoji: '👋',
  color: '#ff8a3d',
  badge: '🗣️',
  badgeName: 'The Talker',
  bigIdea: 'A program is a list of instructions. Today we learn the instruction that makes the computer say things.',
  tasks: [
    /* ---------------------------------------------------------------- 1.1 */
    {
      key: 'd1-1',
      type: 'lesson',
      title: 'Meet Python',
      xp: 10,
      minutes: 8,
      blocks: [
        { t: 'p', html: 'A <b>program</b> is just a list of instructions, written in order, from top to bottom. The computer does line 1, then line 2, then line 3 — it never skips ahead and it never guesses what you meant.' },
        { t: 'p', html: '<b>Python</b> is a language for writing those instructions. It was named after a comedy show, not the snake — but we kept the snake anyway. 🐍' },
        { t: 'h', text: 'Your first instruction: print' },
        { t: 'p', html: '<code>print</code> means "show this on the screen". You put what you want to show inside the <b>round brackets</b>.' },
        { t: 'code', code: 'print("Hello, world!")', run: true, output: 'Hello, world!' },
        { t: 'p', html: 'Press <b>▶ Run</b> above and watch the black box. That black box is called the <b>output</b> — it is where the computer answers you.' },
        { t: 'h', text: 'The three things print always needs' },
        { t: 'list', items: [
          'The word <code>print</code> — all lowercase. <code>Print</code> and <code>PRINT</code> will not work.',
          'Round brackets <code>( )</code> — one open, one close.',
          'Quote marks <code>" "</code> around your words — one at the start, one at the end.'
        ] },
        { t: 'code', code: 'print("I am learning Python")\nprint("This is line two")\nprint("Every print gets its own line")', run: true },
        { t: 'p', html: 'Notice: <b>each print starts a new line</b> in the output. Three prints, three lines.' },
        { t: 'h', text: 'When you break it' },
        { t: 'p', html: 'Everybody breaks their code. Constantly. Even people who do this for a job. When Python cannot understand you, it shows a red message called an <b>error</b>. An error is not you being told off — it is Python telling you exactly which line confused it.' },
        { t: 'code', code: 'print("I forgot my closing quote)', run: true },
        { t: 'p', html: 'Run that one on purpose. Read the red message. Now fix it by adding the missing <code>"</code> before the bracket, and run it again.' },
        { t: 'tip', html: 'Golden rule of the camp: <b>if it goes red, read it.</b> The error usually tells you the line number.' },
        { t: 'h', text: 'Notes to yourself: comments' },
        { t: 'p', html: 'A line starting with <code>#</code> is a <b>comment</b>. Python completely ignores it. Comments are notes for humans.' },
        { t: 'code', code: '# This line does nothing at all\nprint("But this line runs")', run: true, output: 'But this line runs' }
      ]
    },

    /* ---------------------------------------------------------------- 1.2 */
    {
      key: 'd1-2',
      type: 'blanks',
      title: 'Fix the broken prints',
      xp: 20,
      minutes: 8,
      intro: 'Each program below is missing a piece. Type the missing piece into the gap. Watch your spelling!',
      items: [
        {
          prompt: 'Make the computer say <b>Hi!</b>',
          code: '[[1]]("Hi!")',
          blanks: [{ id: 1, accept: ['print'], hint: 'The instruction that shows things on screen. All lowercase.' }]
        },
        {
          prompt: 'The quote marks went missing.',
          code: 'print([[1]]Good morning[[2]])',
          blanks: [
            { id: 1, accept: ['"', "'"], hint: 'A quote mark opens the text.' },
            { id: 2, accept: ['"', "'"], hint: 'A matching quote mark closes it.' }
          ]
        },
        {
          prompt: 'The brackets went missing.',
          code: 'print[[1]]"Python is fun"[[2]]',
          blanks: [
            { id: 1, accept: ['('], hint: 'Round bracket, opening.' },
            { id: 2, accept: [')'], hint: 'Round bracket, closing.' }
          ]
        },
        {
          prompt: 'Turn this line into a comment so Python ignores it.',
          code: '[[1]] remember to feed the cat\nprint("Running!")',
          blanks: [{ id: 1, accept: ['#'], hint: 'The hash symbol makes a comment.' }]
        },
        {
          prompt: 'Make this program print <b>3</b> separate lines.',
          code: 'print("one")\n[[1]]("two")\nprint("three")',
          blanks: [{ id: 1, accept: ['print'], hint: 'Same instruction as the lines above and below.' }]
        }
      ]
    },

    /* ---------------------------------------------------------------- 1.3 */
    {
      key: 'd1-3',
      type: 'quiz',
      title: 'Print quiz',
      xp: 20,
      minutes: 6,
      questions: [
        {
          q: 'What does <code>print("Hello")</code> put on the screen?',
          options: ['Hello', '"Hello"', 'print Hello', 'Nothing'],
          answer: 0,
          why: 'The quote marks tell Python where your text starts and ends — they are not part of the message.'
        },
        {
          q: 'Which line is written correctly?',
          options: ['Print("hi")', 'print "hi"', 'print("hi")', 'print(hi)'],
          answer: 2,
          why: 'Lowercase print, round brackets, and quote marks around the text. All three are needed.'
        },
        {
          q: 'How many lines does this show?<br><code>print("a")<br>print("b")</code>',
          options: ['1 line', '2 lines', '3 lines', 'It errors'],
          answer: 1,
          why: 'Each print automatically moves to a new line afterwards.'
        },
        {
          q: 'What does Python do with <code># my note</code>?',
          options: ['Prints "my note"', 'Ignores it completely', 'Shows an error', 'Saves it as a file'],
          answer: 1,
          why: 'Comments are for humans. Python skips right over them.'
        },
        {
          q: 'Your code goes red and says <b>SyntaxError</b>. What should you do first?',
          options: [
            'Delete everything and start again',
            'Ask a friend to write it for you',
            'Read the message and look at the line number it mentions',
            'Run it again and hope'
          ],
          answer: 2,
          why: 'Errors are clues, not punishments. They almost always name the line that confused Python.'
        }
      ]
    },

    /* ---------------------------------------------------------------- 1.4 */
    {
      key: 'd1-4',
      type: 'code',
      title: 'Say hello, for real',
      xp: 30,
      minutes: 10,
      brief: 'Write a program that prints <b>exactly three lines</b>:<br>1. The word <code>Hello!</code><br>2. Your name<br>3. Your favourite animal',
      starter: '# Line 1\nprint("Hello!")\n\n# Now add two more prints below\n',
      hints: [
        'You need three print lines, one under the other.',
        'Every line looks like: print("something here")',
        'Your name goes inside the quote marks, like print("Sam")'
      ],
      requires: [{ text: 'print', message: 'You need to use print.' }],
      checks: [
        { mode: 'contains', expect: 'Hello!', message: 'The first line should say Hello!' },
        { mode: 'minlines', expect: 3, message: 'I only see fewer than 3 lines of output. Add another print.' }
      ]
    },

    /* ---------------------------------------------------------------- 1.5 */
    {
      key: 'd1-5',
      type: 'lesson',
      title: 'Sticking words together',
      xp: 10,
      minutes: 8,
      blocks: [
        { t: 'p', html: 'Text inside quote marks has a name: a <b>string</b>. Think of it as beads on a string — a row of letters, spaces and symbols.' },
        { t: 'code', code: 'print("cat")\nprint("Cat 123 !!!")\nprint("")', run: true },
        { t: 'p', html: 'That last one prints an <b>empty string</b> — a blank line. Useful for making space.' },
        { t: 'h', text: 'The + sign glues strings' },
        { t: 'p', html: 'With strings, <code>+</code> does not mean add-up. It means <b>join together</b>.' },
        { t: 'code', code: 'print("Snow" + "ball")', run: true, output: 'Snowball' },
        { t: 'warn', html: 'Python glues them <b>exactly</b> as given — it will not add a space for you. <code>"Hello" + "Sam"</code> becomes <code>HelloSam</code>.' },
        { t: 'code', code: 'print("Hello" + "Sam")\nprint("Hello " + "Sam")\nprint("Hello" + " " + "Sam")', run: true },
        { t: 'p', html: 'Look closely at those three lines and find where the space lives in each one.' },
        { t: 'h', text: 'Commas do it the easy way' },
        { t: 'p', html: 'You can also give <code>print</code> several things separated by commas. Python puts a space between them automatically.' },
        { t: 'code', code: 'print("Hello", "Sam", "how are you?")', run: true, output: 'Hello Sam how are you?' },
        { t: 'tip', html: '<b>Plus</b> = glue with nothing between. <b>Comma</b> = glue with a space between. Both are useful.' },
        { t: 'h', text: 'Making shapes' },
        { t: 'p', html: 'Strings can hold symbols too, so you can draw with them.' },
        { t: 'code', code: 'print("*******")\nprint("*     *")\nprint("*  :) *")\nprint("*     *")\nprint("*******")', run: true }
      ]
    },

    /* ---------------------------------------------------------------- 1.6 */
    {
      key: 'd1-6',
      type: 'blanks',
      title: 'String glue',
      xp: 20,
      minutes: 8,
      intro: 'Fill the gaps so each program prints what the label says.',
      items: [
        {
          prompt: 'Should print: <code>Football</code>',
          code: 'print("Foot" [[1]] "ball")',
          blanks: [{ id: 1, accept: ['+'], hint: 'The symbol that glues two strings together.' }]
        },
        {
          prompt: 'Should print: <code>Good morning</code> — mind the space!',
          code: 'print("Good[[1]]" + "morning")',
          blanks: [{ id: 1, accept: [' '], hint: 'Something invisible goes here. Press the space bar once.' }]
        },
        {
          prompt: 'Should print: <code>I love pizza</code> using commas.',
          code: 'print("I"[[1]] "love"[[2]] "pizza")',
          blanks: [
            { id: 1, accept: [','], hint: 'A comma separates the things you give to print.' },
            { id: 2, accept: [','], hint: 'Same symbol as the last gap.' }
          ]
        },
        {
          prompt: 'Should print a completely blank line.',
          code: 'print("first")\nprint([[1]])\nprint("last")',
          blanks: [{ id: 1, accept: ['""', "''"], hint: 'Two quote marks with absolutely nothing between them.' }]
        }
      ]
    },

    /* ---------------------------------------------------------------- 1.7 */
    {
      key: 'd1-7',
      type: 'code',
      title: 'Poster maker',
      xp: 30,
      minutes: 12,
      brief:
        'Print a poster that looks <b>exactly</b> like this:<pre>=========\nPYTHON\nCAMP\n=========</pre>Four lines. Nine equals signs on the top and bottom lines.',
      starter: 'print("=========")\n# your turn\n',
      hints: [
        'You need four print lines.',
        'Count the equals signs carefully — nine of them.',
        'PYTHON and CAMP are in capital letters, on their own lines.'
      ],
      checks: [
        {
          mode: 'exact',
          expect: '=========\nPYTHON\nCAMP\n=========',
          message: 'Not quite. Compare your output with the poster in the task, line by line.'
        }
      ]
    },

    /* ---------------------------------------------------------------- 1.8 */
    {
      key: 'd1-8',
      type: 'project',
      title: 'Mini project: Your trading card',
      xp: 50,
      minutes: 20,
      brief:
        'Build a trading card about yourself, printed to the screen. Make it look good — you are designing it, not just answering a question.',
      checklist: [
        'A top border line made of symbols (like ***** or -----)',
        'A line with your name on it',
        'A line with your age',
        'A line with a superpower you would pick',
        'A bottom border line matching the top',
        'At least one comment (#) explaining part of your code'
      ],
      starter:
        '# My trading card\n# Made by: (put your name here)\n\nprint("***************")\nprint("*  NAME: ???  *")\n',
      hints: [
        'Every line of the card is its own print.',
        'Use + or a comma if you want to join words on one line.',
        'Borders are just strings of repeated symbols, e.g. print("-----------")'
      ],
      requires: [
        { text: '#', message: 'Add at least one comment starting with #.' },
        { text: 'print', message: 'Use print to draw your card.' }
      ],
      checks: [{ mode: 'minlines', expect: 5, message: 'A card needs at least 5 lines of output.' }]
    }
  ]
};
