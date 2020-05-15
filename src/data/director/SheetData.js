/**
 * 工人派工单数据
 * sheetCode,       <!-- 派工单号 -->
 * matName,              <!-- 物料名称 -->
 * matQty,                <!-- 物料数量 -->
 * planDate,           < !-- 计划时间 -->
 * actualComplete,       <!-- 实际完成 -->
 * sheetStatusName            <!-- 状态 -->
 * sheetId           <!--  派工单Id -->
 *  workerName    <!-- 所属工人派工单的名字  -->
 * sheetStatus   <!-- 派工单状态 -->
 */
class SheetData {
  constructor() {
    this.sheetId = '';
    this.planDate = '';
    this.sheetCode = ''
    this.matName = ''; 
    this.matQty = '';
    this.sheetStatusName = '';
    this.workerName = '';
    this.sheetStatus = '';
    this.actualComplete = 0;
  }

  static init(jsonData) {
    if (!jsonData) throw new Error("SheetData - init: jsonData is null");
    let data = new SheetData();
    try {
      // 更改后端真实接口参数
      let { sheetCode,
            planDate,
            sheetId,
            matName,
            matQty,
            sheetStatusName,
            actualComplete,
            makeUser,
            sheetStatus     } = jsonData;

      data.sheetId = sheetId;
      data.sheetCode = sheetCode;
      data.planDate = planDate;
      data.matName = matName;
      data.matQty = matQty;
      data.sheetStatusName = sheetStatusName;
      data.workerName = makeUser;
      data.sheetStatus = sheetStatus;
      data.actualComplete = actualComplete;
    }
    catch (error) {
      console.error("SheetData - init: " + error);
    }

    return data;
  }

  isExist() {
    let isExist = true;

    isExist = isExist && !!this.sheetId;
    isExist = isExist && !!this.sheetCode;
    isExist = isExist && !!this.workerName;

    return isExist;
  }
};

export default SheetData;