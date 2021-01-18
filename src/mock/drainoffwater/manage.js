import { builder, getBody, getQueryParameters } from '../util'
import Mock from 'mockjs'

const getCountyList = options => {
  console.log('getCountyList options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getCountyList query', queryParameters)
  let data = [
    {
      value: '100',
      label: '六安市',
      children: [
        {
          value: '100000',
          label: '全市'
        },
        {
          value: '100001',
          label: '金安区'
        },
        {
          value: '100002',
          label: '裕安区'
        },
        {
          value: '100003',
          label: '叶集区'
        },
        {
          value: '100004',
          label: '霍邱县'
        },
        {
          value: '100005',
          label: '霍山县'
        },
        {
          value: '100006',
          label: '全寨县'
        },
        {
          value: '100007',
          label: '舒城县'
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
Mock.mock(/\/@test\/getCountyList/, 'get', getCountyList)

const getAllCameraTreeData = options => {
  console.log('getAllCameraTreeData options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getAllCameraTreeData query', queryParameters)
  let data = {
    treeData: [
      {
        id: 'testStandardId',
        name: '高空瞭望',
        isLeaf: false,
        children: [
          {
            id: '33092104001320015992',
            name: '三江购物-球',
            videoUrl: 'http://117.71.25.18:81/pag/117.71.25.18/7302/116458/0/SUB/TCP/live.m3u8',
            isLeaf: true,
            x: '122.202261',
            y: '30.247886'
          },
          {
            id: '33092104001320010677',
            name: '三江购物-全景',
            videoUrl: '',
            isLeaf: true,
            x: '122.202261',
            y: '30.247886'
          },
          {
            id: '33092104001320015002',
            name: '新区广电大楼楼顶-球',
            videoUrl: '',
            isLeaf: true,
            x: '122.218019',
            y: '30.265587'
          }
        ]
      },
      {
        id: 'testStandardId2',
        name: '公园广场',
        isLeaf: false,
        children: [
          {
            id: '33092104001320013870',
            name: '蓬莱公园铁塔-球',
            videoUrl: '',
            isLeaf: true,
            x: '122.208213',
            y: '30.245140'
          },
          {
            id: '33092104001320017369',
            name: '蓬莱公园铁塔-全景',
            videoUrl: '',
            isLeaf: true,
            x: '122.208213',
            y: '30.245140'
          }
        ]
      }
    ],
    total: 5
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
Mock.mock(/\/@test\/getAllCameraTreeData/, 'get', getAllCameraTreeData)

const getAllRainMacTreeData = options => {
  console.log('getAllRainMacTreeData options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getAllRainMacTreeData query', queryParameters)
  let data = {
    treeData: [
      {
        id: 'jianche1',
        isLeaf: false,
        name: '监测点1名称',
        children: [
          {
            id: '33092104001320015992',
            name: '设备0001',
            online: false,
            value: 6,
            unit: 'mm',
            isLeaf: true,
            x: '122.202261',
            y: '30.247886'
          },
          {
            id: '33092104001320010677',
            name: '设备0002',
            isLeaf: true,
            online: false,
            value: 7,
            unit: 'mm',
            y: '30.247886',
            x: '122.202261'
          }
        ]
      },
      {
        id: 'jiance2',
        isLeaf: false,
        name: '监测点2名称',
        children: [
          {
            id: '33092104001320011640',
            name: '设备0001',
            isLeaf: true,
            online: false,
            value: 12,
            unit: 'mm',
            y: '30.245140',
            x: '122.208213'
          },
          {
            id: '33092104001320011641',
            name: '设备0002',
            isLeaf: true,
            online: false,
            value: 18,
            unit: 'mm',
            y: '30.245140',
            x: '122.208213'
          },
          {
            id: '33092104001320011642',
            name: '设备0003',
            isLeaf: true,
            online: false,
            value: 3,
            unit: 'mm',
            y: '30.252779',
            x: '122.220688'
          },
          {
            id: '33092104001320011643',
            name: '设备0004',
            isLeaf: true,
            online: false,
            value: 6,
            unit: 'mm',
            y: '30.252779',
            x: '122.220688'
          },
          {
            id: '33092104001320011644',
            name: '设备0005',
            isLeaf: true,
            online: false,
            value: 10,
            unit: 'mm',
            y: '30.245192',
            x: '122.206967'
          },
          {
            id: '33092104001320011645',
            name: '设备0006',
            isLeaf: true,
            online: false,
            value: 2,
            unit: 'mm',
            y: '30.240435',
            x: '122.203112'
          },
          {
            id: '33092104001320011646',
            name: '设备0007',
            isLeaf: true,
            online: false,
            value: 4,
            unit: 'mm',
            y: '30.247607',
            x: '122.202172'
          }
        ]
      }
    ],
    totla: 23
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
Mock.mock(/\/@test\/getAllRainfallMacTreeData/, 'get', getAllRainMacTreeData)

const getOneRainMacData = options => {
  console.log('getOneRainMacData options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getOneRainMacData query', queryParameters)
  let data = {
    yty: -4,
    mtm: 5
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
Mock.mock(/\/@test\/getOneRainfallMacData/, 'get', getOneRainMacData)

const getRainfallTrendDataForOneMac = options => {
  console.log('getRainfallTrendDataForOneMac options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getRainfallTrendDataForOneMac query', queryParameters)
  let data = [
    {
      dayTime: '2020-03-19 07:00',
      value: 13
    },
    {
      dayTime: '2020-03-19 07:30',
      value: 23
    },
    {
      dayTime: '2020-03-19 08:00',
      value: 16
    },
    {
      dayTime: '2020-03-19 08:30',
      value: 29
    },
    {
      dayTime: '2020-03-19 09:00',
      value: 55
    },
    {
      dayTime: '2020-03-19 09:30',
      value: 33
    },
    {
      dayTime: '2020-03-19 10:00',
      value: 40
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
Mock.mock(/\/@test\/getRainfallTrendDataForOneMac/, 'get', getRainfallTrendDataForOneMac)

const getAllWatchPlaceData = options => {
  console.log('getAllWatchPlaceData options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getAllWatchPlaceData query', queryParameters)
  let data = [
    {
      name: '河道',
      id: 'hedao'
    },
    {
      name: '积水点',
      id: 'jishui'
    },
    {
      name: '污水液位',
      id: 'wushui'
    },
    {
      name: '雨水液位',
      id: 'yushui'
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
Mock.mock(/\/@test\/getAllWatchPlaceData/, 'get', getAllWatchPlaceData)

const getAllWaterLevelMacTreeData = options => {
  console.log('getAllWaterLevelMacTreeData options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getAllWaterLevelMacTreeData query', queryParameters)
  let data = {
    treeData: [
      {
        id: 'jianche1',
        isLeaf: false,
        name: '监测点1名称',
        children: [
          {
            id: '33092104001320015992',
            name: '设备0001',
            isLeaf: true,
            online: false,
            value: 1.5,
            unit: 'm',
            y: '30.247886',
            x: '122.202261'
          }
        ]
      },
      {
        id: 'jiance2',
        isLeaf: false,
        name: '监测点2名称',
        children: [
          {
            id: '33092104001320011647',
            name: '设备0001',
            isLeaf: true,
            online: true,
            value: 2.1,
            unit: 'm',
            y: '30.252497',
            x: '122.201541'
          },
          {
            id: '33092104001320011648',
            name: '设备0002',
            isLeaf: true,
            online: false,
            value: 1.5,
            unit: 'm',
            y: '30.252497',
            x: '122.201541'
          },
          {
            id: '33092104001320011649',
            name: '设备0010',
            isLeaf: true,
            online: false,
            value: 2.6,
            unit: 'm',
            y: '30.252497',
            x: '122.201541'
          }
        ]
      }
    ],
    total: 4
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
Mock.mock(/\/@test\/getAllWaterLevelMacTreeData/, 'get', getAllWaterLevelMacTreeData)

const getOneWaterLevelMacData = options => {
  console.log('getOneWaterLevelMacData options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getOneWaterLevelMacData query', queryParameters)
  let data = {
    yty: -6,
    mtm: 2
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
Mock.mock(/\/@test\/getOneWaterLevelMacData/, 'get', getOneWaterLevelMacData)

const getWaterLevelTrendDataForOneMac = options => {
  console.log('getWaterLevelTrendDataForOneMac options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getWaterLevelTrendDataForOneMac query', queryParameters)
  let data = [
    {
      dayTime: '2020-03-19 07:00',
      value: 13
    },
    {
      dayTime: '2020-03-19 07:30',
      value: 23
    },
    {
      dayTime: '2020-03-19 08:00',
      value: 16
    },
    {
      dayTime: '2020-03-19 08:30',
      value: 29
    },
    {
      dayTime: '2020-03-19 09:00',
      value: 55
    },
    {
      dayTime: '2020-03-19 09:30',
      value: 33
    },
    {
      dayTime: '2020-03-19 10:00',
      value: 40
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
Mock.mock(/\/@test\/getWaterLevelTrendDataForOneMac/, 'get', getWaterLevelTrendDataForOneMac)

const getAllManholeMacData = options => {
  console.log('getAllManholeMacData options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getAllManholeMacData query', queryParameters)
  let data = {
    list: [
      {
        id: '33092104001320015991',
        name: '井盖0001',
        statusId: 0,
        statusName: '正常',
        area: '六安市-裕安区',
        address: 'xxxxxxxxxxxx',
        x: '30.247886',
        y: '122.202261'
      },
      {
        id: '33092104001320015992',
        name: '井盖0002',
        statusId: 0,
        statusName: '正常',
        area: '六安市-裕安区',
        address: 'xxxxxxxxxxxx',
        x: '30.247886',
        y: '122.202261'
      },
      {
        id: '33092104001320015993',
        name: '井盖0003',
        statusId: 0,
        statusName: '正常',
        area: '六安市-裕安区',
        address: 'xxxxxxxxxxxx',
        x: '30.247886',
        y: '122.202261'
      },
      {
        id: '33092104001320015994',
        name: '井盖0004',
        statusId: 1,
        statusName: '警告',
        area: '六安市-裕安区',
        address: 'xxxxxxxxxxxx',
        x: '30.247886',
        y: '122.202261'
      },
      {
        id: '33092104001320015995',
        name: '井盖0005',
        statusId: 0,
        statusName: '正常',
        area: '六安市-裕安区',
        address: 'xxxxxxxxxxxx',
        x: '30.247886',
        y: '122.202261'
      },
      {
        id: '33092104001320015996',
        name: '井盖0006',
        statusId: 2,
        statusName: '离线',
        area: '六安市-裕安区',
        address: 'xxxxxxxxxxxx',
        x: '30.247886',
        y: '122.202261'
      },
      {
        id: '33092104001320015997',
        name: '井盖0007',
        statusId: 0,
        statusName: '正常',
        area: '六安市-裕安区',
        address: 'xxxxxxxxxxxx',
        x: '30.247886',
        y: '122.202261'
      }
    ],
    total: 7
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
Mock.mock(/\/@test\/getAllManholeMacData/, 'get', getAllManholeMacData)
