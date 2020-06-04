import actionTypes from '../actionTypes';
import {
  mockQualityInspectorSheetListData,
  mockFinishData,
  mockTechnonigyProcessData,
  mockMechanicalMessageData,
  mockNoMechanicalData,
  StandardItemofNoMechanical,
  mockScrapProcessList,
  mockFactoryList,
  mockSupplierList,
  mockMonitorList
} from '../../../data/mockdata/qualityInspector';
import SheetListData from '../../../data/qualityInspector/SheetListData';
import ProcessListData from '../../../data/qualityInspector/ProcessListData';
import MechanicalMessageListData from '../../../data/qualityInspector/MechanicalMessageListData';
import NoMechanicalListData from '../../../data/qualityInspector/NoMechanicalListData';
import StandardItemDataList from '../../../data/qualityInspector/StandardItemDataList';
import ScrapProcessListData from '../../../data/qualityInspector/ScrapProcessListData';
import ResponsiblePartyListData from '../../../data/qualityInspector/ResponsiblePartyListData';
import RNFS, { readFile } from 'react-native-fs';
import { fetchRequest, fetchHeaderRequestTest, fetchRequestTest } from '../../../api/NetManager';
import MD5 from "react-native-md5";
import AsyncStorage from '@react-native-community/async-storage';
import { getHost, isPageUrl, isMockData } from '../../../utils/Config';
import axios from "axios";

const host = getHost('manufacture');

// 获取质检派工单成功 actionTypes.GET_QUALITYINSPECTOR_SHEET_LIST_SUCCESS
const getQualityInspectorSheetListSuccess = (sheetListData) => ({
  type: actionTypes.GET_QUALITYINSPECTOR_SHEET_LIST_SUCCESS,
  sheetListData
})

/**
 * 加载更多状态
 */
const getLoadingStatus = () => ({
  type: actionTypes.LOADING_MORE_DATA
})

/**
 * 获取质检派工单数据失败
 */
const getSheetListFailure = () => ({
  type: actionTypes.QUALIYT_INSPECTOR_SHEET_LIST_DATA_FAILURE,
})

/**
 * 重置质检单默认数据
 * resetDefaultSheetList
 */
export const resetDefaultSheetList = () => ({
  type: actionTypes.RESET_QualityINSPECTOR_DEFAULT_SHEET_LIST
})

// 获取质检单-筛选条件-成功
const getFilterSheetListSuccess = (sheetListData, topNavName) => ({
  type: actionTypes.GET_QUALITYINSPECTOR_FILTER_SHEET_LIST_SUCCESS,
  filterSheetList: sheetListData,
  topNavName: topNavName,
})

// 获取工艺工序列表成功
const getTechnologyProcessListSuccess = (sheetListData) => ({
  type: actionTypes.GET_TECHNOLOGYPROCESS_SHEET_LIST_SUCCESS,
  ...sheetListData
})

/**
 * 获取质检单工艺工序列表失败
 */
const getTechnologyProcessListFailure = () => ({
  type: actionTypes.GET_QUALITY_INSPECTOR_TECHNOLOGTY_PROCESS_LIST_FAILURE
})

// 获取零件号信息成功
const getMechanicalMessageListSuccess = (sheetListData) => ({
  type: actionTypes.GET_MECHANICAL_MESSAGE_LIST_SUCCESS,
  ...sheetListData
})

//获取上传文件的名字和ID
const getUploadFileSuccess = (fileUploadData) => ({
  type: actionTypes.IS_SUCCESS_OF_FILE_UPLOAD,
  fileUploadData
})
//获取无零件号质检信息成功
const getNoMechanicalMEssageSuccess = (noMechanicalList) => ({
  type: actionTypes.GET_NO_MECHANICAL_LIST_SUCCESS,
  noMechanicalList
})

//获取无零件号质检信息失败
const getNoMechanicalMEssageFailure = (noMechanicalList) => ({
  type: actionTypes.GET_NO_MECHANICAL_LIST_FAILURE,
  ...noMechanicalList
})

////获取无零件号的标准项详情
const getStandarItemDetailOfNoMechanicalSuccess = (sheetListData) => ({
  type: actionTypes.GET_QUALITY_INSPECTOR_SHEET_LIST_SUCCESS,
  ...sheetListData
})

//改变无零件号标准项的质检结果值
const onChangeNoChanicalRealValueResultSuccess = (standardItemList) => ({
  type: actionTypes.ON_CHANGE_NO_CHANICAL_REALVALUE_RESULT_SUCCESS,
  standardItemList
})

//改变有零件号标准项的质检结果值
const onChangeStandardItemListSuccess = (standardItemList) => ({
  type: actionTypes.ON_CHANGE_STANDARD_ITEM_LIST_SUCCESS,
  standardItemList
})

