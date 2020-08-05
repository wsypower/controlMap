/*
 * @Author: Mo.xuejuan
 * @Date: 2020-08-04 15:03
 */

import request from '@/plugins/axios/axios'


/**
 * @description 获取所有组织架构(树形结构)
 * @author moxuejuan
 * @date 2020-08-04 15:03
 * @param 无
 * @method：GET
 * @response：{
 *     树形结构数据
 * }
 */

export function getAllAddressListTreeData(data) {
  console.log('api:getAllAddressListTreeData', data)
  return request({
    url: '@test/getAllAddressListTreeData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取某个组织下的所有人员绑定设备状态信息
 * @author moxuejuan
 * @date 2020-08-04 15:03
 * @param 无
 * @method：GET
 * @response：{
 *     树形结构数据
 * }
 */

export function getAllPersonListData(data) {
  console.log('api:getAllPersonListData', data)
  return request({
    url: '@test/getAllPersonListData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}







