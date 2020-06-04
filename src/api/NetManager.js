import ResponseData from './ResponseData';
import AsyncStorage from '@react-native-community/async-storage';
// import RNFS from 'react-native-fs';

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
 * fetch请求
 * @param {*} url 
 * @param {*} method 请求方法
 */
export const fetchRequestTest = async({url, type, contentType, body, newToken}) => {
  let token = newToken || await AsyncStorage.getItem('token');
  const method = {
    method: type,
    headers: new Headers({
      'Content-Type': contentType || 'application/json',
      'token': token,
    }),
    body:JSON.stringify(body) || null,
  };
  return new Promise(async (resolve, reject) => {
    await fetch(url, method)
      .then((response) => {
        if (response.ok) {
          const jsonData = response.json();

          return jsonData;
        }
        throw new Error("NetManager - fetchRequestTest -  Network response was not ok.");
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
        throw new Error("NetManager - fetchHeaderRequest -  Network response was not ok.");
      })
      .then((responseData) => {
        resolve(responseData);
      })
      .catch((error) => {
        reject(error);
      });
  })
};


/**
 * 分页fetch获取头部数据请求
 * @param {*} url 
 * @param {*} param 
 */
export const fetchHeaderRequestTest = async ({url, type, contentType, Range, body, newToken} ) => {
  let token = newToken || await AsyncStorage.getItem('token');
  const method = {
    method: type,
    headers: new Headers({
      'Content-Type': contentType || 'application/json',
      'Range': Range,
      'token': token
    }),
    body:JSON.stringify(body) || null,
  };

  return new Promise(async (resolve, reject) => {
    await fetch(url, method)
      .then((response) => {
        if (response.ok) {
          return ResponseData.init(response);
        }
        throw new Error("NetManager - fetchHeaderRequestTest -  Network response was not ok.");
      })
      .then((responseData) => {
        resolve(responseData);
      })
      .catch((error) => {
        reject(error);
      });
  })
};