//获取有零件号的标准项成功
const getStandarItemSuccess = (standardItemList) => ({
  type: actionTypes.GET_STANDAR_ITEM_SUCCESS,
  standardItemList: standardItemList.standardItemList
})

// 获取有零件号的标准项失败
const getStandarItemFailure = () => ({
  type: actionTypes.GET_NO_MECHANICAL_STANDAR_ITEM_FAILUR,
})

// 获取无零件号的标准项失败
const getNoMechanicalStandarItemFailure = () => ({
  type: actionTypes.GET_STANDAR_ITEM_FAILURE,
})

/**
 * 质检单刷新状态
 */
const qualitySheetListRefresh = () => ({
  type: actionTypes.QUALITY_SHEET_LIST_REFRESH,
})

//获取报废工艺
const getScrapProcessListSucess = (jsonData) => ({
  type: actionTypes.GET_SCRAP_PROCESS_LIST_SUCESS,
  ...jsonData
})
//获取工厂列表
const getFactoryListSucess = (jsonData) => ({
  type: actionTypes.GET_FACTORY__LIST_SUCESS,
  jsonData
})

//获取供应商列表
const getSupplierListSucess = (jsonData) => ({
  type: actionTypes.GET_SUPPLIER__LIST_SUCESS,
  jsonData
})

//获取班组列表成功
const getMonitorListSucess = (jsonData) => ({
  type: actionTypes.GET_MONITOR__LIST_SUCESS,
  jsonData
})

//获取默认质检单
export const getQualityInspectorSheetList = (callBack) => {
  return async (dispatch) => {
    dispatch(qualitySheetListRefresh());
    let sheetListData = new SheetListData();
    const Range = sheetListData.generateHeaderData();
    let url = `${host}/app-qlt-inspection/qltDispatchMessage`;
    if (isMockData) {
      sheetListData.appendDatas(mockQualityInspectorSheetListData);
      let newSheetListData = new SheetListData();
      newSheetListData.copy(sheetListData);
      dispatch(getQualityInspectorSheetListSuccess(newSheetListData));

    } else {
      fetchHeaderRequestTest({ url, type: "GET", Range })
        .then((responseData) => {
          const { jsonData, headers } = responseData;
          sheetListData.appendDatas(jsonData);
          let newSheetListData = new SheetListData();
          newSheetListData.copy(sheetListData);
          newSheetListData.parseHeaderData(headers);
          dispatch(getQualityInspectorSheetListSuccess(newSheetListData));
        }).catch((error) => {
          dispatch(getSheetListFailure());
          console.warn("action - qualityInspector - catch -getQualityInspectorSheetList " + error)
        })
    }
  }
}

/**
 * 获取下拉加载更多默认质检单
 */
export const getLoadingMoreSheetList = (sheetListData, callBack) => {
  return async (dispatch) => {
    dispatch(getLoadingStatus());
    const Range = sheetListData.generateHeaderData();
    let url;
    if (isPageUrl) {
      url = `${host}/app-qlt-inspection/qltDispatchMessage`;
    } else {
      url = `${host}/app-qlt-inspection/qltDispatchMessage`;
    }
    if (isMockData) {
      sheetListData.appendDatas(mockQualityInspectorSheetListData);
      let newSheetListData = new SheetListData();
      newSheetListData.copy(sheetListData);
      dispatch(getQualityInspectorSheetListSuccess(newSheetListData));
    } else {
      fetchHeaderRequestTest({ url, type: 'GET', Range })
        .then((responseData) => {
          const { jsonData, headers } = responseData;
          sheetListData.appendDatas(jsonData);
          let newSheetListData = new SheetListData();
          newSheetListData.copy(sheetListData);
          newSheetListData.parseHeaderData(headers);
          dispatch(getQualityInspectorSheetListSuccess(newSheetListData));
        }).catch((error) => {
          dispatch(getSheetListFailure());
          console.warn("action - qualityInspector - catch -getLoadingMoreSheetList " + error)
        })
    }
  }
};

/**加载更多
 * 获取筛选条件的派工单
 * 近三天，近一周，近一个月
 * 未报工，已报工，已完成
 * @param {*} topNavName
 * @param {*} url
 */
