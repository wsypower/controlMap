/*
 * @Author: Mo.xuejuan
 * @Date: 2019-09-06 14:53:20
 */

import request from '@/plugins/axios/axios'

/**
 * @description 获取水质监测设备状态分析数据
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
 * @description 获取水质总体趋势图
 * @author moxuejuan
 * @date 2020-03-18 16:44
 * @param {String} waterFlag 水质检测项名称
 * @param {String} startDay 开始日期
 * @param {String} endDay 结束日期
 * @method：GET
 * @response：{
 *
 * }
 */

export function getWaterQualityTrendData(data) {
  console.log('api:getWaterQualityTrendData', data)
  return request({
    url: '@test/getWaterQualityTrendData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}
