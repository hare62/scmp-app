/**
 * 工艺工序信息
 * 有无零件号都是显示这些信息
 * 步骤step
 * 工艺工序名称name
 * 工艺工序状态status
 * 工艺工序时间(是报工时间)time
 * 工艺工序数量(零件号的数量)number
 * 零件号信息 partNumber
 * 标识是否有提交按钮 isSubmit
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
  }

  static init(jsonData) {
    if(!jsonData) throw new error("data - qualityInspector - MechanicalMessageData - init :jsonData is null");
    
    let data = new TechnologyProcessData();
    
    try{
      let {
        step,
        name,
        status,
        time,
        number,
        equipment,
        partNumber,
        isSubmit }  = jsonData;

      data.step = step;
      data.name = name;
      data.status = status;
      data.time = time;
      data.number = number;
      data.equipment = equipment;
      data.partNumber = partNumber;
      data.isSubmit = isSubmit;
    }catch(error){
      console.warn("data - qualityInspector - MechanicalMessageData - init" + error)
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

export default TechnologyProcessData;