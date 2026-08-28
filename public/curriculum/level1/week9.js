// WEEK 9 — Turtle Stamp Studio
// Making and using simple functions
export default {
  day: 9,
  title: 'Turtle Stamp Studio',
  subtitle: 'Making and using simple functions',
  emoji: '🖼️',
  color: '#7c5cff',
  badge: '🧩',
  badgeName: 'Function Maker',
  bigIdea: 'Give a group of instructions a name once, and you can use it as many times as you like. Making it and using it are two different things.',
  byTheEnd: 'Give a group of familiar drawing steps a name, then use those steps again and again.',
  nextWeek: 'Next week, everything you know combines inside one guided mini adventure.',
  tasks: [
    /* ------------------------------------------------------------- 9.1 */
    {
      key: 'w9-1',
      type: 'lesson',
      title: 'Naming your own commands',
      xp: 10,
      minutes: 12,
      blocks: [
        { t: 'p', html: 'Four squares in a row, made from <b>one</b> set of instructions used four times.' },
        {
          t: 'code',
          run: true,
          code: 'import turtle\n\ndef draw_square():\n    for _ in range(4):\n        turtle.forward(50)\n        turtle.right(90)\n\nturtle.pencolor("purple")\nfor _ in range(4):\n    draw_square()\n    turtle.penup()\n    turtle.forward(70)\n    turtle.pendown()'
        },

        { t: 'h', text: 'def — making a function' },
        { t: 'p', html: 'A <b>function</b> is a group of lines with a name. You already use functions all the time: <code>print()</code>, <code>input()</code>, <code>len()</code>. Now you make your own.' },
        { t: 'code', code: 'def say_hello():\n    print("Hello!")\n    print("Nice to meet you.")\n\nprint("Program starts")\nsay_hello()\nprint("Program ends")', run: true, output: 'Program starts\nHello!\nNice to meet you.\nProgram ends' },
        { t: 'list', items: [
          '<code>def</code> — short for <b>define</b>. It means "I am about to make one".',
          'A name you choose, then <code>()</code> and a <code>:</code>.',
          'The lines that belong to it, <b>indented by 4 spaces</b>.'
        ] },

        { t: 'h', text: 'Making it and using it are different' },
        { t: 'p', html: 'This is the idea to hold on to. <code>def</code> only <b>saves</b> the instructions — it does not run them. Nothing happens until you <b>call</b> the function by writing its name with brackets.' },
        { t: 'code', code: 'def say_hello():\n    print("Hello!")\n\nprint("Nothing happened yet...")', run: true, output: 'Nothing happened yet...' },
        { t: 'p', html: 'Python read the recipe and filed it away. Now let us actually use it:' },
        { t: 'code', code: 'def say_hello():\n    print("Hello!")\n\nsay_hello()\nsay_hello()\nsay_hello()', run: true, output: 'Hello!\nHello!\nHello!' },
        { t: 'tip', html: 'Think of <code>def</code> as writing a recipe card, and <code>say_hello()</code> as actually cooking it. Writing the card feeds nobody.' },

        { t: 'h', text: 'Turning a loop into a function' },
        { t: 'p', html: 'Take the square loop you already know, and wrap it in a <code>def</code>. Notice the loop lines end up indented <b>8</b> spaces — 4 for the function, 4 more for the loop.' },
        {
          t: 'code',
          run: true,
          code: 'import turtle\n\ndef draw_square():\n    for _ in range(4):\n        turtle.forward(60)\n        turtle.right(90)\n\ndraw_square()'
        },

        { t: 'h', text: 'Two functions, one picture' },
        { t: 'p', html: 'Make as many as you like, then call them in any order to build a scene.' },
        {
          t: 'code',
          run: true,
          code: 'import turtle\n\ndef draw_square():\n    for _ in range(4):\n        turtle.forward(50)\n        turtle.right(90)\n\ndef draw_triangle():\n    for _ in range(3):\n        turtle.forward(50)\n        turtle.right(120)\n\ndef move_along():\n    turtle.penup()\n    turtle.forward(70)\n    turtle.pendown()\n\nturtle.pencolor("red")\ndraw_square()\nmove_along()\nturtle.pencolor("blue")\ndraw_triangle()\nmove_along()\nturtle.pencolor("green")\ndraw_square()'
        },
        { t: 'warn', html: 'All your <code>def</code> blocks go near the <b>top</b>. The lines that call them go <b>underneath</b>, not indented. If a call is accidentally indented inside a def, it will not run when you expect.' },

        { t: 'h', text: 'Why bother?' },
        { t: 'p', html: 'Three reasons: you write it once instead of four times; the name explains what it does; and if the square is wrong you fix it in one place.' }
      ]
    },

    /* ------------------------------------------------------------- 9.2 */
    {
      key: 'w9-2',
      type: 'blanks',
      title: 'Function pieces',
      xp: 20,
      minutes: 10,
      intro: 'Complete each function. Watch the colons and the indentation.',
      items: [
        {
          prompt: 'Start making a function called draw_square.',
          code: '[[1]] draw_square():\n    turtle.forward(50)',
          blanks: [{ id: 1, accept: ['def'], hint: 'Three letters, short for define.' }]
        },
        {
          prompt: 'The def line is missing two things at the end.',
          code: 'def say_hello[[1]][[2]]\n    print("Hi")',
          blanks: [
            { id: 1, accept: ['()'], hint: 'Two round brackets with nothing inside.' },
            { id: 2, accept: [':'], hint: 'The symbol that ends every def, if and for line.' }
          ]
        },
        {
          prompt: 'Actually run the function you made.',
          code: 'def say_hello():\n    print("Hi")\n\n[[1]]',
          blanks: [{ id: 1, accept: ['say_hello()'], hint: 'The name, then brackets. Do not forget the brackets!' }]
        },
        {
          prompt: 'Put the print inside the function — type 4 spaces.',
          code: 'def greet():\n[[1]]print("Hello there")',
          blanks: [{ id: 1, accept: ['    '], hint: 'Four spaces makes the line part of the function.' }]
        },
        {
          prompt: 'Call draw_square three times.',
          code: 'for _ in range(3):\n    [[1]]',
          blanks: [{ id: 1, accept: ['draw_square()'], hint: 'The function name with its brackets.' }]
        },
        {
          prompt: 'Lift the pen inside a move function.',
          code: 'def move_along():\n    turtle.[[1]]()\n    turtle.forward(70)\n    turtle.pendown()',
          blanks: [{ id: 1, accept: ['penup'], hint: 'The opposite of pendown.' }]
        }
      ]
    },

    /* ------------------------------------------------------------- 9.3 */
    {
      key: 'w9-3',
      type: 'quiz',
      title: 'Function quiz',
      xp: 20,
      minutes: 8,
      questions: [
        {
          q: 'What does <code>def</code> actually do?',
          options: [
            'Runs the lines straight away',
            'Saves the lines under a name for later',
            'Deletes a function',
            'Draws a shape'
          ],
          answer: 1,
          why: 'def only defines. Nothing runs until you call it.'
        },
        {
          q: 'What does this print?<pre>def hello():\n    print("Hi")\n\nprint("Start")</pre>',
          options: ['Hi then Start', 'Start then Hi', 'Just Start', 'Just Hi'],
          answer: 2,
          why: 'The function was defined but never called, so "Hi" never runs.'
        },
        {
          q: 'How do you use a function called <code>draw_star</code>?',
          options: ['draw_star', 'draw_star()', 'def draw_star()', 'call draw_star'],
          answer: 1,
          why: 'The name plus brackets. Without brackets nothing happens.'
        },
        {
          q: 'Inside <code>def draw_square():</code>, a <code>for</code> loop\'s body is indented by how much?',
          options: ['4 spaces', '8 spaces', 'None', '2 spaces'],
          answer: 1,
          why: '4 for being inside the function, 4 more for being inside the loop.'
        },
        {
          q: 'Why use functions at all?',
          options: [
            'They make the program run faster',
            'Write it once, name it clearly, and fix it in one place',
            'Python requires them',
            'They use less memory'
          ],
          answer: 1,
          why: 'Less repetition, clearer code, and one place to fix mistakes.'
        }
      ]
    },

    /* ------------------------------------------------------------- 9.4 */
    {
      key: 'w9-4',
      type: 'debug',
      title: 'Bug hunt: the function nobody called',
      xp: 25,
      minutes: 12,
      brief:
        'This program makes a perfectly good drawing function — and then <b>draws nothing at all</b>. No error, no picture. Work out what is missing.',
      starter:
        '# Stamp studio - BROKEN (nothing appears)\nimport turtle\n\nturtle.pencolor("green")\nturtle.pensize(3)\n\ndef draw_square():\n    for _ in range(4):\n        turtle.forward(60)\n        turtle.right(90)\n\n# The function above is never used...\n',
      hints: [
        'Python has saved the steps. But when is it being told to run them?',
        'A function only runs when you call it by name, below where it was made.',
        'Add draw_square() on its own line at the bottom, with no indentation.'
      ],
      requires: [
        { text: 'def draw_square', message: 'Keep the function definition.' }
      ],
      checks: [
        {
          mode: 'turtle', minSegments: 4, minDirections: 4, closed: true,
          message: 'Still nothing drawn — the function is defined but never called.'
        }
      ],
      understand:
        'Explain the difference between <b>making</b> a function and <b>using</b> it. Then call it one more time, after moving the turtle, without help.'
    },

    /* ------------------------------------------------------------- 9.5 */
    {
      key: 'w9-5',
      type: 'mission',
      title: 'Turtle Stamp Studio',
      xp: 45,
      minutes: 35,
      main: {
        brief:
          'Make <b>two</b> drawing functions — for example <code>draw_square()</code> and <code>draw_triangle()</code> — and call <b>each of them at least twice</b> to build a scene or a badge.',
        checklist: [
          'Two functions made with def, each drawing a shape',
          'Each function called at least twice',
          'The turtle moved between shapes so they do not overlap',
          'More than one colour',
          'A picture you are happy to show someone'
        ],
        starter:
          '# Turtle Stamp Studio\nimport turtle\n\nturtle.pensize(3)\n\n# --- Make your shapes here ---\ndef draw_square():\n    for _ in range(4):\n        turtle.forward(50)\n        turtle.right(90)\n\n# Now make a second shape function of your own\n\n\n# This one moves without drawing - handy between shapes\ndef move_along():\n    turtle.penup()\n    turtle.forward(70)\n    turtle.pendown()\n\n# --- Now use them to build your picture ---\n',
        hints: [
          'Your second function looks like the first: def draw_triangle(): then a range(3) loop turning 120.',
          'Below all the defs, call them: draw_square() then move_along() then draw_triangle().',
          'Change colour between shapes with turtle.pencolor("red") to make it look deliberate.'
        ],
        requires: [
          { text: 'def', message: 'You need to make your functions with def.' }
        ],
        checks: [
          {
            mode: 'turtle', minSegments: 14, minColours: 2, minDirections: 4,
            message: 'Expected at least four shapes drawn (two functions, each used twice) in more than one colour.'
          }
        ]
      },
      simpler: {
        label: 'Simpler Version',
        brief:
          'One function is written for you. <b>Call it twice</b>, moving the turtle in between so both shapes show.',
        starter:
          '# Stamp studio - simpler\nimport turtle\n\nturtle.pencolor("blue")\nturtle.pensize(3)\n\ndef draw_square():\n    for _ in range(4):\n        turtle.forward(50)\n        turtle.right(90)\n\ndef move_along():\n    turtle.penup()\n    turtle.forward(70)\n    turtle.pendown()\n\n# Use them below - remember the brackets!\n',
        hints: [
          'Write draw_square() on its own line, with no spaces in front of it.',
          'Then move_along() to shift along.',
          'Then draw_square() again for the second one.'
        ],
        checks: [
          {
            mode: 'turtle', minSegments: 8, minDirections: 4,
            message: 'Expected two squares — call draw_square() twice, with move_along() between them.'
          }
        ]
      },
      extra: {
        label: 'Extra Challenge',
        brief:
          'Let the function take a <b>size</b>: write <code>def draw_square(size):</code>, use <code>turtle.forward(size)</code> inside, then call <code>draw_square(30)</code> and <code>draw_square(80)</code> for shapes of different sizes.'
      },
      quickCheck:
        'Put a <code>#</code> in front of <b>one</b> of your function calls. Say which shape will vanish, then run it and check you were right.'
    }
  ]
};
