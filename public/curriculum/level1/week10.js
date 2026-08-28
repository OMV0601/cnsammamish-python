// WEEK 10 — Mini Adventure Builder
// Putting familiar skills together
export default {
  day: 10,
  title: 'Mini Adventure Builder',
  subtitle: 'Putting familiar skills together',
  emoji: '🗺️',
  color: '#1f9d5a',
  badge: '🧭',
  badgeName: 'Adventure Builder',
  bigIdea: 'No new Python this week. Instead: how to walk into a program somebody else started, work out how it fits together, and finish it one marked step at a time.',
  byTheEnd: 'Change and finish a guided project without building a whole program from an empty file.',
  nextWeek: 'Next week you choose your own project path and build from a safe template.',
  tasks: [
    /* ------------------------------------------------------------ 10.1 */
    {
      key: 'w10-1',
      type: 'lesson',
      title: 'Reading somebody else\'s code',
      xp: 10,
      minutes: 12,
      blocks: [
        { t: 'p', html: 'This week there is <b>nothing new to learn</b> — you already have every skill you need. What is new is the <i>situation</i>: a program that is already half-written, and your job is to finish it.' },
        { t: 'p', html: 'That is what real programmers do most of the time. Here is how to do it without getting lost.' },

        { t: 'h', text: '1. Run it before you change anything' },
        { t: 'p', html: 'Always. You need to know what "working" looks like before you start editing, so you can tell what you broke.' },

        { t: 'h', text: '2. Start at the bottom' },
        { t: 'p', html: 'The <code>def</code> blocks at the top are just recipes sitting there. The lines at the <b>bottom</b> are what actually runs. Read those first — they are the plan of the whole program.' },
        {
          t: 'code',
          run: true,
          stdin: ['left'],
          code: 'def opening():\n    print("You wake in a quiet forest.")\n    print("Two paths lead away from the clearing.")\n\ndef ending_left():\n    print("The left path leads to a waterfall. Beautiful.")\n\ndef ending_right():\n    print("The right path leads to a sleeping bear. Tiptoe away!")\n\n# --- The bottom is the plan ---\nopening()\nchoice = input("Left or right? ").lower()\n\nif choice == "left":\n    ending_left()\nelse:\n    ending_right()'
        },
        { t: 'p', html: 'Read the bottom six lines on their own and you can describe the whole game, without reading a single function body.' },

        { t: 'h', text: '3. Test one scene at a time' },
        { t: 'p', html: 'Do not write three scenes and then run it. Write one, run it, check it, then write the next. When something breaks you will know exactly which change caused it.' },
        { t: 'tip', html: 'Golden rule: <b>if you cannot get back to a working version, you have changed too much at once.</b>' },

        { t: 'h', text: '4. Follow the marked steps' },
        { t: 'p', html: 'Your starter file has comments like <code># STEP 1</code>. They are in a deliberate order. Do them in that order and run after each one.' },

        { t: 'h', text: 'Everything you already know' },
        { t: 'p', html: 'This project uses skills from every week so far:' },
        { t: 'list', items: [
          '<b>Week 1</b> — <code>print</code>, <code>input</code>, f-strings',
          '<b>Week 3</b> — <code>if</code> / <code>else</code> for choices',
          '<b>Week 8</b> — a list for the backpack, and <code>append</code>',
          '<b>Week 9</b> — <code>def</code> for each scene'
        ] },
        {
          t: 'code',
          run: true,
          stdin: ['torch'],
          code: '# All four skills in one small program\nbackpack = []\n\ndef show_backpack():\n    print("--- BACKPACK ---")\n    for item in backpack:\n        print(f"- {item}")\n\nitem = input("You find something on the ground. Take what? ")\nbackpack.append(item)\n\nif len(backpack) > 0:\n    show_backpack()\nelse:\n    print("Your backpack is empty.")'
        }
      ]
    },

    /* ------------------------------------------------------------ 10.2 */
    {
      key: 'w10-2',
      type: 'blanks',
      title: 'Reading the plan',
      xp: 20,
      minutes: 10,
      intro: 'These come from a half-finished adventure. Fill in what is missing.',
      items: [
        {
          prompt: 'Run the opening scene.',
          code: 'def opening():\n    print("You wake in a forest.")\n\n[[1]]',
          blanks: [{ id: 1, accept: ['opening()'], hint: 'The function name plus brackets, with no indentation.' }]
        },
        {
          prompt: 'Send the player down the left path.',
          code: 'if choice == "left":\n    [[1]]',
          blanks: [{ id: 1, accept: ['ending_left()'], hint: 'Call the left ending function.' }]
        },
        {
          prompt: 'Add the found item to the backpack.',
          code: 'backpack = []\nitem = input("Take what? ")\nbackpack.[[1]](item)',
          blanks: [{ id: 1, accept: ['append'], hint: 'The list action from Week 8.' }]
        },
        {
          prompt: 'Show every item the player is carrying.',
          code: 'for thing [[1]] backpack:\n    print(thing)',
          blanks: [{ id: 1, accept: ['in'], hint: 'Two letters.' }]
        },
        {
          prompt: 'Make the ending use the player\'s name.',
          code: 'name = input("Your name? ")\nprint([[1]]"Well done, {name}!")',
          blanks: [{ id: 1, accept: ['f'], hint: 'One letter, so the curly brackets work.' }]
        },
        {
          prompt: 'Catch every answer that is not "left".',
          code: 'if choice == "left":\n    ending_left()\n[[1]]:\n    ending_right()',
          blanks: [{ id: 1, accept: ['else'], hint: 'The catch-everything-else word.' }]
        }
      ]
    },

    /* ------------------------------------------------------------ 10.3 */
    {
      key: 'w10-3',
      type: 'quiz',
      title: 'Finding your way around',
      xp: 20,
      minutes: 8,
      questions: [
        {
          q: 'What is the first thing to do with a starter file?',
          options: [
            'Delete the comments',
            'Run it, so you know what working looks like',
            'Rewrite it in your own style',
            'Add all your features at once'
          ],
          answer: 1,
          why: 'You cannot tell what you broke unless you saw it working first.'
        },
        {
          q: 'Why read the BOTTOM of the file first?',
          options: [
            'That is where the errors are',
            'The lines at the bottom are what actually runs — they are the plan',
            'It is shorter',
            'Python reads backwards'
          ],
          answer: 1,
          why: 'def blocks only define. The calls at the bottom drive the program.'
        },
        {
          q: 'You have made five changes and it is broken. What now?',
          options: [
            'Add more changes until it works',
            'Go back to the last version that worked and redo one change at a time',
            'Start again from an empty file',
            'Delete the function'
          ],
          answer: 1,
          why: 'Small steps mean you always know what caused the break.'
        },
        {
          q: 'What does <code>backpack.append(item)</code> need to already exist?',
          options: [
            'A function called append',
            'A list called backpack, and a variable called item',
            'An if statement',
            'A for loop'
          ],
          answer: 1,
          why: 'You can only append to a list that exists, and only add something that exists.'
        },
        {
          q: 'How often should you run the program while building?',
          options: ['Once at the end', 'After every marked step', 'Twice', 'Only if there is an error'],
          answer: 1,
          why: 'Run early, run often. It is the cheapest debugging there is.'
        }
      ]
    },

    /* ------------------------------------------------------------ 10.4 */
    {
      key: 'w10-4',
      type: 'debug',
      title: 'Bug hunt: the scene that does not exist',
      xp: 25,
      minutes: 12,
      brief:
        'This adventure crashes when the player goes right. Run it, read the last line of the red message, and compare the name it complains about with the names of the functions above.',
      starter:
        '# Mini adventure - BROKEN\ndef opening():\n    print("You wake in a quiet forest.")\n    print("Two paths lead away from the clearing.")\n\ndef ending_left():\n    print("The left path leads to a waterfall. Beautiful.")\n\ndef ending_right():\n    print("The right path leads to a sleeping bear. Tiptoe away!")\n\nopening()\nchoice = input("Left or right? ").lower()\n\nif choice == "left":\n    ending_left()\nelse:\n    ending_rihgt()\n',
      stdin: ['right'],
      hints: [
        'Which function name is Python saying it has never heard of?',
        'Compare the name on the line that crashed with the def lines near the top, letter by letter.',
        'ending_rihgt is a typo. It should be ending_right.'
      ],
      requires: [
        { text: 'def ending_right', message: 'Keep the ending_right function.' }
      ],
      checks: [
        { mode: 'contains', expect: 'sleeping bear', message: 'Going right should reach the bear ending.' }
      ],
      understand:
        'Describe three parts of this program in your own words. Then add a third path with <code>elif</code> without copying a whole answer.'
    },

    /* ------------------------------------------------------------ 10.5 */
    {
      key: 'w10-5',
      type: 'mission',
      title: 'Mini Adventure Builder',
      xp: 45,
      minutes: 40,
      main: {
        brief:
          'Finish this adventure. It is <b>mostly written</b> — follow the four marked steps in order, running after each one. Then personalise the story so it sounds like yours.',
        checklist: [
          'STEP 1 — the opening scene prints properly',
          'STEP 2 — the player is asked to make a choice',
          'STEP 3 — an if / else sends them to two different endings',
          'STEP 4 — one item gets added to the backpack and shown at the end',
          'The story is personalised, not the placeholder text'
        ],
        starter:
          '# ===== MINI ADVENTURE =====\nbackpack = []\n\ndef opening():\n    # STEP 1: write two or three lines that set the scene\n    print("")\n\ndef ending_cave():\n    print("Deep in the cave you find a glowing crystal.")\n\ndef ending_river():\n    print("At the river you meet a talkative frog.")\n\ndef show_backpack():\n    print("--- YOUR BACKPACK ---")\n    for item in backpack:\n        print(f"- {item}")\n\n# ===== THE PLAN (this is what runs) =====\nopening()\n\n# STEP 2: ask the player to choose. Use .lower() to be kind about capitals.\nchoice = \n\n# STEP 3: send them to ending_cave() or ending_river()\n\n\n# STEP 4: add one item to the backpack, then show it\n\nshow_backpack()\n',
        stdin: ['cave', 'lantern'],
        hints: [
          'STEP 2: choice = input("Do you go to the cave or the river? ").lower()',
          'STEP 3: if choice == "cave": then an indented ending_cave(), then else: and ending_river()',
          'STEP 4: found = input("You spot something useful. Take what? ") then backpack.append(found)'
        ],
        requires: [
          { text: 'append', message: 'STEP 4 needs the item added to the backpack with append.' },
          { text: 'if', message: 'STEP 3 needs an if to choose between the two endings.' }
        ],
        checks: [
          { mode: 'contains', expect: 'crystal', message: 'Choosing "cave" should reach the cave ending.' },
          { mode: 'contains', expect: 'lantern', message: 'The item picked up should appear in the backpack.' },
          {
            mode: 'minlines', expect: 7,
            message: 'Expected an opening, a question, an ending and the backpack. Is STEP 1 still empty?'
          }
        ]
      },
      simpler: {
        label: 'Simpler Version',
        brief:
          'Finish the opening, the one choice and the two endings. <b>Leave the backpack out</b> — it is already removed for you.',
        starter:
          '# ===== MINI ADVENTURE (simpler) =====\ndef opening():\n    print("You wake in a quiet forest.")\n    print("A cave and a river lie ahead.")\n\ndef ending_cave():\n    print("Deep in the cave you find a glowing crystal.")\n\ndef ending_river():\n    print("At the river you meet a talkative frog.")\n\n# ===== THE PLAN =====\nopening()\n\n# STEP 1: ask which way they go\nchoice = \n\n# STEP 2: if / else to call the right ending\n',
        stdin: ['cave'],
        hints: [
          'STEP 1: choice = input("Cave or river? ").lower()',
          'STEP 2 starts: if choice == "cave":',
          'Then an indented ending_cave(), then else: and an indented ending_river().'
        ],
        requires: [{ text: 'if', message: 'You need an if to pick between the endings.' }],
        checks: [
          { mode: 'contains', expect: 'crystal', message: 'Choosing "cave" should reach the cave ending.' }
        ]
      },
      extra: {
        label: 'Extra Challenge',
        brief:
          'Add a <b>third</b> ending with <code>elif</code>, or a <b>second</b> collectable item picked up on one of the paths.'
      },
      quickCheck:
        'Run the program after <b>every</b> marked step. If a step breaks it, undo just that step and try again — do not pile the next change on top.'
    }
  ]
};
