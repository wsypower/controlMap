import { builder, getBody, getQueryParameters } from '../util'
import Mock from 'mockjs'

const getAlarmTypeAnalysisData = options => {
  console.log('getAlarmTypeAnalysisData options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getAlarmTypeAnalysisData query', queryParameters)
  let data = [
    {
      name: '道路不洁',
      num: 44
    },
    {
      name: '机动车违停',
      num: 23
    },
    {
      name: '游商经营',
      num: 45
    },
    {
      name: '出店经营',
      num: 77
    },
    {
      name: '沿街违停',
      num: 88
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
Mock.mock(/\/@test\/getAlarmTypeAnalysisData/, 'get', getAlarmTypeAnalysisData)

const getHighIncidenceRoadAnalysisData = options => {
  console.log('getHighIncidenceRoadAnalysisData options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getHighIncidenceRoadAnalysisData query', queryParameters)
  let data = [
    {
      name: 'xxxx路',
      num: 40
    },
    {
      name: 'yyyyy路',
      num: 32
    },
    {
      name: 'aaaa路',
      num: 21
    },
    {
      name: 'bbbb路',
      num: 10
    },
    {
      name: 'ccccc路',
      num: 16
    },
    {
      name: 'zzzzzzzz路',
      num: 12
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
Mock.mock(/\/@test\/getHighIncidenceRoadAnalysisData/, 'get', getHighIncidenceRoadAnalysisData)

const getHighIncidenceTimeAnalysisData = options => {
  console.log('getHighIncidenceTimeAnalysisData options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getHighIncidenceTimeAnalysisData query', queryParameters)
  let data = [
    { day: '2018-01-01', num: 16 },
    { day: '2018-01-02', num: 61 },
    { day: '2018-01-03', num: 26 },
    { day: '2018-01-04', num: 62 },
    { day: '2018-01-05', num: 36 },
    { day: '2018-01-06', num: 64 },
    { day: '2018-01-07', num: 56 },
    { day: '2018-01-08', num: 66 },
    { day: '2018-01-09', num: 67 },
    { day: '2018-01-10', num: 0 },
    { day: '2018-01-11', num: 0 },
    { day: '2018-01-12', num: 0 },
    { day: '2018-01-13', num: 23 },
    { day: '2018-01-14', num: 34 },
    { day: '2018-01-15', num: 41 },
    { day: '2018-01-16', num: 51 },
    { day: '2018-01-17', num: 13 },
    { day: '2018-01-18', num: 6 },
    { day: '2018-01-19', num: 65 },
    { day: '2018-01-20', num: 0 },
    { day: '2018-01-21', num: 1 },
    { day: '2018-01-22', num: 0 },
    { day: '2018-01-23', num: 77 },
    { day: '2018-01-24', num: 0 },
    { day: '2018-01-25', num: 89 },
    { day: '2018-01-26', num: 34 },
    { day: '2018-01-27', num: 22 },
    { day: '2018-01-28', num: 0 },
    { day: '2018-01-29', num: 36 },
    { day: '2018-01-30', num: 76 },
    { day: '2018-01-31', num: 16 }
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
Mock.mock(/\/@test\/getHighIncidenceTimeAnalysisData/, 'get', getHighIncidenceTimeAnalysisData)
