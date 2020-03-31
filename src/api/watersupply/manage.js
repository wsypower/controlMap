/*
 * @Author: Mo.xuejuan
 * @Date: 2019-12-02 09:12:20
 */

import request from '@/plugins/axios/axios'

/**
 * @description 获取所有水质监测设备（树形结构）
 * @author moxuejuan
 * @date 2020-03-23 09:44
 * @param {String} address 选择的地址
 * @param {String} watchPointName 监测点名称（模糊搜索）
 * @method：GET
 * @response：{
 *     树形结构数据
 * }
 */

export function getAllWaterQMMacTreeData(data) {
  console.log('api:getAllWaterQMMacTreeData', data)
  return request({
    url: '@test/getAllWaterQualityMacTreeData?_t=' + new Date().getTime(),
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
    url: '@test/getOneWaterQualityMacData?_t=' + new Date().getTime(),
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
    url: '@test/getWaterQualityTrendDataForOneMac?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}