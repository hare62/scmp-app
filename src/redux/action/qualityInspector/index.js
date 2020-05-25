import actionTypes from '../actionTypes';
import {
  mockQualityInspectorSheetListData,
  mockFinishData,
  mockTechnonigyProcessData,
  mockMechanicalMessageData,
  mockNoMechanicalData,
  StandardItemofNoMechanical
} from '../../../data/mockdata/qualityInspector';
import SheetListData from '../../../data/qualityInspector/SheetListData';
import ProcessListData from '../../../data/qualityInspector/ProcessListData';
import MechanicalMessageListData from '../../../data/qualityInspector/MechanicalMessageListData';
import NoMechanicalListData from '../../../data/qualityInspector/NoMechanicalListData';
import StandardItemDataList from '../../../data/qualityInspector/StandardItemDataList';
import RNFS, { readFile } from 'react-native-fs';
import { fetchRequest, fetchHeaderRequestTest, fetchRequestTest } from '../../../api/NetManager';
import MD5 from "react-native-md5";
import AsyncStorage from '@react-native-community/async-storage';
import { getHost, isPageUrl, isMockData } from '../../../utils/Config';
import axios from "axios";
import MessageCenter from '../../../api/MessageCenter';
import { Quality_LOAD_MORE　}　from '../../../api/MessageDefine';

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
 
