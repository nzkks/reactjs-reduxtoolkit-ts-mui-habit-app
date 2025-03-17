import { Habit } from './store/habit-slice';

export const getStreak = (habit: Habit) => {
  let streak = 0;
  const currentDate = new Date();

  while (true) {
    const dateString = currentDate.toISOString().split('T')[0];
    if (habit.completedDates.includes(dateString)) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
};

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
