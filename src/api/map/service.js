/**
 * @description:获取地图接口数据的方法文件
 * @author:sijianting
 * @createDate:2019/7/11 9:18
 **/
import { getPoint, getEmergencyArea, postFeature } from '@/api/map/map'
import GeoJSON from 'ol/format/GeoJSON'
import WFS from 'ol/format/WFS';

/**
 * @description：获取不同类型点位数据
 * @author:sijianting
 * @returns {Promise<*>}
 */
export async function getTypePoint(type) {
  const data = await getPoint(type)
  return new GeoJSON().readFeatures(data)
}

/**
 * @description:
 * @author:sijianting
 * @createDate:2019/7/22 15:26
 */
export async function getAllEmergencyArea() {
  const data = await getEmergencyArea()
  return new GeoJSON().readFeatures(data)
}

/**
 * @description:
 * @author:sijianting
 * @createDate:2019/7/22 16:35
 */
export async function postEmergencyArea(type, feature) {
  const format = new WFS()
  let xml;
  const obj = {
    featureNS: 'http://www.haining.com', //该图层所在工作空间的uri
    featurePrefix: 'haining', //工作空间名称0
    featureType: '预案区域' //图层名称
  }
  if (type == 'add') {
    xml = format.writeTransaction([feature], null, null, obj)
  } else if (type == 'edit') {
    xml = format.writeTransaction(null, [feature], null, obj)
  } else {
    xml = format.writeTransaction(null, null, feature, obj)
  }
  const serializer = new XMLSerializer()
  //将参数转换为xml格式数据
  const featString = serializer.serializeToString(xml)
  const result = await postFeature(featString)
  return result;
}
