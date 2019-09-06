import {builder, getBody, getQueryParameters} from '../util'
import Mock from 'mockjs'

const getAllPeopleTreeData = (options) => {
    console.log('getAllPeopleTreeData options',options);
    const queryParameters = getQueryParameters(options);
    console.log('getAllPeopleTreeData query',queryParameters);
    let data = [{
        title: '智慧城管',
        key: 'chengguan',
        slots: {
            icon: 'dept'
        },
        children:[{
            title: '信息采集中心',
            key: 'xinxi',
            slots: {
                icon: 'dept'
            },
            children: [{
                title: '傅建民',
                key: '0-0-0',
                slots: {
                    icon: 'male'
                }
            }, {
                title: '董亨芳',
                key: '0-0-1',
                slots: {
                    icon: 'female'
                }
            }, {
                title: '顾 祎',
                key: '0-0-2',
                slots: {
                    icon: 'male'
                }
            }]
        },{
            title: '第一中队',
            key: 'yizhongdui',
            slots: {
                icon: 'dept',
            },
            children: [{
                title: '郑波立',
                key: '0-1-0',
                slots: {
                    icon: 'male'
                }
            }, {
                title: '金 涛',
                key: '0-1-1',
                slots: {
                    icon: 'male'
                }
            }, {
                title: '周 军',
                key: '0-1-2',
                slots: {
                    icon: 'male'
                }
            }]
        }]
    }, {
        title: '智慧教育',
        key: 'jiaoyu',
        slots: {
            icon: 'dept',
        },
        children:[{
            title: '信息采集中心',
            key: 'caiji',
            slots: {
                icon: 'dept',
            },
            children: [{
                title: '郑 明',
                key: '1-0-0',
                slots: {
                    icon: 'male'
                }
            }, {
                title: '俞 君',
                key: '1-0-1',
                slots: {
                    icon: 'male'
                }
            }, {
                title: '邵群艳',
                key: '1-0-2',
                slots: {
                    icon: 'female'
                }
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
