/*
 * @Author: Mo.xuejuan
 * @Date: 2019-12-02 09:12:20
 */

import request from '@/plugins/axios/axios2'

/**
 * @description 获取所有告警类型数据(列表结构)
 * @author moxuejuan
 * @date 2019-12-03 14:53:20
 * @param 无
 * @method：GET
 * @response：{
 *     {Number} id: 告警类型Id
 *     {String} name: 告警类型名称
 * }
 */

export function getAllAlarmTypeDataList(data) {
  console.log('api:getAllAlarmTypeDataList', data)
  return request({
    url: 'video/getAllAlarmTypeDataList?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取所有告警数据(列表结构)
 * @author moxuejuan
 * @date 2019-12-03 14:53:20
 * @param
 *     {Number} alarmTypeId: 告警类型Id
 *     {String} startTime: 开始日期
 *     {String} endTime: 结束日期
 *     {Number} pageNo: 页码
 *     {Number} pageSize: 每页显示条数
 * @method：GET
 * @response：{
 *     {Number} id: 告警Id
 *     {String} typeName: 告警类型名称
 *     {String} dayTime: 告警时间
 *     {Number} position: 告警点位
 *     {Number} cameraName: 监控名称
 *     {String} videoSrc: 摄像监控数据流
 *     {String} photoUrl: 摄像头截图
 * }
 */

export function getAllAlarmDataList(data) {
  console.log('api:getAllAlarmDataList', data)
  return request({
    url: 'video/getAllAlarmDataList?_t=' + new Date().getTime(),
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
    url: 'sp/getUrl?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 未违规数据处理
 * @author moxuejuan
 * @date 2019-12-03 14:53:20
 * @param {String} id 请求参数 :告警Id
 * @param {String} remark 请求参数 : 告警备注信息
 */
export const alarmNormalHandle = data => {
  console.log('api:alarmNormalHandle', data)
  return request({
    url: `video/alarmNormalHandle`,
    method: 'post',
    data
  })
}

/**
 * @description 违规数据上报处理
 * @author moxuejuan
 * @date 2019-12-03 14:53:20
 * @param {String} id 请求参数 :告警Id
 * @param {String} remark 请求参数 : 告警备注信息
 */
export const alarmReportHandle = data => {
  console.log('api:alarmReportHandle', data)
  return request({
    url: `video/alarmReportHandle`,
    method: 'post',
    data
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
    // url: 'video/getAllCameraTreeData?_t=' + new Date().getTime(),
    url: 'sp/getCameraList?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

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
    console.log('api:getAllCameraData', data)
    return request({
        // url: 'video/getAllCameraData?_t=' + new Date().getTime(),
        url: 'sp/getCameraList?_t=' + new Date().getTime(),
        method: 'get',
        params: data
    })
}
