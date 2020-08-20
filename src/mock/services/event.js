import {builder, getBody, getQueryParameters} from '../util'
import Mock from 'mockjs'

const getCountForHandle = (options) => {
  console.log(options)
  const queryParameters = getQueryParameters(options);
  console.log(queryParameters);
let data = 2;
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
Mock.mock(/\/@test\/getCountForHandle/, 'get', getCountForHandle);

const getEventList = (options) => {
  console.log(options)
  const queryParameters = getQueryParameters(options);
  console.log(queryParameters);
  let temp1 = {
    id: '001',
    name: '文明创城行动01',
    typeId:  1,
    typeName: '日常事件',
    startDayTime: 1597109712000,
    endDayTime: 1597363218000,
    processId: 4,
    processName: '领导待审核',
    statusId: 1,
    statusName: '待处理',
    isTemplate: false
  }
  let temp2 = {
    id: '002',
    name: '文明创城行动02',
    typeId:  1,
    typeName: '日常事件',
    startDayTime: 1597109712000,
    endDayTime: 1597363218000,
    processId: 4,
    processName: '领导待审核',
    statusId: 1,
    statusName: '待处理',
    isTemplate: false
  }
  let temp3 = {
    id: '003',
    name: '文明创城行动03',
    typeId:  1,
    typeName: '日常事件',
    startDayTime: 1597109712000,
    endDayTime: 1597363218000,
    processId: 5,
    processName: '领导已确认',
    statusId: 2,
    statusName: '已处理',
    isTemplate: true
  }
  let temp4 = {
    id: '004',
    name: '文明创城行动04',
    typeId:  1,
    typeName: '日常事件',
    startDayTime: 1597109712000,
    endDayTime: 1597363218000,
    processId: 4,
    processName: '中队处理中',
    statusId: 3,
    statusName: '其他部门处理中',
    isTemplate: false
  }
  let temp5 = {
    id: '005',
    name: '文明创城行动05',
    typeId:  1,
    typeName: '日常事件',
    startDayTime: 1597109712000,
    endDayTime: 1597363218000,
    processId: 2,
    processName: '信息指挥中心待审核',
    statusId: 3,
    statusName: '其他部门处理中',
    isTemplate: false
  }
  let data = {
    list: [],
    total: 5
  };
  data.list.push(temp1);
  data.list.push(temp2);
  data.list.push(temp3);
  data.list.push(temp4);
  data.list.push(temp5);
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
Mock.mock(/\/@test\/getEventList/, 'post', getEventList);

const getEventTypeDataList = (options) => {
  console.log('getEventTypeDataList options',options);
  const queryParameters = getQueryParameters(options);
  console.log('getEventTypeDataList query',queryParameters);
  let data = [{'id':'001','name':'日常事件'},
    {'id':'002','name':'活动保障事件'},
    {'id':'003','name':'应急事件'}];
  return builder(
    {
      code: 0,
      data:data,
      msg: '操作成功'
    },
    '请求成功',
    0,
    { 'Custom-Header': Mock.mock('@id') }
  )
}
Mock.mock(/\/@test\/getEventTypeDataList/, 'get', getEventTypeDataList);

const getTemplateEventDataList = (options) => {
  console.log('getTemplateEventDataList options',options);
  const queryParameters = getQueryParameters(options);
  console.log('getTemplateEventDataList query',queryParameters);
  let data = [{'id':'003','name':'文明创城行动03'}];
  return builder(
    {
      code: 0,
      data:data,
      msg: '操作成功'
    },
    '请求成功',
    0,
    { 'Custom-Header': Mock.mock('@id') }
  )
}
Mock.mock(/\/@test\/getTemplateEventDataList/, 'get', getTemplateEventDataList);

const getTeamDataList = (options) => {
  console.log('getTeamDataList options',options);
  const queryParameters = getQueryParameters(options);
  console.log('getTeamDataList query',queryParameters);
  let data = [{'id':'001','name':'汤溪中队'},
    {'id':'002','name':'机动中队'},
    {'id':'003','name':'三江中队'},
    {'id':'004','name':'秋滨中队'},
    {'id':'005','name':'人工湖中队'},
    {'id':'006','name':'江南中队'},
    {'id':'007','name':'西关中队'},
    {'id':'008','name':'苏孟中队'},
    {'id':'009','name':'罗埠中队'},
    {'id':'010','name':'江埠中队'}];
  return builder(
    {
      code: 0,
      data:data,
      msg: '操作成功'
    },
    '请求成功',
    0,
    { 'Custom-Header': Mock.mock('@id') }
  )
}
Mock.mock(/\/@test\/getTeamDataList/, 'get', getTeamDataList);

const getPeopleDataList = (options) => {
  console.log('getPeopleDataList options',options);
  const queryParameters = getQueryParameters(options);
  console.log('getPeopleDataList query',queryParameters);
  let data = [{'id':'001','name':'傅建民'},
    {'id':'002','name':'董亨芳'},
    {'id':'003','name':'顾祎'},
    {'id':'004','name':'郑波立'},
    {'id':'005','name':'金涛'},
    {'id':'006','name':'周军'},
    {'id':'007','name':'邵群艳'},
    {'id':'008','name':'郑明'},
    {'id':'009','name':'俞君'}];
  return builder(
    {
      code: 0,
      data:data,
      msg: '操作成功'
    },
    '请求成功',
    0,
    { 'Custom-Header': Mock.mock('@id') }
  )
}
Mock.mock(/\/@test\/getPeopleDataList/, 'get', getPeopleDataList);

//
const getLogDataByEventId = (options) => {
  console.log('getLogDataByEventId options',options);
  const queryParameters = getQueryParameters(options);
  console.log('getLogDataByEventId query',queryParameters);
  let data = [{
    id: '004',
    time: 1597216858000,
    user: '尼莫',
    dept: '局领导',
    step: '已驳回',
    content: '工作任务划分不清晰'
  },{
    id: '003',
    time: 1597108818000,
    user: '采集员001',
    dept: '信息指挥中心',
    step: '已确认',
    content: '已确认中队信息，提交给领导审核'
  },{
    id: '002',
    time: 1597034418000,
    user: '阿尔法01',
    dept: 'xx中队',
    step: '提交审核',
    content: '已录入完成，提交审核'
  },{
    id: '001',
    time: 1597017618000,
    user: '采集员001',
    dept: '信息指挥中心',
    step: '发起流程',
    content: '请各个中队输入各自信息'
  }];
  return builder(
    {
      code: 0,
      data:data,
      msg: '操作成功'
    },
    '请求成功',
    0,
    { 'Custom-Header': Mock.mock('@id') }
  )
}
Mock.mock(/\/@test\/getLogDataByEventId/, 'get', getLogDataByEventId);

const setEventToTemplate = (options) => {
  console.log('setEventToTemplate options',options);
  const body = getBody(options);
  console.log('setEventToTemplate body',body);
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
Mock.mock(/\/@test\/setEventToTemplate/, 'post', setEventToTemplate);

const deleteEventByIds = (options) => {
  console.log('deleteEventByIds options',options);
  const body = getBody(options);
  console.log('deleteEventByIds body',body);
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
Mock.mock(/\/@test\/deleteEventByIds/, 'post', deleteEventByIds);

const getMessageByEventId = (options) => {
  console.log('getMessageByEventId options',options);
  const queryParameters = getQueryParameters(options);
  console.log('getMessageByEventId query',queryParameters);
  let baseInfo = {
    id: '002',
    name: '文明创城行动02',
    templateId: '',
    templateName: '',
    typeId: '001',
    typeName: '日常事件',
    processId: '',
    processName: '发起流程',
    startDayTime: 1597109712000,
    endDayTime: 1597363218000,
    description: 'msjkdlsahkjdfksd',
    jobGoal: 'jegjwegjhqwe',
    jobAssignment: 'jgsjhdgjhsagdf',
    jobContent: 'lkkuutwuyetqu3687236g',
    jobRequirements: 'bnvjhduwqteuw'
  }
  let zongTeamList = [{id:'002',name:'机动中队'},
    {id:'004',name:'秋滨中队'}];
  let zongZhiHuiData = {
    groupName: 'zongzhihui',
    leaderPosition: 1,
    groupTeam:[{
      key: 'jhhjsddsdds',
      leaderId: '003',
      teamList: zongTeamList
    }]
  };

  let fuTeamList1 = [
    {'id':'006','name':'江南中队'}];
  let fuTeamList2 = [
    {'id':'007','name':'西关中队'}];
  let fuTeamList3 = [
    {'id':'001','name':'汤溪中队'},
    {'id':'009','name':'罗埠中队'}];
  let fuZhiHuiData = {
    groupName: 'fuzhihui',
    leaderPosition: 1,
    groupTeam:[{
      key: '300001',
      leaderId: '005',
      teamList: fuTeamList1
    },{
      key: '300002',
      leaderId: '002',
      teamList: fuTeamList2
    },{
      key: '300003',
      leaderId: '004',
      teamList: fuTeamList3
    }]
  };
  let teamPersonData1 = [
    {
      key: '000000003',
      address: [{id:'jiangsu',name:'jiangsu'},{id:'nanjing',name:'nanjing'},{id:'zhonghuamen',name:'Zhong Hua Men'}],
      leaderId: '004',
      personList: ['003','008'],
      baoZhangId: 'bz00001',
      mapId: '',
      mapType: '',
      remark: '',
    }
  ];
  let teamPersonData2 = [
    {
      key: '000000004',
      address: [{id:'zhejiang',name:'zhejiang'},{id:'hangzhou',name:'hangzhou'}],
      leaderId: '007',
      personList: ['003','008'],
      baoZhangId: 'bz00002',
      mapId: '',
      mapType: '',
      remark: '',
    }
  ];
  let teamPersonList = [
    {teamId: '001',teamName: '汤溪中队',checkStatusId:1, checkStatusName: '未上报',teamPersonData:[]},
    {teamId: '009',teamName: '罗埠中队',checkStatusId:2, checkStatusName: '待审核',teamPersonData:teamPersonData2}]
  let dunDianQuanDaoData = {
    groupName: 'dundianquandao',
    leaderPosition: 1,
    personPosition: 1,
    teamPersonList: teamPersonList
  };
  let jiDongXunChaData = {
    groupName: 'jidongxuncha',
    leaderPosition: 1,
    personPosition: 1,
    groupPerson:[{
      key: 'xc000001',
      leaderId: '003',
      personList: ['001','002']
    },
    {
      key: 'xc000002',
      leaderId: '005',
      personList: ['003','004']
    }]
  };
  let houQinBaoZhangData = {
    groupName: 'houqinbaozhang',
    leaderPosition: 1,
    personPosition: 1,
    groupPerson:[{
      key: 'hq00001',
      leaderId: '007',
      personList: ['003','005']
    },
    {
      key: 'hq00002',
      leaderId: '006',
      personList: ['004','009']
    }]
  };
  let data = {
    baseInfo: baseInfo,
    groupData: {
      zongZhiHuiData,
      fuZhiHuiData,
      dunDianQuanDaoData,
      jiDongXunChaData,
      houQinBaoZhangData
    }
  }
  return builder(
    {
      code: 0,
      data: data,
      msg: '操作成功'
    },
    '请求成功',
    0,
    { 'Custom-Header': Mock.mock('@id') }
  )
}
Mock.mock(/\/@test\/getMessageByEventId/, 'get', getMessageByEventId);

const getPeopleTreeData = (options) => {
  console.log('getPeopleTreeData options',options);
  const queryParameters = getQueryParameters(options);
  console.log('getPeopleTreeData query',queryParameters);
  let data = [{
    title: '智慧城管',
    key: 'chengguan',
    slots: {
      icon: 'dept'
    },
    children:[{
      title: '信息采集中心',
      key: 'xinxi',
      slots: {
        icon: 'dept'
      },
      children: [{
        title: '傅建民',
        key: '001',
        slots: {
          icon: 'male'
        }
      }, {
        title: '董亨芳',
        key: '002',
        slots: {
          icon: 'female'
        }
      }, {
        title: '顾 祎',
        key: '003',
        slots: {
          icon: 'male'
        }
      }]
    },{
      title: '第一中队',
      key: 'yizhongdui',
      slots: {
        icon: 'dept',
      },
      children: [{
        title: '郑波立',
        key: '004',
        slots: {
          icon: 'male'
        }
      }, {
        title: '金 涛',
        key: '005',
        slots: {
          icon: 'male'
        }
      }, {
        title: '周 军',
        key: '006',
        slots: {
          icon: 'male'
        }
      }]
    }]
  }, {
    title: '智慧教育',
    key: 'jiaoyu',
    slots: {
      icon: 'dept',
    },
    children:[{
      title: '信息采集中心',
      key: 'caiji',
      slots: {
        icon: 'dept',
      },
      children: [{
        title: '郑 明',
        key: '007',
        slots: {
          icon: 'male'
        }
      }, {
        title: '俞 君',
        key: '008',
        slots: {
          icon: 'male'
        }
      }, {
        title: '邵群艳',
        key: '009',
        slots: {
          icon: 'female'
        }
      }]
    }]
  }];
  return builder(
    {
      code: 0,
      data:data,
      msg: '操作成功'
    },
    '请求成功',
    0,
    { 'Custom-Header': Mock.mock('@id') }
  )
}
Mock.mock(/\/@test\/getPeopleTreeData/, 'get', getPeopleTreeData);

const checkEvent = (options) => {
  console.log('checkEvent options',options);
  const body = getBody(options);
  console.log('checkEvent body',body);
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
Mock.mock(/\/@test\/checkEvent/, 'post', checkEvent);

const addNewEvent = (options) => {
  console.log('addNewEvent options',options);
  const body = getBody(options);
  console.log('addNewEvent body',body);
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
Mock.mock(/\/@test\/addNewEvent/, 'post', addNewEvent);


const addTeamPersonForNewEvent = (options) => {
  console.log('addTeamPersonForNewEvent options',options);
  const body = getBody(options);
  console.log('addTeamPersonForNewEvent body',body);
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
Mock.mock(/\/@test\/addTeamPersonForNewEvent/, 'post', addTeamPersonForNewEvent);

const submitEventToCheck = (options) => {
  console.log('submitEventToCheck options',options);
  const body = getBody(options);
  console.log('submitEventToCheck body',body);
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
Mock.mock(/\/@test\/submitEventToCheck/, 'post', submitEventToCheck);