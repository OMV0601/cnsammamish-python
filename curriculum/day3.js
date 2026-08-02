// DAY 3 — Making Choices  (comparisons, if / elif / else, and / or)
export default {
  day: 3,
  title: 'Making Choices',
  subtitle: 'Teach your program to decide',
  emoji: '🔀',
  color: '#7c5cff',
  badge: '🧭',
  badgeName: 'Decision Maker',
  bigIdea: 'Programs get interesting when they can choose. Ask a True/False question, then do different things depending on the answer.',
  tasks: [
    /* ---------------------------------------------------------------- 3.1 */
    {
      key: 'd3-1',
      type: 'lesson',
      title: 'True, False, and comparing',
      xp: 10,
      minutes: 8,
      blocks: [
        { t: 'p', html: 'Before a program can choose, it needs a question with only two possible answers: <b>True</b> or <b>False</b>. Nothing in between.' },
        { t: 'code', code: 'print(5 > 3)\nprint(2 > 10)', run: true, output: 'True\nFalse' },
        { t: 'p', html: 'Capital T, capital F — that is how Python writes them, and they are not in quote marks.' },
        { t: 'h', text: 'The comparing symbols' },
        { t: 'list', items: [
          '<code>&gt;</code> is bigger than',
          '<code>&lt;</code> is smaller than',
          '<code>&gt;=</code> is bigger than <i>or the same as</i>',
          '<code>&lt;=</code> is smaller than <i>or the same as</i>',
          '<code>==</code> is exactly the same as',
          '<code>!=</code> is <i>not</i> the same as'
        ] },
        { t: 'warn', html: 'The big one: <b>one</b> equals sign <code>=</code> puts something in a box. <b>Two</b> equals signs <code>==</code> asks a question. Mixing these up is the most common mistake in this whole camp.' },
        { t: 'code', code: 'age = 10        # putting 10 into the box\nprint(age == 10)  # asking: is the box holding 10?\nprint(age == 12)\nprint(age != 12)', run: true, output: 'True\nFalse\nTrue' },
        { t: 'h', text: 'Comparing text too' },
        { t: 'code', code: 'password = "dragon"\nprint(password == "dragon")\nprint(password == "Dragon")', run: true, output: 'True\nFalse' },
        { t: 'tip', html: 'Text comparison is fussy about capital letters. <code>"Dragon"</code> and <code>"dragon"</code> are different to Python.' }
      ]
    },

    /* ---------------------------------------------------------------- 3.2 */
    {
      key: 'd3-2',
      type: 'blanks',
      title: 'True or False?',
      xp: 20,
      minutes: 7,
      intro: 'Fill in the comparing symbol that makes each line print True.',
      items: [
        {
          prompt: 'Should print <code>True</code>',
          code: 'print(9 [[1]] 4)',
          blanks: [{ id: 1, accept: ['>', '!='], hint: '9 is bigger than 4.' }]
        },
        {
          prompt: 'Should print <code>True</code>',
          code: 'print(3 [[1]] 8)',
          blanks: [{ id: 1, accept: ['<', '!=', '<='], hint: '3 is smaller than 8.' }]
        },
        {
          prompt: 'Should print <code>True</code> — is it exactly the same?',
          code: 'lives = 3\nprint(lives [[1]] 3)',
          blanks: [{ id: 1, accept: ['==', '>=', '<='], hint: 'Two symbols. It asks a question rather than filling a box.' }]
        },
        {
          prompt: 'Should print <code>True</code> — is it different?',
          code: 'colour = "red"\nprint(colour [[1]] "blue")',
          blanks: [{ id: 1, accept: ['!='], hint: 'The "not the same as" symbol starts with an exclamation mark.' }]
        },
        {
          prompt: 'Put 7 in the box, then check it is 7.',
          code: 'n [[1]] 7\nprint(n [[2]] 7)',
          blanks: [
            { id: 1, accept: ['='], hint: 'One equals sign fills a box.' },
            { id: 2, accept: ['=='], hint: 'Two equals signs ask a question.' }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- 3.3 */
    {
      key: 'd3-3',
      type: 'lesson',
      title: 'if and else',
      xp: 10,
      minutes: 12,
      blocks: [
        { t: 'p', html: '<code>if</code> means: <i>only do this next bit when the answer is True</i>.' },
        { t: 'code', code: 'age = 12\n\nif age > 10:\n    print("You can ride the big rollercoaster!")\n\nprint("Have a nice day")', run: true },
        { t: 'p', html: 'Change <code>age</code> to 6 and run it again. The rollercoaster line disappears, but "Have a nice day" still shows.' },
        { t: 'h', text: 'Two things you must not forget' },
        { t: 'list', items: [
          'A <b>colon</b> <code>:</code> at the end of the if line.',
          '<b>Indentation</b> — the lines underneath are pushed in by 4 spaces (one Tab).'
        ] },
        { t: 'p', html: 'The indentation is not decoration. It is how Python knows which lines belong to the <code>if</code>. Pushed in = inside the if. Back to the left = happens no matter what.' },
        { t: 'code', code: 'score = 100\n\nif score > 50:\n    print("Well done!")\n    print("This line is INSIDE the if")\n\nprint("This line is OUTSIDE the if")', run: true },
        { t: 'warn', html: 'If you forget the colon, Python says <b>SyntaxError</b>. If your indentation is wrong, it says <b>IndentationError</b>. Both messages tell you the line number.' },
        { t: 'h', text: 'else: what to do otherwise' },
        { t: 'code', code: 'weather = "rain"\n\nif weather == "sun":\n    print("Wear sunglasses")\nelse:\n    print("Take an umbrella")', run: true, output: 'Take an umbrella' },
        { t: 'p', html: '<code>else</code> lines up under <code>if</code> — not indented — and it also ends with a colon. Exactly one of the two branches will run. Never both, never neither.' },
        { t: 'tip', html: 'Say your code out loud like English: <i>"if weather is sun, print wear sunglasses, otherwise print take an umbrella."</i> If it makes sense as a sentence, it usually works.' }
      ]
    },

    /* ---------------------------------------------------------------- 3.4 */
    {
      key: 'd3-4',
      type: 'blanks',
      title: 'Building an if',
      xp: 20,
      minutes: 8,
      intro: 'Fill the gaps. Watch out for colons and indentation!',
      items: [
        {
          prompt: 'Print "Big!" only when n is more than 100.',
          code: 'n = 250\nif n > 100[[1]]\n    print("Big!")',
          blanks: [{ id: 1, accept: [':'], hint: 'Every if line ends with this punctuation mark.' }]
        },
        {
          prompt: 'The keyword for "otherwise" is missing.',
          code: 'hungry = True\nif hungry:\n    print("Eat a snack")\n[[1]]:\n    print("Keep coding")',
          blanks: [{ id: 1, accept: ['else'], hint: 'Four letters. It means "otherwise".' }]
        },
        {
          prompt: 'Check whether the password is exactly <code>dragon</code>.',
          code: 'password = "dragon"\nif password [[1]] "dragon":\n    print("Access granted")',
          blanks: [{ id: 1, accept: ['=='], hint: 'Two equals signs — we are asking, not filling.' }]
        },
        {
          prompt: 'The starting keyword is missing.',
          code: 'temp = 30\n[[1]] temp > 25:\n    print("Hot day")\nelse:\n    print("Bring a jacket")',
          blanks: [{ id: 1, accept: ['if'], hint: 'Two letters. It starts every decision.' }]
        }
      ]
    },

    /* ---------------------------------------------------------------- 3.5 */
    {
      key: 'd3-5',
      type: 'quiz',
      title: 'Decision quiz',
      xp: 20,
      minutes: 6,
      questions: [
        {
          q: 'Which line asks "is score the same as 10?"',
          options: ['score = 10', 'score == 10', 'score := 10', 'score equals 10'],
          answer: 1,
          why: 'One = fills a box. Two == asks a question.'
        },
        {
          q: 'What does this print?<br><code>x = 5<br>if x > 10:<br>&nbsp;&nbsp;&nbsp;&nbsp;print("big")<br>else:<br>&nbsp;&nbsp;&nbsp;&nbsp;print("small")</code>',
          options: ['big', 'small', 'big and small', 'Nothing'],
          answer: 1,
          why: '5 is not bigger than 10, so the False path (else) runs.'
        },
        {
          q: 'What is missing?<br><code>if age > 10<br>&nbsp;&nbsp;&nbsp;&nbsp;print("hi")</code>',
          options: ['A colon after 10', 'Quote marks around age', 'An else', 'Nothing is missing'],
          answer: 0,
          why: 'Every if line ends with a colon. Without it you get a SyntaxError.'
        },
        {
          q: 'Why are the lines under an <code>if</code> pushed in?',
          options: [
            'It just looks tidier',
            'It tells Python those lines belong to the if',
            'Python does not care about it',
            'To leave room for comments'
          ],
          answer: 1,
          why: 'In Python indentation is part of the language, not decoration.'
        },
        {
          q: 'How many of these two lines print when the condition is True?<br><code>if True:<br>&nbsp;&nbsp;&nbsp;&nbsp;print("A")<br>else:<br>&nbsp;&nbsp;&nbsp;&nbsp;print("B")</code>',
          options: ['Both A and B', 'Only A', 'Only B', 'Neither'],
          answer: 1,
          why: 'if/else always runs exactly one branch.'
        }
      ]
    },

    /* ---------------------------------------------------------------- 3.6 */
    {
      key: 'd3-6',
      type: 'code',
      title: 'Rollercoaster gate',
      xp: 30,
      minutes: 12,
      brief:
        'Ask for the rider\'s height in centimetres. If it is <b>140 or more</b>, print <code>You can ride!</code>. Otherwise print <code>Sorry, too small this year.</code><br><br>It will be tested with the height <b>150</b> and then with <b>120</b>.',
      starter:
        'height = int(input("How tall are you in cm? "))\n\nif height >= 140:\n    print("You can ride!")\n# add the otherwise part below\n',
      hints: [
        'Use >= so that exactly 140 is allowed in.',
        'else: goes at the far left, lined up under if, and ends with a colon.',
        'The line under else must be pushed in by 4 spaces.'
      ],
      requires: [
        { text: 'if', message: 'You need an if.' },
        { text: 'else', message: 'You need an else for the "otherwise" case.' }
      ],
      checks: [
        { stdin: ['150'], mode: 'contains', expect: 'You can ride!', message: 'With height 150 it should say "You can ride!"' },
        { stdin: ['120'], mode: 'contains', expect: 'too small', message: 'With height 120 it should say "Sorry, too small this year."' }
      ]
    },

    /* ---------------------------------------------------------------- 3.7 */
    {
      key: 'd3-7',
      type: 'lesson',
      title: 'elif, and, or',
      xp: 10,
      minutes: 10,
      blocks: [
        { t: 'p', html: 'Sometimes there are more than two answers. <code>elif</code> (short for "else if") lets you add extra options in the middle.' },
        { t: 'code', code: 'score = 74\n\nif score >= 90:\n    print("Grade A")\nelif score >= 80:\n    print("Grade B")\nelif score >= 70:\n    print("Grade C")\nelse:\n    print("Keep practising")', run: true, output: 'Grade C' },
        { t: 'p', html: 'Python checks them <b>top to bottom and stops at the first True one</b>. 74 is not ≥90, not ≥80, but it is ≥70 — so it prints Grade C and skips the rest.' },
        { t: 'warn', html: 'Order matters. If you put <code>score >= 70</code> first, then a score of 95 would also stop there and get a C.' },
        { t: 'h', text: 'You can have as many elifs as you like' },
        { t: 'code', code: 'animal = "cat"\n\nif animal == "dog":\n    print("Woof")\nelif animal == "cat":\n    print("Meow")\nelif animal == "cow":\n    print("Moo")\nelse:\n    print("I do not know that one")', run: true, output: 'Meow' },
        { t: 'h', text: 'Two questions at once: and / or' },
        { t: 'list', items: [
          '<code>and</code> — <b>both</b> parts must be True',
          '<code>or</code> — <b>at least one</b> part must be True'
        ] },
        { t: 'code', code: 'age = 12\nhas_ticket = True\n\nif age >= 10 and has_ticket:\n    print("Come in!")\nelse:\n    print("Not today")', run: true, output: 'Come in!' },
        { t: 'code', code: 'day = "Saturday"\n\nif day == "Saturday" or day == "Sunday":\n    print("No school!")\nelse:\n    print("School day")', run: true, output: 'No school!' },
        { t: 'tip', html: 'Write each side out in full. <code>day == "Saturday" or "Sunday"</code> looks right in English but does not work — each side of <code>or</code> needs its own complete comparison.' }
      ]
    },

    /* ---------------------------------------------------------------- 3.8 */
    {
      key: 'd3-8',
      type: 'project',
      title: 'Mini project: The secret door',
      xp: 50,
      minutes: 22,
      brief:
        'Build a guarded door. Ask for a password, then react in <b>three different ways</b>:<br>• the right password → let them in<br>• the special word <code>visitor</code> → let them in as a guest<br>• anything else → turn them away<br><br>It will be tested with <code>dragon</code>, then <code>visitor</code>, then <code>banana</code>.',
      checklist: [
        'Ask for the password with input',
        'Use if to check for the correct password "dragon" — print something containing "welcome"',
        'Use elif to check for "visitor" — print something containing "guest"',
        'Use else for everyone else — print something containing "denied"',
        'Bonus: add a second question (like a security question) using and'
      ],
      starter:
        '# The secret door\npassword = input("Speak the password: ")\n\nif password == "dragon":\n    print("Welcome, master!")\n# add elif and else below\n',
      hints: [
        'elif goes between if and else, and each one ends with a colon.',
        'Every print inside a branch is pushed in by 4 spaces.',
        'Check your spelling — "dragon" and "Dragon" are different to Python.'
      ],
      requires: [
        { text: 'elif', message: 'This one needs an elif for the visitor case.' },
        { text: 'else', message: 'You need an else for everyone else.' }
      ],
      checks: [
        { stdin: ['dragon'], mode: 'contains', expect: 'welcome', message: 'With "dragon" your message should contain the word welcome.' },
        { stdin: ['visitor'], mode: 'contains', expect: 'guest', message: 'With "visitor" your message should contain the word guest.' },
        { stdin: ['banana'], mode: 'contains', expect: 'denied', message: 'With "banana" your message should contain the word denied.' }
      ]
    }
  ]
};
