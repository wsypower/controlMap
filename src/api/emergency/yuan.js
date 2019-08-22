/*
 * @Author: Mo.xuejuan
 * @Date: 2019-07-08 15:53:20
 */

import request from '@/plugins/axios/axios'

/**
 * @description 获取应急预案列表数据
 * @author moxuejuan
 * @date 2019-07-08 15:53:20
 * @param {String} searchContent 请求参数 :搜索关键字（title或者description）
 * @method： GET
 * @response：{data:{
 *     {Number} 预案id
 *     {String} name: 预案名称
 *
 * }}
 */

export function getYuAnDataList(data){
    console.log('api：getYuAnDataList',data);
    return request({
        url: '@test/getYuAnDataList?_t='+ new Date().getTime(),
        method: 'get',
        params: data
    })
}

/**
 * @description 增加新预案
 * @author moxuejuan
 * @date 2019-07-08 15:53:20
 * @param {String} name 请求参数：预案名称
 * @param {String} stageData 请求参数：预案阶段数据
 * @param {String} peopleData 请求参数：预案成员数据
 * @param {String} resourceData 请求参数：预案资源数据
 * @param {String} placeData 请求参数：预案场地数据
 * @method：POST
 * @response：{
 *     msg:'操作成功;
 * }
 */

export function addNewYuAn(data){
    console.log('api:addNewYuAn',data);
    return request({
        url: '@test/addNewYuAn',
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

export function deleteYuAn(data){
    console.log('api:deleteYuAn',data);
    return request({
        url: '@test/deleteYuAn',
        method: 'post',
        data
    })
}

/**
 * @description 根据Id获得某个预案的详细信息
 * @author moxuejuan
 * @date 2019-07-12 10:53:20
 * @param {Number} id 预案的唯一标识Id
 * @method：POST
 * @response：{
 *
 * }
 */

export function getYuAnInfoById(data){
    console.log('api:getYuAnInfoById',data);
    return request({
        url: '@test/getYuAnInfoById?_t='+ new Date().getTime(),
        method: 'get',
        params: data
    })
}
