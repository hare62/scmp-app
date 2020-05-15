import ResponseData from './ResponseData';
import AsyncStorage from '@react-native-community/async-storage';
import RNFS from 'react-native-fs';

/**
 * fetch请求
 * @param {*} url 
 * @param {*} method 请求方法
 */
export const fetchRequest = (url, param) => {
  return new Promise(async (resolve, reject) => {
    await fetch(url, param)
      .then((response) => {
        if (response.ok) {
          const jsonData = response.json();
          return jsonData;
        }
        throw new Error("NetManager - fetchRequest -  Network response was not ok.");
      })
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        let rejectMessage = {
          message: error,
          type: 'netWorkError'
        }
        reject(rejectMessage);
        console.warn('There has been a problem with your fetch operation: ',error)
      });
  })
};

/**
 * 分页fetch获取头部数据请求
 * @param {*} url 
 * @param {*} param 
 */
export const fetchHeaderRequest = (url, param) => {
  return new Promise(async (resolve, reject) => {
    await fetch(url, param)
      .then((response) => {
        if (response.ok) {
          return ResponseData.init(response);
        }
        throw new Error("NetManager - fetchRequest -  Network response was not ok.");
      })
      .then((responseData) => {
        resolve(responseData);
      })
      .catch((error) => {
        reject(error);
      });
  })
};

const uploadBegin = (response) => {
  let jobId = response.jobId;
  console.log('UPLOAD HAS BEGUN! JobId: ' + jobId);
};

const uploadProgress = (response) => {
  let percentage = Math.floor((response.totalBytesSent / response.totalBytesExpectedToSend) * 100);
  console.log('UPLOAD IS ' + percentage + '% DONE!');
};

export const uploadFilesRequest = async (uploadUrl, files,filepath) => {
  // return async() => {
  let token = await AsyncStorage.getItem('token');
  baseUsage(filepath);
  RNFS.uploadFiles({
    toUrl: uploadUrl,
    files: files,
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'token': token
    },
    fields: {
      'hello': 'world',
    },
    begin: uploadBegin,
    progress: uploadProgress
  }).promise.then((response) => {
    if (response.statusCode == 200) {
      console.log('FILES UPLOADED!', response); // response.statusCode, response.headers, response.body
    } else {
      console.log('SERVER ERROR', response);
    }
  })
    .catch((err) => {
      if (err.description === "cancelled") {
        // cancelled by user
      }
      console.log("+++++", err);
    });
  // }
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
        console.log("-----", statResult[1])
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

const getMd5 = (index) => {
  var fileReader = new FileReader(),
    blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice,
    file = this._files[0],
    chunkSize = /*2097152*/file.size / 2,
    // read in chunks of 2MB  
    chunks = Math.ceil(file.size / chunkSize),
    currentChunk = 0,
    spark = new SparkMd5();
  fileReader.onload = lang.hitch(this, function (e) {
    spark.appendBinary(e.target.result); // append binary string  
    currentChunk++;
    if (currentChunk < chunks) {
      loadNext();
    }
    else {
      this.md5 = spark.end(); // compute hash 
      console.log(this.md5);
      resolve();
    }
  });
  function loadNext() {
    var start = currentChunk * chunkSize,
      end = start + chunkSize >= file.size ? file.size : start + chunkSize;
    var ua = window.navigator.userAgent;
    if (ua.indexOf("MSIE ") > 0 || !!ua.match(/Trident.*rv\:11\./)) {
      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
    }
    else {
      fileReader.readAsBinaryString(blobSlice.call(file, start, end));
    }
  };
  loadNext();
}