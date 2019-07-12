import {builder, getBody, getQueryParameters} from '../util'
import Mock from 'mockjs'

const getEmergencyYuAnList = (options) => {
    console.log(options)
    const queryParameters = getQueryParameters(options);
    console.log(queryParameters);
    // const kkk = getBody(options)
    // console.log('getEmergencyYuAnList body',kkk);
    let image={
        basefile:{
            extension: ".png",
            height: 60,
            lengthK: 1,
            newName: "20190712090917893.png",
            newPath: "http://192.168.71.33:50000//upload/file/2019/07/12/20190712090917893.png",
            oldName: "waiyuan.png",
            originPath: "/upload/file/2019/07/12/20190712090917893.png",
            type: "image",
            width: 60
        }
    };
    let fileList=[{
        append: true,
        basefile: {
            extension: ".rar",
            height: 0,
            lengthK: 4,
            newName: "201907120943289097.rar",
            newPath: "http://192.168.71.33:50000//upload/file/2019/07/12/201907120943289097.rar",
            oldName: "adress.rar",
            originPath: "/upload/file/2019/07/12/201907120943289097.rar",
            type: "other",
            width: 0
        },
        initialPreview: ["<div class='file-preview-other'><h2><a href='http://192.168.71.33:50000//upload/file/2019/07/12/201907120943289097.rar' target='_blank'><i class='glyphicon glyphicon-file'></i></a></h2></div>"],
        initialPreviewConfig: [{
            caption: "adress.rar",
            key: "201907120943289097.rar",
            url: "http://192.168.71.33:50000/file//file/deleteFileWeb?path=/upload/file/2019/07/12/201907120943289097.rar"
        }]
    }];
    return builder(
        {
            code: 0,
            data: [{'id':0,'typeId':0,'typeName':'消防安全','levelId': 0,'levelName':'重大','statusId':0,'statusName':'未开始','description':'xxx路与yyyy路交叉口烧烤店起火。','dayTime':'2019-07-25','position':'xxx路与yyyy路交叉口','areaId':2,'areaName':'圆形','image':image,'fileList':fileList},
                {'id':1,'typeId':1,'typeName':'地震灾害','levelId': 1,'levelName':'一般','statusId':1,'statusName':'进行中','description':'xxx县有1.4级地震，震源在深3500公里的地方。','dayTime':'2019-07-11','position':'xxxx县','areaId':2,'areaName':'圆形','image':image,'fileList':fileList},
                {'id':2,'typeId':3,'typeName':'洪涝灾害','levelId': 1,'levelName':'一般','statusId':2,'statusName':'已完成','description':'烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火。','dayTime':'2019-07-05','position':'华星路99号','areaId':3,'areaName':'多边形','image':image,'fileList':fileList},
            ],
            total: 3
        },
        '请求成功',
        0,
        { 'Custom-Header': Mock.mock('@id') }
    )
}
Mock.mock(/\/@test\/getEmergencyYuAnList/, 'get', getEmergencyYuAnList);

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
    const queryParameters = getQueryParameters(options);
    console.log('deleteEmergencyYuAn query',queryParameters);
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
