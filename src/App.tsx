import { Provider } from 'react-redux';

import store from './state/store.ts';
import HabitTracker from './components/habit/habit-tracker.tsx';

function App() {
  return (
    <Provider store={store}>
      <HabitTracker />
    </Provider>
  );
}

export default App;
