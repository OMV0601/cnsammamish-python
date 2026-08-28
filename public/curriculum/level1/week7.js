// WEEK 7 — Number Guessing Game
// Repeating until the player gets the answer
export default {
  day: 7,
  title: 'Number Guessing Game',
  subtitle: 'Repeating until the player gets the answer',
  emoji: '🔢',
  color: '#e0457b',
  badge: '🎯',
  badgeName: 'Guess Master',
  bigIdea: 'A for loop repeats a set number of times. A while loop repeats until something changes — which means you have to make sure that something actually can change.',
  byTheEnd: 'Understand that a while loop keeps going until its yes-or-no check becomes False.',
  nextWeek: 'Next week, one variable will hold several backpack items at once.',
  tasks: [
    /* ------------------------------------------------------------- 7.1 */
    {
      key: 'w7-1',
      type: 'lesson',
      title: 'Repeating until it is right',
      xp: 10,
      minutes: 12,
      blocks: [
        { t: 'p', html: 'Here is the finished game. The test answers are typed in for you: 5, then 8, then 7.' },
        {
          t: 'code',
          run: true,
          stdin: ['5', '8', '7'],
          code: 'secret_number = 7\nguess = int(input("Guess a number from 1 to 10: "))\nattempts = 1\n\nwhile guess != secret_number:\n    if guess < secret_number:\n        print("Higher!")\n    else:\n        print("Lower!")\n    guess = int(input("Try again: "))\n    attempts = attempts + 1\n\nprint(f"Got it in {attempts} guesses!")'
        },

        { t: 'h', text: 'for versus while' },
        { t: 'p', html: 'A <code>for</code> loop knows how many times it will run before it starts. A <code>while</code> loop does not — it keeps going <b>as long as</b> its question is True.' },
        { t: 'code', code: 'count = 1\n\nwhile count < 5:\n    print(count)\n    count = count + 1\n\nprint("Finished")', run: true, output: '1\n2\n3\n4\nFinished' },
        { t: 'p', html: 'Read it as: <b>"while count is less than 5, keep doing the indented lines"</b>. The moment the question is False, Python jumps past the loop.' },

        { t: 'h', text: 'New comparisons' },
        { t: 'p', html: 'You already know <code>==</code>. Here are the rest:' },
        { t: 'list', items: [
          '<code>!=</code> — is <b>not</b> the same as',
          '<code>&lt;</code> — less than',
          '<code>&gt;</code> — greater than'
        ] },
        { t: 'code', code: 'print(3 != 5)\nprint(3 < 5)\nprint(3 > 5)\nprint(7 != 7)', run: true, output: 'True\nTrue\nFalse\nFalse' },

        { t: 'h', text: 'The three-part rule' },
        { t: 'p', html: 'Every while loop needs all three of these, or it goes wrong:' },
        { t: 'list', items: [
          '<b>1. Set up</b> the value <i>before</i> the loop.',
          '<b>2. Check</b> it on the while line.',
          '<b>3. Change</b> it <i>inside</i> the loop.'
        ] },
        { t: 'code', code: 'count = 1          # 1. set up\n\nwhile count < 4:   # 2. check\n    print(count)\n    count = count + 1   # 3. change\n\nprint("Done")', run: true, output: '1\n2\n3\nDone' },
        { t: 'warn', html: 'Miss out step 3 and the question stays True forever. The program never stops — that is called an <b>infinite loop</b>. This app cuts your program off after 10 seconds, so nothing breaks, but you will see a warning.' },

        { t: 'h', text: 'Counting the tries' },
        { t: 'p', html: 'A counter is just a box that grows by one each time round — exactly like the spiral length last week.' },
        { t: 'code', code: 'attempts = 1\nattempts = attempts + 1\nattempts = attempts + 1\nprint(attempts)', run: true, output: '3' },

        { t: 'h', text: 'Higher or lower' },
        { t: 'p', html: 'Put an <code>if</code> inside the loop to give the player a clue.' },
        {
          t: 'code',
          run: true,
          stdin: ['3', '9', '7'],
          code: 'secret_number = 7\nguess = int(input("Guess: "))\n\nwhile guess != secret_number:\n    if guess < secret_number:\n        print("Higher!")\n    else:\n        print("Lower!")\n    guess = int(input("Guess again: "))\n\nprint("Correct!")'
        },
        { t: 'tip', html: 'Notice the <code>if</code> lines are indented <b>8</b> spaces — 4 to be inside the while, and 4 more to be inside the if. Blocks inside blocks.' }
      ]
    },

    /* ------------------------------------------------------------- 7.2 */
    {
      key: 'w7-2',
      type: 'blanks',
      title: 'While pieces',
      xp: 20,
      minutes: 10,
      intro: 'Complete each loop. Remember the three-part rule.',
      items: [
        {
          prompt: 'Keep looping while the guess is wrong.',
          code: 'while guess [[1]] secret_number:\n    print("Try again")',
          blanks: [{ id: 1, accept: ['!='], hint: 'Means "is not the same as". An exclamation mark and an equals.' }]
        },
        {
          prompt: 'Keep going while count is less than 5.',
          code: 'while count [[1]] 5:\n    count = count + 1',
          blanks: [{ id: 1, accept: ['<'], hint: 'The less-than symbol.' }]
        },
        {
          prompt: 'Add one to the counter.',
          code: 'attempts = attempts [[1]] 1',
          blanks: [{ id: 1, accept: ['+'], hint: 'Counting up by one.' }]
        },
        {
          prompt: 'Ask for a new guess INSIDE the loop — type 4 spaces.',
          code: 'while guess != secret:\n    print("Nope")\n[[1]]guess = int(input("Again: "))',
          blanks: [{ id: 1, accept: ['    '], hint: 'Without these spaces the loop can never end.' }]
        },
        {
          prompt: 'Tell the player to guess bigger.',
          code: 'if guess [[1]] secret:\n    print("Higher!")',
          blanks: [{ id: 1, accept: ['<'], hint: 'Their guess is too small — less than the secret.' }]
        },
        {
          prompt: 'The while line is missing its ending.',
          code: 'while count < 10[[1]]\n    count = count + 1',
          blanks: [{ id: 1, accept: [':'], hint: 'Same symbol that ends an if or for line.' }]
        }
      ]
    },

    /* ------------------------------------------------------------- 7.3 */
    {
      key: 'w7-3',
      type: 'quiz',
      title: 'While quiz',
      xp: 20,
      minutes: 8,
      questions: [
        {
          q: 'When does a while loop stop?',
          options: [
            'After 10 times',
            'When its question becomes False',
            'When you press a key',
            'It never stops'
          ],
          answer: 1,
          why: 'Python checks the question before each pass; False means jump past the loop.'
        },
        {
          q: 'What causes an infinite loop?',
          options: [
            'Using while instead of for',
            'Nothing inside the loop ever changes the value being checked',
            'Counting up instead of down',
            'Forgetting to print'
          ],
          answer: 1,
          why: 'If the checked value never changes, the question stays True forever.'
        },
        {
          q: 'What does <code>!=</code> mean?',
          options: ['Is equal to', 'Is not equal to', 'Is less than', 'Is very big'],
          answer: 1,
          why: 'The exclamation mark means "not".'
        },
        {
          q: 'How many times does this print?<pre>n = 1\nwhile n < 4:\n    print("hi")\n    n = n + 1</pre>',
          options: ['3 times', '4 times', 'Once', 'Forever'],
          answer: 0,
          why: 'n is 1, 2, 3 — three passes. At 4 the question is False.'
        },
        {
          q: 'Which three things does every while loop need?',
          options: [
            'A print, an if and an else',
            'Set up before, check on the while line, change inside',
            'A counter, a colour and a colon',
            'Three guesses'
          ],
          answer: 1,
          why: 'Miss any one of those three and the loop misbehaves.'
        }
      ]
    },

    /* ------------------------------------------------------------- 7.4 */
    {
      key: 'w7-4',
      type: 'debug',
      title: 'Bug hunt: the loop that never ends',
      xp: 25,
      minutes: 14,
      brief:
        'This game repeats forever after a wrong guess. It will be stopped automatically after 10 seconds, so it is safe to run — but read the warning, then work out why it never ends.<br><br><b>Think first:</b> which value does the while line check, and does anything change it?',
      starter:
        '# Guessing game - BROKEN (never ends)\nsecret_number = 7\nguess = int(input("Guess a number from 1 to 10: "))\nattempts = 1\n\nwhile guess != secret_number:\n    print("Not right - try again!")\n    attempts = attempts + 1\nguess = int(input("Your guess: "))\n\nprint(f"Got it in {attempts} guesses!")\n',
      stdin: ['5', '7'],
      hints: [
        'What value does the while line check? Find it.',
        'Does anything INSIDE the loop change that value? Look at the indentation.',
        'The line asking for a new guess is outside the loop. Indent it by 4 spaces so it runs every time round.'
      ],
      requires: [
        { text: 'while', message: 'Keep the while loop.' }
      ],
      checks: [
        { mode: 'contains', expect: 'Got it in 2 guesses', message: 'After guessing 5 then 7, it should finish and report 2 guesses.' }
      ],
      understand:
        'Explain why the loop stops once the fix is in. Then say what would happen if you deleted the <code>attempts = attempts + 1</code> line.'
    },

    /* ------------------------------------------------------------- 7.5 */
    {
      key: 'w7-5',
      type: 'mission',
      title: 'Number Guessing Game',
      xp: 45,
      minutes: 35,
      main: {
        brief:
          'The computer picks a secret number from <b>1 to 10</b>. The player keeps guessing. After each wrong guess, tell them <b>higher</b> or <b>lower</b>. When they get it, show how many guesses they took.',
        checklist: [
          'A random secret number from 1 to 10',
          'A first guess before the loop',
          'A while loop that runs until the guess is right',
          'Higher / lower clues using an if inside the loop',
          'A new guess asked for inside the loop',
          'A counter that reports the number of guesses at the end'
        ],
        starter:
          '# Number Guessing Game\nimport random\n\nsecret_number = random.randint(1, 10)\nguess = int(input("Guess a number from 1 to 10: "))\nattempts = 1\n\n# while the guess is wrong:\n#   give a higher/lower clue\n#   ask for a new guess\n#   add one to attempts\n\n\nprint(f"Got it in {attempts} guesses!")\n',
        stdin: ['5', '8', '6', '7', '3', '9', '1', '10', '2', '4'],
        hints: [
          'Start with: while guess != secret_number:',
          'Inside, use if guess < secret_number: print("Higher!") and else: print("Lower!")',
          'Still inside the loop, ask again and count: guess = int(input("Try again: ")) and attempts = attempts + 1'
        ],
        requires: [
          { text: 'while', message: 'This needs a while loop — the number of guesses is not known in advance.' },
          { text: 'random.randint', message: 'The secret number should be random.' },
          { text: 'attempts', message: 'Keep counting the guesses.' }
        ],
        checks: [
          {
            // "in 1 guess" covers the lucky case where the first guess is right
            // and no clue is ever needed.
            mode: 'regex', expect: '(higher|lower|in 1 guess)',
            message: 'The player needs a higher or lower clue after a wrong guess.'
          },
          { mode: 'contains', expect: 'Got it in', message: 'The game should finish and report the number of guesses.' }
        ]
      },
      simpler: {
        label: 'Simpler Version',
        brief:
          'Use a <b>fixed</b> secret number from 1 to 5 and skip the counter. Just keep asking until the player is right.',
        starter:
          '# Guessing game - simpler\nsecret_number = 3\nguess = int(input("Guess a number from 1 to 5: "))\n\n# Keep asking while the guess is wrong.\n# Remember: the new guess must be INSIDE the loop.\n\n\nprint("Correct!")\n',
        stdin: ['1', '5', '3'],
        hints: [
          'The loop starts: while guess != secret_number:',
          'Inside it, print a message and then ask again.',
          'Both indented lines need 4 spaces: print("Nope!") and guess = int(input("Again: "))'
        ],
        requires: [{ text: 'while', message: 'You need a while loop here.' }],
        checks: [
          { mode: 'contains', expect: 'Correct', message: 'The game should end once the right number is guessed.' },
          {
            mode: 'minlines', expect: 4,
            message: 'The loop is not running — the player should be asked more than once.'
          }
        ]
      },
      extra: {
        label: 'Extra Challenge',
        brief:
          'Let the player choose the difficulty first: easy is 1-10, hard is 1-20. Ask them, then use the right <code>random.randint</code> range.'
      },
      quickCheck:
        'Point to the line that changes <code>guess</code>, and the line that changes <code>attempts</code>. If either sat outside the loop, what would go wrong?'
    }
  ]
};
