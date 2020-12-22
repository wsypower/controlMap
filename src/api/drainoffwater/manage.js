/*
 * @Author: Mo.xuejuan
 * @Date: 2019-12-02 09:12:20
 */

import request from '@/plugins/axios/axios'


/**
 * @description 获取所有市区数据
 * @author moxuejuan
 * @date 2020-03-31 10:22
 * @method：GET
 * @response：{
 *
 * }
 */

export function getCountyList(data) {
  console.log('api:getCountyList', data)
  return request({
    url: 'municipal/getCountryList?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

// /**
//  * @description 获取所有摄像头(树形结构)
//  * @author moxuejuan
//  * @date 2020-03-18 16:44
//  * @param {String} address 选择的地址
//  * @param {String} watchPointName 监测点名称（模糊搜索）
//  * @method：GET
//  * @response：{
//  *     树形结构数据
//  * }
//  */
//
// export function getAllCameraTreeData(data) {
//   console.log('api:getAllCameraTreeData', data)
//   return request({
//     url: 'municipal/getAllCameraTreeData?_t=' + new Date().getTime(),
//     method: 'get',
//     params: data
//   })
// }
//
// /**
//  * @description 获取摄像头监控数据流数据
//  * @author moxuejuan
//  * @date 2020-03-18 16:44
//  * @param
//  *     {Number} mpId: 摄像头code
//  * @method：GET
//  * @response：{
//  *     {String} mediaURL：数据流URL
//  * }
//  */
//
// export function getCameraUrl(data) {
//   console.log('api:getCameraUrl', data)
//   return request({
//     url: '@test/getCameraUrl?_t=' + new Date().getTime(),
//     method: 'get',
//     params: data
//   })
// }


/**
 * @description 获取所有雨量监测设备
 * @author moxuejuan
 * @date 2020-03-18 16:44
 * @param {String} address 选择的地址
 * @param {String} watchPointName 监测点名称（模糊搜索）
 * @method：GET
 * @response：{
 *
 * }
 */

export function getAllRainMacTreeData(data) {
  console.log('api:getAllRainMacTreeData', data)
  return request({
    url: 'municipal/getAllRainfallMacTreeData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取某一个雨量监测点的某一个监测设备具体数据(日同比、日环比)
 * @author moxuejuan
 * @date 2020-03-18 16:44
 * @param {String} macId 设备Id
 * @method：GET
 * @response：{
 *
 * }
 */

export function getOneRainMacData(data) {
  console.log('api:getOneRainMacData', data)
  return request({
    url: 'municipal/getOneRainfallMacData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取某一个雨量监测点的某一个监测设备近3个小时的监测雨量趋势
 * @author moxuejuan
 * @date 2020-03-31 10:44
 * @param {String} macId 设备Id
 * @method：GET
 * @response：{
 *
 * }
 */

export function getRainfallTrendDataForOneMac(data) {
  console.log('api:getRainfallTrendDataForOneMac', data)
  return request({
    url: 'municipal/getRainfallTrendDataForOneMac?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取所有水位监测场景
 * @author moxuejuan
 * @date 2020-03-31 14:54
 * @method：GET
 * @response：{
 *
 * }
 */

export function getAllWatchPlaceData(data) {
  console.log('api:getAllWatchPlaceData', data)
  return request({
    url: 'municipal/getAllWatchPlaceData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取所有水位监测设备（树形结构）
 * @author moxuejuan
 * @date 2020-03-20 10:36
 * @param {String} address 选择的地址
 * @param {String} watchPlaceName 监测场景
 * @param {String} watchPointName 监测点名称（模糊搜索）
 * @method：GET
 * @response：{
 *     树形结构数据
 * }
 */

export function getAllWaterLevelMacTreeData(data) {
  console.log('api:getAllWaterLevelMacTreeData', data)
  return request({
    url: 'municipal/getAllWaterLevelMacTreeData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取某一个水位监测点的某一个监测设备具体数据(日同比、日环比)
 * @author moxuejuan
 * @date 2020-03-20 10:37
 * @param {String} macId 设备Id
 * @method：GET
 * @response：{
 *
 * }
 */

export function getOneWaterLevelMacData(data) {
  console.log('api:getOneWaterLevelMacData', data)
  return request({
    url: 'municipal/getOneWaterLevelMacData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取某一个水位监测点的某一个监测设备近3个小时的监测数据
 * @author moxuejuan
 * @date 2020-03-20 15:13
 * @param {String} macId 设备Id
 * @method：GET
 * @response：{
 *
 * }
 */

export function getWaterLevelTrendDataForOneMac(data) {
  console.log('api:getWaterLevelTrendDataForOneMac', data)
  return request({
    url: 'municipal/getWaterLevelTrendDataForOneMac?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取所有排水泵站监测设备
 * @author moxuejuan
 * @date 2020-12-22 09:09
 * @param {String} watchPointName 监测点名称（模糊搜索）
 * @method：GET
 * @response：{
 *
 * }
 */

export function getAllDrainpumpMacTreeData(data) {
  console.log('api:getAllDrainpumpMacTreeData', data)
  return request({
    url: 'municipal/getAllDrainpumpMacTreeData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取某一个排水泵站监测设备具体数据
 * @author moxuejuan
 * @date 2020-12-22 09:14
 * @param {String} macId 设备Id
 * @method：GET
 * @response：{
 *
 * }
 */

export function getOneDrainpumpMacData(data) {
  console.log('api:getOneDrainpumpMacData', data)
  return request({
    url: 'municipal/getOneDrainpumpMacData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取某一个排水泵站监测设备近3个小时的监测排水趋势
 * @author moxuejuan
 * @date 2020-12-22 09:14
 * @param {String} macId 设备Id
 * @method：GET
 * @response：{
 *
 * }
 */

export function getDrainpumpTrendDataForOneMac(data) {
  console.log('api:getDrainpumpTrendDataForOneMac', data)
  return request({
    url: 'municipal/getDrainpumpTrendDataForOneMac?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}


/**
 * @description 获取所有井盖设备
 * @author moxuejuan
 * @date 2020-03-20 10:36
 * @param {Array} selectedCity 选择的地址
 * @param {String} address 详细地址
 * @param {String} status 井盖状态
 * @param {String} code 井盖编号
 * @param {Number} pageNo 翻页设置页码
 * @param {Number} pageSize 翻页设置一页数
 * @method：GET
 * @response：{
 *
 * }
 */

export function getAllManholeMacData(data) {
  console.log('api:getAllManholeMacData', data)
  return request({
    url: 'municipal/getAllManholeMacData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}
