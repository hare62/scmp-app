import ProcessData from './ProcessData';

/**
 * 工人派工单工艺工序列表数据
 */

class ProcessListData {
  constructor() {
    this.ProcessList = [];
  }

  static init(jsonData) {
    if (!jsonData) throw new Error("ProcessListData - init: jsonData is null");

    let listData = new ProcessListData();
    try {
      // let { data } = jsonData;
      jsonData.map((item) => {
        let data = ProcessData.init(item);
        listData.ProcessList.push(data);
      });
    }
    catch (error) {
      console.warn("ProcessListData - init: " + error);
    }

    return listData;
  }

  isExist() {
    return (this.ProcessList.length > 0) ? true : false;
  }
};

export default ProcessListData;