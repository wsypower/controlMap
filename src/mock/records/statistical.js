import { builder, getBody, getQueryParameters } from '../util'
import Mock from 'mockjs'

const getShiBuJianAnalysisData = options => {
  console.log('getShiBuJianAnalysisData options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getShiBuJianAnalysisData query', queryParameters)
  let data = {
    shiJianNum: 15420,
    buJianNum: 14900
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
Mock.mock(/\/@test\/getShiBuJianAnalysisData/, 'get', getShiBuJianAnalysisData)

const getRecordsStatisticalAnalysisData = options => {
  console.log('getRecordsStatisticalAnalysisData options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getRecordsStatisticalAnalysisData query', queryParameters)
  let data = [
    {
      name: '上报',
      num: 475
    },
    {
      name: '立案',
      num: 357
    },
    {
      name: '处置',
      num: 331
    },
    {
      name: '核实',
      num: 209
    },
    {
      name: '核查',
      num: 201
    },
    {
      name: '结案',
      num: 199
    },
    {
      name: '废弃',
      num: 157
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
Mock.mock(/\/@test\/getRecordsStatisticalAnalysisData/, 'get', getRecordsStatisticalAnalysisData)

const getRecordsSourceAnalysisData = options => {
  console.log('getRecordsSourceAnalysisData options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getRecordsSourceAnalysisData query', queryParameters)
  let data = [
    {
      name: '微信上报',
      num: 43
    },
    {
      name: '视频上报',
      num: 38
    },
    {
      name: '平台上报',
      num: 94
    },
    {
      name: '网络员上报',
      num: 178
    },
    {
      name: '其他',
      num: 78
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
Mock.mock(/\/@test\/getRecordsSourceAnalysisData/, 'get', getRecordsSourceAnalysisData)

const getHighIncidenceTOP5Data = options => {
  console.log('getHighIncidenceTOP5Data options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getHighIncidenceTOP5Data query', queryParameters)
  let data = [
    {
      name: '私搭乱建',
      num: 475
    },
    {
      name: '上水井盖',
      num: 357
    },
    {
      name: '非法小广告',
      num: 331
    },
    {
      name: '无照经营游商',
      num: 209
    },
    {
      name: '街头散发广告',
      num: 201
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
Mock.mock(/\/@test\/getHighIncidenceTOP5Data/, 'get', getHighIncidenceTOP5Data)

const getRecordsDayAnalysisData = options => {
  console.log('getRecordsDayAnalysisData options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getRecordsDayAnalysisData query', queryParameters)
  let data = [
    {
      month: '一月',
      num1: 20,
      num2: 40,
      num3: 60
    },
    {
      month: '二月',
      num1: 30,
      num2: 50,
      num3: 70
    },
    {
      month: '三月',
      num1: 40,
      num2: 60,
      num3: 40
    },
    {
      month: '四月',
      num1: 50,
      num2: 30,
      num3: 50
    },
    {
      month: '五月',
      num1: 60,
      num2: 20,
      num3: 20
    },
    {
      month: '六月',
      num1: 40,
      num2: 30,
      num3: 30
    },
    {
      month: '七月',
      num1: 10,
      num2: 20,
      num3: 10
    },
    {
      month: '八月',
      num1: 20,
      num2: 60,
      num3: 30
    },
    {
      month: '九月',
      num1: 20,
      num2: 40,
      num3: 60
    },
    {
      month: '十月',
      num1: 20,
      num2: 40,
      num3: 60
    },
    {
      month: '十一月',
      num1: 80,
      num2: 40,
      num3: 60
    },
    {
      month: '十二月',
      num1: 100,
      num2: 40,
      num3: 60
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
Mock.mock(/\/@test\/getRecordsDayAnalysisData/, 'get', getRecordsDayAnalysisData)