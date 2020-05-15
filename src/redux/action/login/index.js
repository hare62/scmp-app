import actionTypes from '../actionTypes';
import { fetchRequest } from '../../../api/NetManager';
import LoginData from '../../../data/Login/LoginData';
import RoleListData from '../../../data/Login/RoleListData';
import MD5 from "react-native-md5";
import { LoginStatusEnum } from '../../../page/login/Constants';
import { getHost } from '../../../utils/Config';
import AsyncStorage from '@react-native-community/async-storage';

const host = getHost('login');
const authenticatioRoleSuccess = (roleListData) => ({
  type: actionTypes.AUTHENTICTION_ROLE_SUCCESS,
  roleListData: roleListData
});

const LoginInfo = (loginData) => ({
  type: actionTypes.LOGIN_STATUS,
  loginData
})

/**
 * 修改登录状态
 */
export const changeLoginStatus = (loginStatus) => ({
  type: actionTypes.CHANGE_LOGIN_STATUS,
  loginStatus,
});

/**
 * 修改角色类型
 */
export const changeRoleType = (roleType) => ({
  type: actionTypes.CHANGE_ROLE_TYPE,
  roleType
})

/**
 * 验证用户角色类型
 * @param {*} userId 
 * @param {*} token 
 */
export const authenticationRole = (userId, token) => {
  return (dispatch) => {
    const method = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'token': token
      })
    };

    const url = `${host}/login/listRole?userId=${userId}`;
    fetchRequest(url, method)
      .then(async (jsonData) => {
        let roleData = RoleListData.init(jsonData);
        const PAGE_LINK = roleData.roleList[0].PAGE_LINK;
        const ROLE_ID = roleData.roleList[0].ROLE_ID;
        dispatch(changeRoleType(roleData.getRoleType(PAGE_LINK)));
        await AsyncStorage.setItem("role_id", ROLE_ID)//后续查工人信息存的信息
        dispatch(authenticatioRoleSuccess(roleData));
      }).catch((error) => {
        
        console.warn("action - login - catch - authenticationRole" + error);
      })
  }
}

/**
 * 
 * @param {账号} userInfo 
 * @param {密码} password 
 * @param {是否ajax请求} isAjax 
 */
export const getLoginInfo = (userInfo, password, isAjax) => {
  return async (dispatch) => {
    const method = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };

    password = MD5.hex_md5(password);
    const url = `${host}/login?sysUserLogin.loginNm=${userInfo}&sysUserLogin.loginPwd=${password}&isAjax=${isAjax}`;
    fetchRequest(url, method)
      .then(async (responseJson) => {
        let loginData = LoginData.init(responseJson);
        let { userId, token } = loginData;
        await AsyncStorage.setItem("token", token);
        dispatch(changeLoginStatus(loginData.getLoginStatus()));
        dispatch(authenticationRole(userId, token));
        dispatch(LoginInfo(loginData));
      })
      .catch((error) => {
        if(error.type === 'netWorkError'){
          dispatch(changeLoginStatus(LoginStatusEnum.NetWorkError));
          return false;
        }
        dispatch(changeLoginStatus(LoginStatusEnum.LoginFailure));
      });
  };
};
