import { builder, getBody, getQueryParameters } from '../util'
import Mock from 'mockjs'

const getAllGasMacTreeData = options => {
  console.log('getAllGasMacTreeData options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getAllGasMacTreeData query', queryParameters)
  let data = [
    {
      id: 'jianche1',
      isLeaf: false,
      name: '监测点1名称',
      children: [
        {
          id: '33092104001320015992',
          name: '设备0001',
          isLeaf: true,
          online: true,
          x: '30.247886',
          y: '122.202261'
        },
        {
          id: '33092104001320010677',
          name: '设备0002',
          isLeaf: true,
          online: false,
          x: '30.247886',
          y: '122.202261'
        },
        {
          id: '33092104001320010678',
          name: '设备0003',
          isLeaf: true,
          online: false,
          x: '30.265587',
          y: '122.218019'
        },
        {
          id: '33092104001320010679',
          name: '设备0004',
          isLeaf: true,
          online: true,
          x: '30.265587',
          y: '122.218019'
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
          x: '30.245140',
          y: '122.208213'
        },
        {
          id: '33092104001320011641',
          name: '设备0002',
          isLeaf: true,
          online: false,
          x: '30.245140',
          y: '122.208213'
        },
        {
          id: '33092104001320011642',
          name: '设备0003',
          isLeaf: true,
          online: true,
          x: '30.252779',
          y: '122.220688'
        },
        {
          id: '33092104001320011643',
          name: '设备0004',
          isLeaf: true,
          online: false,
          x: '30.252779',
          y: '122.220688'
        },
        {
          id: '33092104001320011644',
          name: '设备0005',
          isLeaf: true,
          online: false,
          x: '30.245192',
          y: '122.206967'
        },
        {
          id: '33092104001320011645',
          name: '设备0006',
          isLeaf: true,
          online: false,
          x: '30.240435',
          y: '122.203112'
        },
        {
          id: '33092104001320011646',
          name: '设备0007',
          isLeaf: true,
          online: false,
          x: '30.247607',
          y: '122.202172'
        },
        {
          id: '33092104001320011647',
          name: '设备0008',
          isLeaf: true,
          online: false,
          x: '30.252497',
          y: '122.201541'
        },
        {
          id: '33092104001320011648',
          name: '设备0009',
          isLeaf: true,
          online: false,
          x: '30.252497',
          y: '122.201541'
        },
        {
          id: '33092104001320011649',
          name: '设备0010',
          isLeaf: true,
          online: false,
          x: '30.252497',
          y: '122.201541'
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
Mock.mock(/\/@test\/getAllGasMacTreeData/, 'get', getAllGasMacTreeData)

const getOneGasMacData = options => {
  console.log('getOneGasMacData options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getOneGasMacData query', queryParameters)
  let data = {
    detailMessage: {
      name: '监测点01-设备002',
      flagName: '甲烷含量',
      value: 55,
      unit: '%',
      yty: '-1',
      mtm: '+2'
    },
    chartData: [
      [
        '2020-03-19 07:00',
        '2020-03-19 07:30',
        '2020-03-19 08:00',
        '2020-03-19 08:30',
        '2020-03-19 09:00',
        '2020-03-19 09:30',
        '2020-03-29 10:00'
      ],
      [6.9, 7.2, 7.2, 7.0, 6.9, 6.8, 7.0]
    ]
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

