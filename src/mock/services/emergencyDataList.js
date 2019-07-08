import { builder, getBody } from '../util'
import Mock from 'mockjs'

const getEmergencyYuAnList = options => {
    const body = getBody(options)
    console.log('getEmergencyYuAnList body',body);
    return builder(
        {
            code: 0,
            data: [{'name':'消防安全','description':'烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火。','level': '0','status':0,'statusName':'进行中'},
                {'name':'消防安全','description':'烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火。','level': '1','status':-1,'statusName':'未开始'},
                {'name':'消防安全','description':'烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火。','level': '1','status':1,'statusName':'已完成'},
                {'name':'消防安全','description':'烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火。','level': '1','status':1,'statusName':'已完成'}],
            total: 9
        },
        '请求成功',
        0,
        { 'Custom-Header': Mock.mock('@id') }
    )
}
Mock.mock(/\/@test\/getEmergencyYuAnList/, 'get', getEmergencyYuAnList)
