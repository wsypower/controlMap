/*
 * @Author: Mo.xuejuan
 * @Date: 2019-07-08 15:53:20
 */

import request from '@/plugins/axios/axios'
/*========================================
=            request example             =
=========================================*/

/**
 * @description 获取事件列表数据
 * @author moxuejuan
 * @date 2019-07-08 15:53:20
 * @param {String} searchContent 请求参数 :搜索关键字（title或者description）
 * @param {Number} status 请求参数 :状态，''为不考虑状态
 * @param {Number} pageNo 请求参数 :当前页
 * @param {Number} pageSize 请求参数 :当前页条数
 * @method： GET
 * @response：{data:{
 *     {Number} id
 *     {String} name：事件名称
 *     {Number} typeId: 类型Id
 *     {String} typeName: 类型名称
 *     {Number} levelId: 等级Id
 *     {String} levelName：等级名称
 *     {Number} statusId：状态Id
 *     {String} statusName：状态名称
 *     {String} position：位置
 *     {Number} startDay： 开始时间
 *     {Number} endDay： 结束时间
 *     {String} description：信息
 *     {Number} areaId：区域Id
 *     {String} areaName：区域名称
 *     {Number} mapId: 地图Id
 *     {Number} positionX： 区域中心X
 *     {Number} positionY： 区域中心Y
 *     {Object} image：上传的照片
 *     {Array} file：上传的附件
 *
 * }}
 */

export function getEventDataList(data){
    // console.log('api：getEventDataList',data);
    return request({
        url: 'emergencyplan/getEventDataList?_t='+ new Date().getTime(),
        method: 'get',
        params: data
    })
}

/**
 * @description 增加新事件
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

export function addNewEvent(data){
    // console.log('api:addNewEvent',data);
    return request({
        url: 'emergencyplan/addNewEvent',
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

export function deleteEvent(data){
    // console.log('api:deleteEvent',data);
    return request({
        url: 'emergencyplan/deleteEvent',
        method: 'post',
        data
    })
}



/**
 * @description 启动预案获取的初始详细信息
 * @author moxuejuan
 * @date 2019-07-12 10:53:20
 * @param {Number} id 事件的唯一标识Id
 * @method：POST
 * @response：{
 *
 * }
 */

export function getEventYuAnInfoById(data){
    // console.log('api:getEventYuAnInfoById',data);
    return request({
        url: 'emergencyplan/getEventYuAnInfoById?_t='+ new Date().getTime(),
        method: 'get',
        params: data
    })
}


/**
 * @description 启动预案
 * @author moxuejuan
 * @date 2019-07-12 10:53:20
 * @param {Number} id 事件的唯一标识Id
 * @param {String} stageData 请求参数：预案阶段数据
 * @param {String} peopleData 请求参数：预案成员数据
 * @param {String} resourceData 请求参数：预案资源数据
 * @param {String} placeData 请求参数：预案场地数据
 * @method：POST
 * @response：{
 *
 * }
 */

export function startYuAn(data){
    // console.log('api:getEventYuAnInfoById',data);
    return request({
        url: 'emergencyplan/startNewYuAn',
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
    // console.log('api:getAllEmergencyPeople',data);
    return request({
        url: 'emergencyplan/getUserList?_t='+ new Date().getTime(),
        method: 'get',
        params: data
    })
}


/**
 * @description 根据userId获取人员信息
 * @author moxuejuan
 * @date 2019-07-12 10:53:20
 * @param {String} Id 用户Id
 * @method：GET
 * @response：{
 *     data:[{
 *         {String} dept: 部门名称
 *         {String} isonline: 是否在线
 *         {String} phone：联系电话
 *         {String} realname：真实姓名
 *     }]
 * }
 */

export function getPersonInfo(data){
    // console.log('api:getPersonInfo',data);
    return request({
        url: 'emergencyplan/getUserById?_t='+ new Date().getTime(),
        method: 'get',
        params: data
    })
}


