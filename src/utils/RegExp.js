import { isString } from './Util';

/**
 * 解析HeaderRange
 */
export const parseHeaderRange = (range) => {
  if (!isString(range)) throw new Error("RegExp - parseHeaderRange : range is not string");
    
  let datas = range.match(/\d+/g);

  return { curCount: parseInt(datas[0]), 
           maxCount: parseInt(datas[1]), 
           totalCount: parseInt(datas[2]) };
}