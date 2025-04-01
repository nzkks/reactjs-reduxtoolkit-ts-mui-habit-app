import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { HabitFrequencyAndAll, HabitState } from '../../types/Habit';

const initialState: HabitState = {
  habitToEditId: null,
  selectedFrequency: 'all',
};

const habitSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    setHabitIdToEdit: (state, action: PayloadAction<string | null>) => {
      state.habitToEditId = action.payload;
    },
    setSelectedFrequency: (state, action: PayloadAction<HabitFrequencyAndAll>) => {
      state.selectedFrequency = action.payload;
    },
  },
  selectors: {
    selectHabitIdToEdit: state => state.habitToEditId,
    selectSelectedFrequency: state => state.selectedFrequency,
  },
});

export const { setHabitIdToEdit, setSelectedFrequency } = habitSlice.actions;

export const { selectHabitIdToEdit, selectSelectedFrequency } = habitSlice.selectors;

export default habitSlice.reducer;