// 获取具有条件赛选的质检单
export const getPullUpRefreshFilterSheetList = (key, value) => {
  return async (dispatch) => {
    dispatch(getLoadingStatus());
    let sheetListData = new SheetListData();
    const Range = sheetListData.generateHeaderData();
    let url;

    if (isPageUrl) {
      url = `${host}/app-qlt-inspection/qltDispatchMessage?${value}`;
    } else {
      url = `${host}/app-qlt-inspection/qltDispatchMessage?${value}`;
    }
    console.log("url", url);

    if (isMockData) {
      sheetListData.appendDatas(mockFinishData);
      let newSheetListData = new SheetListData();
      newSheetListData.copy(sheetListData);
      dispatch(getFilterSheetListSuccess(newSheetListData, key));

    } else {
      fetchHeaderRequestTest({ url, type: "GET", Range })
        .then((responseData) => {
          const { jsonData, headers } = responseData;
          sheetListData.appendDatas(jsonData);
          let newSheetListData = new SheetListData();
          newSheetListData.copy(sheetListData);
          newSheetListData.parseHeaderData(headers);
          dispatch(getFilterSheetListSuccess(newSheetListData, key));
          console.log(newSheetListData);
        })
        .catch((error) => {
          dispatch(getSheetListFailure());
          console.warn("action - qualityInspector - catch -getPullUpRefreshFilterSheetList " + error);
        })
    }
  }
}

/**加载更多
 * 获取筛选条件的派工单
 * 近三天，近一周，近一个月
 * 未报工，已报工，已完成
 * @param {*} topNavName
 * @param {*} url
 */
// 获取具有条件赛选的质检单
export const getFilterSheetList = (sheetListData, key, value) => {
  return async (dispatch) => {
    dispatch(getLoadingStatus());
    const Range = sheetListData.generateHeaderData();
    let url;
    if (isPageUrl) {
      url = `${host}/manufacture/pro-inventory`;
    } else {
      url = `${host}/app-qlt-inspection/qltDispatchMessage?${value}`;
    }

    if (isMockData) {

      sheetListData.appendDatas(mockFinishData);
      let newSheetListData = new SheetListData();
      newSheetListData.copy(sheetListData);
      dispatch(getFilterSheetListSuccess(newSheetListData, key));

    } else {
      fetchHeaderRequestTest({ url, type: "GET", Range })
        .then((responseData) => {
          const { jsonData, headers } = responseData;
          sheetListData.appendDatas(jsonData);
          let newSheetListData = new SheetListData();
          newSheetListData.copy(sheetListData);
          newSheetListData.parseHeaderData(headers);
          dispatch(getFilterSheetListSuccess(newSheetListData, key));
        })
        .catch((error) => {
          dispatch(getSheetListFailure());
          console.warn("action - qualityInspector - catch -getFilterSheetList " + error);
        })
    }
  }
}

// 获取工艺工序列表
export const getTechnologyProcessList = (sheetId) => {
  return async (dispatch) => {

    const url = `${host}/app-qlt-inspection/qltTechnologyList?sheetId=${sheetId}`;
    if (isMockData) {

      let sheetListData = ProcessListData.init(mockTechnonigyProcessData);
      dispatch(getTechnologyProcessListSuccess(sheetListData));

    } else {
      fetchRequestTest({ url, type: "GET" })
        .then((jsonData) => {
          let sheetListData = ProcessListData.init(jsonData);
          dispatch(getTechnologyProcessListSuccess(sheetListData));
        })
        .catch((error) => {
          dispatch(getTechnologyProcessListFailure())
          console.warn("action - qualityInspector - catch - getTechnologyProcessList " + error);
        })
    }
  }
}

// 获取零件号信息
export const getMechanicalMessageList = ({ proInspectionId }) => {
  return (dispatch) => {
    const url = `${host}/app-qlt-inspection/partNoList?proInspectionId=` + proInspectionId;
    if (isMockData) {
      let sheetListData = MechanicalMessageListData.init(mockMechanicalMessageData);
      dispatch(getMechanicalMessageListSuccess(sheetListData));
    } else {
      fetchRequestTest({ url, type: "GET" })
        .then((jsonData) => {
          let sheetListData = MechanicalMessageListData.init(jsonData);
          dispatch(getMechanicalMessageListSuccess(sheetListData));
        })
        .catch((error) => {
          console.warn("action - qualityInspector - catch - getMechanicalMessageList " + error);
        })
    }
  }
}

// 获取质检已完成的无零件号信息
export const getNoMechanicalMessageDetail = (callBack) => {
  return (dispatch) => {
    let NoMechanicalList = NoMechanicalListData.init(mockNoMechanicalData);
    dispatch(getNoMechanicalMEssageSuccess(NoMechanicalList));
  }
}

// 无零件号质检提交
export const postSubmitResult = (proInspectionId, callBack) => {
  return (dispatch) => {
    const url = `${host}/app-qlt-inspection/submitAppQltInspection?proInspectionId=` + proInspectionId;
    if (isMockData) {
      if (typeof callBack === 'function') {
        callBack('MockData提交新增零件号');
      }
    } else {
      fetchRequestTest({ url, type: "PUT" })
        .then((jsonData) => {
          if (jsonData.STATUS === "SUCCESS" && jsonData.MESSAGE === "保存成功") {
            if (typeof callBack === 'function') {
              callBack(jsonData.MESSAGE, true);
            }
          } else {
            if (typeof callBack === 'function') {
              callBack(jsonData.MESSAGE, false);
            }
          }
        })
        .catch((error) => {
          console.warn("action - qualityInspector - catch - postSubmitResult " + error);
        })
    }
  }
}

