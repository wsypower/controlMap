const URL_CONFIG = {
  // baseURL: "http://192.168.71.33:8015/api", //测试服务器
  // baseURL: "http://218.206.153.37:10000/api/", //开发本地后端服务器
  // baseURL: "http://192.168.4.5:81/api/", //正式内网服务器
  baseURL: "http://zhcg.xzzfj.jinhua.gov.cn/api", //正式外网服务器
  // baseURL: "http://61.153.37.214:81/api/", //正式外网服务器

  // baseURL2: "http://192.168.71.33:301/api", //测试服务器
  // baseURL2: "http://218.206.153.37:10000/api/", //开发本地后端服务器
  // baseURL2: "http://192.168.4.5:81/api/", //正式内网服务器
  // baseURL2: "http://61.153.37.214:81/api/", //正式外网服务器
  baseURL2: "http://zhcg.xzzfj.jinhua.gov.cn/api", //正式外网服务器
};
const GIS_CONFIG = {
  baseURL: "http://zhcg.xzzfj.jinhua.gov.cn/geoserver/", //正式外网服务器
  // baseURL:"http://172.16.40.10:8080/geoserver/",//本地测试服务器
  featureNS: "http://gis.jinhua.com", //正式预案区域图层所在工作空间的url
  // featureNS:"http://www.jinhua.com",//测试预案区域图层所在工作空间的url
  featurePrefix: "jinhua", //正式工作空间名称
  // featurePrefix:"jinhua",//测试工作空间名称
}