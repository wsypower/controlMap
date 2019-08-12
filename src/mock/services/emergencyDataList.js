import {builder, getBody, getQueryParameters} from '../util'
import Mock from 'mockjs'

const getEmergencyYuAnList = (options) => {
    console.log(options)
    const queryParameters = getQueryParameters(options);
    console.log(queryParameters);
    let data = [{id:'asxcdxvf1',name: 'xxxx预案方案',creator: '天田甜', reviewUserId:'', startDayTime: 1565347245,endDayTime:1565433645,statusId: '001',statusName:'待提交',isTemplate: false},
        {id:'asxcdxvf2',name: 'xxxx预案方案',creator: '天田甜',reviewUserId:'123', startDayTime: 1565347245,endDayTime:1565433645,statusId: '002',statusName:'待审核',isTemplate: false},
        {id:'asxcdxvf3',name: 'xxxx预案方案',creator: '天田甜',reviewUserId:'aaa', startDayTime: 1565347245,endDayTime:1565433645,statusId: '003',statusName:'已同意',isTemplate: true},
        {id:'asxcdxvf4',name: 'xxxx预案方案',creator: '天田甜',reviewUserId:'bbb', startDayTime: 1565347245,endDayTime:1565433645,statusId: '004',statusName:'已驳回',isTemplate: false},
        {id:'asxcdxvf5',name: 'xxxx预案方案',creator: '天田甜',reviewUserId:'ccc', startDayTime: 1565347245,endDayTime:1565433645,statusId: '005',statusName:'未开始',isTemplate: true},
        {id:'asxcdxvf6',name: 'xxxx预案方案',creator: '天田甜',reviewUserId:'ccc', startDayTime: 1565347245,endDayTime:1565433645,statusId: '006',statusName:'进行中',isTemplate: false},
        {id:'asxcdxvf7',name: 'xxxx预案方案',creator: '天田甜',reviewUserId:'ccc', startDayTime: 1565347245,endDayTime:1565433645,statusId: '007',statusName:'已结束',isTemplate: false},
        {id:'asxcdxvf8',name: 'xxxx预案方案',creator: '天田甜',reviewUserId:'ddd', startDayTime: 1565347245,endDayTime:1565433645,statusId: '008',statusName:'已逾期作废',isTemplate: true},
        {id:'asxcdxvf9',name: 'xxxx预案方案',creator: '天田甜',reviewUserId:'eee', startDayTime: 1565347245,endDayTime:1565433645,statusId: '002',statusName:'待审核',isTemplate: false},
        {id:'asxcdxvf10',name: 'xxxx预案方案',creator: '天田甜',reviewUserId:'eee', startDayTime: 1565347245,endDayTime:1565433645,statusId: '002',statusName:'待审核',isTemplate: false}];
    return builder(
        {
            code: 0,
            data: data,
            total: 14
        },
        '请求成功',
        0,
        { 'Custom-Header': Mock.mock('@id') }
    )
}
Mock.mock(/\/@test\/getEmergencyYuAnList/, 'post', getEmergencyYuAnList);

const addNewEmergencyYuAn = (options) => {
    console.log('addNewEmergencyYuAn options',options);
    const body = getBody(options);
    console.log('addNewEmergencyYuAn body',body);
    return builder(
        {
            code: 0,
            msg: '操作成功'
        },
        '请求成功',
        0,
        { 'Custom-Header': Mock.mock('@id') }
    )
}
Mock.mock(/\/@test\/addNewEmergencyYuAn/, 'post', addNewEmergencyYuAn);


