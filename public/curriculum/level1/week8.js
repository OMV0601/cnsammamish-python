// WEEK 8 — Game Backpack
// Keeping and showing several items in a list
export default {
  day: 8,
  title: 'Game Backpack',
  subtitle: 'Keeping and showing several items in a list',
  emoji: '🎒',
  color: '#b8860b',
  badge: '📦',
  badgeName: 'Collector',
  bigIdea: 'One variable holds one thing. A list holds as many as you like — and a for loop can walk through every single one.',
  byTheEnd: 'Keep several items together in one list and show each item with a for loop.',
  nextWeek: 'Next week, functions will let you give a useful group of code its own name.',
  tasks: [
    /* ------------------------------------------------------------- 8.1 */
    {
      key: 'w8-1',
      type: 'lesson',
      title: 'One box, many things',
      xp: 10,
      minutes: 12,
      blocks: [
        { t: 'p', html: 'Here is the backpack you will build. Test answers: sword, rope, apple.' },
        {
          t: 'code',
          run: true,
          stdin: ['sword', 'rope', 'apple'],
          code: 'inventory = []\n\ninventory.append(input("Item 1? "))\ninventory.append(input("Item 2? "))\ninventory.append(input("Item 3? "))\n\nprint("--- YOUR BACKPACK ---")\nfor item in inventory:\n    print(f"- {item}")'
        },

        { t: 'h', text: 'The problem with separate boxes' },
        { t: 'p', html: 'Without lists, three items means three variables — and adding a fourth means changing your code everywhere.' },
        { t: 'code', code: 'item1 = "sword"\nitem2 = "rope"\nitem3 = "apple"\nprint(item1)\nprint(item2)\nprint(item3)', run: true },
        { t: 'p', html: 'That does not scale. A list solves it.' },

        { t: 'h', text: 'Making a list' },
        { t: 'p', html: 'Square brackets <code>[ ]</code> make a list. Empty brackets make an empty one.' },
        { t: 'code', code: 'inventory = []\nprint(inventory)\n\ntreasures = ["gold", "gem", "map"]\nprint(treasures)', run: true, output: "[]\n['gold', 'gem', 'map']" },

        { t: 'h', text: 'append — adding to the end' },
        { t: 'p', html: '<code>.append()</code> puts one new thing on the end of the list.' },
        { t: 'code', code: 'inventory = []\ninventory.append("sword")\nprint(inventory)\ninventory.append("rope")\nprint(inventory)', run: true, output: "['sword']\n['sword', 'rope']" },
        { t: 'warn', html: '<code>append</code> is an <b>action</b>, so it needs brackets. Writing <code>inventory.append "sword"</code> or <code>inventory.append</code> on its own does nothing useful — Python will not add anything.' },

        { t: 'h', text: 'Walking through a list with for' },
        { t: 'p', html: 'You have used <code>for _ in range(4)</code> to repeat a number of times. A <code>for</code> can also walk through a list, one item at a time.' },
        { t: 'code', code: 'treasures = ["gold", "gem", "map"]\n\nfor treasure in treasures:\n    print(treasure)', run: true, output: 'gold\ngem\nmap' },
        { t: 'p', html: 'Read it as: <b>"for each treasure in treasures, do this"</b>. The name <code>treasure</code> is yours to choose — Python fills it with each item in turn.' },
        { t: 'tip', html: 'The list name is usually plural (<code>treasures</code>) and the loop name singular (<code>treasure</code>). That makes the line read like English.' },

        { t: 'h', text: 'Making it look nice' },
        { t: 'p', html: 'Use an f-string inside the loop to decorate each line.' },
        { t: 'code', code: 'inventory = ["sword", "rope", "apple"]\n\nprint("--- BACKPACK ---")\nfor item in inventory:\n    print(f"  * {item}")\nprint("----------------")', run: true },

        { t: 'h', text: 'How many things are in there?' },
        { t: 'p', html: '<code>len()</code> counts the items. You do not have to use it, but it is handy.' },
        { t: 'code', code: 'inventory = ["sword", "rope", "apple"]\nprint(len(inventory))', run: true, output: '3' }
      ]
    },

    /* ------------------------------------------------------------- 8.2 */
    {
      key: 'w8-2',
      type: 'blanks',
      title: 'List pieces',
      xp: 20,
      minutes: 10,
      intro: 'Complete each line so the backpack works.',
      items: [
        {
          prompt: 'Make an empty list called inventory.',
          code: 'inventory = [[1]]',
          blanks: [{ id: 1, accept: ['[]'], hint: 'Two square brackets with nothing between them.' }]
        },
        {
          prompt: 'Add a sword to the list.',
          code: 'inventory.[[1]]("sword")',
          blanks: [{ id: 1, accept: ['append'], hint: 'The action that puts something on the end.' }]
        },
        {
          prompt: 'The brackets are missing, so nothing gets added.',
          code: 'inventory.append[[1]]"rope"[[2]]',
          blanks: [
            { id: 1, accept: ['('], hint: 'Round bracket, opening.' },
            { id: 2, accept: [')'], hint: 'Round bracket, closing.' }
          ]
        },
        {
          prompt: 'Walk through every item in the list.',
          code: 'for item [[1]] inventory:\n    print(item)',
          blanks: [{ id: 1, accept: ['in'], hint: 'Two letters, between the item name and the list name.' }]
        },
        {
          prompt: 'Add whatever the player typed.',
          code: 'thing = input("What item? ")\ninventory.append([[1]])',
          blanks: [{ id: 1, accept: ['thing'], hint: 'The box holding their answer — no quote marks.' }]
        },
        {
          prompt: 'Count how many items are in the backpack.',
          code: 'print([[1]](inventory))',
          blanks: [{ id: 1, accept: ['len'], hint: 'Three letters, short for length.' }]
        }
      ]
    },

    /* ------------------------------------------------------------- 8.3 */
    {
      key: 'w8-3',
      type: 'quiz',
      title: 'List quiz',
      xp: 20,
      minutes: 8,
      questions: [
        {
          q: 'What does <code>inventory = []</code> create?',
          options: ['An error', 'An empty list', 'A list with one empty item', 'A variable holding zero'],
          answer: 1,
          why: 'Empty square brackets make an empty list, ready to append to.'
        },
        {
          q: 'What does <code>.append()</code> do?',
          options: [
            'Removes an item',
            'Adds one item to the end of the list',
            'Counts the items',
            'Sorts the list'
          ],
          answer: 1,
          why: 'append puts one new thing on the end.'
        },
        {
          q: 'What is wrong with <code>inventory.append</code> (no brackets)?',
          options: [
            'Nothing, it works',
            'append is an action, so it needs brackets to actually run',
            'It should be square brackets',
            'It needs a capital A'
          ],
          answer: 1,
          why: 'Without the brackets Python never carries out the action.'
        },
        {
          q: 'What does this print?<pre>pets = ["cat", "dog"]\nfor pet in pets:\n    print(pet)</pre>',
          options: ['pets pets', 'cat dog (on two lines)', 'pet pet', '["cat", "dog"]'],
          answer: 1,
          why: 'The loop fills pet with each item in turn and prints it.'
        },
        {
          q: 'In <code>for item in inventory:</code>, where does the name <code>item</code> come from?',
          options: [
            'It is a special Python word you must use',
            'You choose it — Python fills it with each list entry in turn',
            'It is the first thing in the list',
            'It has to match the list name'
          ],
          answer: 1,
          why: 'It is your own name for "the one I am looking at right now".'
        }
      ]
    },

    /* ------------------------------------------------------------- 8.4 */
    {
      key: 'w8-4',
      type: 'debug',
      title: 'Bug hunt: the backpack that stays empty',
      xp: 25,
      minutes: 12,
      brief:
        'The player adds items, but the backpack always prints empty. There is <b>no error message</b> — look closely at the line that is supposed to add things.',
      starter:
        '# Game backpack - BROKEN\ninventory = []\n\nitem = input("What do you want to pack? ")\ninventory.append\n\nprint("--- YOUR BACKPACK ---")\nfor thing in inventory:\n    print(f"- {thing}")\nprint(f"Items: {len(inventory)}")\n',
      stdin: ['sword'],
      hints: [
        'Is append being used as an action, or just mentioned?',
        'An action needs brackets after it — and something to put inside them.',
        'Change it to inventory.append(item) so the typed item is actually added.'
      ],
      requires: [
        { text: 'append', message: 'Keep using append to add the item.' }
      ],
      checks: [
        { mode: 'contains', expect: '- sword', message: 'The packed item should be listed in the backpack.' },
        { mode: 'contains', expect: 'Items: 1', message: 'The backpack should report 1 item after packing one thing.' }
      ],
      understand:
        'Add a second item to the list without help, then explain what the <code>for</code> loop is doing line by line.'
    },

    /* ------------------------------------------------------------- 8.5 */
    {
      key: 'w8-5',
      type: 'mission',
      title: 'Game Backpack',
      xp: 45,
      minutes: 35,
      main: {
        brief:
          'Ask the player for <b>three</b> items to pack. Put all three into <b>one list</b>, then display the whole backpack using a <b>for loop</b>.',
        checklist: [
          'An empty list at the start',
          'Three questions asking what to pack',
          'Each answer appended to the same list',
          'A for loop that shows every item',
          'A title line above the list so it looks like a real backpack'
        ],
        starter:
          '# Game Backpack\ninventory = []\n\n# Step 1: ask for three items and append each one\n\n\n# Step 2: print a title\n\n\n# Step 3: use a for loop to show every item\n',
        stdin: ['sword', 'rope', 'apple'],
        hints: [
          'One item at a time: item1 = input("Item 1? ") then inventory.append(item1)',
          'Or do it in one line: inventory.append(input("Item 1? "))',
          'The loop is: for item in inventory: then an indented print(f"- {item}")'
        ],
        requires: [
          { text: 'append', message: 'Use append to add each item to the list.' },
          { text: 'for', message: 'Use a for loop to display the backpack.' }
        ],
        checks: [
          { mode: 'contains', expect: 'sword', message: 'The first item is not showing in the backpack.' },
          { mode: 'contains', expect: 'rope', message: 'The second item is not showing in the backpack.' },
          { mode: 'contains', expect: 'apple', message: 'The third item is not showing in the backpack.' },
          { mode: 'minlines', expect: 5, message: 'Expected three questions, a title and the listed items.' }
        ]
      },
      simpler: {
        label: 'Simpler Version',
        brief:
          'Two items are already packed for you. Ask for <b>one</b> more, add it, then show all three.',
        starter:
          '# Backpack - simpler\ninventory = ["torch", "map"]\n\n# Ask for one more item and append it\n\n\nprint("--- YOUR BACKPACK ---")\n# Now show every item with a for loop\n',
        stdin: ['sword'],
        hints: [
          'Ask first: item = input("What else shall we pack? ")',
          'Then add it: inventory.append(item)',
          'Then loop: for thing in inventory: with an indented print(thing)'
        ],
        requires: [{ text: 'append', message: 'Use append to add the new item.' }],
        checks: [
          { mode: 'contains', expect: 'torch', message: 'The starting items should still be shown.' },
          { mode: 'contains', expect: 'sword', message: 'The new item is not being added or shown.' }
        ]
      },
      extra: {
        label: 'Extra Challenge',
        brief:
          'Let the player <b>drop</b> something: ask which item to remove, use <code>inventory.remove(name)</code>, then show the updated backpack.'
      },
      quickCheck:
        'Add <code>print(len(inventory))</code> at the end. Say what number you expect <b>before</b> you run it.'
    }
  ]
};
