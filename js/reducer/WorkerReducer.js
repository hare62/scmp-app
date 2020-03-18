import  actionTypes from '../action/actionTypes';
const defaultState = {
  workerSheetList: [],
}
export default (state = defaultState, action) => {
  
  switch (action.type) {
    case actionTypes.GET_WORKER_DEFAULT_SHEET_LIST_SUCCESS:
      return {
        ...state,
        workSheetList: action.sheetList
      };

    case actionTypes.GET_WORKER_TIME_FILTER_SHEET_LIST_SUCCESS:
      return {
        ...state,
        [action.topNavName]: {
          ...state[action.topNavName],
          filterSheetList: action.filterSheetList.sheetList,
          pageIndex: action.pageIndex,
          topNavName: action.topNavName
        }
      };

    case actionTypes.GET_WORKER_TIME_FILTER_SHEET_LIST_FAILURE:
      return {
        ...state,
        [action.topNavName]: {
          ...state[action.topNavName],
          filterSheetList: action.filterSheetList.sheetList,
          pageIndex: action.pageIndex
        }
      }

    default:
      return state;
  }
}