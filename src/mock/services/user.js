import { builder, getBody } from '../util'
import Mock from 'mockjs'

const userId = ['123', '000']

const login = options => {
  const body = getBody(options)
  if (!userId.includes(body.userId)) {
    return builder({ isLogin: true }, '用户账号密码错误，请联系管理员', 401)
  }
  if (body.userId === userId[0]) {
    return builder(
      {
        id: Mock.mock('@id'),
        name: Mock.mock('@name'),
        username: '13200000',
        realname: Mock.mock('@cname'),
        status: 1,
        creatorId: 'admin',
        role: 'admin'
      },
      '登录成功',
      0,
      { 'Custom-Header': Mock.mock('@id') }
    )
  } else {
    return builder(
      {
        id: Mock.mock('@id'),
        name: Mock.mock('@name'),
        username: '13255555',
        realname: Mock.mock('@cname'),
        status: 1,
        creatorId: 'super_editor',
        role: 'super_editor'
      },
      '登录成功',
      0,
      { 'Custom-Header': Mock.mock('@id') }
    )
  }
}
Mock.mock(/\/@test\/login/, 'post', login)
