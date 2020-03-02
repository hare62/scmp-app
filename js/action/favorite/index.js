import Types from '../types';
import FavoriteDao from '../../expand/dao/FavoriteDao';
import { FLAG_STORAGE } from "../../expand/dao/DataStore";
import ProjectModel from "../../model/ProjectModel";
// import console = require('console');
/**
 * 获取最热数据的异步action
 * @param {} storeName  标识topNarState
 * @param favoriteDao
 * @param {} url
 * @returns {function name(params) {
    * 
        
}}
*/
export function onLoadfavoriteData(storeName) {
    return dispatch => {

        const favoriteDao = new FavoriteDao(storeName);

        favoriteDao.getAllItems().then((items) => {

            let resultData = [];
            for (let i = 0, len = items.length; i < len; i++) {
                resultData.push(new ProjectModel(items[i], true));
            }
            dispatch({type: Types.FAVORITE_lOAD_SUCCESS, projectModels: resultData, storeName: storeName});
            
        })



    }

}