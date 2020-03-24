/*
 * @Author: Mo.xuejuan
 * @Date: 2019-09-06 14:53:20
 */

import request from '@/plugins/axios/axios'

/**
 * @description 获取路灯设备状态分析数据
 * @author moxuejuan
 * @date 2020-03-24 11:36
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
 * @description 获取路灯耗电量趋势图
 * @author moxuejuan
 * @date 2020-03-24 11:36
 * @param {String} startDay 开始日期
 * @param {String} endDay 结束日期
 * @method：GET
 * @response：{
 *
 * }
 */

export function getPowerConsumptionTrendData(data) {
  console.log('api:getPowerConsumptionTrendData', data)
  return request({
    url: '@test/getPowerConsumptionTrendData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}
