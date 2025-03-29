import { useDispatch, useSelector } from 'react-redux';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { filterHabitsByFrequency, HabitFrequencyAndAll, selectSelectedFrequency } from '../store/habit-slice';
import { AppDispatch } from '../store/store';

const frequencies = [
  { label: 'All', value: 'all' },
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Fortnightly', value: 'fortnightly' },
  { label: 'Monthly', value: 'monthly' },
];

export default function FrequencyFilter() {
  const dispatch = useDispatch<AppDispatch>();
  const selectedFrequency = useSelector(selectSelectedFrequency);

  const handleChange = (frequency: HabitFrequencyAndAll) => {
    dispatch(filterHabitsByFrequency(frequency));
  };

  return (
    <FormControl sx={{ minWidth: 120 }}>
      <InputLabel>Frequency</InputLabel>
      <Select
        value={selectedFrequency}
        label="Frequency"
        onChange={e => handleChange(e.target.value as HabitFrequencyAndAll)}
      >
        {frequencies.map(frequency => (
          <MenuItem key={frequency.value} value={frequency.value}>
            {frequency.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
