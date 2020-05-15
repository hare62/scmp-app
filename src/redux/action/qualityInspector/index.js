import actionTypes from '../actionTypes';
import {
  mockQualityInspectorSheetListData,
  mockFinishData,
  mockTechnonigyProcessData,
  mockMechanicalMessageData,
  mockNoMechanicalData
} from '../../../data/mockdata/qualityInspector';
import SheetListData from '../../../data/qualityInspector/SheetListData';
import TechnologyProcessListData from '../../../data/qualityInspector/TechnologyProcessListData';
import MechanicalMessageListData from '../../../data/qualityInspector/MechanicalMessageListData';
import NoMechanicalData from '../../../data/qualityInspector/NoMechanicalData';
import RNFileSelector from 'react-native-file-selector';
import RNFS, { hash, readFile } from 'react-native-fs';
import { uploadFilesRequest, fetchRequest } from '../../../api/NetManager';
import MD5 from "react-native-md5";
import AsyncStorage from '@react-native-community/async-storage';
import { getHost } from '../../../utils/Config';
import axios from 'axios';
import qs from 'qs';
// import SparkMD5 from 'spark-md5';
// var SparkMD5 = require('spark-md5');

// 获取质检派工单成功 actionTypes.GET_QUALITYINSPECTOR_SHEET_LIST_SUCCESS
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
const getMechanicalMessageListSuccess = (sheetListData) => ({
  type: actionTypes.GET_MECHANICAL_MESSAGE_LIST_SUCCESS,
  ...sheetListData
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

// 获取零件号信息
export const getMechanicalMessageList = () => {
  return (dispatch) => {
    //预留请求真实接口 
    let sheetListData = MechanicalMessageListData.init(mockMechanicalMessageData);
    dispatch(getMechanicalMessageListSuccess(sheetListData));
  }
}

// 获取质检已完成的无零件号信息
export const getNoMechanicalMessageDetail = (callBack) => {
  return (dispatch) => {
    let NoMechanicalList = NoMechanicalData.init(mockNoMechanicalData);
    dispatch(getNoMechanicalMEssageSuccess(NoMechanicalList));
  }
}

// 无零件号质检提交
export const postSubmitResult = (qualified, fit, industrialWaste, materialWaste, callBack) => {
  return (dispatch) => {
    console.log('=======', qualified, fit, industrialWaste, materialWaste)
    if (typeof callBack === 'function') {
      callBack('质检提交成功了');
    }
  }
}

// 无零件号质检保存
export const postSaveResult = (qualified, fit, industrialWaste, materialWaste, callBack) => {
  return (dispatch) => {
    console.log('=======', qualified, fit, industrialWaste, materialWaste)
    if (typeof callBack === 'function') {
      callBack('质检保存成功了');
    }
  }
}

//提交新增零件号
export const postAddMechanical = (mechanical, qualityResult, realNumber, callBack) => {
  return (dispatch) => {
    console.warn('=======', mechanical, qualityResult, realNumber)
    if (typeof callBack === 'function') {
      callBack('提交新增零件号');
    }
  }
}

const baseUsage = (filePath) => {
  // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
  RNFS.readDir(filePath)
    .then((result) => {
      console.log('GOT RESULT', result);
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
      console.log(contents);
    })
    .catch((err) => {
      console.log(err.message, err.code);
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
    console.log("error", error)
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
    console.log('upLoadingFile',result)
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

    let file = {uri: filepath, type: 'multipart/form-data', name: '123.jpg'};
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
    console.warn('oops, something went wrong.');
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
      console.log('hex_md5',MD5fileContent)
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
        console.log('data', result);
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
export const postTotalMechanicalMessage = () => {
  return () => {
    console.warn("提交总的零件号信息")
  }
}
