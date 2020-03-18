/**
 * 工人派工单数据
 */

class SheetData {
  constructor() {
    this.id = '';
    this.time = '';
    this.materialsID = '';
    this.materialsName = '';
    this.materialsNum = '';
    this.realNum = '';
  }

  static init(jsonData) {
    if (!jsonData) throw new Error("SheetData - init: jsonData is null");
    let data = new SheetData();
    try {
      // 更改后端真实接口参数
      let { id,
            time,
            materials,
            materialsName,
            materialsNum,
            realNum } = jsonData;
      
      data.id = id;
      data.time = time;
      data.materialsID = materials;
      data.materialsName = materialsName;
      data.materialsNum = materialsNum;
      data.realNum = realNum;

    }
    catch(error) {
      console.error("SheetData - init: " + error);
    }

    return data;
  }

  isExist() {
    let isExist = true;

    isExist = isExist && !!this.id;
    isExist = isExist && !!this.time;
    isExist = isExist && !!this.materialsID;
    isExist = isExist && !!this.materialsName;
    isExist = isExist && !!this.materialsNum;
    isExist = isExist && !!this.realNum;

    return isExist;
  }
 };

 export default SheetData;