// 上传文件的文件名和ID保存
export const FileUploadSave = (files) => {
  return (dispatch) => {
    //TODO
    dispatch(getUploadFileSuccess({ files }));
  }
}

// 无零件号质检保存
export const postSaveResult = (result, callBack) => {
  return () => {
    const url = `${host}/app-qlt-inspection/saveAppQltInspection`;
    if (isMockData) {
      if (typeof callBack === 'function') {
        callBack('MockData保存新增零件号');
      }
    } else {
      fetchRequestTest({ url, type: "POST", body: result })
        .then((jsonData) => {
          if (jsonData.STATUS === "SUCCESS" && jsonData.MESSAGE === "保存成功") {
            if (typeof callBack === 'function') {
              callBack(jsonData.MESSAGE);
            }
          } else {
            if (typeof callBack === 'function') {
              callBack(jsonData.MESSAGE);
            }
          }
        })
        .catch((error) => {
          console.warn("action - qualityInspector - catch - postSaveResult " + error);
        })
    }
  }
}

//提交总的零件号信息
export const postTotalMechanicalMessage = (proInspectionId, callBack) => {
  return () => {
    const url = `${host}/app-qlt-inspection/submitAppQltInspection?proInspectionId=` + proInspectionId;
    if (isMockData) {
      if (typeof callBack === 'function') {
        callBack('MockData提交新增零件号');
      }
    } else {
      fetchRequestTest({ url, type: "PUT" })
        .then((jsonData) => {
          if (jsonData.STATUS === "SUCCESS" && jsonData.MESSAGE === "保存成功") {
            if (typeof callBack === 'function') {
              callBack(jsonData.MESSAGE, true);
            }
          } else {
            if (typeof callBack === 'function') {
              callBack(jsonData.MESSAGE, false);
            }
          }
        })
        .catch((error) => {
          console.warn("action - qualityInspector - catch - postTotalMechanicalMessage " + error);
        })
    }
  }
}

//获取无零件号的标准项详情
export const getStandarItemDetailOfNoMechanical = (technologyId, proInspectionId) => {
  return (dispatch) => {
    const url = `${host}/app-qlt-inspection/qltInspectionStandard?technologyId=${technologyId}
       &proInspectionId=${proInspectionId}`;
    if (isMockData) {

      let sheetListData = StandardItemDataList.init(StandardItemofNoMechanical);
      dispatch(getStandarItemDetailOfNoMechanicalSuccess(sheetListData));

    } else {
      fetchRequestTest({ url, type: "GET" })
        .then((jsonData) => {
          let sheetListData = StandardItemDataList.init(jsonData);
          dispatch(getStandarItemDetailOfNoMechanicalSuccess(sheetListData));
        })
        .catch((error) => {
          // dispatch(getStandarItemFailure())
          console.warn("action - qualityInspector - catch - getStandarItemDetailOfNoMechanical " + error);
        })
    }
    // let sheetListData = StandardItemDataList.init(StandardItemofNoMechanical);
    // dispatch(getStandarItemDetailOfNoMechanicalSuccess(sheetListData));
  }
}

//改变无零件号标准项的质检结果值
export const onChangeNoChanicalRealValueResult = (standarItemOfNoMechanical) => {
  return (dispatch) => {
    dispatch(onChangeNoChanicalRealValueResultSuccess(standarItemOfNoMechanical))
  }
}

//获取有零件号的标准项
export const getStandarItem = ({ technologyId, partNo, proInspectionId }, callBack) => {
  return async (dispatch) => {
    const url = `${host}/app-qlt-inspection/qltInspectionStandard?technologyId=${technologyId}
       &proInspectionId=${proInspectionId}&partNo=${partNo}`;
    if (isMockData) {

      let sheetListData = StandardItemDataList.init(StandardItemofNoMechanical);
      dispatch(getStandarItemSuccess(sheetListData));

    } else {
      fetchRequestTest({ url, type: "GET" })
        .then((jsonData) => {
          let sheetListData = StandardItemDataList.init(jsonData);
          dispatch(getStandarItemSuccess(sheetListData));
          if (typeof callBack === 'function') {
            callBack(sheetListData);
          }
        })
        .catch((error) => {
          dispatch(getNoMechanicalStandarItemFailure());
          console.warn("action - qualityInspector - catch - getStandarItem " + error);
        })
    }
    // let sheetListData = StandardItemDataList.init(StandardItemofNoMechanical);
    // dispatch(getStandarItemSuccess(sheetListData));
  }
}

