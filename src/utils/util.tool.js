/**
 * @description:
 * @author:sijianting
 * @createDate:2019/7/24 17:32
 */
export function stampConvertToTime(time){
  const date = new Date(parseInt(time) + 8 * 3600 * 1000); // 增加8小时
  return date.toJSON().substr(0, 10).replace('T', ' ');
}