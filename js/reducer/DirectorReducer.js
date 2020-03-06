import * as actionTypes from '../action/actionTypes';

const defaultState = {
  workSheetList: [],
  lastDaysSheetList: [],
  lastWeekSheetList: [],
  halfYearSheetList: [],
  unreportedSheetList: [],
  checkingSheetList: [],
  finishedSheetList: []
};

export default (state = defaultState, action) => {

  switch (action.type) {
    case actionTypes.GET_DEFAULT_SHEET_LIST_SUCCESS:
      return {
        ...state,
        workSheetList: action.sheetList
      };

    case actionTypes.GET_DEFAULT_SHEET_LIST_FAILURE:
      return state;

    case actionTypes.GET_LAST_DAYS_SHEET_LIST_SUCCESS:
      return {
        ...state,
        lastDaysSheetList: action.sheetList
      };

    case actionTypes.GET_LAST_WEEK_SHEET_LIST_SUCCESS:
      return {
        ...state,
        lastWeekSheetList: action.sheetList
      };

    case actionTypes.GET_HALF_YEAR_SHEET_LIST_SUCCESS:
      return {
        ...state,
        halfYearSheetList: action.sheetList
      };

    case actionTypes.GET_UNREPORTED_SHEET_LIST_SUCCESS:
      return {
        ...state,
        unreportedSheetList: action.sheetList
      };

    case actionTypes.GET_CHECKING_SHEET_LIST_SUCCESS:
      return {
        ...state,
        checkingSheetList: action.sheetList
      };

    case actionTypes.GET_FINISHED_SHEET_LIST_SUCCESS:
      return {
        ...state,
        finishedSheetList: action.sheetList
      };
      
    default:
      return state;
  }
};