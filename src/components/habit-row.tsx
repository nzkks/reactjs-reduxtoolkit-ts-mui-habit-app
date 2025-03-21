import { Grid2, Paper, Typography } from '@mui/material';
import { Habit } from '../store/habit-slice';
import ShowStreak from './show-streak';
import HabitActions from './habit-actions';
import { capitalize } from '../utils';

type HabbitRowProps = {
  habit: Habit;
};

const HabitRow = ({ habit }: HabbitRowProps) => {
  return (
    <Paper key={habit.id} elevation={2} sx={{ p: 2 }} component="li">
      <Grid2 container spacing={2} alignItems="center">
        <Grid2 size={{ sm: 12, lg: 6 }}>
          <Typography variant="h6">{habit.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {capitalize(habit.frequency)}
          </Typography>
        </Grid2>
        <Grid2 size={{ sm: 12, lg: 6 }}>
          <HabitActions habit={habit} />
        </Grid2>
      </Grid2>
      <ShowStreak habit={habit} />
    </Paper>
  );
};

export default HabitRow;
