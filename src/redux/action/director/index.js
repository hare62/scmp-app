import actionTypes from '../actionTypes';
import SheetListData from '../../../data/director/SheetListData';
import AddressListData from '../../../data/director/AddressListData';
import { getHost, isMockData, isPageUrl } from '../../../utils/Config';
import AsyncStorage from '@react-native-community/async-storage';
import { fetchHeaderRequest, fetchRequest, fetchRequestTest } from '../../../api/NetManager';
import {
  defaultMockDatas,
  lastDaysMockDatas,
  lastWeekMockDatas,
  halfYearMockDatas,
  unreportedMockDatas,
  checkingMockDatas,
  finishedMockDatas,
  mockAddressList,
  mockSearchAddressList,
  mockSearchWorkerSheetList,
} from '../../../data/mockdata/director';

const host = getHost('manufacture');

/**
 * 获取默认派工单成功
 */
const getDefaultSheetListSuccess = (sheetListData) => ({
  type: actionTypes.GET_DEFAULT_SHEET_LIST_SUCCESS,
  sheetListData
});

/**
 * 获取默认派工单失败
 */
const getSheetListFailure = () => ({
  type: actionTypes.GET_DEFAULT_SHEET_LIST_FAILURE
});

/**
 * 获取最近三天派工单成功
 */
const getLastDaysSheetListSuccess = (sheetListData) => ({
  type: actionTypes.GET_LAST_DAYS_SHEET_LIST_SUCCESS,
  sheetListData
});

/**
 * 获取最近一周派工单成功
 */
const getLastWeekSheetListSuccess = (sheetListData) => ({
  type: actionTypes.GET_LAST_WEEK_SHEET_LIST_SUCCESS,
  sheetListData
});

/**
 * 获取最近半年派工单成功
 */
const getHalfYearSheetListSuccess = (sheetListData) => ({
  type: actionTypes.GET_HALF_YEAR_SHEET_LIST_SUCCESS,
  sheetListData
});

/**
 * 获取未报工的派工单成功
 */
const getUnreportedSheetListSuccess = (sheetListData) => ({
  type: actionTypes.GET_UNREPORTED_SHEET_LIST_SUCCESS,
  sheetListData
});

/**
 * 获取质检中的派工单成功
 */
const getCheckingSheetListSuccess = (sheetListData) => ({
  type: actionTypes.GET_CHECKING_SHEET_LIST_SUCCESS,
  sheetListData
});

/**
 * 获取已完成的派工单成功
 */
const getFinishedSheetListSuccess = (sheetListData) => ({
  type: actionTypes.GET_FINISHED_SHEET_LIST_SUCCESS,
  sheetListData
});

/**
 * //获取工人通讯录成功
 */
const getAddressListSuccess = (listData) => ({
  type: actionTypes.GET_ADDRESS_LIST_SUCCESS,
  ...listData
})

/**
 * //获取工人通讯录失败
 */
const getAddressListFailure = (listData) => ({
  type: actionTypes.GET_ADDRESS_LIST_FAILURE,
  ...listData
})

/**
 * 获取查询字段通讯录成功
 */
const getSearchAddressListSuccess = (listData) => ({
  type: actionTypes.GET_SEARCH_ADDRESS_LIST_SUCCESS,
  ...listData
})

/**
 * 获取查询字段通讯录成功
 */
const getSearchAddressListFailure = (listData) => ({
  type: actionTypes.GET_SEARCH_ADDRESS_LIST_FAILURE,
  ...listData
})

/**
 * 用户根据名字获取派工单成功
 */
const getSearchWorkerSheetListSuccess = (sheetListData) => ({
  type: actionTypes.GET_SEARCH_WORKER_SHEET_LIST_SUCCESS,
  sheetListData
})


/**
 * 获取车间主任默认更新数据状态
 */
const directorSheetListRefresh = () => ({
  type: actionTypes.GET_DIRECTOR_DEFAULT_REFRESH_DATA,
})

/**
 * 车间主任加载更多
 */
const directorSheetListLoadingMore = () => ({
  type: actionTypes.DIRECTOR_SHEET_LIST_LOADING_MORE
})

/**
 * 获取车间主任默认加载更多数据
 */
const DirectordefaultLoadingMoreData = () => ({
  type: actionTypes.GET_DIRECTOR_DEFAULT_LOADING_MORE_DATA,
})

