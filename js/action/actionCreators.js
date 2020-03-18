import { fetchRequest } from '../manager/NetManager';
import  actionTypes from './actionTypes';
import SheetListData from '../data/SheetListData';
import {
  defaultMockDatas,
  lastDaysMockDatas,
  lastWeekMockDatas,
  halfYearMockDatas,
  unreportedMockDatas,
  checkingMockDatas,
  finishedMockDatas,
} from './mockData';

/**
 * 获取默认派工单成功
 */
const getDefaultSheetListSuccess = (sheetListData) => ({
  type: actionTypes.GET_DEFAULT_SHEET_LIST_SUCCESS,
  ...sheetListData
});

/**
 * 获取默认派工单失败
 */
const getDefaultSheetListFailure = () => ({
  type: actionTypes.GET_DEFAULT_SHEET_LIST_FAILURE
});

/**
 * 获取最近三天派工单成功
 */
const getLastDaysSheetListSuccess = (sheetListData) => ({
  type: actionTypes.GET_LAST_DAYS_SHEET_LIST_SUCCESS,
  ...sheetListData
});

/**
 * 获取最近一周派工单成功
 */
const getLastWeekSheetListSuccess = (sheetListData) => ({
  type: actionTypes.GET_LAST_WEEK_SHEET_LIST_SUCCESS,
  ...sheetListData
});

/**
 * 获取最近半年派工单成功
 */
const getHalfYearSheetListSuccess = (sheetListData) => ({
  type: actionTypes.GET_HALF_YEAR_SHEET_LIST_SUCCESS,
  ...sheetListData
});

/**
 * 获取未报工的派工单成功
 */
const getUnreportedSheetListSuccess = (sheetListData) => ({
  type: actionTypes.GET_UNREPORTED_SHEET_LIST_SUCCESS,
  ...sheetListData
});

/**
 * 获取质检中的派工单成功
 */
const getCheckingSheetListSuccess = (sheetListData) => ({
  type: actionTypes.GET_CHECKING_SHEET_LIST_SUCCESS,
  ...sheetListData
});

/**
 * 获取已完成的派工单成功
 */
const getFinishedSheetListSuccess = (sheetListData) => ({
  type: actionTypes.GET_FINISHED_SHEET_LIST_SUCCESS,
  ...sheetListData
});

/**
 * 获取默认的派工单列表
 */
export const getDefaultSheetList = () => {
  return(dispatch) => {
    // let url = ''

    // fetchRequest(url)
    //   .then((jsonData) => {
    //     let sheetListData = SheetListData.init(jsonData);
    //     if (sheetListData.isExist()) {
    //       dispatch(getSheetListSuccess(sheetListData));
    //     }
    //     else{
    //       throw new Error("actionCreators - getDefaultSheetList: sheetListData is not exist");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("actionCreators - getDefaultSheetList: " + error);
    //     dispatch(getSheetListSuccessFailure());
    //   });

    let listData = SheetListData.init(defaultMockDatas);
    dispatch(getDefaultSheetListSuccess(listData));
  }
};

/**
 * 获取最近三天的派工单
 */
export const getLastDaysSheetList = () => {
  return (dispatch) => {
    let listData = SheetListData.init(lastDaysMockDatas);
    dispatch(getLastDaysSheetListSuccess(listData));
  }
}

/**
 * 获取最近一周的派工单
 */
export const getLastWeekSheetList = () => {
  return (dispatch) => {
    let listData = SheetListData.init(lastWeekMockDatas);
    dispatch(getLastWeekSheetListSuccess(listData));
  }
}

/**
 * 获取最近半年的派工单
 */
export const getHalfYearSheetList = () => {
  return (dispatch) => {
    let listData = SheetListData.init(halfYearMockDatas);
    dispatch(getHalfYearSheetListSuccess(listData));
  }
}

/**
 * 获取未报工的派工单
 */
export const getUnreportedSheetList = () => {
  return (dispatch) => {
    let listData = SheetListData.init(unreportedMockDatas);
    dispatch(getUnreportedSheetListSuccess(listData));
  }
}

/**
 * 获取质检中的派工单
 */
export const getCheckingSheetList = () => {
  return (dispatch) => {
    let listData = SheetListData.init(checkingMockDatas);
    dispatch(getCheckingSheetListSuccess(listData));
  }
}

/**
 * 获取已完成的派工单
 */
export const getFinishedSheetList = () => {
  return (dispatch) => {
    let listData = SheetListData.init(finishedMockDatas);
    dispatch(getFinishedSheetListSuccess(listData));
  }
}
