import actionTypes from '../actionTypes';
import { fetchRequest } from '../../manager/NetManager';
import LoginData from '../../data/Login/LoginData';
import RoleData from '../../data/Login/RoleData';
import MD5 from "react-native-md5";
import { defaultMockDatas } from '../../mockdata/role';
import { LoginStatusEnum } from '../../page/login/Constants';
import { getHost } from '../../Config';

const host = getHost();
const authenticatioRoleSuccess = (roleListData) =>({
  type: actionTypes.AUTHENTICTION_ROLE_SUCCESS,
  roleListData:roleListData
});

const LoginInfo = (loginData) =>({
  type:actionTypes.LOGIN_STATUS,
  loginData
})

/**
 * 修改登录状态
 */
export const changeLoginStatus = (loginStatus) => ({
  type: actionTypes.CHANGE_LOGIN_STATUS,
  loginStatus
});

/**
 * 修改角色类型
 */
export const changeRoleType = (roleType) => ({
  type: actionTypes.CHANGE_ROLE_TYPE,
  roleType
})

export const authenticationRole = (userId, token) => {
  return (dispatch) =>{
     const method = {
       method:'GET',
       headers: new Headers({
         'Content-Type':'application/json',
         'token':token
       })
     };

     const url = `${host}/login/listRole?userId=${userId}`;
     fetchRequest(url,method)
     .then((jsonData) =>{
         // 暂时模拟数据
         console.warn(jsonData);
         let roleData = RoleData.init(jsonData);
         dispatch(changeRoleType(roleData.getRoleType()));
         dispatch(authenticatioRoleSuccess(roleData));
     }).catch((error) =>{
       console.warn("action - login - catch - authenticationRole" + error);
     })
  }
}

export const getLoginInfo = (userInfo, password, isAjax) => {
  return (dispatch) => {
    const method = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };

    password=MD5.hex_md5(password);
    const url = `${host}/login?sysUserLogin.loginNm=${userInfo}&sysUserLogin.loginPwd=${password}&isAjax=${isAjax}`;

    fetchRequest(url, method)
      .then((responseJson) => {
        console.warn(responseJson);
        let loginData = LoginData.init(responseJson);
        let { userId, token } = loginData;

        dispatch(changeLoginStatus(loginData.getLoginStatus()));
        dispatch(authenticationRole(userId, token));
        dispatch(LoginInfo(loginData));
      })
      .catch((error) => {
        console.warn("error"+ error);
        dispatch(changeLoginStatus(LoginStatusEnum.LoginFailure))
      });
  };
}

