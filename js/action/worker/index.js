import * as actionTypes from '../actionTypes';
import {
  defaultMockDatas,
} from '../../mockdata/worker';
import SheetListData from '../../data/SheetListData';
import { fetchRequest } from '../../manager/NetManager';

/**
 * 工人派工单 查询、报工、详情
 */
const getDefaultSheetListSuccess = (sheetListData) => ({
  type: actionTypes.GET_WORKER_DEFAULT_SHEET_LIST_SUCCESS,
  ...sheetListData
});

//获取工人派工单
export const getDefaultSheetList = () => {
  return (dispatch) => {
    let sheetListData = SheetListData.init(defaultMockDatas);
    dispatch(getDefaultSheetListSuccess(sheetListData));
  }
};

export const getFilterSheetList = (topNavName, url, pageIndex) => {
  return (dispatch) => {
    let sheetListData = SheetListData.init(defaultMockDatas);
    dispatch({
      type: actionTypes.GET_WORKER_TIME_FILTER_SHEET_LIST_SUCCESS,
      filterSheetList: sheetListData,
      topNavName: topNavName,
      pageIndex: 1,
    })
  }
}