export type HabitFrequency = 'daily' | 'weekly' | 'fortnightly' | 'monthly';

type HabitFrequencyAll = 'all';

export type HabitFrequencyAndAll = HabitFrequency | HabitFrequencyAll;

export type Habit = {
  id: string;
  habitName: string;
  frequency: HabitFrequency;
  completedDates: string[];
  createdAt: string;
  editedAt: string;
};

export type HabitState = {
  habitToEditId: string | null;
  selectedFrequency: HabitFrequencyAndAll;
};
