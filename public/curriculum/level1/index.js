// Course: Python Level 1 — the 12-week club curriculum.
// One 2-hour session per week, ages 8+, no previous experience.
import week1 from './week1.js';
import week2 from './week2.js';
import week3 from './week3.js';
import week4 from './week4.js';
import week5 from './week5.js';

export default {
  id: 'level1',
  name: 'Python Level 1',
  blurb: 'Twelve weekly sessions. Stories, games, turtle drawings and a final project you choose.',
  emoji: '🐍',
  unitWord: 'Week',
  ages: 'Ages 8+',
  days: [week1, week2, week3, week4, week5],
  ranks: [
    { at: 0, name: 'Newcomer', icon: '🥚' },
    { at: 120, name: 'Story Maker', icon: '🐣' },
    { at: 300, name: 'Decision Maker', icon: '🔀' },
    { at: 520, name: 'Loop Rider', icon: '🔁' },
    { at: 760, name: 'Turtle Artist', icon: '🐢' },
    { at: 1020, name: 'Bug Hunter', icon: '🔦' },
    { at: 1300, name: 'Level 1 Graduate', icon: '🎓' }
  ]
};
