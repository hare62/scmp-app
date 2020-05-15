import AddressData from './AddressData';

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