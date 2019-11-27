/**
 * @description:获取地图接口数据的方法文件
 * @author:sijianting
 * @createDate:2019/10/23 17:13
 */
import { getAlarmStatisticDataAPI } from '@/api/video/index'

/**
 * @description:获取告警统计数据方法
 * @author:sijianting
 * @createDate:2019/10/23 17:15
 */
export async function getAlarmStatisticData(type) {
  const { data } = await getAlarmStatisticDataAPI(type)
  return data
}
