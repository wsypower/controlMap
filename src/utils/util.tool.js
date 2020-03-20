/**
 * @description:时间戳转换为时间格式
 * @author:sijianting
 * @createDate:2019/7/24 17:32
 */
// export function stampConvertToTime(time){
//   const date = new Date(parseInt(time) + 8 * 3600 * 1000); // 增加8小时
//   return date.toJSON().substr(0, 10).replace('T', ' ');
// }
export function stampConvertToTime(timestamp = +new Date()) {
    if (timestamp) {
        var time = new Date(timestamp);
        var y = time.getFullYear();
        var M = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var m = time.getMinutes();
        var s = time.getSeconds();
        return y + '-' + addZero(M) + '-' + addZero(d) + ' ' + addZero(h) + ':' + addZero(m) + ':' + addZero(s);
    } else {
        return '';
    }
}
function addZero(m) {
    return m < 10 ? '0' + m : m;
}

/**
 * @description: 时间戳转换为时间格式,固定格式（YYYY-MM-DD）
 * @author: Mo XueJuan
 * @createDate: 2020/03/20 08:57
 */

function formatDate(date) {
  var myyear = date.getFullYear();
  var mymonth = date.getMonth()+1;
  var myweekday = date.getDate();
  if(mymonth < 10){
    mymonth = "0" + mymonth;
  }
  if(myweekday < 10){
    myweekday = "0" + myweekday;
  }
  return (myyear+"-"+mymonth + "-" + myweekday);
}

// 获取本日、本周、本月的日期，每周从星期一开始t: day\week\month
export function getSelectDateRange(t){
  var now = new Date(); //当前日期
  var nowDayOfWeek = now.getDay(); //今天本周的第几天
  var nowDay = now.getDate(); //当前日
  var nowMonth = now.getMonth(); //当前月
  var nowYear = now.getFullYear(); //当前年
  var startDay = '';
  var endDay = '';
  switch (t) {
    case "day"://本日
      startDay = formatDate(new Date());
      endDay = formatDate(new Date());
      break;
    case "week"://本周
      startDay = formatDate(new Date(nowYear,nowMonth,nowDay-nowDayOfWeek+1));
      endDay = formatDate(new Date(nowYear,nowMonth,nowDay-nowDayOfWeek+7));
      break;
    case "month"://本月
      startDay = formatDate(new Date(nowYear,nowMonth,1));
      endDay = formatDate(new Date(new Date(nowYear,nowMonth+1,1)-1000*60*60*24));
      break;
    default:
      break;
  }
  return [startDay,endDay]
}