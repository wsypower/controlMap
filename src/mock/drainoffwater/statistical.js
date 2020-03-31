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
Mock.mock(/\/@test\/getRainfallMacStatusAnalysisData/, 'get', getStatusAnalysisData)

const getRainTrendData = options => {
  console.log('getRainTrendData options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getRainTrendData query', queryParameters)
  let data1 = [
    {
      dayTime: '2020-03-16 00:00',
      num: 40
    },
    {
      dayTime: '2020-03-16 01:00',
      num: 32
    },
    {
      dayTime: '2020-03-16 02:00',
      num: 21
    },
    {
      dayTime: '2020-03-16 03:00',
      num: 10
    },
    {
      dayTime: '2020-03-16 04:00',
      num: 16
    },
    {
      dayTime: '2020-03-16 05:00',
      num: 12
    },
    {
      dayTime: '2020-03-16 06:00',
      num: 40
    },
    {
      dayTime: '2020-03-16 07:00',
      num: 32
    },
    {
      dayTime: '2020-03-16 08:00',
      num: 21
    },
    {
      dayTime: '2020-03-16 09:00',
      num: 10
    },
    {
      dayTime: '2020-03-16 10:00',
      num: 16
    },
    {
      dayTime: '2020-03-16 11:00',
      num: 12
    },
    {
      dayTime: '2020-03-16 12:00',
      num: 40
    },
    {
      dayTime: '2020-03-16 13:00',
      num: 32
    },
    {
      dayTime: '2020-03-16 14:00',
      num: 21
    },
    {
      dayTime: '2020-03-16 15:00',
      num: 10
    },
    {
      dayTime: '2020-03-16 16:00',
      num: 16
    },
    {
      dayTime: '2020-03-16 17:00',
      num: 12
    },
    {
      dayTime: '2020-03-16 18:00',
      num: 40
    },
    {
      dayTime: '2020-03-16 19:00',
      num: 32
    },
    {
      dayTime: '2020-03-16 20:00',
      num: 21
    },
    {
      dayTime: '2020-03-16 21:00',
      num: 10
    },
    {
      dayTime: '2020-03-16 22:00',
      num: 16
    },
    {
      dayTime: '2020-03-16 23:00',
      num: 12
    }
  ]
  let data2 = [
    {
      dayTime: '2020-03-17 00:00',
      num: 40
    },
    {
      dayTime: '2020-03-17 01:00',
      num: 32
    },
    {
      dayTime: '2020-03-17 02:00',
      num: 21
    },
    {
      dayTime: '2020-03-17 03:00',
      num: 10
    },
    {
      dayTime: '2020-03-17 04:00',
      num: 16
    },
    {
      dayTime: '2020-03-17 05:00',
      num: 12
    },
    {
      dayTime: '2020-03-17 06:00',
      num: 40
    },
    {
      dayTime: '2020-03-17 07:00',
      num: 32
    },
    {
      dayTime: '2020-03-17 08:00',
      num: 33
    },
    {
      dayTime: '2020-03-17 09:00',
      num: 10
    },
    {
      dayTime: '2020-03-17 10:00',
      num: 16
    },
    {
      dayTime: '2020-03-17 11:00',
      num: 12
    },
    {
      dayTime: '2020-03-17 12:00',
      num: 40
    },
    {
      dayTime: '2020-03-17 13:00',
      num: 32
    },
    {
      dayTime: '2020-03-17 14:00',
      num: 40
    },
    {
      dayTime: '2020-03-17 15:00',
      num: 10
    },
    {
      dayTime: '2020-03-17 16:00',
      num: 16
    },
    {
      dayTime: '2020-03-17 17:00',
      num: 12
    },
    {
      dayTime: '2020-03-17 18:00',
      num: 40
    },
    {
      dayTime: '2020-03-17 19:00',
      num: 7
    },
    {
      dayTime: '2020-03-17 20:00',
      num: 21
    },
    {
      dayTime: '2020-03-17 21:00',
      num: 10
    },
    {
      dayTime: '2020-03-17 22:00',
      num: 16
    },
    {
      dayTime: '2020-03-17 23:00',
      num: 12
    }
  ]
  let data3 = [
    {
      dayTime: '2020-03-18 00:00',
      num: 40
    },
    {
      dayTime: '2020-03-18 01:00',
      num: 32
    },
    {
      dayTime: '2020-03-18 02:00',
      num: 21
    },
    {
      dayTime: '2020-03-18 03:00',
      num: 10
    },
    {
      dayTime: '2020-03-18 04:00',
      num: 16
    },
    {
      dayTime: '2020-03-18 05:00',
      num: 12
    },
    {
      dayTime: '2020-03-18 06:00',
      num: 40
    },
    {
      dayTime: '2020-03-18 07:00',
      num: 32
    },
    {
      dayTime: '2020-03-18 08:00',
      num: 21
    },
    {
      dayTime: '2020-03-18 09:00',
      num: 10
    },
    {
      dayTime: '2020-03-18 10:00',
      num: 16
    },
    {
      dayTime: '2020-03-18 11:00',
      num: 12
    },
    {
      dayTime: '2020-03-18 12:00',
      num: 40
    },
    {
      dayTime: '2020-03-18 13:00',
      num: 32
    },
    {
      dayTime: '2020-03-18 14:00',
      num: 21
    },
    {
      dayTime: '2020-03-18 15:00',
      num: 10
    },
    {
      dayTime: '2020-03-18 16:00',
      num: 16
    },
    {
      dayTime: '2020-03-18 17:00',
      num: 12
    },
    {
      dayTime: '2020-03-18 18:00',
      num: 40
    },
    {
      dayTime: '2020-03-18 19:00',
      num: 32
    },
    {
      dayTime: '2020-03-18 20:00',
      num: 21
    },
    {
      dayTime: '2020-03-18 21:00',
      num: 10
    },
    {
      dayTime: '2020-03-18 22:00',
      num: 16
    },
    {
      dayTime: '2020-03-18 23:00',
      num: 12
    }
  ]
  let data4 = [
    {
      dayTime: '2020-03-19 00:00',
      num: 40
    },
    {
      dayTime: '2020-03-19 01:00',
      num: 32
    },
    {
      dayTime: '2020-03-19 02:00',
      num: 21
    },
    {
      dayTime: '2020-03-19 03:00',
      num: 10
    },
    {
      dayTime: '2020-03-19 04:00',
      num: 16
    },
    {
      dayTime: '2020-03-19 05:00',
      num: 12
    },
    {
      dayTime: '2020-03-19 06:00',
      num: 40
    },
    {
      dayTime: '2020-03-19 07:00',
      num: 32
    },
    {
      dayTime: '2020-03-19 08:00',
      num: 8
    },
    {
      dayTime: '2020-03-19 09:00',
      num: 10
    },
    {
      dayTime: '2020-03-19 10:00',
      num: 16
    },
    {
      dayTime: '2020-03-19 11:00',
      num: 12
    },
    {
      dayTime: '2020-03-19 12:00',
      num: 40
    },
    {
      dayTime: '2020-03-19 13:00',
      num: 32
    },
    {
      dayTime: '2020-03-19 14:00',
      num: 21
    },
    {
      dayTime: '2020-03-19 15:00',
      num: 10
    },
    {
      dayTime: '2020-03-19 16:00',
      num: 16
    },
    {
      dayTime: '2020-03-19 17:00',
      num: 12
    },
    {
      dayTime: '2020-03-19 18:00',
      num: 40
    },
    {
      dayTime: '2020-03-19 19:00',
      num: 32
    }
  ]
  let data = [...data1, ...data2, ...data3, ...data4]
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
Mock.mock(/\/@test\/getRainfallTrendData/, 'get', getRainTrendData)

const getWaterStatusAnalysisData = options => {
  console.log('getWaterStatusAnalysisData options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getWaterStatusAnalysisData query', queryParameters)
  let data = [
    {
      name: '在线',
      num: 80
    },
    {
      name: '离线',
      num: 7
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
Mock.mock(/\/@test\/getWaterStatusAnalysisData/, 'get', getWaterStatusAnalysisData)

const getWaterLevelTrendData = options => {
  console.log('getWaterLevelTrendData options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getWaterLevelTrendData query', queryParameters)
  let data1 = [
    {
      day: '2020-03-16 00:00',
      num: 40
    },
    {
      day: '2020-03-16 01:00',
      num: 32
    },
    {
      day: '2020-03-16 02:00',
      num: 21
    },
    {
      day: '2020-03-16 03:00',
      num: 10
    },
    {
      day: '2020-03-16 04:00',
      num: 16
    },
    {
      day: '2020-03-16 05:00',
      num: 12
    },
    {
      day: '2020-03-16 06:00',
      num: 40
    },
    {
      day: '2020-03-16 07:00',
      num: 32
    },
    {
      day: '2020-03-16 08:00',
      num: 21
    },
    {
      day: '2020-03-16 09:00',
      num: 10
    },
    {
      day: '2020-03-16 10:00',
      num: 16
    },
    {
      day: '2020-03-16 11:00',
      num: 12
    },
    {
      day: '2020-03-16 12:00',
      num: 40
    },
    {
      day: '2020-03-16 13:00',
      num: 32
    },
    {
      day: '2020-03-16 14:00',
      num: 21
    },
    {
      day: '2020-03-16 15:00',
      num: 10
    },
    {
      day: '2020-03-16 16:00',
      num: 16
    },
    {
      day: '2020-03-16 17:00',
      num: 12
    },
    {
      day: '2020-03-16 18:00',
      num: 40
    },
    {
      day: '2020-03-16 19:00',
      num: 32
    },
    {
      day: '2020-03-16 20:00',
      num: 21
    },
    {
      day: '2020-03-16 21:00',
      num: 10
    },
    {
      day: '2020-03-16 22:00',
      num: 16
    },
    {
      day: '2020-03-16 23:00',
      num: 12
    }
  ]
  let data2 = [
    {
      day: '2020-03-17 00:00',
      num: 40
    },
    {
      day: '2020-03-17 01:00',
      num: 32
    },
    {
      day: '2020-03-17 02:00',
      num: 21
    },
    {
      day: '2020-03-17 03:00',
      num: 10
    },
    {
      day: '2020-03-17 04:00',
      num: 16
    },
    {
      day: '2020-03-17 05:00',
      num: 12
    },
    {
      day: '2020-03-17 06:00',
      num: 40
    },
    {
      day: '2020-03-17 07:00',
      num: 32
    },
    {
      day: '2020-03-17 08:00',
      num: 33
    },
    {
      day: '2020-03-17 09:00',
      num: 10
    },
    {
      day: '2020-03-17 10:00',
      num: 16
    },
    {
      day: '2020-03-17 11:00',
      num: 12
    },
    {
      day: '2020-03-17 12:00',
      num: 40
    },
    {
      day: '2020-03-17 13:00',
      num: 32
    },
    {
      day: '2020-03-17 14:00',
      num: 40
    },
    {
      day: '2020-03-17 15:00',
      num: 10
    },
    {
      day: '2020-03-17 16:00',
      num: 16
    },
    {
      day: '2020-03-17 17:00',
      num: 12
    },
    {
      day: '2020-03-17 18:00',
      num: 40
    },
    {
      day: '2020-03-17 19:00',
      num: 7
    },
    {
      day: '2020-03-17 20:00',
      num: 21
    },
    {
      day: '2020-03-17 21:00',
      num: 10
    },
    {
      day: '2020-03-17 22:00',
      num: 16
    },
    {
      day: '2020-03-17 23:00',
      num: 12
    }
  ]
  let data3 = [
    {
      day: '2020-03-18 00:00',
      num: 40
    },
    {
      day: '2020-03-18 01:00',
      num: 32
    },
    {
      day: '2020-03-18 02:00',
      num: 21
    },
    {
      day: '2020-03-18 03:00',
      num: 10
    },
    {
      day: '2020-03-18 04:00',
      num: 16
    },
    {
      day: '2020-03-18 05:00',
      num: 12
    },
    {
      day: '2020-03-18 06:00',
      num: 40
    },
    {
      day: '2020-03-18 07:00',
      num: 32
    },
    {
      day: '2020-03-18 08:00',
      num: 21
    },
    {
      day: '2020-03-18 09:00',
      num: 10
    },
    {
      day: '2020-03-18 10:00',
      num: 16
    },
    {
      day: '2020-03-18 11:00',
      num: 12
    },
    {
      day: '2020-03-18 12:00',
      num: 40
    },
    {
      day: '2020-03-18 13:00',
      num: 32
    },
    {
      day: '2020-03-18 14:00',
      num: 21
    },
    {
      day: '2020-03-18 15:00',
      num: 10
    },
    {
      day: '2020-03-18 16:00',
      num: 16
    },
    {
      day: '2020-03-18 17:00',
      num: 12
    },
    {
      day: '2020-03-18 18:00',
      num: 40
    },
    {
      day: '2020-03-18 19:00',
      num: 32
    },
    {
      day: '2020-03-18 20:00',
      num: 21
    },
    {
      day: '2020-03-18 21:00',
      num: 10
    },
    {
      day: '2020-03-18 22:00',
      num: 16
    },
    {
      day: '2020-03-18 23:00',
      num: 12
    }
  ]
  let data4 = [
    {
      day: '2020-03-19 00:00',
      num: 40
    },
    {
      day: '2020-03-19 01:00',
      num: 32
    },
    {
      day: '2020-03-19 02:00',
      num: 21
    },
    {
      day: '2020-03-19 03:00',
      num: 10
    },
    {
      day: '2020-03-19 04:00',
      num: 16
    },
    {
      day: '2020-03-19 05:00',
      num: 12
    },
    {
      day: '2020-03-19 06:00',
      num: 40
    },
    {
      day: '2020-03-19 07:00',
      num: 32
    },
    {
      day: '2020-03-19 08:00',
      num: 8
    },
    {
      day: '2020-03-19 09:00',
      num: 10
    },
    {
      day: '2020-03-19 10:00',
      num: 16
    },
    {
      day: '2020-03-19 11:00',
      num: 12
    },
    {
      day: '2020-03-19 12:00',
      num: 40
    },
    {
      day: '2020-03-19 13:00',
      num: 32
    },
    {
      day: '2020-03-19 14:00',
      num: 21
    },
    {
      day: '2020-03-19 15:00',
      num: 10
    },
    {
      day: '2020-03-19 16:00',
      num: 16
    },
    {
      day: '2020-03-19 17:00',
      num: 12
    },
    {
      day: '2020-03-19 18:00',
      num: 40
    },
    {
      day: '2020-03-19 19:00',
      num: 32
    }
  ]
  let data = [...data1, ...data2, ...data3, ...data4]
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
Mock.mock(/\/@test\/getWaterLevelTrendData/, 'get', getWaterLevelTrendData)

const getManholeStatusAnalysisData = options => {
  console.log('getManholeStatusAnalysisData options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getManholeStatusAnalysisData query', queryParameters)
  let data = [
    {
      name: '在线',
      num: 70
    },
    {
      name: '离线',
      num: 4
    },
    {
      name: '警告',
      num: 15
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
Mock.mock(/\/@test\/getManholeStatusAnalysisData/, 'get', getManholeStatusAnalysisData)
