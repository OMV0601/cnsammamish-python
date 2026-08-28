// WEEK 3 — Choose-a-Path Story
// Making choices with if and else
export default {
  day: 3,
  title: 'Choose-a-Path Story',
  subtitle: 'Making choices with if and else',
  emoji: '🚪',
  color: '#7c5cff',
  badge: '🔀',
  badgeName: 'Path Finder',
  bigIdea: 'An if line asks a yes-or-no question. The answer decides which lines of code run and which are skipped.',
  byTheEnd: 'Understand that an if line asks a yes-or-no question and chooses which code runs.',
  nextWeek: 'Next week, Python will choose something randomly.',
  tasks: [
    /* ------------------------------------------------------------- 3.1 */
    {
      key: 'w3-1',
      type: 'lesson',
      title: 'Making the computer decide',
      xp: 10,
      minutes: 12,
      blocks: [
        { t: 'p', html: 'Two doors. One choice. Two completely different endings. Run this, then come back and read how it works.' },
        {
          t: 'code',
          run: true,
          stdin: ['left'],
          code: 'print("A dark corridor splits in two.")\nchoice = input("Go left or right? ").lower()\n\nif choice == "left":\n    print("You find a sleeping dragon. It snores gently.")\nelse:\n    print("You find a room full of cheese. Odd, but nice.")'
        },

        { t: 'h', text: 'Asking a question with ==' },
        { t: 'p', html: 'One equals sign <b>puts something in a box</b>. Two equals signs <b>ask a question</b>: are these the same?' },
        { t: 'code', code: 'print(5 == 5)\nprint(5 == 9)\nprint("cat" == "cat")\nprint("cat" == "dog")', run: true, output: 'True\nFalse\nTrue\nFalse' },
        { t: 'p', html: '<code>True</code> and <code>False</code> are Python\'s two answers to a yes-or-no question.' },
        { t: 'warn', html: 'Mixing these up is the most common mistake in the whole course. <code>=</code> puts in. <code>==</code> asks. Say it out loud a few times.' },

        { t: 'h', text: 'The shape of an if' },
        { t: 'p', html: 'An <code>if</code> has three parts that must all be right:' },
        { t: 'list', items: [
          'The word <code>if</code>, then the question.',
          'A <b>colon</b> <code>:</code> at the end of the line.',
          'The lines underneath pushed in by <b>4 spaces</b>. That pushing-in is called <b>indentation</b>.'
        ] },
        { t: 'code', code: 'age = 10\n\nif age == 10:\n    print("You are ten!")\n    print("Both of these lines are indented.")\n\nprint("This line is not indented, so it always runs.")', run: true },
        { t: 'p', html: 'The indentation is how Python knows which lines belong to the <code>if</code>. It is not decoration — it changes what the program does.' },

        { t: 'h', text: 'else — what to do otherwise' },
        { t: 'p', html: '<code>else</code> catches everything the <code>if</code> did not.' },
        { t: 'code', code: 'weather = "rain"\n\nif weather == "sun":\n    print("Wear sunglasses.")\nelse:\n    print("Take an umbrella.")', run: true, output: 'Take an umbrella.' },
        { t: 'p', html: 'Exactly one of those two prints runs. Never both, never neither.' },

        { t: 'h', text: 'elif — a third option' },
        { t: 'p', html: 'Need more than two paths? <code>elif</code> means "or else, if...". You can have as many as you like.' },
        { t: 'code', code: 'door = "green"\n\nif door == "red":\n    print("Hot to the touch.")\nelif door == "green":\n    print("It creaks open.")\nelse:\n    print("Nothing happens.")', run: true, output: 'It creaks open.' },

        { t: 'h', text: 'Being kind about capital letters' },
        { t: 'p', html: '<code>"Left"</code> and <code>"left"</code> are not the same to Python. <code>.lower()</code> makes an answer all lowercase, so the player can type it however they like.' },
        { t: 'code', code: 'answer = "LEFT"\nprint(answer.lower())', run: true, output: 'left' },
        { t: 'tip', html: 'You do not need to understand <code>.lower()</code> deeply yet. Just put it on the end of your input line and it makes your story friendlier.' }
      ]
    },

    /* ------------------------------------------------------------- 3.2 */
    {
      key: 'w3-2',
      type: 'blanks',
      title: 'Build the if',
      xp: 20,
      minutes: 10,
      intro: 'Each if is missing a piece. Watch the colons and the spacing.',
      items: [
        {
          prompt: 'Ask whether the door is red.',
          code: 'if door [[1]] "red":\n    print("Hot!")',
          blanks: [{ id: 1, accept: ['=='], hint: 'A check uses two equal signs.' }]
        },
        {
          prompt: 'Something is missing at the end of the if line.',
          code: 'if name == "Ada"[[1]]\n    print("Hello Ada")',
          blanks: [{ id: 1, accept: [':'], hint: 'if, else, elif, for, while and def all end their line with this.' }]
        },
        {
          prompt: 'The print must be pushed in so it belongs to the if. Type 4 spaces.',
          code: 'if score == 10:\n[[1]]print("Perfect!")',
          blanks: [{ id: 1, accept: ['    '], hint: 'Press the space bar four times.' }]
        },
        {
          prompt: 'Catch every other answer.',
          code: 'if choice == "left":\n    print("Dragon!")\n[[1]]:\n    print("Cheese!")',
          blanks: [{ id: 1, accept: ['else'], hint: 'The word that means "otherwise".' }]
        },
        {
          prompt: 'Add a third path for green.',
          code: 'if door == "red":\n    print("Hot")\n[[1]] door == "green":\n    print("Creaky")\nelse:\n    print("Nothing")',
          blanks: [{ id: 1, accept: ['elif'], hint: 'Short for "else if" — four letters.' }]
        },
        {
          prompt: 'Accept LEFT, Left or left.',
          code: 'choice = input("Which way? ").[[1]]',
          blanks: [{ id: 1, accept: ['lower()'], hint: 'Makes the answer all small letters. Do not forget the brackets.' }]
        }
      ]
    },

    /* ------------------------------------------------------------- 3.3 */
    {
      key: 'w3-3',
      type: 'quiz',
      title: 'if quiz',
      xp: 20,
      minutes: 8,
      questions: [
        {
          q: 'What is the difference between <code>=</code> and <code>==</code>?',
          options: [
            'They are the same thing',
            '= puts a value into a box; == asks whether two things are the same',
            '= is for numbers; == is for words',
            '== is faster'
          ],
          answer: 1,
          why: 'One equals puts in. Two equals asks a question.'
        },
        {
          q: 'What does this print?<pre>x = 3\nif x == 3:\n    print("A")\nelse:\n    print("B")</pre>',
          options: ['A', 'B', 'Both A and B', 'Nothing'],
          answer: 0,
          why: 'x really is 3, so the if branch runs and else is skipped.'
        },
        {
          q: 'Why must the line after <code>if ...:</code> be indented?',
          options: [
            'It just looks tidier',
            'It tells Python which lines belong to the if',
            'Python does not care about spaces',
            'To make the file smaller'
          ],
          answer: 1,
          why: 'Indentation is how Python groups lines. It changes what runs.'
        },
        {
          q: 'How many of the branches run in an if / elif / else?',
          options: ['All of them', 'Exactly one', 'None unless it is True', 'Two'],
          answer: 1,
          why: 'Python takes the first one that is True and skips the rest.'
        },
        {
          q: 'A player types <code>LEFT</code> but the code checks <code>== "left"</code>. What happens?',
          options: [
            'It matches — Python ignores capitals',
            'It does not match, so else runs',
            'The program crashes',
            'Python asks again'
          ],
          answer: 1,
          why: 'Capitals matter. That is exactly why .lower() is useful.'
        }
      ]
    },

    /* ------------------------------------------------------------- 3.4 */
    {
      key: 'w3-4',
      type: 'debug',
      title: 'Bug hunt: one equals too few',
      xp: 25,
      minutes: 12,
      brief:
        'This story should have two endings, but something is wrong with the <code>if</code> line. Run it and read the red message carefully.',
      starter:
        '# Choose-a-path - BROKEN\nprint("You reach two doors.")\nchoice = input("Red door or blue door? ").lower()\n\nif choice = "red":\n    print("Warm air rushes out.")\nelse:\n    print("You hear water dripping.")\n',
      stdin: ['red'],
      hints: [
        'Look hard at the if line. Is it saving a value, or checking one?',
        'A check needs two equal signs, not one.',
        'Replace = with == so the line reads: if choice == "red":'
      ],
      requires: [
        { text: 'else', message: 'Keep the else branch.' }
      ],
      checks: [
        { mode: 'contains', expect: 'Warm air', message: 'With the answer "red" it should reach the red ending.' },
        { mode: 'notcontains', expect: 'dripping', message: 'Only one ending should print, not both.' }
      ],
      understand:
        'Say what will happen for the answer "red" and for the answer "blue". Then break it on purpose by removing the colon, read that error, and fix it again.'
    },

    /* ------------------------------------------------------------- 3.5 */
    {
      key: 'w3-5',
      type: 'mission',
      title: 'Choose-a-Path Story',
      xp: 45,
      minutes: 35,
      main: {
        brief:
          'Write a story with <b>one real choice</b> and <b>two different endings</b>. Your program must respond sensibly to the expected answer <i>and</i> to anything else the player types.',
        checklist: [
          'An opening that sets the scene',
          'One input asking the player to choose',
          'An if that checks their choice with ==',
          'An else for every other answer',
          'Two endings that are genuinely different'
        ],
        starter:
          '# Choose-a-Path Story\nprint("Your story opening goes here.")\nprint("Something interesting happens...")\n\nchoice = input("Your question? ").lower()\n\nif choice == "":\n    print("Ending one")\nelse:\n    print("Ending two")\n',
        stdin: ['left'],
        hints: [
          'Fill the quote marks on the if line with the answer you are checking for.',
          'Make sure the lines under if and under else are pushed in by 4 spaces.',
          'Both endings should be more than one word — tell the player what happened.'
        ],
        requires: [
          { text: '==', message: 'Your if line needs == to check the answer.' },
          { text: 'else', message: 'You need an else so every other answer is handled.' },
          { text: 'input', message: 'The player has to be asked something.' }
        ],
        checks: [
          { mode: 'minlines', expect: 4, message: 'Expected an opening, the question and an ending.' },
          {
            mode: 'notcontains', expect: 'Ending one',
            message: 'Replace the placeholder endings with your own writing.'
          },
          {
            mode: 'notcontains', expect: 'Your story opening goes here',
            message: 'Replace the placeholder opening with your own story.'
          }
        ]
      },
      simpler: {
        label: 'Simpler Version',
        brief:
          'The opening and the choice are already written for you. Your job: write the <b>two endings</b> so they are different and interesting.',
        starter:
          '# Choose-a-Path Story - simpler\nprint("A cold wind blows through the old castle.")\nprint("You find two doors: one red, one blue.")\n\nchoice = input("Red or blue? ").lower()\n\nif choice == "red":\n    print("")\nelse:\n    print("")\n',
        stdin: ['red'],
        hints: [
          'Type your ending inside the empty quote marks.',
          'Keep the 4 spaces at the start of each print line.',
          'Make the two endings clearly different from each other.'
        ],
        requires: [{ text: 'else', message: 'Keep the else branch.' }],
        checks: [
          {
            mode: 'minlines', expect: 4,
            message: 'The ending for that answer is still empty — write a sentence inside the quote marks.'
          }
        ]
      },
      extra: {
        label: 'Extra Challenge',
        brief:
          'Add an <code>elif</code> so there is a <b>third</b> named choice with its own ending — three paths instead of two.'
      },
      quickCheck:
        'Test <b>both</b> paths. Then point at your if line and read it aloud as a question, starting with the word "Is".'
    }
  ]
};