//保存新增零件号
export const postAddMechanical = (result, callBack) => {
  return () => {
    const url = `${host}/app-qlt-inspection/saveAppQltInspection`;
    if (isMockData) {
      if (typeof callBack === 'function') {
        callBack('MockData提交新增零件号');
      }
    } else {
      fetchRequestTest({ url, type: "POST", body: result })
        .then((jsonData) => {
          if (jsonData.STATUS === "SUCCESS" && jsonData.MESSAGE === "保存成功") {
            if (typeof callBack === 'function') {
              callBack(jsonData.MESSAGE);
            }
          } else {
            if (typeof callBack === 'function') {
              callBack(jsonData.MESSAGE);
            }
          }
        })
        .catch((error) => {
          console.warn("action - qualityInspector - catch - getStandarItem " + error);
        })
    }
  }
}

//改变有零件号标准项的质检结果值
export const onChangeStandardItemList = (standarItem) => {
  return (dispatch) => {
    dispatch(onChangeStandardItemListSuccess(standarItem))
  }
}

//下载文件路劲
export const getPartFile = ({ qltSheetId }, callBack) => {
  return async () => {
    const url = `${host}/qlt-pro-inspection/partFile?dateId=${qltSheetId}`;
    const token = await AsyncStorage.getItem("token");
    axios.get(url, {
      headers: {
        'Accept': 'application/json',
        'token': token
      },
    })
      .then(function (response) {
        if (response.status === 200) {
          if (typeof callBack === 'function') {
            callBack(response.data)//没有文件返回的是""空字符串
          }
        }
      })
      .catch(function (error) {
        console.warn("action - qualityInspector - catch - getPartFile " + error);
      });
  }
}

//无零件号获取文件路劲
export const getModifyFilePath = ({ proInspectionId }, callBack) => {
  return async () => {
    const token = await AsyncStorage.getItem("token");
    const url = `${host}/qlt-pro-inspection/partFile?dateId=${proInspectionId}`;
    axios.get(url, {
      headers: {
        'Accept': 'application/json',
        'token': token
      },
    })
      .then(function (response) {
        if (response.status === 200) {
          if (typeof callBack === 'function') {
            callBack(response.data)//没有文件返回的是""空字符串
          }
        }
      })
      .catch(function (error) {
        console.warn("action - qualityInspector - catch - getModifyFilePath " + error);
      });
  }
}

//获取报废工艺列表
export const getScrapProcessList = (proInspectionId) => {
  return (dispatch) => {
    const url = `${host}/qlt-pro-inspection/technologies?proInspectionId=${proInspectionId}`;
    if (isMockData) {
      let jsonData = ScrapProcessListData.init(mockScrapProcessList);
      dispatch(getScrapProcessListSucess(jsonData));
    } else {
      fetchRequestTest({ url, type: "GET" })
        .then((jsonData) => {
          let scrapProcessListData = ScrapProcessListData.init(jsonData);
          dispatch(getScrapProcessListSucess(scrapProcessListData));
        })
        .catch((error) => {
          console.warn("action - qualityInspector - catch - getScrapProcessList " + error);
        })
    }
  }
}

//获取工厂列表
export const getFactoryList = ({ responsiblePartyType, name }) => {
  return async (dispatch) => {
    let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxZTgxZTQ5MGQ3OWQ0OWU3OTg5ZjJjNWYxMTY5Mjc1OSIsImlhdCI6MTU5MDY3NjUwMiwiZXhwIjoxNTkwNjgwMTAyfQ.sV-I5udmXdZqO3mTkKZF2qdP2uNlT1y9grQGBt3oF3qAhjCflm5WkaiWKmC2ZYyI0rnWwFRrJ1v85TkNl4jHAg";
    let responsiblePartyListData = new ResponsiblePartyListData();
    // const url = `${host}/qlt-pro-inspection/sup?responsiblePartyType=${responsiblePartyType}&name=${name}`;
    if (isMockData) {

      // responsiblePartyListData.appendDatas(mockFactoryList);
      // let newResponsiblePartyListData = new ResponsiblePartyListData();
      // newResponsiblePartyListData.copy(responsiblePartyListData);
      // dispatch(getFactoryListSucess(newResponsiblePartyListData));
      // let sheetListData = new ResponsiblePartyListData();

      const Range = responsiblePartyListData.generateHeaderData();
      let url;
      if (name) {//模糊搜索数据
        url = `${host}/qlt-pro-inspection/sup?responsiblePartyType=${responsiblePartyType}&name=${name}`;
      } else {//默认数据
        url = `${host}/qlt-pro-inspection/sup?responsiblePartyType=${responsiblePartyType}`;
      }
      fetchHeaderRequestTest({ url, type: "GET", Range, newToken: token })
        .then((responseData) => {
          const { jsonData, headers } = responseData;
          responsiblePartyListData.appendDatas(jsonData);
          let newResponsiblePartyListData = new ResponsiblePartyListData();
          newResponsiblePartyListData.copy(responsiblePartyListData);
          newResponsiblePartyListData.parseHeaderData(headers);
          dispatch(getFactoryListSucess(newResponsiblePartyListData));
        })
        .catch((error) => {
          console.warn("action - qualityInspector - catch - getFactoryList " + error);
        })
    } else {

      const Range = responsiblePartyListData.generateHeaderData();
      let url;
      if (name) {//模糊搜索数据
        url = `${host}/qlt-pro-inspection/sup?responsiblePartyType=${responsiblePartyType}&name=${name}`;
      } else {//默认数据
        url = `${host}/qlt-pro-inspection/sup?responsiblePartyType=${responsiblePartyType}`;
      }
      fetchHeaderRequestTest({ url, type: "GET", Range })
        .then((responseData) => {
          const { jsonData, headers } = responseData;
          responsiblePartyListData.appendDatas(jsonData);
          let newResponsiblePartyListData = new ResponsiblePartyListData();
          newResponsiblePartyListData.copy(responsiblePartyListData);
          newResponsiblePartyListData.parseHeaderData(headers);
          dispatch(getFactoryListSucess(newResponsiblePartyListData));
        })
        .catch((error) => {
          console.warn("action - qualityInspector - catch - getFactoryList " + error);
        })
    }
  }
}

