import { createSlice } from '@reduxjs/toolkit';

export type HabitFrequency = 'hourly' | 'daily' | 'weekly' | 'fortnightly' | 'monthly';

export interface Habit {
  id: string;
  name: string;
  frequency: HabitFrequency;
  completedDays: string[];
  createdAt: string;
}

interface HabitState {
  habits: Habit[];
}

const initialState: HabitState = {
  habits: [],
};

const habitSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    addHabit: () => {},
  },
});

export const { addHabit } = habitSlice.actions;

export default habitSlice.reducer;
