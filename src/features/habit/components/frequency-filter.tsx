import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { selectSelectedFrequency, setSelectedFrequency } from '../habit-slice';
import { HabitFrequencyAndAll } from '../../../types/Habit';
import { useAppDispatch, useTypedSelector } from '../../../hooks/store';

const frequencies = [
  { label: 'All', value: 'all' },
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Fortnightly', value: 'fortnightly' },
  { label: 'Monthly', value: 'monthly' },
];

export default function FrequencyFilter() {
  const dispatch = useAppDispatch();
  const selectedFrequency = useTypedSelector(selectSelectedFrequency);

  const handleChange = (event: SelectChangeEvent<HabitFrequencyAndAll>) => {
    const frequency = event.target.value as HabitFrequencyAndAll;
    dispatch(setSelectedFrequency(frequency));
  };

  return (
    <FormControl sx={{ minWidth: 120 }}>
      <InputLabel>Frequency</InputLabel>
      <Select value={selectedFrequency} label="Frequency" onChange={handleChange}>
        {frequencies.map(frequency => (
          <MenuItem key={frequency.value} value={frequency.value}>
            {frequency.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
