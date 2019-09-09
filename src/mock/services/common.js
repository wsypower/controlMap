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


const getAllPeopleDataList = (options) => {
    console.log('getAllPeopleDataList options',options);
    const queryParameters = getQueryParameters(options);
    console.log('getAllPeopleDataList query',queryParameters);
    let data = [{
        id: '0-0-0',
        name: '傅建民'
    },{
        id: '0-0-1',
        name: '董亨芳'
    },{
        id: '0-0-2',
        name: '顾 祎'
    },{
        id: '0-1-0',
        name: '郑波立'
    },{
        id: '0-1-1',
        name: '金 涛'
    },{
        id: '0-1-2',
        name: '周 军'
    },{
        id: '1-0-0',
        name: '郑 明'
    },{
        id: '1-0-1',
        name: '俞 君'
    },{
        id: '1-0-2',
        name: '邵群艳'
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
