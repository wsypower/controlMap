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
 *     {String} startDayTime: 保障开始时间
 *     {String} endDayTime: 保障结束时间
 *
 * }}
 */

export function getEmergencyYuAnList(data){
    console.log('api：getEmergencyYuAnList',data);
    return request({
        url: `@test/getEmergencyYuAnList`,
        method: 'post',
        data
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
        url: 'emergencyplan/deleteEmergencyYuAn',
        method: 'post',
        data
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
    console.log('api:getPersonInfo',data);
    return request({
        url: 'emergencyplan/getUserById?_t='+ new Date().getTime(),
        method: 'get',
        params: data
    })
}
