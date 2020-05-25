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

/**
 * 派工单列表数据
 */
 class AddressListData {
  constructor() {
    this.addressList = [];
  }

  static init(jsonData) {
    if (!jsonData) throw new Error("AddressListData - init: jsonData is null");

    let listData = new AddressListData();
    try {
        jsonData.map((item) => {
        let addressData = AddressData.init(item);
        listData.addressList.push(addressData);
      });
    }
    catch(error) {
      console.warn("AddressListData - init: catch " + error);
    }

    return listData;
  }

  isExist() {
    return (this.addressList.length > 0) ? true : false;
  }
 };

 export default AddressListData;