/*
 * @Author: Mo.xuejuan
 * @Date: 2019-11-25 14:53:20
 */

import request from '@/plugins/axios/axios'

/**
 * @description 获取所有人员(列表结构)
 * @author moxuejuan
 * @date 2019-11-25 14:53:20
 * @method：GET
 * @response：{
 *     {Number} id: 用户Id
 *     {String} name: 用户名称
 *     {String} tel: 手机号码
 *     {String} dept: 所属部门
 * }
 */

export function getAllPeopleDataList(data) {
  console.log('api:getAllPeopleDataList', data)
  return request({
    url: 'people/getAllPeopleDataList?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取所有人员(树形结构)
 * @author moxuejuan
 * @date 2019-11-25 15:53:20
 * @method：GET
 * @response：{
 *     树形结构数据
 * }
 */

export function getAllPeopleTreeData(data) {
  console.log('api:getAllPeopleTreeData', data)
  return request({
    url: 'people/getAllPeopleTreeData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}
