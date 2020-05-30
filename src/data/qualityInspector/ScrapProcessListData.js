/**ScrapProcessListData
 * ScrapProcessData
 * 报废数据接口
 * technologyId:“工艺工序Id”,
   technologyName:”工艺工序名称”
 */
class ScrapProcessData {
  constructor() {
    this.technologyId = '';
    this.technologyName = '';
  }

  static init(jsonData) {
    if (!jsonData) throw new Error("data QualityInpector - ScrapProcessData - init: jsonData is null");
    let itemData = new ScrapProcessData();

    try {
      let {
        technologyId,
        technologyName,
      } = jsonData;
      itemData.technologyId = technologyId;
      itemData.technologyName = technologyName;
    }
    catch (error) {
      console.error("data QualityInpector - ScrapProcessData - init:" + error);
    }

    return itemData;
  }

  isExist() {
    let isExist = true;

    isExist = isExist && !!this.technologyId;
    isExist = isExist && !!this.technologyName;
  
    return isExist;
  }
}

class ScrapProcessListData {
  constructor() {
    this.scrapProcessLis = [];
  }

  static init(jsonData) {
    {
      if (!jsonData) throw new Error("data QualityInpector - ScrapProcessDataList - init: jsonData is null");

      let listData = new ScrapProcessListData;

      try {
        jsonData.map((item) => {
          let itemData = ScrapProcessData.init(item);
          listData.scrapProcessLis.push(itemData);
        })
      } catch (error) {
        console.error("data QualityInpector - ScrapProcessDataList - init:" + error);
      }
      return listData;
    }
  }

  isExist(){
    return (this.scrapProcessLis.length > 0) ? true : false;
  }
}

export default ScrapProcessListData;