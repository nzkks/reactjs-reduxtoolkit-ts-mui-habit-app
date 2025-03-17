import { Provider } from 'react-redux';
import { Container, Typography } from '@mui/material';

import store from './store/store.ts';
import AddHabbitForm from './components/add-habit-form.tsx';

function App() {
  return (
    <Provider store={store}>
      <Container maxWidth="md">
        <Typography component="h1" variant="h4" align="center" sx={{ marginBottom: 4 }}>
          Habit Tracker
        </Typography>
        <AddHabbitForm />
      </Container>
    </Provider>
  );
}

export default App;
