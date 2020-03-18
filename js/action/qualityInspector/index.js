import * as actionTypes from '../actionTypes';
import { 
  mockQualityInspectorSheetListData, 
  mockFinishData, 
  mockTechnonigyProcessData, 
  mockMechanicalMessageData 
} from '../../mockdata/qualityInspector';
import SheetListData from '../../data/qualityInspector/SheetListData';
import TechnologyProcessListData from '../../data/qualityInspector/TechnologyProcessListData';
import MechanicalMessageListData from '../../data/qualityInspector/MechanicalMessageListData';
// 获取质检派工单成功
const getQualityInspectorSheetListSuccess = (sheetListData) => ({
  type: actionTypes.GET_QUALITYINSPECTOR_SHEET_LIST_SUCCESS,
  ...sheetListData
})

// 获取质检单-筛选条件-成功
const getFilterSheetListSuccess = (sheetListData, topNavName) => ({
  type: actionTypes.GET_QUALITYINSPECTOR_FILTER_SHEET_LIST_SUCCESS,
  filterSheetList: sheetListData,
  topNavName: topNavName,
  pageIndex: 1,
})

// 获取工艺工序列表成功
const getTechnologyProcessListSuccess = (sheetListData) => ({
  type: actionTypes.GET_TECHNOLOGYPROCESS_SHEET_LIST_SUCCESS,
  ...sheetListData
})

// 获取零件号信息成功
const getMechanicalMessageListSuccess = (sheetListData) =>({
  type:actionTypes.GET_MECHANICAL_MESSAGE_LIST_SUCCESS,
  ...sheetListData
})

// 获取默认质检单
export const getQualityInspectorSheetList = () => {
  return (dispatch) => {
    // 预留请求真实接口
    let sheetListData = SheetListData.init(mockQualityInspectorSheetListData);
    dispatch(getQualityInspectorSheetListSuccess(sheetListData));
  }
}

// 获取具有条件赛选的质检单
export const getFilterSheetList = (topNavName, url, pageIndex) => {
  return (dispatch) => {
    // 预留请求真实接口 
    let sheetListData = SheetListData.init(mockFinishData);
    dispatch(getFilterSheetListSuccess(sheetListData, topNavName));
  }
}

// 获取工艺工序列表
export const getTechnologyProcessList = () => {
  return (dispatch) => {
    //预留请求真实接口 
    let sheetListData = TechnologyProcessListData.init(mockTechnonigyProcessData);
    dispatch(getTechnologyProcessListSuccess(sheetListData));
  }
}

//获取零件号信息
export const getMechanicalMessageList = () => {
  return (dispatch) => {
    //预留请求真实接口 
    let sheetListData = MechanicalMessageListData.init(mockMechanicalMessageData);
    dispatch(getMechanicalMessageListSuccess(sheetListData));
  }
}