import { builder, getQueryParameters } from '../util'
import Mock from 'mockjs'

const add = options => {
  const queryParameters = getQueryParameters(options)
  console.log(queryParameters)
  return builder(
    {
      msg: '操作成功'
    },
    '请求成功',
    0,
    { 'Custom-Header': Mock.mock('@id') }
  )
}
Mock.mock(/\/@test\/add/, 'get', add)
