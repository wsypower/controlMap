module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/scss/settings.scss";'
      }
    }
  },
  pluginOptions: {
    createRouterConfig: {
      // 工作目录（默认: src）
      // cwd: path.resolve(process.cwd(), "./src"),
      // 项目页面地址（默认: views）
      projectPath: `views`,
      // 生成路由文件的名称（默认: index）
      outputFileName: "index",
      // 开启路由异步模式（默认: false）
      async: true,
      // 以监听模式运行 serve 服务，监听 projectPath 目录下文件的 created，removed，changed （默认: false）
      watch: false
    }
  }
};
