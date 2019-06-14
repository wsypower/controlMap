import cookies from './util.cookies'
import db from './util.db'
import log from './util.log'
const util = {
  cookies,
  db,
  log
}

/**
 * @description 更新标题
 * @author weiyafei
 * @date 2019-06-10-21:12:27
 * @param {String} title 标题
 */
util.title = function(titleText) {
  const processTitle = process.env.VUE_APP_TITLE || 'D2Admin'
  window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`
}

/**
 * @description 打开新页面
 * @author weiyafei
 * @date 2019-06-10-23:45:01
 * @param {String} url 地址
 */
util.open = function(url) {
  var a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', 'd2admin-link-temp')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('d2admin-link-temp'))
}

export default util
