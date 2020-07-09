import request from '@/plugins/axios/axios'

/**
 * @description 获取所有工地相关的摄像头(树形结构)
 * @author moxuejuan
 * @date 2020-07-06 14:44
 * @param {String} area 选择的地址
 * @param {String} bridgeName 工地名称（模糊搜索）
 * @method：GET
 * @response：{
 *     树形结构数据
 * }
 */

export function getAllCameraTreeDataForConstructionSite(data) {
  console.log('api:getAllCameraTreeDataForConstructionSite', data)
  return request({
    url: 'municipal/getAllCameraTreeDataForConstructionSite?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取所有工地上所有车辆以及它的摄像头(树形结构)
 * @author moxuejuan
 * @date 2020-07-08 12：00
 * @param {String} placecode 选择的地址
 * @param {String} carNumber 车牌号（模糊搜索）
 * @method：GET
 * @response：{
 *     树形结构数据
 * }
 */

export function getAllCameraTreeDataForCar(data) {
  console.log('api:getAllCameraTreeDataForCar', data)
  return request({
    url: 'municipal/getAllCameraTreeDataForCar?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 根据车辆ID获取该车辆所有信息以及它的摄像头
 * @author moxuejuan
 * @date 2020-07-08 12：00
 * @param {String} carId 车辆ID
 * @method：GET
 * @response：{
 *     树形结构数据
 * }
 */

export function getCameraByCarId(data) {
  console.log('api:getCameraByCarId', data)
  return request({
    url: 'municipal/getCameraByCarId?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}