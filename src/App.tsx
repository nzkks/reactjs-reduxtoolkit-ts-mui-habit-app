import { Provider } from 'react-redux';

import store from './app/store.ts';
import HabitTracker from './features/habit/habit-tracker.tsx';

function App() {
  return (
    <Provider store={store}>
      <HabitTracker />
    </Provider>
  );
}

export default App;
