/**
 * @description: 定义地图数据接口的文件
 * @author:sijianting
 * @createDate:2019/7/11 9:19
 */

import request from '@/plugins/axios/axios'

// let gisApi = 'http://61.153.37.212:6350/geoserver/';
// let baseApi = 'http://61.153.37.214:81/api/';
/**
 * @description: 获取基础gis调用的接口
 * @author:sijianting
 * @param {String}type
 */
export function getPoint(type = '全部视频') {
  type = type == '全部视频' ? '视频' : type;
  return request({
    url: GIS_CONFIG.baseURL + '/' + GIS_CONFIG.featurePrefix+'/ows',
    method: 'get',
    params: {
      service: 'WFS',
      version: '1.0.0',
      request: 'GetFeature',
      typeName: `${GIS_CONFIG.featurePrefix}:${type}`,
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
    url: GIS_CONFIG.baseURL + '/' + GIS_CONFIG.featurePrefix+'/ows',
    method: 'get',
    params: {
      service: 'WFS',
      version: '1.0.0',
      request: 'GetFeature',
      typeName: `${GIS_CONFIG.featurePrefix}:${type}`,
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
    url: GIS_CONFIG.baseURL + '/' + GIS_CONFIG.featurePrefix +'/wfs',
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
    url: URL_CONFIG.baseURL + '/point/getCamList',
    method: 'post'
  });
}

const apiMapping = {
  manager: 'getManageList',
  equip:'',
  // terminal:'getArmGPSList',
  gps:'getHKCarGPSList',
  car:'getCarGpsList'
}
/**
 * @description:获取应急资源接口
 * @author:sijianting
 * @createDate:2019/7/30 10:09
 */
export function getResourceListApi(type) {
  return request({
    url: URL_CONFIG.baseURL + '/point/' + apiMapping[type],
    method: 'post'
  });
}

/**
 * @description:获取物联网设备接口
 * @author:sijianting
 * @createDate:2019/7/30 14:33
 */
export function getEquipListApi(type) {
  return request({
    url: URL_CONFIG.baseURL + '/iot/device/list?deviceType=' + type,
    method: 'post'
  });
}
/**
 * @description:通过经纬度获取地址
 * @author:sijianting
 * @createDate:2019/8/23 10:14
 */
export function getAddressByXY(xy) {
  return request({
    url: `http://api.tianditu.gov.cn/geocoder?postStr={'lon':${xy[0]},'lat':${xy[1]},'ver':1}&type=geocode&tk=8f70b78b9e06a59ad7e97a162f54ac0c`,
    method: 'post'
  });
}
