/*
 * @description 时间戳转化为特定格式字符串 filter
 * @Author: mo xuejuan
 * @Date: 2020-04-01 15:07
 */

function timeFormatter(value, setting = 'YYYY-MM-DD HH:mm:ss') {
  let timestampReg = /^\d{1,13}$/
  console.log('setting',setting);
  if (value && timestampReg.test(value)) {
    let time = new Date(parseInt(value))
    let Y = time.getFullYear()
    let M = time.getMonth() + 1
    let D = time.getDate()
    var h = time.getHours()
    var m = time.getMinutes()
    var s = time.getSeconds()
    if (setting === 'YYYY-MM-DD HH:mm:ss') {
      return Y + '-' + addZero(M) + '-' + addZero(D) + ' ' + addZero(h) + ':' + addZero(m) + ':' + addZero(s)
    } else if (setting === 'YYYY-MM-DD HH:mm') {
      return Y + '-' + addZero(M) + '-' + addZero(D) + ' ' + addZero(h) + ':' + addZero(m)
    } else if (setting === 'YYYY-MM-DD') {
      return Y + '-' + addZero(M) + '-' + addZero(D)
    }
  } else {
    return '无效时间'
  }
}

function addZero(m) {
  return m < 10 ? '0' + m : m
}

export default timeFormatter
