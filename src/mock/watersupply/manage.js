import { builder, getBody, getQueryParameters } from '../util'
import Mock from 'mockjs'



const getAllWaterQMMacTreeData = options => {
  console.log('getAllWaterQMMacTreeData options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getAllWaterQMMacTreeData query', queryParameters)
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
Mock.mock(/\/@test\/getAllWaterQMMacTreeData/, 'get', getAllWaterQMMacTreeData)

const getOneWaterQMMacData = options => {
  console.log('getOneWaterQMMacData options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getOneWaterQMMacData query', queryParameters)
  let data = {
    name: '监测点1-设备001',
    detailMessage: [{
      name: 'PH',
      value: 6.9,
      unit: '',
      ytyStatus: '-',
      yty: '-0.1',
      mtmStatus: '+',
      mtm: '+0.1'
    },{
      name: '浊度',
      value: 4.6,
      unit: 'NTU',
      ytyStatus: '-',
      yty: '-0.4',
      mtmStatus: '+',
      mtm: '+0.5'
    },{
      name: '余氯',
      value: 2.2,
      unit: 'mg/L',
      ytyStatus: '-',
      yty: '-0.7',
      mtmStatus: '+',
      mtm: '+1.6'
    }],
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
      [6.9, 7.2, 7.2, 7.0, 6.9, 6.8, 7.0],
      [5.6, 6.1, 5.1, 4.6, 4.6, 5.0, 4.6],
      [1.9, 1.9, 2.1, 2.2, 2.0, 2.1, 2.2]
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
Mock.mock(/\/@test\/getOneWaterQMMacData/, 'get', getOneWaterQMMacData)

