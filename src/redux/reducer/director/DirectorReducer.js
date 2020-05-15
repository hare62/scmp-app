import actionTypes from '../../action/actionTypes';
import SheetListData from '../../../data/director/SheetListData';



const defaultState = {
  workSheetList: new SheetListData(),
  lastDaysSheetList: new SheetListData(),
  lastWeekSheetList: new SheetListData(),
  halfYearSheetList: new SheetListData(),
  unreportedSheetList: new SheetListData(),
  checkingSheetList: new SheetListData(),
  finishedSheetList: new SheetListData(),
  searchWorkerSheetList: new SheetListData(),
  addressList: [],
  searchAddressList: [],
  isLoading: true,
  isLoadingMore: false
};

export default (state = defaultState, action) => {

  switch (action.type) {

    //获取默认数据成功
    case actionTypes.GET_DEFAULT_SHEET_LIST_SUCCESS:
      return {
        ...state,
        workSheetList: action.sheetListData,
        isLoading: false,
        isLoadingMore: false
      };

    //获取默认派工单失败
    case actionTypes.GET_DEFAULT_SHEET_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoadingMore: false
      };

    //获取车间主任最近三天派工单
    case actionTypes.GET_LAST_DAYS_SHEET_LIST_SUCCESS:
      return {
        ...state,
        lastDaysSheetList: action.sheetListData,
        isLoading: false,
        isLoadingMore: false
      };

    //获取车间主任最近一周派工单
    case actionTypes.GET_LAST_WEEK_SHEET_LIST_SUCCESS:
      return {
        ...state,
        lastWeekSheetList: action.sheetListData,
        isLoading: false,
        isLoadingMore: false
      };

    //获取车间主任最近半年派工单
    case actionTypes.GET_HALF_YEAR_SHEET_LIST_SUCCESS:
      return {
        ...state,
        halfYearSheetList: action.sheetListData,
        isLoading: false,
        isLoadingMore: false
      };

    //获取车间主任未报工状态派工单
    case actionTypes.GET_UNREPORTED_SHEET_LIST_SUCCESS:
      return {
        ...state,
        unreportedSheetList: action.sheetListData,
        isLoading: false,
        isLoadingMore: false
      };

    //获取车间主任报工中状态派工单
    case actionTypes.GET_CHECKING_SHEET_LIST_SUCCESS:
      return {
        ...state,
        checkingSheetList: action.sheetListData,
        isLoading: false,
        isLoadingMore: false
      };

    //获取车间主任已完成状态派工单
    case actionTypes.GET_FINISHED_SHEET_LIST_SUCCESS:
      return {
        ...state,
        finishedSheetList: action.sheetListData,
        isLoading: false,
        isLoadingMore: false
      };

    //获取通讯录成功
    case actionTypes.GET_ADDRESS_LIST_SUCCESS:
      return {
        ...state,
        addressList: action.addressList,
        isLoading: false,
      };

    //获取通讯录失败
    case actionTypes.GET_ADDRESS_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
 
    //获取查询通讯录成功
    case actionTypes.GET_SEARCH_ADDRESS_LIST_SUCCESS:
      return {
        ...state,
        searchAddressList: action.addressList
      };

    //获取查询工人派工单成功
    case actionTypes.GET_SEARCH_WORKER_SHEET_LIST_SUCCESS:
      return {
        ...state,
        searchWorkerSheetList: action.sheetListData,
        isLoading: false,
        isLoadingMore: false
      };

    //初始刷新数据状态
    case actionTypes.GET_DIRECTOR_DEFAULT_REFRESH_DATA:
      return {
        ...state,
        isLoading: true,
        isLoadingMore: false
      };

    //重置所有派工单数据
    case actionTypes.RESET_ALL_SHEET_LIST_DATA:
      return {
        ...state,
        workSheetList: new SheetListData(),
        lastDaysSheetList: new SheetListData(),
        lastWeekSheetList: new SheetListData(),
        halfYearSheetList: new SheetListData(),
        unreportedSheetList: new SheetListData(),
        checkingSheetList: new SheetListData(),
        finishedSheetList: new SheetListData(),
        searchWorkerSheetList: new SheetListData(),
      };

    //车间主任加载更多
    case actionTypes.DIRECTOR_SHEET_LIST_LOADING_MORE:
      return {
        ...state,
        isLoadingMore: true
      }

    default:
      return state;
  }
};