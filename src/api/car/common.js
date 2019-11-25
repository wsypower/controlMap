/*
 * @Author: Mo.xuejuan
 * @Date: 2019-09-06 14:53:20
 */

import request from '@/plugins/axios/axios'

/**
 * @description 获取用户信息
 * @author weiyafei
 * @date 2019-09-06 14:53:20
 * @param {String} userId 请求参数 :用户唯一标识符默认参数）
 */
export const getUserInfo = data => {
    console.log('api:getUserInfo',data);
    return request({
        url: `@test/getUserInfo`,
        method: 'get',
        params: data
    })
}

/**
 * @description 获取所有人员(树形结构)
 * @author moxuejuan
 * @date 2019-09-06 14:53:20
 *  @method：GET
 * @response：{
 *     树形结构数据
 * }
 */

export function getAllPeopleTreeData(data){
    console.log('api:getAllPeopleTreeData',data);
    return request({
        url: '@test/getAllPeopleTreeData?_t='+ new Date().getTime(),
        method: 'get',
        params: data
    })
}

/**
 * @description 获取所有人员(列表结构)
 * @author moxuejuan
 * @date 2019-09-06 14:53:20
 *  @method：GET
 * @response：{
 *     {Number} id: 用户Id
 *     {String} name: 用户名称
 *     {String} dept: 部门
 * }
 */

export function getAllPeopleDataList(data){
    console.log('api:getAllPeopleDataList',data);
    return request({
        url: '@test/getAllPeopleDataList?_t='+ new Date().getTime(),
        method: 'get',
        params: data
    })
}
