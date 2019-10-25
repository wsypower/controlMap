import { builder, getBody, getQueryParameters } from '../util'
import Mock from 'mockjs'

const getAlarmStatisticData = options => {
  const queryParameters = getQueryParameters(options)
  console.log('getAlarmStatisticData query', queryParameters);
  let data = {
    alarmType: [
      {
        name: '道路不洁',
        value: 44
      },
      {
        name: '机动车违停',
        value: 23
      },
      {
        name: '游商经营',
        value: 45
      },
      {
        name: '出店经营',
        value: 77
      },
      {
        name: '沿街违停',
        value: 88
      },
    ],
    frequentPart: [
      {
        name: '古翠路',
        value: 44
      },
      {
        name: '古翠路',
        value: 23
      },
      {
        name: '古翠路',
        value: 45
      },
      {
        name: '古翠路',
        value: 77
      },
      {
        name: '古翠路',
        value: 88
      },
    ],
    frequentTime: {

    }
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
Mock.mock(/\/@test\/getAlarmStatisticData/, 'get', getAlarmStatisticData)
