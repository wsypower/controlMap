import { builder, getBody, getQueryParameters } from '../util'
import Mock from 'mockjs'

const getAllLightListData = options => {
  console.log('getAllLightListData options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getAllLightListData query', queryParameters)
  let data = [
    {
      id: '33092104001320015991',
      name: '路灯0001',
      online: true,
      x: '30.247886',
      y: '122.202261'
    },
    {
      id: '33092104001320015992',
      name: '路灯0002',
      online: true,
      x: '30.247886',
      y: '122.202261'
    },
    {
      id: '33092104001320015993',
      name: '路灯0003',
      online: false,
      x: '30.247886',
      y: '122.202261'
    },
    {
      id: '33092104001320015994',
      name: '路灯0004',
      online: true,
      x: '30.247886',
      y: '122.202261'
    },
    {
      id: '33092104001320015995',
      name: '路灯0005',
      online: false,
      x: '30.247886',
      y: '122.202261'
    },
    {
      id: '33092104001320015996',
      name: '路灯0006',
      online: true,
      x: '30.247886',
      y: '122.202261'
    },
    {
      id: '33092104001320015997',
      name: '路灯0007',
      online: true,
      x: '30.247886',
      y: '122.202261'
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
Mock.mock(/\/@test\/getAllLightListData/, 'get', getAllLightListData)

const getOneLightMacData = options => {
  console.log('getOneLightMacData options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getOneLightMacData query', queryParameters)
  let data = {
    detailMessage: {
      name: '监测点1-设备001',
      online: true,
      unit: '度'
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
      [13, 23, 16, 29, 55, 33, 40]
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
Mock.mock(/\/@test\/getOneLightMacData/, 'get', getOneLightMacData)