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
  type= type=='全部视频'?'视频':type
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
