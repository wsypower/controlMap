const URL_CONFIG = {
  // baseURL: "http://192.168.71.33:8015/api", //测试服务器
  // baseURL: "http://192.168.71.220:8281/api/", //开发本地后端服务器
  // baseURL: "http://192.168.4.5:81/api/", //正式内网服务器
  // baseURL: "http://zhcg.xzzfj.jinhua.gov.cn/api", //正式外网服务器
  baseURL: "https://dtcg.mydongtai.cn:8443/api", //正式外网服务器

  // baseURL2: "http://192.168.71.33:301/api", //测试服务器
  // baseURL2: "http://192.168.71.220:8281/api/", //开发本地后端服务器
  // baseURL2: "http://192.168.4.5:81/api/", //正式内网服务器
  // baseURL2: "http://61.153.37.214:81/api/", //正式外网服务器
  baseURL2: "https://dtcg.mydongtai.cn:8443/api", //正式外网服务器
  // zfURL: "http://172.16.24.225:8080/2020_pubdle_dongtai_war_exploded/",
  zfURL: "https://dtcg.mydongtai.cn:8443/pubdle/"//正式外网服务器
};
const GIS_CONFIG = {
  baseURL: "https://dtcg.mydongtai.cn:8443/geoserver/", //正式外网服务器
  // baseURL:"http://172.16.40.10:8080/geoserver/",//本地测试服务器
  featureNS: "http://gis.dongtai.com", //正式预案区域图层所在工作空间的url
  // featureNS: "http://gis.dongtai.com", //测试预案区域图层所在工作空间的url
  featurePrefix: "dongtai", //正式工作空间名称
  // featurePrefix: "dongtai", //测试工作空间名称
  proxyURL: "https://dtcg.mydongtai.cn:8443/proxy/proxy.jsp"
};
const IP_CONFIG = {
  IP: {
    base: "http://2.133.132.15:8082",
    gis: "http://2.133.132.17:6350",
    proxy: "http://2.133.132.11:8081",
    zf: "http://2.133.132.24:9090"
  },
  IP2: {
    base: "http://218.206.153.37:10000",
    gis: "http://218.206.153.37:10000",
    proxy: "http://218.206.153.37:10000",
    zf: "http://218.206.153.37:10000"
  },
  IP3: {
    base: "https://dtcg.mydongtai.cn:8443",
    gis: "https://dtcg.mydongtai.cn:8443",
    proxy: "https://dtcg.mydongtai.cn:8443",
    zf: "https://dtcg.mydongtai.cn:8443"
  }
};
// const host = window.location.host;
const host = window.location.protocol + "//" + window.location.host;
// const ipPortRegExp = /((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)(:\d{0,5})?/;
const ipPortRegExp = /(\w+):\/\/([^/:]+)(:\d*)?/;
for (let key in IP_CONFIG) {
  if (host == IP_CONFIG[key]["base"]) {
    URL_CONFIG.baseURL = URL_CONFIG.baseURL.replace(ipPortRegExp, IP_CONFIG[key]["base"]);
    URL_CONFIG.baseURL2 = URL_CONFIG.baseURL2.replace(ipPortRegExp, IP_CONFIG[key]["base"]);
    URL_CONFIG.zfURL = URL_CONFIG.zfURL.replace(ipPortRegExp, IP_CONFIG[key]["zf"]);
    GIS_CONFIG.baseURL = GIS_CONFIG.baseURL.replace(ipPortRegExp, IP_CONFIG[key]["gis"]);
    GIS_CONFIG.proxyURL = GIS_CONFIG.proxyURL.replace(ipPortRegExp, IP_CONFIG[key]["proxy"]);
    break;
  }
}