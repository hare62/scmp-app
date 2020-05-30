export const mockQualityInspectorSheetListData = [
  {
    sheetCode: '无零件新增RT-US-89-LA',
    sheetId:"01",
    sheetListstatus: 'Finish',
    matName: '六角螺母',
    materialsNumber: '3', 
    completeDate: '2020-03-04',
    worker: '张三',
    isMatPart: '02'
  },
  {
    sheetCode: '无零件修改RT-US-89-LBRT-US-89-LBRT-US-89-LBRT-US-89-LB',
    sheetId:"02",
    sheetListstatus: 'Finish',
    matName: '六角螺母六角螺母六角螺母六角螺母六角螺母六角螺母六角螺母',
    materialsNumber: '3',
    completeDate: '2020-03-04',
    worker: '李松',
    isMatPart: '02' 
  },
  {
    sheetCode: '无零件详情RT-US-89-LC',
    sheetId:"03",
    sheetListstatus: 'InProgress',
    matName: '六角螺母',
    materialsNumber: '3',
    completeDate: '2020-03-04',
    worker: '王麻子',
    isMatPart: '02'
  },
  {
    sheetCode: '有零件号新增RT-US-89-LD-有零件号',
    sheetId:"04",
    sheetListstatus: 'Finish',
    matName: '六角螺母',
    materialsNumber: '3', 
    completeDate: '2020-03-04',
    worker: '张三',
    isMatPart: '01'
  },
  {
    sheetCode: '有零件号修改RT-US-89-LBRT-有零件号US-89-LBRT-US-89-LBRT-US-89-LB',
    sheetId:"05",
    sheetListstatus: 'Finish',
    matName: '六角螺母六角螺母六角螺母六角螺母六角螺母六角螺母六角螺母',
    materialsNumber: '3',
    completeDate: '2020-03-04',
    worker: '李松',
    isMatPart: '01' 
  },
  {
    sheetCode: '有零件号详情RT-US-有零件号89-LC',
    sheetId:"05",
    sheetListstatus: 'InProgress',
    matName: '六角螺母',
    materialsNumber: '3',
    completeDate: '2020-03-04',
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
export const mockTechnonigyProcessData = [
  {
    tecStep: '1',
    name: '无零件新增粗加工',
    status: '01',
    time: '2020-02-06',
    matQty: 3,
    equipment: '螺丝刀',
    isSubmit: true,
    proInspectionId: 1
  },
  {
    isSubmit: true,
    qualifiedQty:"1",
    proInspectionId: 2,
    tecStep: '2',
    name: '无零件修改热处理',
    status: '02',
    time: '2020-02-06',
    matQty: 3,
    equipment: '螺丝钉',
  },
  {
    isSubmit: false,
    qualifiedQty:"1",
    proInspectionId: 3,
    tecStep: '3',
    name: '无零件详情冷却',
    status: '03',
    time: '2020-02-06',
    matQty: 3,
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
  {
    tecStep: '4',
    name: '有零件号新增粗加工',
    status: '01',
    time: '2020-02-06',
    matQty: 3,
    equipment: '螺丝刀',
    isSubmit: true,
    proInspectionId: 1,

  },
  {
    tecStep: '5',
    name: '有零件号修改粗加工',
    status: '01',
    time: '2020-02-06',
    matQty: 3,
    equipment: '螺丝刀',
    isSubmit: true,
    proInspectionId: 1,
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
  {
    tecStep: '6',
    name: '有零件号详情粗加工',
    status: '01',
    time: '2020-02-06',
    matQty: 3,
    equipment: '螺丝刀',
    isSubmit: false,
    proInspectionId: 1,
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

export const mockMechanicalMessageData = [
  {
    mechanicalName: '零件号1',
    status: 'Finish',
    conclusion: 0,
    realNumber: '2',
    qltConclusion: "01"
  },
  {
    mechanicalName: '零件号2',
    status: 'InProgress',
    conclusion: 1,
    realNumber: '3',
    qltConclusion: "02"
  },
  // {
  //   mechanicalName: '零件号3',
  //   status: 'InProgress',
  //   conclusion: 2,
  //   realNumber: '4',
  //   qltConclusion: "02"
  // },
  // {
  //   mechanicalName: '零件号3',
  //   status: 'InProgress',
  //   conclusion: 2,
  //   realNumber: '4',
  //   qltConclusion: "02"
  // },
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

//获取报废工艺列表
export const mockScrapProcessList = [
  {
    technologyId: "id1",
    technologyName: "报废名称1"
  },
  {
    technologyId: "id2",
    technologyName: "报废名称2"
  },
  {
    technologyId: "id3",
    technologyName: "报废名称3"
  },
  {
    technologyId: "id4",
    technologyName: "报废名称4"
  },
  {
    technologyId: "id5",
    technologyName: "报废名称5"
  },
  {
    technologyId: "id6",
    technologyName: "报废名称6"
  },
  {
    technologyId: "id7",
    technologyName: "报废名称7"
  },
  {
    technologyId: "id8",
    technologyName: "报废名称8"
  },
  {
    technologyId: "id9",
    technologyName: "报废名称9"
  },
  {
    technologyId: "id10",
    technologyName: "报废名称10"
  },
  {
    technologyId: "id11",
    technologyName: "报废名称11"
  },
  {
    technologyId: "id12",
    technologyName: "报废名称12"
  },
]

//获取工厂数据
export const mockFactoryList = [
  {
    name:"姓名1",
    userId: "id1",
    responsiblePartyType: "01"
  },
  {
    name:"姓名2",
    userId: "id2",
    responsiblePartyType: "02"
  },
  {
    name:"姓名1",
    userId: "id1",
    responsiblePartyType: "01"
  },
  {
    name:"姓名2",
    userId: "id2",
    responsiblePartyType: "02"
  },
  {
    name:"姓名1",
    userId: "id1",
    responsiblePartyType: "01"
  },
  {
    name:"姓名2",
    userId: "id2",
    responsiblePartyType: "02"
  },
  {
    name:"姓名1",
    userId: "id1",
    responsiblePartyType: "01"
  },
  {
    name:"姓名2",
    userId: "id2",
    responsiblePartyType: "02"
  },
  {
    name:"姓名1",
    userId: "id1",
    responsiblePartyType: "01"
  },
  {
    name:"姓名2",
    userId: "id2",
    responsiblePartyType: "02"
  },
  {
    name:"姓名1",
    userId: "id1",
    responsiblePartyType: "01"
  },
  {
    name:"姓名2",
    userId: "id2",
    responsiblePartyType: "02"
  },
  {
    name:"姓名1",
    userId: "id1",
    responsiblePartyType: "01"
  },
  {
    name:"姓名2",
    userId: "id2",
    responsiblePartyType: "02"
  },
  {
    name:"姓名1",
    userId: "id1",
    responsiblePartyType: "01"
  },
  {
    name:"姓名2",
    userId: "id2",
    responsiblePartyType: "02"
  },
]

//获取供应商数据
export const mockSupplierList = [
  {
    name:"供应商1",
    userId: "id1",
    responsiblePartyType: "01"
  },
  {
    name:"供应商2",
    userId: "id2",
    responsiblePartyType: "02"
  },
]

//获取班组数据
export const mockMonitorList = [
  {
    name:"班组1",
    userId: "id1",
    responsiblePartyType: "01"
  },
  {
    name:"班组2",
    userId: "id2",
    responsiblePartyType: "02"
  },
]
