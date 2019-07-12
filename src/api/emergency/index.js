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
    console.log('api：getEmergencyYuAnList',data);
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
 * @param {Number} typeId 请求参数：类型Id
 * @param {Number} levelId 请求参数：等级Id
 * @param {Number} statusId 请求参数：状态Id
 * @param {String} dayTime 请求参数：时间
 * @param {String} position 请求参数：位置
 * @param {String} description 请求参数：信息
 * @param {Number} areaId 请求参数：区域
 * @param {Object} image 请求参数：照片
 * @param {Array} fileList 请求参数：附件
 */

export function addNewEmergencyYuAn(data){
    console.log('api:addNewEmergencyYuAn',data);
    return request({
        url: '@test/addNewEmergencyYuAn',
        method: 'post',
        data
    })
}

/**
 * @description 删除某个预案
 * @author moxuejuan
 * @date 2019-07-12 10:53:20
 * @param {Number} id 预案的唯一标识Id
 */

export function deleteEmergencyYuAn(data){
    console.log('api:deleteEmergencyYuAn',data);
    return request({
        url: '@test/deleteEmergencyYuAn',
        method: 'get',
        params: data
    })
}

/**
 * @description 获取远程呼叫所有人员
 * @author moxuejuan
 * @date 2019-07-12 10:53:20
 * @param {String} searchName 请求参数：搜索联系人
 * @param {String} status 请求参数：状态：是否在线
 *
 */

export function getAllEmergencyPeople(data){
    console.log('api:getAllEmergencyPeople',data);
    return request({
        url: '@test/getAllEmergencyPeople',
        method: 'get',
        params: data
    })
}
