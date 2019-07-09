/*
 * @Author: wei.yafei
 * @Date: 2019-06-27 21:26:07
 * @Last Modified by: wei.yafei 
 * @Last Modified time: 2019-07-09 14:38:03
 */

import request from '@/plugins/axios/axios'

/*========================================
=            request Example             =
=========================================*/

/*----------  post 请求示例 ----------*/
/**
 * export const AccountLogin = data => {
 *   return request({
 *     url: `@test/login`,
 *     method: 'post',
 *     data
 *   })
 * }
 */

/*----------  get 请求示例  ----------*/
/**
 *export const Account = id => {
 * return request({
 *   url: `@test/login`,
 *   method: 'get',
 *   param: {
 *     id
 *   }
 * })
 */

/*--------- delete 请求示例  --------*/
/**
 *export const deleteRole = id => {
 *  return request({
 *    url: `/role/${id}`,
 *    method: 'delete'
 *  })
 *}
 */

/*----------  put 请求示例  ----------*/
/**
 *export const updateRole = data => {
 *  return request({
 *     url: `/role/${id}`,
 *     method: 'put',
 *     data
 *   })
 * }
 */

/*=====  End of Section comment block  ======*/

/**
 * @description 登录获取用户信息和权限
 * @author weiyafei
 * @date 2019-06-27-21:25:58
 * @param {String} userId 请求参数 :用户唯一标识符默认参数）
 */
export const AccountLogin = data => {
  return request({
    url: `@test/login`,
    method: 'post',
    data
  })
}
