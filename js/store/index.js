import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducer';

/**
 * action日志 调试中间件
 */
const logger = store => next => action => {
  if (typeof action === 'function') {
    console.log('dispatching a function');
  } else {
    console.log('dispatching', action);
  }
  const result = next(action);
  console.log('nextState', store.getState());

  return result;
};

const middlewares = [
  // logger,
  thunk,
];

const store = createStore(reducers, applyMiddleware(...middlewares));

export default store;
