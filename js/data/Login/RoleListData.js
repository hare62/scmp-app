import RoleData from './RoleData';
class RoleListData {
  constructor(){
    this.roleList = "";
  }

  static init(jsonData) {
    if(!jsonData) throw new Error("RoleListData -- init :jsonData is null");
    
    let ListData = new RoleListData();
    try{
        ListData.map((item)=>{
          let data = RoleData.init(item);
          ListData.roleList.push(data);
        })
 
    }catch(error){
      console.warn("RoleListData -- init" + error);
    }

    return ListData;
  }

  isExist() {
    return (this.roleList.length) > 0 ? true : false;
  }

}

export default RoleListData; 