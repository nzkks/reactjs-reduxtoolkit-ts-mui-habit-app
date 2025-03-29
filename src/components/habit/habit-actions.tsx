import { useDispatch } from 'react-redux';
import { Box, Button, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { CheckCircle as CheckCircleIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

import { AppDispatch } from '../../state/store';
import { Habit, editHabit, removeHabit, toggleComplete } from '../../state/habit/habit-slice';

const HabitActions = ({ habit }: { habit: Habit }) => {
  const dispatch = useDispatch<AppDispatch>();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const today = new Date().toISOString().split('T')[0];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
      <Button
        variant="outlined"
        color="success"
        onClick={() => dispatch(editHabit({ id: habit.id }))}
        startIcon={<EditIcon />}
      >
        Edit
      </Button>
      <Button
        variant="outlined"
        color={habit.completedDates.includes(today) ? 'success' : 'primary'}
        onClick={() => dispatch(toggleComplete({ id: habit.id, date: today }))}
        startIcon={<CheckCircleIcon />}
      >
        {habit.completedDates.includes(today) ? 'Completed' : 'Mark Complete'}
      </Button>
      {matches ? (
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => dispatch(removeHabit(habit.id))}
        >
          Delete
        </Button>
      ) : (
        <IconButton color="error" onClick={() => dispatch(removeHabit(habit.id))} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default HabitActions;
