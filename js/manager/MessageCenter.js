import { 
  isFunction,
  isNumber
} from '../utils/Util';

/**
 * 消息模型
 */
class MessageModel {
  constructor() {
    this.msgType = -1;
    this.callback = null; 
    this.owner = null;
  }

  set(msgType, owner, callback) {
    if (!isNumber(msgType)) console.error("MessageModel - set : msgType is not number");
    if (!isFunction(callback)) console.error("MessageModel - set : callback is not function");

    this.msgType = msgType;
    this.owner = owner;
    this.callback = callback;
  }

  callFunc(params) {
    this.callback.call(this.owner, ...params);
  }
}

/**
 * 消息中心
 */
class MessageCenter {
  /**
   * 构造函数
   */
  constructor() {
    // 消息列表
    this.messageList = [];
  }

  /**
   * 获取单例
   */
  static getInstance() {
    if (!MessageCenter.instance) {
      MessageCenter.instance = new MessageCenter();
    }

    return MessageCenter.instance;
  }

  /**
   * 通知消息
   */
  notice(msgType, ...params) {
    if (!isNumber(msgType)) console.error("MessageCenter - notice : msgType is not number");

    for(i = 0; i < this.messageList.length; ++i) {
      let msgModel = this.messageList[i];
      if (msgModel.msgType === msgType) {
        msgModel.callFunc(params);
      }
    }
  }

  /**
   * 注册消息
   */
  registerMessage(msgType, owner, callback) {
    let msgModel = new MessageModel();
    msgModel.set(msgType, owner, callback);
    this.messageList.push(msgModel);
  }

  /**
   * 注销消息
   */
  unregisterMessage(msgType) {
    if (!isNumber(msgType)) console.error("MessageCenter - unregisterMessage : msgType is not number");

    try{
      const index = this.messageList.indexOf(msgType);
      if (index > -1) {
        this.messageList.splice(index, 1);
      }
    }
    catch(error) {
      console.error("MessageCenter - unregisterMessage : error is " + error);
    } 
  }
};

export default MessageCenter;