const getEmergencyYuAnById = (options) => {
  console.log('getEmergencyYuAnById options',options);
  const queryParameters = getQueryParameters(options);
  console.log('getEmergencyYuAnById query',queryParameters);
  let temp = {
    id: 'hjskcbah123456fff',
    name: '演唱会保障方案',
    statusId: '002',
    statusName: '待审核',
    typeId: '001',
    typeName: '一级预案',
    creator: '田田',
    reviewUserId: '123',

    startDayTime: 1565347245,
    endDayTime: 1565433645,
    description: '预案描述',
    jobGoal: '工作目标',
    jobAssignment: '任务分配',
    jobContent: '工作内容',
    jobRequirements: '工作要求',
    groupData: [],
    baoZhangData:[],
    logData:[]
  }

  let groupDataTemp1 = {
    id: 'xhjsng001',
    groupName: '后勤组',
    name: '郑 明,郑波立',
    userId: '1-0-0,0-1-0',
  };
  let groupDataTemp2 = {
    id: 'xhjsng002',
    groupName: '监管组',
    name: '周 军',
    userId: '0-1-2',
  };
  let groupDataTemp3 = {
    id: 'xhjsng003',
    groupName: '执行组',
    name: '金 涛,俞 君,邵群艳',
    userId: '0-1-1,1-0-1,1-0-2',
  };
  temp.groupData.push(groupDataTemp1);
  temp.groupData.push(groupDataTemp2);
  temp.groupData.push(groupDataTemp3);

  let baoZhangDataTemp1 = {
    id: 'baozhang002',
    mapId: 'gjasjsgfdjsgfjhds',
    name: '保障点位1',
    totalNum: 3,
    peopleList: [{
      id: '0-1-1',
      name: '金 涛',
      groupName: '执行组'
    }],
    remark: '这个是一个测试'
  }
  temp.baoZhangData.push(baoZhangDataTemp1);
  temp.logData = [
    {'id':'azxs','time':'2018.12.15 18:00','content':'方案发布','user':'柳知行','dept':'指挥中心'},
    {'id':'azwe','time':'2018.12.15 17:00','content':'审核','user':'码农','dept':'XX大队'},
    {'id':'ahxs','time':'2018.12.15 14:00','content':'添加xx大队xx','user':'钢铁侠','dept':'XX大队'},
    {'id':'azlk','time':'2018.12.15 13:00','content':'编辑方案','user':'梁丽','dept':'XX大队'}
  ];
  return builder(
    {
      code: 0,
      data: temp,
      msg: '操作成功'
    },
    '请求成功',
    0,
    { 'Custom-Header': Mock.mock('@id') }
  )
}
Mock.mock(/\/@test\/getEmergencyYuAnById/, 'get', getEmergencyYuAnById);

const setEmergencyYuAnToPass = (options) => {
  console.log('setEmergencyYuAnToPass options',options);
  const body = getBody(options);
  console.log('setEmergencyYuAnToPass body',body);
  return builder(
    {
      code: 0,
      msg: '操作成功'
    },
    '请求成功',
    0,
    { 'Custom-Header': Mock.mock('@id') }
  )
}
Mock.mock(/\/@test\/setEmergencyYuAnToPass/, 'post', setEmergencyYuAnToPass);

const setEmergencyYuAnToBack = (options) => {
  console.log('setEmergencyYuAnToBack options',options);
  const body = getBody(options);
  console.log('setEmergencyYuAnToBack body',body);
  return builder(
    {
      code: 0,
      msg: '操作成功'
    },
    '请求成功',
    0,
    { 'Custom-Header': Mock.mock('@id') }
  )
}
Mock.mock(/\/@test\/setEmergencyYuAnToBack/, 'post', setEmergencyYuAnToBack);

const deleteEmergencyYuAn = (options) => {
  console.log('deleteEmergencyYuAn options',options);
  const body = getBody(options);
  console.log('deleteEmergencyYuAn body',body);
  return builder(
    {
      code: 0,
      msg: '操作成功'
    },
    '请求成功',
    0,
    { 'Custom-Header': Mock.mock('@id') }
  )
}
Mock.mock(/\/@test\/deleteEmergencyYuAn/, 'post', deleteEmergencyYuAn);

const setEmergencyYuAnToTemplate = (options) => {
  console.log('setEmergencyYuAnToTemplate options',options);
  const body = getBody(options);
  console.log('setEmergencyYuAnToTemplate body',body);
  return builder(
    {
      code: 0,
      msg: '操作成功'
    },
    '请求成功',
    0,
    { 'Custom-Header': Mock.mock('@id') }
  )
}
Mock.mock(/\/@test\/setEmergencyYuAnToTemplate/, 'post', setEmergencyYuAnToTemplate);

const setEmergencyYuAnToFinishReview = (options) => {
  console.log('setEmergencyYuAnToFinishReview options',options);
  const body = getBody(options);
  console.log('setEmergencyYuAnToFinishReview body',body);
  return builder(
    {
      code: 0,
      msg: '操作成功'
    },
    '请求成功',
    0,
    { 'Custom-Header': Mock.mock('@id') }
  )
}
Mock.mock(/\/@test\/setEmergencyYuAnToFinishReview/, 'post', setEmergencyYuAnToFinishReview);
