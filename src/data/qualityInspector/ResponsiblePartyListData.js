/**ResponsiblePartyListData
 * ResponsiblePartyData
 * 报废数据接口
 *{
    Name  姓名;
    userId  Id;
    responsiblePartyType 类型;
 }
 */

import BaseSheetListData from '../Base/BaseSheetListData';


class ResponsiblePartyData {
  constructor() {
    this.name = '';
    this.userId = '';
    this.responsiblePartyType = '';
  }

  static init(jsonData) {
    if (!jsonData) throw new Error("QualityInpector - ResponsiblePartyData - init: jsonData is null");
    let itemData = new ResponsiblePartyData();
    try {
      let {
        name,
        userId,
        responsiblePartyType,
        className,
        matId,
        drawNo
      } = jsonData;
      // itemData.name = name;
      // itemData.userId = userId;
      itemData.responsiblePartyType = responsiblePartyType;
      itemData.name = name;
      itemData.userId = matId
    }
    catch (error) {
      console.error("data QualityInpector - ResponsiblePartyData - init:" + error);
    }

    return itemData;
  }

  isExist() {
    let isExist = true;

    isExist = isExist && !!this.name;
    isExist = isExist && !!this.userId;
    isExist = isExist && !!this.responsiblePartyType;
  
    return isExist;
  }
};

class ResponsiblePartyListData extends BaseSheetListData {
  constructor() {
    super();
    this.responsiblePartyList = [];
  }

  appendDatas(jsonData) {
    if (!jsonData) throw new Error("QualityInpector - ResponsiblePartyListData - init: jsonData is null");

    let { responsiblePartyList } = this;
    try {
      jsonData.map((item) => {
        let sheetData = ResponsiblePartyData.init(item);
        responsiblePartyList.push(sheetData);
      });
    }
    catch (error) {
      console.error("QualityInpector - ResponsiblePartyListData - init: " + error);
    }
  }

  copy(oldListData) {
    let { responsiblePartyList } = this;

    oldListData.responsiblePartyList.map((item) => {
      responsiblePartyList.push(item);
    })

    this.isFirstRequest = false;
  }

};

export default ResponsiblePartyListData;