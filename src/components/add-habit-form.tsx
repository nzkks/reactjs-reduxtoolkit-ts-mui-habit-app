import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import { addHabit, HabitFrequency } from '../store/habit-slice';
import { AppDispatch } from '../store/store';

const AddHabitForm: React.FC = () => {
  const [name, setName] = React.useState<string>('');
  const [frequency, setFrequency] = React.useState<HabitFrequency>('daily');
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim()) {
      dispatch(addHabit({ name, frequency }));
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Habit Name"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Write your habit name here"
        />

        <FormControl fullWidth>
          <InputLabel>Frequency</InputLabel>
          <Select value={frequency} label="Frequency" onChange={e => setFrequency(e.target.value as HabitFrequency)}>
            <MenuItem value="hourly">Hourly</MenuItem>
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="fortnightly">Fortnightly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" type="submit" color="primary">
          Add Habit
        </Button>
      </Box>
    </form>
  );
};

export default AddHabitForm;
