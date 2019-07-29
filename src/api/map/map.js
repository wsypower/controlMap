/**
 * @description: 定义地图数据接口的文件
 * @author:sijianting
 * @createDate:2019/7/11 9:19
 */

import request from '@/plugins/axios/axios'

/**
 * @description: 获取基础点位调用的接口
 * @author:sijianting
 * @param {String}type
 */
export function getPoint(type = '全部视频') {
  type = type == '全部视频' ? '视频' : type
  return request({
    url: 'http://192.168.1.10:8080/geoserver/guankongceshi/ows',
    method: 'get',
    params: {
      service: 'WFS',
      version: '1.0.0',
      request: 'GetFeature',
      typeName: `guankongceshi:${type}`,
      outputFormat: 'application/json'
    }
  })
}

/**
 * @description: 获取预案区域调用的接口
 * @author:sijianting
 */
export function getEmergencyArea(type = '预案区域') {
  return request({
    url: 'http://192.168.1.10:8080/geoserver/haining/ows',
    method: 'get',
    params: {
      service: 'WFS',
      version: '1.0.0',
      request: 'GetFeature',
      typeName: `haining:${type}`,
      outputFormat: 'application/json'
    }
  })
}

/*
 * @description: 保存数据到gis数据库接口
 * @author:sijianting
 * @param {xml}data
 * */
export function postFeature(data) {
  return request({
    url: 'http://192.168.1.10:8080/geoserver/haining/wfs',
    method: 'post',
    headers: { 'Content-Type': 'text/xml ' },
    transformRequest: [
      function(data) {
        // 对 data 进行任意转换处理
        return data
      }
    ],
    data: `${data}`
  })
}

/**
 * @description:获取摄像头监控列表接口
 * @author:sijianting
 * @createDate:2019/7/29 14:11
 */
export function getVideoListApi() {
  return request({
    url: 'http://192.168.71.33:8015/api/point/getCamList',
    method: 'post'
  });
}