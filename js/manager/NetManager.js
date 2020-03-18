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
          return response.json()
        }
        throw new Error("NetManager - fetchRequest -  response was not ok.")
      })
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        reject(error);
      });
  })
};