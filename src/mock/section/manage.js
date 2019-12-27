import { builder, getBody, getQueryParameters } from '../util'
import Mock from 'mockjs'

const getAllPeopleTreeData = options => {
  console.log('getAllPeopleTreeData options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getAllPeopleTreeData query', queryParameters)
  let data = [
    {
      id: '0-0-0',
      name: '傅建民',
      code: '6398765',
      phone: '13967215943',
      dept: '秀秀秀中队',
      role: '采集员',
      sex: 'male',
      online: true,
      x: '120.196953',
      y: '30.278492'
    },
    {
      name: '董亨芳',
      id: '0-0-1',
      code: '3398765',
      online: true,
      phone: '13967215943',
      dept: '秀秀秀中队',
      role: '监督员',
      sex: 'female',
      x: '120.196953',
      y: '30.278492'
    },
    {
      name: '顾 祎',
      id: '0-0-2',
      code: '2398765',
      online: false,
      phone: '13967215943',
      dept: '秀秀秀中队',
      role: '监督员',
      sex: 'male',
      x: '120.196953',
      y: '30.278492'
    },
    {
      name: '郑波立',
      id: '0-1-0',
      code: '1398765',
      online: true,
      phone: '13967215943',
      dept: '秀秀秀中队',
      role: '监督员',
      sex: 'male',
      x: '120.196953',
      y: '30.278492'
    },
    {
      name: '金 涛',
      id: '0-1-1',
      code: '4398765',
      online: true,
      phone: '13967215943',
      dept: '秀秀秀中队',
      role: '监督员',
      sex: 'male',
      x: '120.196953',
      y: '30.278492'
    },
    {
      name: '周 军',
      id: '0-1-2',
      code: '5398765',
      online: true,
      phone: '13967215943',
      dept: '秀秀秀中队',
      role: '监督员',
      sex: 'male',
      x: '120.196953',
      y: '30.278492'
    },
    {
      name: '郑 明',
      id: '1-0-0',
      code: '7398765',
      online: true,
      phone: '13967215943',
      dept: '秀秀秀中队',
      role: '监督员',
      sex: 'male',
      x: '120.196953',
      y: '30.278492'
    },
    {
      name: '俞 君',
      id: '1-0-1',
      code: '8398765',
      online: false,
      phone: '13967215943',
      sex: 'female',
      x: '120.196953',
      y: '30.278492'
    },
    {
      name: '邵群艳1',
      id: '1-0-3',
      code: '9398765',
      online: true,
      phone: '13967215943',
      dept: '秀秀秀中队',
      role: '监督员',
      sex: 'female',
      x: '120.196953',
      y: '30.278492'
    },
    {
      name: '邵群艳2',
      id: '1-0-4',
      code: '9398765',
      online: true,
      phone: '13967215943',
      dept: '秀秀秀中队',
      role: '监督员',
      sex: 'female',
      x: '120.196953',
      y: '30.278492'
    },
    {
      name: '邵群艳3',
      id: '1-0-5',
      code: '9398765',
      online: true,
      phone: '13967215943',
      dept: '秀秀秀中队',
      role: '监督员',
      sex: 'female',
      x: '120.196953',
      y: '30.278492'
    },
    {
      name: '邵群艳4',
      id: '1-0-6',
      code: '9398765',
      online: true,
      phone: '13967215943',
      dept: '秀秀秀中队',
      role: '监督员',
      sex: 'female',
      x: '120.196953',
      y: '30.278492'
    },
    {
      name: '邵群艳5',
      id: '1-0-7',
      code: '9398765',
      online: true,
      phone: '13967215943',
      dept: '秀秀秀中队',
      role: '监督员',
      sex: 'female',
      x: '120.196953',
      y: '30.278492'
    }
  ]
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
Mock.mock(/\/@test\/getAllPeopleTreeData/, 'get', getAllPeopleTreeData)

const getUserWorkInfoData = options => {
  console.log('getUserWorkInfoData options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getUserWorkInfoData query', queryParameters)
  let data = {
    br_sbs: 2,
    br_hss: 10,
    br_hcs: 20,
    br_fqs: 0,

    bh_sbs: 214,
    bh_hss: 320,
    bh_hcs: 136,
    bh_fqs: 17
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
Mock.mock(/\/@test\/getUserWorkInfoData/, 'get', getUserWorkInfoData)

const getAllUserInfoData = options => {
  console.log('getAllUserInfoData options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getAllUserInfoData query', queryParameters)
  let data = {
    realName: '吴彦祖',
    name: 'zh0123',
    code: '600300',
    phone: '13900000000',
    job: '采集员',
    phoneUrl: 'http://61.153.37.213:8087/upload/file/2019/09/05/20190905094208620997.jpg'
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
Mock.mock(/\/@test\/getAllUserInfoData/, 'get', getAllUserInfoData)

const getUserTrailDataList = options => {
  console.log('getUserTrailDataList options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getUserTrailDataList query', queryParameters)
  let data = [
    {
      geom: 'geom',
      gpstime: 1575159980430,
      gpsx: '120.56305825710297',
      gpsy: '30.014031529426575',
      id: '32921af013d111ea9377，fd3722df40e0',
      operate: '99',
      remark: 'true',
      userId: '7bf0dd70c30011e909aee9bbd1fd8aa8'
    },
    {
      geom: 'geom',
      gpstime: 1575160010442,
      gpsx: '120.56305825710297',
      gpsy: '30.014031529426575',
      id: '44740c1013d111ea48ac26c7dad4454b',
      operate: '99',
      remark: 'true',
      userId: '7bf0dd70c30011e909aee9bbd1fd8aa8'
    },
    {
      geom: 'geom',
      gpstime: 1575160040510,
      gpsx: '120.56305825710297',
      gpsy: '30.014031529426575',
      id: '5665668013d111ea9377fd3722df40e0',
      operate: '99',
      remark: 'true',
      userId: '7bf0dd70c30011e909aee9bbd1fd8aa8'
    },
    {
      geom: 'geom',
      gpstime: 1575160047381,
      gpsx: '120.56305825710297',
      gpsy: '30.014031529426575',
      id: '5a7681f013d111ea5362bbf5dd149398',
      operate: '0',
      remark: 'true',
      userId: '7bf0dd70c30011e909aee9bbd1fd8aa8'
    },
    {
      geom: 'geom',
      gpstime: 1575160110882,
      gpsx: '120.56790797',
      gpsy: '30.01113311',
      id: '8054438013d111eaf4dbf9a691456100',
      operate: '99',
      remark: 'true',
      userId: '7bf0dd70c30011e909aee9bbd1fd8aa8'
    },
    {
      geom: 'geom',
      gpstime: 1575160884680,
      gpsx: '120.56790797',
      gpsy: '30.01113311',
      id: '4d8c50d013d311ea23da96bf4973eaa3',
      operate: '99',
      remark: 'true',
      userId: '7bf0dd70c30011e909aee9bbd1fd8aa8'
    },
    {
      geom: 'geom',
      gpstime: 1575161348082,
      gpsx: '120.56790797',
      gpsy: '30.01113311',
      id: '61c534d013d411eaf4dbf9a691456100',
      operate: '99',
      remark: 'true',
      userId: '7bf0dd70c30011e909aee9bbd1fd8aa8'
    },
    {
      geom: 'geom',
      gpstime: 1575161372961,
      gpsx: '120.56798797',
      gpsy: '30.02113311',
      id: '7091336013d411ea5362bbf5dd149398',
      operate: '99',
      remark: 'true',
      userId: '7bf0dd70c30011e909aee9bbd1fd8aa8'
    },
    {
      geom: 'geom',
      gpstime: 1575161487908,
      gpsx: '120.57900797',
      gpsy: '30.03113311',
      id: 'b51f66f013d411ea9377fd3722df40e0',
      operate: '99',
      remark: 'true',
      userId: '7bf0dd70c30011e909aee9bbd1fd8aa8'
    }
  ]
  return builder(
    {
      code: 0,
      result: data,
      msg: '操作成功'
    },
    '请求成功',
    0,
    { 'Custom-Header': Mock.mock('@id') }
  )
}
Mock.mock(/\/@test\/getUserTrailDataList/, 'get', getUserTrailDataList)

const getTrailDetailData = options => {
  console.log('getTrailDetailData options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getTrailDetailData query', queryParameters)
  let data = [
    {
      coordinatex: '122.22062999999999',
      coordinatey: '30.262163',
      createtime: 1564961494783,
      geom: 'geom',
      gpstime: 1564961494783,
      gpsx: '122.22062999999999',
      gpsy: '30.262163',
      id: 'ff65e0d0b70f11e94084da2335b942ab',
      operate: '99',
      remark: 'true',
      userId: '557c6850a4e611e856f64dd5bc2aa7bb'
    },
    {
      coordinatex: '122.20669448375702',
      coordinatey: '30.24557590484619',
      createtime: 1564961509683,
      geom: 'geom',
      gpstime: 1564961509683,
      gpsx: '122.20669448375702',
      gpsy: '30.24557590484619',
      id: '083dac10b71011e94084da2335b942ab',
      operate: '99',
      remark: 'true',
      userId: '557c6850a4e611e856f64dd5bc2aa7bb'
    },
    {
      coordinatex: '122.20669448375702',
      coordinatey: '30.24557590484619',
      createtime: 1564961524708,
      geom: 'geom',
      gpstime: 1564961524708,
      gpsx: '122.20669448375702',
      gpsy: '30.24557590484619',
      id: '113115a0b71011e94084da2335b942ab',
      operate: '99',
      remark: 'true',
      userId: '557c6850a4e611e856f64dd5bc2aa7bb'
    }
  ]
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
Mock.mock(/\/@test\/getTrailDetailData/, 'get', getTrailDetailData)

const getUserWorkTimeTotalData = options => {
  console.log('getUserWorkTimeTotalData options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getUserWorkTimeTotalData query', queryParameters)
  let data = {
    todayData: {
      signIn: '08:28:30',
      signInState: '1',
      signOut: '17:00:00',
      signOutState: '2',
    },
    monthData:{
      totalNum: 8,
      normalNum: 6,
      lateNum: 1,
      earlyNum: 1
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
Mock.mock(/\/@test\/getUserWorkTimeTotalData/, 'get', getUserWorkTimeTotalData)

const getUserWorkTimeDataList = options => {
  console.log('getUserWorkTimeDataList options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getUserWorkTimeDataList query', queryParameters)
  let data = {
    list: [
      {
        id: 'jasgdhsadhfsadhsad0',
        day: '2019-09-02',
        signInTime: 1564961494783,
        signOutTime: 1564961880960
      },
      {
        id: 'jasgdhsadhfsadhsad1',
        day: '2019-08-31',
        signInTime: 1564962352718,
        signOutTime: 1564963660184
      },
      {
        id: 'jasgdhsadhfsadhsad2',
        day: '2019-08-30',
        signInTime: 1564964046637,
        signOutTime: null
      },
      {
        id: 'jasgdhsadhfsadhsad3',
        day: '2019-08-29',
        signInTime: 1565163204326,
        signOutTime: 1565164464569
      },
      {
        id: 'jasgdhsadhfsadhsad4',
        day: '2019-08-28',
        signInTime: 1565164703221,
        signOutTime: 1565165818051
      },
      {
        id: 'jasgdhsadhfsadhsad5',
        day: '2019-08-27',
        signInTime: 1565752350553,
        signOutTime: 1565755772150
      }
    ],
    total: 6
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
Mock.mock(/\/@test\/getUserWorkTimeDataList/, 'get', getUserWorkTimeDataList)

const getUserSignDetailData = options => {
  console.log('getUserSignDetailData options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getUserSignDetailData query', queryParameters)
  let data = {
    signIn: {
      time: 1564961494783,
      positionX: '120.3333',
      positionY: '33',
      fileList: [
        {
          name: '1567387712203.jpg',
          url: 'http://61.153.37.213:8087/upload/file/2019/09/02/2019090209285388169.jpg'
        },
        {
          name: '1567647711557.jpg',
          url: 'http://61.153.37.213:8087/upload/file/2019/09/05/20190905094208620997.jpg'
        }
      ]
    },
    signOut: {
      time: 1564961880960,
      positionX: '120',
      positionY: '33',
      fileList: [
        {
          name: 'xxxx.jpg',
          url: 'xxxxxxx'
        }
      ]
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
Mock.mock(/\/@test\/getUserSignDetailData/, 'get', getUserSignDetailData)

