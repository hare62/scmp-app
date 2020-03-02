import Types from '../../action/types';

const defaultState = {};

/**
 * 
 * @param {*} state 
 * @param {*} action 
 * 
 */

export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.WORKERSHOP_FIRST_lOAD_SUCCESS://下拉刷新成功
            return {
                ...state,
               data:action.data
            };
        
        default:
            return state;
    }

}