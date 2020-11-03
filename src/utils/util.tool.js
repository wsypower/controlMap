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