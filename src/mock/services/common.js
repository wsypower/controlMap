import {builder, getBody, getQueryParameters} from '../util'
import Mock from 'mockjs'

const getAllPeopleTreeData = (options) => {
    console.log('getAllPeopleTreeData options',options);
    const queryParameters = getQueryParameters(options);
    console.log('getAllPeopleTreeData query',queryParameters);
    let data = [{
        name: '智慧城管',
        id: 'chengguan',
        allNum: 6,
        onlineNum: 5,
        isLeaf: false,
        children:[{
            name: '信息采集中心',
            id: 'xinxi',
            allNum: 3,
            onlineNum: 2,
            isLeaf: false,
            children: [{
                name: '傅建民',
                id: '0-0-0',
                online: true,
                phone: "13967215943",
                sex: "male",
                x: "122.206714",
                y: "30.245535",
                isLeaf: true
            }, {
                name: '董亨芳',
                id: '0-0-1',
                online: true,
                phone: "13967215943",
                sex: "female",
                x: "122.206714",
                y: "30.245535",
                isLeaf: true
            }, {
                name: '顾 祎',
                id: '0-0-2',
                online: false,
                phone: "13967215943",
                sex: "male",
                x: "122.206714",
                y: "30.245535",
                isLeaf: true
            }]
        },{
            name: '第一中队',
            id: 'yizhongdui',
            allNum: 3,
            onlineNum: 3,
            isLeaf: false,
            children: [{
                name: '郑波立',
                id: '0-1-0',
                online: true,
                phone: "13967215943",
                sex: "male",
                x: "122.206714",
                y: "30.245535",
                isLeaf: true
            }, {
                name: '金 涛',
                id: '0-1-1',
                online: true,
                phone: "13967215943",
                sex: "male",
                x: "122.206714",
                y: "30.245535",
                isLeaf: true
            }, {
                name: '周 军',
                id: '0-1-2',
                online: true,
                phone: "13967215943",
                sex: "male",
                x: "122.206714",
                y: "30.245535",
                isLeaf: true
            }]
        }]
    }, {
        name: '智慧教育',
        id: 'jiaoyu',
        allNum: 10,
        onlineNum: 4,
        isLeaf: false,
        children:[{
            name: '信息采集中心',
            id: 'caiji',
            allNum: 3,
            onlineNum: 2,
            isLeaf: false,
            children: [{
                name: '郑 明',
                id: '1-0-0',
                online: true,
                phone: "13967215943",
                sex: "male",
                x: "122.206714",
                y: "30.245535",
                isLeaf: true
            }, {
                name: '俞 君',
                id: '1-0-1',
                online: false,
                phone: "13967215943",
                sex: "female",
                x: "122.206714",
                y: "30.245535",
                isLeaf: true
            }, {
                name: '邵群艳',
                id: '1-0-2',
                online: true,
                phone: "13967215943",
                sex: "female",
                x: "122.206714",
                y: "30.245535",
                isLeaf: true
            }]
        }]
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
Mock.mock(/\/@test\/getAllPeopleTreeData/, 'get', getAllPeopleTreeData);

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
        tel: '12453262457',
        dept: '信息采集中心1'
    },{
        id: '0-0-1',
        name: '董亨芳',
        tel: '12453262457',
        dept: '信息采集中心1'
    },{
        id: '0-0-2',
        name: '顾 祎',
        tel: '12453262457',
        dept: '信息采集中心1'
    },{
        id: '0-1-0',
        name: '郑波立',
        tel: '12453262457',
        dept: '第一中队'
    },{
        id: '0-1-1',
        name: '金 涛',
        tel: '12453262457',
        dept: '第一中队'
    },{
        id: '0-1-2',
        name: '周 军',
        tel: '12453262457',
        dept: '第一中队'
    },{
        id: '1-0-0',
        name: '郑 明',
        tel: '12453262457',
        dept: '信息采集中心2'
    },{
        id: '1-0-1',
        name: '俞 君',
        tel: '12453262457',
        dept: '信息采集中心2'
    },{
        id: '1-0-2',
        name: '邵群艳',
        tel: '12453262457',
        dept: '信息采集中心2'
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
