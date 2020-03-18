import { is } from "@babel/types";

/**
 * 工艺工序信息
 */

class MechanicalMessageData {
  constructor(){
    this.mechanicalName = '';
    this.conclusion = '';
    this.status = '';
  }

  static init(jsonData) {
    if(!jsonData) throw new error("data - qualityInspector - TechnologyProcessData - init :jsonData is null");
    
    let data = new MechanicalMessageData();
    
    try{
      let {
        mechanicalName,
        conclusion,
        status,
      }  = jsonData;

      data.mechanicalName = mechanicalName;
      data.conclusion = conclusion;
      data.status = status;
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