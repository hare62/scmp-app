/**
 * 构造url
 */
export const generateUrl = (baseUrl, params) => {
  if (!baseUrl) {
    console.error('Util - generateUrl : baseUrl is null');
    return null;
  }

  let url = baseUrl + '?';
  try {
    for(let key in params) {
      url = url + key + '=' + params[key] + '&';
    }

    // 删除最后一个元素'&'
    url.slice(-1);
  }
  catch(error) {
    console.error('Util - generateUrl : ' + error);
  }
  
  return url;
}

/**
 * 判断布尔类型
 */
export const isBoolean = (param) => {
  return Object.prototype.toString.call(param) === "[object Boolean]";
}

/**
 * 判断整型
 */
export const isNumber = (param) => {
  return Object.prototype.toString.call(param) === "[object Number]";
}

/**
 * 判断字符串类型
 */
export const isString = (param) => {
  return Object.prototype.toString.call(param) === "[object String]";
}

/**
 * 判断Symbol
 */
export const isSymbol = (param) => {
  return Object.prototype.toString.call(param) === "[object Symbol]";
}

/**
 * 判断function 
 */
export const isFunction = (param) => {
  return Object.prototype.toString.call(param) === "[object Function]";
}

/**
 * 判断数组
 */
export const isArray = (param) => {
  return Object.prototype.toString.call(param) === "[object Array]";
}