import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type HabitFrequency = 'daily' | 'weekly' | 'fortnightly' | 'monthly';

export interface Habit {
  id: string;
  habitName: string;
  frequency: HabitFrequency;
  completedDates: string[];
  createdAt: string;
  editedAt: string;
}

interface HabitState {
  habits: Habit[];
  habitToEdit: Habit | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: HabitState = {
  habits: [],
  habitToEdit: null,
  isLoading: false,
  error: null,
};

export const fetchHabits = createAsyncThunk('habits/fetchHabits', async () => {
  // Simulating an API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  const mockHabits: Habit[] = [
    {
      id: '1',
      habitName: 'Read',
      frequency: 'daily',
      completedDates: [],
      createdAt: new Date().toISOString(),
      editedAt: new Date().toISOString(),
    },
    {
      id: '2',
      habitName: 'Exercise',
      frequency: 'daily',
      completedDates: [],
      createdAt: new Date().toISOString(),
      editedAt: new Date().toISOString(),
    },
  ];
  return mockHabits;
});

const habitSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    addHabit: (state, action: PayloadAction<{ habitName: string; frequency: HabitFrequency }>) => {
      const newHabit: Habit = {
        id: Date.now().toString(),
        habitName: action.payload.habitName,
        frequency: action.payload.frequency,
        completedDates: [],
        createdAt: new Date().toISOString(),
        editedAt: new Date().toISOString(),
      };

      state.habits.push(newHabit);
    },
    editHabit: (state, action: PayloadAction<{ id: string }>) => {
      const habitFound = state.habits.find(h => h.id === action.payload.id);

      if (habitFound) {
        state.habitToEdit = habitFound;
      }
    },
    updateHabit: (state, action: PayloadAction<{ id: string; habitName: string; frequency: HabitFrequency }>) => {
      const habitFound = state.habits.find(h => h.id === action.payload.id);

      if (habitFound) {
        const updatedHabit = { ...habitFound };

        updatedHabit.habitName = action.payload.habitName;
        updatedHabit.frequency = action.payload.frequency;
        updatedHabit.editedAt = new Date().toISOString();

        state.habits = state.habits.map(h => (h.id === action.payload.id ? updatedHabit : h));
      }
      state.habitToEdit = null;
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
    removeHabit: (state, action: PayloadAction<string>) => {
      state.habits = state.habits.filter(h => h.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchHabits.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.isLoading = false;
        state.habits = action.payload;
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch habits';
      });
  },
});

export const { addHabit, editHabit, updateHabit, toggleComplete, removeHabit } = habitSlice.actions;

export default habitSlice.reducer;
