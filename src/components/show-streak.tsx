import { Habit } from '../store/habit-slice';
import { Box, LinearProgress, Typography } from '@mui/material';

const ShowStreak = ({ habit }: { habit: Habit }) => {
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
    <Box sx={{ mt: 2 }}>
      <Typography variant="body2">Current Streak: {getStreak(habit)} days</Typography>
      <LinearProgress variant="determinate" value={(getStreak(habit) / 30) * 100} sx={{ mt: 1 }} />
    </Box>
  );
};

export default ShowStreak;
