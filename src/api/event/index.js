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
    url: '@test/getCountForHandle',
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
        url: `@test/getEventList`,
        method: 'post',
        data
    })
}

/**
 * @description 增加新预案
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

export function addNewEmergencyYuAn(data){
    console.log('api:addNewEmergencyYuAn',data);
    return request({
        url: 'plan/addNewEmergencyYuAn',
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
        url: 'plan/deleteEmergencyYuAn',
        method: 'post',
        data
    })
}




/**
 * @description 根据Id获取某个预案详细信息
 * @author moxuejuan
 * @date 2019-07-12 10:53:20
 * @param {String} Id 预案Id
 * @method：GET
 * @response：{
 *     data:[{
 *
 *     }]
 * }
 */

export function getEmergencyYuAnById(data){
    console.log('api:getEmergencyYuAnById',data);
    return request({
        url: 'plan/getEmergencyYuAnById?_t='+ new Date().getTime(),
        method: 'get',
        params: data
    })
}


/**
 * @description 审核通过某个预案
 * @author moxuejuan
 * @date 2019-08-12 10:53:20
 * @param {String} Id 预案Id
 * @method：POST
 * @response：{
 *     data:[{
 *
 *     }]
 * }
 */

export function setEmergencyYuAnToPass(data){
  console.log('api:setEmergencyYuAnToPass',data);
  return request({
    url: 'plan/setEmergencyYuAnToPass',
    method: 'post',
    data
  })
}


/**
 * @description 审核驳回某个预案
 * @author moxuejuan
 * @date 2019-08-12 10:53:20
 * @param {String} Id 预案Id
 * @param {String} backReason 驳回原因
 * @method：POST
 * @response：{
 *     data:[{
 *
 *     }]
 * }
 */

export function setEmergencyYuAnToBack(data){
  console.log('api:setEmergencyYuAnToBack',data);
  return request({
    url: 'plan/setEmergencyYuAnToBack',
    method: 'post',
    data
  })
}

/**
 * @description 设置某条预案为结束审核
 * @author moxuejuan
 * @date 2019-08-12 10:53:20
 * @param {String} Id 预案Id
 * @method：POST
 * @response：{
 *     data:[{
 *
 *     }]
 * }
 */

export function setEmergencyYuAnToFinishReview(data){
  console.log('api:setEmergencyYuAnToFinishReview',data);
  return request({
    url: 'plan/setEmergencyYuAnToFinishReview',
    method: 'post',
    data
  })
}

/**
 * @description 设置某个预案为模板预案
 * @author moxuejuan
 * @date 2019-08-12 10:53:20
 * @param {String} Id 预案Id
 * @method：POST
 * @response：{
 *     data:[{
 *
 *     }]
 * }
 */

export function setEmergencyYuAnToTemplate(data){
  console.log('api:setEmergencyYuAnToTemplate',data);
  return request({
    url: 'plan/setEmergencyYuAnToTemplate',
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
 * @description 获取所有正在进行中的预案
 * @author moxuejuan
 * @date 2019-08-16 15:53:20
 * @param {String} statusId 请求参数：预案状态Id（进行中）
 * @method： POST
 * @response：{data:{
 *     {String} id: 预案唯一Id
 *     {String} name: 预案名称
 *     {String} creator: 创建人姓名
 *     {String} creator: 审核人员姓名
 *     {Number} startDayTime: 保障开始时间
 *     {Number} endDayTime: 保障结束时间
 *     {Array} groupData 请求参数：人员安排
 *     {Array} baoZhangData 请求参数：保障视图
 * }}
 */

export function getRunningYuAnList(data){
  console.log('api：getRunningYuAnList',data);
  return request({
    url: `plan/getRunningYuAnList`,
    method: 'get',
    params: data
  })
}
