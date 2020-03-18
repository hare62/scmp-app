import SheetData from './SheetData';

/**
 * 派工单列表数据
 */

 class SheetListData {
  constructor() {
    this.sheetList = [];
  }

  static init(jsonData) {
    if (!jsonData) throw new Error("SheetListData - init: jsonData is null");

    let listData = new SheetListData();
    try {
      let { data } = jsonData;
      data.map((item) => {
        let sheetData = SheetData.init(item);
        listData.sheetList.push(sheetData);
      });
    }
    catch(error) {
      console.warn("SheetListData - init: " + error);
    }

    return listData;
  }

  isExist() {
    return (this.sheetList.length > 0) ? true : false;
  }
 };

 export default SheetListData;