/*
 * @Author: Mo.xuejuan
 * @Date: 2019-07-08 15:53:20
 */

import request from '@/plugins/axios/axios'
/*========================================
=            request example             =
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
 *    return request({
 *      url: `@test/login`,
 *      method: 'get',
 *      params: {
 *        id
 *      }
 *    })
 * }
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
 * @description 登录应急预案列表数据
 * @author moxuejuan
 * @date 2019-07-08 15:53:20
 * @param {String} searchContent 请求参数 :搜索关键字（title或者description）
 * @param {Number} status 请求参数 :状态，''为不考虑状态
 * @param {Number} pageNo 请求参数 :当前页
 * @param {Number} pageSize 请求参数 :当前页条数
 */

export function getEmergencyYuAnList(data){
    // console.log('api',data);
    return request({
        url: '@test/getEmergencyYuAnList?_t='+ new Date().getTime(),
        method: 'get',
        params: data
    })
}

/**
 * @description 增加新预案
 * @author moxuejuan
 * @date 2019-07-08 15:53:20
 * @param {String} searchContent 请求参数 :搜索关键字（title或者description）
 * @param {Number} status 请求参数 :状态，''为不考虑状态
 * @param {Number} pageNo 请求参数 :当前页
 * @param {Number} pageSize 请求参数 :当前页条数
 */

export function addNewEmergencyYuAn(data){
    console.log('api:addNewEmergencyYuAn',data);
    return request({
        url: '@test/addNewEmergencyYuAn',
        method: 'post',
        data
    })
}
