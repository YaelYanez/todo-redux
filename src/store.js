import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const env = process.env.NODE_ENV;

export default createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    env === 'development'
      ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);
