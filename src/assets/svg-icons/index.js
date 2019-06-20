/*
 * @Author: wei.yafei
 * @description 自定义图标加载表
 * @see https://juejin.im/post/59bb864b5188257e7a427c09#heading-9
 * @Date: 2019-06-19 19:27:35
 * @Last Modified by: wei.yafei  
 * @Last Modified time: 2019-06-20 17:09:16
 */
//TODO:建议统一图标大下64*64
/*=============================================
=           自动导入svg-icon 方便管理            =
=============================================*/

import Vue from 'vue'
const requireAll = requireContext => requireContext.keys().map(requireContext)
//通过正则匹配引入相应的文件模块
const req = require.context('./icons', false, /\.svg$/)
const iconMap = requireAll(req)
requireAll(req)
Vue.prototype.$IconSvg = iconMap.map(e => e.default.id.slice(3))
