import { builder, getBody, getQueryParameters } from '../util'
import Mock from 'mockjs'

const getAllCarTreeData = options => {
  console.log('getAllCarTreeData options',options);
  const queryParameters = getQueryParameters(options);
  console.log('getAllCarTreeData query',queryParameters);
  let data = [
    {
      name: '智慧城管',
      id: 'chengguan',
      isLeaf: false,
      children: [
        {
          name: '信息采集中心',
          id: 'xinxi',
          isLeaf: false,
          children: [
            {
              name: '浙GN8P80',
              id: '861996030365941',
              carNumber: '浙GN8P80',
              code: '浙GN8P80',
              flag: '浙GN8P80',
              phone: '14212412512',
              gpsTime: 1574730352000,
              online: false,
              x: '120.196953',
              y: '30.278492',
              isLeaf: true
            },
            {
              name: '浙GB3F66',
              id: '861996030369604',
              carNumber: '浙GB3F66',
              code: '浙GB3F66',
              flag: '浙GB3F66',
              phone: '14212412512',
              gpsTime: 1574695055000,
              online: true,
              x: '120.196953',
              y: '30.278492',
              isLeaf: true
            },
            {
              name: '浙GD01039',
              id: '861996030370263',
              carNumber: '浙GD01039',
              code: '浙GD01039',
              flag: '浙GD01039',
              phone: '14212412512',
              gpsTime: 1574730528000,
              online: true,
              x: '120.196953',
              y: '30.278492',
              isLeaf: true
            }
          ]
        },
        {
          name: '第一中队',
          id: 'yizhongdui',
          isLeaf: false,
          children: [
            {
              name: '浙GC8B01',
              id: '861996030376930',
              carNumber: '浙GC8B01',
              code: '浙GC8B01',
              flag: '浙GC8B01',
              phone: '14212412512',
              gpsTime: 1574730537000,
              online: true,
              x: '120.196953',
              y: '30.278492',
              isLeaf: true
            },
            {
              name: '浙GZ0G66',
              id: '861996030365958',
              carNumber: '浙GZ0G66',
              code: '浙GZ0G66',
              flag: '浙GZ0G66',
              phone: '14212412512',
              gpsTime: 1574653032000,
              online: false,
              x: '120.196953',
              y: '30.278492',
              isLeaf: true
            }
          ]
        }
      ]
    },
    {
      name: '智慧教育',
      id: 'jiaoyu',
      allNum: 10,
      onlineNum: 4,
      isLeaf: false,
      children: [
        {
          name: '信息采集中心',
          id: 'caiji',
          isLeaf: false,
          children: [
            {
              name: '浙G1923M',
              id: '861996030369620',
              carNumber: '浙G1923M',
              code: '浙G1923M',
              flag: '浙G1923M',
              phone: '14212412512',
              gpsTime: 1574729844000,
              online: true,
              x: '120.196953',
              y: '30.278492',
              isLeaf: true
            },
            {
              name: '浙GD02667',
              id: '861996030370297',
              carNumber: '浙GD02667',
              code: '浙GD02667',
              flag: '浙GD02667',
              phone: '14212412512',
              gpsTime: 1574584935000,
              online: true,
              x: '120.196953',
              y: '30.278492',
              isLeaf: true
            },
            {
              name: '浙GD06752',
              id: '861996030376641',
              carNumber: '浙GD06752',
              code: '浙GD06752',
              flag: '浙GD06752',
              phone: '14212412512',
              gpsTime: 1574672080000,
              online: true,
              x: '120.196953',
              y: '30.278492',
              isLeaf: true
            }
          ]
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
Mock.mock(/\/@test\/getAllCarTreeData/, 'get', getAllCarTreeData)

const getAllCarDataList = options => {
  console.log('getAllCarDataList options',options);
  const queryParameters = getQueryParameters(options);
  console.log('getAllCarDataList query',queryParameters);
  let data = [
    {
      id: '861996030365941',
      name: '浙GN8P80',
      tel: '12453262457',
      dept: '信息采集中心1'
    },
    {
      name: '浙GD01039',
      id: '861996030370263',
      tel: '12453262457',
      dept: '信息采集中心1'
    },
    {
      name: '浙GC8B01',
      id: '861996030376930',
      tel: '12453262457',
      dept: '信息采集中心1'
    },
    {
      name: '浙GZ0G66',
      id: '861996030365958',
      tel: '12453262457',
      dept: '第一中队'
    },
    {
      name: '浙G1923M',
      id: '861996030369620',
      tel: '12453262457',
      dept: '信息采集中心2'
    },
    {
      name: '浙GD02667',
      id: '861996030370297',
      tel: '12453262457',
      dept: '信息采集中心2'
    },
    {
      name: '浙GD06752',
      id: '861996030376641',
      tel: '12453262457',
      dept: '信息采集中心2'
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
Mock.mock(/\/@test\/getAllCarDataList/, 'get', getAllCarDataList)

const getCarTrailDataList = options => {
  console.log('getCarTrailDataList options', options)
  const body = getBody(options)
  console.log('getCarTrailDataList body', body)
  let data = {
    list: [
      {
        index: '01',
        startTime: 1564961494783,
        endTime: 1564961880960
      },
      {
        index: '02',
        startTime: 1564962352718,
        endTime: 1564963660184
      },
      {
        index: '03',
        startTime: 1564964046637,
        endTime: 1564964340783
      },
      {
        index: '04',
        startTime: 1565163204326,
        endTime: 1565164464569
      },
      {
        index: '05',
        startTime: 1565164703221,
        endTime: 1565165818051
      },
      {
        index: '06',
        startTime: 1565752350553,
        endTime: 1565755772150
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
Mock.mock(/\/@test\/getCarTrailDataList/, 'post', getCarTrailDataList)

const getTrailDetailData = options => {
  console.log('getTrailDetailData options',options);
  const queryParameters = getQueryParameters(options);
  console.log('getTrailDetailData query',queryParameters);
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

const getAllCarCompanyDataList = options => {
  console.log('getAllCarCompanyDataList options',options);
  const queryParameters = getQueryParameters(options);
  console.log('getAllCarCompanyDataList query',queryParameters);
  let data = [
    {
      id: 'company1',
      name: '公司名称1'
    },
    {
      id: 'company2',
      name: '公司名称2'
    },
    {
      id: 'company3',
      name: '公司名称3'
    },
    {
      id: 'company4',
      name: '公司名称4'
    },
    {
      id: 'company5',
      name: '公司名称5'
    },
    {
      id: 'company6',
      name: '公司名称6'
    },
    {
      id: 'company7',
      name: '公司名称7'
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
Mock.mock(/\/@test\/getAllCarCompanyDataList/, 'get', getAllCarCompanyDataList)

const getCarViolateRulesDataList = options => {
  console.log('getCarViolateRulesDataList options', options)
  const body = getBody(options)
  console.log('getCarViolateRulesDataList body', body)
  let data = [
    {
      carId: '861996030365941',
      name: '浙GN8P80',
      type: '轻型自卸货车',
      companyName: '公司名称：信息采集中心',
      vLog: [
        {
          id: 'sjgjgjgjhgjdsa0',
          startTime: 1564961494783,
          endTime: 1564961880960,
          vType: '超范围'
        },
        {
          id: 'sjgjgjgjhgjdsa1',
          signInTime: 1564962352718,
          signOutTime: 1564963660184,
          vType: '超时停留'
        },
        {
          id: 'sjgjgjgjhgjdsa2',
          startTime: 1564964046637,
          endTime: 1564964340783,
          vType: '超速'
        }
      ]
    },
    {
      carId: '861996030376641',
      name: '浙GD06752',
      type: '轻型自卸货车',
      companyName: '公司名称：信息采集中心',
      vLog: [
        {
          id: 'sjgjgjgjhgjdsa3',
          startTime: 1565164703221,
          endTime: 1565165818051,
          vType: '超速'
        },
        {
          id: 'sjgjgjgjhgjdsa4',
          startTime: 1565752350553,
          endTime: 1565755772150,
          vType: '超范围'
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
Mock.mock(/\/@test\/getCarViolateRulesDataList/, 'post', getCarViolateRulesDataList)

const deleteCarViolateRules = options => {
  console.log('deleteCarViolateRules options', options)
  const body = getBody(options)
  console.log('deleteCarViolateRules body', body)
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
Mock.mock(/\/@test\/deleteCarViolateRules/, 'post', deleteCarViolateRules)
