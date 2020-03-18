import  actionTypes from '../../action/actionTypes';
import { 
  LoginStatusEnum,
  RoleTypeEnum
} from '../../page/login/Constants';
import LoginData from '../../data/Login/LoginData';

const defaultState = {
  loginStatus: LoginStatusEnum.Unlogin,
  roleListData:[],
  roleType: null,
  loginData: new LoginData()
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_LOGIN_STATUS:
      return {
        ...state,
        loginStatus: action.loginStatus
      }
    case actionTypes.LOGIN_STATUS:
      return {
        ...state,
        loginData:action.loginData
      };
    case actionTypes.AUTHENTICTION_ROLE_SUCCESS:
       return {
         ...state,
         roleListData:action.roleListData
       } 
    case actionTypes.CHANGE_ROLE_TYPE: 
      return {
        ...state,
        roleType: action.roleType
      }   
    default :
      return state;  
  }
}