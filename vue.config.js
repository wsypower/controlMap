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
  devServer: {
    open: true
  }
};
