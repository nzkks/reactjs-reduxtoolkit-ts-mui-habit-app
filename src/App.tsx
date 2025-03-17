import { Provider } from 'react-redux';

import store from './store/store.ts';

function App() {
  return (
    <Provider store={store}>
      <div>Habit app</div>
    </Provider>
  );
}

export default App;
