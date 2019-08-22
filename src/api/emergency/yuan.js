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
    console.log('api：getYuAnList',data);
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
