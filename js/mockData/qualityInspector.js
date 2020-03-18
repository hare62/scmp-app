export const mockQualityInspectorSheetListData = {
  data: [
    {
      sheetListid: 'RT-US-89-LA',
      sheetListstatus: 'Finish',
      materialsName: '六角螺母',
      materialsNumber: '3',
      sheetListFinishTime: '2020-03-04'
    },
    {
      sheetListid: 'RT-US-89-LB',
      sheetListstatus: 'UnFinish',
      materialsName: '六角螺母',
      materialsNumber: '3',
      sheetListFinishTime: '2020-03-04'
    },
    {
      sheetListid: 'RT-US-89-LC',
      sheetListstatus: 'InProgress',
      materialsName: '六角螺母',
      materialsNumber: '3',
      sheetListFinishTime: '2020-03-04'
    },
  ]
}

export const mockFinishData = {
  data: [
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
}

export const mockTechnonigyProcessData = {
  data: [
    {
      step: '1',
      name: '粗加工',
      status: 'Finish',
      time:'2020-02-06',
      number:3
    },
    {
      step: '2',
      name: '热处理',
      status: 'InProgress',
      time:'2020-02-06',
      number:3
    },
    {
      step: '3',
      name: '冷却',
      status: 'InProgress',
      time:'2020-02-06',
      number:3
    },
  ]
};

export const mockMechanicalMessageData = {
  data: [
    {
      mechanicalName: '零件号1',
      status: 'Finish',
      conclusion:'合格'
    },
    {
      mechanicalName: '零件号2',
      status: 'InProgress',
      conclusion:'合用'
    },
    {
      mechanicalName: '零件号3',
      status: 'InProgress',
      conclusion:'工废'
    },
  ]
}