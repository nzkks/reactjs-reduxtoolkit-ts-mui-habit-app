import { Box, Button } from '@mui/material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../store/store';
import { Habit, removeHabit, toggleComplete } from '../store/habit-slice';

const HabitActions = ({ habit }: { habit: Habit }) => {
  const dispatch = useDispatch<AppDispatch>();

  const today = new Date().toISOString().split('T')[0];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
      <Button
        variant="outlined"
        color={habit.completedDates.includes(today) ? 'success' : 'primary'}
        onClick={() => dispatch(toggleComplete({ id: habit.id, date: today }))}
        startIcon={<CheckCircleIcon />}
      >
        {habit.completedDates.includes(today) ? 'Completed' : 'Mark Complete'}
      </Button>
      <Button
        variant="outlined"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={() => dispatch(removeHabit(habit.id))}
      >
        Delete
      </Button>
    </Box>
  );
};

export default HabitActions;
