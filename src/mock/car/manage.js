import {builder, getBody, getQueryParameters} from '../util'
import Mock from 'mockjs'

const getAllCarTreeData = options => {
    console.log('getAllCarTreeData options',options);
    const body = getBody(options);
    console.log('getAllCarTreeData body',body);
    let data = [{
        name: '智慧城管',
        id: 'chengguan',
        isLeaf: false,
        children:[{
            name: '信息采集中心',
            id: 'xinxi',
            isLeaf: false,
            children: [{
                name: "浙GN8P80",
                id: "861996030365941",
                carNumber: "浙GN8P80",
                code: '浙GN8P80',
                flag: '浙GN8P80',
                phone: '14212412512',
                gpsTime: 1574730352000,
                online: false,
                x: "122.206714",
                y: "30.245535",
                isLeaf: true
            },{
                name: "浙GB3F66",
                id: "861996030369604",
                carNumber: "浙GB3F66",
                code: '浙GB3F66',
                flag: '浙GB3F66',
                phone: '14212412512',
                gpsTime: 1574695055000,
                online: true,
                x: "122.206714",
                y: "30.245535",
                isLeaf: true
            }, {
                name: "浙GD01039",
                id: "861996030370263",
                carNumber: "浙GD01039",
                code: '浙GD01039',
                flag: '浙GD01039',
                phone: '14212412512',
                gpsTime: 1574730528000,
                online: true,
                x: "119.62399883414247",
                y: "29.07119100775157",
                isLeaf: true
            }]
        },{
            name: '第一中队',
            id: 'yizhongdui',
            isLeaf: false,
            children: [{
                name: "浙GC8B01",
                id: "861996030376930",
                carNumber: "浙GC8B01",
                code: '浙GC8B01',
                flag: '浙GC8B01',
                phone: '14212412512',
                gpsTime: 1574730537000,
                online: true,
                x: "119.64706984131524",
                y: "29.09840347291763",
                isLeaf: true
            }, {
                name: "浙GZ0G66",
                id: "861996030365958",
                carNumber: "浙GZ0G66",
                code: '浙GZ0G66',
                flag: '浙GZ0G66',
                phone: '14212412512',
                gpsTime: 1574653032000,
                online: false,
                x: "119.6612536774609",
                y: "29.09780620397094",
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
            isLeaf: false,
            children: [{
                name: "浙G1923M",
                id: "861996030369620",
                carNumber: "浙G1923M",
                code: '浙G1923M',
                flag: '浙G1923M',
                phone: '14212412512',
                gpsTime: 1574729844000,
                online: true,
                x: "119.64009925849292",
                y: "29.084221957704376",
                isLeaf: true
            }, {
                name: "浙GD02667",
                id: "861996030370297",
                carNumber: "浙GD02667",
                code: '浙GD02667',
                flag: '浙GD02667',
                phone: '14212412512',
                gpsTime: 1574584935000,
                online: true,
                x: "119.65797838272466",
                y: "29.07670247599889",
                isLeaf: true
            }, {
                name: "浙GD06752",
                id: "861996030376641",
                carNumber: "浙GD06752",
                code: '浙GD06752',
                flag: '浙GD06752',
                phone: '14212412512',
                gpsTime: 1574672080000,
                online: true,
                x: "119.64020518008596",
                y: "29.084231736936314",
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
Mock.mock(/\/@test\/getAllCarTreeData/, 'post', getAllCarTreeData);

const getUserWorkInfoData = (options) => {
    console.log('getUserWorkInfoData options',options);
    const queryParameters = getQueryParameters(options);
    console.log('getUserWorkInfoData query',queryParameters);
    let data = {
        br_sbs: 2,
        br_hss: 10,
        br_hcs: 20,
        br_fqs: 0,

        bh_sbs: 214,
        bh_hss: 320,
        bh_hcs: 136,
        bh_fqs: 17
    };
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
Mock.mock(/\/@test\/getUserWorkInfoData/, 'get', getUserWorkInfoData);

const getUserTrailDataList = (options) => {
    console.log('getUserTrailDataList options',options);
    const queryParameters = getQueryParameters(options);
    console.log('getUserTrailDataList query',queryParameters);
    let data = {
        list:[{
                index: '01',
                startTime: 1564961494783,
                endTime: 1564961880960
            },
            {
                index: '02',
                startTime: 1564962352718,
                endTime: 1564963660184
            },{
                index: '03',
                startTime: 1564964046637,
                endTime: 1564964340783
            },{
                index: '04',
                startTime: 1565163204326,
                endTime: 1565164464569
            },{
                index: '05',
                startTime: 1565164703221,
                endTime: 1565165818051
            },{
                index: '06',
                startTime: 1565752350553,
                endTime: 1565755772150
            }
        ],
        total: 6};
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
Mock.mock(/\/@test\/getUserTrailDataList/, 'post', getUserTrailDataList);

const getTrailDetailData = (options) => {
    console.log('getTrailDetailData options',options);
    const queryParameters = getQueryParameters(options);
    console.log('getTrailDetailData query',queryParameters);
    let data = [{
        coordinatex: "122.22062999999999",
        coordinatey: "30.262163",
        createtime: 1564961494783,
        geom: "geom",
        gpstime: 1564961494783,
        gpsx: "122.22062999999999",
        gpsy: "30.262163",
        id: "ff65e0d0b70f11e94084da2335b942ab",
        operate: "99",
        remark: "true",
        userId: "557c6850a4e611e856f64dd5bc2aa7bb"
    },{
        coordinatex: "122.20669448375702",
        coordinatey: "30.24557590484619",
        createtime: 1564961509683,
        geom: "geom",
        gpstime: 1564961509683,
        gpsx: "122.20669448375702",
        gpsy: "30.24557590484619",
        id: "083dac10b71011e94084da2335b942ab",
        operate: "99",
        remark: "true",
        userId: "557c6850a4e611e856f64dd5bc2aa7bb"
    },{
        coordinatex: "122.20669448375702",
        coordinatey: "30.24557590484619",
        createtime: 1564961524708,
        geom: "geom",
        gpstime: 1564961524708,
        gpsx: "122.20669448375702",
        gpsy: "30.24557590484619",
        id: "113115a0b71011e94084da2335b942ab",
        operate: "99",
        remark: "true",
        userId: "557c6850a4e611e856f64dd5bc2aa7bb"
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
Mock.mock(/\/@test\/getTrailDetailData/, 'get', getTrailDetailData);

const getUserWorkTimeDataList = (options) => {
    console.log('getUserWorkTimeDataList options',options);
    const queryParameters = getQueryParameters(options);
    console.log('getUserWorkTimeDataList query',queryParameters);
    let data = {
        list:[{
            id: 'jasgdhsadhfsadhsad0',
            day: '2019-09-02',
            signInTime: 1564961494783,
            signOutTime: 1564961880960
        },{
            id: 'jasgdhsadhfsadhsad1',
            day: '2019-08-31',
            signInTime: 1564962352718,
            signOutTime: 1564963660184
        },{
            id: 'jasgdhsadhfsadhsad2',
            day: '2019-08-30',
            signInTime: 1564964046637,
            signOutTime: null
        },{
            id: 'jasgdhsadhfsadhsad3',
            day: '2019-08-29',
            signInTime: 1565163204326,
            signOutTime: 1565164464569
        },{
            id: 'jasgdhsadhfsadhsad4',
            day: '2019-08-28',
            signInTime: 1565164703221,
            signOutTime: 1565165818051
        },{
            id: 'jasgdhsadhfsadhsad5',
            day: '2019-08-27',
            signInTime: 1565752350553,
            signOutTime: 1565755772150
        }],
        total: 6};
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
Mock.mock(/\/@test\/getUserWorkTimeDataList/, 'post', getUserWorkTimeDataList);

const getUserSignDetailData = (options) => {
    console.log('getUserSignDetailData options',options);
    const queryParameters = getQueryParameters(options);
    console.log('getUserSignDetailData query',queryParameters);
    let data = {
        signIn: {
            time: 1564961494783,
            positionX: '120',
            positionY: '33',
            fileList: [{
                name: '1567387712203.jpg',
                url: 'http://61.153.37.213:8087/upload/file/2019/09/02/2019090209285388169.jpg'
            },
            {
                name: '1567647711557.jpg',
                url: 'http://61.153.37.213:8087/upload/file/2019/09/05/20190905094208620997.jpg'
            }]
        },
        signOut: {
            time: 1564961880960,
            positionX: '120',
            positionY: '33',
            fileList: [{
                name: 'xxxx.jpg',
                url: 'xxxxxxx'
            }]
        }
    };
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
Mock.mock(/\/@test\/getUserSignDetailData/, 'post', getUserSignDetailData);

const getUserViolateRulesDataList = (options) => {
    console.log('getUserViolateRulesDataList options',options);
    const queryParameters = getQueryParameters(options);
    console.log('getUserViolateRulesDataList query',queryParameters);
    let data = [{
            userId: 'jhsjhdhdj',
            name: '甄某某',
            dept: '信息采集中心',
            vLog:[{
                id: 'sjgjgjgjhgjdsa0',
                startTime: 1564961494783,
                endTime: 1564961880960,
                vType: '越界'
            },{
                id: 'sjgjgjgjhgjdsa1',
                signInTime: 1564962352718,
                signOutTime: 1564963660184,
                vType: '越界'
            },{
                id: 'sjgjgjgjhgjdsa2',
                startTime: 1564964046637,
                endTime: 1564964340783,
                vType: '越界'
            }],
        }, {
            userId: 'erghjhdhdjfdgfhfghg',
            name: '何某',
            dept: '信息采集中心',
            vLog:[{
                id: 'sjgjgjgjhgjdsa3',
                startTime: 1565164703221,
                endTime: 1565165818051,
                vType: '越界'
            },{
                id: 'sjgjgjgjhgjdsa4',
                startTime: 1565752350553,
                endTime: 1565755772150,
                vType: '不在岗'
            }]
        },
    ];
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
Mock.mock(/\/@test\/getUserViolateRulesDataList/, 'post', getUserViolateRulesDataList);

const deleteUserViolateRules = (options) => {
    console.log('deleteUserViolateRules options',options);
    const queryParameters = getQueryParameters(options);
    console.log('deleteUserViolateRules query',queryParameters);
    let data = {
        msg: '操作成功'
    };
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
Mock.mock(/\/@test\/deleteUserViolateRules/, 'post', deleteUserViolateRules);