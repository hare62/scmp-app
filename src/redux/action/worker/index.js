import actionTypes from '../actionTypes';
import SheetListData from '../../../data/worker/SheetListData';
import ProcessListData from '../../../data/worker/ProcessListData';
import { fetchRequest, fetchHeaderRequest, fetchHeaderRequestTest, fetchRequestTest} from '../../../api/NetManager';
import { getHost, isMockData, isPageUrl } from '../../../utils/Config';
import AsyncStorage from '@react-native-community/async-storage';
import { defaultMockDatas, ProcessMockData } from '../../../data/mockdata/worker';

const host = getHost('manufacture');

/**
 * 获取工人默认派工单 
 */
const getDefaultSheetListSuccess = (sheetListData) => ({
  type: actionTypes.GET_WORKER_DEFAULT_SHEET_LIST_SUCCESS,
  sheetListData
});

/**
 * 加载更多状态
 */
const getLoadingStatus = () => ({
  type: actionTypes.LOADING_MORE_DATA
})

/**
 * 获取筛选条件的派工单列表成功
 */
const getFilterSheetListSuccess = (sheetListData, topNavName) => ({
  type: actionTypes.GET_WORKER_FILTER_SHEET_LIST_SUCCESS,
  filterSheetList: sheetListData,
  topNavName: topNavName,
})

/**
 * 获取派工单工艺工序列表成功
 */
const getTechnologyProcessListSuccess = (sheetListData) => ({
  type: actionTypes.GET_WORKER_TECHNOLOGY_PROCESS_LISST_SUCCESS,
  ...sheetListData
})

/**
 * 工人派工单刷新状态
 */
const workerSheetListRefresh = () => ({
  type: actionTypes.WORKER_SHEET_LIST_REFRESH,
})

/**
 * 获取数据失败
 */
const getSheetListFailure = () => ({
  type: actionTypes.WORKER_SHEET_LIST_DATA_FAILURE,
})

/**
 * 工艺工序初始刷新数据状态
 */
const getRefreshStatus = () => ({
  type: actionTypes.GET_TECHNOLOGY_PROCESS_LIST_REFRESH_STATUS
})

/**
 * 获取上拉刷新工人派工单
 */
export const getPullUpRefreshDefaultSheetList = () => {
  return (dispatch) => {
    dispatch(workerSheetListRefresh());
    let sheetListData = new SheetListData();
    let url;
    const Range = sheetListData.generateHeaderData();

    if (isPageUrl) {
      url = `${host}/manufacture/pro-inventory`;
    } else {
      url = `${host}/app-pro-sheet/sheetPage`;
    }

    // 为了触发reducer
    if (isMockData) {
      sheetListData.appendDatas(defaultMockDatas);
      let newSheetListData = new SheetListData();
      newSheetListData.copy(sheetListData);
      dispatch(getDefaultSheetListSuccess(newSheetListData));
    } else {

      fetchHeaderRequestTest({ url, type: 'GET', Range })
        .then((responseData) => {
          const { jsonData, headers } = responseData;
          sheetListData.appendDatas(jsonData);
          // 为了触发reducer
          let newSheetListData = new SheetListData();
          newSheetListData.copy(sheetListData);
          newSheetListData.parseHeaderData(headers);
          dispatch(getDefaultSheetListSuccess(newSheetListData));
        }).catch((error) => {
          dispatch(getSheetListFailure());
          console.warn("action - Worker - catch -getPullUpRefreshDefaultSheetList " + error)
        })
    }
  }
};
/**
 * 获取下拉加载更多默认派工单
 */
export const getLoadingMoreSheetList = (sheetListData) => {
  return async (dispatch) => {
    //加载更多状态
    dispatch(getLoadingStatus());
    let token = await AsyncStorage.getItem('token');
    const method = {
      method: 'GET', 
      headers: new Headers({
        'Content-Type': 'application/json',
        'Range': sheetListData.generateHeaderData(),
        'token': token
      })
    };
    // const Range = sheetListData.generateHeaderData();

    let url;
    if (isPageUrl) {
      url = `${host}/manufacture/pro-inventory`;
    } else {
      url = `${host}/app-pro-sheet/sheetPage`;
    }

    // 为了触发reducer
    if (isMockData) {
      sheetListData.appendDatas(defaultMockDatas);
      let newSheetListData = new SheetListData();
      newSheetListData.copy(sheetListData);
      dispatch(getDefaultSheetListSuccess(newSheetListData));
    } else {

      // fetchHeaderRequestTest({url, type:'GET',Range})
      fetchHeaderRequest(url, method)
        .then((responseData) => {

          const { jsonData, headers } = responseData;
          sheetListData.appendDatas(jsonData);

          // 为了触发reducer
          let newSheetListData = new SheetListData();
          newSheetListData.copy(sheetListData);
          newSheetListData.parseHeaderData(headers);
          dispatch(getDefaultSheetListSuccess(newSheetListData));
        }).catch((error) => {
          dispatch(getSheetListFailure());
          console.warn("action - Worker - catch -getLoadingMoreSheetList " + error)
        })
    }
  }
};

/**
 * 上拉刷新条件筛选派工单
 * 获取筛选条件的派工单
 * 近三天，近一周，近一个月
 * 未报工，已报工，已完成
 * @param {*} topNavName 
 * @param {*} url 
 */
