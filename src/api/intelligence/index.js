import request from '@/plugins/axios/axios'

/**
 * @description 根据deviceType获取所有对应设备的数据
 * @author moxuejuan
 * @date 2019-07-12 10:53:20
 * @param {String} searchContent 请求参数 :搜索关键字（编号）
 * @param {Number} pageNo 请求参数 :当前页
 * @param {Number} pageSize 请求参数 :当前页条数
 * @method：GET
 * @response：{}
 */
export function getDeviceDataList(data){
    console.log('api:getDeviceDataList',data);
    return request({
        url: 'iot/device/pageList?_t='+ new Date().getTime(),
        method: 'get',
        params: data
    })
}
