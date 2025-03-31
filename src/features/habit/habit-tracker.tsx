import { Suspense } from 'react';
import { Container, Typography, Grid2 } from '@mui/material';

import { useGetHabitsQuery } from '../../app/services/habits';
import FrequencyFilter from './components/frequency-filter';
import HabitForm from './components/habit-form';
import HabitList from './components/habit-list';
import HabitStats from './components/habit-stats';

export default function HabitTracker() {
  useGetHabitsQuery();

  return (
    <Container maxWidth="md" component="main">
      <Typography component="h1" variant="h4" align="center" sx={{ marginBottom: 4 }}>
        Habit Tracker
      </Typography>
      <HabitForm />

      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Typography
            component="h2"
            variant="h6"
            sx={{ marginTop: 4, marginBottom: 2, textAlign: { xs: 'center', sm: 'left' } }}
          >
            Your Habits
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }} sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
          <FrequencyFilter />
        </Grid2>
      </Grid2>
      <Suspense fallback={<div>Loading...</div>}>
        <HabitList />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <HabitStats />
      </Suspense>
    </Container>
  );
}
