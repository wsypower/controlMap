/* eslint-disable no-unused-vars */
let path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  css: {
    loaderOptions: {
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
  },
  // 项目部署基础
  // 默认情况下，我们假设你的应用将被部署在域的根目录下,
  // 例如：https://www.my-app.com/
  // 默认：'/'
  // 如果您的应用程序部署在子路径中，则需要在这指定子路径
  // 例如：https://www.foobar.com/my-app/
  // 需要将它改为'/my-app/'
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'assets'
  /*  lintOnSave: true,
  productionSourceMap: true,
  runtimeCompiler: true */
}
