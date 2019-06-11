let path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
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
    config.resolve.alias.set("@", resolve("src"));
  },
  pluginOptions: {
    createRouterConfig: {
      /* working directory default src */
      // cwd: path.resolve(process.cwd(), "./src"),
      /* project page address (default views) */
      projectPath: `views`,
      /* generate the name of the routing file (default index) */
      outputFileName: "index",
      /* enable route asynchronous mode (default false) */
      async: true,
      /*
       **run the serve service in listener mode listening
       ** for created removed and changed files in the project path directory(default false)
       */
      watch: false
    }
  }
};
