/**
 * @description: 定义地图数据接口的文件
 * @author:sijianting
 * @createDate:2019/7/11 9:19
 */

import request from '@/plugins/axios/axios'

let gisApi = 'http://192.168.1.10:8080/geoserver/'
let baseApi = URL_CONFIG.baseURL
/**
 * @description: 获取点数据接口
 * @author:sijianting
 * @param {String}type
 */
export function getPointFeatures(mapIdList, mapType) {
  return request({
    url: gisApi + 'jinkaiqu/ows',
    method: 'get',
    params: {
      service: 'WFS',
      version: '1.0.0',
      request: 'GetFeature',
      typeName: `jinkaiqu:${mapType}`,
      outputFormat: 'application/json',
      srsname: 'EPSG:4326',
      cql_filter: `"id" in ${mapIdList}`
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
    url: gisApi + 'jinkaiqu/wfs',
    method: 'post',
    headers: { 'Content-Type': 'text/xml' },
    transformRequest: [
      function(data) {
        // 对 data 进行任意转换处理
        return data
      }
    ],
    data: `${data}`
  })
}

const apiMapping = {
  manager: 'getManageList',
  equip: '',
  terminal: 'getArmGPSList',
  gps: 'getHKCarGPSList',
  car: 'getCarGpsList'
}
/**
 * @description:获取应急资源接口
 * @author:sijianting
 * @createDate:2019/7/30 10:09
 */
export function getResourceListApi(type) {
  return request({
    url: baseApi + 'point/' + apiMapping[type],
    method: 'post'
  })
}

/**
 * @description:获取物联网设备接口
 * @author:sijianting
 * @createDate:2019/7/30 14:33
 */
export function getEquipListApi(type) {
  return request({
    url: baseApi + 'iot/device/list?deviceType=' + type,
    method: 'post'
  })
}
/**
 * @description:获取视频接口
 * @author:sijianting
 * @createDate:2019/8/15 14:40
 */
export function getVideoListApi() {
  return request({
    url: 'http://115.231.81.227:8692/geapi/ge/camera/list.json?token=fa9f4750224743d2d26435636e16956a',
    method: 'get'
  })
}
/**
 * @description:
 * @author:sijianting
 * @createDate:2019/8/16 21:49
 */
export function getVideoById(id) {
  return request({
    url: 'http://115.231.81.227:8692/geapi/ge/camera/url?token=fa9f4750224743d2d26435636e16956a',
    method: 'get',
    params: {
      mpid: id
    }
  })
}
/**
 * @description:获取应急人员接口
 * @author:sijianting
 * @createDate:2019/8/15 15:25
 */
export function getPeopleListApi() {
  return request({
    url: URL_CONFIG.baseURL + 'gps/onlineUser',
    method: 'get'
  })
}