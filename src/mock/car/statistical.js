import {builder, getBody, getQueryParameters} from '../util'
import Mock from 'mockjs'

const getCarTypeAnalysisData = (options) => {
    console.log('getCarTypeAnalysisData options',options);
    const queryParameters = getQueryParameters(options);
    console.log('getCarTypeAnalysisData query',queryParameters);
    let data = [{
        type: '清扫车',
        id: 'qsc',
        num: 30
    },{
        type: '洒水车',
        id: 'ssc',
        num: 20
    },{
        type: '生活垃圾车',
        id: 'shljc',
        num: 30
    },{
        type: '渣土车',
        id: 'ztc',
        num: 9
    },{
        type: '餐饮垃圾车',
        id: 'cyljc',
        num: 10
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
Mock.mock(/\/@test\/getCarTypeAnalysisData/, 'get', getCarTypeAnalysisData);


const getCarGroupAnalysisData = (options) => {
    console.log('getCarGroupAnalysisData options',options);
    const queryParameters = getQueryParameters(options);
    console.log('getCarGroupAnalysisData query',queryParameters);
    let data = [{
        name: '市本级指挥中心1',
        num: 13
    }, {
        name: '市本级指挥中心2',
        num: 28
    },{
        name: '信息采集中心1',
        num: 34,
    },{
        name: '信息采集中心2',
        num: 17
    },{
        name: '信息采集中心3',
        num: 78
    },{
        name: '信息采集中心4',
        num: 31
    },{
        name: '信息采集中心5',
        num: 45
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
Mock.mock(/\/@test\/getCarGroupAnalysisData/, 'get', getCarGroupAnalysisData);


const getBreakTypeAnalysisData = (options) => {
    console.log('getBreakTypeAnalysisData options',options);
    const queryParameters = getQueryParameters(options);
    console.log('getBreakTypeAnalysisData query',queryParameters);
    let data = [{
        name: '超速',
        num: 43
    }, {
        name: '禁行路段',
        num: 38
    },{
        name: '超时停留',
        num: 34,
    },{
        name: '超范围',
        num: 178
    },{
        name: '疑似偷盗',
        num: 78
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
Mock.mock(/\/@test\/getBreakTypeAnalysisData/, 'get', getBreakTypeAnalysisData);


const getCarWorkInfoData = (options) => {
    console.log('getCarWorkInfoData options',options);
    const queryParameters = getQueryParameters(options);
    console.log('getCarWorkInfoData query',queryParameters);
    let data = [{
        type: '执法车',
        groupData: [{
            groupName: '中队名1',
            totalNum: 50,
            lc: 548,
            cslc: 223,
            yjlc: 150
        },{
            groupName: '中队名2',
            totalNum: 48,
            lc: 440,
            cslc: 165,
            yjlc: 190
        },{
            groupName: '中队名3',
            totalNum: 35,
            lc: 467,
            cslc: 324,
            yjlc: 90
        },{
            groupName: '中队名4',
            totalNum: 45,
            lc: 460,
            cslc: 245,
            yjlc: 125
        },{
            groupName: '中队名5',
            totalNum: 40,
            lc: 548,
            cslc: 380,
            yjlc: 95
        },{
            groupName: '中队名6',
            totalNum: 35,
            lc: 548,
            cslc: 354,
            yjlc: 80
        },{
            groupName: '中队名7',
            totalNum: 40,
            lc: 489,
            cslc: 310,
            yjlc: 105
        }]
    },{
        type: '渣土车',
        groupData: [{
            groupName: '中队名1',
            totalNum: 10,
            lc: 148,
            cslc: 123,
            yjlc: 50
        },{
            groupName: '中队名2',
            totalNum: 2,
            lc: 40,
            cslc: 15,
            yjlc: 0
        },{
            groupName: '中队名3',
            totalNum: 35,
            lc: 467,
            cslc: 324,
            yjlc: 90
        },{
            groupName: '中队名4',
            totalNum: 45,
            lc: 460,
            cslc: 245,
            yjlc: 125
        },{
            groupName: '中队名5',
            totalNum: 40,
            lc: 548,
            cslc: 380,
            yjlc: 95
        },{
            groupName: '中队名6',
            totalNum: 35,
            lc: 548,
            cslc: 354,
            yjlc: 80
        },{
            groupName: '中队名7',
            totalNum: 40,
            lc: 489,
            cslc: 310,
            yjlc: 105
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
Mock.mock(/\/@test\/getCarWorkInfoData/, 'get', getCarWorkInfoData);
