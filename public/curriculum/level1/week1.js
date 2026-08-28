// WEEK 1 — My First Silly Story
// Showing words, saving words and asking questions
export default {
  day: 1,
  title: 'My First Silly Story',
  subtitle: 'Showing words, saving words and asking questions',
  emoji: '📖',
  color: '#ff8a3d',
  badge: '🗣️',
  badgeName: 'Story Maker',
  bigIdea: 'Python can show words on the screen, remember answers, and ask you questions. Put those three together and the computer can tell a story about you.',
  byTheEnd: 'Run code successfully, change text, collect three answers and show a personalised two-sentence story.',
  nextWeek: 'Next week, Python will use numbers to make a player power score.',
  tasks: [
    /* ------------------------------------------------------------- 1.1 */
    {
      key: 'w1-1',
      type: 'lesson',
      title: 'Words, boxes and questions',
      xp: 10,
      minutes: 12,
      blocks: [
        { t: 'p', html: 'Here is the thing you are going to build today. Press <b>▶ Run</b> and watch what happens.' },
        {
          t: 'code',
          run: true,
          code: 'name = input("What is your name? ")\nplace = input("Name a place: ")\nthing = input("Name an object: ")\n\nprint(f"One morning {name} woke up inside a {place}.")\nprint(f"Luckily, {name} had packed a {thing}.")'
        },
        { t: 'p', html: 'The questions answer themselves in this box — we will get to why in a minute. By the end of this week you will have built that, with your own story.' },

        { t: 'h', text: '1. print — showing words' },
        { t: 'p', html: '<code>print</code> means "show this on the screen". What you want to show goes inside the round brackets, wrapped in quote marks.' },
        { t: 'code', code: 'print("Hello!")\nprint("I am learning Python")', run: true },
        { t: 'p', html: 'Each <code>print</code> gets its own line. Two prints, two lines.' },

        { t: 'h', text: '2. Variables — boxes that remember' },
        { t: 'p', html: 'A <b>variable</b> is a named box. You put something in it, and Python remembers it for later.' },
        { t: 'code', code: 'name = "Sam"\nprint(name)', run: true, output: 'Sam' },
        { t: 'p', html: 'Read the <code>=</code> as <b>"put into"</b>, not as "equals". <code>name = "Sam"</code> means <i>put "Sam" into the box called name</i>.' },
        { t: 'warn', html: 'Notice line 2 has <b>no quote marks</b> around <code>name</code>. With quotes you get the word "name". Without quotes you get what is inside the box.' },
        { t: 'code', code: 'name = "Sam"\nprint("name")\nprint(name)', run: true, output: 'name\nSam' },

        { t: 'h', text: '3. input — asking a question' },
        { t: 'p', html: '<code>input</code> asks the person a question and hands back whatever they type. You almost always catch that answer in a variable.' },
        { t: 'code', code: 'colour = input("What is your favourite colour? ")\nprint(colour)', run: true },
        { t: 'tip', html: 'In this app the answers are typed in for you so your code can be checked automatically. On a real computer a box would appear and wait for you.' },

        { t: 'h', text: '4. f-strings — putting boxes inside sentences' },
        { t: 'p', html: 'This is the trick that makes stories work. Put the letter <code>f</code> just before the opening quote mark, and then you can drop variables into the sentence inside <b>curly brackets</b> <code>{ }</code>.' },
        { t: 'code', code: 'name = "Sam"\nprint(f"Hello, {name}!")', run: true, output: 'Hello, Sam!' },
        { t: 'p', html: 'Python swaps <code>{name}</code> for what is in the box. Everything else stays exactly as you typed it.' },
        { t: 'code', code: 'hero = "Ada"\nplace = "volcano"\nprint(f"{hero} climbed down into the {place}.")\nprint(f"It was hot, so {hero} left quickly.")', run: true },
        { t: 'warn', html: 'Forget the <code>f</code> and Python prints the curly brackets exactly as written. Try deleting it above and running again — then put it back.' },
        { t: 'tip', html: 'Three things make a story: <b>ask</b> with input, <b>remember</b> with a variable, <b>show</b> with an f-string.' }
      ]
    },

    /* ------------------------------------------------------------- 1.2 */
    {
      key: 'w1-2',
      type: 'blanks',
      title: 'Fill in the story machine',
      xp: 20,
      minutes: 10,
      intro: 'Each program is missing one piece. Type the missing piece into the gap.',
      items: [
        {
          prompt: 'Show the words <b>Hello!</b> on the screen.',
          code: '[[1]]("Hello!")',
          blanks: [{ id: 1, accept: ['print'], hint: 'The instruction that shows things. All lowercase.' }]
        },
        {
          prompt: 'Put the word <b>Ada</b> into a box called <code>hero</code>.',
          code: 'hero [[1]] "Ada"',
          blanks: [{ id: 1, accept: ['='], hint: 'One symbol that means "put into".' }]
        },
        {
          prompt: 'Ask a question and keep the answer in <code>pet</code>.',
          code: 'pet = [[1]]("What pet would you like? ")',
          blanks: [{ id: 1, accept: ['input'], hint: 'The instruction that asks the person a question.' }]
        },
        {
          prompt: 'Print what is <b>inside</b> the box — not the word "hero".',
          code: 'hero = "Ada"\nprint([[1]])',
          blanks: [{ id: 1, accept: ['hero'], hint: 'The box name, with no quote marks around it.' }]
        },
        {
          prompt: 'Turn this into an f-string so the name appears.',
          code: 'name = "Sam"\nprint([[1]]"Hello, {name}!")',
          blanks: [{ id: 1, accept: ['f'], hint: 'One single letter, right before the quote mark.' }]
        },
        {
          prompt: 'Drop the <code>place</code> box into the sentence.',
          code: 'place = "cave"\nprint(f"We slept in a [[1]] that night.")',
          blanks: [{ id: 1, accept: ['{place}'], hint: 'The box name wrapped in curly brackets.' }]
        }
      ]
    },

    /* ------------------------------------------------------------- 1.3 */
    {
      key: 'w1-3',
      type: 'quiz',
      title: 'Do you understand it?',
      xp: 20,
      minutes: 8,
      questions: [
        {
          q: 'What does <code>input()</code> do?',
          options: [
            'Asks the person a question and gives back what they type',
            'Prints words on the screen',
            'Makes the program run faster',
            'Deletes a variable'
          ],
          answer: 0,
          why: 'input() asks, then hands the answer back so you can put it in a variable.'
        },
        {
          q: 'What does this print?<pre>food = "toast"\nprint("food")</pre>',
          options: ['toast', 'food', 'An error', 'Nothing'],
          answer: 1,
          why: 'The quote marks mean Python shows the word "food" itself, not what is in the box.'
        },
        {
          q: 'What does this print?<pre>food = "toast"\nprint(f"I ate {food}")</pre>',
          options: ['I ate {food}', 'I ate food', 'I ate toast', 'An error'],
          answer: 2,
          why: 'The f lets Python swap {food} for what is inside the box.'
        },
        {
          q: 'Which line is missing something important?',
          options: [
            'print(f"Hi {name}")',
            'print("Hi there")',
            'print("Hi {name}")',
            'name = input("Name? ")'
          ],
          answer: 2,
          why: 'Without the f, Python prints the curly brackets exactly as typed.'
        },
        {
          q: 'In <code>place = input("Where? ")</code>, what ends up inside <code>place</code>?',
          options: [
            'The words "Where?"',
            'Whatever the person typed',
            'The word input',
            'Nothing until you print it'
          ],
          answer: 1,
          why: 'The question is only shown on screen. What gets saved is the answer.'
        }
      ]
    },

    /* ------------------------------------------------------------- 1.4 */
    {
      key: 'w1-4',
      type: 'debug',
      title: 'Bug hunt: the name that does not exist',
      xp: 25,
      minutes: 12,
      brief:
        'This story should work, but it crashes. Run it, <b>read the last line of the red message</b>, then fix it.<br><br>Change as little as possible — there is exactly one thing wrong.',
      starter:
        '# Silly story - BROKEN\nname = input("What is your name? ")\nplace = input("Name a place: ")\n\nprint(f"One day {name} got lost in a {place_name}.")\nprint(f"It took {name} an hour to find the way out.")\n',
      stdin: ['Ada', 'jungle'],
      hints: [
        'Read the last line of the error message. It names something Python has never heard of.',
        'Compare the box names letter by letter. Which name was created, and which name was used?',
        'The box was created as place, but the story asks for place_name. Change place_name to place.'
      ],
      requires: [
        { text: 'input', message: 'Keep both input questions in the program.' }
      ],
      checks: [
        {
          mode: 'contains',
          expect: 'lost in a jungle',
          message: 'It should say "lost in a jungle" — the place box is not reaching the sentence yet.'
        },
        {
          mode: 'notcontains',
          expect: 'place_name',
          message: 'The words place_name should not appear in the output any more.'
        }
      ],
      understand: 'Explain in your own words what <code>input()</code> does, then change one of the questions without help.'
    },

    /* ------------------------------------------------------------- 1.5 */
    {
      key: 'w1-5',
      type: 'mission',
      title: 'My First Silly Story',
      xp: 45,
      minutes: 35,
      main: {
        brief:
          'Build a silly story that asks <b>three</b> questions — a name, a place and an object — then prints <b>two complete sentences</b> using all three answers.',
        checklist: [
          'Three input questions: a name, a place and an object',
          'Each answer saved in its own variable',
          'Two print lines, both f-strings',
          'The name appears in both sentences',
          'The place and the object each appear somewhere'
        ],
        starter:
          '# My Silly Story\n# Made by: (put your name here)\n\nname = input("What is your name? ")\nplace = input("Name a place: ")\nthing = input("Name an object: ")\n\n# Sentence 1 - use name and place\nprint(f"")\n\n# Sentence 2 - use name and thing\nprint(f"")\n',
        stdin: ['Ada', 'jungle', 'torch'],
        hints: [
          'Both sentences start with print(f" and end with ").',
          'Put each box name inside curly brackets: {name}, {place}, {thing}.',
          'Sentence 1 could be: print(f"One day {name} got lost in a {place}.")'
        ],
        requires: [
          { text: 'input', message: 'You still need your input questions.' },
          { text: 'f"', message: 'Both sentences should be f-strings — they start with f".' }
        ],
        checks: [
          { mode: 'minlines', expect: 5, message: 'Expected the three questions plus two story sentences.' },
          { mode: 'contains', expect: 'Ada', message: 'The name answer is not appearing in your story yet.' },
          { mode: 'contains', expect: 'jungle', message: 'The place answer is not appearing in your story yet.' },
          { mode: 'contains', expect: 'torch', message: 'The object answer is not appearing in your story yet.' }
        ]
      },
      simpler: {
        label: 'Simpler Version',
        brief:
          'Use <b>two</b> questions — a name and a place — and print <b>one</b> silly sentence that uses both.',
        starter:
          '# My Silly Story - simpler\nname = input("What is your name? ")\nplace = input("Name a place: ")\n\n# One sentence using both boxes\nprint(f"")\n',
        stdin: ['Ada', 'jungle'],
        hints: [
          'One print line is enough.',
          'It must start with print(f" so the curly brackets work.',
          'Try: print(f"{name} fell asleep in a {place}.")'
        ],
        requires: [{ text: 'f"', message: 'The sentence should be an f-string — it starts with f".' }],
        checks: [
          // The two questions echo the answers, so `contains` alone would pass
          // an empty sentence. minlines forces a third, written line.
          {
            mode: 'minlines', expect: 3,
            message: 'Your sentence is still empty — write it inside the quote marks.'
          },
          { mode: 'contains', expect: 'Ada', message: 'The name is not appearing in your sentence yet.' },
          { mode: 'contains', expect: 'jungle', message: 'The place is not appearing in your sentence yet.' }
        ]
      },
      extra: {
        label: 'Extra Challenge',
        brief:
          'Add a <b>fourth</b> question of your own — a colour, an animal, a food, anything — and use that answer in one of your sentences.'
      },
      quickCheck:
        'Change only the <b>place</b> answer and run it again. Point to the line responsible for the part of the story that changed.'
    }
  ]
};
