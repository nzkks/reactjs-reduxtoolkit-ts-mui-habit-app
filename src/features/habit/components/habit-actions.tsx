import { Box, Button, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { CheckCircle as CheckCircleIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

import { useAppDispatch } from '../../../hooks/store';
import { useDeleteHabitMutation, useUpdateHabitMutation } from '../../../app/services/habits';
import { setHabitIdToEdit } from '../../../features/habit/habit-slice';
import { Habit } from '../../../types/Habit';

const HabitActions = ({ habit }: { habit: Habit }) => {
  const [updateHabit] = useUpdateHabitMutation();
  const [deleteHabit] = useDeleteHabitMutation();
  const dispatch = useAppDispatch();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const today = new Date().toISOString().split('T')[0];

  const handleDeleteHabit = async () => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      await deleteHabit(habit.id);
    }
  };

  const handleToggleComplete = async () => {
    const habitCompletedDates = habit.completedDates;
    const updatedHabitCompletedDates = [...habitCompletedDates];
    const isDateExists = updatedHabitCompletedDates.indexOf(today);

    if (isDateExists > -1) {
      updatedHabitCompletedDates.splice(isDateExists, 1);
    } else {
      updatedHabitCompletedDates.push(today);
    }

    const updatedHabit = { ...habit, completedDates: updatedHabitCompletedDates };
    await updateHabit(updatedHabit);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
      <Button
        variant="outlined"
        color="success"
        onClick={() => dispatch(setHabitIdToEdit(habit.id))}
        startIcon={<EditIcon />}
      >
        Edit
      </Button>
      <Button
        variant="outlined"
        color={habit.completedDates.includes(today) ? 'success' : 'primary'}
        onClick={handleToggleComplete}
        startIcon={<CheckCircleIcon />}
      >
        {habit.completedDates.includes(today) ? 'Completed' : 'Mark Complete'}
      </Button>
      {matches ? (
        <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={handleDeleteHabit}>
          Delete
        </Button>
      ) : (
        <IconButton color="error" onClick={handleDeleteHabit} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default HabitActions;
