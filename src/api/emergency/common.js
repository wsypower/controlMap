/*
 * @Author: Mo.xuejuan
 * @Date: 2019-08-22 15:53:20
 */

import request from '@/plugins/axios/axios'


/*=====  End of Section comment block  ======*/
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
    // console.log('api:getAllLevelData',data);
    return request({
        url: 'emergencyplan/getAllLevelData?_t='+ new Date().getTime(),
        method: 'get',
        params: data
    })
}

/**
 * @description 获取所有人员
 * @author moxuejuan
 * @date 2019-08-22 08:51
 * @method： GET
 * @response：{data:{
 *     {Number} id: 人员Id
 *     {String} name: 人员名称
 *     {String} tel: 人员电话
 * }}
 */
export function getAllPeopleDataList(data){
    // console.log('api:getAllPeopleDataList',data);
    return request({
        url: 'emergencyplan/getAllPeopleDataList?_t='+ new Date().getTime(),
        method: 'get',
        params: data
    })
}
