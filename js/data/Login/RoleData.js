import { RoleTypeEnum } from '../../page/login/Constants';

class RoleData {
  constructor() {
    this.roleId = "";
    this.roleName = "";
  }

  static init(jsonData) {
    if (!jsonData) throw new Error("RoleData - init:jsonData is null");

    let data = new RoleData();
    try{
      let { ROLE_ID, ROLE_NM } = jsonData;
      data.roleId = ROLE_ID;
      data.roleName = ROLE_NM;
  
    }catch(error){
      console.warn("RoleData -init:" + error);
    }
   
    return data;
  }

  getRoleType() {
    // switch(roleId){
    //   case RoleTypeEnum.QualityInspection:
    //     return RoleTypeEnum.QualityInspection;
    //   case RoleTypeEnum.Director:
    //     return RoleTypeEnum.Director ;
    //   case RoleTypeEnum.Worker:
    //     return RoleTypeEnum.Worker;
    //   default :
    //    return null;
    // }
    return RoleTypeEnum.QualityInspection;
  }

  isExist() {
    let isExist = true;

    isExist = isExist && !!this.roleId;
    isExist = isExist && !!this.roleName;

    return isExist;
  }
}

export default RoleData;