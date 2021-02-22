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

//功能：计算两个时间戳之间相差的日时分秒
//$begin_time  开始时间戳
//$end_time 结束时间戳
util.timediff = function($begin_time,$end_time)
{
  if($begin_time===0||$end_time===0){
    return []
  }
  else{
    let $starttime = '';
    let $endtime = '';
    if($begin_time < $end_time){
      $starttime = $begin_time;
      $endtime = $end_time;
    }else{
      $starttime = $end_time;
      $endtime = $begin_time;
    }

    //计算天数
    let $timediff = $endtime-$starttime;
    let $days = parseInt($timediff/86400);
    //计算小时数
    let $remain = $timediff%86400;
    let $hours = parseInt($remain/3600);
    //计算分钟数
    $remain = $remain%3600;
    let $mins = parseInt($remain/60);
    //计算秒数
    let $secs = $remain%60;

    let $res = [$days,$hours,$mins,$secs]

    return $res;
  }
}

export default util


