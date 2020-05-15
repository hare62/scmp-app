import actionTypes from '../../action/actionTypes';
import SheetListData from '../../../data/qualityInspector/SheetListData';

const defaultState = {
  qualityInspectorSheetList: new SheetListData(),
  noMechanicalList:''
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_QUALITYINSPECTOR_SHEET_LIST_SUCCESS:
      return {
        ...state,
        qualityInspectorSheetList: action.sheetList
      };
    case actionTypes.GET_QUALITYINSPECTOR_FILTER_SHEET_LIST_SUCCESS:
      return {
        ...state,
        [action.topNavName]: {
          ...state[action.topNavName],
          filterSheetList: action.filterSheetList.sheetList,
          pageIndex: action.pageIndex,
          topNavName: action.topNavName
        }
      };
    case actionTypes.GET_TECHNOLOGYPROCESS_SHEET_LIST_SUCCESS:
      return {
        ...state,
        technologyProcessList: action.processList
      }
    case actionTypes.GET_MECHANICAL_MESSAGE_LIST_SUCCESS:
      return {
        ...state,
        mechanicalList: action.processList
      }
    case actionTypes.GET_NO_MECHANICAL_LIST_SUCCESS:
      return {
        ...state,
        noMechanicalList:action.noMechanicalList
      }
    
    default:
      return state;
  }
}