/**
 * 生成新的sheetlistData
 */
const createNewSheetListData = (sheetListData, headers) => {
  let newSheetListData = new SheetListData();
  newSheetListData.copy(sheetListData);
  newSheetListData.parseHeaderData(headers);

  return newSheetListData;
}

/**
 * 获取method
 */
const getMethod = async (headerData) => {
  let token = await AsyncStorage.getItem('token');

  const method = {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Range': headerData,
      'token': token
    })
  };
  return method;
}


/**
 * 上拉刷新-获取默认的派工单列表
 */
export const getRefreshDefaultSheetList = () => {
  return async (dispatch) => {
    dispatch(directorSheetListRefresh());
    let url;
    if (isPageUrl) {
      url = `${host}/manufacture/pro-inventory`;
    } else {
      url = `${host}/app-pro-sheet/appSheetPage`;
    }
    let sheetListData = new SheetListData();
    const method = await getMethod(sheetListData.generateHeaderData());

    if (isMockData) {

      sheetListData.appendDatas(defaultMockDatas);
      let newSheetListData = new SheetListData();
      newSheetListData.copy(sheetListData);
      dispatch(getDefaultSheetListSuccess(newSheetListData));

    } else {

      fetchHeaderRequest(url, method)
        .then((responseData) => {
          const { jsonData, headers } = responseData;
          sheetListData.appendDatas(jsonData);
          let newSheetListData = createNewSheetListData(sheetListData, headers);
          dispatch(getDefaultSheetListSuccess(newSheetListData));
        }).catch((error) => {
          dispatch(getSheetListFailure());
          console.warn("action - director - catch -getDefaultSheetList " + error)
        })
    }
  }
};

/**
 * 加载更多获取默认的派工单列表
 */
export const getDefaultSheetList = (sheetListData) => {
  return async (dispatch) => {
    dispatch(directorSheetListLoadingMore());
    let url;
    if (isPageUrl) {
      url = `${host}/manufacture/pro-inventory`;
    } else {
      url = `${host}/app-pro-sheet/appSheetPage`;
    }
    const method = await getMethod(sheetListData.generateHeaderData());

    if (isMockData) {

      sheetListData.appendDatas(defaultMockDatas);
      let newSheetListData = new SheetListData();
      newSheetListData.copy(sheetListData);
      dispatch(getDefaultSheetListSuccess(newSheetListData));

    } else {

      fetchHeaderRequest(url, method)
        .then((responseData) => {
          const { jsonData, headers } = responseData;
          sheetListData.appendDatas(jsonData);
          let newSheetListData = createNewSheetListData(sheetListData, headers);
          dispatch(getDefaultSheetListSuccess(newSheetListData));
        }).catch((error) => {
          dispatch(getSheetListFailure());
          console.warn("action - director - catch -getDefaultSheetList " + error)
        })
    }
  }
};

/**
 * 上拉刷新-获取最近三天的派工单
 */
export const getRefreshLastDaysSheetList = () => {
  return async (dispatch) => {
    dispatch(directorSheetListRefresh());
    let sheetListData = new SheetListData();
    let url;
    if (isPageUrl) {
      url = `${host}/manufacture/pro-inventory`;
    } else {
      url = `${host}/app-pro-sheet/appSheetPage?dateLogo=DAY`;
    }
    const method = await getMethod(sheetListData.generateHeaderData());

    if (isMockData) {

      sheetListData.appendDatas(lastDaysMockDatas);
      let newSheetListData = new SheetListData();
      newSheetListData.copy(sheetListData);
      dispatch(getLastDaysSheetListSuccess(newSheetListData));

    } else {
      fetchHeaderRequest(url, method)
        .then((responseData) => {
          const { jsonData, headers } = responseData;
          sheetListData.appendDatas(jsonData);
          let newSheetListData = createNewSheetListData(sheetListData, headers);
          dispatch(getLastDaysSheetListSuccess(newSheetListData));
        })
        .catch((error) => {
          dispatch(getSheetListFailure());
          console.warn("action - Director - catch -getLastDaysSheetList " + error);
        })
    }
  }
}

/**
 * 加载更多-获取最近三天的派工单
 */
