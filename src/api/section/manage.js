/*
 * @Author: Mo.xuejuan
 * @Date: 2019-09-06 14:53:20
 */

import request from '@/plugins/axios/axios'

/**
 * @description 获取所有人员(树形结构)
 * @author moxuejuan
 * @date 2019-11-25 15:53:20
 * @method：GET
 * @response：{
 *     树形结构数据
 * }
 */

export function getAllPeopleTreeData(data) {
  console.log('api:getAllPeopleTreeData', data)
  return request({
    url: '@test/getAllPeopleTreeData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取用户工作数据信息
 * @author moxuejuan
 * @date 2019-09-10 14:53:20
 * @param {String} userId 请求参数 :用户唯一标识符默认参数）
 */
export const getUserWorkInfoData = data => {
  console.log('api:getUserWorkInfoData', data)
  return request({
    url: `@test/getUserWorkInfoData?_t=` + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取某个人员的详细数据
 * @author moxuejuan
 * @date 2019-12-23 15:17:20
 * @method：GET
 * @param {String} userId 请求参数 :用户唯一标识符默认参数
 * @response：{
 *     {String} realName:真实姓名
 *     {String} name: 账号名
 *     {String} code: 编码
 *     {String} phone: 手机号
 *     {String} job: 职务
 *     {String} phoneUrl: 个人照URL
 * }
 */

export function getAllUserInfoData(data) {
  console.log('api:getAllUserInfoData', data)
  return request({
    url: '@test/getAllUserInfoData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取用户轨迹分段数据
 * @author moxuejuan
 * @date 2019-09-10 14:53:20
 * @param {String} userId 请求参数 : 用户唯一标识符默认参数）
 * @param {String} sType 请求参数 : 查询类型
 * @param {String} startTime 请求参数 :开始日期
 * @param {String} endTime 请求参数 :结束日期
 */
export const getUserTrailDataList = data => {
  console.log('api:getUserTrailDataList', data)
  return request({
    url: `@test/getUserTrailDataList?_t=` + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取用户考勤打卡数据
 * @author moxuejuan
 * @date 2019-09-10 14:53:20
 * @param {String} userId 请求参数 :用户唯一标识符默认参数）
 */
export const getUserWorkTimeTotalData = data => {
  console.log('api:getUserWorkTimeTotalData', data)
  return request({
    url: `@test/getUserWorkTimeTotalData?_t=` + new Date().getTime(),
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
    url: `@test/getUserWorkTimeDataList?_t=` + new Date().getTime(),
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
    url: `@test/getUserSignDetailData?_t=` + new Date().getTime(),
    method: 'get',
    params: data
  })
}

