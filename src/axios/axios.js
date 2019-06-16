/* eslint-disable no-unused-vars */
'use strict'
/*
 * @Author: wei.yafei
 * @Date: 2019-06-12 15:19:30
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-06-16 17:59:58
 */
/*=============================================
=                    axios                    =
=============================================*/

import Vue from 'vue'
import axios from 'axios'
import Qs from 'qs'
import { Message } from 'ant-design-vue'
import util from '@/utils/util'
import store from '@/store'

/*=============================================
=              axios-全局错误捕获               =
=============================================*/

// 创建一个错误
const errorCreate = msg => {
  const error = new Error(msg)
  errorLog(error)
  throw error
}

/**
 * @description 记录和显示错误
 * @author weiyafei
 * @date 2019-06-16-17:57:43
 * @param {error} catch捕获的错误
 */
const errorLog = error => {
  // 添加到日志
  store.dispatch('cgadmin/log/push', {
    message: '数据请求异常',
    type: 'danger',
    meta: {
      error
    }
  })
  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    util.log.danger('>>>>>> Error >>>>>>')
    console.log(error)
  }
  // 显示提示
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
}
//axios默认配置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

//axios config配置
axios.defaults.baseURL = process.env.VUE_APP_BASE_API
let config = {
  //public下config配置API接口
  // baseURL:window.MAP_BASE_ATTRIBUTE.BASERURL
  baseURL: 'http://api',
  timeout: 60 * 100, // 请求超时时间
  //参数序列化
  transformRequest: [
    function(data) {
      // 对 data 进行任意转换处理 => 转为fromData(按照实际后台约定修改转换)
      return Qs.stringify(data, { arrayFormat: 'repeat' })
    }
  ]
}

/*=============================================
=                创建axios实例                 =
=============================================*/

const _axios = axios.create(config)

/*=============================================
=                   请求拦截器                  =
=============================================*/

_axios.interceptors.request.use(
  config => {
    // 在发送之前的操作
    // // 在请求发送之前做一些处理
    // const token = util.cookies.get('token')
    // // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    // config.headers['X-Token'] = token
    return config
  },
  error => {
    // 执行请求错误后的操作
    // 发送失败
    console.log(error)
    return Promise.reject(error)
  }
)

/*=============================================
=                   响应拦截器                  =
=============================================*/
_axios.interceptors.response.use(
  response => {
    /* 对响应数据进行的操作 */
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data
    // 这个状态码是和后端约定的
    const { code } = dataAxios
    // 根据 code 进行判断
    if (code === undefined) {
      // 如果没有 code 代表这不是项目后端开发的接口 比如可能是 D2Admin 请求最新版本
      return dataAxios
    } else {
      // 有 code 代表这是一个后端接口 可以进行进一步的判断
      switch (code) {
        case 0:
          // [ 示例 ] code === 0 代表没有错误
          return dataAxios.data
        case 'xxx':
          // [ 示例 ] 其它和后台约定的 code
          errorCreate(`[ code: xxx ] ${dataAxios.msg}: ${response.config.url}`)
          break
        default:
          // 不是正确的 code
          errorCreate(`${dataAxios.msg}: ${response.config.url}`)
          break
      }
    }
    return response
  },
  error => {
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
