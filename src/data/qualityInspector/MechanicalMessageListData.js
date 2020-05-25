/**
 * 零件号信息
 * 前端传给后端的信息
 * 零件号mechanicalName
 * 质检结论(合格合用工废料废)以什么样的形式传给后端呢？01.02conclusion
 * 状态status
 * 返回结果：
质检明细Id：qltSheetId;
零件号：partNo;
文件：partFiles;
质检状态名称：qltConclusionValue;
质检状态：qltConclusion;
质检单Id：qltInspectionId;
 * 
 */

class MechanicalMessageData {
  constructor(){
    this.mechanicalName = '';
    this.conclusion = '';
    this.status = '';
    this.realNumber = '';
    this.qltSheetId = '';
    this.partNo = '';
    this.partFiles = '';
    this.qltConclusionValue = '';
    this.qltConclusion = '';
    this.qltInspectionId = '';
  }

  static init(jsonData) {
    if(!jsonData) throw new error("data - qualityInspector - TechnologyProcessData - init :jsonData is null");
    
    let data = new MechanicalMessageData();
    
    try{
      let {
        mechanicalName,
        conclusion,
        status,
        realNumber,
        qltSheetId,
        partNo,
        partFiles,
        qltConclusionValue,
        qltConclusion,
        qltInspectionId
      }  = jsonData;

      data.mechanicalName = mechanicalName;
      data.conclusion = conclusion;
      data.status = status;
      data.realNumber = realNumber;
      data.qltSheetId = qltSheetId;
      data.partNo = partNo;
      data.partFiles = partFiles;
      data.qltConclusionValue = qltConclusionValue;
      data.qltConclusion = qltConclusion;
      data.qltInspectionId = qltInspectionId;
    }catch(error){
      console.warn("data - qualityInspector - TechnologyProcessData - init" + error)
    }

    return data;
  }

  isExit() {
    let isExit = true;

    isExit = isExit && !!this.mechanicalName;
    isExit = isExit && !!this.conclusion;
    isExit = isExit && !!this.status;

    return isExit;
  }
}

class MechanicalMessageListData {
  constructor(){
    this.processList =[];
  }

  static init(jsonData){
    if(!jsonData) throw new error("data - qualityInspector - MechanicalMessageListData - init :jsonData is null");
    let listData = new MechanicalMessageListData();

    try{
      jsonData.map((item)=>{
        let processData = MechanicalMessageData.init(item);
        listData.processList.push(processData);
      })
    }catch(error){
      console.warn("data - qualityInspector - MechanicalMessageListData - init " + error)
    }

    return listData;
  }

  isExit() {
    return (this.processList.length > 0) ? true : false;
  }
}

export default MechanicalMessageListData;