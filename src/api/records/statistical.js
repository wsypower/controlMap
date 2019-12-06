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
export const getShiBuJianAnalysisData = data => {
  console.log('api:getShiBuJianAnalysisData', data)
  return request({
    url: '@test/getShiBuJianAnalysisData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
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
    url: '@test/getRecordsStatisticalAnalysisData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
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

export function getRecordsSourceAnalysisData(data) {
  console.log('api:getRecordsSourceAnalysisData', data)
  return request({
    url: '@test/getRecordsSourceAnalysisData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
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

export function getHighIncidenceTOP5Data(data) {
  console.log('api:getHighIncidenceTOP5Data', data)
  return request({
    url: '@test/getHighIncidenceTOP5Data?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取月周期案卷数数据
 * @author moxuejuan
 * @date 2019-12-04 15:05:20
 * @param {String} year: 年份
 * @method：GET
 * @response：{
 *     {String} name: 问题类型名称
 *     {Array} num: 问题数量
 * }
 */

export function getRecordsDayAnalysisData(data) {
  console.log('api:getRecordsDayAnalysisData', data)
  return request({
    url: '@test/getRecordsDayAnalysisData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}