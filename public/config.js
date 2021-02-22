const URL_CONFIG = {
  baseURL: "http://192.168.71.33:8015/api", //测试服务器
  // baseURL: "http://192.168.71.238:8015/api/", //开发本地后端服务器
  // baseURL: "http://192.168.4.5:81/api/", //正式内网服务器
  // baseURL: "http://61.153.37.214:81/api/", //正式外网服务器

  baseURL2: "http://192.168.71.33:301/api", //测试服务器
  // baseURL2: "http://192.168.71.238:8015/api/", //开发本地后端服务器
  // baseURL2: "http://192.168.4.5:81/api/", //正式内网服务器
  // baseURL2: "http://61.153.37.214:81/api/", //正式外网服务器
};
<<<<<<< HEAD
const GIS_CONFIG = {
  baseURL: "http://172.16.40.10:8080/geoserver/", //正式外网服务器
  // baseURL:"http://172.16.40.10:8080/geoserver/",//本地测试服务器
  featureNS: "http://changxing", //正式预案区域图层所在工作空间的url
  // featureNS:"http://www.jinhua.com",//测试预案区域图层所在工作空间的url
  featurePrefix: "changxing", //正式工作空间名称
  // featurePrefix:"jinhua",//测试工作空间名称
}
=======
const GIS_CONFIG={
 baseURL:"http://61.153.37.212:6350/geoserver/",//正式外网服务器
 // baseURL:"http://192.168.1.10:8080/geoserver/",//本地测试服务器
 featureNS:"http://hescgis",//正式预案区域图层所在工作空间的url
 // featureNS:"http://www.haining.com",//测试预案区域图层所在工作空间的url
 featurePrefix:"hescgis",//正式工作空间名称
 // featurePrefix:"haining",//测试工作空间名称
}
>>>>>>> parent of 9e22f64 (update)
