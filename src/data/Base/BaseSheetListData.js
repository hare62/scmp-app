import Constants from '../../utils/Constants';
import { isNumber } from '../../utils/Util';
import { parseHeaderRange } from '../../utils/RegExp';

/**
 * SheetListData基类
 */
class BaseSheetListData {
  constructor() { 
    // 是否是第一次请求数据
    this.isFirstRequest = true;
    // 总的条数
    this.totalCount = 0;
    // 当前条数
    this.curCount = 0;
    // 最大条数
    this.maxCount = Constants.PAGE_INCREASE_COUNT - 1;
  }

  /**
   * 下一页
   */
  nextPage() {
    this.curCount = this.curCount + Constants.PAGE_INCREASE_COUNT;
    this.maxCount = this.maxCount + Constants.PAGE_INCREASE_COUNT;
  }

  /**
   * 解析头部数据
   */
  parseHeaderData(headerData) {
    try {
      const { curCount,
              maxCount,
              totalCount } = parseHeaderRange(headerData.map['content-range']);
      
      this.curCount = curCount;
      this.maxCount = maxCount;
      this.totalCount = totalCount;
    }
    catch(error) {
      console.error(error);
    }
  }

  isFirstRequestData() {
    if (this.isFirstRequest) {
      this.isFirstRequest = false;
      return true;
    }

    return this.isFirstRequest;
  }

  /**
   * 是否有更多数据
   */
  hasMoreData() {
    if (this.maxCount >= this.totalCount) {
      return false;
    } 
    else {
      return true;
    }
  }

  /**
   * 是否可以加载更多数据
   */
  canLoadMoreData() {
    let canLoad = false;

    canLoad = canLoad || this.isFirstRequestData();
    canLoad = canLoad || this.hasMoreData();

    return canLoad;
  }

  /**
   * 生成header数据
   */
  generateHeaderData() {
    try{
      if (!isNumber(this.curCount) || !isNumber(this.maxCount)) throw new Error("BaseSheetListData - generateHeaderData : curCount is not number");

      return `item=${this.curCount}-${this.maxCount}`;

    } catch(error){
      console.error("BaseSheetListData - generateHeaderData -"+ error)
    }
    
  }
};

export default BaseSheetListData;