import {combineReducers} from 'redux';
import theme from './theme';
import popular from './popular';
import trending from './rending';
import favorite from './favorite'

/**
 * 1.合并reducer
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */
const index = combineReducers({
    theme:theme,
    popular:popular,
    trending:trending,
    favorite:favorite


});

export default index;
