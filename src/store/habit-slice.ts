import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  isLoading: boolean;
  error: string | null;
}

const initialState: HabitState = {
  habits: [],
  isLoading: false,
  error: null,
};

export const fetchHabits = createAsyncThunk('habits/fetchHabits', async () => {
  // Simulating an API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  const mockHabits: Habit[] = [
    {
      id: '1',
      name: 'Read',
      frequency: 'daily',
      completedDates: [],
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Exercise',
      frequency: 'daily',
      completedDates: [],
      createdAt: new Date().toISOString(),
    },
  ];
  return mockHabits;
});

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
  extraReducers: builder => {
    builder.addCase(fetchHabits.pending, state => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(fetchHabits.fulfilled, (state, action) => {
      state.isLoading = false;
      state.habits = action.payload;
    });

    builder.addCase(fetchHabits.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to fetch habits';
    });
  },
});

export const { addHabit, toggleComplete, removeHabit } = habitSlice.actions;

export default habitSlice.reducer;
