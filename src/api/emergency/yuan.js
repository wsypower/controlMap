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
    // console.log('api：getYuAnDataList',data);
    return request({
        url: 'emergencyplan/getYuAnDataList?_t='+ new Date().getTime(),
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
    // console.log('api:addNewYuAn',data);
    return request({
        url: 'emergencyplan/addNewYuAn',
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
    // console.log('api:deleteYuAn',data);
    return request({
        url: 'emergencyplan/deleteYuAn',
        method: 'post',
        data
    })
}

/**
 * @description 根据Id获得某个预案的详细信息
 * @author moxuejuan
 * @date 2019-07-12 10:53:20
 * @param {Number} id 预案的唯一标识Id
 * @method：GET
 * @response：{
 *
 * }
 */

export function getYuAnInfoById(data){
    // console.log('api:getYuAnInfoById',data);
    return request({
        url: 'emergencyplan/getYuAnInfoById?_t='+ new Date().getTime(),
        method: 'get',
        params: data
    })
}

/**
 * @description 获取全部归类物资列表信息
 * @author moxuejuan
 * @date 2019-07-12 10:53:20
 * @param 无
 * @method：GET
 * @response：{
 *
 * }
 */

export function getResourceDataList(data){
    // console.log('api:getResourceDataList',data);
    return request({
        url: 'emergencyplan/getResourceDataList?_t='+ new Date().getTime(),
        method: 'get',
        params: data
    })
}



/**
 * @description 根据归类物资Id以及事件Id获取全部的物资地图信息
 * @author moxuejuan
 * @date 2019-08-27 10:53:20
 * @param {Number} rTypeId 归类物资的唯一标识Id
 * @param {Number} eventId 事件Id
 * @method：GET
 * @response：{
 *
 * }
 */

export function getMapInfoByEventIdAndRTypeId(data){
    // console.log('api:getMapInfoByEventIdAndRTypeId',data);
    return request({
        url: 'emergencyplan/getMapInfoByEventIdAndRTypeId?_t='+ new Date().getTime(),
        method: 'get',
        params: data
    })
}
