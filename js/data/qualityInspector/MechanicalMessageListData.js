import MechanicalMessageData from './MechanicalMessageData';

class MechanicalMessageListData {
  constructor(){
    this.processList =[];
  }

  static init(jsonData){
    if(!jsonData) throw new error("data - qualityInspector - MechanicalMessageListData - init :jsonData is null");
    let listData = new MechanicalMessageListData();

    try{
      let { data } = jsonData;
      data.map((item)=>{
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