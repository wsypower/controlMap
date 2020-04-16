/*
 * @Author: Mo.xuejuan
 * @Date: 2019-12-02 09:12:20
 */

import request from '@/plugins/axios/axios'

/**
 * @description 获取所有燃气监测设备（树形结构）
 * @author moxuejuan
 * @date 2020-03-23 14:44
 * @param {String} address 选择的地址
 * @param {String} watchPointName 监测点名称（模糊搜索）
 * @method：GET
 * @response：{
 *     树形结构数据
 * }
 */

export function getAllGasMacTreeData(data) {
  console.log('api:getAllGasMacTreeData', data)
  return request({
    url: 'municipal/getAllGasMacTreeData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取某一个燃气监测点的某一个监测设备具体数据
 * @author moxuejuan
 * @date 2020-03-23 14:44
 * @param {String} macId 设备Id
 * @method：GET
 * @response：{
 *
 * }
 */

export function getOneGasMacData(data) {
  console.log('api:getOneGasMacData', data)
  return request({
    url: 'municipal/getOneGasMacData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取某一个燃气监测点的某一个监测设备近3个小时的监测趋势
 * @author moxuejuan
 * @date 2020-04-01 09:12
 * @param {String} macId 设备Id
 * @method：GET
 * @response：{
 *
 * }
 */

export function getGasTrendDataForOneMac(data) {
  console.log('api:getGasTrendDataForOneMac', data)
  return request({
    url: 'municipal/getGasTrendDataForOneMac?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}