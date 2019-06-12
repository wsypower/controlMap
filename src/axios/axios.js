'use strict'
/*
 * @Author: wei.yafei
 * @Date: 2019-06-12 15:19:30
 * @Last Modified by: wei.yafei 
 * @Last Modified time: 2019-06-12 20:40:55
 */
/*=============================================
=                    axios                    =
=============================================*/

import Vue from 'vue'
import axios from 'axios'

//axios默认配置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

//axios config配置
axios.defaults.baseURL = process.env.VUE_APP_BASE_API
let config = {
  //public下config配置API接口
  // baseURL:window.MAP_BASE_ATTRIBUTE.BASERURL
  baseURL: 'http://www.baidu.com',
  timeout: 60 * 100 // Timeout
}

//创建axios实例

const _axios = axios.create(config)

//request拦截器

_axios.interceptors.request.use(
  function(config) {
    // 在发送之前的操作
    return config
  },
  function(error) {
    // 执行请求错误后的操作
    return Promise.reject(error)
  }
)

//request拦截器

_axios.interceptors.response.use(
  function(response) {
    // 对响应数据进行的操作
    return response
  },
  function(error) {
    // 对错误响应数据的操作
    return Promise.reject(error)
  }
)

Plugin.install = function(Vue) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios
      }
    },
    $axios: {
      get() {
        return _axios
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin
