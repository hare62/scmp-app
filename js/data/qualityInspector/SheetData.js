/**
 * 质检员的质检单数据
 * 派工单号 sheetListid
 * 质检状态（派工单的质检状态）sheetListstatus
 * 物料名称 materialsName
 * 数量（物料的数量）materialsNumber
 * 完成时间（派工单的完成时间）sheetListFinishTime
 */

class SheetData {
  constructor() {
    this.sheetListid = '';
    this.sheetListstatus = '';
    this.materialsName = '';
    this.materialsNumber = '';
    this.sheetListFinishTime = '';
  }

  static init(jsonData) {
    if (!jsonData) throw new Error("QualityInpector - SheetData - init: jsonData is null");
    let data = new SheetData();
    try {
      // 更改后端真实接口参数
      let { sheetListid,
            sheetListstatus,
            materialsName,
            materialsNumber,
            sheetListFinishTime } = jsonData;
      
      data.sheetListid = sheetListid;
      data.sheetListstatus = sheetListstatus;
      data.materialsName = materialsName;
      data.materialsNumber = materialsNumber;
      data.sheetListFinishTime = sheetListFinishTime;
    }
    catch(error) {
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

 export default SheetData;