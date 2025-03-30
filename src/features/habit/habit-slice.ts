import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppDispatch, RootState } from '../../app/store';
import { Habit, HabitFrequency, HabitFrequencyAndAll } from '../../types/Habit';

interface HabitState {
  habits: Habit[];
  habitToEdit: Habit | null;
  selectedFrequency: HabitFrequencyAndAll;
  filteredHabits: Habit[];
  isLoading: boolean;
  error: string | null;
}

const initialState: HabitState = {
  habits: [],
  habitToEdit: null,
  selectedFrequency: 'all',
  filteredHabits: [],
  isLoading: false,
  error: null,
};

const updateFilteredHabits = (state: HabitState) => {
  state.filteredHabits =
    state.selectedFrequency === 'all'
      ? state.habits
      : state.habits.filter(h => h.frequency === state.selectedFrequency);
};

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
      updateFilteredHabits(state);
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
      updateFilteredHabits(state);
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
      updateFilteredHabits(state);
    },
    removeHabit: (state, action: PayloadAction<string>) => {
      state.habits = state.habits.filter(h => h.id !== action.payload);
      updateFilteredHabits(state);
    },
    filterHabitsByFrequency: (state, action: PayloadAction<HabitFrequencyAndAll>) => {
      state.selectedFrequency = action.payload;
      if (action.payload === 'all') {
        state.filteredHabits = state.habits;
      } else {
        state.filteredHabits = state.habits.filter(h => h.frequency === action.payload);
      }
    },
  },
  selectors: {
    selectHabits: state => state.habits,
    selectFilteredHabits: state => state.filteredHabits,
    selectHabitToEdit: state => state.habitToEdit,
    selectSelectedFrequency: state => state.selectedFrequency,
    selectIsLoading: state => state.isLoading,
    selectError: state => state.error,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchHabits.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.isLoading = false;
        state.habits = action.payload;
        state.filteredHabits = action.payload;
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch habits';
      });
  },
});

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
  extra: { s: string; n: number };
}>();

export const fetchHabits = createAppAsyncThunk('habits/fetchHabits', async () => {
  // Simulating an API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  const mockHabits: Habit[] = [
    {
      id: '1',
      habitName: 'Read',
      frequency: 'weekly',
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

export const { addHabit, editHabit, updateHabit, toggleComplete, removeHabit, filterHabitsByFrequency } =
  habitSlice.actions;

export const {
  selectHabits,
  selectFilteredHabits,
  selectHabitToEdit,
  selectSelectedFrequency,
  selectIsLoading,
  selectError,
} = habitSlice.selectors;

export default habitSlice.reducer;
