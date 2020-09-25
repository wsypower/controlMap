/*
 * @Author: Mo.xuejuan
 * @Date: 2019-12-02 09:12:20
 */

import request from '@/plugins/axios/axios2'
/**
 * @description 获取所有摄像头(非树形结构)
 * @author sijianting
 * @date 2019-12-25 16:11
 * @param 无
 * @method：GET
 * @response：{
 *     树形结构数据
 * }
 */

export function getAllCameraDataList(data) {
  // console.log('api:getAllCameraData', data)
  return request({
    url: 'ge/camera/list.json?token=fa9f4750224743d2d26435636e16956a&_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取所有摄像头(树形结构)
 * @author moxuejuan
 * @date 2019-12-02 14:53
 * @param 无
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
 * @date 2019-12-11 14:53:20
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
    url: 'ge/camera/url?token=fa9f4750224743d2d26435636e16956a&_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}






