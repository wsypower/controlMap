/*
 * @Author: wei.yafei
 * @Date: 2019-06-12 02:44:03
 * @Last Modified by: wei.yafei 
 * @Last Modified time: 2019-07-11 22:44:54
 */
const log = {}

/**
 * @description 返回这个样式的颜色值
 * @author weiyafei
 * @date 2019-06-13-22:22:05
 * @param {String} type 样式名称 [ primary | success | warning | danger | text ]
 */
function typeColor(type = 'default') {
  let color = ''
  switch (type) {
    case 'default':
      color = '#35495E'
      break
    case 'primary':
      color = '#3488ff'
      break
    case 'success':
      color = '#43B883'
      break
    case 'warning':
      color = '#E7A343'
      break
    case 'danger':
      color = '#f56c6c'
      break
    default:
      break
  }
  return color
}

/**
 * @description 打印一个 [ title | text ] 样式的信息
 * @author weiyafei
 * @date 2019-06-12-08:12:05
 * @param {String} title title text
 * @param {String} info info text
 * @param {String} type style
 */
log.capsule = function(title, info, type = 'primary') {
  console.log(
    `%c ${title} %c ${info} %c`,
    'background:#35495E; padding: 4px; border-radius: 3px 0 0 3px; color: #fff;',
    `background:${typeColor(type)}; padding: 4px; border-radius: 0 3px 3px 0;  color: #fff;`,
    'background:transparent'
  )
}

/**
 * @description 打印彩色文字
 * @author weiyafei
 * @date 2019-06-13-21:12:27
 */
log.colorful = function(textArr) {
  console.log(`%c${textArr.map(t => t.text || '').join('%c')}`, ...textArr.map(t => `color: ${typeColor(t.type)};`))
}

/*=============================================
=                  打印彩色文字                 =
=============================================*/

/**
 * @description 打印 default 样式的文字
 */
log.default = function(text) {
  log.colorful([{ text }])
}

/**
 * @description 打印 primary 样式的文字
 */
log.primary = function(text) {
  log.colorful([{ text, type: 'primary' }])
}

/**
 * @description 打印 success 样式的文字
 */
log.success = function(text) {
  log.colorful([{ text, type: 'success' }])
}

/**
 * @description 打印 warning 样式的文字
 */
log.warning = function(text) {
  log.colorful([{ text, type: 'warning' }])
}

/**
 * @description 打印 danger 样式的文字
 */
log.danger = function(text) {
  log.colorful([{ text, type: 'danger' }])
}

export default log

/*=====  End of Section comment block  ======*/
