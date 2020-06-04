import actionTypes from '../../action/actionTypes';
import SheetListData from '../../../data/qualityInspector/SheetListData';

const defaultState = {
  qualityInspectorSheetList: new SheetListData(),
  noMechanicalList: '',
  isLoading: true,
  isLoadingMore: false,
  isLoadingOfStandar: true
}

export default (state = defaultState, action) => {
  switch (action.type) {

    case actionTypes.GET_QUALITYINSPECTOR_SHEET_LIST_SUCCESS:
      return {
        ...state,
        qualityInspectorSheetList: action.sheetListData,
        isLoading: false,
        isLoadingMore: false
      };
    case actionTypes.GET_QUALITYINSPECTOR_FILTER_SHEET_LIST_SUCCESS:
      return {
        ...state,
        [action.topNavName]: {
          ...state[action.topNavName],
          filterSheetList: action.filterSheetList,
          pageIndex: action.pageIndex,
          topNavName: action.topNavName
        }
      };
    case actionTypes.GET_TECHNOLOGYPROCESS_SHEET_LIST_SUCCESS:
      return {
        ...state,
        technologyProcessList: action.processList
      }
    case actionTypes.GET_MECHANICAL_MESSAGE_LIST_SUCCESS:
      return {
        ...state,
        mechanicalList: action.processList
      }
    case actionTypes.GET_NO_MECHANICAL_LIST_SUCCESS:
      return {
        ...state,
        noMechanicalList: action.noMechanicalList
      }
    case actionTypes.IS_SUCCESS_OF_FILE_UPLOAD:
      return {
        ...state,
        fileUploadData: action.fileUploadData
      }
    case actionTypes.GET_QUALITY_INSPECTOR_SHEET_LIST_SUCCESS:
      return {
        ...state,
        standarItemOfNoMechanical: action.standardItemList
      }

    //改变无零件号标准项的质检结果值
    case actionTypes.ON_CHANGE_NO_CHANICAL_REALVALUE_RESULT_SUCCESS:
      return {
        ...state,
        standarItemOfNoMechanical: action.standardItemList
      }

    //改变有零件号标准项的质检结果值
    case actionTypes.ON_CHANGE_STANDARD_ITEM_LIST_SUCCESS:
      return {
        ...state,
        standardItemList: action.standardItemList
      }

    //获取有零件号的标准项成功
    case actionTypes.GET_STANDAR_ITEM_SUCCESS:
      return {
        ...state,
        standardItemList: action.standardItemList,
        isLoadingOfStandar: false
      }

    //获取质检派工单数据失败
    case actionTypes.QUALIYT_INSPECTOR_SHEET_LIST_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoadingMore: false
      };

    //加载更多
    case actionTypes.LOADING_MORE_DATA:
      return {
        ...state,
        isLoadingMore: true
      }

    //工艺工序获取列表失败
    case actionTypes.GET_QUALITY_INSPECTOR_TECHNOLOGTY_PROCESS_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    //获取有零件号的标准项失败
    case actionTypes.GET_STANDAR_ITEM_FAILURE:
      return {
        ...state,
        isLoadingOfStandar: false
      }

    //获取无零件号的标准项失败
    case actionTypes.GET_NO_MECHANICAL_STANDAR_ITEM_FAILURE:
      return {
        ...state,
        isLoadingOfStandar: false
      }

    //重置工人派工单默认数据 下拉刷新前操作
    case actionTypes.RESET_QualityINSPECTOR_DEFAULT_SHEET_LIST:
      return {
        ...state,  
        isLoading: false,
        qualityInspectorSheetList: new SheetListData(),
        isLoadingMore: false
      }

    //获取报废工艺
    case actionTypes.GET_SCRAP_PROCESS_LIST_SUCESS:
      return {
        ...state,
        scrapProcessList: action.scrapProcessLis,
      }

    //获取工厂列表
    case actionTypes.GET_FACTORY__LIST_SUCESS:
      return {
        ...state,
        factoryList: action.jsonData,
        isLoadingMore: false
      }
    
    //获取供应商列表
    case actionTypes.GET_SUPPLIER__LIST_SUCESS:
      return {
        ...state,
        supplierList: action.jsonData,
        isLoadingMore: false
      }

    //获取班组列表
    case actionTypes.GET_MONITOR__LIST_SUCESS:
      return {
        ...state,
        monitorList: action.jsonData,
        isLoadingMore: false
      } 
    
    default:
      return state;
  }
}