export const getLastDaysSheetList = (sheetListData) => {
  return async (dispatch) => {
    dispatch(directorSheetListLoadingMore());
    let url;
    if (isPageUrl) {
      url = `${host}/manufacture/pro-inventory`;
    } else {
      url = `${host}/app-pro-sheet/appSheetPage?dateLogo=DAY`;
    }
    const method = await getMethod(sheetListData.generateHeaderData());

    if (isMockData) {

      sheetListData.appendDatas(lastDaysMockDatas);
      let newSheetListData = new SheetListData();
      newSheetListData.copy(sheetListData);
      dispatch(getLastDaysSheetListSuccess(newSheetListData));

    } else {
      fetchHeaderRequest(url, method)
        .then((responseData) => {
          const { jsonData, headers } = responseData;
          sheetListData.appendDatas(jsonData);
          let newSheetListData = createNewSheetListData(sheetListData, headers);
          dispatch(getLastDaysSheetListSuccess(newSheetListData));
        })
        .catch((error) => {
          dispatch(getSheetListFailure());
          console.warn("action - Director - catch -getLastDaysSheetList " + error);
        })
    }
  }
}

/**
 * 上拉刷新-获取最近一周的派工单
 */
export const getRefreshLastWeekSheetList = () => {
  return async (dispatch) => {
    dispatch(directorSheetListRefresh());
    let sheetListData = new SheetListData();
    let url;
    if (isPageUrl) {
      url = `${host}/manufacture/pro-inventory`;
    } else {
      url = `${host}/app-pro-sheet/appSheetPage?dateLogo=WEEK`;
    }
    const method = await getMethod(sheetListData.generateHeaderData());

    if (isMockData) {

      sheetListData.appendDatas(lastWeekMockDatas);
      let newSheetListData = new SheetListData();
      newSheetListData.copy(sheetListData);
      dispatch(getLastWeekSheetListSuccess(newSheetListData));

    } else {
      fetchHeaderRequest(url, method)
        .then((responseData) => {
          const { jsonData, headers } = responseData;
          sheetListData.appendDatas(jsonData);
          let newSheetListData = createNewSheetListData(sheetListData, headers);
          dispatch(getLastWeekSheetListSuccess(newSheetListData));
        })
        .catch((error) => {
          dispatch(getSheetListFailure());
          console.warn("action - Director - catch -getLastWeekSheetList " + error);
        })
    }
  }
}

/**
 * 加载更多-获取最近一周的派工单
 */
export const getLastWeekSheetList = (sheetListData) => {
  return async (dispatch) => {
    dispatch(directorSheetListLoadingMore());
    let url;
    if (isPageUrl) {
      url = `${host}/manufacture/pro-inventory`;
    } else {
      url = `${host}/app-pro-sheet/appSheetPage?dateLogo=WEEK`;
    }
    const method = await getMethod(sheetListData.generateHeaderData());

    if (isMockData) {

      sheetListData.appendDatas(lastWeekMockDatas);
      let newSheetListData = new SheetListData();
      newSheetListData.copy(sheetListData);
      dispatch(getLastWeekSheetListSuccess(newSheetListData));

    } else {
      fetchHeaderRequest(url, method)
        .then((responseData) => {
          const { jsonData, headers } = responseData;
          sheetListData.appendDatas(jsonData);
          let newSheetListData = createNewSheetListData(sheetListData, headers);
          dispatch(getLastWeekSheetListSuccess(newSheetListData));
        })
        .catch((error) => {
          dispatch(getSheetListFailure());
          console.warn("action - Director - catch -getLastWeekSheetList " + error);
        })
    }
  }
}

/**
 * 上拉刷新-获取最近半年的派工单
 */
export const getRefreshHalfYearSheetList = () => {
  return async (dispatch) => {
    dispatch(directorSheetListRefresh());
    let sheetListData = new SheetListData()
    let url;
    if (isPageUrl) {
      url = `${host}/manufacture/pro-inventory`;
    } else {
      url = `${host}/app-pro-sheet/appSheetPage?dateLogo=MONTH`;
    }
    const method = await getMethod(sheetListData.generateHeaderData());

    if (isMockData) {

      sheetListData.appendDatas(halfYearMockDatas);
      let newSheetListData = new SheetListData();
      newSheetListData.copy(sheetListData);
      dispatch(getHalfYearSheetListSuccess(newSheetListData));
    } else {

      fetchHeaderRequest(url, method)
        .then((responseData) => {
          const { jsonData, headers } = responseData;
          sheetListData.appendDatas(jsonData);
          let newSheetListData = createNewSheetListData(sheetListData, headers);
          dispatch(getHalfYearSheetListSuccess(newSheetListData));
        })
        .catch((error) => {
          dispatch(getSheetListFailure());
          console.warn("action - Director - catch -getHalfYearSheetList " + error);
        })
    }
  }
}


