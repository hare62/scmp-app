import NoMechanicalData from './NoMechanicalData';

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