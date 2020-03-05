/**
 * fetch请求
 * @param {*} url 
 * @param {*} method 请求方法
 */
export const fetchRequest = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
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