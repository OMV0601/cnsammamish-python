// Course: the original 5-day holiday camp.
import day1 from './day1.js';
import day2 from './day2.js';
import day3 from './day3.js';
import day4 from './day4.js';
import day5 from './day5.js';

export default {
  id: 'camp',
  name: '5-Day Python Camp',
  blurb: 'Five days in a row, two hours a day. Print, variables, choices, loops and functions.',
  emoji: '⛺',
  unitWord: 'Day',
  ages: 'Ages 9-12',
  days: [day1, day2, day3, day4, day5],
  ranks: [
    { at: 0, name: 'Egg', icon: '🥚' },
    { at: 60, name: 'Hatchling', icon: '🐣' },
    { at: 150, name: 'Snake Pup', icon: '🐛' },
    { at: 280, name: 'Coder', icon: '🐍' },
    { at: 450, name: 'Bug Hunter', icon: '🔦' },
    { at: 620, name: 'Code Wizard', icon: '🧙' },
    { at: 800, name: 'Python Legend', icon: '👑' }
  ]
};
