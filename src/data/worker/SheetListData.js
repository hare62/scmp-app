import SheetData from './SheetData';
import BaseSheetListData from '../Base/BaseSheetListData';

/**
 * 派工单列表数据
 */
class SheetListData extends BaseSheetListData {  
  constructor() {
    super();
    this.sheetList = [];
  }

  appendDatas(jsonData) {
    if (!jsonData) throw new Error("SheetListData - appendDatas: jsonData is null");

    let { sheetList } = this;
    try {
      jsonData.map((item) => {
        let sheetData = SheetData.init(item);
        sheetList.push(sheetData);
      });
    }
    catch(error) {
      console.warn("SheetListData - appendDatas: " + error);
    }
  }

  copy(oldListData) {
    let { sheetList } = this;

    oldListData.sheetList.map((item) => {
      sheetList.push(item);
    })

    this.isFirstRequest = false;
  }
};

export default SheetListData;