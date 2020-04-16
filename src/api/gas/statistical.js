/*
 * @Author: Mo.xuejuan
 * @Date: 2019-09-06 14:53:20
 */

import request from '@/plugins/axios/axios'

/**
 * @description 获取燃气监测设备状态分析数据
 * @author moxuejuan
 * @date 2020-03-23 14:50
 * @method：GET
 * @response：{
 *     {String} name: 状态名称,
 *     {Number} num: 个数
 * }
 */

export function getStatusAnalysisData(data) {
  console.log('api:getStatusAnalysisData', data)
  return request({
    url: 'municipal/getGasMacStatusAnalysisData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}

/**
 * @description 获取甲烷含量趋势图
 * @author moxuejuan
 * @date 2020-03-23 15:00
 * @param {String} startTime 开始日期时间戳
 * @param {String} endTime 结束日期时间戳
 * @method：GET
 * @response：{
 *
 * }
 */

export function getGasTrendData(data) {
  console.log('api:getGasTrendData', data)
  return request({
    url: 'municipal/getGasTrendData?_t=' + new Date().getTime(),
    method: 'get',
    params: data
  })
}
