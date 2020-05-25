/**
 * 工艺工序 
 *待审批(需要修改待审批字段名声): materialWaste
 */

class NoMechanicalData {
  constructor() {
    this.qualified = '';
    this.fit = '';
    this.industrialWaste = '';
    this.materialWaste = '';
  }

  static init(jsonData) {
    if (!jsonData) throw new Error("QualityInpector - NoMechanicalData - init: jsonData is null");
    let data = new NoMechanicalData();
    try {
      // 更改后端真实接口参数
      let { qualified,
            fit,
            industrialWaste,
            materialWaste,
             } = jsonData;
      
      data.qualified = qualified;
      data.fit = fit;
      data.industrialWaste = industrialWaste;
      data.materialWaste = materialWaste;
    }
    catch(error) {
      console.error("QualityInpector - NoMechanicalData - init: " + error);
    }

    return data;
  }

  isExist() {
    let isExist = true;

    isExist = isExist && !!this.qualified;
    isExist = isExist && !!this.fit;
    isExist = isExist && !!this.industrialWaste;
    isExist = isExist && !!this.materialWaste;

    return isExist;
  }
 };

/**
 * 质检员的质检列表数据
 */

 class NoMechanicalListData {
  constructor() {
    this.NoMechanicalList = [];
  }

  static init(jsonData) {
    if (!jsonData) throw new Error("QualityInpector - NoMechanicalListData - init: jsonData is null");

    let listData = new NoMechanicalListData();
    try {
      // let { data } = jsonData;
      jsonData.map((item) => {
        let sheetData = NoMechanicalData.init(item);
        listData.NoMechanicalList.push(sheetData);
      });
    }
    catch(error) {
      console.error("QualityInpector - NoMechanicalListData - init: " + error);
    }

    return listData;
  }

  isExist() {
    return (this.NoMechanicalList.length > 0) ? true : false;
  }
 };

 export default NoMechanicalListData;