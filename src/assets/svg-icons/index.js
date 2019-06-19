/*
 * @Author: wei.yafei
 * @Date: 2019-06-19 19:27:35
 * @Last Modified by: wei.yafei 
 * @Last Modified time: 2019-06-19 23:11:21
 */

/*=============================================
=               自动导入SVG-ICON               =
=============================================*/

import Vue from 'vue'
const requireAll = requireContext => requireContext.keys().map(requireContext)
//通过正则匹配引入相应的文件模块
const req = require.context('./icons', false, /\.svg$/)
const iconMap = requireAll(req)
requireAll(req)
Vue.prototype.$IconSvg = iconMap.map(e => e.default.id.slice(3))
