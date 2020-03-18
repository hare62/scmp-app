/**
 * 配置文件
 */

/**
 * 调试环境ip与端口
 */
const DEBUG_HOST = '192.168.0.187';
const DEBUG_PORT = '7080';

/**
 * 线上环境ip与端口
 */
const ONLINE_HOST = '';
const ONLINE_PORT = '';

// app环境枚举
export const AppEnvEnum = {
  DEBUG: Symbol('DEBUG'), // 调试环境
  ONLINE: Symbol('ONLINE') // 线上环境
}

// app当前环境
export const AppEnv = AppEnvEnum.DEBUG;

/**
 * 获取ip地址
 */
export const getHost = () => {
  if (AppEnv === AppEnvEnum.DEBUG) {
    return `http://${DEBUG_HOST}:${DEBUG_PORT}/`;
  }
  else if (AppEnv === AppEnvEnum.ONLINE) {
    return `http://${ONLINE_HOST}:${ONLINE_PORT}/`;
  }
  else {
    console.error('Config.js : AppEnv error');
  }
}


