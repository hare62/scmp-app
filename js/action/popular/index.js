import Types from '../types';
import DataStore, {FLAG_STORAGE} from '../../expand/dao/DataStore';
import { handleData, _projectModels} from '../ActionUtil'
/**
 * 获取最热数据的异步action
 * @param {} storeName 
 * @param favoriteDao
 * @param {} url
 * @returns {function name(params) {
 * 
     
 }}
 */

export function onLoadPopularData(storeName, url, pageSize, favoriteDao) {
    return dispatch => {
        dispatch({ type: Types.POPULAR_REFRESH, storeName: storeName })
        let dataStore = new DataStore()
        dataStore.fetchData(url,FLAG_STORAGE.flag_popular).then(data => {
            handleData(Types.POPULAR_lOAD_SUCCESS, dispatch, storeName, data, pageSize, favoriteDao);
        }).catch(error => {
            console.log(error);
            dispatch({
                type: Types.POPULAR_lOAD_FAIL,
                storeName: storeName,
                error: error
            })
        })
    }

}


/**
 * 加载更多
 * @param storeName
 * @param pageIndex 第几页
 * @param pageSize 每页展示条数
 * @param dataArray 原始数据
 * @param callBack 回调函数，可以通过回调函数来向调用页面通信：比如异常信息的展示，没有更多等待

 * @returns {function(*)}
 */
export function onLoadMorePopular(storeName, pageIndex, pageSize, dataArray = [], favoriteDao, callBack) {
    return dispatch => {
        setTimeout(() => {//模拟网络请求
            if ( (pageIndex - 1) * pageSize >= dataArray.length) {//已加载完全部数据

                console.log("hhhh",(pageIndex - 1) * pageSize)
                if (typeof callBack === 'function') {
                    callBack('no more')
                }

                dispatch({
                    type: Types.POPULAR_LOAD_MORE_FAIL,
                    error: 'no more',
                    storeName: storeName,
                    pageIndex: --pageIndex,
                    
                })
            } else {
                //本次和载入的最大数量
                let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
                //把projectModels数据包装一个收藏状态
                _projectModels(dataArray.slice(0, max),favoriteDao,data=>{
                    dispatch({
                        type: Types.POPULAR_LOAD_MORE_SUCCESS,
                        storeName,
                        pageIndex,
                        projectModels: data,
                    })
                })
            }
        }, 500);
    }
}



