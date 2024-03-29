/**工人-工艺工序-数据
 * sheetTechnologyId                       <!-- 派工单子表Id -->
 * equipmentId                             <!-- 设备Id-->
 * sheetId                                 <!-- 派工单Id-->
 * technologyId                            <!-- 工艺工序Id-->
 * equipmentCode                           <!-- 设备编码-->
 * equipmentName                           <!-- 设备名称-->
 * price                                   <!-- 加工价格-->
 * actualWorkTime                          <!-- 实际加工时间-->
 * qualifiedQty                            <!-- 合格数-->
 * shareQty                                <!-- 合用数-->
 * industrialWasteQty                      <!-- 工废-->
 * matWasteQty                             <!-- 料废-->
 * deserved                                <!-- 应得-->
 * deductible                              <!-- 应扣-->
 * actuallyGet                             <!-- 实得-->
 * hisDuration                             <!-- 历史加工时长-->
 * reward                                  <!-- 奖励-->
 * testUser                                <!-- 检验员-->
 * technologyCode                          <!-- 工艺编号-->
 * technologyName                          <!-- 工艺名称-->
 * tecStep                                 <!-- 步骤-->
 * taskTime                                <!-- 加工日期-->
 * workshop                                <!-- 车间-->
 * processPath                             <!-- 加工路径-->
 * sheetStatusName                         <!-- 工艺工序状态-->
 * completeQty                             <!-- 实际报工数-->
 * sheetStatusCode                         <!-- 工艺工序状态编码-->
 * matQty                                  <!-- 物料名称 -->
 * reworkQty;                              <!--  返工数 --> 
 * rebuildQty;                             <!--  返修数 -->  
 * concessionQty;                          <!--  让步接收数 --> 
 * restructuringQty;                       <!--  改制数 -->  
 */                     

class ProcessData {
  constructor() {
    this.sheetTechnologyId = '';
    this.tecStep = '';
    this.name = '';
    this.status = '';
    this.time = '';
    this.number = '';
    this.path = '';
    this.equipmentId = "";
    this.sheetId = "";
    this.technologyId = "";
    this.equipmentCode = "";
    this.equipmentName = "";
    this.price = "";
    this.actualWorkTime = "";
    this.qualifiedQty = "";
    this.shareQty = "";
    this.industrialWasteQty = "";
    this.matWasteQty = "";
    this.deserved = "";
    this.deductible = "";
    this.actuallyGet = "";
    this.hisDuration = "";
    this.reward = "";
    this.testUser = "";
    this.technologyCode = "";
    this.technologyName = "";
    this.tecStep = "";
    this.taskTime = "";
    this.workshop = "";
    this.processPath = "";
    this.sheetStatusName = "";
    this.completeQty = 0;
    this.sheetStatusCode = '';
    this.matQty = '';
    this.reworkQty = '';
    this.rebuildQty = '';
    this.concessionQty = '';
    this.restructuringQty = '';
  }

  static init(jsonData) {
    if (!jsonData) throw new Error("ProcessData - init: jsonData is null");
    let data = new ProcessData();
    try {
      let {
        sheetTechnologyId,
        equipmentId,
        sheetId,
        technologyId,
        equipmentCode,
        equipmentName,
        price,
        actualWorkTime,
        qualifiedQty,
        shareQty,
        industrialWasteQty,
        matWasteQty,
        deserved,
        deductible,
        actuallyGet,
        hisDuration,
        reward,
        testUser,
        technologyCode,
        technologyName,
        tecStep,
        taskTime,
        workshop,
        processPath,
        processStatus,
        sheetStatusName,
        completeQty,
        sheetStatusCode,
        matQty,
        reworkQty,
        rebuildQty,
        concessionQty,
        restructuringQty } = jsonData;
      
      data.sheetTechnologyId = sheetTechnologyId;
      data.equipmentId = equipmentId;
      data.sheetId = sheetId;
      data.technologyId = technologyId; 
      data.equipmentCode = equipmentCode;
      data.equipmentName = equipmentName;
      data.price = price;
      data.actualWorkTime = actualWorkTime;
      data.qualifiedQty = qualifiedQty;
      data.shareQty = shareQty;
      data.industrialWasteQty = industrialWasteQty;
      data.matWasteQty = matWasteQty;
      data.deserved = deserved;
      data.deductible = deductible;
      data.actuallyGet = actuallyGet;
      data.hisDuration = hisDuration;
      data.reward = reward;
      data.testUser = testUser;
      data.technologyCode = technologyCode;
      data.technologyName = technologyName;
      data.tecStep = tecStep;
      data.taskTime = taskTime;
      data.workshop = workshop;
      data.processPath = processPath;
      data.processStatus = processStatus;
      data.sheetStatusName = sheetStatusName;
      data.completeQty = completeQty;
      data.sheetStatusCode = sheetStatusCode;
      data.matQty = matQty;
      data.reworkQty = reworkQty;
      data.rebuildQty = rebuildQty;
      data.concessionQty = concessionQty;
      data.restructuringQty = restructuringQty;
    }
    catch (error) {
      console.error("ProcessData - init: " + error);
    }

    return data;
  }

  isExist() {
    let isExist = true;

    isExist = isExist && !!this.sheetTechnologyId;
    isExist = isExist && !!this.sheetStatusName;

    return isExist;
  }
};

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