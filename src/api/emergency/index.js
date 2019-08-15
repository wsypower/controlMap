import request from '@/plugins/axios/axios'
/**
 * @description 获取所有已有的应急预案
 * @author moxuejuan
 * @date 2019-08-08 15:53:20
 * @param {String} userId请求参数：创建者（不需要传入，使用登入用户）
 * @param {Number} typeId 请求参数：预案类型Id（一级、二级、三级）
 * @param {String} statusId 请求参数：预案状态Id（未提交、待审核、已同意、已驳回、未开始、进行中、已结束、已逾期作废）
 * @param {Boolean} isTemplate 请求参数：预案模板
 * @param {Boolean} isMyYuAn 请求参数：我的预案
 * @param {String} searchContent：请求参数：搜索关键字
 * @param {Number} pageNo：请求参数：当前页
 * @param {Number} pageSize：请求参数：当前页条数，现在默认10条
 * @method： POST
 * @response：{data:{
 *     {String} id: 预案唯一Id
 *     {String} name: 预案名称
 *     {Number} statusId：状态Id
 *     {String} statusName：状态名称
 *     {String} creator: 创建人姓名
 *     {Number} startDayTime: 保障开始时间
 *     {Number} endDayTime: 保障结束时间
 *     {Boolean} isTemplate: 是否是预案模板
 * }}
 */

export function getEmergencyYuAnList(data){
    console.log('api：getEmergencyYuAnList',data);
    return request({
        url: `plan/getEmergencyYuAnList`,
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
        url: '@test/deleteEmergencyYuAn',
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
    url: '@test/setEmergencyYuAnToPass',
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
    url: '@test/setEmergencyYuAnToTemplate',
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
    url: '@test/setEmergencyYuAnToFinishReview',
    method: 'post',
    data
  })
}

/**
 * @description 获取预案模板数据
 * @author moxuejuan
 * @date 2019-08-12 10:53:20
 * @param 无
 * @method：GET
 * @response：{
 *     data:[{
 *
 *     }]
 * }
 */

export function getTemplateYuAnDataList(data){
  console.log('api:getTemplateYuAnDataList',data);
  return request({
    url: '@test/getTemplateYuAnDataList',
    method: 'get',
    params: data
  })
}
