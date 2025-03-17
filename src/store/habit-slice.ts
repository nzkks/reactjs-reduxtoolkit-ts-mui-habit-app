import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type HabitFrequency = 'hourly' | 'daily' | 'weekly' | 'fortnightly' | 'monthly';

export interface Habit {
  id: string;
  name: string;
  frequency: HabitFrequency;
  completedDates: string[];
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
        completedDates: [],
        createdAt: new Date().toISOString(),
      };

      state.habits.push(newHabit);
    },
    toggleComplete: (state, action: PayloadAction<{ id: string; date: string }>) => {
      const habitFound = state.habits.find(h => h.id === action.payload.id);

      if (habitFound) {
        const index = habitFound.completedDates.indexOf(action.payload.date);

        if (index > -1) {
          habitFound.completedDates.splice(index, 1);
        } else {
          habitFound.completedDates.push(action.payload.date);
        }
      }
    },
    removeHabit: (state, action: PayloadAction<{ id: string }>) => {
      state.habits = state.habits.filter(h => h.id !== action.payload.id);
    },
  },
});

export const { addHabit, toggleComplete, removeHabit } = habitSlice.actions;

export default habitSlice.reducer;
