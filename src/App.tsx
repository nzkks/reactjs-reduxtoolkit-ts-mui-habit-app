import { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { Container, Typography } from '@mui/material';

import store from './store/store.ts';
import AddHabitForm from './components/add-habit-form.tsx';
const HabitList = lazy(() => import('./components/habit-list.tsx'));
const HabitStats = lazy(() => import('./components/habit-stats.tsx'));

function App() {
  return (
    <Provider store={store}>
      <Container maxWidth="md">
        <Typography component="h1" variant="h4" align="center" sx={{ marginBottom: 4 }}>
          Habit Tracker
        </Typography>
        <AddHabitForm />

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
