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
 * @description 获取所有类型数据
 * @author moxuejuan
 * @date 2019-07-08 15:53:20
 * @method： GET
 * @response：{data:{
 *     {Number} id: 类型Id
 *     {String} name: 类型名称
 * }}
 */
export function getAllTypeData(data){
    console.log('api:getAllTypeData',data);
    return request({
        url: '@test/getAllTypeData?_t='+ new Date().getTime(),
        method: 'get',
        params: data
    })
}

/**
 * @description 获取所有等级数据
 * @author moxuejuan
 * @date 2019-07-08 15:53:20
 * @method： GET
 * @response：{data:{
 *     {Number} id: 等级Id
 *     {String} name: 等级名称
 * }}
 */
export function getAllLevelData(data){
    console.log('api:getAllLevelData',data);
    return request({
        url: '@test/getAllLevelData?_t='+ new Date().getTime(),
        method: 'get',
        params: data
    })
}


/**
 * @description 获取所有类型，等级数据
 * @author moxuejuan
 * @date 2019-07-18 15:53:20
 * @method： GET
 * @response：{data:{
 *     {Number} id: 等级Id
 *     {String} name: 等级名称
 * }}
 */
export function getEmergencyYuAnInitData(data){
    console.log('api:getEmergencyYuAnInitData',data);
    return request({
        url: 'emergencyplan/getEmergencyYuAnInitData?_t='+ new Date().getTime(),
        method: 'get',
        params: data
    })
}

/**
 * @description 登录应急预案列表数据
 * @author moxuejuan
 * @date 2019-07-08 15:53:20
 * @param {String} searchContent 请求参数 :搜索关键字（title或者description）
 * @param {Number} status 请求参数 :状态，''为不考虑状态
 * @param {Number} pageNo 请求参数 :当前页
 * @param {Number} pageSize 请求参数 :当前页条数
 * @method： GET
 * @response：{data:{
 *     {Number} id
 *     {Number} typeId: 类型Id
 *     {String} typeName: 类型名称
 *     {Number} levelId: 等级Id
 *     {String} levelName：等级名称
 *     {Number} statusId：状态Id
 *     {String} statusName：状态名称
 *     {String} position：位置
 *     {String} dayTime：时间
 *     {String} description：信息
 *     {Number} areaId：区域Id
 *     {String} areaName：区域名称
 *     {Object} image：上传的照片
 *     {Array} file：上传的附件
 *
 * }}
 */

export function getEmergencyYuAnList(data){
    console.log('api：getEmergencyYuAnList',data);
    return request({
        url: 'emergencyplan/getEmergencyYuAnList?_t='+ new Date().getTime(),
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
 * @method：POST
 * @response：{
 *     msg:'操作成功;
 * }
 */

export function addNewEmergencyYuAn(data){
    console.log('api:addNewEmergencyYuAn',data);
    return request({
        url: 'emergencyplan/addNewEmergencyYuAn',
        method: 'post',
        data
    })
}

/**
 * @description 删除某个预案
 * @author moxuejuan
 * @date 2019-07-12 10:53:20
 * @param {Number} id 预案的唯一标识Id
 * @method：POST
 * @response：{
 *     msg:'操作成功;
 * }
 */

export function deleteEmergencyYuAn(data){
    console.log('api:deleteEmergencyYuAn',data);
    return request({
        url: '@test/deleteEmergencyYuAn',
        method: 'post',
        data
    })
}

/**
 * @description 获取远程呼叫所有人员
 * @author moxuejuan
 * @date 2019-07-12 10:53:20
 * @param {String} searchName 请求参数：搜索联系人
 * @param {Number} statusId 请求参数：状态Id：是否在线
 *  @method：GET
 * @response：{
 *     data:[{
 *         {String} departmentName: 部门名称
 *         {Number} totalNum: 部门人员总数
 *         {Number} onlineNum：部门人员在线总数
 *         peopleList:[{
 *             {Number} id: 人员的Id
 *             {String} name: 人员名称
 *             {String} avatar：人员头像，全路径
 *             {Number} statusId: 人员状态Id
 *             {String} telNo: 人员视频联络号
 *         }]
 *     }]
 * }
 */

export function getAllEmergencyPeople(data){
    console.log('api:getAllEmergencyPeople',data);
    return request({
        url: '@test/getAllEmergencyPeople?_t='+ new Date().getTime(),
        method: 'get',
        params: data
    })
}
