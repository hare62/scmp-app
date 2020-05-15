import { RoleTypeEnum } from '../../page/login/Constants';

import RoleData from './RoleData';
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