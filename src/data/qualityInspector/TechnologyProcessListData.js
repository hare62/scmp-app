import TechnologyProcessData from './TechnologyProcessData';

class TechnologyProcessListData {
  constructor(){
    this.processList =[];
  }

  static init(jsonData){
    if(!jsonData) throw new error("data - qualityInspector - TechnologyProcessListData - init :jsonData is null");
    let listData = new TechnologyProcessListData();

    try{
      let { data } = jsonData;
      data.map((item)=>{
        let processData = TechnologyProcessData.init(item);
        listData.processList.push(processData);
      })
    }catch(error){
      console.warn("data - qualityInspector - TechnologyProcessListData - init " + error)
    }

    return listData;
  }

  isExit() {
    return (this.processList.length > 0) ? true : false;
  }
}

export default TechnologyProcessListData;