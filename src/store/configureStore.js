import {
  createStore,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

export default function configureStore() {
  // due to performance issues, only include redux-logger in dev
  let middleware = [thunk];
  if (process.env.NODE_ENV !== 'production') {
    const {
      logger,
    } = require('redux-logger');
    middleware = [...middleware, logger];
  }

  const store = createStore(reducers, applyMiddleware(...middleware));

  return store;
}
