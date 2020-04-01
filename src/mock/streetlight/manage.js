import { builder, getBody, getQueryParameters } from '../util'
import Mock from 'mockjs'

const getAllLightListData = options => {
  console.log('getAllLightListData options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getAllLightListData query', queryParameters)
  let data = {
    list: [
      {
        id: '33092104001320015991',
        name: '路灯0001',
        online: true,
        y: '30.247886',
        x: '122.202261'
      },
      {
        id: '33092104001320015992',
        name: '路灯0002',
        online: true,
        y: '30.247886',
        x: '122.202261'
      },
      {
        id: '33092104001320015993',
        name: '路灯0003',
        online: false,
        y: '30.247886',
        x: '122.202261'
      },
      {
        id: '33092104001320015994',
        name: '路灯0004',
        online: true,
        y: '30.247886',
        x: '122.202261'
      },
      {
        id: '33092104001320015995',
        name: '路灯0005',
        online: false,
        y: '30.247886',
        x: '122.202261'
      },
      {
        id: '33092104001320015996',
        name: '路灯0006',
        online: true,
        y: '30.247886',
        x: '122.202261'
      },
      {
        id: '33092104001320015997',
        name: '路灯0007',
        online: true,
        y: '30.247886',
        x: '122.202261'
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
Mock.mock(/\/@test\/getAllLightMacData/, 'get', getAllLightListData)

const getOneLightMacData = options => {
  console.log('getOneLightMacData options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getOneLightMacData query', queryParameters)
  let data = [
    {
      dayTime: '2020-03-19 07:00',
      value: 13,
    },
    {
      dayTime: '2020-03-19 07:30',
      value: 23,
    },
    {
      dayTime: '2020-03-19 08:00',
      value: 16,
    },
    {
      dayTime: '2020-03-19 08:30',
      value: 29,
    },
    {
      dayTime: '2020-03-19 09:00',
      value: 55,
    },
    {
      dayTime: '2020-03-19 09:30',
      value: 33,
    },
    {
      dayTime: '2020-03-19 10:00',
      value: 40,
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
Mock.mock(/\/@test\/getPowerCoTrendDataForOneMac/, 'get', getOneLightMacData)
