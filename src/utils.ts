import { Habit } from './store/habit-slice';

export const getStreak = (habit: Habit) => {
  let streak = 0;
  const currentDate = new Date();
  const dateString = currentDate.toISOString().split('T')[0];

  while (true) {
    if (habit.completedDates.includes(dateString)) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
};
