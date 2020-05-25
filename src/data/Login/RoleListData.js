/**
 * 角色标识 "ROLE_ID": "447339ebf48b45ccb75a5a1256c02b96",
 * 资源标识"RES_ID": "7c3a06fd908c405bad8b57a40c77192b",
 * 资源中文名称"DISPLAY_NM": "工人页面",
 * 跳转路径"PAGE_LINK": "WorkerPage",
 * 资源英文标识"RES_NM": "Worker"
 */
import { RoleTypeEnum } from '../../page/login/Constants';

class RoleData {
  constructor() {
    this.ROLE_ID = "";
    this.DISPLAY_NM = "";
    this.DISPLAY_NM = "";
    this.PAGE_LINK = "";
    this.RES_NM = "";
    this.RES_ID ="";
  }

  static init(jsonData) {
    if (!jsonData) throw new Error("RoleData - init:jsonData is null");

    let data = new RoleData();
    try{
      let { ROLE_ID,
            DISPLAY_NM, 
            PAGE_LINK, 
            RES_NM, 
            RES_ID } = jsonData;
            
      data.ROLE_ID = ROLE_ID;
      data.DISPLAY_NM = DISPLAY_NM;
      data.DISPLAY_NM = DISPLAY_NM;
      data.PAGE_LINK = PAGE_LINK;
      data.RES_NM = RES_NM;
      data.RES_ID = RES_ID;
  
    }catch(error){
      console.warn("RoleData -init:" + error);
    }
   
    return data;
  }

  isExist() {
    let isExist = true;

    isExist = isExist && !!this.PAGE_LINK;

    return isExist;
  }
}

class RoleListData {
  constructor() {
    this.roleList = [];
  }

  static init(jsonData) {
    if (!jsonData) throw new Error("RoleListData -- init :jsonData is null");

    let ListData = new RoleListData();
    try {
      jsonData.map((item) => {
        let roleData = RoleData.init(item);
        ListData.roleList.push(roleData);
      })

    } catch (error) {
      console.warn("RoleListData -- init" + error);
    }

    return ListData;
  }

  getRoleType(PAGE_LINK) {
    switch (PAGE_LINK) {
      case RoleTypeEnum.QualityInspection:
        return RoleTypeEnum.QualityInspection;
      case RoleTypeEnum.Director:
        return RoleTypeEnum.Director;
      case RoleTypeEnum.Worker:
        return RoleTypeEnum.Worker;
      default:
        return null;
    }
  }

  isExist() {
    return (this.roleList.length) > 0 ? true : false;
  }
}

export default RoleListData; 