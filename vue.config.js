/*
 * @Author: wei.yafei
 * @Date: 2019-05-23 23:32:53
 * @Last Modified by: wei.yafei 
 * @Last Modified time: 2019-06-19 15:26:17
 */
/* eslint-disable no-unused-vars */

//使用uglify-js进行js文件的压缩。
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// 拼接路径
const resolve = dir => require('path').join(__dirname, dir)

// 基础路径 注意发布之前要先修改这里
let publicPath = './'

module.exports = {
  /*
   ** 项目部署基础
   ** 默认情况下，我们假设你的应用将被部署在域的根目录下,
   ** 例如：https://www.my-app.com/
   ** 默认：'/'
   ** 如果您的应用程序部署在子路径中，则需要在这指定子路径
   ** 例如：https://www.foobar.com/my-app/
   ** 需要将它改为'/my-app/'
   */
  publicPath, // 根据你的实际情况更改这里
  outputDir: 'dist', //当运行 vue-cli-service build 时生成的生产环境构建文件的目录.
  assetsDir: 'assets', //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录.
  // 是否在保存的时候使用 `eslint-loader` 进行检查。
  // 有效的值：`true` | `false` | `"error"`
  // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
  lintOnSave: true,
  // 是否为生产环境构建生成 source map？
  productionSourceMap: true,
  // CSS 相关选项
  css: {
    loaderOptions: {
      // 设置 scss 公用变量文件
      sass: {
        data: '@import "@/assets/style/settings.scss";'
      }
    }
  },
  // 默认设置: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-service/lib/config/base.js
  chainWebpack: config => {
    /**
     * 删除懒加载模块的 prefetch preload，降低带宽压力
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
     * 而且预渲染时生成的 prefetch 标签是 modern 版本的，低版本浏览器是不需要的
     */
    config.plugins.delete('prefetch').delete('preload')
    // 解决 cli3 热更新失效 https://github.com/vuejs/vue-cli/issues/1559
    config.resolve.symlinks(true)
    config
      // 开发环境
      .when(
        process.env.NODE_ENV === 'development',
        // sourcemap不包含列信息
        config => config.devtool('cheap-source-map')
      )
      // 非开发环境
      .when(process.env.NODE_ENV !== 'development', config => {
        config.optimization.minimizer([
          new UglifyJsPlugin({
            uglifyOptions: {
              // 移除 console
              // 其它优化选项 https://segmentfault.com/a/1190000010874406
              compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log']
              }
            }
          })
        ])
      })
    // 重新设置 alias
    config.resolve.alias.set('@', resolve('src'))
    // 判断环境加入模拟数据
    /*   const entry = config.entry('app')
    if (process.env.VUE_APP_BUILD_MODE !== 'nomock') {
      entry.add('@/mock').end()
    } */
  },
  devServer: {
    open: true
  }
}
