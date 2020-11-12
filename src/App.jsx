// @flow
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

const App = () => (
  <Provider store={store}>
    <div className="App">Todo app</div>
  </Provider>
);

export default App;
