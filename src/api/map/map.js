/**
 * @author:sijianting
 * @date:2019/7/9
 **/

import request from '@/plugins/axios/axios'

/**
 * @description 获取geoserver地图点位
 * @author sijianting
 * @date 2019/7/9
*/

export function getPoint(type = '视频') {
  const ceshi = {
    service: 'WFS',
    version: '1.0.0',
    request: 'GetFeature',
    typeName: `guankongceshi:${type}`,
    outputFormat: 'application/json'
  }
  return request({
    url: 'http://192.168.1.10:8080/geoserver/guankongceshi/ows',
    method: 'get',
    params: ceshi
  })
}
