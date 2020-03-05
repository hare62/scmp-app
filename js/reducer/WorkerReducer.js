import * as actionTypes from '../action/actionTypes';
const defaultState = {
  workerSheetList: []
}
export default (state = defaultState, action) => {

  switch (action.type) {
    case actionTypes.GET_WORKER_DEFAULT_SHEET_LIST_SUCCESS:
      return {
        ...state,
        workSheetList: action.sheetList
      };
    default:
      return state;
  }
}