/**
 * @param {获取下拉加载更多默认工厂数据} param0 
 */
export const getMoreFactoryList = ({ responsiblePartyType, factoryList }) => {
  return async (dispatch) => {
    dispatch(getLoadingStatus());
    let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxZTgxZTQ5MGQ3OWQ0OWU3OTg5ZjJjNWYxMTY5Mjc1OSIsImlhdCI6MTU5MDY3NjUwMiwiZXhwIjoxNTkwNjgwMTAyfQ.sV-I5udmXdZqO3mTkKZF2qdP2uNlT1y9grQGBt3oF3qAhjCflm5WkaiWKmC2ZYyI0rnWwFRrJ1v85TkNl4jHAg";
    const Range = factoryList.generateHeaderData();
    let url;
    if (isMockData) {
      // sheetListData.appendDatas(defaultMockDatas);
      // let newSheetListData = new SheetListData();
      // newSheetListData.copy(sheetListData);
      // dispatch(getDefaultSheetListSuccess(newSheetListData));
      url = `${host}/qlt-pro-inspection/sup?responsiblePartyType=${responsiblePartyType}`;
      fetchHeaderRequestTest({ url, type: 'GET', newToken: token, Range })
        .then((responseData) => {
          const { jsonData, headers } = responseData;
          factoryList.appendDatas(jsonData);
          let newFactoryList = new ResponsiblePartyListData();
          newFactoryList.copy(factoryList);
          newFactoryList.parseHeaderData(headers);
          setTimeout(() => { dispatch(getFactoryListSucess(newFactoryList)); }, 2000)
        }).catch((error) => {
          dispatch(getSheetListFailure());
          console.warn("action - Worker - catch -getLoadingMoreSheetList " + error)
        })
    } else {
      url = `${host}/qlt-pro-inspection/sup?responsiblePartyType=${responsiblePartyType}`;
      fetchHeaderRequestTest({ url, type: 'GET', Range })
        .then((responseData) => {
          const { jsonData, headers } = responseData;
          factoryList.appendDatas(jsonData);
          let newFactoryList = new ResponsiblePartyListData();
          newFactoryList.copy(factoryList);
          newFactoryList.parseHeaderData(headers);
          setTimeout(() => { dispatch(getFactoryListSucess(newFactoryList)); }, 2000)
        }).catch((error) => {
          dispatch(getSheetListFailure());
          console.warn("action - Worker - catch -getLoadingMoreSheetList " + error)
        })
    }
  }
};

/**
 * 
 * @param {获取供应商列表 } param0 
 */
