import request from '@/plugins/axios/axios'
/**
 * @description 获取某个预案的实时监测信息
 * @author moxuejuan
 * @date 2019-08-08 15:53:20
 * @param {Number} id 预案的唯一标识Id
 * @method： GET
 * @response：{data:{
 *     {String} name: 预案名称
 *     {Object} peopleMonitor: 人员到岗监测
 *     {Object} caseMonitor: 案件监测
 * }}
 */

export function getMonitorInfoById(data){
    console.log('api:getMonitorInfoById',data);
    return request({
        url: '@test/getMonitorInfoById?_t='+ new Date().getTime(),
        method: 'get',
        params: data
    })
}



