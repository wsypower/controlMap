import {builder, getBody, getQueryParameters} from '../util'
import Mock from 'mockjs'

const getAllTypeData = (options) => {
    console.log('getAllTypeData options',options);
    const queryParameters = getQueryParameters(options);
    console.log('getAllTypeData query',queryParameters);
    let data = [{'id':0,'name':'火灾演练'},{'id':1,'name':'消防演练'},{'id':2,'name':'台风演练'},{'id':3,'name':'洪涝演练'}];
    return builder(
        {
            code: 0,
            data:data,
            msg: '操作成功'
        },
        '请求成功',
        0,
        { 'Custom-Header': Mock.mock('@id') }
    )
}
Mock.mock(/\/@test\/getAllTypeData/, 'get', getAllTypeData);


const getAllLevelData = (options) => {
    console.log('getAllLevelData options',options);
    const queryParameters = getQueryParameters(options);
    console.log('getAllLevelData query',queryParameters);
    let data = [{'id':0,'name':'重大'},{'id':1,'name':'一般'}];
    return builder(
        {
            code: 0,
            data:data,
            msg: '操作成功'
        },
        '请求成功',
        0,
        { 'Custom-Header': Mock.mock('@id') }
    )
}
Mock.mock(/\/@test\/getAllLevelData/, 'get', getAllLevelData);