/**
 * 加载更多-获取最近半年的派工单
 */
export const getHalfYearSheetList = (sheetListData) => {
  return async (dispatch) => {
    dispatch(directorSheetListLoadingMore());
    let url;
    if (isPageUrl) {
      url = `${host}/manufacture/pro-inventory`;
    } else {
      url = `${host}/app-pro-sheet/appSheetPage?dateLogo=MONTH`;
    }
    const method = await getMethod(sheetListData.generateHeaderData());

    if (isMockData) {

      sheetListData.appendDatas(halfYearMockDatas);
      let newSheetListData = new SheetListData();
      newSheetListData.copy(sheetListData);
      dispatch(getHalfYearSheetListSuccess(newSheetListData));
    } else {

      fetchHeaderRequest(url, method)
        .then((responseData) => {
          const { jsonData, headers } = responseData;
          sheetListData.appendDatas(jsonData);
          let newSheetListData = createNewSheetListData(sheetListData, headers);
          dispatch(getHalfYearSheetListSuccess(newSheetListData));
        })
        .catch((error) => {
          dispatch(getSheetListFailure());
          console.warn("action - Director - catch -getHalfYearSheetList " + error);
        })

    }
  }
}

/**
 * 上拉刷新-获取未报工的派工单sheetStatus=02
 */
export const getRefreshUnreportedSheetList = () => {
  return async (dispatch) => {
    dispatch(directorSheetListRefresh());
    let sheetListData = new SheetListData();
    let url;
    if (isPageUrl) {
      url = `${host}/manufacture/pro-inventory`;
    } else {
      url = `${host}/app-pro-sheet/appSheetPage?sheetStatus=02`;
    }
    const method = await getMethod(sheetListData.generateHeaderData());

    if (isMockData) {

      sheetListData.appendDatas(unreportedMockDatas);
      let newSheetListData = new SheetListData();
      newSheetListData.copy(sheetListData);
      dispatch(getUnreportedSheetListSuccess(newSheetListData));
    } else {
      fetchHeaderRequest(url, method)
        .then((responseData) => {
          const { jsonData, headers } = responseData;
          sheetListData.appendDatas(jsonData);
          let newSheetListData = createNewSheetListData(sheetListData, headers);
          dispatch(getUnreportedSheetListSuccess(newSheetListData));
        })
        .catch((error) => {
          dispatch(getSheetListFailure());
          console.warn("action - Director - catch -getUnreportedSheetList " + error);
        })
    }
  }
}

/**
 * 加载更多-获取未报工的派工单sheetStatus=02
 */
export const getUnreportedSheetList = (sheetListData) => {
  return async (dispatch) => {
    dispatch(directorSheetListLoadingMore());
    let url;
    if (isPageUrl) {
      url = `${host}/manufacture/pro-inventory`;
    } else {
      url = `${host}/app-pro-sheet/appSheetPage?sheetStatus=02`;
    }
    const method = await getMethod(sheetListData.generateHeaderData());

    if (isMockData) {

      sheetListData.appendDatas(unreportedMockDatas);
      let newSheetListData = new SheetListData();
      newSheetListData.copy(sheetListData);
      dispatch(getUnreportedSheetListSuccess(newSheetListData));
    } else {
      fetchHeaderRequest(url, method)
        .then((responseData) => {
          const { jsonData, headers } = responseData;
          sheetListData.appendDatas(jsonData);
          let newSheetListData = createNewSheetListData(sheetListData, headers);
          dispatch(getUnreportedSheetListSuccess(newSheetListData));
        })
        .catch((error) => {
          dispatch(getSheetListFailure());
          console.warn("action - Director - catch -getUnreportedSheetList " + error);
        })
    }
  }
}

/**
 * 上拉刷新-获取质检中的派工单sheetStatus=01
 */
