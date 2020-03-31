import { builder, getBody, getQueryParameters } from '../util'
import Mock from 'mockjs'

const getStatusAnalysisData = options => {
  console.log('getStatusAnalysisData options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getStatusAnalysisData query', queryParameters)
  let data = [
    {
      name: '在线',
      num: 20
    },
    {
      name: '离线',
      num: 4
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
Mock.mock(/\/@test\/getWaterQualityMacStatusAnalysisData/, 'get', getStatusAnalysisData)

const getWaterQualityTrendData = options => {
  console.log('getWaterQualityTrendData options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getWaterQualityTrendData query', queryParameters)
  let data = [
    {
      dayTime: '2020-03-16 00:00',
      phValue: 7,
      turbidityValue: 4.6,
      rcValue: 1.3
    },
    {
      dayTime: '2020-03-16 01:00',
      phValue: 7,
      turbidityValue: 4.6,
      rcValue: 1.3
    },
    {
      dayTime: '2020-03-16 02:00',
      phValue: 7,
      turbidityValue: 4.6,
      rcValue: 1.3
    },
    {
      dayTime: '2020-03-16 03:00',
      phValue: 7,
      turbidityValue: 4.6,
      rcValue: 1.3
    },
    {
      dayTime: '2020-03-16 04:00',
      phValue: 7,
      turbidityValue: 4.6,
      rcValue: 1.3
    },
    {
      dayTime: '2020-03-16 05:00',
      phValue: 7,
      turbidityValue: 4.6,
      rcValue: 1.3
    },
    {
      dayTime: '2020-03-16 06:00',
      phValue: 7,
      turbidityValue: 4.6,
      rcValue: 1.3
    },
    {
      dayTime: '2020-03-16 07:00',
      phValue: 7,
      turbidityValue: 4.6,
      rcValue: 1.3
    },
    {
      dayTime: '2020-03-16 08:00',
      phValue: 7,
      turbidityValue: 4.6,
      rcValue: 1.3
    },
    {
      dayTime: '2020-03-16 09:00',
      phValue: 7,
      turbidityValue: 4.6,
      rcValue: 1.3
    },
    {
      dayTime: '2020-03-16 10:00',
      phValue: 7,
      turbidityValue: 4.6,
      rcValue: 1.3
    },
    {
      dayTime: '2020-03-16 11:00',
      phValue: 7,
      turbidityValue: 4.6,
      rcValue: 1.3
    },
    {
      dayTime: '2020-03-16 12:00',
      num: 40
    },
    {
      dayTime: '2020-03-16 13:00',
      phValue: 7,
      turbidityValue: 4.6,
      rcValue: 1.3
    },
    {
      dayTime: '2020-03-16 14:00',
      phValue: 7,
      turbidityValue: 4.6,
      rcValue: 1.3
    },
    {
      dayTime: '2020-03-16 15:00',
      phValue: 7,
      turbidityValue: 4.6,
      rcValue: 1.3
    },
    {
      dayTime: '2020-03-16 16:00',
      phValue: 7,
      turbidityValue: 4.6,
      rcValue: 1.3
    },
    {
      dayTime: '2020-03-16 17:00',
      phValue: 7,
      turbidityValue: 4.6,
      rcValue: 1.3
    },
    {
      dayTime: '2020-03-16 18:00',
      phValue: 7,
      turbidityValue: 4.6,
      rcValue: 1.3
    },
    {
      dayTime: '2020-03-16 19:00',
      phValue: 7,
      turbidityValue: 4.6,
      rcValue: 1.3
    },
    {
      dayTime: '2020-03-16 20:00',
      phValue: 7,
      turbidityValue: 4.6,
      rcValue: 1.3
    },
    {
      dayTime: '2020-03-16 21:00',
      phValue: 7,
      turbidityValue: 4.6,
      rcValue: 1.3
    },
    {
      dayTime: '2020-03-16 22:00',
      phValue: 7,
      turbidityValue: 4.6,
      rcValue: 1.3
    },
    {
      dayTime: '2020-03-16 23:00',
      phValue: 7,
      turbidityValue: 4.6,
      rcValue: 1.3
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
Mock.mock(/\/@test\/getWaterQualityTrendData/, 'get', getWaterQualityTrendData)

