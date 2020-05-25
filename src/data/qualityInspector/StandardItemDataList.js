/**
 * 标准项数据接口
 * inspectionName: "长",
    standardValue: 10,
    positiveTolerance: 0.01,
    negativeTolerance: 0.03
    realNumber:'请输入实际值' 
    检验标准项ID proInspectionStandardId
    质检标准项表ID qltInspectionId
    获取实际值 actualValue
 */
class StandardItemData {
  constructor() {
    this.inspectionName = '';
    this.standardValue = '';
    this.positiveTolerance = '';
    this.negativeTolerance = '';
    this.realNumber='';
    this.proInspectionStandardId = '';
    this.qltInspectionId = '';
    this.actualValue ='';
  }

  static init(jsonData) {
    if (!jsonData) throw new Error("data QualityInpector - StandardItemData - init: jsonData is null");
    let itemData = new StandardItemData();

    try {
      let {
        inspectionName,
        standardValue,
        positiveTolerance,
        negativeTolerance,
        proInspectionStandardId,
        qltInspectionId,
        actualValue,
        realNumber
      } = jsonData;
      itemData.inspectionName = inspectionName;
      itemData.standardValue = standardValue;
      itemData.positiveTolerance = positiveTolerance;
      itemData.negativeTolerance = negativeTolerance;
      itemData.realNumber = '';
      itemData.proInspectionStandardId = proInspectionStandardId;
      itemData.qltInspectionId = qltInspectionId;
      itemData.actualValue = actualValue;
      itemData.realNumber = realNumber;

    }
    catch (error) {
      console.error("data QualityInpector - StandardItemData - init:" + error);
    }

    return itemData;
  }

  isExist() {
    let isExist = true;

    isExist = isExist && !!this.inspectionName;
    isExist = isExist && !!this.standardValue;
    isExist = isExist && !!this.positiveTolerance;
    isExist = isExist && !!this.negativeTolerance;

    return isExist;
  }
}

class StandardItemDataList {
  constructor() {
    this.standardItemList = [];
  }

  static init(jsonData) {
    {
      if (!jsonData) throw new Error("data QualityInpector - StandardItemDataList - init: jsonData is null");

      let listData = new StandardItemDataList;

      try {
        jsonData.map((item) => {
          let itemData = StandardItemData.init(item);
          listData.standardItemList.push(itemData);
        })
      } catch (error) {
        console.error("data QualityInpector - StandardItemDataList - init:" + error);
      }
      return listData;
    }
  }

  isExist(){
    return (this.standardItemList.length > 0) ? true : false;
  }
}

export default StandardItemDataList;