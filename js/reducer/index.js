import { combineReducers } from 'redux';
import DirectorReducer from './DirectorReducer';

const reducers = combineReducers({
  director: DirectorReducer
});

export default reducers;
