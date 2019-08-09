import {builder, getBody, getQueryParameters} from '../util'
import Mock from 'mockjs'

const getStatusDataList = (options) => {
    console.log('getStatusDataList options',options);
    const queryParameters = getQueryParameters(options);
    console.log('getStatusDataList query',queryParameters);
    let data = [{'id':'001','name':'待提交'},
        {'id':'002','name':'待审核'},
        {'id':'003','name':'已同意'},
        {'id':'004','name':'已驳回'},
        {'id':'005','name':'未开始'},
        {'id':'006','name':'进行中'},
        {'id':'007','name':'已结束'},
        {'id':'008','name':'已逾期作废'}];
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
Mock.mock(/\/@test\/getStatusDataList/, 'get', getStatusDataList);


const getYuAnTypeDataList = (options) => {
    console.log('getYuAnTypeDataList options',options);
    const queryParameters = getQueryParameters(options);
    console.log('getYuAnTypeDataList query',queryParameters);
    let data = [{'id':'001','name':'一级预案'},
        {'id':'002','name':'二级预案'},
        {'id':'003','name':'三级预案'},
        {'id':'004','name':'保障预案'},
        {'id':'005','name':'其他预案'}];
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
Mock.mock(/\/@test\/getYuAnTypeDataList/, 'get', getYuAnTypeDataList);

