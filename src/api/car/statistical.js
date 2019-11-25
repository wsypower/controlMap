/*
 * @Author: Mo.xuejuan
 * @Date: 2019-11-25 14:53:20
 */

import request from '@/plugins/axios/axios'

/**
 * @description 获取车辆类型数据
 * @author moxuejuan
 * @date 2019-11-25 14:53:20
 * @param {String} userId 请求参数 :用户唯一标识符默认参数）
 * @method：GET
 * @response：{
 *     {String} type: 车辆类型
 *     {Number} num: 数量
 * }
 */
export const getCarTypeAnalysisData = data => {
    console.log('api:getCarTypeAnalysisData',data);
    return request({
        url: '@test/getCarTypeAnalysisData?_t='+ new Date().getTime(),
        method: 'get',
        params: data
    })
}

/**
 * @description 获取车辆分组数据
 * @author moxuejuan
 * @date 2019-11-25 14:53:20
 * @method：GET
 * @response：{
 *     {String} name: 部门名称,
 *     {Number}num: 车辆总数
 * }
 */

export function getCarGroupAnalysisData(data){
    console.log('api:getCarGroupAnalysisData',data);
    return request({
        url: '@test/getCarGroupAnalysisData?_t='+ new Date().getTime(),
        method: 'get',
        params: data
    })
}

/**
 * @description 获取违规类型数据
 * @author moxuejuan
 * @date 2019-11-25 14:53:20
 *  @method：GET
 * @response：{
 *     {String} name: 违规类型名称
 *     {Number} num: 次数
 * }
 */

export function getBreakTypeAnalysisData(data){
    console.log('api:getBreakTypeAnalysisData',data);
    return request({
        url: '@test/getBreakTypeAnalysisData?_t='+ new Date().getTime(),
        method: 'get',
        params: data
    })
}

/**
 * @description 获取中队工作数据
 * @author moxuejuan
 * @date 2019-11-25 15:53:20
 *  @method：GET
 * @response：{
 *     {Number} id: 用户Id
 *     {String} type: 车辆类型
 *     {String} groupData: 中队数据
 * }
 */

export function getCarWorkInfoData(data){
    console.log('api:getCarWorkInfoData',data);
    return request({
        url: '@test/getCarWorkInfoData?_t='+ new Date().getTime(),
        method: 'get',
        params: data
    })
}
