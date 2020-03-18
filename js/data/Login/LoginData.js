import { LoginStatusEnum } from '../../page/login/Constants';

/**
 * 登录数据
 */
class LoginData {
  constructor() {
    this.token = '';
    this.userId = '';
    this.userName = '';
    this.loginNm = '';
    this.orgId = '';
    this.sex = '';
    this.status = '';
  }

  static init(jsonData) {
    if (!jsonData) throw new Error("LoginData -init: jsonData is null");
    
    let data = new LoginData();
    try {
      let { TOKEN,
            USERID,
            USERNAME,
            LOGINNM,
            ORGID,
            SEX,
            STATUS } = jsonData;

      data.token = TOKEN;
      data.userId = USERID;
      data.loginNm = LOGINNM;
      data.userName = USERNAME;
      data.orgId = ORGID;
      data.sex = SEX;
      data.status = STATUS;
    }
    catch (error) {
      console.warn("LoginData -init:" + error);
    }

    return data;

  }

  /**
   * 判断登录是否成功
   */
  checkLoginStatus() {
    const status = this.status;
    if (status === 'success') {
      return true;
    } else {
      return false;
    }
  }

  /**
   * 获取登录状态
   */
  getLoginStatus() {
    if (this.status === 'success') {
      return LoginStatusEnum.LoginSuccess;
    }
    else {
      return LoginStatusEnum.LoginFailure;
    }
  }

  isExist() {
    let isExist = true;

    isExist = isExist && !!this.token;
    isExist = isExist && !!this.status;
    isExist = isExist && !!this.userId;
    isExist = isExist && !!this.userName;

    return isExist;
  }
};

export default LoginData;