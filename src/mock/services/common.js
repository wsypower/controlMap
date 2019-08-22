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

const getEmergencyYuAnInitData = (options) => {
    console.log('getEmergencyYuAnInitData options',options);
    const queryParameters = getQueryParameters(options);
    console.log('getEmergencyYuAnInitData query',queryParameters);
    let levelData = [{'id':0,'name':'重大'},{'id':1,'name':'一般'}];
    let typeData = [{'id':0,'name':'火灾演练'},{'id':1,'name':'消防演练'},{'id':2,'name':'台风演练'},{'id':3,'name':'洪涝演练'}];

    return builder(
        {
            code: 0,
            data:{
                levelData:levelData,
                typeData:typeData
            },
            msg: '操作成功'
        },
        '请求成功',
        0,
        { 'Custom-Header': Mock.mock('@id') }
    )
}
Mock.mock(/\/@test\/getEmergencyYuAnInitData/, 'get', getEmergencyYuAnInitData);

const getAllPeopleDataList = (options) => {
    console.log('getAllPeopleDataList options',options);
    const queryParameters = getQueryParameters(options);
    console.log('getAllPeopleDataList query',queryParameters);
    let data = [{
        id: '0-0-0',
        name: '傅建民',
        tel: '12453262457'
    },{
        id: '0-0-1',
        name: '董亨芳',
        tel: '12453262127'
    },{
        id: '0-0-2',
        name: '顾 祎',
        tel: '16753262458'
    },{
        id: '0-1-0',
        name: '郑波立',
        tel: '18953262145'
    },{
        id: '0-1-1',
        name: '金 涛',
        tel: '19453212457'
    },{
        id: '0-1-2',
        name: '周 军',
        tel: '12553262441'
    },{
        id: '1-0-0',
        name: '郑 明',
        tel: '12053262452'
    },{
        id: '1-0-1',
        name: '俞 君',
        tel: '12253262451'
    },{
        id: '1-0-2',
        name: '邵群艳',
        tel: '19953262456'
    }];
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
Mock.mock(/\/@test\/getAllPeopleDataList/, 'get', getAllPeopleDataList);
