import { builder, getBody, getQueryParameters } from '../util'
import Mock from 'mockjs'

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
      positionX: '120',
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

const getUserViolateRulesDataList = options => {
  console.log('getUserViolateRulesDataList options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getUserViolateRulesDataList query', queryParameters)
  let data = [
    {
      userId: 'jhsjhdhdj',
      name: '甄某某',
      dept: '信息采集中心',
      vLog: [
        {
          id: 'sjgjgjgjhgjdsa0',
          startTime: 1564961494783,
          endTime: 1564961880960,
          vType: '越界'
        },
        {
          id: 'sjgjgjgjhgjdsa1',
          signInTime: 1564962352718,
          signOutTime: 1564963660184,
          vType: '越界'
        },
        {
          id: 'sjgjgjgjhgjdsa2',
          startTime: 1564964046637,
          endTime: 1564964340783,
          vType: '越界'
        }
      ]
    },
    {
      userId: 'erghjhdhdjfdgfhfghg',
      name: '何某',
      dept: '信息采集中心',
      vLog: [
        {
          id: 'sjgjgjgjhgjdsa3',
          startTime: 1565164703221,
          endTime: 1565165818051,
          vType: '越界'
        },
        {
          id: 'sjgjgjgjhgjdsa4',
          startTime: 1565752350553,
          endTime: 1565755772150,
          vType: '不在岗'
        }
      ]
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
Mock.mock(/\/@test\/getUserViolateRulesDataList/, 'get', getUserViolateRulesDataList)

const deleteUserViolateRules = options => {
  console.log('deleteUserViolateRules options', options)
  const body = getBody(options)
  console.log('deleteUserViolateRules body', body)
  let data = {
    msg: '操作成功'
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
Mock.mock(/\/@test\/deleteUserViolateRules/, 'post', deleteUserViolateRules)
