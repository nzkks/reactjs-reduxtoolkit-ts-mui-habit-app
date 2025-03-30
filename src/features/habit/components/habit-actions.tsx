import { Box, Button, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { CheckCircle as CheckCircleIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

import { useAppDispatch } from '../../../hooks/store';
import { editHabit, removeHabit, toggleComplete } from '../../../features/habit/habit-slice';
import { Habit } from '../../../types/Habit';

const HabitActions = ({ habit }: { habit: Habit }) => {
  const dispatch = useAppDispatch();

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
