/*
 * @Author: Mo.xuejuan
 * @Date: 2019-09-06 14:53:20
 */

import request from '@/plugins/axios/axios'

/**
 * @description 获取告警类型数据
 * @author moxuejuan
 * @date 2019-11-29 16:28:20
 * @param 无
 * @method：GET
 * @response：{
 *     {String} name: 告警类型名称
 *     {Number} num: 次数
 * }
 */

export function getAlarmTypeAnalysisData(data) {
  console.log('api:getAlarmTypeAnalysisData', data)
  return request({
    url: '@test/getAlarmTypeAnalysisData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取高发路段分析数据
 * @author moxuejuan
 * @date 2019-11-29 16:39:20
 * @param 无
 * @method：GET
 * @response：{
 *     {String} name: 路段名称
 *     {Number} num: 次数
 * }
 */

export function getHighIncidenceRoadAnalysisData(data) {
  console.log('api:getHighIncidenceRoadAnalysisData', data)
  return request({
    url: '@test/getHighIncidenceRoadAnalysisData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取高发时段分析数据
 * @author moxuejuan
 * @date 2019-11-29 16:41:20
 * @param 无
 * @method：GET
 * @response：{
 *     {String} day: 日期，比如：2019-10-19
 *     {Number} num: 次数
 * }
 */

export function getHighIncidenceTimeAnalysisData(data) {
  console.log('api:getHighIncidenceTimeAnalysisData', data)
  return request({
    url: '@test/getHighIncidenceTimeAnalysisData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}