export const getSupplierList = ({ responsiblePartyType, name }) => {
  return (dispatch) => {
    let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxZTgxZTQ5MGQ3OWQ0OWU3OTg5ZjJjNWYxMTY5Mjc1OSIsImlhdCI6MTU5MDY3NjUwMiwiZXhwIjoxNTkwNjgwMTAyfQ.sV-I5udmXdZqO3mTkKZF2qdP2uNlT1y9grQGBt3oF3qAhjCflm5WkaiWKmC2ZYyI0rnWwFRrJ1v85TkNl4jHAg";
    let responsiblePartyListData = new ResponsiblePartyListData();
    // const url = `${host}/qlt-pro-inspection/sup?responsiblePartyType=${responsiblePartyType}&name=${name}`;
    if (isMockData) {
      // responsiblePartyListData.appendDatas(mockSupplierList);
      // let newResponsiblePartyListData = new ResponsiblePartyListData();
      // newResponsiblePartyListData.copy(responsiblePartyListData);
      // dispatch(getSupplierListSucess(newResponsiblePartyListData));

      const Range = responsiblePartyListData.generateHeaderData();
      let url;

      if (name) {//模糊搜索数据
        url = `${host}/qlt-pro-inspection/sup?responsiblePartyType=${responsiblePartyType}&name=${name}`;
      } else {//默认数据
        url = `${host}/qlt-pro-inspection/sup?responsiblePartyType=${responsiblePartyType}`;
      }
      fetchHeaderRequestTest({ url, type: "GET", Range, newToken: token })
        .then((responseData) => {
          const { jsonData, headers } = responseData;
          responsiblePartyListData.appendDatas(jsonData);
          let newResponsiblePartyListData = new ResponsiblePartyListData();
          newResponsiblePartyListData.copy(responsiblePartyListData);
          newResponsiblePartyListData.parseHeaderData(headers);
          dispatch(getSupplierListSucess(newResponsiblePartyListData));
        })
        .catch((error) => {
          console.warn("action - qualityInspector - catch - getFactoryList " + error);
        })
    } else {
      const Range = responsiblePartyListData.generateHeaderData();
      let url;
      if (name) {//模糊搜索数据
        url = `${host}/qlt-pro-inspection/sup?responsiblePartyType=${responsiblePartyType}&name=${name}`;
      } else {//默认数据
        url = `${host}/qlt-pro-inspection/sup?responsiblePartyType=${responsiblePartyType}`;
      }
      fetchHeaderRequestTest({ url, type: "GET", Range })
        .then((responseData) => {
          const { jsonData, headers } = responseData;
          responsiblePartyListData.appendDatas(jsonData);
          let newResponsiblePartyListData = new ResponsiblePartyListData();
          newResponsiblePartyListData.copy(responsiblePartyListData);
          newResponsiblePartyListData.parseHeaderData(headers);
          dispatch(getSupplierListSucess(newResponsiblePartyListData));
        })
        .catch((error) => {
          console.warn("action - qualityInspector - catch - getFactoryList " + error);
        })
    }
  }
}

/**
 * @param {获取下拉加载更多默认供应商数据} param0 
 */
export const getMoreSupplierList = ({ responsiblePartyType, supplierList }) => {
  return async (dispatch) => {
    //加载更多状态
    dispatch(getLoadingStatus());
    let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxZTgxZTQ5MGQ3OWQ0OWU3OTg5ZjJjNWYxMTY5Mjc1OSIsImlhdCI6MTU5MDY3NjUwMiwiZXhwIjoxNTkwNjgwMTAyfQ.sV-I5udmXdZqO3mTkKZF2qdP2uNlT1y9grQGBt3oF3qAhjCflm5WkaiWKmC2ZYyI0rnWwFRrJ1v85TkNl4jHAg";
    const Range = supplierList.generateHeaderData();
    let url;
    if (isMockData) {
      url = `${host}/qlt-pro-inspection/sup?responsiblePartyType=${responsiblePartyType}`;
      fetchHeaderRequestTest({ url, type: 'GET', newToken: token, Range })
        .then((responseData) => {
          const { jsonData, headers } = responseData;
          supplierList.appendDatas(jsonData);
          let newSupplierList = new ResponsiblePartyListData();
          newSupplierList.copy(supplierList);
          newSupplierList.parseHeaderData(headers);
          setTimeout(() => { dispatch(getSupplierListSucess(newSupplierList)); }, 2000)
        }).catch((error) => {
          dispatch(getSheetListFailure());
          console.warn("action - Worker - catch -getLoadingMoreSheetList " + error)
        })
    } else {
      url = `${host}/qlt-pro-inspection/sup?responsiblePartyType=${responsiblePartyType}`;
      fetchHeaderRequestTest({ url, type: 'GET', Range })
        .then((responseData) => {
          const { jsonData, headers } = responseData;
          supplierList.appendDatas(jsonData);
          let newSupplierList = new ResponsiblePartyListData();
          newSupplierList.copy(supplierList);
          newSupplierList.parseHeaderData(headers);
          setTimeout(() => { dispatch(getSupplierListSucess(newSupplierList)); }, 2000)
        }).catch((error) => {
          dispatch(getSheetListFailure());
          console.warn("action - Worker - catch -getLoadingMoreSheetList " + error)
        })
    }
  }
};


/**
 * // 获取班组列表
 * @param {*} param0 
 */
