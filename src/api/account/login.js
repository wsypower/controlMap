/*
 * @Author: wei.yafei
 * @Date: 2019-06-27 21:26:07
 * @Last Modified by: wei.yafei 
 * @Last Modified time: 2019-06-28 20:40:51
 */

import request from '@/plugins/axios/axios'

/**
 * @description 登录获取用户信息和权限
 * @author weiyafei
 * @date 2019-06-27-21:25:58
 * @param {String} userId 请求参数 :用户唯一标识符默认参数）
 */

export function AccountLogin(data) {
  return request({
    url: '@test/login',
    method: 'post',
    data
  })
}
