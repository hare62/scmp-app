import { is } from "@babel/types";

/**
 * 零件号信息
 * 前端传给后端的信息
 * 零件号mechanicalName
 * 质检结论(合格合用工废料废)以什么样的形式传给后端呢？01.02conclusion
 * 状态status
 * 
 */

class MechanicalMessageData {
  constructor(){
    this.mechanicalName = '';
    this.conclusion = '';
    this.status = '';
    this.realNumber = '';
  }

  static init(jsonData) {
    if(!jsonData) throw new error("data - qualityInspector - TechnologyProcessData - init :jsonData is null");
    
    let data = new MechanicalMessageData();
    
    try{
      let {
        mechanicalName,
        conclusion,
        status,
        realNumber
      }  = jsonData;

      data.mechanicalName = mechanicalName;
      data.conclusion = conclusion;
      data.status = status;
      data.realNumber = realNumber;
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

export default MechanicalMessageData;