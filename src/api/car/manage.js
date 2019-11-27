/*
 * @Author: Mo.xuejuan
 * @Date: 2019-11-26 09:12:20
 */

import request from '@/plugins/axios/axios'

/**
 * @description 获取所有车辆(列表结构)
 * @author moxuejuan
 * @date 2019-11-26 14:53:20
 * @method：POST
 * @response：{
 *     {Number} id: 车辆Id
 *     {String} name: 车辆名称
 *     {String} dept: 所属部门
 * }
 */

export function getAllCarDataList(data) {
  console.log('api:getAllCarDataList', data)
  return request({
    url: '@test/getAllCarDataList',
    method: 'post',
    data
  })
}

/**
 * @description 获取所有车辆(树形结构)
 * @author moxuejuan
 * @date 2019-11-26 09:26
 * @method：POST
 * @response：{
 *     树形结构数据
 * }
 */

export function getAllCarTreeData(data) {
  console.log('api:getAllCarTreeData', data)
  return request({
    url: '@test/getAllCarTreeData',
    method: 'post',
    data
  })
}

/**
 * @description 获取车辆轨迹分段数据
 * @author moxuejuan
 * @date 2019-11-26 14:53:20
 * @param {String} carId 请求参数 :用户唯一标识符默认参数）
 * @param {String} startDay 请求参数 :开始日期
 * @param {String} endDay 请求参数 :结束日期
 */
export const getCarTrailDataList = data => {
  console.log('api:getCarTrailDataList', data)
  return request({
    url: `@test/getCarTrailDataList`,
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
 */
export const getTrailDetailData = data => {
  console.log('api:getTrailDetailData', data)
  return request({
    url: `@test/getTrailDetailData`,
    method: 'post',
    data
  })
}

/**
 * @description 获取车辆所属公司的数据
 * @author moxuejuan
 * @date 2019-11-27 14:13:26
 * @param 无
 */
export const getAllCarCompanyDataList = data => {
  console.log('api:getAllCarCompanyDataList', data)
  return request({
    url: `@test/getAllCarCompanyDataList`,
    method: 'post',
    data
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
 * @param {String} startDay 请求参数 :开始日期
 * @param {String} endDay 请求参数 :结束日期
 * @param {String} searchContent 请求参数 : 车牌号/驾驶员/手机号
 */
export const getCarViolateRulesDataList = data => {
  console.log('api:getCarViolateRulesDataList', data)
  return request({
    url: `@test/getCarViolateRulesDataList`,
    method: 'post',
    data
  })
}

/**
 * @description 删除某条车辆非违规数据
 * @author moxuejuan
 * @date 2019-11-27 09:14:50
 * @param {String} id 请求参数 :违规数据唯一Id
 */
export const deleteCarViolateRules = data => {
  console.log('api:deleteCarViolateRules', data)
  return request({
    url: `@test/deleteCarViolateRules`,
    method: 'post',
    data
  })
}
