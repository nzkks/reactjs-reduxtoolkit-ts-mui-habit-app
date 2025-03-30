export type HabitFrequency = 'daily' | 'weekly' | 'fortnightly' | 'monthly';
type HabitFrequencyAll = 'all';
export type HabitFrequencyAndAll = HabitFrequency | HabitFrequencyAll;

export interface Habit {
  id: string;
  habitName: string;
  frequency: HabitFrequency;
  completedDates: string[];
  createdAt: string;
  editedAt: string;
}
