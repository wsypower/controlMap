/*
 * @Author: Mo.xuejuan
 * @Date: 2019-12-02 09:12:20
 */

import request from '@/plugins/axios/axios'

/**
 * @description 获取所有水质监测设备
 * @author moxuejuan
 * @date 2020-03-23 09:44
 * @param {String} watchPointName 监测点名称（模糊搜索）
 * @method：GET
 * @response：{
 *     list结构数据
 * }
 */

export function getAllWaterQMMacTreeData(data) {
  console.log('api:getAllWaterQMMacTreeData', data)
  return request({
    url: 'municipal/getAllWaterQualityMacTreeData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取某一个水质监测点的某一个监测设备具体数据(各个指标的日同比、日环比)
 * @author moxuejuan
 * @date 2020-03-23 09:44
 * @param {String} macId 设备Id
 * @method：GET
 * @response：{
 *
 * }
 */

export function getOneWaterQMMacData(data) {
  console.log('api:getOneWaterQMMacData', data)
  return request({
    url: 'municipal/getOneWaterQualityMacData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取某一个水质监测点的某一个监测设备具体数据(各个指标的近3个小时趋势)
 * @author moxuejuan
 * @date 2020-03-23 09:44
 * @param {String} macId 设备Id
 * @method：GET
 * @response：{
 *
 * }
 */

export function getWaterQualityTrendDataForOneMac(data) {
  console.log('api:getWaterQualityTrendDataForOneMac', data)
  return request({
    url: 'municipal/getWaterQualityTrendDataForOneMac?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取所有压力监测设备
 * @author moxuejuan
 * @date 2020-12-22 15:26
 * @param {String} watchPointName 监测点名称（模糊搜索）
 * @method：GET
 * @response：{
 *     list结构数据
 * }
 */

export function getAllPressMacTreeData(data) {
  console.log('api:getAllPressMacTreeData', data)
  return request({
    url: 'municipal/getAllPressMacTreeData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取某一个压力监测设备具体数据
 * @author moxuejuan
 * @date 2020-12-22 15:27
 * @param {String} macId 设备Id
 * @method：GET
 * @response：{
 *
 * }
 */

export function getOnePressMacData(data) {
  console.log('api:getOnePressMacData', data)
  return request({
    url: 'municipal/getOnePressMacData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取某一个压力监测设备具体数据(各个指标的近3个小时趋势)
 * @author moxuejuan
 * @date 2020-12-22 15:28
 * @param {String} macId 设备Id
 * @method：GET
 * @response：{
 *
 * }
 */

export function getPressTrendDataForOneMac(data) {
  console.log('api:getPressTrendDataForOneMac', data)
  return request({
    url: 'municipal/getPressTrendDataForOneMac?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取所有流量监测设备
 * @author moxuejuan
 * @date 2020-12-22 16:38
 * @param {String} watchPointName 监测点名称（模糊搜索）
 * @method：GET
 * @response：{
 *     list结构数据
 * }
 */

export function getAllFlowMacTreeData(data) {
  console.log('api:getAllFlowMacTreeData', data)
  return request({
    url: 'municipal/getAllFlowMacTreeData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取某一个流量监测设备具体数据
 * @author moxuejuan
 * @date 2020-12-22 16:39
 * @param {String} macId 设备Id
 * @method：GET
 * @response：{
 *
 * }
 */

export function getOneFlowMacData(data) {
  console.log('api:getOneFlowMacData', data)
  return request({
    url: 'municipal/getOneFlowMacData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取某一个流量监测设备具体数据(各个指标的近3个小时趋势)
 * @author moxuejuan
 * @date 2020-12-22 16:39
 * @param {String} macId 设备Id
 * @method：GET
 * @response：{
 *
 * }
 */

export function getFlowTrendDataForOneMac(data) {
  console.log('api:getFlowTrendDataForOneMac', data)
  return request({
    url: 'municipal/getFlowTrendDataForOneMac?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}