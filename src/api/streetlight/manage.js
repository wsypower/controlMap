/*
 * @Author: Mo.xuejuan
 * @Date: 2019-12-02 09:12:20
 */

import request from '@/plugins/axios/axios2'

/**
 * @description 获取所有路灯信息
 * @author moxuejuan
 * @date 2020-03-24 10:38
 * @param {String} area 选择的市区
 * @param {String} lightName 路灯名称（模糊搜索）
 * @param {Number} pageNo 当页页码
 * @param {Number} pageSize 一页显示的条数
 * @method：GET
 * @response：{
 *
 * }
 */

export function getAllLightListData(data) {
  console.log('api:getAllLightListData', data)
  return request({
    url: 'municipal/getAllLightMacData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取某个路灯的详细数据
 * @author moxuejuan
 * @date 2020-03-24 10:40
 * @param{Number} macId: 路灯ID
 * @method：GET
 * @response：{
 *
 * }
 */

export function getOneLightMacData(data) {
  console.log('api:getOneLightMacData', data)
  return request({
    url: 'municipal/getPowerCoTrendDataForOneMac?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}
