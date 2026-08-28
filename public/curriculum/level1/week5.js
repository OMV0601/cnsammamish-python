// WEEK 5 — Turtle Shape Maker
// Repeating code with for loops
export default {
  day: 5,
  title: 'Turtle Shape Maker',
  subtitle: 'Repeating code with for loops',
  emoji: '🐢',
  color: '#1f9d5a',
  badge: '🔁',
  badgeName: 'Loop Master',
  bigIdea: 'A for loop says "do this a set number of times". Four sides, four turns — one loop, and the turtle draws a square.',
  byTheEnd: 'Use a for loop to repeat turtle moves and draw shapes.',
  nextWeek: 'Next week, the loop will change a little every time to make a pattern.',
  tasks: [
    /* ------------------------------------------------------------- 5.1 */
    {
      key: 'w5-1',
      type: 'lesson',
      title: 'The turtle and the loop',
      xp: 10,
      minutes: 12,
      blocks: [
        { t: 'p', html: 'Meet the <b>turtle</b>. It carries a pen. When it walks, it draws. Run this.' },
        {
          t: 'code',
          run: true,
          code: 'import turtle\n\nturtle.forward(100)\nturtle.right(90)\nturtle.forward(100)'
        },
        { t: 'p', html: 'A drawing box appeared under the output. <code>forward(100)</code> walks 100 steps. <code>right(90)</code> turns 90 degrees to the right — a quarter turn, a perfect corner.' },

        { t: 'h', text: 'The long way to draw a square' },
        { t: 'p', html: 'A square is four sides and four corners. Written out fully, that is eight lines of almost identical code.' },
        {
          t: 'code',
          run: true,
          code: 'import turtle\n\nturtle.forward(100)\nturtle.right(90)\nturtle.forward(100)\nturtle.right(90)\nturtle.forward(100)\nturtle.right(90)\nturtle.forward(100)\nturtle.right(90)'
        },
        { t: 'p', html: 'It works — but copying the same two lines four times is exactly the sort of boring, error-prone job a computer should be doing for you.' },

        { t: 'h', text: 'The for loop' },
        { t: 'p', html: 'This does the same thing in three lines:' },
        {
          t: 'code',
          run: true,
          code: 'import turtle\n\nfor _ in range(4):\n    turtle.forward(100)\n    turtle.right(90)'
        },
        { t: 'p', html: 'Read it as: <b>"four times, do the indented lines"</b>.' },
        { t: 'list', items: [
          '<code>for</code> starts the loop.',
          '<code>range(4)</code> is how many times.',
          'The <code>_</code> is a name for the count. We are not using it, and an underscore is the polite way of saying "I do not care about this value".',
          'A <b>colon</b> at the end, then the repeated lines <b>indented by 4 spaces</b>.'
        ] },

        { t: 'h', text: 'Indentation decides what repeats' },
        { t: 'p', html: 'Only the indented lines repeat. This is the single most important idea this week. Compare these two:' },
        {
          t: 'code',
          run: true,
          code: '# Both lines inside the loop - a square\nimport turtle\n\nfor _ in range(4):\n    turtle.forward(80)\n    turtle.right(90)'
        },
        {
          t: 'code',
          run: true,
          code: '# The turn is OUTSIDE the loop - not a square!\nimport turtle\n\nfor _ in range(4):\n    turtle.forward(80)\nturtle.right(90)'
        },
        { t: 'warn', html: 'In the second one the turtle walked forward four times in a straight line, then turned once at the end. Same words, different indentation, completely different drawing.' },

        { t: 'h', text: 'Changing the number of sides' },
        { t: 'p', html: 'A triangle is three sides. But the turn is not 90 — to get all the way round, the turns must add up to 360.' },
        { t: 'code', code: 'print(360 / 4)\nprint(360 / 3)\nprint(360 / 5)', run: true, output: '90.0\n120.0\n72.0' },
        {
          t: 'code',
          run: true,
          code: 'import turtle\n\nfor _ in range(3):\n    turtle.forward(100)\n    turtle.right(120)'
        },

        { t: 'h', text: 'Colour and thickness' },
        { t: 'p', html: 'Set these before you draw. <code>pencolor</code> picks the colour, <code>pensize</code> the thickness, <code>penup</code> and <code>pendown</code> lift and drop the pen so you can move without drawing.' },
        {
          t: 'code',
          run: true,
          code: 'import turtle\n\nturtle.pencolor("red")\nturtle.pensize(4)\nfor _ in range(4):\n    turtle.forward(70)\n    turtle.right(90)\n\nturtle.penup()\nturtle.forward(120)\nturtle.pendown()\n\nturtle.pencolor("blue")\nfor _ in range(3):\n    turtle.forward(70)\n    turtle.right(120)'
        },
        { t: 'tip', html: 'That penup / forward / pendown sandwich is how you move the turtle somewhere new without leaving a line behind.' }
      ]
    },

    /* ------------------------------------------------------------- 5.2 */
    {
      key: 'w5-2',
      type: 'blanks',
      title: 'Loop pieces',
      xp: 20,
      minutes: 10,
      intro: 'Complete each loop. Indentation counts!',
      items: [
        {
          prompt: 'Repeat something four times.',
          code: 'for _ in [[1]](4):\n    turtle.forward(50)',
          blanks: [{ id: 1, accept: ['range'], hint: 'The word that means "this many times".' }]
        },
        {
          prompt: 'The for line is missing its ending.',
          code: 'for _ in range(4)[[1]]\n    turtle.forward(50)',
          blanks: [{ id: 1, accept: [':'], hint: 'Same symbol that ends an if line.' }]
        },
        {
          prompt: 'Make the turn repeat too — type 4 spaces.',
          code: 'for _ in range(4):\n    turtle.forward(50)\n[[1]]turtle.right(90)',
          blanks: [{ id: 1, accept: ['    '], hint: 'Four spaces puts the line inside the loop.' }]
        },
        {
          prompt: 'Turn a right angle for a square.',
          code: 'for _ in range(4):\n    turtle.forward(50)\n    turtle.right([[1]])',
          blanks: [{ id: 1, accept: ['90'], hint: '360 divided by 4.' }]
        },
        {
          prompt: 'Draw a triangle — three sides.',
          code: 'for _ in range([[1]]):\n    turtle.forward(50)\n    turtle.right(120)',
          blanks: [{ id: 1, accept: ['3'], hint: 'How many sides does a triangle have?' }]
        },
        {
          prompt: 'Make the pen green before drawing.',
          code: 'turtle.[[1]]("green")',
          blanks: [{ id: 1, accept: ['pencolor', 'color'], hint: 'Sets the pen colour. American spelling — no "u".' }]
        }
      ]
    },

    /* ------------------------------------------------------------- 5.3 */
    {
      key: 'w5-3',
      type: 'quiz',
      title: 'Loop quiz',
      xp: 20,
      minutes: 8,
      questions: [
        {
          q: 'What does <code>range(4)</code> control?',
          options: [
            'How far the turtle walks',
            'How many times the loop repeats',
            'The angle of the turn',
            'The colour of the pen'
          ],
          answer: 1,
          why: 'range is the count — how many times round the loop.'
        },
        {
          q: 'Which lines repeat inside a for loop?',
          options: [
            'Every line below it',
            'Only the lines indented under it',
            'Only the first line',
            'All lines in the file'
          ],
          answer: 1,
          why: 'Indentation marks the block that repeats.'
        },
        {
          q: 'What shape does this draw?<pre>for _ in range(3):\n    turtle.forward(100)\n    turtle.right(120)</pre>',
          options: ['A square', 'A triangle', 'A straight line', 'A circle'],
          answer: 1,
          why: 'Three sides with 120 degree turns makes a triangle.'
        },
        {
          q: 'What happens if <code>turtle.right(90)</code> is NOT indented into the loop?',
          options: [
            'Nothing changes',
            'The turtle goes forward 4 times in a line, then turns once',
            'Python shows an error',
            'It draws two squares'
          ],
          answer: 1,
          why: 'Outside the loop it runs once, after all the repeats have finished.'
        },
        {
          q: 'For a five-sided shape, what should the turn be?',
          options: ['90', '120', '72', '45'],
          answer: 2,
          why: '360 divided by 5 is 72.'
        }
      ]
    },

    /* ------------------------------------------------------------- 5.4 */
    {
      key: 'w5-4',
      type: 'debug',
      title: 'Bug hunt: the square that is not a square',
      xp: 25,
      minutes: 12,
      brief:
        'This should draw a square, but the drawing comes out wrong. There is <b>no error message</b> — look at the shape, then look at the spacing.',
      starter:
        '# Draw a square - BROKEN\nimport turtle\n\nturtle.pencolor("blue")\n\nfor _ in range(4):\n    turtle.forward(80)\nturtle.right(90)\n',
      hints: [
        'Which commands need to happen every time round the loop?',
        'Both the walking and the turning have to repeat. Is the turn inside the loop?',
        'Give turtle.right(90) the same 4 spaces at the start as turtle.forward(80).'
      ],
      requires: [
        { text: 'range(4)', message: 'Keep the loop running four times.' }
      ],
      checks: [
        {
          mode: 'turtle', minSegments: 4, minDirections: 4, closed: true,
          message: 'That is not a square yet — the turtle is walking in a straight line. Does the turn repeat inside the loop?'
        }
      ],
      understand:
        'Explain what <code>range(4)</code> controls. Then change the loop so it draws a <b>triangle</b> instead, without help.'
    },

    /* ------------------------------------------------------------- 5.5 */
    {
      key: 'w5-5',
      type: 'mission',
      title: 'Turtle Shape Maker',
      xp: 45,
      minutes: 35,
      main: {
        brief:
          'Draw a <b>square</b> and a <b>triangle</b> using two separate loops. Give them <b>two different colours</b> and move the turtle between them so both shapes are clearly visible.',
        checklist: [
          'A loop that draws a square (4 sides, 90 degree turns)',
          'A loop that draws a triangle (3 sides, 120 degree turns)',
          'Two different pen colours',
          'penup / pendown used to move between the shapes',
          'Both shapes visible and not drawn on top of each other'
        ],
        starter:
          '# Turtle Shape Maker\nimport turtle\n\nturtle.pensize(3)\n\n# --- Shape 1: a square ---\nturtle.pencolor("red")\n\n\n# --- Move somewhere new (no drawing) ---\nturtle.penup()\nturtle.forward(150)\nturtle.pendown()\n\n# --- Shape 2: a triangle ---\nturtle.pencolor("blue")\n\n',
        hints: [
          'The square loop: for _ in range(4): then forward and right(90), both indented.',
          'The triangle loop: for _ in range(3): then forward and right(120), both indented.',
          'Keep the penup / forward / pendown lines between the two shapes so they do not overlap.'
        ],
        requires: [
          { text: 'range(4)', message: 'The square needs a loop that runs 4 times.' },
          { text: 'range(3)', message: 'The triangle needs a loop that runs 3 times.' }
        ],
        checks: [
          {
            mode: 'turtle', minSegments: 7, minColours: 2, minDirections: 4,
            message: 'Expected a square and a triangle (7 sides in total) in two different colours.'
          }
        ]
      },
      simpler: {
        label: 'Simpler Version',
        brief: 'Draw <b>one square</b>. The turtle setup is done — you write the loop.',
        starter:
          '# One square\nimport turtle\n\nturtle.pencolor("green")\nturtle.pensize(3)\n\n# Your loop goes here - 4 sides, turning 90 each time\n',
        hints: [
          'Start with: for _ in range(4):',
          'Then two indented lines: turtle.forward(100) and turtle.right(90).',
          'Both lines need the same 4 spaces at the start.'
        ],
        requires: [{ text: 'for', message: 'Use a for loop rather than writing the lines out four times.' }],
        checks: [
          {
            mode: 'turtle', minSegments: 4, minDirections: 3, closed: true,
            message: 'A square needs four sides that turn — check both lines are inside the loop.'
          }
        ]
      },
      extra: {
        label: 'Extra Challenge',
        brief:
          'Draw a <b>pentagon</b> (5 sides) using this rule to work out the turn: <code>angle = 360 / sides</code>.'
      },
      quickCheck:
        'Change <code>range(4)</code> to <code>range(3)</code> <b>without</b> changing the turn angle. Say what you think will happen, then run it and see.'
    }
  ]
};
