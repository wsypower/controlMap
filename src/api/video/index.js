/**
 * @description:定义视频数据接口的文件
 * @author:sijianting
 * @createDate:2019/10/23 17:06
 */

import request from '@/plugins/axios/axios'

/**
 * @description:获取物联网设备接口
 * @author:sijianting
 * @createDate:2019/10/23 14:33
 */
export function getAlarmStatisticDataAPI(data) {
  return request({
    url: '@test/getAlarmStatisticData?_t='+ new Date().getTime(),
    method: 'get',
    params: data
  })
}
