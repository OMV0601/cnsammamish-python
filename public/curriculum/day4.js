// DAY 4 — Doing It Again  (for loops, range, lists, while)
export default {
  day: 4,
  title: 'Doing It Again',
  subtitle: 'Loops and lists',
  emoji: '🔁',
  color: '#e0457b',
  badge: '🔁',
  badgeName: 'Loop Master',
  bigIdea: 'Computers are brilliant at boring, repeated jobs. A loop says "do this again" so you never have to copy and paste.',
  tasks: [
    /* ---------------------------------------------------------------- 4.1 */
    {
      key: 'd4-1',
      type: 'lesson',
      title: 'The for loop',
      xp: 10,
      minutes: 10,
      blocks: [
        { t: 'p', html: 'Imagine printing "Happy Birthday" 50 times. Fifty print lines? No. Use a <b>loop</b>.' },
        { t: 'code', code: 'for i in range(5):\n    print("Happy Birthday!")', run: true },
        { t: 'p', html: 'Five lines of output from one print. The <code>range(5)</code> tells Python how many times to go round.' },
        { t: 'h', text: 'The shape of a for loop' },
        { t: 'list', items: [
          'starts with <code>for</code>',
          'a name for the counter — <code>i</code> is traditional, but any name works',
          '<code>in range(...)</code> says how many times',
          'a <b>colon</b> at the end',
          'the repeated lines are <b>indented</b> underneath — just like with if'
        ] },
        { t: 'h', text: 'The counter is useful' },
        { t: 'p', html: 'That <code>i</code> is a real variable, and it changes every time round.' },
        { t: 'code', code: 'for i in range(5):\n    print(i)', run: true, output: '0\n1\n2\n3\n4' },
        { t: 'warn', html: 'Programmers count from <b>0</b>. <code>range(5)</code> gives 0, 1, 2, 3, 4 — that is five numbers, but it stops <i>before</i> 5.' },
        { t: 'h', text: 'Choosing where to start' },
        { t: 'code', code: 'for n in range(1, 6):\n    print(n)', run: true, output: '1\n2\n3\n4\n5' },
        { t: 'p', html: '<code>range(1, 6)</code> means "from 1, stop before 6". The first number is included, the last number is not.' },
        { t: 'code', code: 'for n in range(2, 21, 2):\n    print(n)', run: true, note: 'A third number is the step size — count in twos.' },
        { t: 'h', text: 'Loops and maths together' },
        { t: 'code', code: 'for n in range(1, 6):\n    print(n, "times 3 is", n * 3)', run: true },
        { t: 'tip', html: 'Everything indented under the <code>for</code> happens every time round. Anything back at the left margin happens only once, at the end.' }
      ]
    },

    /* ---------------------------------------------------------------- 4.2 */
    {
      key: 'd4-2',
      type: 'blanks',
      title: 'Loop building',
      xp: 20,
      minutes: 8,
      intro: 'Fill the gaps to make each loop work.',
      items: [
        {
          prompt: 'Print "Hi" three times.',
          code: '[[1]] i in range(3):\n    print("Hi")',
          blanks: [{ id: 1, accept: ['for'], hint: 'Three letters. It starts every counting loop.' }]
        },
        {
          prompt: 'Print the numbers 0 1 2 3 (four lines).',
          code: 'for i in range([[1]]):\n    print(i)',
          blanks: [{ id: 1, accept: ['4'], hint: 'range stops BEFORE the number you give it.' }]
        },
        {
          prompt: 'Print the numbers 1 to 10.',
          code: 'for n in range(1, [[1]]):\n    print(n)',
          blanks: [{ id: 1, accept: ['11'], hint: 'To finish on 10, stop before 11.' }]
        },
        {
          prompt: 'The punctuation at the end of the for line is missing.',
          code: 'for i in range(5)[[1]]\n    print("go")',
          blanks: [{ id: 1, accept: [':'], hint: 'Same mark that ends an if line.' }]
        },
        {
          prompt: 'Print each number multiplied by itself.',
          code: 'for n in range(1, 4):\n    print(n [[1]] n)',
          blanks: [{ id: 1, accept: ['*'], hint: 'The multiply symbol is a star.' }]
        }
      ]
    },

    /* ---------------------------------------------------------------- 4.3 */
    {
      key: 'd4-3',
      type: 'quiz',
      title: 'Loop quiz',
      xp: 20,
      minutes: 6,
      questions: [
        {
          q: 'How many times does this print?<br><code>for i in range(4):<br>&nbsp;&nbsp;&nbsp;&nbsp;print("go")</code>',
          options: ['3 times', '4 times', '5 times', 'Forever'],
          answer: 1,
          why: 'range(4) gives 0,1,2,3 — four turns.'
        },
        {
          q: 'What is the FIRST number printed by <code>for i in range(3): print(i)</code>?',
          options: ['0', '1', '3', 'i'],
          answer: 0,
          why: 'range starts at 0 unless you tell it otherwise.'
        },
        {
          q: 'What is the LAST number printed by <code>for n in range(1, 5): print(n)</code>?',
          options: ['3', '4', '5', '6'],
          answer: 1,
          why: 'range stops before the second number, so it ends on 4.'
        },
        {
          q: 'Which line runs only ONCE?<br><code>for i in range(3):<br>&nbsp;&nbsp;&nbsp;&nbsp;print("A")<br>print("B")</code>',
          options: ['The A line', 'The B line', 'Both once', 'Neither'],
          answer: 1,
          why: 'B is not indented, so it is outside the loop and runs once at the end.'
        },
        {
          q: 'You want a loop to run 10 times. Which is right?',
          options: ['range(9)', 'range(10)', 'range(11)', 'range(1, 10)'],
          answer: 1,
          why: 'range(10) gives 0 to 9 — ten numbers.'
        }
      ]
    },

    /* ---------------------------------------------------------------- 4.4 */
    {
      key: 'd4-4',
      type: 'code',
      title: 'Times table machine',
      xp: 30,
      minutes: 12,
      brief:
        'Print the 7 times table from 1 to 10, one line each, exactly like this:<pre>1 x 7 = 7\n2 x 7 = 14\n...\n10 x 7 = 70</pre>Use a loop — do not write ten prints!',
      starter: 'for n in range(1, 11):\n    # print one line of the table here\n',
      hints: [
        'range(1, 11) counts 1 up to 10.',
        'print(n, "x 7 =", n * 7) puts the pieces together with spaces.',
        'The print must be indented inside the loop.'
      ],
      requires: [
        { text: 'for', message: 'This one must use a for loop.' },
        { text: 'range', message: 'Use range to count from 1 to 10.' }
      ],
      checks: [
        { mode: 'contains', expect: '1 x 7 = 7', message: 'The first line should read: 1 x 7 = 7' },
        { mode: 'contains', expect: '10 x 7 = 70', message: 'The last line should read: 10 x 7 = 70' },
        { mode: 'minlines', expect: 10, message: 'A 1-to-10 table needs 10 lines.' }
      ]
    },

    /* ---------------------------------------------------------------- 4.5 */
    {
      key: 'd4-5',
      type: 'lesson',
      title: 'Lists: boxes that hold many things',
      xp: 10,
      minutes: 10,
      blocks: [
        { t: 'p', html: 'A normal variable holds one thing. A <b>list</b> holds many things, in order, inside square brackets.' },
        { t: 'code', code: 'pets = ["dog", "cat", "fish"]\nprint(pets)', run: true, output: "['dog', 'cat', 'fish']" },
        { t: 'h', text: 'Picking one item out' },
        { t: 'code', code: 'pets = ["dog", "cat", "fish"]\nprint(pets[0])\nprint(pets[2])', run: true, output: 'dog\nfish' },
        { t: 'warn', html: 'Counting starts at <b>0</b> again. The first item is <code>[0]</code>, the second is <code>[1]</code>, the third is <code>[2]</code>.' },
        { t: 'h', text: 'How many are there?' },
        { t: 'code', code: 'pets = ["dog", "cat", "fish"]\nprint(len(pets))', run: true, output: '3' },
        { t: 'p', html: '<code>len</code> is short for <i>length</i>.' },
        { t: 'h', text: 'Adding to a list' },
        { t: 'code', code: 'scores = []\nscores.append(10)\nscores.append(25)\nprint(scores)\nprint(len(scores))', run: true, output: '[10, 25]\n2' },
        { t: 'p', html: '<code>[]</code> is an empty list, and <code>.append(...)</code> sticks something on the end. Games use this constantly — an inventory, a high-score table, a list of enemies.' },
        { t: 'h', text: 'The best part: loop through a list' },
        { t: 'code', code: 'pets = ["dog", "cat", "fish"]\n\nfor pet in pets:\n    print("I like the " + pet)', run: true },
        { t: 'p', html: 'No <code>range</code> needed. Python walks through the list and puts each item into <code>pet</code>, one at a time.' },
        { t: 'tip', html: 'Read it as a sentence: <i>"for each pet in pets, print I like the pet."</i> Give the loop variable a singular name and it reads beautifully.' }
      ]
    },

    /* ---------------------------------------------------------------- 4.6 */
    {
      key: 'd4-6',
      type: 'blanks',
      title: 'Working with lists',
      xp: 20,
      minutes: 8,
      intro: 'Complete each list program.',
      items: [
        {
          prompt: 'Make a list of three colours.',
          code: 'colours = [[1]]"red", "green", "blue"[[2]]',
          blanks: [
            { id: 1, accept: ['['], hint: 'Lists use SQUARE brackets.' },
            { id: 2, accept: [']'], hint: 'Closing square bracket.' }
          ]
        },
        {
          prompt: 'Should print <code>red</code> — the first item.',
          code: 'colours = ["red", "green", "blue"]\nprint(colours[[[1]]])',
          blanks: [{ id: 1, accept: ['0'], hint: 'The first item lives at position zero.' }]
        },
        {
          prompt: 'Should print <code>3</code> — how many items there are.',
          code: 'colours = ["red", "green", "blue"]\nprint([[1]](colours))',
          blanks: [{ id: 1, accept: ['len'], hint: 'Three letters, short for length.' }]
        },
        {
          prompt: 'Add "purple" to the end of the list.',
          code: 'colours = ["red", "green"]\ncolours.[[1]]("purple")\nprint(colours)',
          blanks: [{ id: 1, accept: ['append'], hint: 'Six letters — it means "add to the end".' }]
        },
        {
          prompt: 'Print every colour on its own line.',
          code: 'colours = ["red", "green", "blue"]\nfor c [[1]] colours:\n    print(c)',
          blanks: [{ id: 1, accept: ['in'], hint: 'Two letters. "for each c IN colours".' }]
        }
      ]
    },

    /* ---------------------------------------------------------------- 4.7 */
    {
      key: 'd4-7',
      type: 'lesson',
      title: 'The while loop',
      xp: 10,
      minutes: 8,
      blocks: [
        { t: 'p', html: 'A <code>for</code> loop repeats a known number of times. A <b>while</b> loop repeats <i>as long as something is True</i> — you do not have to know how many turns that will take.' },
        { t: 'code', code: 'count = 3\n\nwhile count > 0:\n    print(count)\n    count = count - 1\n\nprint("Lift off!")', run: true, output: '3\n2\n1\nLift off!' },
        { t: 'p', html: 'Each time round, Python re-checks <code>count > 0</code>. Once count reaches 0 the answer is False, the loop stops, and the program carries on below.' },
        { t: 'h', text: 'The dangerous mistake' },
        { t: 'p', html: 'Look at what happens if you forget the line that changes <code>count</code>:' },
        { t: 'code', code: '# DO NOT RUN THIS — it would never stop\n# count = 3\n# while count > 0:\n#     print(count)\nprint("This is called an infinite loop")', run: true },
        { t: 'warn', html: 'If nothing inside the loop ever makes the condition False, the loop runs <b>forever</b>. Every while loop needs something inside it that moves towards stopping.' },
        { t: 'tip', html: 'If your program ever seems frozen, an infinite loop is the usual suspect. Our Run button gives up after 10 seconds and tells you.' },
        { t: 'h', text: 'Which loop should I use?' },
        { t: 'list', items: [
          'Know how many times? Use <b>for</b>. (Print 10 lines, go through a list.)',
          'Keep going until something happens? Use <b>while</b>. (Until the player wins, until the answer is right.)'
        ] }
      ]
    },

    /* ---------------------------------------------------------------- 4.8 */
    {
      key: 'd4-8',
      type: 'project',
      title: 'Mini project: Rocket launch',
      xp: 50,
      minutes: 22,
      brief:
        'Build a rocket launch sequence.<br>1. Print a countdown from <b>10</b> down to <b>1</b>, one number per line.<br>2. Then print <code>BLAST OFF!</code><br>3. Then make a list of at least 3 crew members and print a greeting for each one using a loop.',
      checklist: [
        'A countdown from 10 to 1 using a loop (not ten prints!)',
        'BLAST OFF! printed once, after the countdown',
        'A list of crew members in square brackets',
        'A loop that prints one line per crew member',
        'Bonus: print how many crew members there are using len()'
      ],
      starter:
        '# Rocket launch\n\n# Countdown 10 down to 1\ncount = 10\nwhile count > 0:\n    print(count)\n    # what needs to happen here so it stops?\n\nprint("BLAST OFF!")\n\n# Now the crew list and a for loop\n',
      hints: [
        'For the countdown you can use while with count = count - 1 inside, or for i in range(10, 0, -1).',
        'BLAST OFF! must NOT be indented — it happens once, after the loop.',
        'crew = ["Ana", "Ben", "Cleo"] then for member in crew: print("Welcome", member)'
      ],
      requires: [
        { text: '[', message: 'You need a list, which uses square brackets.' },
        { text: 'for', message: 'Use a for loop to greet each crew member.' }
      ],
      checks: [
        { mode: 'contains', expect: '10', message: 'The countdown should start at 10.' },
        { mode: 'contains', expect: 'BLAST OFF!', message: 'Print BLAST OFF! after the countdown.' },
        { mode: 'minlines', expect: 14, message: 'Expected at least 14 lines: 10 countdown + BLAST OFF! + 3 crew greetings.' }
      ]
    }
  ]
};
