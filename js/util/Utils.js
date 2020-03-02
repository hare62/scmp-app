export default class Utils {
    /**
     * 检查该Item是否被收藏
     * **/
    static checkFavorite(item, keys = []) {
        if (!keys) return false;
        for (let i = 0, len = keys.length; i < len; i++) {
            let id = item.id ? item.id : item.fullName;
            if (id.toString() === keys[i]) {
                return true;
            }
        }
        return false;
    }
    /**
     * 检查key是否存在于keys中
     * @param keys
     * @param key
     */
    static checkKeyIsExist(keys, key) {
        for (let i = 0, l = keys.length; i < l; i++) {
            if (key.toLowerCase() === keys[i].name.toLowerCase()) return true;
        }
        return false;
    }
    /**
     * 
     * @param {请求路径} url 
     */
    static fetchData(url) {


        return new Promise((resolve, reject) => {

            fetch(url)
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error("util - Utils -  response was not ok.")
                })
                .then((responseJson) => {
                    console.log('responseJson', responseJson);
                    resolve(responseJson);
                })
                .catch((error) => {
                    throw new Error('util - Utils - firstRequestWorkerData' + error)
                });
        })

        // fetch(url)
        //     .then((response) => {
        //         if (response.ok) {
        //             return response.json()
        //         }
        //         throw new Error("util - Utils -  response was not ok.")
        //     })
        //     .then((responseJson) => {
        //         return responseJson;
        //     })
        //     .catch((error) => {
        //         throw new Error('util - Utils - firstRequestWorkerData' + error)
        //     });
    }

}