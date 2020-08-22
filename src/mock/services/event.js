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
    name: 'kaifa001',
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
Mock.mock(/\/@test\/getDetailPeopleDataList/, 'get', getPeopleDataList);

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
    id: 'c7967b00e43c11eaa6db04d7e29d0076',
    name: 'kaifa001',
    templateId: '',
    templateName: '',
    typeId: '2',
    typeName: '活动保障事件',
    processId: '1',
    processName: '未发起流程',
    startDayTime: 1598066222219,
    endDayTime: 1601349422219,
    description: 'msjkdlsahkjdfksd',
    jobGoal: 'jegjwegjhqwe',
    jobAssignment: 'jgsjhdgjhsagdf',
    jobContent: 'lkkuutwuyetqu3687236g',
    jobRequirements: 'bnvjhduwqteuw'
  }
  let zongTeamList = [{id:'6d87b5a06f7411e8772ac3324197bfce',name:'汤溪中队'},
    {id:'f8143f406a2911e85752236b32c89757',name:'洋埠中队'}];
  let zongZhiHuiData = {
    groupName: 'zongzhihui',
    leaderPosition: '2',
    groupTeam:[{
      key: 'k0001',
      leaderId: '2db8aaf0f9fd11e985344cb8100e0968',
      teamList: zongTeamList
    }]
  };

  let fuTeamList1 = [
    {'id':'f8143f406a2911e85752236b32c89757','name':'洋埠中队'},{'id':'09468cd06f7711e8772ac3324197bfce','name':'业务科'}];
  let fuTeamList2 = [
    {'id':'dae9d1006a2911e85752236b32c89757','name':'三江中队'},
    {'id':'ee15ce506a2911e85752236b32c89757','name':'苏孟中队'},
    {'id':'f39a28d06a2911e85752236b32c89757','name':'罗埠中队'}];
  let fuTeamList3 = [
    {'id':'001','name':'汤溪中队'},
    {'id':'009','name':'罗埠中队'}];
  let fuZhiHuiData = {
    groupName: 'fuzhihui',
    leaderPosition: '1',
    groupTeam:[{
      key: '300001',
      leaderId: '335b53706f9a11e8772ac3324197bfce',
      teamList: fuTeamList1
    },{
      key: '300002',
      leaderId: '1daa34d0fdd711e8f90d14d818f02055',
      teamList: fuTeamList2
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
      address: [{id:'17',name:'宾虹西路'},{id:'69',name:'宾虹西路1'},{id:'194',name:'宾虹西路（秋高村委-公铁立交）北侧'}],
      leaderId: '130220006f8511e8772ac3324197bfce',
      personList: ['af3fcb806f8411e8772ac3324197bfce','db55b1c06f8511e8772ac3324197bfce'],
      positionId: 'xihu',
      mapId: '',
      mapType: '',
      remark: '',
    },
    {
      key: '000000007',
      address: [{id:'12',name:'永康街'},{id:'60',name:'永康街1'},{id:'170',name:'（双馨路-四联路）'}],
      leaderId: 'e39cfcd06f8511e8772ac3324197bfce',
      personList: ['d5c8a1d0eafa11e939de38e6ac3d6fdb','90b3dc006f8511e8772ac3324197bfce','b84647e06f8411e8772ac3324197bfce'],
      positionId: 'xihu2',
      mapId: '',
      mapType: '',
      remark: '',
    }
  ];
  let teamPersonList = [
    // {teamId: '001',teamName: '汤溪中队',checkStatusId:1, checkStatusName: '未上报',teamPersonData:[]},
    {teamId: 'dae9d1006a2911e85752236b32c89757',teamName: '三江中队',checkStatusId:1, checkStatusName: '未上报',teamPersonData:[]}]
  let dunDianQuanDaoData = {
    groupName: 'dundianquandao',
    leaderPosition: '2',
    personPosition: '1',
    teamPersonList: teamPersonList
  };
  let jiDongXunChaData = {
    groupName: 'jidongxuncha',
    leaderPosition: '1',
    personPosition: '1',
    groupPerson:[{
      key: 'xc000001',
      leaderId: '522aac006f8211e8772ac3324197bfce',
      personList: ["788b8ad06f8311e8772ac3324197bfce","2393f980672211e92cfa5d79f28d05c6","7e6dd130fe3811e88628cde6ce3e17dc","5fc8d0e0fe3811e88628cde6ce3e17dc","57b1e4a0fe3811e88628cde6ce3e17dc","47ff7db0fe3811e88628cde6ce3e17dc","40b1fbf0fe3811e88628cde6ce3e17dc","e53b2e606f8311e8772ac3324197bfce","fe1862906f8311e8772ac3324197bfce","07e933d06f8411e8772ac3324197bfce","81f0c9006f8311e8772ac3324197bfce","3be1afe06f8511e8772ac3324197bfce","8ac75bc06f8311e8772ac3324197bfce","cb8722306f8311e8772ac3324197bfce"]
    }]
  };
  let houQinBaoZhangData = {
    groupName: 'houqinbaozhang',
    leaderPosition: '2',
    personPosition: '1',
    groupPerson:[{
      key: 'hq00001',
      leaderId: '55d94090fdd611e8f90d14d818f02055',
      personList: ["370be530fe2d11e826f8e792dc49e411","44d1d8906f9a11e8772ac3324197bfce","61ce4e706f9911e8772ac3324197bfce","91ad19006f9911e8772ac3324197bfce","12fa24306f9a11e8772ac3324197bfce"]
    },
    {
      key: 'hq00002',
      leaderId: '472b50606f8311e8772ac3324197bfce',
      personList: ["575bd660fe2d11e826f8e792dc49e411","4de692a0fe2d11e826f8e792dc49e411"]
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


const submitEvent = (options) => {
  console.log('submitEvent options',options);
  const body = getBody(options);
  console.log('submitEvent body',body);
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
Mock.mock(/\/@test\/submitEvent/, 'post', submitEvent);

const getLoadTreeData = (options) => {
  console.log('getLoadTreeData options',options);
  const queryParameters = getQueryParameters(options);
  console.log('getLoadTreeData query',queryParameters);
  let data = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
            {
              value: 'xihu2',
              label: 'West2 Lake',
            },
            {
              value: 'xihu3',
              label: 'West3 Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
    {
      value: 'ningxia',
      label: 'ningxia',
      children: [
        {
          value: 'yinchuan',
          label: 'yinchuan',
          children: [
            {
              value: 'donghu',
              label: 'donghu',
            },
          ],
        },
      ],
    }
  ];
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
Mock.mock(/\/@test\/getLoadTreeData/, 'get', getLoadTreeData);