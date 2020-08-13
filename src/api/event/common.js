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
  console.log('api:getUserInfo',data);
  return request({
    url: `plan/getUserInfo`,
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
    console.log('api:getStatusDataList',data);
    return request({
        url: 'plan/getStatusDataList?_t='+ new Date().getTime(),
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
    console.log('api:getEventTypeDataList',data);
    return request({
        url: '@test/getEventTypeDataList?_t='+ new Date().getTime(),
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
  console.log('api:getTeamDataList',data);
  return request({
    url: '@test/getTeamDataList?_t='+ new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取所有人员
 * @author moxuejuan
 * @date 2019-07-12 10:53:20
 *  @method：GET
 * @response：{
 *     树形结构数据
 * }
 */

export function getPeopleDataList(data){
  console.log('api:getPeopleDataList',data);
  return request({
    url: '@test/getPeopleDataList?_t='+ new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取所有审核人员
 * @author moxuejuan
 * @date 2019-07-12 10:53:20
 *  @method：GET
 * @response：{
 *     {Number} id: 用户Id
 *     {String} name: 用户名称
 * }
 */

export function getReviewPeopleDataList(data){
  console.log('api:getReviewPeopleDataList',data);
  return request({
    url: 'plan/getReviewPeopleDataList?_t='+ new Date().getTime(),
    method: 'get',
    params: data
  })
}
