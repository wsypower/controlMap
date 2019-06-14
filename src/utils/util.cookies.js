/*
 * @Author: wei.yafei
 * @Date: 2019-06-04 21:25:15
 * @Last Modified by: wei.yafei 
 * @Last Modified time: 2019-06-14 14:40:15
 */
import Cookies from 'js-cookie'
const cookies = {}

/**
 * @description 存储 cookie 值
 * @author weiyafei
 * @date 2019-06-12-11:12:27
 * @param {String} name cookie name
 * @param {String} value cookie value
 * @param {Object} setting cookie setting
 */
cookies.set = function(name = 'default', value = '', cookieSetting = {}) {
  let currentCookieSetting = {
    expires: 1
  }
  Object.assign(currentCookieSetting, cookieSetting)
  Cookies.set(`cg-admin-${process.env.VUE_APP_VERSION}-${name}`, value, currentCookieSetting)
}

/**
 * @description 拿到 cookie 值
 * @author weiyafei
 * @date 2019-06-12-11:12:27
 * @param {String} name cookie name
 */
cookies.get = function(name = 'default') {
  return Cookies.get(`cg-admin-${process.env.VUE_APP_VERSION}-${name}`)
}

/**
 * @description 拿到 cookie 全部的值
 */
cookies.getAll = function() {
  return Cookies.get()
}

/**
 * @description 删除 cookie
 * @author weiyafei
 * @date 2019-06-13-12:12:15
 * @param {String} name cookie name
 */
cookies.remove = function(name = 'default') {
  return Cookies.remove(`cg-admin-${process.env.VUE_APP_VERSION}-${name}`)
}

export default cookies
