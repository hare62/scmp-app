/**
 * 配置文件
 */
// app环境枚举
export const AppEnvEnum = {
  manufacture: 'manufacture', //manufacture生产模块
  login: 'login', //login登录模块
  file:'file',//文件路径
}

//是否为mock数据
export const isMockData = false;

//是否为分页url 假数据就走没有分页的
export const isPageUrl = false;

/**
 * //47.108.27.242:80  
 * //47.108.27.242:8080  
 * 新泰平台//生产 http://47.108.82.5:8080/     登录：http://47.108.82.5:80
 * 测试平台//生产 http://47.108.27.242:8080/manufacture   登录：http://47.108.27.242:80   192.168.0.188:8787
 * 文件中心地址//192.168.0.238:8099      192.168.0.130:8783
 */

/**
 * 获取ip地址
 */
export const getHost = (type) => {
  switch (type) {
    case AppEnvEnum.login://192.168.0.190:7080  
      return 'http://47.108.27.242:80';
    case AppEnvEnum.manufacture:
      return 'http://192.168.125.115:8783';//47.108.27.242:8080/manufacture   192.168.125.116:8783
    case AppEnvEnum.file:
      return 'http://47.108.27.242:80';
    default:
      return null;
  }
}
