/*
 * @Author: Mo.xuejuan
 * @Date: 2019-08-08 15:53:20
 */

import request from '@/plugins/axios/axios'

/**
 * @description 获取所有状态数据
 * @author moxuejuan
 * @date 2019-08-08 14:53:20
 * @method： GET
 * @response：{data:{
 *     {Number} id: 状态Id
 *     {String} name: 状态名称
 * }}
 */
export function getStatusDataList(data){
    console.log('api:getStatusDataList',data);
    return request({
        url: '@test/getStatusDataList?_t='+ new Date().getTime(),
        method: 'get',
        params: data
    })
}

/**
 * @description 获取所有类型数据
 * @author moxuejuan
 * @date 2019-08-08 15:53:20
 * @method： GET
 * @response：{data:{
 *     {Number} id: 类型Id
 *     {String} name: 类型名称
 * }}
 */
export function getYuAnTypeDataList(data){
    console.log('api:getYuAnTypeDataList',data);
    return request({
        url: '@test/getYuAnTypeDataList?_t='+ new Date().getTime(),
        method: 'get',
        params: data
    })
}
