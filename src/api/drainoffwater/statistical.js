/*
 * @Author: Mo.xuejuan
 * @Date: 2019-09-06 14:53:20
 */

import request from '@/plugins/axios/axios'

/**
 * @description 获取状态分析数据
 * @author moxuejuan
 * @date 2019-09-06 14:53:20
 * @method：GET
 * @response：{
 *     {String} name: 部门名称,
 *     {Number}totalNum: 人员总数
 *     {Number}onlineNum: 在线总数
 *     {Number}outlineNum: 离线总数
 * }
 */

export function getStatusAnalysisData(data) {
  console.log('api:getStatusAnalysisData', data)
  return request({
    url: '@test/getStatusAnalysisData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取雨量趋势图
 * @author moxuejuan
 * @date 2020-03-18 16:44
 * @param {String} startDay 开始日期
 * @param {String} endDay 结束日期
 * @method：GET
 * @response：{
 *
 * }
 */

export function getRainTrendData(data) {
  console.log('api:getRainTrendData', data)
  return request({
    url: '@test/getRainTrendData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}
// /**
//  * @description 获取越界人员数据(监督员)
//  * @author moxuejuan
//  * @date 2019-09-06 14:53:20
//  * @method：GET
//  * @response：{
//  *     {String} day: 日期
//  *     {Number} num: 越界人数
//  * }
//  */
//
// export function getOverstepAnalysisData(data) {
//   console.log('api:getOverstepAnalysisData', data)
//   return request({
//     url: '@test/getOverstepAnalysisData?_t=' + new Date().getTime(),
//     method: 'get',
//     params: data
//   })
// }
//
// /**
//  * @description 获取监督员TOP3数据
//  * @author moxuejuan
//  * @date 2019-09-06 14:53:20
//  * @method：GET
//  * @response：{
//  *     {Number} id: 用户Id
//  *     {String} name: 用户名称
//  *     {String} dept: 部门
//  * }
//  */
//
// export function getPeopleTopThreeData(data) {
//   console.log('api:getPeopleTopThreeData', data)
//   return request({
//     url: '@test/getPeopleTopThreeData?_t=' + new Date().getTime(),
//     method: 'get',
//     params: data
//   })
// }
