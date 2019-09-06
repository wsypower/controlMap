/*
 * @Author: wei.yafei
 * @description 该文件使`@/store/index.js`能供导入所有vuex的模块
 * @Date: 2019-06-14 12:05:04
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-06-16 17:09:23
 */
const files = require.context('./modules', false, /\.js$/)
const modules = {}

files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default {
  namespaced: true,
  modules
}
