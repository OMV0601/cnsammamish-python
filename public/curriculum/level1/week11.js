// WEEK 11 — Final Project: Choose Your Path
// Planning and building from a starter project
export default {
  day: 11,
  title: 'Final Project: Choose Your Path',
  subtitle: 'Planning and building from a starter project',
  emoji: '🏗️',
  color: '#ff8a3d',
  badge: '📐',
  badgeName: 'Project Planner',
  bigIdea: 'Finish the smallest version that actually works, all the way from start to end. Only then add something extra. A small finished thing beats a big broken one.',
  byTheEnd: 'Make fun creative choices inside a clear, manageable starter project.',
  nextWeek: 'Next week is for testing, one useful improvement, and sharing what you made.',
  tasks: [
    /* ------------------------------------------------------------ 11.1 */
    {
      key: 'w11-1',
      type: 'lesson',
      title: 'How to not get stuck',
      xp: 10,
      minutes: 12,
      blocks: [
        { t: 'p', html: 'This week you pick a project and build it. Before you choose, here is the single most useful habit in programming.' },

        { t: 'h', text: 'Smallest working version first' },
        { t: 'p', html: 'Every project has a <b>smallest version that works end to end</b>. Build that first. It will feel too simple. Build it anyway.' },
        { t: 'p', html: 'A guessing game where you get one guess and it says right or wrong is <i>finished</i>. It is small, but a person can play it from beginning to end. Now you can add clues, then a counter, then difficulty — and at every point you still have something that works.' },
        { t: 'warn', html: 'The opposite way round — building all the clever features and hoping they join up at the end — is how projects end up unfinished. Half a brilliant idea runs exactly as well as no idea.' },

        { t: 'h', text: 'Make a plan before you type' },
        { t: 'p', html: 'On paper, write:' },
        { t: 'list', items: [
          '<b>What it is</b> — one sentence.',
          '<b>Smallest working version</b> — three or four bullet points, no more.',
          '<b>One extra</b> — the single feature you will add <i>if</i> the small version works.'
        ] },
        { t: 'p', html: 'Show that plan to your instructor <b>before</b> you open the file. It takes two minutes and saves half an hour.' },

        { t: 'h', text: 'Your three choices' },
        { t: 'p', html: 'Each one uses skills you already have. Pick the one that sounds most fun — they are all worth the same.' },
        { t: 'list', items: [
          '🗺️ <b>Story Quest</b> — input, variables, if/else. An opening, one choice, two endings.',
          '🎨 <b>Turtle Art Maker</b> — for loops, variables, functions. Two shapes used again in a design.',
          '🔢 <b>Guessing Challenge</b> — numbers, if and while. Higher/lower with a count of tries.'
        ] },

        { t: 'h', text: 'When something breaks' },
        { t: 'p', html: 'You know this routine by now. Use it:' },
        { t: 'list', items: [
          'Read the <b>last line</b> of the red message.',
          'Go to the line number it names.',
          'Check spelling, quote marks, colons and spacing.',
          'Change <b>one</b> thing. Run again.',
          'Still stuck? Go back to the last version that worked.'
        ] },
        { t: 'tip', html: 'There is no set bug this week. Instead, when you hit a real one, <b>write down</b> what went wrong and what you tried. You will need it next week.' }
      ]
    },

    /* ------------------------------------------------------------ 11.2 */
    {
      key: 'w11-2',
      type: 'quiz',
      title: 'Planning quiz',
      xp: 20,
      minutes: 8,
      questions: [
        {
          q: 'What should you build first?',
          options: [
            'The most exciting feature',
            'The smallest version that works from start to finish',
            'The title screen',
            'All the colours'
          ],
          answer: 1,
          why: 'A small finished thing beats a big broken one, every time.'
        },
        {
          q: 'When do you add the extra feature?',
          options: [
            'At the same time as everything else',
            'Only once the small version works properly',
            'First, so you do not forget',
            'Never'
          ],
          answer: 1,
          why: 'Extras go on top of something that already works.'
        },
        {
          q: 'Your project broke and you cannot see why. Best move?',
          options: [
            'Delete everything and start again',
            'Go back to the last version that worked',
            'Add another feature and hope',
            'Ask a friend to rewrite it'
          ],
          answer: 1,
          why: 'Returning to a known-good version is always cheaper than guessing.'
        },
        {
          q: 'What goes in your plan?',
          options: [
            'Every line of code',
            'What it is, the smallest working version, and one extra',
            'Just a title',
            'A drawing of the finished screen'
          ],
          answer: 1,
          why: 'Short and specific. A plan is a guide, not the program itself.'
        },
        {
          q: 'Which is a finished project?',
          options: [
            'A huge game with three broken features',
            'A small game a person can play from start to end',
            'A file full of clever comments',
            'Something nobody can run'
          ],
          answer: 1,
          why: 'Finished means someone else can use it from beginning to end.'
        }
      ]
    },

    /* ------------------------------------------------------------ 11.3 */
    {
      key: 'w11-3',
      type: 'mission',
      title: 'Build your final project',
      xp: 70,
      minutes: 60,
      paths: [
        /* ------------------------------------------------- Story Quest -- */
        {
          id: 'story',
          label: '🗺️ Story Quest',
          brief:
            '<b>Story Quest</b> — input, variables and if/else.<br><br>Small working version: an <b>opening</b>, <b>one choice</b>, and <b>two endings</b>. Get that working from start to finish before you add anything else.',
          checklist: [
            'An opening that sets the scene and asks the player\'s name',
            'One meaningful choice',
            'Two clearly different endings',
            'The player\'s name used somewhere with an f-string',
            'It runs start to finish with no errors'
          ],
          starter:
            '# ===== STORY QUEST =====\n# Smallest working version: opening, one choice, two endings.\n\nname = input("What is your name, traveller? ")\n\n# STEP 1: the opening - two or three lines setting the scene\nprint("")\n\n# STEP 2: the choice\nchoice = input("").lower()\n\n# STEP 3: two endings\nif choice == "":\n    print("")\nelse:\n    print("")\n',
          stdin: ['Ada', 'left'],
          hints: [
            'Fill in the empty quote marks one at a time, running after each.',
            'Use the name in at least one line: print(f"Good luck, {name}!")',
            'Your if line needs the answer you are checking for: if choice == "left":'
          ],
          requires: [
            { text: 'if', message: 'You need an if to choose between the endings.' },
            { text: 'else', message: 'You need an else so every other answer is handled.' },
            { text: 'f"', message: 'Use the player\'s name somewhere with an f-string.' }
          ],
          checks: [
            { mode: 'contains', expect: 'Ada', message: 'The player\'s name is not appearing anywhere in the story.' },
            { mode: 'minlines', expect: 4, message: 'Expected an opening, a question and an ending — some quote marks are still empty.' }
          ],
          extra: {
            label: 'Extra (only once the above works)',
            brief: 'Add a third ending with <code>elif</code>, or a score, or an item the player carries to the end.'
          }
        },

        /* --------------------------------------------- Turtle Art Maker -- */
        {
          id: 'turtle',
          label: '🎨 Turtle Art Maker',
          brief:
            '<b>Turtle Art Maker</b> — for loops, variables and functions.<br><br>Small working version: <b>two shape functions</b>, each used <b>more than once</b>, arranged into a design. Get that drawing before you add colours and flourishes.',
          checklist: [
            'Two shape functions made with def',
            'Each one called more than once',
            'The turtle moved between shapes so the design is readable',
            'At least two colours',
            'A picture you would be happy to show someone'
          ],
          starter:
            '# ===== TURTLE ART MAKER =====\nimport turtle\n\nturtle.pensize(3)\n\n# STEP 1: your first shape function\ndef draw_square():\n    for _ in range(4):\n        turtle.forward(50)\n        turtle.right(90)\n\n# STEP 2: your second shape function\n\n\n# Handy helper - moves without drawing\ndef move_along():\n    turtle.penup()\n    turtle.forward(70)\n    turtle.pendown()\n\n# STEP 3: build your design by calling them below\n',
          hints: [
            'Your second function mirrors the first: def draw_triangle(): with a range(3) loop turning 120.',
            'Below the defs, call them: draw_square(), move_along(), draw_triangle(), move_along()...',
            'Change colour between shapes with turtle.pencolor("red") so the design looks deliberate.'
          ],
          requires: [
            { text: 'def', message: 'Make your shapes into functions with def.' }
          ],
          checks: [
            {
              mode: 'turtle', minSegments: 14, minColours: 2, minDirections: 4,
              message: 'Expected at least four shapes (two functions, each used twice) in two or more colours.'
            }
          ],
          extra: {
            label: 'Extra (only once the above works)',
            brief: 'Give a function an adjustable size — <code>def draw_square(size):</code> — or add a third shape function.'
          }
        },

        /* -------------------------------------------- Guessing Challenge -- */
        {
          id: 'guess',
          label: '🔢 Guessing Challenge',
          brief:
            '<b>Guessing Challenge</b> — numbers, if and while.<br><br>Small working version: <b>higher/lower clues</b> until the player is right, then <b>how many tries</b> they took. Get that working before adding difficulty options.',
          checklist: [
            'A random secret number',
            'A while loop that runs until the guess is right',
            'Higher and lower clues',
            'A counter reporting the number of guesses at the end',
            'It always ends — no infinite loop'
          ],
          starter:
            '# ===== GUESSING CHALLENGE =====\nimport random\n\nsecret_number = random.randint(1, 20)\nguess = int(input("Guess a number from 1 to 20: "))\nattempts = 1\n\n# STEP 1: while the guess is wrong...\n#   STEP 2: say higher or lower\n#   STEP 3: ask for a new guess (must be INSIDE the loop!)\n#   STEP 4: add one to attempts\n\n\nprint(f"Correct! It took you {attempts} guesses.")\n',
          stdin: ['10', '15', '17', '18', '19', '20', '1', '2', '3', '4', '5', '6', '7', '8', '9', '11', '12', '13', '14', '16'],
          hints: [
            'STEP 1: while guess != secret_number:',
            'STEP 2, indented inside: if guess < secret_number: print("Higher!") / else: print("Lower!")',
            'STEPS 3 and 4, still indented: guess = int(input("Try again: ")) and attempts = attempts + 1'
          ],
          requires: [
            { text: 'while', message: 'This needs a while loop.' },
            { text: 'attempts', message: 'Keep counting the guesses.' }
          ],
          checks: [
            // "you 1 guess" covers the lucky first-guess case.
            { mode: 'regex', expect: '(higher|lower|you 1 guess)', message: 'The player needs higher/lower clues after a wrong guess.' },
            { mode: 'contains', expect: 'Correct', message: 'The game should end and report the number of guesses.' }
          ],
          extra: {
            label: 'Extra (only once the above works)',
            brief: 'Ask for a difficulty first — easy 1-10, hard 1-50 — and use the matching range. Or cap the number of guesses.'
          }
        }
      ],
      quickCheck:
        'Halfway through the session, show your instructor a part that <b>works</b> and say what your next small step is.'
    }
  ]
};
