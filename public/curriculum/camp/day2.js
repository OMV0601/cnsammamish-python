// DAY 2 — Boxes That Remember  (variables, input, numbers)
export default {
  day: 2,
  title: 'Boxes That Remember',
  subtitle: 'Variables, questions and maths',
  emoji: '📦',
  color: '#3ba55d',
  badge: '📦',
  badgeName: 'Box Keeper',
  bigIdea: 'A variable is a labelled box. You put something in it, and Python remembers it for the rest of the program.',
  tasks: [
    /* ---------------------------------------------------------------- 2.1 */
    {
      key: 'd2-1',
      type: 'lesson',
      title: 'Variables: labelled boxes',
      xp: 10,
      minutes: 8,
      blocks: [
        { t: 'p', html: 'Yesterday everything we printed vanished straight away. Today we learn how to <b>keep</b> things.' },
        { t: 'p', html: 'A <b>variable</b> is a box with a label on it. You choose the label, you choose what goes inside.' },
        { t: 'code', code: 'score = 10\nprint(score)', run: true, output: '10' },
        { t: 'p', html: 'Read <code>=</code> as <b>"gets"</b>, not "equals". Say it out loud: <i>"score gets 10"</i>. The label is on the left, the thing going in the box is on the right.' },
        { t: 'h', text: 'Boxes without quote marks' },
        { t: 'p', html: 'Look carefully at these two prints:' },
        { t: 'code', code: 'pet = "dog"\nprint("pet")\nprint(pet)', run: true, output: 'pet\ndog' },
        { t: 'p', html: '<code>print("pet")</code> has quote marks, so Python shows the <b>word</b> pet. <code>print(pet)</code> has no quote marks, so Python opens the <b>box</b> and shows what is inside.' },
        { t: 'warn', html: 'This trips up almost everyone at least once. Quote marks = the literal word. No quote marks = look inside the box.' },
        { t: 'h', text: 'You can change what is inside' },
        { t: 'code', code: 'lives = 3\nprint(lives)\n\nlives = 2\nprint(lives)', run: true, output: '3\n2' },
        { t: 'p', html: 'The box only ever holds the <b>latest</b> thing you put in it. The old value is gone.' },
        { t: 'h', text: 'Naming your boxes' },
        { t: 'list', items: [
          'Use lowercase letters: <code>score</code>, <code>name</code>, <code>high_score</code>',
          'No spaces — use an underscore instead: <code>best_time</code>',
          'Cannot start with a number: <code>2nd_place</code> is not allowed, <code>place2</code> is fine',
          'Pick names that say what is inside. <code>x</code> tells you nothing; <code>player_name</code> tells you everything.'
        ] },
        { t: 'h', text: 'Numbers and text are different' },
        { t: 'code', code: 'age = 10\nname = "Alex"\nprint(name, "is", age)', run: true, output: 'Alex is 10' },
        { t: 'tip', html: 'Text goes in quote marks. Numbers do not. <code>age = 10</code> is a number; <code>age = "10"</code> is text that happens to look like a number.' }
      ]
    },

    /* ---------------------------------------------------------------- 2.2 */
    {
      key: 'd2-2',
      type: 'blanks',
      title: 'Filling the boxes',
      xp: 20,
      minutes: 8,
      intro: 'Complete each program so it does what the label says.',
      items: [
        {
          prompt: 'Put the number 7 into a box called <code>lucky</code>, then show it.',
          code: 'lucky [[1]] 7\nprint([[2]])',
          blanks: [
            { id: 1, accept: ['='], hint: 'One symbol. It means "gets".' },
            { id: 2, accept: ['lucky'], hint: 'The box name — with no quote marks.' }
          ]
        },
        {
          prompt: 'Should print: <code>Bella</code>',
          code: 'pet = "Bella"\nprint([[1]])',
          blanks: [{ id: 1, accept: ['pet'], hint: 'No quote marks — we want what is inside the box.' }]
        },
        {
          prompt: 'Should print the word <code>pet</code> itself, not what is inside.',
          code: 'pet = "Bella"\nprint([[1]])',
          blanks: [{ id: 1, accept: ['"pet"', "'pet'"], hint: 'Quote marks make it a plain word.' }]
        },
        {
          prompt: 'The box holds text, so it needs quote marks.',
          code: 'city = [[1]]Seattle[[2]]',
          blanks: [
            { id: 1, accept: ['"', "'"], hint: 'Opens the text.' },
            { id: 2, accept: ['"', "'"], hint: 'Closes the text.' }
          ]
        },
        {
          prompt: 'Change the score from 5 to 20, then print it.',
          code: 'score = 5\nscore [[1]] 20\nprint(score)',
          blanks: [{ id: 1, accept: ['='], hint: 'Put a new value into the same box.' }]
        }
      ]
    },

    /* ---------------------------------------------------------------- 2.3 */
    {
      key: 'd2-3',
      type: 'quiz',
      title: 'Variable quiz',
      xp: 20,
      minutes: 6,
      questions: [
        {
          q: 'What does this print?<br><code>x = 4<br>x = 9<br>print(x)</code>',
          options: ['4', '9', '4 9', '13'],
          answer: 1,
          why: 'A box holds only the latest value. The 4 was replaced by the 9.'
        },
        {
          q: 'What does this print?<br><code>food = "taco"<br>print("food")</code>',
          options: ['taco', 'food', '"taco"', 'An error'],
          answer: 1,
          why: 'Quote marks around food make it a plain word, so Python never looks in the box.'
        },
        {
          q: 'Which variable name is NOT allowed?',
          options: ['high_score', 'player2', '2players', 'name'],
          answer: 2,
          why: 'Variable names cannot start with a number.'
        },
        {
          q: 'What does this print?<br><code>a = 3<br>b = a<br>a = 10<br>print(b)</code>',
          options: ['3', '10', '13', 'a'],
          answer: 0,
          why: 'b copied the value 3 at that moment. Changing a afterwards does not reach back into b.'
        },
        {
          q: 'Which line puts the <b>text</b> hello into a box called msg?',
          options: ['msg = hello', 'msg = "hello"', '"msg" = hello', 'msg == "hello"'],
          answer: 1,
          why: 'Text needs quote marks, and a single = puts things into a box.'
        }
      ]
    },

    /* ---------------------------------------------------------------- 2.4 */
    {
      key: 'd2-4',
      type: 'code',
      title: 'Build a player',
      xp: 30,
      minutes: 10,
      brief:
        'Make three variables — <code>player</code> (your name as text), <code>level</code> (the number 1) and <code>coins</code> (the number 50). Then print all three on one line using commas.',
      starter: 'player = "???"\nlevel = 1\ncoins = 50\n\nprint(player, level, coins)\n',
      hints: [
        'Text needs quote marks. Numbers do not.',
        'print(player, level, coins) shows all three with spaces between.',
        'Replace ??? with your actual name.'
      ],
      requires: [
        { text: 'player', message: 'You need a variable called player.' },
        { text: 'level', message: 'You need a variable called level.' },
        { text: 'coins', message: 'You need a variable called coins.' }
      ],
      checks: [
        { mode: 'contains', expect: '1', message: 'Your output should include the level, 1.' },
        { mode: 'contains', expect: '50', message: 'Your output should include the coins, 50.' },
        { mode: 'notcontains', expect: '???', message: 'Replace ??? with your real name.' }
      ]
    },

    /* ---------------------------------------------------------------- 2.5 */
    {
      key: 'd2-5',
      type: 'lesson',
      title: 'Asking the user a question',
      xp: 10,
      minutes: 10,
      blocks: [
        { t: 'p', html: 'So far <b>you</b> decide everything. Now the program can ask a question and use the answer. That instruction is <code>input</code>.' },
        { t: 'code', code: 'name = input("What is your name? ")\nprint("Nice to meet you, " + name)', run: true, stdin: ['Alex'], note: 'When you run this here, the answer "Alex" is typed in for you.' },
        { t: 'p', html: 'Read it right to left: <code>input</code> asks the question and hands back whatever was typed. The <code>=</code> puts that answer into the box called <code>name</code>.' },
        { t: 'tip', html: 'Leave a space before your closing quote — <code>input("Name? ")</code> — so the typing does not squash against the question mark.' },
        { t: 'h', text: 'The big gotcha: input always gives back text' },
        { t: 'p', html: 'Even if someone types <code>7</code>, Python hands you the <b>text</b> "7", not the number 7. Watch what goes wrong:' },
        { t: 'code', code: 'age = input("Your age? ")\nprint(age + 1)', run: true, stdin: ['10'], note: 'This one crashes on purpose — read the red message.' },
        { t: 'p', html: 'Python says it cannot add a number to text. Fair enough — what would <code>"cat" + 1</code> even mean?' },
        { t: 'h', text: 'The fix: int()' },
        { t: 'p', html: '<code>int()</code> turns text into a whole number. (<code>int</code> is short for <i>integer</i>, the maths word for a whole number.)' },
        { t: 'code', code: 'age = int(input("Your age? "))\nprint(age + 1)', run: true, stdin: ['10'], output: 'Your age? 10\n11' },
        { t: 'p', html: 'Notice the brackets stack up: <code>int( input( "..." ) )</code>. The inside runs first — ask the question — then <code>int</code> converts the answer.' },
        { t: 'warn', html: 'Use <code>int()</code> only when you are going to do maths with the answer. Names and colours should stay as text.' }
      ]
    },

    /* ---------------------------------------------------------------- 2.6 */
    {
      key: 'd2-6',
      type: 'code',
      title: 'Greeting machine',
      xp: 30,
      minutes: 12,
      brief:
        'Ask the user for their name, then their favourite colour. Then print one sentence that uses <b>both</b> answers, for example:<pre>Hi Alex, blue is a great colour!</pre>',
      starter: 'name = input("What is your name? ")\n# now ask for their favourite colour\n\n# now print a sentence using both\n',
      hints: [
        'You need two input lines, each saving into its own variable.',
        'Join pieces with + and remember the spaces: "Hi " + name + ", " + colour',
        'Or use commas: print("Hi", name, "likes", colour)'
      ],
      stdin: ['Alex', 'blue'],
      requires: [{ text: 'input', message: 'You need to use input to ask the questions.' }],
      checks: [
        { mode: 'contains', expect: 'Alex', message: 'Your final sentence should include the name that was typed in.' },
        { mode: 'contains', expect: 'blue', message: 'Your final sentence should include the colour that was typed in.' }
      ]
    },

    /* ---------------------------------------------------------------- 2.7 */
    {
      key: 'd2-7',
      type: 'lesson',
      title: 'Python does your maths',
      xp: 10,
      minutes: 8,
      blocks: [
        { t: 'p', html: 'Python is a very fast calculator. The symbols are almost the ones you know:' },
        { t: 'list', items: [
          '<code>+</code> add',
          '<code>-</code> subtract',
          '<code>*</code> multiply (a star, not an ×)',
          '<code>/</code> divide (a forward slash, not a ÷)',
          '<code>**</code> to the power of — <code>2 ** 3</code> is 2×2×2 = 8'
        ] },
        { t: 'code', code: 'print(5 + 3)\nprint(10 - 4)\nprint(6 * 7)\nprint(20 / 4)\nprint(2 ** 5)', run: true, output: '8\n6\n42\n5.0\n32' },
        { t: 'p', html: 'Spot the odd one out: <code>20 / 4</code> gave <b>5.0</b>, not 5. Dividing always produces a decimal number, even when it comes out even.' },
        { t: 'h', text: 'Maths with boxes' },
        { t: 'code', code: 'price = 8\ncount = 3\ntotal = price * count\nprint("Total:", total)', run: true, output: 'Total: 24' },
        { t: 'p', html: 'The right-hand side is worked out <b>first</b>, then the answer goes into the box on the left.' },
        { t: 'h', text: 'A box can update itself' },
        { t: 'code', code: 'score = 0\nscore = score + 10\nscore = score + 10\nprint(score)', run: true, output: '20' },
        { t: 'p', html: '<code>score = score + 10</code> looks strange but reads simply: <i>take what is in score, add 10, put the result back in score</i>. This is how every game keeps score.' },
        { t: 'tip', html: 'Programmers write this so often there is a shortcut: <code>score += 10</code> means exactly the same thing.' }
      ]
    },

    /* ---------------------------------------------------------------- 2.8 */
    {
      key: 'd2-8',
      type: 'project',
      title: 'Mini project: Dog years calculator',
      xp: 50,
      minutes: 20,
      brief:
        'Dogs age about 7 times faster than people. Build a calculator that asks for a person\'s age and tells them their age in dog years.<br><br>With the age <b>10</b> typed in, your output must contain <b>70</b> somewhere.',
      checklist: [
        'Ask for an age using input',
        'Wrap it in int() so you can do maths with it',
        'Multiply by 7 and store it in a variable',
        'Print a friendly sentence containing the answer',
        'Bonus: also print how many dog years until their next birthday'
      ],
      starter:
        '# Dog years calculator\nage = int(input("How old are you? "))\n\n# work out dog years below\n\n',
      hints: [
        'int(input("How old are you? ")) asks and converts in one line.',
        'dog_age = age * 7',
        'print("In dog years you are", dog_age)'
      ],
      stdin: ['10'],
      requires: [
        { text: 'int', message: 'Use int() so the answer becomes a number you can multiply.' },
        { text: '7', message: 'Multiply by 7 somewhere.' }
      ],
      checks: [
        { mode: 'contains', expect: '70', message: 'With age 10 typed in, the answer 70 should appear in your output.' }
      ]
    }
  ]
};
