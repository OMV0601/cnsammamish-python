// WEEK 2 — Player Power Card
// Words, whole numbers and simple math
export default {
  day: 2,
  title: 'Player Power Card',
  subtitle: 'Words, whole numbers and simple math',
  emoji: '🃏',
  color: '#0d9be0',
  badge: '⚡',
  badgeName: 'Power Counter',
  bigIdea: 'Python treats words and numbers as different things. Once you can turn a typed answer into a real number, the computer can do maths with it.',
  byTheEnd: 'Tell the difference between words and whole numbers, then use a typed number in simple maths.',
  nextWeek: 'Next week, your program will make its first decision.',
  tasks: [
    /* ------------------------------------------------------------- 2.1 */
    {
      key: 'w2-1',
      type: 'lesson',
      title: 'Words are not numbers',
      xp: 10,
      minutes: 12,
      blocks: [
        { t: 'p', html: 'Today you build a <b>player power card</b>: a name, a chosen power, a level, and power points the computer works out for you. Here it is finished.' },
        {
          t: 'code',
          run: true,
          code: 'name = input("Player name? ")\nlevel = int(input("Level (a number)? "))\npower_points = level * 10\n\nprint("=================")\nprint(f"  {name}")\nprint(f"  Level: {level}")\nprint(f"  Power points: {power_points}")\nprint("=================")'
        },

        { t: 'h', text: 'Two kinds of value' },
        { t: 'p', html: 'A <b>string</b> is words — it always has quote marks. An <b>integer</b> (whole number) has no quote marks. They look similar and behave completely differently.' },
        { t: 'code', code: 'print(5 + 3)\nprint("5" + "3")', run: true, output: '8\n53' },
        { t: 'p', html: 'Look at that carefully. With numbers, <code>+</code> <b>adds</b>. With words, <code>+</code> <b>glues</b>. Same symbol, different job — Python decides based on what it is given.' },

        { t: 'h', text: 'input always hands back words' },
        { t: 'p', html: 'This is the part that trips everyone up. Even if the person types <code>7</code>, <code>input</code> gives you back the <b>word</b> "7", not the number 7.' },
        { t: 'code', code: 'age = input("How old are you? ")\nprint(age + age)', run: true, stdin: ['7'] },
        { t: 'p', html: 'You wanted 14 and got 77 — because Python glued two words together.' },

        { t: 'h', text: 'int() turns words into numbers' },
        { t: 'p', html: '<code>int</code> takes something that looks like a whole number and makes it a real number.' },
        { t: 'code', code: 'age = int(input("How old are you? "))\nprint(age + age)', run: true, stdin: ['7'], output: 'How old are you? 7\n14' },
        { t: 'tip', html: 'Read <code>int(input("..."))</code> from the inside out: <b>ask</b> the question, then <b>turn the answer into a number</b>. Two sets of brackets, both closed at the end.' },

        { t: 'h', text: 'Doing maths' },
        { t: 'p', html: 'Python uses <code>+</code> add, <code>-</code> take away, <code>*</code> times, <code>/</code> divide.' },
        { t: 'code', code: 'level = 5\nprint(level * 10)\nprint(level + 2)\nprint(level - 1)', run: true, output: '50\n7\n4' },
        { t: 'p', html: 'Store the answer in a new box so you can use it later:' },
        { t: 'code', code: 'level = 5\npower_points = level * 10\nprint(f"Power points: {power_points}")', run: true, output: 'Power points: 50' },

        { t: 'h', text: 'The error you will meet today' },
        { t: 'p', html: 'Joining words and numbers with <code>+</code> breaks. Run this and read the red message.' },
        { t: 'code', code: 'points = 50\nprint("Power: " + points)', run: true },
        { t: 'p', html: 'That is a <b>TypeError</b>. The fix is an f-string, which happily takes both:' },
        { t: 'code', code: 'points = 50\nprint(f"Power: {points}")', run: true, output: 'Power: 50' }
      ]
    },

    /* ------------------------------------------------------------- 2.2 */
    {
      key: 'w2-2',
      type: 'blanks',
      title: 'Numbers and words',
      xp: 20,
      minutes: 10,
      intro: 'Fill each gap so the program does what the label says.',
      items: [
        {
          prompt: 'Turn the typed answer into a whole number.',
          code: 'level = [[1]](input("Level? "))',
          blanks: [{ id: 1, accept: ['int'], hint: 'Three letters, short for integer.' }]
        },
        {
          prompt: 'Work out power points: level times ten.',
          code: 'level = 5\npower_points = level [[1]] 10',
          blanks: [{ id: 1, accept: ['*'], hint: 'The times symbol — the star above the 8.' }]
        },
        {
          prompt: 'Show the score without a TypeError.',
          code: 'score = 40\nprint([[1]]"Score: {score}")',
          blanks: [{ id: 1, accept: ['f'], hint: 'One letter makes the curly brackets work.' }]
        },
        {
          prompt: 'Give the player 5 coins for every level.',
          code: 'level = 3\ncoins = level * [[1]]',
          blanks: [{ id: 1, accept: ['5'], hint: 'Just the number of coins per level.' }]
        },
        {
          prompt: 'This should print <code>14</code>, not <code>77</code>.',
          code: 'age = [[1]](input("Age? "))\nprint(age + age)',
          blanks: [{ id: 1, accept: ['int'], hint: 'Without it, input hands back words.' }]
        }
      ]
    },

    /* ------------------------------------------------------------- 2.3 */
    {
      key: 'w2-3',
      type: 'quiz',
      title: 'Words or numbers?',
      xp: 20,
      minutes: 8,
      questions: [
        {
          q: 'What does <code>print("5" + "3")</code> show?',
          options: ['8', '53', '"53"', 'An error'],
          answer: 1,
          why: 'Both are words, so + glues them into 53.'
        },
        {
          q: 'What does <code>input()</code> always give back?',
          options: ['A whole number', 'Words (a string)', 'True or False', 'Nothing'],
          answer: 1,
          why: 'input always hands back words, even when the person typed digits.'
        },
        {
          q: 'Why does <code>int()</code> exist?',
          options: [
            'To turn something that looks like a number into a real number',
            'To print numbers neatly',
            'To make numbers bigger',
            'To ask a question'
          ],
          answer: 0,
          why: 'int() converts, so maths works on the value.'
        },
        {
          q: 'Which line causes a TypeError?',
          options: [
            'print(f"Power: {points}")',
            'print("Power:", points)',
            'print("Power: " + points)',
            'print(points)'
          ],
          answer: 2,
          why: 'You cannot join words and a number with +. Use an f-string or a comma.'
        },
        {
          q: '<code>level = 4</code>. What is <code>level * 10</code>?',
          options: ['410', '40', '14', 'An error'],
          answer: 1,
          why: 'level is a real number, so * multiplies: 4 times 10 is 40.'
        }
      ]
    },

    /* ------------------------------------------------------------- 2.4 */
    {
      key: 'w2-4',
      type: 'debug',
      title: 'Bug hunt: words plus a number',
      xp: 25,
      minutes: 12,
      brief:
        'This power card crashes with a <b>TypeError</b>. Run it, read the red message, then fix the one line that is wrong.',
      starter:
        '# Player power card - BROKEN\nname = input("Player name? ")\nlevel = int(input("Level? "))\n\npower_points = level * 10\n\nprint(f"Player: {name}")\nprint("Power: " + power_points)\n',
      stdin: ['Ada', '5'],
      hints: [
        'Which of the two values on that line is a number, and which is words?',
        'Text and a number cannot be joined together with a + sign.',
        'Show the value with an f-string instead: print(f"Power: {power_points}")'
      ],
      requires: [
        { text: 'power_points', message: 'Keep using the power_points box.' }
      ],
      checks: [
        { mode: 'contains', expect: 'Power: 50', message: 'It should print "Power: 50" when the level is 5.' },
        { mode: 'contains', expect: 'Player: Ada', message: 'Keep the player name line working too.' }
      ],
      understand:
        'Point to one value that is words and one that is a whole number, then change the maths (try level * 20) without help.'
    },

    /* ------------------------------------------------------------- 2.5 */
    {
      key: 'w2-5',
      type: 'mission',
      title: 'Player Power Card',
      xp: 45,
      minutes: 35,
      main: {
        brief:
          'Ask for a <b>name</b>, a <b>favourite power</b> and a <b>level</b>. Work out power points (level × 10) and print a <b>four-line player card</b> with a border you design.',
        checklist: [
          'Three questions: name, favourite power, level',
          'The level turned into a real number with int()',
          'power_points worked out as level * 10',
          'A card with at least four lines of information',
          'A border line of symbols at the top and bottom'
        ],
        starter:
          '# Player Power Card\nname = input("Player name? ")\npower = input("Favourite power? ")\nlevel = int(input("Level? "))\n\n# Work out the power points\npower_points = \n\n# Print your card - design the border yourself!\nprint("===================")\n',
        stdin: ['Ada', 'invisibility', '5'],
        hints: [
          'power_points = level * 10',
          'Each line of the card is its own print, and the ones with boxes in need f".',
          'Try: print(f"  Power points: {power_points}")'
        ],
        requires: [
          { text: 'int(', message: 'The level needs int() so the maths works.' },
          { text: '*', message: 'Power points are worked out by multiplying.' }
        ],
        checks: [
          { mode: 'minlines', expect: 7, message: 'Expected three questions plus a card of at least four lines.' },
          { mode: 'contains', expect: 'Ada', message: 'The name is not on the card yet.' },
          { mode: 'contains', expect: 'invisibility', message: 'The favourite power is not on the card yet.' },
          { mode: 'contains', expect: '50', message: 'Power points should be 50 when the level is 5 (level * 10).' }
        ]
      },
      simpler: {
        label: 'Simpler Version',
        brief: 'Ask for just a <b>name</b> and a <b>level</b>. Show the name and the power score.',
        starter:
          '# Player card - simpler\nname = input("Player name? ")\nlevel = int(input("Level? "))\n\npower_points = \n\nprint(f"")\n',
        stdin: ['Ada', '5'],
        hints: [
          'power_points = level * 10',
          'One print line can show both: the name and the score.',
          'Try: print(f"{name} has {power_points} power points!")'
        ],
        requires: [{ text: 'int(', message: 'The level needs int() so the maths works.' }],
        checks: [
          { mode: 'contains', expect: 'Ada', message: 'The name is not appearing yet.' },
          { mode: 'contains', expect: '50', message: 'Power points should be 50 when the level is 5.' }
        ]
      },
      extra: {
        label: 'Extra Challenge',
        brief: 'Add <code>coins = level * 5</code> and show the coins on your card as well.'
      },
      quickCheck:
        'Run it with level <b>2</b>, then with level <b>5</b>. Before each run, say out loud what the power score will be.'
    }
  ]
};
