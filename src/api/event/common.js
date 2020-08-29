/*
 * @Author: Mo.xuejuan
 * @Date: 2019-08-08 15:53:20
 */

import request from '@/plugins/axios/axios'

/**
 * @description 登录获取用户信息和权限
 * @author weiyafei
 * @date 2019-06-27-21:25:58
 * @param {String} userId 请求参数 :用户唯一标识符默认参数）
 */
export const getUserInfo = data => {
  return request({
    url: `planEvent/getUserInfo`,
    method: 'get',
    params: data
  })
}

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
    return request({
        url: '@test/getStatusDataList?_t='+ new Date().getTime(),
        method: 'get',
        params: data
    })
}

/**
 * @description 获取所有类型数据
 * @author moxuejuan
 * @date 2020-08-12 11:18:20
 * @method： GET
 * @response：{data:{
 *     {Number} id: 类型Id
 *     {String} name: 类型名称
 * }}
 */
export function getEventTypeDataList(data){
    return request({
        url: 'planEvent/getEventTypeDataList?_t='+ new Date().getTime(),
        method: 'get',
        params: data
    })
}

/**
 * @description 获取所有中队数据
 * @author moxuejuan
 * @date 2020-08-12 04:59:20
 * @method： GET
 * @response：{data:{
 *     {Number} id: 中队Id
 *     {String} name: 中队名称
 * }}
 */
export function getTeamDataList(data){
  return request({
    url: 'planEvent/getTeamDataList?_t='+ new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 根据入参获取所有人员（非树形结构）
 * @author moxuejuan
 * @date 2020-08-14 17：12：20
 *  @method：GET
 * @response：{
 *     非树形结构数据
 * }
 */

export function getPeopleDataList(data){
  return request({
    url: 'planEvent/getDetailPeopleDataList?_t='+ new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 根据入参获取所有人员（树形结构）
 * @author moxuejuan
 * @date 2020-08-14 17：12：20
 *  @method：GET
 * @response：{
 *     树形结构数据
 * }
 */

export function getPeopleTreeData(data){
  return request({
    url: 'planEvent/getPeopleTreeData?_t='+ new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取路段信息（树形结构）
 * @author moxuejuan
 * @date 2020-08-21 08：41：20
 *  @method：GET
 * @response：{
 *     树形结构数据
 * }
 */

export function getLoadTreeData(data){
  return request({
    url: 'planEvent/getLoadTreeData?_t='+ new Date().getTime(),
    method: 'get',
    params: data
  })
}
