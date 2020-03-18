import { combineReducers } from 'redux';
import DirectorReducer from './DirectorReducer';
import WorkerReducer from './WorkerReducer';
import LoginReducer from './login/LoginReducer';
import QualityInspectorReducer from './qualityInspector/qualityInspectorReducer';

const reducers = combineReducers({
  director: DirectorReducer,
  Worker: WorkerReducer,
  login: LoginReducer,
  qualityInspector: QualityInspectorReducer
});

export default reducers;