export const getRefreshCheckingSheetList = () => {
  return async (dispatch) => {
    dispatch(directorSheetListRefresh());
    let sheetListData = new SheetListData();
    let url;
    if (isPageUrl) {
      url = `${host}/manufacture/pro-inventory`;
    } else {
      url = `${host}/app-pro-sheet/appSheetPage?sheetStatus=01`;
    }
    const method = await getMethod(sheetListData.generateHeaderData());

    if (isMockData) {
      sheetListData.appendDatas(checkingMockDatas);
      let newSheetListData = new SheetListData();
      newSheetListData.copy(sheetListData);
      dispatch(getCheckingSheetListSuccess(newSheetListData));

    } else {
      fetchHeaderRequest(url, method)
        .then((responseData) => {
          const { jsonData, headers } = responseData;
          sheetListData.appendDatas(jsonData);
          let newSheetListData = createNewSheetListData(sheetListData, headers);
          dispatch(getCheckingSheetListSuccess(newSheetListData));
        })
        .catch((error) => {
          dispatch(getSheetListFailure());
          console.warn("action - Director - catch -getCheckingSheetList " + error);
        })
    }
  }
}

/**
 * 加载更多获取质检中的派工单sheetStatus=01
 */
export const getCheckingSheetList = (sheetListData) => {
  return async (dispatch) => {
    dispatch(directorSheetListLoadingMore());
    let url;
    if (isPageUrl) {
      url = `${host}/manufacture/pro-inventory`;
    } else {
      url = `${host}/app-pro-sheet/appSheetPage?sheetStatus=01`;
    }
    const method = await getMethod(sheetListData.generateHeaderData());

    if (isMockData) {
      sheetListData.appendDatas(checkingMockDatas);
      let newSheetListData = new SheetListData();
      newSheetListData.copy(sheetListData);
      dispatch(getCheckingSheetListSuccess(newSheetListData));

    } else {
      fetchHeaderRequest(url, method)
        .then((responseData) => {
          const { jsonData, headers } = responseData;
          sheetListData.appendDatas(jsonData);
          let newSheetListData = createNewSheetListData(sheetListData, headers);
          dispatch(getCheckingSheetListSuccess(newSheetListData));
        })
        .catch((error) => {
          dispatch(getSheetListFailure());
          console.warn("action - Director - catch -getCheckingSheetList " + error);
        })
    }
  }
}

/**
 * 上拉刷新-获取已完成的派工单sheetStatus=03
 */
export const getRefreshFinishedSheetList = () => {
  return async (dispatch) => {
    dispatch(directorSheetListRefresh());
    let sheetListData = new SheetListData();
    let url;
    if (isPageUrl) {
      url = `${host}/manufacture/pro-inventory`;
    } else {
      url = `${host}/app-pro-sheet/appSheetPage?sheetStatus=03`;
    }
    const method = await getMethod(sheetListData.generateHeaderData());

    if (isMockData) {

      sheetListData.appendDatas(finishedMockDatas);
      let newSheetListData = new SheetListData();
      newSheetListData.copy(sheetListData);
      dispatch(getFinishedSheetListSuccess(newSheetListData));
    } else {
      fetchHeaderRequest(url, method)
        .then((responseData) => {
          const { jsonData, headers } = responseData;
          sheetListData.appendDatas(jsonData);
          let newSheetListData = createNewSheetListData(sheetListData, headers);
          dispatch(getFinishedSheetListSuccess(newSheetListData));
        })
        .catch((error) => {
          dispatch(getSheetListFailure());
          console.warn("action - Director - catch -getFinishedSheetList " + error);
        })
    }
  }
}

/**
 *加载更多-获取已完成的派工单sheetStatus=03
 */
export const getFinishedSheetList = (sheetListData) => {
  return async (dispatch) => {
    dispatch(directorSheetListLoadingMore());
    const url = `${host}/app-pro-sheet/appSheetPage?sheetStatus=03`;
    const method = await getMethod(sheetListData.generateHeaderData());

    if (isMockData) {

      sheetListData.appendDatas(finishedMockDatas);
      let newSheetListData = new SheetListData();
      newSheetListData.copy(sheetListData);
      dispatch(getFinishedSheetListSuccess(newSheetListData));
    } else {
      fetchHeaderRequest(url, method)
        .then((responseData) => {
          const { jsonData, headers } = responseData;
          sheetListData.appendDatas(jsonData);
          let newSheetListData = createNewSheetListData(sheetListData, headers);
          dispatch(getFinishedSheetListSuccess(newSheetListData));
        })
        .catch((error) => {
          dispatch(getSheetListFailure());
          console.warn("action - Director - catch -getFinishedSheetList " + error);
        })
    }
  }
}

