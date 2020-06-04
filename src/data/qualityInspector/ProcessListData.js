/**
 * ID主键 qltInspectionId
工序Id technologyId;
检验项编码 inspectionCode;
检验项名称 inspectionName;
标准值 standardValue;
正向容差 positiveTolerance;
负向容差 negativeTolerance;
零件号 partNo;
实际值 actualValue;
检验结论 qltConclusion;
检验结论名称 qltConclusionValue;

 * 工艺工序信息
 * 有无零件号都是显示这些信息
 * 步骤step
 * 工艺工序名称name
 * 工艺工序状态status
 * 工艺工序时间(是报工时间)time
 * 工艺工序数量(零件号的数量===报工数量)number
 * 零件号信息 partNumber
 * 标识是否有提交按钮 isSubmit :保存页面 ？ 详情页面
 * 工艺工序唯一标识===质检ID proInspectionId
 * 标准项接口需要的以下字段:
 * technologyId零件号ID
 * partNumber===partNo零件号信息
 * proInspectionId===质检ID
 * qualifiedQty无零件号质检结果
 * shareQty无零件号待审批质检结果
 * scrapProcessItem报废类型
 * responsiblePartyItem责任方类型
 */

class TechnologyProcessData {
  constructor(){
    this.step = '';
    this.name = '';
    this.status = '';
    this.time = '';
    this.number = '';
    this.equipment = '';
    this.partNumber = '';
    this.isSubmit = '';
    this.proInspectionId = '';
    this.technologyId = '';
    this.qualifiedQty = '';
    this.shareQty = '';
    this.scrapProcessItem = '';
    this.responsiblePartyItem = '';
  }

  static init(jsonData) {
    if(!jsonData) throw new error("data - qualityInspector - TechnologyProcessData - init :jsonData is null");
    
    let data = new TechnologyProcessData();
    
    try{
      let {
        tecStep,
        proSheetTecName,
        matStatus,
        time,
        matQty,
        equipmentName,
        qltPartNoResults,
        isSubmit,
        proInspectionId,
        technologyId,
        qualifiedQty,
        shareQty,
        scrapProcessItem,
        responsiblePartyItem }  = jsonData;

      data.step = tecStep;
      data.name = proSheetTecName;
      data.status = matStatus;
      data.time = time;
      data.number = matQty;
      data.equipment = equipmentName;
      data.partNumber = qltPartNoResults;
      data.isSubmit = isSubmit;
      data.proInspectionId = proInspectionId;
      data.technologyId = technologyId;
      data.qualifiedQty = qualifiedQty;
      data.shareQty = shareQty;
      data.scrapProcessItem = scrapProcessItem;
      data.responsiblePartyItem = responsiblePartyItem;
    }catch(error){
      console.warn("data - qualityInspector - TechnologyProcessData - init" + error)
    }

    return data;
  }

  isExit() {
    let isExit = true;

    isExit = isExit && !!this.step;
    isExit = isExit && !!this.status;
    isExit = isExit && !!this.name;
    isExit = isExit && !!this.time;
    isExit = isExit && !!this.number;

    return isExit;
  }
}

class ProcessListData {
  constructor(){
    this.processList =[];
  }

  static init(jsonData){
    if(!jsonData) throw new error("data - qualityInspector - ProcessListData - init :jsonData is null");
    let listData = new ProcessListData();

    try{
      jsonData.map((item)=>{
        let processData = TechnologyProcessData.init(item);
        listData.processList.push(processData);
      })
    }catch(error){
      console.warn("data - qualityInspector - ProcessListData - init " + error);
    }

    console.log("oo",listData)
    return listData;
  }

  isExit() {
    return (this.processList.length > 0) ? true : false;
  }
}

export default ProcessListData;