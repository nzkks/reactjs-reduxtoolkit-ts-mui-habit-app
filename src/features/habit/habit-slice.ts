import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { HabitFrequencyAndAll, HabitState } from '../../types/Habit';

const initialState: HabitState = {
  habitToEdit: null,
  selectedFrequency: 'all',
};

const habitSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    editHabit: (state, action: PayloadAction<{ id: string }>) => {
      // TODO: access RTK Query cache to get the habit
      // const habitFound = state.habits.find(h => h.id === action.payload.id);
      // if (habitFound) {
      //   state.habitToEdit = habitFound;
      // }
    },
    setSelectedFrequency: (state, action: PayloadAction<HabitFrequencyAndAll>) => {
      state.selectedFrequency = action.payload;
    },
  },
  selectors: {
    selectHabitToEdit: state => state.habitToEdit,
    selectSelectedFrequency: state => state.selectedFrequency,
  },
});

export const { editHabit, setSelectedFrequency } = habitSlice.actions;

export const { selectHabitToEdit, selectSelectedFrequency } = habitSlice.selectors;

export default habitSlice.reducer;
