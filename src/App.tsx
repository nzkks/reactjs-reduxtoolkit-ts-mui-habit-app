import { Provider } from 'react-redux';
import { Container, Typography } from '@mui/material';

import store from './store/store.ts';

function App() {
  return (
    <Provider store={store}>
      <Container maxWidth="md">
        <Typography component="h1" variant="h4" align="center">
          Habit Tracker
        </Typography>
      </Container>
    </Provider>
  );
}

export default App;
