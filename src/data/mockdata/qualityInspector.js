export const mockQualityInspectorSheetListData = [
  {
    sheetListid: 'RT-US-89-LA',
    sheetListstatus: 'Finish',
    materialsName: '六角螺母',
    materialsNumber: '3',
    sheetListFinishTime: '2020-03-04',
    worker: '张三',
    isMatPart: '01'
  },
  {
    sheetListid: 'RT-US-89-LBRT-US-89-LBRT-US-89-LBRT-US-89-LB',
    sheetListstatus: 'Finish',
    materialsName: '六角螺母六角螺母六角螺母六角螺母六角螺母六角螺母六角螺母',
    materialsNumber: '3',
    sheetListFinishTime: '2020-03-04',
    worker: '李松',
    isMatPart: '02'
  },
  {
    sheetListid: 'RT-US-89-LC',
    sheetListstatus: 'InProgress',
    materialsName: '六角螺母',
    materialsNumber: '3',
    sheetListFinishTime: '2020-03-04',
    worker: '王麻子',
    isMatPart: '01'
  },
]

export const mockFinishData = [
  {
    sheetListid: 'RT-US-89-PA-RT-US-89-PA-RT-US-89-PA-RT-US-89-PA-PA-RT-US-89-PA-RT-US-89-PA',
    sheetListstatus: 'Finish',
    materialsName: '六角六角六角六角六角六角六角六角六角六角六角六角六角六角六角六角六角六角六角六角六角六角六角六角',
    materialsNumber: '5',
    sheetListFinishTime: '2020-03-04'
  },
  {
    sheetListid: 'RT-US-89-PB',
    sheetListstatus: 'Finish',
    materialsName: '螺母螺母螺母',
    materialsNumber: '2',
    sheetListFinishTime: '2020-03-04'
  },
  {
    sheetListid: 'RT-US-89-PC',
    sheetListstatus: 'Finish',
    materialsName: '螺丝',
    materialsNumber: '3',
    sheetListFinishTime: '2020-03-04'
  },
]

/**
//工艺工序状态状态
export const processStatusEnum = {
  Finish: "03",//工艺工序报工完成03
  InProgress: "01",//工艺工序01
  Todo: "02",//未报工02
};
};
 */
export const mockTechnonigyProcessData =  [
  {
    step: '1',
    name: '粗加工',
    status: '01',
    time: '2020-02-06',
    number: 3,
    equipment: '螺丝刀',
    isSubmit: true,
    proInspectionId:1
  },
  {
    proInspectionId:2,
    step: '2',
    name: '热处理',
    status: '02',
    time: '2020-02-06',
    number: 3,
    equipment: '螺丝钉',
    qltPartNoResults: [
      {
        mechanicalName: '零件号1',
        status: 'Finish',
        conclusion: 0,
        realNumber: '2'
      },
      {
        mechanicalName: '零件号2',
        status: 'InProgress',
        conclusion: 1,
        realNumber: '3'
      },
      {
        mechanicalName: '零件号3',
        status: 'InProgress',
        conclusion: 2,
        realNumber: '4'
      },
    ],
    isSubmit: false
  },
  {
    proInspectionId:3,
    step: '3',
    name: '冷却',
    status: '03',
    time: '2020-02-06',
    number: 3,
    equipment: '螺丝',
    isSubmit: false,
    qltPartNoResults: [
      {
        mechanicalName: '零件号1',
        status: 'Finish',
        conclusion: 0,
        realNumber: '2'
      },
      {
        mechanicalName: '零件号2',
        status: 'InProgress',
        conclusion: 1,
        realNumber: '3'
      },
      {
        mechanicalName: '零件号3',
        status: 'InProgress',
        conclusion: 2,
        realNumber: '4'
      },
    ],
  },
]

export const mockMechanicalMessageData =[
  {
    mechanicalName: '零件号1',
    status: 'Finish',
    conclusion: 0,
    realNumber: '2'
  },
  {
    mechanicalName: '零件号2',
    status: 'InProgress',
    conclusion: 1,
    realNumber: '3'
  },
  {
    mechanicalName: '零件号3',
    status: 'InProgress',
    conclusion: 2,
    realNumber: '4'
  },
]
export const StandardItemofNoMechanical = [
  {
    inspectionName: "长",
    standardValue: 10,
    positiveTolerance: 0.01,
    negativeTolerance: 0.03
  },
  {
    inspectionName: "宽",
    standardValue: 10,
    positiveTolerance: 0.01,
    negativeTolerance: 0.03
  },
  {
    inspectionName: "高",
    standardValue: 10,
    positiveTolerance: 0.01,
    negativeTolerance: 0.03
  }
]

//无零件号详情页面
export const mockNoMechanicalData = {
  qualified: '4',
  fit: '1',
  industrialWaste: '0',
  materialWaste: '2'
}