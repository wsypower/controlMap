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
    url: 'municipal/getWaterQualityMacStatusAnalysisData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取水质总体趋势图
 * @author moxuejuan
 * @date 2020-03-18 16:44
 * @param {String} waterFlag 水质检测项名称
 * @param {String} startTime 开始日期时间戳
 * @param {String} endTime 结束日期时间戳
 * @method：GET
 * @response：{
 *
 * }
 */

export function getWaterQualityTrendData(data) {
  console.log('api:getWaterQualityTrendData', data)
  return request({
    url: 'municipal/getWaterQualityTrendData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取压力监测设备状态分析数据
 * @author moxuejuan
 * @date 2020-12-22 16:12
 * @method：GET
 * @response：{
 *     {String} name: 状态名称,
 *     {Number} num: 个数
 * }
 */

export function getPressMacStatusAnalysisData(data) {
  console.log('api:getPressMacStatusAnalysisData', data)
  return request({
    url: 'municipal/getPressMacStatusAnalysisData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取压力总体趋势图
 * @author moxuejuan
 * @date 2020-12-22 16:12
 * @param {String} startTime 开始日期时间戳
 * @param {String} endTime 结束日期时间戳
 * @method：GET
 * @response：{
 *
 * }
 */

export function getPressTrendData(data) {
  console.log('api:getPressTrendData', data)
  return request({
    url: 'municipal/getPressTrendData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取流量监测设备状态分析数据
 * @author moxuejuan
 * @date 2020-12-22 17:23
 * @method：GET
 * @response：{
 *     {String} name: 状态名称,
 *     {Number} num: 个数
 * }
 */

export function getFlowMacStatusAnalysisData(data) {
  console.log('api:getFlowMacStatusAnalysisData', data)
  return request({
    url: 'municipal/getFlowMacStatusAnalysisData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取流量总体趋势图
 * @author moxuejuan
 * @date 2020-12-22 17:23
 * @param {String} startTime 开始日期时间戳
 * @param {String} endTime 结束日期时间戳
 * @method：GET
 * @response：{
 *
 * }
 */

export function getFlowTrendData(data) {
  console.log('api:getFlowTrendData', data)
  return request({
    url: 'municipal/getFlowTrendData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}
