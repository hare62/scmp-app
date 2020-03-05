import { combineReducers } from 'redux';
import DirectorReducer from './DirectorReducer';
import WorkerReducer from './WorkerReducer'

const reducers = combineReducers({
  director: DirectorReducer,
  Worker: WorkerReducer
});

export default reducers;
