/*
 * @Author: Mo.xuejuan
 * @Date: 2019-12-02 09:12:20
 */

import request from '@/plugins/axios/axios'

/**
 * @description 获取所有摄像头(树形结构)
 * @author moxuejuan
 * @date 2020-03-18 16:44
 * @param {String} address 选择的地址
 * @param {String} watchPointName 监测点名称（模糊搜索）
 * @method：GET
 * @response：{
 *     树形结构数据
 * }
 */

export function getAllCameraTreeData(data) {
  console.log('api:getAllCameraTreeData', data)
  return request({
    url: '@test/getAllCameraTreeData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取摄像头监控数据流数据
 * @author moxuejuan
 * @date 2020-03-18 16:44
 * @param
 *     {Number} mpId: 摄像头code
 * @method：GET
 * @response：{
 *     {String} mediaURL：数据流URL
 * }
 */

export function getCameraUrl(data) {
  console.log('api:getCameraUrl', data)
  return request({
    url: '@test/getCameraUrl?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取所有雨量监测设备（树形结构）
 * @author moxuejuan
 * @date 2020-03-18 16:44
 * @param {String} address 选择的地址
 * @param {String} watchPointName 监测点名称（模糊搜索）
 * @method：GET
 * @response：{
 *     树形结构数据
 * }
 */

export function getAllRainMacTreeData(data) {
  console.log('api:getAllRainMacTreeData', data)
  return request({
    url: '@test/getAllRainMacTreeData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取某一个雨量监测点的某一个监测设备具体数据
 * @author moxuejuan
 * @date 2020-03-18 16:44
 * @param {String} macId 设备Id
 * @method：GET
 * @response：{
 *
 * }
 */

export function getOneMacData(data) {
  console.log('api:getOneMacData', data)
  return request({
    url: '@test/getOneMacData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}