/**
 * 根据工人角色ID获取工人通讯录默认数据
 * 传工人角色ID: role_id 分页信息: Range
 */
export const getAddressList = () => {
  return async (dispatch) => {
    let role_id = await AsyncStorage.getItem('role_id');
    let host = getHost('login');//需要用到登录的接口
    const url = `${host}/user-info/listUser?roleId=${role_id}`;

    fetchRequestTest({url, type:"GET"})
      .then((jsonData) => {

        let listData = AddressListData.init(jsonData);
        dispatch(getAddressListSuccess(listData));

      })
      .catch((error) => {
        console.warn("action - Director - catch -getAddressList " + error);
        dispatch(getAddressListFailure(error));
      })
  }
}

/**
 * 用户输入名字获取通讯录
 * @param {*} searchWords 查询名字
 * @param {*} role_id  角色
 */
export const getSearchAddressList = (searchWords) => {
  return async (dispatch) => {
    let token = await AsyncStorage.getItem('token');
    let role_id = await AsyncStorage.getItem('role_id');
    let host = getHost('login');//需要用到登录的接口

    let method = {
      method: "GET",
      headers: new Headers({
        'Content-Type': 'application/json',
        'token': token
      })
    }
    const url = `${host}/user-info/listUser?roleId=${role_id}&userNm=${searchWords}`;
    fetchRequest(url, method)
      .then((jsonData) => {
        let listData = AddressListData.init(jsonData);
        dispatch(getSearchAddressListSuccess(listData));
      })
      .catch((error) => {
        console.warn("action - Director - catch -getSearchAddressList " + error);
        dispatch(getSearchAddressListFailure(error));
      })
  }
}

/**
 * 上拉刷新-用户根据名字获取派工单
 * @param {*} userName 
 */
export const getRefreshSearchWorkerSheetList = (userName) => {
  return async (dispatch) => {
    dispatch(directorSheetListRefresh()); 
    let url;
    if (isPageUrl) {
      url = `${host}/manufacture/pro-inventory`;
    } else {
      url = `${host}/app-pro-sheet/appSheetPage?userId=${userName}`;
    }

    let sheetListData = new SheetListData();
    const method = await getMethod(sheetListData.generateHeaderData());

    if (isMockData) {

      sheetListData.appendDatas(defaultMockDatas);
      let newSheetListData = new SheetListData();
      newSheetListData.copy(sheetListData);
      dispatch(getSearchWorkerSheetListSuccess(newSheetListData));

    } else {
      fetchHeaderRequest(url, method)
        .then((responseData) => {
          const { jsonData, headers } = responseData;
          sheetListData.appendDatas(jsonData);
          let newSheetListData = createNewSheetListData(sheetListData, headers);
          dispatch(getSearchWorkerSheetListSuccess(newSheetListData));
        })
        .catch((error) => {
          dispatch(getSheetListFailure());
          console.warn("action - Director - catch -getFinishedSheetList " + error);
        })
    }
  }
}

/**
 * 加载更多-用户根据名字获取派工单
 * @param {*} userName 
 */
export const getSearchWorkerSheetList = (userName, sheetListData) => {
  return async (dispatch) => {
    dispatch(directorSheetListLoadingMore());
    let url;
    if (isPageUrl) {
      url = `${host}/manufacture/pro-inventory`;
    } else {
      url = `${host}/app-pro-sheet/appSheetPage?userId=${userName}`;
    }
    const method = await getMethod(sheetListData.generateHeaderData());

    fetchHeaderRequest(url, method)
      .then((responseData) => {
        const { jsonData, headers } = responseData;
        sheetListData.appendDatas(jsonData);
        let newSheetListData = createNewSheetListData(sheetListData, headers);
        dispatch(getSearchWorkerSheetListSuccess(newSheetListData));
      })
      .catch((error) => {
        dispatch(getSheetListFailure());
        console.warn("action - Director - catch -getFinishedSheetList " + error);
      })
  }
}

/**
 * 重置所有派工单
 */
export const resetAllSheetListData = () => ({
  type: actionTypes.RESET_ALL_SHEET_LIST_DATA
})

/**
 * 重置根据工人名字查询派工单
 */
export const resetSearchSheetListData = () => ({
  type: actionTypes.RESET_SEARCH_SHEET_LIST_DATA
})