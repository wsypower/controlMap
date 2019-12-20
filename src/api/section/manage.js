/*
 * @Author: Mo.xuejuan
 * @Date: 2019-09-06 14:53:20
 */

import request from '@/plugins/axios/axios'

/**
 * @description 获取用户工作数据信息
 * @author moxuejuan
 * @date 2019-09-10 14:53:20
 * @param {String} userId 请求参数 :用户唯一标识符默认参数）
 */
export const getUserWorkInfoData = data => {
  console.log('api:getUserWorkInfoData', data)
  return request({
    url: `people/getUserWorkInfoData?_t=` + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取用户轨迹分段数据
 * @author moxuejuan
 * @date 2019-09-10 14:53:20
 * @param {String} userId 请求参数 :用户唯一标识符默认参数）
 * @param {String} startTime 请求参数 :开始日期
 * @param {String} endTime 请求参数 :结束日期
 */
export const getUserTrailDataList = data => {
  console.log('api:getUserTrailDataList', data)
  return request({
    url: `people/getTrailList?_t=` + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取用户某段轨迹的详细数据
 * @author moxuejuan
 * @date 2019-09-10 14:53:20
 * @param {String} userId 请求参数 :用户唯一标识符默认参数）
 * @param {Number} startTime 请求参数 :开始时间
 * @param {Number} endTime 请求参数 :结束时间
 */
export const getTrailDetailData = data => {
  console.log('api:getTrailDetailData', data)
  return request({
    url: `@test/getTrailDetailData?_t=` + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取用户签到签退数据(point/signRecords)
 * @author moxuejuan
 * @date 2019-09-11 14:53:20
 * @param {String} userId 请求参数 :用户唯一标识符默认参数）
 * @param {String} startTime 请求参数 :开始日期
 * @param {String} endTime 请求参数 :结束日期
 */
export const getUserWorkTimeDataList = data => {
  console.log('api:getUserWorkTimeDataList', data)
  return request({
    url: `people/getUserWorkTimeDataList?_t=` + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取某次用户签到签退详细数据(point/signRecord)
 * @author moxuejuan
 * @date 2019-09-11 14:53:20
 * @param {String} userId 请求参数 :用户唯一标识符默认参数）
 * @param {String} id 请求参数 :签到签退数据Id
 */
export const getUserSignDetailData = data => {
  console.log('api:getUserSignDetailData', data)
  return request({
    url: `people/getUserSignDetailData?_t=` + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取用户违规数据()
 * @author moxuejuan
 * @date 2019-09-11 14:53:20
 * @param {String} peopleId 请求参数 :用户Id 为空时表示全部
 * @param {String} startTime 请求参数 :开始日期
 * @param {String} endTime 请求参数 :结束日期
 */
export const getUserViolateRulesDataList = data => {
  console.log('api:getUserViolateRulesDataList', data)
  return request({
    url: `people/getUserViolateRulesDataList?_t=` + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 删除某条用户非违规数据
 * @author moxuejuan
 * @date 2019-09-11 14:53:20
 * @param {String} id 请求参数 :违规数据唯一Id
 */
export const deleteUserViolateRules = data => {
  console.log('api:deleteUserViolateRules', data)
  return request({
    url: `people/deleteUserViolateRules`,
    method: 'post',
    params: data
  })
}
