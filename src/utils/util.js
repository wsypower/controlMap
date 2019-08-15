import cookies from './util.cookies'
import db from './util.db'
import log from './util.log'
const util = {
  cookies,
  db,
  log
}
/**
 * @description 获取网址参数
 * @author weiyafei
 * @date 2019-06-28-15:00:04
 * @param {String} 网址
 * @returns {Object} 参数对象
 */
util.getURLParameters = prop => {
  let params = {},
    query = window.location.search.length > 0 ? window.location.search.substring(1) : '',
    arr = query.split('&'),
    rt
  for (let i = 0, len = arr.length; i < len; i++) {
    let item = arr[i],
      tmp = item.split('='),
      key = tmp[0],
      val = tmp[1]
    if (typeof params[key] == 'undefined') {
      params[key] = val
    } else if (typeof params[key] == 'string') {
      params[key] = [params[key], val]
    } else {
      params[key].push(val)
    }
  }
  rt = prop ? params[prop] : params
  return rt
}
// (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
//   (a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a),
//   {}
// )

/**
 * @description 更新标题
 * @author weiyafei
 * @date 2019-06-10-21:12:27
 * @param {String} title 标题
 */
util.title = function(titleText) {
  const processTitle = process.env.VUE_APP_TITLE || 'cgAdmin'
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
  a.setAttribute('id', 'cgadmin-link-temp')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('cgadmin-link-temp'))
}

/**
 * @description 时间戳格式的转化
 * @author 莫雪娟
 * @date 2019-08-15
 * @param {String} url 地址
 */
util.formatDate = function(time, formatStr) {
  let date = new Date(time);
  let Y = date.getFullYear();
  let M = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
  let D = date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  formatStr = formatStr || 'YYYY-MM-DD HH:mm:ss';
  return formatStr.replace(/YYYY|MM|DD|HH|mm|ss/ig, function (matches) {
    return ({
      YYYY: Y,
      MM: M,
      DD: D,
      HH: h,
      mm: m,
      ss: s
    })[matches];
  });
}

export default util
