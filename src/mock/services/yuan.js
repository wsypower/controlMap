import {builder, getBody, getQueryParameters} from '../util'
import Mock from 'mockjs'

const getYuAnDataList = (options) => {
    console.log(options)
    const queryParameters = getQueryParameters(options);
    console.log(queryParameters);
    let data = [{'id':'aaa','name':'防台风预案'},
        {'id':'bbb','name':'防旱预案'},
        {'id':'ccc','name':'防汛预案'},
        {'id':'ddd','name':'领导视察'},
        {'id':'eee','name':'城管突发事件'}];
    return builder(
        {
            code: 0,
            data: data,
            total: 3
        },
        '请求成功',
        0,
        { 'Custom-Header': Mock.mock('@id') }
    )
}
Mock.mock(/\/@test\/getYuAnDataList/, 'get', getYuAnDataList);

const addNewYuAn = (options) => {
    console.log('addNewYuAn options',options);
    const body = getBody(options);
    console.log('addNewYuAn body',body);
    return builder(
        {
            code: 0,
            msg: '操作成功'
        },
        '请求成功',
        0,
        { 'Custom-Header': Mock.mock('@id') }
    )
}
Mock.mock(/\/@test\/addNewYuAn/, 'post', addNewYuAn);

const deleteYuAn = (options) => {
    console.log('deleteYuAn options',options);
    const body = getBody(options);
    console.log('deleteYuAn body',body);
    return builder(
        {
            code: 0,
            msg: '操作成功'
        },
        '请求成功',
        0,
        { 'Custom-Header': Mock.mock('@id') }
    )
}
Mock.mock(/\/@test\/deleteYuAn/, 'get', deleteYuAn);

const getYuAnInfoById = (options) => {
    console.log(options)
    const queryParameters = getQueryParameters(options);
    console.log(queryParameters);
    let data = {
        'id':'aaa',
        'name':'防台风预案',
        'stageData': [{
            id: 'zzz',
            stageName: '消息阶段',
            description: 'sdfdsfd',
            person: 'xcd',
            tel: '12452324562'
        }, {
            id: 'yyy',
            stageName: '警报阶段',
            description: 'sdfdsfd',
            person: 'ghj',
            tel: '12452324562'
        }],
        'peopleData':{
            leaderOne: ['0-0-0'],
            leaderTwo: ['0-0-1'],
            leaderThree: ['0-0-2'],
            leaderFour: ['0-1-0'],
            leaderFive: ['0-1-1'],
            memberOne: ['0-1-2'],
            memberTwo: ['1-0-0'],
            groupOneForOne: ['1-0-1'],
            groupOneForTwo: ['1-0-2'],
            groupOneForThree: [],
            groupTwoForOne: [],
            groupTwoForTwo: [],
            groupTwoForThree: [],
            groupThreeForOne: [],
            groupThreeForTwo: [],
            groupThreeForThree: []
        },
        'resourceData': [{
            id: 'hdk15dd',
            name: '皮划艇',
            num: '20',
            person: '木木',
            tel: '19924152367',
            address: '健康会受到',
            x: '120.3',
            y: '32.6478'
        }],
        'placeData':[{
            id: 'hdk15ddedf',
            name: 'xxx场地',
            num: '20',
            person: '木木',
            tel: '19924152367',
            address: '健康会受到',
            x: '120.3',
            y: '32.6478'
        }]
    };
    return builder(
        {
            code: 0,
            data: data,
            total: 3
        },
        '请求成功',
        0,
        { 'Custom-Header': Mock.mock('@id') }
    )
}
Mock.mock(/\/@test\/getYuAnInfoById/, 'get', getYuAnInfoById);
