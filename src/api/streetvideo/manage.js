/*
 * @Author: Mo.xuejuan
 * @Date: 2019-12-02 09:12:20
 */

import request from '@/plugins/axios/axios'

/**
 * @description 获取所有街道相关的摄像头(树形结构)
 * @author moxuejuan
 * @date 2020-12-03 15:44
 * @param {String} cname 摄像头名称（模糊搜索）
 * @method：GET
 * @response：{
 *     树形结构数据
 * }
 */

export function getAllCameraTreeDataForStreet(data) {
  console.log('api:getAllCameraTreeDataForStreet', data)
  return request({
    url: 'municipal/getAllCameraTreeDataForStreet?_t=' + new Date().getTime(),
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
    url: 'unauthorized/sp/getUrl?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}
