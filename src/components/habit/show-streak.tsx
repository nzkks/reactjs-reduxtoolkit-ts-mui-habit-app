import { Box, LinearProgress, Typography } from '@mui/material';

import { Habit } from '../../types/Habit';
import { getStreak } from '../../utils';

const ShowStreak = ({ habit }: { habit: Habit }) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="body2">Current Streak: {getStreak(habit)} days</Typography>
      <LinearProgress variant="determinate" value={(getStreak(habit) / 30) * 100} sx={{ mt: 1 }} />
    </Box>
  );
};

export default ShowStreak;
