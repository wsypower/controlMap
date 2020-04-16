/*
 * @Author: Mo.xuejuan
 * @Date: 2019-12-02 09:12:20
 */

import request from '@/plugins/axios/axios'

/**
 * @description 获取所有桥梁相关的摄像头(树形结构)
 * @author moxuejuan
 * @date 2020-03-18 16:44
 * @param {String} area 选择的地址
 * @param {String} bridgeName 桥梁名称（模糊搜索）
 * @method：GET
 * @response：{
 *     树形结构数据
 * }
 */

export function getAllCameraTreeDataForBridge(data) {
  console.log('api:getAllCameraTreeDataForBridge', data)
  return request({
    url: 'municipal/getAllCameraTreeDataForBridge?_t=' + new Date().getTime(),
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
