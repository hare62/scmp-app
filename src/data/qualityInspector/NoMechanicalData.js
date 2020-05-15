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

 export default NoMechanicalData;