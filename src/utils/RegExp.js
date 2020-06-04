import { isString } from './Util';

/**
 * 解析HeaderRange
 */
export const parseHeaderRange = (range) => {
  if (!isString(range)) throw new Error("RegExp - parseHeaderRange : range is not string");

  let datas = range.match(/\d+/g);

  return {
    curCount: parseInt(datas[0]),
    maxCount: parseInt(datas[1]),
    totalCount: parseInt(datas[2])
  };
}

export const isPhone = (phone) => {
  return /^1(3\d|4\d|5\d|6\d|7\d|8\d|9\d)\d{8}$/g.test(phone);
}