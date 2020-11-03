/*
 * @Author: Mo.xuejuan
 * @Date: 2019-11-26 09:12:20
 */

import request from '@/plugins/axios/axios2'

/**
 * @description 获取所有车辆(列表结构)
 * @author moxuejuan
 * @date 2019-11-26 14:53:20
 * @param 无
 * @method：GET
 * @response：{
 *     {Number} id: 车辆Id
 *     {String} name: 车辆名称
 *     {String} dept: 所属部门
 * }
 */

export function getAllCarDataList(data) {
  console.log('api:getAllCarDataList', data)
  return request({
    url: 'car/getAllCarDataList?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取所有车辆(树形结构)
 * @author moxuejuan
 * @date 2019-11-26 09:26
 * @param 无
 * @method：GET
 * @response：{
 *     树形结构数据
 * }
 */

export function getAllCarTreeData(data) {
  console.log('api:getAllCarTreeData', data)
  return request({
    url: 'car/getAllCarTreeData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取车辆轨迹分段数据
 * @author moxuejuan
 * @date 2019-11-26 14:53:20
 * @param {String} carId 请求参数 :用户唯一标识符默认参数）
 * @param {String} startTime 请求参数 :开始日期
 * @param {String} endTime 请求参数 :结束日期
 * @param {String} sortType 时间排序（asc,desc）
 * @param {Number} pageNo页数
 * @param {Number} pageSize每页显示条数
 * @method：POST
 * @response：{
 *
 * }
 */
export const getCarTrailDataList = data => {
  console.log('api:getCarTrailDataList', data)
  return request({
    url: `car/getTrailDetailData?_t=`+ new Date().getTime(),
    method: 'post',
    data
  })
}

/**
 * @description 获取车辆某段轨迹的详细数据
 * @author moxuejuan
 * @date 2019-11-27 09:13:26
 * @param {String} carId 请求参数 :车辆唯一标识符默认参数）
 * @param {Number} startTime 请求参数 :开始时间
 * @param {Number} endTime 请求参数 :结束时间
 * @method：GET
 * @response：{
 *     树形结构数据
 * }
 */
export const getTrailDetailData = data => {
  console.log('api:getTrailDetailData', data)
  return request({
    url: `car/getTrailDetailData?_t=` + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取车辆所属公司的数据
 * @author moxuejuan
 * @date 2019-11-27 14:13:26
 * @param 无
 * @method：GET
 * @response：{
 *     树形结构数据
 * }
 */
export const getAllCarCompanyDataList = data => {
  console.log('api:getAllCarCompanyDataList', data)
  return request({
    url: `@test/getAllCarCompanyDataList?_t=` + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取车辆所属中队的数据
 * @author moxuejuan
 * @date 2019-12-10 16:13:26
 * @param 无
 * @method：GET
 * @response：{
 *
 * }
 */
export const getAllGroupDataList = data => {
  console.log('api:getAllGroupDataList', data)
  return request({
    url: `car/getAllGroupDataList?_t=` + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取车辆所有类型的数据
 * @author moxuejuan
 * @date 2019-12-10 16:24:26
 * @param 无
 * @method：GET
 * @response：{
 *
 * }
 */
export const getAllCarTypeDataList = data => {
  console.log('api:getAllCarTypeDataList', data)
  return request({
    url: `car/getAllCarTypeDataList?_t=` + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取车辆违规数据()
 * @author moxuejuan
 * @date 2019-11-27 09:14:14
 * @param {String} carId 请求参数 :用户唯一标识符默认参数）
 * @param {String} companyId 请求参数：所属公司ID
 * @param {String} vType 请求参数：违规类型Id
 * @param {String} carType 请求参数：车型Id
 * @param {String} startTime 请求参数 :开始日期
 * @param {String} endTime 请求参数 :结束日期
 * @param {String} searchContent 请求参数 : 车牌号/驾驶员/手机号
 * @method：POST(参数相对多一些，使用POST请求)
 * @response：{
 *     树形结构数据
 * }
 */
export const getCarViolateRulesDataList = data => {
  console.log('api:getCarViolateRulesDataList', data)
  return request({
    url: `car/getCarViolateRulesDataList`,
    method: 'post',
    data
  })
}

/**
 * @description 删除某条车辆非违规数据
 * @author moxuejuan
 * @date 2019-11-27 09:14:50
 * @param {String} id 请求参数 :违规数据唯一Id
 * @method：POST
 * @response：{
 *     树形结构数据
 * }
 */
export const deleteCarViolateRules = data => {
  console.log('api:deleteCarViolateRules', data)
  return request({
    url: `car/deleteCarViolateRules`,
    method: 'post',
    data
  })
}
