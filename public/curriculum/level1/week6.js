// WEEK 6 — Turtle Spiral Studio
// Using a loop to change a drawing
export default {
  day: 6,
  title: 'Turtle Spiral Studio',
  subtitle: 'Using a loop to change a drawing',
  emoji: '🌀',
  color: '#0d9be0',
  badge: '🎨',
  badgeName: 'Spiral Artist',
  bigIdea: 'A loop does not have to do exactly the same thing every time. Change one value a little on each pass and a plain shape becomes a pattern.',
  byTheEnd: 'Use a for loop again, and change the distance a little each time round.',
  nextWeek: 'Next week, a while loop will keep going until the player solves a challenge.',
  tasks: [
    /* ------------------------------------------------------------- 6.1 */
    {
      key: 'w6-1',
      type: 'lesson',
      title: 'Loops that change',
      xp: 10,
      minutes: 12,
      blocks: [
        { t: 'p', html: 'Last week every side was the same length. Watch what happens when the length grows a little each time.' },
        {
          t: 'code',
          run: true,
          code: 'import turtle\n\nturtle.pencolor("purple")\nlength = 5\n\nfor _ in range(40):\n    turtle.forward(length)\n    turtle.right(91)\n    length = length + 3'
        },
        { t: 'p', html: 'A spiral. The only new idea is that <b>last line inside the loop</b>.' },

        { t: 'h', text: 'Changing a variable using itself' },
        { t: 'p', html: 'This line looks strange the first time you see it:' },
        { t: 'code', code: 'length = 5\nlength = length + 3\nprint(length)', run: true, output: '8' },
        { t: 'p', html: 'Remember <code>=</code> means <b>put into</b>, not "equals". So read it right-to-left: <i>work out <code>length + 3</code>, then put the answer back into <code>length</code></i>. The box does not equal itself plus three — it is being <b>replaced</b>.' },
        { t: 'code', code: 'length = 5\nprint(length)\nlength = length + 3\nprint(length)\nlength = length + 3\nprint(length)', run: true, output: '5\n8\n11' },
        { t: 'tip', html: 'Every time that line runs, the number gets bigger by 3. Put it inside a loop and it keeps growing.' },

        { t: 'h', text: 'Watching it grow inside a loop' },
        { t: 'p', html: 'Before drawing anything, just print the values so you can see the pattern.' },
        { t: 'code', code: 'length = 5\n\nfor _ in range(6):\n    print(length)\n    length = length + 3', run: true, output: '5\n8\n11\n14\n17\n20' },

        { t: 'h', text: 'Where the growing line goes matters' },
        { t: 'p', html: 'Put the growth line <b>outside</b> the loop and every side comes out the same — you get a polygon, not a spiral.' },
        {
          t: 'code',
          run: true,
          code: '# WRONG - the growth is outside the loop\nimport turtle\n\nlength = 5\nfor _ in range(30):\n    turtle.forward(length)\n    turtle.right(91)\nlength = length + 3'
        },
        { t: 'warn', html: 'That drew the same short line 30 times, going round and round in a small shape. The growth line ran once, at the very end, when it was too late to matter.' },

        { t: 'h', text: 'The turn angle changes everything' },
        { t: 'p', html: 'Try 90, then 91, then 120, then 144. A turn that divides neatly into 360 makes a closed shape; one that <i>almost</i> divides makes it drift into a spiral.' },
        {
          t: 'code',
          run: true,
          code: 'import turtle\n\nturtle.pencolor("green")\nlength = 5\n\nfor _ in range(50):\n    turtle.forward(length)\n    turtle.right(144)\n    length = length + 2'
        },

        { t: 'h', text: 'Making it yours' },
        { t: 'p', html: 'Set the background with <code>Screen().bgcolor()</code>, and remember <code>pensize</code>.' },
        {
          t: 'code',
          run: true,
          code: 'import turtle\n\nscreen = turtle.Screen()\nscreen.bgcolor("black")\n\nturtle.pencolor("cyan")\nturtle.pensize(2)\n\nlength = 4\nfor _ in range(60):\n    turtle.forward(length)\n    turtle.right(89)\n    length = length + 2'
        }
      ]
    },

    /* ------------------------------------------------------------- 6.2 */
    {
      key: 'w6-2',
      type: 'blanks',
      title: 'Growing numbers',
      xp: 20,
      minutes: 10,
      intro: 'Complete each line. Think about what the value will be after the line runs.',
      items: [
        {
          prompt: 'Make <code>length</code> three bigger.',
          code: 'length = length [[1]] 3',
          blanks: [{ id: 1, accept: ['+'], hint: 'The add symbol.' }]
        },
        {
          prompt: 'Start the length at 5 before the loop.',
          code: 'length = [[1]]\nfor _ in range(20):\n    turtle.forward(length)',
          blanks: [{ id: 1, accept: ['5'], hint: 'Just the starting number.' }]
        },
        {
          prompt: 'Put the growth INSIDE the loop — type 4 spaces.',
          code: 'for _ in range(20):\n    turtle.forward(length)\n    turtle.right(91)\n[[1]]length = length + 3',
          blanks: [{ id: 1, accept: ['    '], hint: 'Four spaces, so it repeats with the rest.' }]
        },
        {
          prompt: 'Repeat 30 times.',
          code: 'for _ in range([[1]]):\n    turtle.forward(length)',
          blanks: [{ id: 1, accept: ['30'], hint: 'The number of steps in the spiral.' }]
        },
        {
          prompt: 'Make the background black.',
          code: 'screen = turtle.Screen()\nscreen.[[1]]("black")',
          blanks: [{ id: 1, accept: ['bgcolor'], hint: 'Short for background colour.' }]
        },
        {
          prompt: 'What does <code>length</code> hold after these lines? Type the number.',
          code: 'length = 10\nlength = length + 5\n# length is now [[1]]',
          blanks: [{ id: 1, accept: ['15'], hint: 'Work out 10 + 5, then put it back in the box.' }]
        }
      ]
    },

    /* ------------------------------------------------------------- 6.3 */
    {
      key: 'w6-3',
      type: 'quiz',
      title: 'Spiral quiz',
      xp: 20,
      minutes: 8,
      questions: [
        {
          q: 'What does <code>length = length + 3</code> do?',
          options: [
            'Nothing — a box cannot equal itself plus 3',
            'Works out length + 3 and puts the answer back into length',
            'Creates a new box called length + 3',
            'Causes an error'
          ],
          answer: 1,
          why: 'Right-to-left: work out the sum, then replace what is in the box.'
        },
        {
          q: 'What do these print?<pre>length = 4\nfor _ in range(3):\n    print(length)\n    length = length + 2</pre>',
          options: ['4 4 4', '4 6 8', '6 8 10', '2 4 6'],
          answer: 1,
          why: 'It prints first, then grows: 4, then 6, then 8.'
        },
        {
          q: 'The growth line is left OUTSIDE the loop. What happens?',
          options: [
            'A bigger spiral',
            'Every line is the same length, so no spiral',
            'An error message',
            'The loop runs forever'
          ],
          answer: 1,
          why: 'It runs once, after the loop, so it never affects the drawing.'
        },
        {
          q: 'Why does turning 91 degrees make a spiral but 90 does not?',
          options: [
            '91 is a bigger number',
            '90 divides exactly into 360, so it closes; 91 drifts slightly each time',
            'Turtle cannot do 90',
            'It is random'
          ],
          answer: 1,
          why: 'The small extra degree makes each lap land slightly off, so it spirals.'
        },
        {
          q: 'Which line makes each stroke longer than the one before?',
          options: [
            'turtle.forward(length)',
            'turtle.right(91)',
            'length = length + 3',
            'range(40)'
          ],
          answer: 2,
          why: 'That is the line that changes the value between passes.'
        }
      ]
    },

    /* ------------------------------------------------------------- 6.4 */
    {
      key: 'w6-4',
      type: 'debug',
      title: 'Bug hunt: the spiral that will not grow',
      xp: 25,
      minutes: 12,
      brief:
        'This should draw a spiral, but every line comes out the <b>same length</b>. No error appears — look at where each line sits.',
      starter:
        '# Spiral - BROKEN\nimport turtle\n\nturtle.pencolor("purple")\nlength = 5\n\nfor _ in range(30):\n    turtle.forward(length)\n    turtle.right(91)\nlength = length + 3\n',
      hints: [
        'Which value is supposed to change every time round the loop?',
        'Is the line that changes it actually inside the repeated block?',
        'Indent length = length + 3 by 4 spaces so it sits inside the loop.'
      ],
      requires: [
        { text: 'length', message: 'Keep using the length variable.' }
      ],
      checks: [
        {
          mode: 'turtle', minSegments: 25, minLengths: 10,
          message: 'Every stroke is still the same length — the growth line is not running inside the loop yet.'
        }
      ],
      understand:
        'Say how a growing length changes the drawing. Then change one rule — the turn angle or how fast it grows — and describe what you expect before you run it.'
    },

    /* ------------------------------------------------------------- 6.5 */
    {
      key: 'w6-5',
      type: 'mission',
      title: 'Turtle Spiral Studio',
      xp: 45,
      minutes: 35,
      main: {
        brief:
          'Make <b>one spiral</b> with at least <b>20 steps</b>, a length that <b>grows</b> each time, and a turn angle you choose. Then personalise it: background, pen colour, pen thickness.',
        checklist: [
          'A starting length before the loop',
          'A loop that runs at least 20 times',
          'forward and a turn inside the loop',
          'A line inside the loop that makes the length grow',
          'Your own choice of turn angle, colours and pen size'
        ],
        starter:
          '# Turtle Spiral Studio\nimport turtle\n\nscreen = turtle.Screen()\nscreen.bgcolor("black")\n\nturtle.pencolor("cyan")\nturtle.pensize(2)\n\nlength = 5\n\n# Your loop goes here.\n# Inside it: go forward, turn, then make length bigger.\n',
        hints: [
          'Start the loop with: for _ in range(40):',
          'Three indented lines: turtle.forward(length), turtle.right(91), length = length + 3',
          'All three need the same 4 spaces. Try turn angles of 90, 91, 120 and 144 to see the difference.'
        ],
        requires: [
          { text: 'for', message: 'You need a for loop.' },
          { text: 'length', message: 'Use the length variable so the spiral can grow.' }
        ],
        checks: [
          {
            mode: 'turtle', minSegments: 20, minLengths: 8,
            message: 'Expected at least 20 strokes with lengths that grow — check the growth line is inside the loop.'
          }
        ]
      },
      simpler: {
        label: 'Simpler Version',
        brief:
          'The loop is written for you. Change only <b>how fast the length grows</b> and the <b>pen colour</b>, and watch what each change does.',
        starter:
          '# Spiral - simpler\nimport turtle\n\n# Change this colour to whatever you like\nturtle.pencolor("purple")\n\nlength = 5\n\n# 8 steps is barely a spiral - make this number much bigger.\nfor _ in range(8):\n    turtle.forward(length)\n    turtle.right(91)\n    length = length + 3   # try changing the 3\n',
        hints: [
          'The loop only runs 8 times. Change range(8) to something much bigger, like range(40).',
          'Change "purple" to another colour, such as "orange" or "green".',
          'Change the 3 at the end for a wider spiral. Run after every single change.'
        ],
        checks: [
          {
            mode: 'turtle', minSegments: 20, minLengths: 8,
            message: 'The spiral is not drawing yet — check nothing got deleted by accident.'
          }
        ]
      },
      extra: {
        label: 'Extra Challenge',
        brief:
          'Make a <b>second</b> thing change as well — for example grow the pen size slowly with <code>turtle.pensize(size)</code> and <code>size = size + 1</code>. Keep it under about 10 or it turns into a blob.'
      },
      quickCheck:
        'Before you run it, say the <b>first four</b> lengths out loud. Then add a temporary <code>print(length)</code> inside the loop to check you were right.'
    }
  ]
};
