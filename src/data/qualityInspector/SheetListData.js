import BaseSheetListData from '../Base/BaseSheetListData';
/**
 * 质检员的质检单数据
 * 质检单编码 sheetListid
 * 质检单号sheetId
 * 质检状态（派工单的质检状态）sheetListstatus
 * 物料名称 materialsName
 * 数量（物料的数量）materialsNumber
 * 完成时间（派工单的完成时间）sheetListFinishTime
 * 质检单加工人 worker
 * 是否有零件号 hasMechanical 01===是 02===否
 */

class SheetData {
  constructor() {
    this.sheetListid = '';
    this.sheetId = '';
    this.sheetListstatus = '';
    this.materialsName = '';
    this.materialsNumber = '';
    this.sheetListFinishTime = '';
    this.worker = '';
    this.hasMechanical = '';
    this.testData = '';
  }

  static init(jsonData) {
    if (!jsonData) throw new Error("QualityInpector - SheetData - init: jsonData is null");
    let data = new SheetData();
    try {
      // 更改后端真实接口参数
      let { sheetCode,
        sheetId,
        sheetStatus,
        matName,
        matQty,
        completeDate,
        makeUser,
        isMatPart,
        CREATE_TIME} = jsonData;

      data.sheetListid = sheetCode;
      data.sheetId = sheetId;
      data.sheetListstatus = sheetStatus;
      data.materialsName = matName;
      data.materialsNumber = matQty;
      data.sheetListFinishTime = completeDate;
      data.worker = makeUser;
      data.hasMechanical = isMatPart;
      data.testData = CREATE_TIME
    }
    catch (error) {
      console.error("QualityInpector - SheetData - init: " + error);
    }

    return data;
  }

  isExist() {
    let isExist = true;

    isExist = isExist && !!this.sheetListid;
    isExist = isExist && !!this.sheetListstatus;
    isExist = isExist && !!this.materialsName;
    isExist = isExist && !!this.materialsNumber;
    isExist = isExist && !!this.sheetListFinishTime;

    return isExist;
  }
};

/**
 * 质检员的质检列表数据
 */

class SheetListData extends BaseSheetListData {
  constructor() {
    super();
    this.sheetList = [];
  }

  appendDatas(jsonData) {
    if (!jsonData) throw new Error("QualityInpector - SheetListData - init: jsonData is null");

    let { sheetList } = this;
    try {
      // let { data } = jsonData;
      jsonData.map((item) => {
        let sheetData = SheetData.init(item);
        sheetList.push(sheetData);
      });
    }
    catch (error) {
      console.error("QualityInpector - SheetListData - init: " + error);
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