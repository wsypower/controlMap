/*
 * @Author: wei.yafei
 * @Date: 2019-05-23 23:32:53
 * @Last Modified by:   wei.yafei
 * @Last Modified time: 2019-06-14 11:32:53
 */
/* eslint-disable no-unused-vars */

//使用uglify-js进行js文件的压缩。
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// 拼接路径
const resolve = dir => require('path').join(__dirname, dir)

// 基础路径 注意发布之前要先修改这里
let publicPath = '/'

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
  lintOnSave: true, //是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码.
  css: {
    loaderOptions: {
      // 设置 scss 公用变量文件
      sass: {
        data: '@import "@/scss/settings.scss";'
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
  },
  //可以在正式环境下关闭错误报告 console.log...
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  },
  devServer: {
    open: true
  }
}
