import { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { Container, Grid2, Typography } from '@mui/material';

import store from './store/store.ts';
import HabitForm from './components/habit-form.tsx';
import FrequencyFilter from './components/frequency-filter.tsx';
const HabitList = lazy(() => import('./components/habit-list.tsx'));
const HabitStats = lazy(() => import('./components/habit-stats.tsx'));

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
