import camp from './camp/index.js';
import level1 from './level1/index.js';

// Every course is self-contained: its own units, its own ranks, its own XP
// total. Task keys are unique across courses (d1-1 vs w1-1) so one student
// can work through both without their progress colliding.
export const courses = [level1, camp];

for (const course of courses) {
  for (const unit of course.days) {
    unit.totalXp = unit.tasks.reduce((sum, t) => sum + t.xp, 0);
    unit.totalMinutes = unit.tasks.reduce((sum, t) => sum + (t.minutes || 0), 0);
    for (const task of unit.tasks) {
      task.day = unit.day;
      task.course = course.id;
    }
  }
  course.totalXp = course.days.reduce((sum, u) => sum + u.totalXp, 0);
  course.totalMinutes = course.days.reduce((sum, u) => sum + u.totalMinutes, 0);
}

export const courseById = (id) => courses.find((c) => c.id === id) || courses[0];

// Kept for anything that still expects a single course.
export const curriculum = { courses, campName: 'Python Camp' };