export const getMonitorList = ({ responsiblePartyType, name }) => {
  return (dispatch) => {
    let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxZTgxZTQ5MGQ3OWQ0OWU3OTg5ZjJjNWYxMTY5Mjc1OSIsImlhdCI6MTU5MDY3NjUwMiwiZXhwIjoxNTkwNjgwMTAyfQ.sV-I5udmXdZqO3mTkKZF2qdP2uNlT1y9grQGBt3oF3qAhjCflm5WkaiWKmC2ZYyI0rnWwFRrJ1v85TkNl4jHAg";
    let responsiblePartyListData = new ResponsiblePartyListData();
    // const url = `${host}/qlt-pro-inspection/sup?responsiblePartyType=${responsiblePartyType}&name=${name}`;
    if (isMockData) {
      // responsiblePartyListData.appendDatas(mockMonitorList);
      // let newResponsiblePartyListData = new ResponsiblePartyListData();
      // newResponsiblePartyListData.copy(responsiblePartyListData);
      // dispatch(getMonitorListSucess(newResponsiblePartyListData));
      const Range = responsiblePartyListData.generateHeaderData();
      let url;
      if (name) {//模糊搜索数据
        url = `${host}/qlt-pro-inspection/sup?responsiblePartyType=${responsiblePartyType}&name=${name}`;
      } else {//默认数据
        url = `${host}/qlt-pro-inspection/sup?responsiblePartyType=${responsiblePartyType}`;
      }

      fetchHeaderRequestTest({ url, type: "GET", Range, newToken: token })
        .then((responseData) => {
          const { jsonData, headers } = responseData;
          responsiblePartyListData.appendDatas(jsonData);
          let newResponsiblePartyListData = new ResponsiblePartyListData();
          newResponsiblePartyListData.copy(responsiblePartyListData);
          newResponsiblePartyListData.parseHeaderData(headers);
          dispatch(getMonitorListSucess(newResponsiblePartyListData));
        })
        .catch((error) => {
          console.warn("action - qualityInspector - catch - getFactoryList " + error);
        })

    } else {
      const Range = responsiblePartyListData.generateHeaderData();
      let url;
      if (name) {//模糊搜索数据
        url = `${host}/qlt-pro-inspection/sup?responsiblePartyType=${responsiblePartyType}&name=${name}`;
      } else {//默认数据
        url = `${host}/qlt-pro-inspection/sup?responsiblePartyType=${responsiblePartyType}`;
      }

      fetchHeaderRequestTest({url, type: "GET", Range,})
        .then((responseData) => {
          const { jsonData, headers } = responseData;
          responsiblePartyListData.appendDatas(jsonData);
          let newResponsiblePartyListData = new ResponsiblePartyListData();
          newResponsiblePartyListData.copy(responsiblePartyListData);
          newResponsiblePartyListData.parseHeaderData(headers);
          dispatch(getMonitorListSucess(newResponsiblePartyListData));
        })
        .catch((error) => {
          console.warn("action - qualityInspector - catch - getFactoryList " + error);
        })
    }
  }
}

/**
 * @param {获取上拉加载更多班组数据} param0 
 */
export const getMoreMonitorList = ({ responsiblePartyType, monitorList }) => {
  return async (dispatch) => {
    dispatch(getLoadingStatus());
    let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxZTgxZTQ5MGQ3OWQ0OWU3OTg5ZjJjNWYxMTY5Mjc1OSIsImlhdCI6MTU5MDY3NjUwMiwiZXhwIjoxNTkwNjgwMTAyfQ.sV-I5udmXdZqO3mTkKZF2qdP2uNlT1y9grQGBt3oF3qAhjCflm5WkaiWKmC2ZYyI0rnWwFRrJ1v85TkNl4jHAg";
    const Range = monitorList.generateHeaderData();
    let url;
    if (isMockData) {
      url = `${host}/qlt-pro-inspection/sup?responsiblePartyType=${responsiblePartyType}`;
      fetchHeaderRequestTest({ url, type: 'GET', newToken: token, Range })
        .then((responseData) => {
          const { jsonData, headers } = responseData;
          monitorList.appendDatas(jsonData);
          let newMonitorList = new ResponsiblePartyListData();
          newMonitorList.copy(monitorList);
          newMonitorList.parseHeaderData(headers);
          setTimeout(() => { dispatch(getMonitorListSucess(newMonitorList)); }, 2000)
        }).catch((error) => {
          dispatch(getSheetListFailure());
          console.warn("action - Worker - catch -getMoreMonitorList " + error)
        })
    } else {
      url = `${host}/qlt-pro-inspection/sup?responsiblePartyType=${responsiblePartyType}`;
      fetchHeaderRequestTest({ url, type: 'GET', newToken: token, Range })
        .then((responseData) => {
          const { jsonData, headers } = responseData;
          monitorList.appendDatas(jsonData);
          let newMonitorList = new ResponsiblePartyListData();
          newMonitorList.copy(monitorList);
          newMonitorList.parseHeaderData(headers);
          setTimeout(() => { dispatch(getMonitorListSucess(newMonitorList)); }, 2000)
        }).catch((error) => {
          dispatch(getSheetListFailure());
          console.warn("action - Worker - catch -getMoreMonitorList " + error)
        })
    }
  }
};