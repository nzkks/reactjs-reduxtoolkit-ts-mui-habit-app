import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    addHabit: (state, action: PayloadAction<{ name: string; frequency: HabitFrequency }>) => {
      const newHabit: Habit = {
        id: Date.now().toString(),
        name: action.payload.name,
        frequency: action.payload.frequency,
        completedDays: [],
        createdAt: new Date().toISOString(),
      };

      state.habits.push(newHabit);
    },
  },
});

export const { addHabit } = habitSlice.actions;

export default habitSlice.reducer;
