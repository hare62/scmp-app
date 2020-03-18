/**
 * 工艺工序信息
 */

class TechnologyProcessData {
  constructor(){
    this.step = '';
    this.name = '';
    this.status = '';
    this.time = '';
    this.number = '';
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
        number
      }  = jsonData;

      data.step = step;
      data.name = name;
      data.status = status;
      data.time = time;
      data.number = number;
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