const URL_CONFIG = {
  baseURL: 'http://172.16.24.175:8088/api/', //测试服务器
  // baseURL: "http://192.168.71.238:8015/api/", //开发本地后端服务器
  // baseURL: "http://61.190.177.254:91/api/", //正式外网服务器
  // baseURL2: 'http://192.168.71.33:8078/api/', //测试服务器
  baseURL2: 'http://61.190.177.254:91/api/', //正式服务器
  // winOpenUrl: 'http://192.168.71.33:8078/web' , //测试视频上报案卷跳转
  // winOpenUrl: 'http://61.190.177.254:91/web' , //正式视频上报案卷跳转
}
const GIS_CONFIG = {
  baseURL:"http://61.153.37.212:6350/geoserver/",//正式外网服务器
  // baseURL: 'http://192.168.1.10:8080/geoserver/', //本地测试服务器
  featureNS:"http://hescgis",//正式预案区域图层所在工作空间的url
  // featureNS: 'http://www.haining.com', //测试预案区域图层所在工作空间的url
  featurePrefix:"hescgis",//正式工作空间名称
  // featurePrefix: 'haining' //测试工作空间名称
}
