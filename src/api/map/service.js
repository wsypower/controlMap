/**
 * @description:获取地图接口数据的方法文件
 * @author:sijianting
 * @createDate:2019/7/11 9:18
**/
import { getPoint } from '@/api/map/map'
import GeoJSON from 'ol/format/GeoJSON'

/**
 * @description：获取不同类型点位数据
 * @author:sijianting
 * @returns {Promise<*>}
 */
export async function getTypePoint(type) {
  const data = await getPoint(type);
  return new GeoJSON().readFeatures(data);
}
