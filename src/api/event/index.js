import request from '@/plugins/axios/axios'

/**
 * @description 获取我的待处理的个数
 * @author moxuejuan
 * @date 2020-08-12 08：59：45
 * @param {String} userId 请求参数
 * @param {String} statusId 请求参数：处理状态：待处理
 * @param {Boolean} isMyEvent 请求参数: 是否是我的事件
 * @method：GET
 * @response：{
 *     count
 * }
 */

export function getCountForHandle(data){
  console.log('api:getCountForHandle',data);
  return request({
    url: 'planEvent/getCountForHandle?_t='+ new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取已有的事件
 * @author moxuejuan
 * @date 2020-08-12 09：26：45
 * @param {String} userId请求参数：创建者（不需要传入，使用登入用户）
 * @param {Number} typeId 请求参数：事件类型Id（一级、二级、三级）
 * @param {String} statusId 请求参数：事件处理状态Id（待处理、已处理、其他部门处理中）
 * @param {Boolean} isTemplate 请求参数：事件模板
 * @param {Boolean} isMyEvent 请求参数：我的事件
 * @param {String} searchContent：请求参数：搜索关键字
 * @param {Number} pageNo：请求参数：当前页
 * @param {Number} pageSize：请求参数：当前页条数，现在默认12条
 * @method： POST
 * @response：{data:{
 *     {String} id: 事件唯一Id
 *     {String} name: 事件名称
 *     {String} typeId: 事件类型Id
 *     {String} typeName: 事件类型名称
 *     {String} startDayTime: 保障开始时间
 *     {String} endDayTime: 保障结束时间
 *     {Number} processId：审核进度Id
 *     {String} processName：审核进度名称
 *     {Number} statusId：处理状态Id
 *     {String} statusName：处理状态名称
 *     {Boolean} isTemplate: 是否是模板预案
 * }}
 */

export function getEventList(data){
    console.log('api：getEventList',data);
    return request({
        url: `planEvent/getEventList`,
        method: 'post',
        data
    })
}

/**
 * @description 增加新事件
 * @author moxuejuan
 * @date 2019-07-08 15:53:20
 * @param {String} userId请求参数：创建者（不需要传入，使用登入用户）
 * @param {String} name 请求参数：预案名称
 * @param {Number} typeId 请求参数：预案类型Id
 * @param {String} statusId 请求参数：预案状态Id
 * @param {Number} startDayTime 请求参数：保障开始时间
 * @param {Number} endDayTime 请求参数：保障结束时间
 * @param {String} description 请求参数：预案描述
 * @param {String} jobGoal 请求参数：工作目标
 * @param {String} jobAssignment 请求参数：组织领导及任务分工
 * @param {String} jobContent 请求参数：工作内容
 * @param {String} jobRequirements 请求参数：工作要求
 * @param {Array} groupData 请求参数：人员安排
 * @param {Array} baoZhangData 请求参数：保障视图
 * @param {String} reviewUserId 请求参数：审核人员Id
 * @method：POST
 * @response：{
 *     msg:'操作成功;
 * }
 */

export function addNewEvent(data){
    console.log('api:addNewEvent',data);
    return request({
        url: 'planEvent/addNewEvent',
        method: 'post',
        data
    })
}

/**
 * @description 编辑事件
 * @author moxuejuan
 * @date 2019-08-22 15:53:20
 * @param {String} userId请求参数：创建者（不需要传入，使用登入用户）
 * @param {String} name 请求参数：预案名称
 * @param {Number} typeId 请求参数：预案类型Id
 * @param {String} statusId 请求参数：预案状态Id
 * @param {Number} startDayTime 请求参数：保障开始时间
 * @param {Number} endDayTime 请求参数：保障结束时间
 * @param {String} description 请求参数：预案描述
 * @param {String} jobGoal 请求参数：工作目标
 * @param {String} jobAssignment 请求参数：组织领导及任务分工
 * @param {String} jobContent 请求参数：工作内容
 * @param {String} jobRequirements 请求参数：工作要求
 * @param {Array} groupData 请求参数：人员安排
 * @param {Array} baoZhangData 请求参数：保障视图
 * @param {String} reviewUserId 请求参数：审核人员Id
 * @method：POST
 * @response：{
 *     msg:'操作成功;
 * }
 */

export function updateEvent(data){
  console.log('api:updateEvent',data);
  return request({
    url: 'planEvent/updateEvent',
    method: 'post',
    data
  })
}

/**
 * @description 批量删除事件
 * @author moxuejuan
 * @date 2019-07-12 10:53:20
 * @param {Number} ids 事件ids
 * @method：POST
 * @response：{
 *     msg:'操作成功;
 * }
 */

export function deleteEventByIds(data){
    console.log('api:deleteEventByIds',data);
    return request({
        url: 'planEvent/deleteEventByIds',
        method: 'post',
        data
    })
}




/**
 * @description 根据Id获取某个事件详细信息
 * @author moxuejuan
 * @date 2019-07-12 10:53:20
 * @param {String} Id 事件Id
 * @method：GET
 * @response：{
 *     data:[{
 *
 *     }]
 * }
 */

export function getMessageByEventId(data){
    console.log('api:getMessageByEventId',data);
    return request({
        url: 'planEvent/getMessageByEventId?_t='+ new Date().getTime(),
        method: 'get',
        params: data
    })
}


/**
 * @description 审核通过/驳回某个事件
 * @author moxuejuan
 * @date 2019-08-12 10:53:20
 * @param {String} eventId 事件Id
 * @param {String} teamId 中队Id
 * @param {String} userId 操作用户Id（如果是信息中心，则是审核中队，如果是领导，则是审核整个事件）
 * @param {String} operate 确认yes/驳回no
 * @param {String} backReason 驳回原因
 * @method：POST
 * @response：{
 *
 * }
 */

export function checkEvent(data){
  console.log('api:checkEvent',data);
  return request({
    url: '@test/checkEvent',
    method: 'post',
    data
  })
}

/**
 * @description 设置某个事件为模板
 * @author moxuejuan
 * @date 2020-08-14 10:53:20
 * @param {String} Id 事件Id
 * @param {Boolean} isTemplate 是否我饿模版
 * @method：POST
 * @response：{
 *     data:[{
 *
 *     }]
 * }
 */

export function setEventToTemplate(data){
  console.log('api:setEventToTemplate',data);
  return request({
    url: '@test/setEventToTemplate',
    method: 'post',
    data
  })
}

/**
 * @description 获取事件模板数据
 * @author moxuejuan
 * @date 2020-08-12 15：35：20
 * @param 无
 * @method：GET
 * @response：{
 *     data:[{
 *
 *     }]
 * }
 */

export function getTemplateEventDataList(data){
  console.log('api:getTemplateEventDataList',data);
  return request({
    url: '@test/getTemplateEventDataList?_t='+ new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取某个事件的审核日志
 * @author moxuejuan
 * @date 2020-08-13 18：35：20
 * @param 无
 * @method：GET
 * @response：{
 *     data:[{
 *
 *     }]
 * }
 */

export function getLogDataByEventId(data){
  console.log('api:getLogDataByEventId',data);
  return request({
    url: '@test/getLogDataByEventId?_t='+ new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 中队对于新增的事件输入相关人员安排(中队提交审核)
 * @author moxuejuan
 * @date 2020-08-18 15:53:20
 * @method：POST
 * @response：{
 * }
 */
export function addTeamPersonForNewEvent(data){
  console.log('api:addTeamPersonForNewEvent',data);
  return request({
    url: 'planEvent/addTeamPersonForNewEvent?_t='+ new Date().getTime(),
    method: 'post',
    data
  })
}

/**
 * @description 信息指挥中心--提交审核
 * @author moxuejuan
 * @date 2020-08-18 15:53:20
 * @method：POST
 * @response：{
 * }
 */
export function submitEventToCheck(data){
  console.log('api:submitEventToCheck',data);
  return request({
    url: '@test/submitEventToCheck?_t='+ new Date().getTime(),
    method: 'post',
    data
  })
}

/**
 * @description 信息指挥中心--发起流程
 * @author moxuejuan
 * @date 2020-08-20 15:53:20
 * @method：POST
 * @response：{
 * }
 */
export function submitEvent(data){
  console.log('api:submitEvent',data);
  return request({
    url: 'planEvent/submitEvent?_t='+ new Date().getTime(),
    method: 'post',
    data
  })
}