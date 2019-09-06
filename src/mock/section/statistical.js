import {builder, getBody, getQueryParameters} from '../util'
import Mock from 'mockjs'

const getPeopleAnalysisData = (options) => {
    console.log('getPeopleAnalysisData options',options);
    const queryParameters = getQueryParameters(options);
    console.log('getPeopleAnalysisData query',queryParameters);
    let data = [{
        groupName: '市本级指挥中心',
        allNum: 240,
        onWorkNum: 115,
        onlineNum: 180
    },{
        groupName: '越城区指挥平台',
        allNum: 290,
        onWorkNum: 130,
        onlineNum: 230
    },{
        groupName: '柯桥区指挥平台',
        allNum: 240,
        onWorkNum: 150,
        onlineNum: 180
    },{
        groupName: '上虞区指挥平台',
        allNum: 290,
        onWorkNum: 180,
        onlineNum: 230
    },{
        groupName: '新昌县指挥平台',
        allNum: 260,
        onWorkNum: 70,
        onlineNum: 160
    },{
        groupName: '诸暨市指挥平台',
        allNum: 275,
        onWorkNum: 130,
        onlineNum: 195
    },{
        groupName: '嵊州市指挥平台',
        allNum: 310,
        onWorkNum: 90,
        onlineNum: 220
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
Mock.mock(/\/@test\/getPeopleAnalysisData/, 'get', getPeopleAnalysisData);


const getStatusAnalysisData = (options) => {
    console.log('getStatusAnalysisData options',options);
    const queryParameters = getQueryParameters(options);
    console.log('getStatusAnalysisData query',queryParameters);
    let data = [{
        name: '市本级指挥中心1',
        totalNum: 24,
        onlineNum: 20,
        outlineNum: 4
    }, {
        name: '市本级指挥中心2',
        totalNum: 24,
        onlineNum: 18,
        outlineNum: 6
    },{
        name: '信息采集中心1',
        totalNum: 34,
        onlineNum: 30,
        outlineNum: 4
    },{
        name: '信息采集中心2',
        totalNum: 17,
        onlineNum: 17,
        outlineNum: 0
    },{
        name: '信息采集中心3',
        totalNum: 78,
        onlineNum: 70,
        outlineNum: 8
    },{
        name: '信息采集中心4',
        totalNum: 31,
        onlineNum: 30,
        outlineNum: 1
    },{
        name: '信息采集中心5',
        totalNum: 45,
        onlineNum: 42,
        outlineNum: 3
    }]
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
Mock.mock(/\/@test\/getStatusAnalysisData/, 'get', getStatusAnalysisData);


const getOverstepAnalysisData = (options) => {
    console.log('getOverstepAnalysisData options',options);
    const queryParameters = getQueryParameters(options);
    console.log('getOverstepAnalysisData query',queryParameters);
    let data = [{
        day: '09-23',
        num: 40
    },{
        day: '09-24',
        num: 32
    },{
        day: '09-25',
        num: 21
    },{
        day: '09-26',
        num: 10
    },{
        day: '09-27',
        num: 16
    },{
        day: '09-28',
        num: 12
    }]
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
Mock.mock(/\/@test\/getOverstepAnalysisData/, 'get', getOverstepAnalysisData);


const getPeopleTopThreeData = (options) => {
    console.log('getPeopleTopThreeData options',options);
    const queryParameters = getQueryParameters(options);
    console.log('getPeopleTopThreeData query',queryParameters);
    let data = [{
        'photoUrl':'',
        'name':'许三多',
        'dept':'新昌县指挥平台',
        'sbajs': 56,
        'hsajs':48,
        'hcajs':36
    }, {
        'photoUrl':'',
        'name':'许三多',
        'dept':'新昌县指挥平台',
        'sbajs': 50,
        'hsajs':31,
        'hcajs':30
    }, {
        'photoUrl':'',
        'name':'许三多',
        'dept':'新昌县指挥平台',
        'sbajs': 41,
        'hsajs':29,
        'hcajs':36
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
Mock.mock(/\/@test\/getPeopleTopThreeData/, 'get', getPeopleTopThreeData);
