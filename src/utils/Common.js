/**
 * 公共方法
 */
import React from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { fitSize } from './Fit';

//派工单状态  质检中，已完成，未领料 加工中 已入库
export const StatusEnum = {
  Finish: "02",//质检完成02
  Warehousing: "03",//质检中03
  InProgress: "01",//质检中01
  Undo: "04",//04 未报工
  Working: "00",//00加工中
};

//完成ICON
export const FinishIcon = () => {
  return (
    <EvilIcons
      name={'check'}
      size={fitSize(70)}
      style={{ color: '#376CDA' }}
    />
  )
}

//进行中ICON
export const inProgress = () => {
  return (
    <EvilIcons
      name={'spinner-3'}
      size={fitSize(70)}
      style={{ color: '#376CDA', height: 80 }}
    />
  )
}

//未做Todo
export const Todo = () => {
  return (
    <MaterialCommunityIcons
      name={'progress-wrench'}
      size={fitSize(55)}
      style={{ color: '#376CDA', height: 80, lineHeight: 75 }}
    />
  )
}

//无法识别的
export const notFound = () => {
  return (
    <EvilIcons
      name={'exclamation'}
      size={fitSize(70)}
      style={{ color: '#376CDA', height: 80 }}
    />
  )
}

/**
 * 返回当前状态的方法
 * @param {派工单状态} sheetListstatus 
 */
export const sheetListStatusView = (sheetListstatus) => {
  switch (sheetListstatus) {
    case StatusEnum.Finish:
      return FinishIcon();
    case StatusEnum.Warehousing:
      return FinishIcon();
    case StatusEnum.Undo:
      return Todo();
    case StatusEnum.Working:
      return inProgress();
    case StatusEnum.InProgress:
      return inProgress();
    default:
      return null;
  }
};

/**
 * 工艺工序状态状态
 */
export const processStatusEnum = {
  Finish: "03",//工艺工序报工完成03
  InProgress: "01",//工艺工序报工中01
  Todo: "02",//工艺工序未报工02
};

/**
 * 返回当前状态的方法
 * @param {工艺工序状态} sheetListstatus 
 */
export const processStatusView = (sheetListstatus) => {
  switch (sheetListstatus) {
    case processStatusEnum.Finish:
      return FinishIcon();
    case processStatusEnum.InProgress:
      return inProgress();
    case processStatusEnum.Todo:
      return Todo();
    default:
      return null;
  }
};

/**
 * 质检工艺工序状态
 */
export const qualityStatusEnum = {
  Finish: "02",//工艺工序质检完成03
  InProgress: "01",//工艺工序质检中01
  Todo: "00",//工艺工序待质检02
  Approval: "04",//审批中
  Undo: "03",//03未提交
};

/**
 * 返回当前状态的方法
 * @param {质检工艺工序状态} sheetListstatus 
 */
export const qualityStatusView = (sheetListstatus) => {
  switch (sheetListstatus) {
    case qualityStatusEnum.Finish:
      return FinishIcon();
    case qualityStatusEnum.InProgress:
      return inProgress();
    case qualityStatusEnum.Todo:
      return Todo();
    case qualityStatusEnum.Approval:
      return FinishIcon();
    case qualityStatusEnum.Undo:
      return FinishIcon();
    default:
      return notFound();
  }
};


//质检零件号状态
/**
“01”：合格，
“02”：待审批，
“03”:工废，
“04”:料废，
“05”：返修，
“06”:返工，
“07”：让步接收，
“08”：改制
 */
export const mechanicalEnum = {
  Finish: "01",//质检合格
  InProgress: "02"//质检待审批
};

//质检零件号状态
export const mechanicalStatus = (status) => {
  switch (status) {
    case mechanicalEnum.Finish:
      return FinishIcon();
    case mechanicalEnum.InProgress:
      return Todo();
    default:
      return null;
  }
};

//派工单质检状态===默认派工单
const defaultQualityEnum = {
  InProgress: "01",//质检中
  Finish: "02",//质检已完成
  Todo: "00",//待质检
};

// 派工单质检状态===默认派工单
export const defaultQualityStatus = (status) => {
  switch (status) {
    case defaultQualityEnum.Finish:
      return FinishIcon();
    case defaultQualityEnum.InProgress:
      return inProgress();
    case defaultQualityEnum.Todo:
      return Todo();
    default:
      return notFound();
  }
};

/**
 * 创建一个颜色 HEX 值数组，然后随机抽取这个数组里6个值，组合生成颜色。
 */
export const getColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

