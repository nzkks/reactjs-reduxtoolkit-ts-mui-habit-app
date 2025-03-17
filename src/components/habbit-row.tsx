import { Box, Button, Grid2, LinearProgress, Paper, Typography } from '@mui/material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { Delete as DeleteIcon } from '@mui/icons-material';

import { toggleComplete, removeHabit } from '../store/habit-slice';
import { Habit } from '../store/habit-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';

type HabbitRowProps = {
  habit: Habit;
};

const HabbitRow = ({ habit }: HabbitRowProps) => {
  const today = new Date().toISOString().split('T')[0];

  const dispatch = useDispatch<AppDispatch>();

  const handleCompletedClick = (id: string, date: string) => {
    dispatch(toggleComplete({ id, date }));
  };

  const handleRemoveHabit = (id: string) => {
    dispatch(removeHabit({ id }));
  };

  const getStreak = (habit: Habit) => {
    let streak = 0;
    const currentDate = new Date();
    const dateString = currentDate.toISOString().split('T')[0];

    while (true) {
      if (habit.completedDays.includes(dateString)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  };

  return (
    <Paper key={habit.id} elevation={2} sx={{ p: 2 }}>
      <Grid2 container spacing={2} alignItems="center">
        <Grid2 size={{ sm: 12, lg: 6 }}>
          <Typography variant="h6">{habit.name}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
            {habit.frequency}
          </Typography>
        </Grid2>
        <Grid2 size={{ sm: 12, lg: 6 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="outlined"
              color={habit.completedDays.includes(today) ? 'success' : 'primary'}
              startIcon={<CheckCircleIcon />}
              onClick={() => handleCompletedClick(habit.id, today)}
            >
              {habit.completedDays.includes(today) ? 'Completed' : 'Mark Complete'}
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => handleRemoveHabit(habit.id)}
            >
              Delete
            </Button>
          </Box>
        </Grid2>
      </Grid2>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2">Current Streak: {getStreak(habit)} days</Typography>
        <LinearProgress variant="determinate" value={(getStreak(habit) / 30) * 100} sx={{ mt: 1 }} />
      </Box>
    </Paper>
  );
};

export default HabbitRow;
