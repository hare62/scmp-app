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
  Undo: "04",//04
  Working: "00",//00
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
      style={{ color: '#376CDA', height: 80,lineHeight:75 }}
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
 * 创建一个颜色 HEX 值数组，然后随机抽取这个数组里6个值，组合生成颜色。
 */
export const getColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}