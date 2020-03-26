/*
 * @Author: Mo.xuejuan
 * @Date: 2019-09-06 14:53:20
 */

import request from '@/plugins/axios/axios'

/**
 * @description 获取雨量设备状态分析数据
 * @author moxuejuan
 * @date 2020-03-18 15:23
 * @method：GET
 * @response：{
 *     {String} name: 状态名称,
 *     {Number} num: 个数
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
  return request({
    url: '@test/getRainTrendData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取水位设备状态分析数据
 * @author moxuejuan
 * @date 2020-03-20 10:56
 * @method：GET
 * @response：{
 *     {String} name: 状态名称,
 *     {Number} num: 个数
 * }
 */

export function getWaterStatusAnalysisData(data) {
  console.log('api:getWaterStatusAnalysisData', data)
  return request({
    url: '@test/getWaterStatusAnalysisData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取水位监测趋势图
 * @author moxuejuan
 * @date 2020-03-20 11:30
 * @param {String} watchPlaceName 监测场景
 * @param {String} startDay 开始日期
 * @param {String} endDay 结束日期
 * @method：GET
 * @response：{
 *
 * }
 */

export function getWaterLevelTrendData(data) {
  return request({
    url: '@test/getWaterLevelTrendData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取井盖设备状态分析数据
 * @author moxuejuan
 * @date 2020-03-20 15:56
 * @method：GET
 * @response：{
 *     {String} name: 状态名称,
 *     {Number} num: 个数
 * }
 */

export function getManholeStatusAnalysisData(data) {
  console.log('api:getManholeStatusAnalysisData', data)
  return request({
    url: '@test/getManholeStatusAnalysisData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}
