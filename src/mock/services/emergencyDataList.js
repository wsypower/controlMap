import {builder, getBody, getQueryParameters} from '../util'
import Mock from 'mockjs'

const getEmergencyYuAnList = (options) => {
    console.log(options)
    const queryParameters = getQueryParameters(options);
    console.log(queryParameters);
    let data = [{id:'asxcdxvf1',name: 'xxxx预案方案',creator: '天田甜', reviewUserId:'', startDayTime: 1565347245,endDayTime:1565433645,statusId: '001',statusName:'待提交'},
        {id:'asxcdxvf2',name: 'xxxx预案方案',creator: '天田甜',reviewUserId:'123', startDayTime: 1565347245,endDayTime:1565433645,statusId: '002',statusName:'待审核'},
        {id:'asxcdxvf3',name: 'xxxx预案方案',creator: '天田甜',reviewUserId:'aaa', startDayTime: 1565347245,endDayTime:1565433645,statusId: '003',statusName:'已同意'},
        {id:'asxcdxvf4',name: 'xxxx预案方案',creator: '天田甜',reviewUserId:'bbb', startDayTime: 1565347245,endDayTime:1565433645,statusId: '004',statusName:'已驳回'},
        {id:'asxcdxvf5',name: 'xxxx预案方案',creator: '天田甜',reviewUserId:'ccc', startDayTime: 1565347245,endDayTime:1565433645,statusId: '005',statusName:'未开始'},
        {id:'asxcdxvf6',name: 'xxxx预案方案',creator: '天田甜',reviewUserId:'ccc', startDayTime: 1565347245,endDayTime:1565433645,statusId: '006',statusName:'进行中'},
        {id:'asxcdxvf7',name: 'xxxx预案方案',creator: '天田甜',reviewUserId:'ccc', startDayTime: 1565347245,endDayTime:1565433645,statusId: '007',statusName:'已结束'},
        {id:'asxcdxvf8',name: 'xxxx预案方案',creator: '天田甜',reviewUserId:'ddd', startDayTime: 1565347245,endDayTime:1565433645,statusId: '008',statusName:'已逾期作废'},
        {id:'asxcdxvf9',name: 'xxxx预案方案',creator: '天田甜',reviewUserId:'eee', startDayTime: 1565347245,endDayTime:1565433645,statusId: '002',statusName:'待审核'}];
    return builder(
        {
            code: 0,
            data: data,
            total: 14
        },
        '请求成功',
        0,
        { 'Custom-Header': Mock.mock('@id') }
    )
}
Mock.mock(/\/@test\/getEmergencyYuAnList/, 'post', getEmergencyYuAnList);

const addNewEmergencyYuAn = (options) => {
    console.log('addNewEmergencyYuAn options',options);
    const body = getBody(options);
    console.log('addNewEmergencyYuAn body',body);
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
Mock.mock(/\/@test\/addNewEmergencyYuAn/, 'post', addNewEmergencyYuAn);

const deleteEmergencyYuAn = (options) => {
    console.log('deleteEmergencyYuAn options',options);
    const body = getBody(options);
    console.log('deleteEmergencyYuAn body',body);
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
Mock.mock(/\/@test\/deleteEmergencyYuAn/, 'get', deleteEmergencyYuAn);

const getAllEmergencyPeople = (options) => {
    console.log('getAllEmergencyPeople options',options);
    const queryParameters = getQueryParameters(options);
    console.log('getAllEmergencyPeople query',queryParameters);
    let temp1 = {
        departmentName: '专业特级部门',
        totalNum: 20,
        onlineNum: 12,
        peopleList:[
            {
                id: 14,
                name: '虚拟者',
                avatar:'',
                statusId: 1,
                telNo: '14562356741258632'
            },
            {
                id: 14,
                name: '虚拟者',
                avatar:'',
                statusId: 1,
                telNo: '14562356741258632'
            },
            {
                id: 14,
                name: '虚拟者',
                avatar:'',
                statusId: 1,
                telNo: '14562356741258632'
            },{
                id: 14,
                name: '虚拟者',
                avatar:'',
                statusId: 1,
                telNo: '14562356741258632'
            }
        ]
    };
    let temp2 = {
        departmentName: '专业一级部门',
        totalNum: 20,
        onlineNum: 12,
        peopleList:[
            {
                id: 14,
                name: '虚拟者',
                avatar:'',
                statusId: 1,
                telNo: '14562356741258632'
            },
            {
                id: 14,
                name: '虚拟者',
                avatar:'',
                statusId: 1,
                telNo: '14562356741258632'
            },
            {
                id: 14,
                name: '虚拟者',
                avatar:'',
                statusId: 1,
                telNo: '14562356741258632'
            },{
                id: 14,
                name: '虚拟者',
                avatar:'',
                statusId: 1,
                telNo: '14562356741258632'
            }
        ]
    };
    let temp3 = {
        departmentName: '专业二级部门',
        totalNum: 20,
        onlineNum: 12,
        peopleList:[
            {
                id: 14,
                name: '虚拟者',
                avatar:'',
                statusId: 1,
                telNo: '14562356741258632'
            },
            {
                id: 14,
                name: '虚拟者',
                avatar:'',
                statusId: 1,
                telNo: '14562356741258632'
            },
            {
                id: 14,
                name: '虚拟者',
                avatar:'',
                statusId: 1,
                telNo: '14562356741258632'
            },{
                id: 14,
                name: '虚拟者',
                avatar:'',
                statusId: 1,
                telNo: '14562356741258632'
            }
        ]
    }
    let data = [temp1,temp2,temp3];
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
Mock.mock(/\/@test\/getAllEmergencyPeople/, 'get', getAllEmergencyPeople);
