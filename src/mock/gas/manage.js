import { builder, getBody, getQueryParameters } from '../util'
import Mock from 'mockjs'

const getAllGasMacTreeData = options => {
  console.log('getAllGasMacTreeData options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getAllGasMacTreeData query', queryParameters)
  let data = {
    treeData: [
      {
        id: 'jianche1',
        name: '监测点1名称',
        isLeaf: false,
        children: [
          {
            id: '33092104001320015992',
            name: '设备0001',
            isLeaf: true,
            online: true,
            value: 2,
            unit: '%',
            y: '30.247886',
            x: '122.202261'
          },
          {
            id: '33092104001320010677',
            name: '设备0002',
            isLeaf: true,
            online: false,
            value: 3,
            unit: '%',
            y: '30.247886',
            x: '122.202261'
          },
          {
            id: '33092104001320010678',
            name: '设备0003',
            isLeaf: true,
            online: false,
            value: 4,
            unit: '%',
            y: '30.265587',
            x: '122.218019'
          },
          {
            id: '33092104001320010679',
            name: '设备0004',
            isLeaf: true,
            online: true,
            value: 5,
            unit: '%',
            y: '30.265587',
            x: '122.218019'
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
            value: 2,
            unit: '%',
            y: '30.245140',
            x: '122.208213'
          },
          {
            id: '33092104001320011641',
            name: '设备0002',
            isLeaf: true,
            online: false,
            value: 8,
            unit: '%',
            y: '30.245140',
            x: '122.208213'
          },
          {
            id: '33092104001320011642',
            name: '设备0003',
            isLeaf: true,
            online: true,
            value: 1,
            unit: '%',
            y: '30.252779',
            x: '122.220688'
          },
          {
            id: '33092104001320011643',
            name: '设备0004',
            isLeaf: true,
            online: false,
            value: 6,
            unit: '%',
            y: '30.252779',
            x: '122.220688'
          },
          {
            id: '33092104001320011644',
            name: '设备0005',
            isLeaf: true,
            online: false,
            value: 8,
            unit: '%',
            y: '30.245192',
            x: '122.206967'
          },
          {
            id: '33092104001320011645',
            name: '设备0006',
            isLeaf: true,
            online: false,
            value: 1,
            unit: '%',
            y: '30.240435',
            x: '122.203112'
          }
        ]
      }
    ],
    total: 10
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
Mock.mock(/\/@test\/getAllGasMacTreeData/, 'get', getAllGasMacTreeData)

const getOneGasMacData = options => {
  console.log('getOneGasMacData options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getOneGasMacData query', queryParameters)
  let data = {
    yty: -1,
    mtm: 3
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
Mock.mock(/\/@test\/getOneGasMacData/, 'get', getOneGasMacData)

const getGasTrendDataForOneMac = options => {
  console.log('getGasTrendDataForOneMac options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getGasTrendDataForOneMac query', queryParameters)
  let data = [
    {
      dayTime: '2020-03-19 07:00',
      value: 6.9
    },
    {
      dayTime: '2020-03-19 07:30',
      value: 7.2
    },
    {
      dayTime: '2020-03-19 08:00',
      value: 7.2
    },
    {
      dayTime: '2020-03-19 08:30',
      value: 7.0
    },
    {
      dayTime: '2020-03-19 09:00',
      value: 6.9
    },
    {
      dayTime: '2020-03-19 09:30',
      value: 6.8
    },
    {
      dayTime: '2020-03-19 10:00',
      value: 7.0
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
Mock.mock(/\/@test\/getGasTrendDataForOneMac/, 'get', getGasTrendDataForOneMac)