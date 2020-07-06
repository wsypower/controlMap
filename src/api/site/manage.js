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