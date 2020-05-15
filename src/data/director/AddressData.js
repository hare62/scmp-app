/**
 * 工人通讯录
 */
class AddressData {
  constructor() {
    this.USER_NM = '';
    this.USER_ID = '';
  }

  static init(jsonData) {
    if (!jsonData) throw new Error("AddressData - init: jsonData is null");
    let data = new AddressData();
    try {
      // 更改后端真实接口参数
      let { USER_NM,
            USER_ID } = jsonData;

      data.USER_NM = USER_NM;
      data.USER_ID = USER_ID;
    }
    catch (error) {
      console.error("AddressData - init: " + error);
    }

    return data;
  }

  isExist() {
    let isExist = true;

    isExist = isExist && !!this.USER_NM;
    isExist = isExist && !!this.USER_ID;

    return isExist;
  }
};

export default AddressData;