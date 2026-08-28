// WEEK 12 — Test, Improve & Share
// Testing, fixing, improving and explaining
export default {
  day: 12,
  title: 'Test, Improve & Share',
  subtitle: 'Testing, fixing, improving and explaining',
  emoji: '🎓',
  color: '#e0457b',
  badge: '🏆',
  badgeName: 'Level 1 Graduate',
  bigIdea: 'A program is not finished when it works once, for you. It is finished when it works for someone else — and you can explain how.',
  byTheEnd: 'Finish a project that works, make one change without help, and explain what your code does.',
  nextWeek: 'That is Level 1 complete. Level 2 brings bigger games, new ways to store information, and projects you design yourself.',
  tasks: [
    /* ------------------------------------------------------------ 12.1 */
    {
      key: 'w12-1',
      type: 'lesson',
      title: 'The bug-fixing routine',
      xp: 10,
      minutes: 12,
      blocks: [
        { t: 'p', html: 'You have been doing this all term. This week we make it official — a routine you can follow every single time something breaks, without panicking.' },

        { t: 'h', text: 'The five steps' },
        { t: 'list', items: [
          '<b>1.</b> Read the <b>last line</b> of the red message. That is the actual problem; everything above it is just the trail leading there.',
          '<b>2.</b> Find the <b>line number</b> it names, and go to that line.',
          '<b>3.</b> Check the usual suspects: <b>spelling</b>, <b>quote marks</b>, <b>colons</b>, <b>spacing</b>.',
          '<b>4.</b> Change <b>one</b> thing. Run it again.',
          '<b>5.</b> Still stuck? Go back to the last version that worked.'
        ] },

        { t: 'h', text: 'The errors you have met' },
        { t: 'p', html: 'You already know all of these. Run each one and read what Python says.' },
        { t: 'code', code: 'print(hello)', run: true },
        { t: 'p', html: '<b>NameError</b> — a name Python has never seen. Usually a typo, or missing quote marks around text.' },
        { t: 'code', code: 'print("Score: " + 10)', run: true },
        { t: 'p', html: '<b>TypeError</b> — mixing words and numbers with <code>+</code>. Use an f-string.' },
        { t: 'code', code: 'if 5 > 3\n    print("yes")', run: true },
        { t: 'p', html: '<b>SyntaxError</b> — a missing colon here. Also caused by unclosed brackets or quotes.' },
        { t: 'code', code: 'if 5 > 3:\nprint("yes")', run: true },
        { t: 'p', html: '<b>IndentationError</b> — the line after a colon must be pushed in by 4 spaces.' },

        { t: 'h', text: 'Testing properly' },
        { t: 'p', html: 'Running your program once, the way you always run it, proves almost nothing. Try <b>four</b> different runs:' },
        { t: 'list', items: [
          'The <b>usual</b> choice — the one you always test.',
          'A <b>different allowed</b> choice — the other path, the other door.',
          'A <b>different name or number</b> — not the one you have typed a hundred times.',
          'A <b>fresh start</b> — run it again from the top and check it still behaves.'
        ] },
        { t: 'tip', html: 'Best of all: let a partner try it <b>without telling them how it works</b>. They will find things you cannot, because you already know what you meant.' },

        { t: 'h', text: 'One improvement, not five' },
        { t: 'p', html: 'Pick <b>one</b> thing to make better — clearer questions, nicer wording, a title line, tidier output. Make it. Test it. Stop.' },
        { t: 'warn', html: 'If an unfinished extra stops the main project working, <b>take it out</b>. A working small project is what you are sharing.' },

        { t: 'h', text: 'Explaining it' },
        { t: 'p', html: 'For your 90-second show-and-tell, be ready to say: what it does, one decision or loop or function and what it is for, one bug you hit and how you fixed it.' }
      ]
    },

    /* ------------------------------------------------------------ 12.2 */
    {
      key: 'w12-2',
      type: 'blanks',
      title: 'Name that error',
      xp: 20,
      minutes: 10,
      intro: 'Each program has one fault. Fix the gap so it runs.',
      items: [
        {
          prompt: 'NameError — the text needs quote marks.',
          code: 'print([[1]]hello there[[2]])',
          blanks: [
            { id: 1, accept: ['"', "'"], hint: 'Opens the text.' },
            { id: 2, accept: ['"', "'"], hint: 'Closes the text.' }
          ]
        },
        {
          prompt: 'TypeError — join words and a number properly.',
          code: 'score = 10\nprint([[1]]"Score: {score}")',
          blanks: [{ id: 1, accept: ['f'], hint: 'One letter turns it into an f-string.' }]
        },
        {
          prompt: 'SyntaxError — the if line is missing its ending.',
          code: 'if score > 5[[1]]\n    print("Well done")',
          blanks: [{ id: 1, accept: [':'], hint: 'Every if, for, while and def line ends with this.' }]
        },
        {
          prompt: 'IndentationError — push the line in. Type 4 spaces.',
          code: 'for i in range(3):\n[[1]]print(i)',
          blanks: [{ id: 1, accept: ['    '], hint: 'Four spaces.' }]
        },
        {
          prompt: 'The loop never ends — something must change inside it.',
          code: 'count = 0\nwhile count < 3:\n    print(count)\n    count = count [[1]] 1',
          blanks: [{ id: 1, accept: ['+'], hint: 'Count upwards so the check eventually becomes False.' }]
        },
        {
          prompt: 'The comparison never matches — make both sides numbers.',
          code: 'secret = 4\nguess = [[1]](input("Guess? "))\nif guess == secret:\n    print("Yes!")',
          blanks: [{ id: 1, accept: ['int'], hint: 'input gives words; this turns them into a number.' }]
        }
      ]
    },

    /* ------------------------------------------------------------ 12.3 */
    {
      key: 'w12-3',
      type: 'quiz',
      title: 'Testing quiz',
      xp: 20,
      minutes: 8,
      questions: [
        {
          q: 'Which line of a red error message matters most?',
          options: ['The first', 'The last', 'The longest', 'They are all the same'],
          answer: 1,
          why: 'The last line names the actual error. The rest is the trail that led there.'
        },
        {
          q: 'You changed six things and now it is broken. What is the problem with that?',
          options: [
            'Six is unlucky',
            'You cannot tell which change broke it',
            'Python only allows five',
            'Nothing, that is fine'
          ],
          answer: 1,
          why: 'One change at a time means you always know the cause.'
        },
        {
          q: 'Why is testing only your usual choice not enough?',
          options: [
            'It takes too long',
            'The other paths might be broken and you would never know',
            'Python caches the result',
            'It is enough'
          ],
          answer: 1,
          why: 'Untested paths are where bugs hide.'
        },
        {
          q: 'An extra feature stops your main project working, and time is nearly up. What do you do?',
          options: [
            'Leave it broken and explain',
            'Take the extra out so the main project works',
            'Delete the whole project',
            'Add another feature to fix it'
          ],
          answer: 1,
          why: 'A working small project is what you share.'
        },
        {
          q: 'Why is a partner good at finding your bugs?',
          options: [
            'They are better at Python',
            'They do not already know what you meant, so they try things you never would',
            'They have more time',
            'They can see your screen'
          ],
          answer: 1,
          why: 'Fresh eyes use the program as written, not as intended.'
        }
      ]
    },

    /* ------------------------------------------------------------ 12.4 */
    {
      key: 'w12-4',
      type: 'debug',
      title: 'Bug hunt: a partner\'s test finds a real problem',
      xp: 25,
      minutes: 14,
      brief:
        'A partner tested this quiz game and found something wrong. It runs with <b>no error at all</b> — but the game rule is backwards.<br><br>The test answers are <b>4</b> and then <b>7</b>. Four is the right answer, so the game should say <i>Correct!</i> straight away. Run it and watch what it actually does.',
      starter:
        '# Quiz game - the rule is wrong somewhere\nsecret = 4\nscore = 0\n\nanswer = int(input("What is 2 + 2? "))\n\nwhile answer == secret:\n    print("Not quite - try again!")\n    answer = int(input("What is 2 + 2? "))\n    score = score + 1\n\nprint("Correct!")\nprint(f"Wrong answers: {score}")\n',
      stdin: ['4', '7'],
      hints: [
        'The first answer given is 4, which is right. What did the program say about it?',
        'Read the while line out loud. When is it deciding to keep asking again?',
        'It repeats while the answer is CORRECT. It should repeat while the answer is WRONG — change == to != on the while line.'
      ],
      requires: [
        { text: 'while', message: 'Keep the while loop.' }
      ],
      checks: [
        { mode: 'contains', expect: 'Correct', message: 'Answering 4 first should reach the Correct! message.' },
        {
          mode: 'contains', expect: 'Wrong answers: 0',
          message: 'When the very first answer is right, the number of wrong answers should be 0.'
        },
        {
          mode: 'notcontains', expect: 'Not quite',
          message: 'A correct first answer should not print the try-again message at all.'
        }
      ],
      understand:
        'Write down what went wrong, how you found it and how you fixed it. You will use that in your show-and-tell.'
    },

    /* ------------------------------------------------------------ 12.5 */
    {
      key: 'w12-5',
      type: 'mission',
      title: 'Test, improve and share your project',
      xp: 70,
      minutes: 50,
      main: {
        brief:
          'Paste your <b>finished project from Week 11</b> into the editor below and run it.<br><br>It must run from start to finish <b>without crashing</b> and actually show something. Then work through the four tests and add <b>one</b> improvement.',
        checklist: [
          'The project runs start to finish with no red errors',
          'Test 1 — the usual choice works',
          'Test 2 — a different allowed choice works',
          'Test 3 — a different name or number works',
          'Test 4 — running it again from the top still works',
          'One improvement made and tested',
          'You can explain two skills you used and one bug you fixed'
        ],
        starter:
          '# ===== MY FINAL PROJECT =====\n# Paste your Week 11 project here, then press Run.\n#\n# Then work through the four tests:\n#   1. the usual choice\n#   2. a different allowed choice\n#   3. a different name or number\n#   4. a fresh run from the top\n#\n# Finally, make ONE improvement and test it again.\n\n',
        stdin: ['Ada', 'left', '4', '7', '10', '3', '1', '2', '5', '6'],
        hints: [
          'If it crashes, read the last line of the red message and go to the line number it names.',
          'If it needs answers you have not supplied, that is fine — the test answers above get typed in automatically.',
          'One improvement is enough: clearer questions, a title line, nicer wording, tidier output.'
        ],
        checks: [
          {
            mode: 'minlines', expect: 3,
            message: 'Your project should print at least a few lines. Have you pasted it in and run it?'
          }
        ],
        understand:
          'Show your project, explain <b>two</b> skills you used, describe <b>one</b> bug you hit and how you fixed it, then make one small change without help.'
      },
      simpler: {
        label: 'Simpler Version',
        brief:
          'Get your project <b>running</b> and pass <b>two</b> planned tests. Explain one part of it. An extra improvement is optional.',
        starter:
          '# ===== MY FINAL PROJECT =====\n# Paste your Week 11 project here, then press Run.\n#\n# Two tests are enough:\n#   1. the usual choice\n#   2. one other choice\n\n',
        stdin: ['Ada', 'left', '4', '7', '10', '3', '1', '2', '5', '6'],
        hints: [
          'Paste the whole project in, including the import line if it had one.',
          'If a red message appears, read its last line first.',
          'Once it runs, try it a second time with a different answer.'
        ],
        checks: [
          {
            mode: 'minlines', expect: 2,
            message: 'Your project should print something. Have you pasted it in and run it?'
          }
        ]
      },
      extra: {
        label: 'Extra Challenge',
        brief:
          'Polish the presentation: better questions, a title screen, colours if it is a turtle project, or neater spacing in the output.'
      },
      quickCheck:
        'Explain your program starting from its very first line, and point out one <b>decision</b>, one <b>loop</b> or one <b>function</b> along the way.'
    }
  ]
};
