const URL_CONFIG = {
  // baseURL: "http://192.168.71.33:8015/api", //测试服务器
  // baseURL: "http://192.168.71.220:8281/api/", //开发本地后端服务器
  // baseURL: "http://192.168.4.5:81/api/", //正式内网服务器
  // baseURL: "http://zhcg.xzzfj.jinhua.gov.cn/api", //正式外网服务器
  baseURL: "http://112.35.28.103:8081/api", //正式外网服务器

  // baseURL2: "http://192.168.71.33:301/api", //测试服务器
  // baseURL2: "http://192.168.71.220:8281/api/", //开发本地后端服务器
  // baseURL2: "http://192.168.4.5:81/api/", //正式内网服务器
  // baseURL2: "http://61.153.37.214:81/api/", //正式外网服务器
  baseURL2: "http://112.35.28.103:8081/api", //正式外网服务器
};
const GIS_CONFIG = {
  baseURL: "http://112.35.80.115:6350/geoserver/", //正式外网服务器
  // baseURL:"http://192.168.1.10:8080/geoserver/",//本地测试服务器
  // featureNS:"http://gis.dongtai.com",//正式预案区域图层所在工作空间的url
  featureNS: "http://yeji", //测试预案区域图层所在工作空间的url
  // featurePrefix:"dongtai",//正式工作空间名称
  featurePrefix: "yeji", //测试工作空间名称
  // proxyURL: "http://172.16.24.192:8082/proxy/proxy.jsp"
}
// const IP_CONFIG = {
//   IP: {
//     base: "218.206.153.37:10000",
//     gis: "218.206.153.37:10000",
//     proxy: "172.16.24.192:8082"
//   },
//   IP2: {
//     base: "218.206.153.37:10000",
//     gis: "218.206.153.37:100001",
//     proxy: "172.16.24.192:80821"
//   }
// }

// const host = window.location.host;
// const ipPortRegExp = /((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)(:\d{0,5})?/;
// for (let key in IP_CONFIG) {
//   if (host == IP_CONFIG[key]["base"]) {
//     URL_CONFIG.baseURL = URL_CONFIG.baseURL.replace(ipPortRegExp, IP_CONFIG[key]["base"]);
//     URL_CONFIG.baseURL2 = URL_CONFIG.baseURL2.replace(ipPortRegExp, IP_CONFIG[key]["base"]);
//     GIS_CONFIG.baseURL = GIS_CONFIG.baseURL.replace(ipPortRegExp, IP_CONFIG[key]["gis"]);
//     GIS_CONFIG.proxyURL = GIS_CONFIG.proxyURL.replace(ipPortRegExp, IP_CONFIG[key]["proxy"]);
//     break;
//   }
// }