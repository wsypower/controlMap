/*
 * @Author: wei.yafei
 * @Date: 2019-07-11 11:32:17
 * @Last Modified by: wei.yafei 
 * @Last Modified time: 2019-07-11 23:10:00
 */
import request from '@/plugins/axios/axios'

/**
 * @description 登录应急预案列表数据
 * @author moxuejuan
 * @date 2019-07-08 15:53:20
 * @param {String} searchContent 请求参数 :搜索关键字（title或者description）
 * @param {Number} status 请求参数 :状态，''为不考虑状态
 * @param {Number} pageNo 请求参数 :当前页
 * @param {Number} pageSize 请求参数 :当前页条数
 */
export function add(data = {}) {
  return request({
    url: '@test/add',
    method: 'get',
    params: data
  })
}
