import { builder, getBody } from '../util'
import Mock from 'mockjs'

const username = ['admin', 'user', 'super']
const password = ['123456', '000']

const login = options => {
  const body = getBody(options)
  if (!username.includes(body.username) || !password.includes(body.password)) {
    return builder({ isLogin: true }, '账户或密码错误', 401)
  }

  return builder(
    {
      id: Mock.mock('@guid'),
      name: Mock.mock('@name'),
      username: 'admin',
      password: '',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
      status: 1,
      telephone: '',
      lastLoginIp: '27.154.74.117',
      lastLoginTime: 1534837621348,
      creatorId: 'admin',
      createTime: 1497160610259,
      deleted: 0,
      roleId: 'admin',
      lang: 'zh-CN',
      token: '4291d7da9005377ec9aec4a71ea837f'
    },
    '登录成功',
    0,
    { 'Custom-Header': Mock.mock('@guid') }
  )
}
Mock.mock(/\/@text\/login/, 'post', login)
