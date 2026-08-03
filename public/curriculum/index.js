import day1 from './day1.js';
import day2 from './day2.js';
import day3 from './day3.js';
import day4 from './day4.js';
import day5 from './day5.js';

const days = [day1, day2, day3, day4, day5];

// Ranks the kids climb through as they earn XP.
const ranks = [
  { at: 0, name: 'Egg', icon: '🥚' },
  { at: 60, name: 'Hatchling', icon: '🐣' },
  { at: 150, name: 'Snake Pup', icon: '🐛' },
  { at: 280, name: 'Coder', icon: '🐍' },
  { at: 450, name: 'Bug Hunter', icon: '🔦' },
  { at: 620, name: 'Code Wizard', icon: '🧙' },
  { at: 800, name: 'Python Legend', icon: '👑' }
];

for (const d of days) {
  d.totalXp = d.tasks.reduce((sum, t) => sum + t.xp, 0);
  d.totalMinutes = d.tasks.reduce((sum, t) => sum + (t.minutes || 0), 0);
  for (const t of d.tasks) t.day = d.day;
}

export const curriculum = {
  campName: 'Python Camp',
  days,
  ranks,
  totalXp: days.reduce((sum, d) => sum + d.totalXp, 0)
};
