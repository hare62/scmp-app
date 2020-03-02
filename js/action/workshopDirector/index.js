import api from '../../api'
import Types from '../types';
import {workDirectorDispatch} from '../../api/mockData'

export function onfirstRequestWorkerData() {
    return dispatch => {
        api.onfirstRequestWorkerData().then((data) => {
            let res = workDirectorDispatch()
            console.log('modifyData',res)
            dispatch({ type: Types.WORKERSHOP_FIRST_lOAD_SUCCESS, data: res })
        })

    }
}