// WEEK 4 — Mystery Door Challenge
// Choices and random numbers
export default {
  day: 4,
  title: 'Mystery Door Challenge',
  subtitle: 'Choices and random numbers',
  emoji: '🎲',
  color: '#e0457b',
  badge: '🗝️',
  badgeName: 'Door Opener',
  bigIdea: 'The computer can pick a secret number nobody knows in advance. Compare the player\'s choice with that secret and you have a game.',
  byTheEnd: 'Mix a player\'s choice with a random computer choice, without piling on extra game rules.',
  nextWeek: 'Next week, a loop will make the turtle repeat its movements.',
  tasks: [
    /* ------------------------------------------------------------- 4.1 */
    {
      key: 'w4-1',
      type: 'lesson',
      title: 'Letting the computer choose',
      xp: 10,
      minutes: 12,
      blocks: [
        { t: 'p', html: 'Three doors. One hides treasure. The computer picks which one — and it picks a different one almost every time you run it. Press Run a few times.' },
        {
          t: 'code',
          run: true,
          stdin: ['2'],
          code: 'import random\n\ntreasure = random.randint(1, 3)\n\nprint("Three doors stand before you.")\nchoice = int(input("Which door: 1, 2 or 3? "))\n\nif choice == treasure:\n    print("Gold! You chose well.")\nelse:\n    print(f"Empty. The treasure was behind door {treasure}.")'
        },

        { t: 'h', text: 'import — borrowing extra tools' },
        { t: 'p', html: 'Python does not know how to be random on its own. <code>import random</code> fetches a toolbox called <b>random</b>. The import line goes at the very top of your program.' },

        { t: 'h', text: 'random.randint' },
        { t: 'p', html: '<code>random.randint(1, 3)</code> means "pick a whole number from 1 to 3". Both ends are included, so 1, 2 and 3 are all possible.' },
        { t: 'code', code: 'import random\n\nprint(random.randint(1, 3))\nprint(random.randint(1, 3))\nprint(random.randint(1, 6))\nprint(random.randint(1, 100))', run: true },
        { t: 'p', html: 'Run that several times. The numbers change every single time — that is the whole point.' },
        { t: 'tip', html: 'Read the dot as "from". <code>random.randint</code> means "the randint tool, from the random toolbox".' },

        { t: 'h', text: 'Keeping the secret' },
        { t: 'p', html: 'Store the random number in a variable so you can compare against it later.' },
        { t: 'code', code: 'import random\n\nsecret = random.randint(1, 3)\nprint("I have picked a secret door.")\nprint(f"(Peeking: it was {secret})")', run: true },

        { t: 'h', text: 'The trap: numbers versus words' },
        { t: 'p', html: '<code>random.randint</code> gives you a real <b>number</b>. <code>input</code> gives you <b>words</b>. Compare them directly and it will never match — no error, no warning, just a game you can never win.' },
        { t: 'code', code: 'secret = 2\nchoice = "2"\n\nprint(choice == secret)\nprint(int(choice) == secret)', run: true, output: 'False\nTrue' },
        { t: 'warn', html: 'This is a <b>silent</b> bug — Python does not complain, the game just always says you lost. Wrap the player\'s answer in <code>int()</code> and both sides become numbers.' },
        { t: 'code', code: 'import random\n\nsecret = random.randint(1, 3)\nchoice = int(input("Pick 1, 2 or 3: "))\n\nif choice == secret:\n    print("Correct!")\nelse:\n    print(f"No - it was {secret}.")', run: true, stdin: ['2'] },

        { t: 'h', text: 'A tester\'s trick' },
        { t: 'p', html: 'When a game is not behaving, temporarily print the secret so you can see what is going on. Delete that line once it works.' },
        { t: 'code', code: 'import random\n\nsecret = random.randint(1, 3)\nprint(f"TEST - secret is {secret}")   # delete me later\nprint("Now play the game...")', run: true }
      ]
    },

    /* ------------------------------------------------------------- 4.2 */
    {
      key: 'w4-2',
      type: 'blanks',
      title: 'Random pieces',
      xp: 20,
      minutes: 10,
      intro: 'Complete each line so the random game works.',
      items: [
        {
          prompt: 'Fetch the random toolbox.',
          code: '[[1]] random',
          blanks: [{ id: 1, accept: ['import'], hint: 'The word that borrows a toolbox.' }]
        },
        {
          prompt: 'Pick a whole number from 1 to 3.',
          code: 'secret = random.[[1]](1, 3)',
          blanks: [{ id: 1, accept: ['randint'], hint: 'Short for "random integer".' }]
        },
        {
          prompt: 'Pick a number from 1 to 6, like a dice.',
          code: 'roll = random.randint(1, [[1]])',
          blanks: [{ id: 1, accept: ['6'], hint: 'The highest number on a dice.' }]
        },
        {
          prompt: 'Make the player\'s answer a real number so it can match.',
          code: 'choice = [[1]](input("Which door? "))',
          blanks: [{ id: 1, accept: ['int'], hint: 'Without it the answer stays as words and never matches.' }]
        },
        {
          prompt: 'Compare the choice with the secret.',
          code: 'if choice [[1]] secret:\n    print("You win!")',
          blanks: [{ id: 1, accept: ['=='], hint: 'Two equal signs ask a question.' }]
        },
        {
          prompt: 'Reveal the answer in the losing message.',
          code: 'else:\n    print(f"It was door [[1]]")',
          blanks: [{ id: 1, accept: ['{secret}'], hint: 'The box name in curly brackets.' }]
        }
      ]
    },

    /* ------------------------------------------------------------- 4.3 */
    {
      key: 'w4-3',
      type: 'quiz',
      title: 'Random quiz',
      xp: 20,
      minutes: 8,
      questions: [
        {
          q: 'What can <code>random.randint(1, 3)</code> give you?',
          options: ['1 or 2', '1, 2 or 3', '0, 1, 2 or 3', 'Any number at all'],
          answer: 1,
          why: 'randint includes both ends, so 1, 2 and 3 are all possible.'
        },
        {
          q: 'Where does <code>import random</code> go?',
          options: [
            'At the very top of the program',
            'Right before you win',
            'Inside the if',
            'At the bottom'
          ],
          answer: 0,
          why: 'Imports go at the top so the toolbox is ready before you use it.'
        },
        {
          q: 'Why does <code>if choice == secret</code> never match when choice came from input?',
          options: [
            'Because random numbers are broken',
            'Because choice is words and secret is a number',
            'Because you need three equals signs',
            'Because randint starts at 0'
          ],
          answer: 1,
          why: 'input gives words. Wrap it in int() so both sides are numbers.'
        },
        {
          q: 'What is unusual about this bug?',
          options: [
            'It shows a big red error',
            'There is no error at all — the game just always says you lost',
            'It stops the program',
            'It only happens on Fridays'
          ],
          answer: 1,
          why: 'Silent bugs are the tricky kind. The code runs, it is just always wrong.'
        },
        {
          q: 'How can you check what the secret number was while testing?',
          options: [
            'You cannot',
            'Temporarily print it, then delete that line',
            'Run the program twice',
            'Ask the player'
          ],
          answer: 1,
          why: 'A temporary test print is a normal, useful debugging move.'
        }
      ]
    },

    /* ------------------------------------------------------------- 4.4 */
    {
      key: 'w4-4',
      type: 'debug',
      title: 'Bug hunt: the game you can never win',
      xp: 25,
      minutes: 12,
      brief:
        'This game <b>never says you won</b>, even when you pick the right door. There is no red error message — the logic is just wrong.<br><br>The secret door here is always 2, and the test answer is 2, so it <i>should</i> say you won.',
      starter:
        '# Mystery door - BROKEN (secret fixed at 2 for testing)\nsecret = 2\n\nprint("Three doors stand before you.")\nchoice = int(input("Which door: 1, 2 or 3? "))\n\nif choice == "2":\n    print("Gold! You chose well.")\nelse:\n    print(f"Empty. The treasure was behind door {secret}.")\n',
      stdin: ['2'],
      hints: [
        'Look at the if line. Are both sides the same kind of thing — both words, or both numbers?',
        'The player\'s choice was already turned into a number with int(). What is it being compared against?',
        'Compare against the number 2, not the word "2". Remove the quote marks.'
      ],
      requires: [
        { text: 'int(', message: 'Keep int() on the player\'s answer.' }
      ],
      checks: [
        { mode: 'contains', expect: 'Gold', message: 'Choosing door 2 should win when the secret is 2.' },
        { mode: 'notcontains', expect: 'Empty', message: 'The losing message should not appear on a winning choice.' }
      ],
      understand:
        'Point to the line where the secret is made. Then say what the player sees when they choose wrongly.'
    },

    /* ------------------------------------------------------------- 4.5 */
    {
      key: 'w4-5',
      type: 'mission',
      title: 'Mystery Door Challenge',
      xp: 45,
      minutes: 35,
      main: {
        brief:
          'The player picks door <b>1, 2 or 3</b>. The computer secretly picks the treasure door. A match wins; any other choice loses and <b>reveals</b> where the treasure really was.',
        checklist: [
          'import random at the top',
          'A secret door picked with random.randint(1, 3)',
          'The player asked to choose, with their answer turned into a number',
          'An if that compares choice with the secret',
          'A losing message that reveals the correct door'
        ],
        starter:
          '# Mystery Door Challenge\nimport random\n\nsecret = random.randint(1, 3)\n\nprint("Three ancient doors stand before you.")\n# Ask the player to choose - remember int()\nchoice = \n\n# Compare, then win or lose\n',
        stdin: ['2'],
        hints: [
          'choice = int(input("Which door: 1, 2 or 3? "))',
          'The if line compares two numbers: if choice == secret:',
          'The else message can reveal it: print(f"It was door {secret}.")'
        ],
        requires: [
          { text: 'random.randint', message: 'The secret door must be chosen randomly.' },
          { text: 'int(', message: 'The player\'s answer needs int() or it will never match.' },
          { text: '==', message: 'You need == to compare the choice with the secret.' },
          { text: 'else', message: 'You need an else for when the player is wrong.' }
        ],
        checks: [
          { mode: 'minlines', expect: 3, message: 'Expected the scene, the question and a result message.' },
          {
            mode: 'regex', expect: '(gold|win|treasure|found|correct|empty|wrong|sorry|no)',
            message: 'The player should be told clearly whether they won or lost.'
          }
        ]
      },
      simpler: {
        label: 'Simpler Version',
        brief:
          'The random line is written for you. Add the <b>question</b> and <b>one winning message</b> and <b>one losing message</b>. No need to reveal the door.',
        starter:
          '# Mystery Door - simpler\nimport random\n\nsecret = random.randint(1, 3)\n\nprint("Three doors stand before you.")\nchoice = int(input("Which door: 1, 2 or 3? "))\n\nif choice == secret:\n    print("")\nelse:\n    print("")\n',
        stdin: ['2'],
        hints: [
          'Write your winning message inside the first pair of empty quote marks.',
          'Write your losing message inside the second pair.',
          'Keep the 4 spaces at the start of both print lines.'
        ],
        requires: [{ text: '==', message: 'Keep the comparison line.' }],
        checks: [
          {
            mode: 'minlines', expect: 3,
            message: 'One of your messages is still empty — write something inside the quote marks.'
          }
        ]
      },
      extra: {
        label: 'Extra Challenge',
        brief:
          'Use <code>elif</code> so the <b>two losing doors get different messages</b> — perhaps one is empty and one has a funny trap.'
      },
      quickCheck:
        'Temporarily add <code>print(secret)</code> near the top so you can see the answer. Play a few rounds, check it behaves — then <b>delete that line</b>.'
    }
  ]
};
