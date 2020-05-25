import actionTypes from '../../action/actionTypes';
import SheetListData from '../../../data/worker/SheetListData';

const defaultState = {
  workerSheetListData: new SheetListData(),
  isLoading: true,
  isLoadingMore: false,
  isRefreshSheetCell: false,//判断派工单是否完成
}

export default (state = defaultState, action) => {

  switch (action.type) {

    //获取工人默认派工单成功
    case actionTypes.GET_WORKER_DEFAULT_SHEET_LIST_SUCCESS:
      return {
        ...state,
        workerSheetListData: action.sheetListData,
        isLoading: false,
        isLoadingMore: false
      };

    //获取条件筛选的派工单
    case actionTypes.GET_WORKER_FILTER_SHEET_LIST_SUCCESS:
      return {
        ...state,
        [action.topNavName]: {
          ...state[action.topNavName],
          filterSheetList: action.filterSheetList,
          topNavName: action.topNavName,
        },
        isLoading: false,
        isLoadingMore: false
      };

    //工艺工序获取列表成功 
    case actionTypes.GET_WORKER_TECHNOLOGY_PROCESS_LISST_SUCCESS:
      return {
        ...state,
        processList: action.ProcessList,
        isLoading: false,
      }; 

    //工艺工序获取列表失败
    case actionTypes.GET_WORKER_TECHNOLOGTY_PROCESS_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    //工人派工单初始刷新状态
    case actionTypes.WORKER_SHEET_LIST_REFRESH:
      return {
        ...state,
        isLoading: true,
        isLoadingMore: false
      };

    //获取工人派工单数据失败
    case actionTypes.WORKER_SHEET_LIST_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoadingMore: false
      };

    //重置工人派工单所有的数据
    case actionTypes.RESET_WORKER_ALL_SHEET_LIST_DATA:
      return {
        ...state,
        workerSheetListData: new SheetListData(),
        isLoading: false,
        isLoadingMore: false
      }

    //工艺工序初始刷新数据状态
    case actionTypes.GET_TECHNOLOGY_PROCESS_LIST_REFRESH_STATUS:
      return {
        ...state,
        isLoading: true,
        isLoadingMore: false
      }
 
    //重置工人派工单默认数据 下拉刷新前操作
    case actionTypes.RESET_WORKER_DEFAULT_SHEET_LIST:
      return {
        ...state,
        isLoading: false,
        workerSheetListData: new SheetListData(),
        isLoadingMore: false
      }

    //加载更多
    case actionTypes.LOADING_MORE_DATA:
      return {
        ...state,
        isLoadingMore: true
      }

    //刷新工人单个派工单列表数据
    case actionTypes.REFRESH_WORKER_CELL_SHEET_LIST_DATA:
      return {
        ...state,
        workerSheetListData: { ...state.workerSheetListData },
        isRefreshSheetCell: false
      }

    //判断派工单是否是完成状态并刷新派工单
    case actionTypes.IS_FINISH_OF_WORKER_SHEET_CELL:
      return {
        ...state,
        isRefreshSheetCell: true
      }

    //判断派工单是否是完成状态并刷新筛选派工单
    case actionTypes.IS_FINISH_OF_FILTER_WORKER_SHEET_CELL:
        return {
          ...state,
          [action.topNavName]: {
            ...state[action.topNavName],
            filterSheetList: {...state[action.topNavName.filterSheetList]},//
            // topNavName: action.topNavName,
          },
          isRefreshSheetCell: false
        };
    default:
      return state;
  }
}