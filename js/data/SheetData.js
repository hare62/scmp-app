/**
 * 派工单数据
 */

class SheetData {
  constructor() {
    this.id = '';
    this.time = '';
    this.materialsID = '';
    this.materialsName = '';
  }

  static init(jsonData) {
    if (!jsonData) throw new Error("SheetData - init: jsonData is null");

    let data = new SheetData();
    try {
      let { id,
            time,
            materials,
            materialsName } = jsonData;
      
      data.id = id;
      data.time = time;
      data.materialsID = materials;
      data.materialsName = materialsName;
    }
    catch(error) {
      console.log("SheetData - init: " + error);
    }

    return data;
  }

  isExist() {
    let isExist = true;

    isExist = isExist && !!this.id;
    isExist = isExist && !!this.time;
    isExist = isExist && !!this.materialsID;
    isExist = isExist && !!this.materialsName;

    return isExist;
  }
 };

 export default SheetData;