// 获取默认质检单
export const getQualityInspectorSheetList = (callBack) => {
  return async (dispatch) => {
    dispatch(qualitySheetListRefresh());
    let sheetListData = new SheetListData();
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
      url = "http://47.108.27.242:8080/wareHouse/stg-withdrawal";
      fetchHeaderRequestTest({ url, type: "GET", Range })
        .then((responseData) => {
          const { jsonData, headers } = responseData;
          sheetListData.appendDatas(jsonData);
          let newSheetListData = new SheetListData();
          newSheetListData.copy(sheetListData);
          newSheetListData.parseHeaderData(headers);
          dispatch(getQualityInspectorSheetListSuccess(newSheetListData));
          // if(typeof callBack === "function"){
          //   callBack(newSheetListData);
          // }
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
export const getLoadingMoreSheetList = (sheetListData,callBack) => {
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
      url = "http://47.108.27.242:8080/wareHouse/stg-withdrawal";
      fetchHeaderRequestTest({url, type:'GET',Range})
        .then((responseData) => {
          const { jsonData, headers } = responseData;
          sheetListData.appendDatas(jsonData);
          let newSheetListData = new SheetListData();
          newSheetListData.copy(sheetListData);
          newSheetListData.parseHeaderData(headers);
          dispatch(getQualityInspectorSheetListSuccess(newSheetListData));
          // MessageCenter.getInstance().notice(Quality_LOAD_MORE,newSheetListData)

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
export const getPullUpRefreshFilterSheetList = ( key, value) => {
  return async (dispatch) => {
    dispatch(getLoadingStatus());
    let sheetListData = new SheetListData();
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
      url = "http://47.108.27.242:8080/wareHouse/stg-withdrawal";
      fetchHeaderRequestTest({ url, type: "GET", Range })
        .then((responseData) => {
          const { jsonData, headers } = responseData;
          sheetListData.appendDatas(jsonData);
          let newSheetListData = new SheetListData();
          newSheetListData.copy(sheetListData);
          newSheetListData.parseHeaderData(headers);
          dispatch(getFilterSheetListSuccess(newSheetListData, key));
          console.warn(newSheetListData)
        })
        .catch((error) => {
          // dispatch(getSheetListFailure());
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
      url = "http://47.108.27.242:8080/wareHouse/stg-withdrawal";
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
          // dispatch(getSheetListFailure());
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
  // return (dispatch) => {
  //   //预留请求真实接口

  // }
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
  console.log("fileUPloadworks", files)
  return (dispatch) => {
    console.log('=======', files)
    dispatch(getUploadFileSuccess({ files }))
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

const baseUsage = (filePath) => {
  // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
  RNFS.readDir(filePath)
    .then((result) => {
      // stat the first file
      return Promise.all([RNFS.stat(result[0].path), result[0].path]);
    })
    .then((statResult) => {
      if (statResult[0].isFile()) {
        // if we have a file, read it
        return RNFS.readFile(statResult[1], 'utf8');
      }
      return 'no file';
    })
    .then((contents) => {
      // log the file contents
    })
    .catch((err) => {
    });
}

/**
 * 读取文件内容
 * @param {*文件路径} filepath
 */
const readFilecontent = (filepath) => {
  readFile(filepath, 'base64').then((result) => {
    // console.log("readFilecontent",result)
    return result;
  }).catch((error) => {
  })
}

const uploadBegin = (response) => {
  let jobId = response.jobId;
  console.log('UPLOAD HAS BEGUN! JobId: ' + jobId);
};

const uploadProgress = (response) => {
  let percentage = Math.floor((response.totalBytesSent / response.totalBytesExpectedToSend) * 100);
  console.log('UPLOAD IS ' + percentage + '% DONE!');
};

/**
 * 上传文件
 * @param {*} filepath
 * @param {*} MD5fileContent
 * @param {*} token
 */
const upLoadingFile = async (filepath, MD5fileContent, token) => {

  readFile(filepath, 'base64').then((result) => {
    const fileContent = result;
    console.log('upLoadingFile', result)
    let host = getHost('file');
    const uploadUrl = `${host}/file/file-center/fileUpload`;
    let formData = new FormData();
    formData.append('configKey', 'SCMP-FILE');
    formData.append('file', fileContent);
    formData.append('md5', MD5fileContent);

    console.log('uploadUrl', uploadUrl);
    console.log('token', token);
    console.log('formData', formData);
    // console.log("-----------------------------------")

    //     const UploadFileItem = [{
    //       filename: filepath,   // Name of file
    //       filepath: filepath,   // Path to file
    //       name: 'test1',
    //       // filetype: 'audio/x-m4a'
    //     }
    // ]
    // RNFS.uploadFiles({
    //   toUrl: uploadUrl,
    //   files: UploadFileItem,
    //   binaryStreamOnly:true,
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'multipart/form-data',
    //     'token': token
    //   },
    //   fields: {
    //     'configKey': 'SCMP-FILE',
    //     'file': fileContent,
    //     'md5': MD5fileContent
    //   },
    //   begin: uploadBegin,
    //   progress: uploadProgress
    // }).promise.then((response) => {
    //   if (response.statusCode == 200) {
    //     console.log('FILES UPLOADED!'); // response.statusCode, response.headers, response.body
    //   } else {
    //     console.log('SERVER ERROR');
    //   }
    // })
    //   .catch((err) => {
    //     if (err.description === "cancelled") {
    //       // cancelled by user
    //     }
    //     console.log(err);
    //   });

    // let lajiaxios = axios.create({
    //   baseURL: uploadUrl,
    //   timeout: 5000,
    // })

    // lajiaxios.post(uploadUrl, {
    //     // method: 'post',
    //     // url: uploadUrl,
    //     data: formData,
    //     t: 2
    //   },
    //   {
    //     headers: {'content-type' : 'multipart/form-data;boundary=WebKitFormBoundary7MA4YWxkTrZu0gW'}
    //   }
    // )
    //   .then(res => console.log('axios-response-sucess', res.data))
    //   .catch((error) => {
    //     console.log('action - qualityInspector -  upLoadingFile - catch ', error);
    //   })

    let file = { uri: filepath, type: 'multipart/form-data', name: '123.jpg' };
    let formData2 = new FormData();
    formData2.append(file)

    let options = {}
    options.headers['Content-Type'] = 'multipart/form-data';
    options.body = formData2;
    options.method = "POST";

    fetchRequest(uploadUrl, options).then((response) => {
      console.log('axios-response-sucess : ', response)
    }).catch((error) => {
      console.log("error - ", error)
    })
  }).catch((error) => {
    console.log("error - readFile", error)
  })
}

/**
 * @param {*} file
 */
const getMD5 = (file) => {
  var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
    file = file,
    chunkSize = 2097152,                             // Read in chunks of 2MB
    chunks = Math.ceil(file.size / chunkSize),
    currentChunk = 0,
    spark = new SparkMD5.ArrayBuffer(),
    fileReader = new FileReader();

  fileReader.onload = function (e) {
    console.log('read chunk nr', currentChunk + 1, 'of', chunks);
    spark.append(e.target.result);                   // Append array buffer
    currentChunk++;

    if (currentChunk < chunks) {
      loadNext();
    } else {
      console.log('finished loading');
      console.info('computed hash', spark.end());  // Compute hash
    }
  };

  fileReader.onerror = function () {
  };

  function loadNext() {
    var start = currentChunk * chunkSize,
      end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

    fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
  }
  loadNext();
}

//文件MD5校验
export const postMD5Files = (filepath) => {
  return async () => {
    let host = getHost('file');
    let MD5fileContent;
    // 读取文件内容，hex_md5加密
    readFile(filepath, 'base64').then(async (result) => {
      console.log("readFile", result);
      MD5fileContent = MD5.hex_md5(result);
      console.log('hex_md5', MD5fileContent)
      const uploadUrl = `${host}/file/file-center/validateFileMd5?configKey=SCMP-FILE&fileFileName=${filepath}&md5=${MD5fileContent}`;
      let token = await AsyncStorage.getItem('token');
      let method = {
        method: "GET",
        headers: new Headers({
          'Content-Type': 'application/json',
          'token': token
        })
      }
      fetchRequest(uploadUrl, method).then((result) => {
        if (result.STATUS === 'success' && result.MESSAGE === 'MD5值不存在') {
          upLoadingFile(filepath, MD5fileContent, token);
        }
      }).catch((error) => {
        console.log('action - qualityInspector -  postMD5Files - error fetchRequest', error);
      })
    }).catch((error) => {
      console.log("error", error)
    })
    // hash(filepath, 'md5').then(async (result) => {
    //   console.log("hashresult", result);
    //   MD5fileContent = result;
    //   const uploadUrl = `${host}/file/file-center/validateFileMd5?configKey=SCMP-FILE&fileFileName=${filepath}&md5=${MD5fileContent}`;
    //   let token = await AsyncStorage.getItem('token');
    //   let method = {
    //     method: "GET",
    //     headers: new Headers({
    //       'Content-Type': 'application/json',
    //       'token': token
    //     })
    //   }
    //   fetchRequest(uploadUrl, method).then((result) => {
    //     console.log('data', result);
    //     if (result.STATUS === 'success' && result.MESSAGE === 'MD5值不存在') {
    //       upLoadingFile(filepath, MD5fileContent, token);
    //     }
    //   }).catch((error) => {
    //     console.log('action - qualityInspector -  postMD5Files - error fetchRequest', error);
    //   })
    // }).catch((error) => {
    //   console.warn("action - QualityInspetor - catch -postMD5Files ", error)
    // })
  }
}

//提交总的零件号信息
export const postTotalMechanicalMessage = (proInspectionId, callBack) => {
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


    // console.warn("获取无零件号的标准项详情", qualitySheetListid, mechanicalMessage)
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
     const token =await AsyncStorage.getItem("token");
    axios.get(url,{
      headers: {
        'Accept': 'application/json',
        'token': token
    },
    })
      .then(function (response) {
        if(response.status === 200){
          if(typeof callBack === 'function'){
            callBack(response.data)//没有文件返回的是""空字符串
          }
        }
      })
      .catch(function (error) {
        "action - qualityInspector - catch - getPartFile " + error
      });
  }
}

//无零件号获取文件路劲
export const getModifyFilePath =  ({ proInspectionId }, callBack) => {
  return async () => {
    const token =await AsyncStorage.getItem("token");
    const url = `${host}/qlt-pro-inspection/partFile?dateId=${proInspectionId}`;
    axios.get(url,{
      headers: {
        'Accept': 'application/json',
        'token': token
    },
    })
      .then(function (response) {
        if(response.status === 200){
          if(typeof callBack === 'function'){
            callBack(response.data)//没有文件返回的是""空字符串
          }
        }
      })
      .catch(function (error) {
        "action - qualityInspector - catch - getPartFile " + error
      });
  }
}


