import  actionTypes from '../../action/actionTypes';
import { 
  LoginStatusEnum,
  RoleTypeEnum
} from '../../../page/login/Constants';
import LoginData from '../../../data/Login/LoginData';

const defaultState = {
  loginStatus: LoginStatusEnum.Unlogin,
  roleListData:[],
  roleType: null,
  loginData: new LoginData(),
}

export default (state = defaultState, action) => {
  switch (action.type) {

    //更改登录状态
    case actionTypes.CHANGE_LOGIN_STATUS:
      return {
        ...state,
        loginStatus: action.loginStatus,
      }

    //登录状态  
    case actionTypes.LOGIN_STATUS:
      return {
        ...state,
        loginData:action.loginData
      };

    //认证角色成功  
    case actionTypes.AUTHENTICTION_ROLE_SUCCESS:
       return {
         ...state,
         roleListData:action.roleListData
       } 
       
    //更改角色类型   
    case actionTypes.CHANGE_ROLE_TYPE:
      return {
        ...state,
        roleType: action.roleType
      }
 
    default :
      return state;  
  }
}