export const getPullUpRefreshFilterSheetList = (key, value) => {
  return async (dispatch) => {
    dispatch(workerSheetListRefresh());
    let sheetListData = new SheetListData();
    const Range = sheetListData.generateHeaderData();
    let url;
    if (isPageUrl) {
      url = `${host}/manufacture/pro-inventory`;
    } else {
      url = `${host}/app-pro-sheet/sheetPage?${value}`;
    }

    // 为了触发reducer
    if (isMockData) {

      sheetListData.appendDatas(defaultMockDatas);
      let newSheetListData = new SheetListData();
      newSheetListData.copy(sheetListData);
      dispatch(getFilterSheetListSuccess(newSheetListData, key));

    } else {

      fetchHeaderRequestTest({ url, type: 'GET', Range })
        .then((responseData) => {
          const { jsonData, headers } = responseData;
          sheetListData.appendDatas(jsonData);

          // 为了触发reducer
          let newSheetListData = new SheetListData();
          newSheetListData.copy(sheetListData);
          newSheetListData.parseHeaderData(headers);
          dispatch(getFilterSheetListSuccess(newSheetListData, key));
        })
        .catch((error) => {
          dispatch(getSheetListFailure());
          console.warn("action - Worker - catch -getPullUpRefreshFilterSheetList " + error);
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
export const getFilterSheetList = (sheetListData, key, value) => {
  return async (dispatch) => {
    dispatch(getLoadingStatus());
    const Range = sheetListData.generateHeaderData();
    let url;
    if (isPageUrl) {
      url = `${host}/manufacture/pro-inventory`;
    } else {
      url = `${host}/app-pro-sheet/sheetPage?${value}`;
    }

    // 为了触发reducer
    if (isMockData) {

      sheetListData.appendDatas(defaultMockDatas);
      let newSheetListData = new SheetListData();
      newSheetListData.copy(sheetListData);
      dispatch(getFilterSheetListSuccess(newSheetListData, key));

    } else {

      fetchHeaderRequestTest({ url, type: 'GET', Range })
        .then((responseData) => {
          const { jsonData, headers } = responseData;
          sheetListData.appendDatas(jsonData);

          // 为了触发reducer
          let newSheetListData = new SheetListData();
          newSheetListData.copy(sheetListData);
          newSheetListData.parseHeaderData(headers);
          dispatch(getFilterSheetListSuccess(newSheetListData, key));
        })
        .catch((error) => {
          dispatch(getSheetListFailure());
          console.warn("action - Worker - catch -getFilterSheetList " + error);
        })
    }
  }
}

/**
 * 获取派工单工艺工序列表
 */
export const getTechnologyProcessList = (dispatchSheetId) => {
  return async (dispatch) => {
    //工艺工序初始刷新数据状态
    dispatch(getRefreshStatus());
    //Todo
    // 没有传token也请求到了数据  是不对的！！！
    const url = `${host}/app-pro-sheet/sheetDetail?dispatchSheetId=${dispatchSheetId}`;
    if (isMockData) {
      let sheetListData = ProcessListData.init(ProcessMockData);
      dispatch(getTechnologyProcessListSuccess(sheetListData));

    } else {

      fetchRequestTest({url, type:"GET"})
        .then((jsonData) => {
          let sheetListData = ProcessListData.init(jsonData);
          dispatch(getTechnologyProcessListSuccess(sheetListData));
        })
        .catch((error) => {
          dispatch(getTechnologyProcessListFailure())
          console.warn("action - Worker - catch - getTechnologyProcessList " + error);
        })
    }
  }
}

/**
 * 工人报工
 */
export const submitJobBooking = (sheetTechnologyId, completeQty, callBack) => {
  return async (dispatch) => {
    // TODO 未测试
    // let token = await AsyncStorage.getItem('token');
    // let method = {
    //   method: "PUT",
    //   headers: new Headers({
    //     'Content-Type': 'application/json',
    //     'token': token
    //   })
    // }
    const url = `${host}/app-pro-sheet/productReport?completeQty=${completeQty}&proSheetTechnologyId=${sheetTechnologyId}`;
    if (isMockData) {

    } else {
      fetchRequestTest({url, type:"PUT"})
        .then((jsonData) => {
          const COMPLETE = jsonData.DATA;
          if (typeof callBack === 'function') {
            callBack(jsonData);
          }
          // dispatch(isFinishOfWorkerSheetCell());
          if (COMPLETE === 'COMPLETE') {
            dispatch(isFinishOfWorkerSheetCell());
          }
        }).catch((error) => {
          console.warn("action - Worker - catch - submitJobBooking " + error.message);
        })
    }
  }
}

/**
 * 重置所有派工单
 */
export const resetAllSheetListData = () => ({
  type: actionTypes.RESET_WORKER_ALL_SHEET_LIST_DATA
})

/**
 * 重置工人派工单默认数据
 * resetDefaultSheetList
 */
export const resetDefaultSheetList = () => ({
  type: actionTypes.RESET_WORKER_DEFAULT_SHEET_LIST
})

/**
 * 刷新工人单个派工单列表数据
 * refreshCellSheetListData
 */
export const refreshWorkerCellSheetListData = () => ({
  type: actionTypes.REFRESH_WORKER_CELL_SHEET_LIST_DATA
})

/**
 * 判断派工单是否是完成状态并刷新派工单Cell
 */
export const isFinishOfWorkerSheetCell = () => ({
  type: actionTypes.IS_FINISH_OF_WORKER_SHEET_CELL,
})

/**
 * 刷新筛选的工人单个派工单列表数据
 */
export const refreshFilterWorkerSheetCell = (sheetListData, topNavName) => ({
  type: actionTypes.IS_FINISH_OF_FILTER_WORKER_SHEET_CELL,
  filterSheetList: sheetListData,
  topNavName: topNavName,
})