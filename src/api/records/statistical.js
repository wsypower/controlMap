/*
 * @Author: Mo.xuejuan
 * @Date: 2019-12-04 14:53:20
 */

import request from '@/plugins/axios/axios'

/**
 * @description 获取事部件数据
 * @author moxuejuan
 * @date 2019-11-25 14:53:20
 * @param 无
 * @method：GET
 * @response：{
 *     {Number} shiJianNum: 事件数
 *     {Number} buJianNum: 部件数
 * }
 */
export function getShiBuJianAnalysisData() {
  console.log('api:getShiBuJianAnalysisData')
  return request({
    url: 'bigscreen/allSjBj?_t=' + new Date().getTime(),
    method: 'post'
  })
}

/**
 * @description 获取案卷统计分析数据
 * @author moxuejuan
 * @date 2019-12-04 14:53:20
 * @param 无
 * @method：GET
 * @response：{
 *     {String} name: 类型名称,
 *     {Number} num: 案卷数
 * }
 */

export function getRecordsStatisticalAnalysisData(data) {
  console.log('api:getRecordsStatisticalAnalysisData', data)
  return request({
    url: 'bigscreen/ajtj?_t=' + new Date().getTime(),
    method: 'post',
    data
  })
}

/**
 * @description 获取案卷来源数据
 * @author moxuejuan
 * @date 2019-12-04 14:53:20
 * @param 无
 * @method：GET
 * @response：{
 *     {String} name: 案卷来源名称
 *     {Number} num: 案卷数量
 * }
 */

export function getRecordsSourceAnalysisData() {
  console.log('api:getRecordsSourceAnalysisData')
  return request({
    url: 'bigscreen/lyfs?_t=' + new Date().getTime(),
    method: 'post'
  })
}

/**
 * @description 获取高发问题TOP5数据
 * @author moxuejuan
 * @date 2019-12-04 14:53:20
 * @param 无
 * @method：GET
 * @response：{
 *     {String} name: 问题类型名称
 *     {Array} num: 问题数量
 * }
 */

export function getHighIncidenceTOP5Data() {
  console.log('api:getHighIncidenceTOP5Data')
  return request({
    url: 'bigscreen/top5?_t=' + new Date().getTime(),
    method: 'post'
  })
}

/**
 * @description 获取月周期案卷数数据
 * @author moxuejuan
 * @date 2019-12-04 15:05:20
 * @param {String} year: 年份
 * @method：GET
 * @response：{
 *     {String} month: 月份
 *     {Number} num1: 上报总数
 *     {Number} num2: 立案总数
 *     {Number} num3: 处置总数
 * }
 */

export function getRecordsDayAnalysisData(data) {
  console.log('api:getRecordsDayAnalysisData', data)
  return request({
    url: 'bigscreen/eventCircle?_t=' + new Date().getTime(),
    method: 'post',
    data
  })
}

/**
 * @description 获取案卷来源
 */
export function getRecordsSource() {
  console.log('api:getRecordsSource')
  return request({
    url: 'bigscreen/eventsource?_t=' + new Date().getTime(),
    method: 'post'
  })
}

export function getRecordsLocation(data) {
  console.log('api:getRecordsLocation', data)
  return request({
    url: 'bigscreen/hotmap?_t=' + new Date().getTime(),
    method: 'post',
    data
  })
}