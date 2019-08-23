/**
 * @description:获取地图接口数据的方法文件
 * @author:sijianting
 * @createDate:2019/7/11 9:18
 **/
import { getPoint, getEmergencyArea, postFeature, getVideoListApi,getResourceListApi,
  getEquipListApi, getAddressByXY } from '@/api/map/map'
import GeoJSON from 'ol/format/GeoJSON'
import WFS from 'ol/format/WFS'

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
 * @description:保存应急预案区域方法
 * @author:sijianting
 * @createDate:2019/7/22 16:35
 */
export async function postEmergencyArea(type, feature) {
  const format = new WFS()
  let xml
  const obj = {
    featureNS: 'http://www.haining.com', //该图层所在工作空间的uri
    featurePrefix: 'haining', //工作空间名称0
    featureType: '预案区域',//图层名称
  }
  if (type == 'add') {
    xml = format.writeTransaction([feature], null, null, obj)
  } else if (type == 'edit') {
    obj.version = '1.0.0';
    console.log('==编辑圆形===', feature)
    xml = format.writeTransaction(null, [feature], null, obj)
  } else {
    xml = format.writeTransaction(null, null, feature, obj)
  }
  const serializer = new XMLSerializer()
  //将参数转换为xml格式数据
  const featString = serializer.serializeToString(xml)
  const result = await postFeature(featString)
  return result
}

/**
 * @description:获取所以摄像头数据并过滤出区域内摄像头
 * @author:sijianting
 * @createDate:2019/7/29 15:12
 */
export async function getAreaVideo() {
  const result = await getVideoListApi()
  const data = result.map(r => {
    if (r.x84.length > 0 && r.y84.length > 0) {
      r.position = [parseFloat(r.x84), parseFloat(r.y84)]
      return {
        id: r.id,
        position: r.position,
      }
    }
  })
  return data
}

/**
 * @description:获取不同种类应急资源的数据
 * @author:sijianting
 * @createDate:2019/7/30 10:14
 */
export async function getTypeResources(type) {
  const result=await getResourceListApi(type);
  const data = result.map(r => {
    if (r.x.length > 0 && r.y.length > 0){
      r.position = [parseFloat(r.x), parseFloat(r.y)];
      return {
        id: r.id,
        position: r.position,
      }
    }
  });
  return data.filter(Boolean);
}

/**
 * @description:获取不同种类的物联网设备
 * @author:sijianting
 * @createDate:2019/7/30 14:59
 */
export async function getTypeEquip(type) {
  const result = await getEquipListApi(type);
  const data = result.map(r => {
    if (r.longitudeGps84Y.length > 0 && r.latitudeGps84X.length > 0){
      r.position = [parseFloat(r.longitudeGps84Y), parseFloat(r.latitudeGps84X)];
      return {
        id: r.id,
        position: r.position,
      }
    }
  });
  return data.filter(Boolean);
}
/**
 * @description:
 * @author:sijianting
 * @createDate:2019/8/23 10:19
 */
export async function getAddress(xy) {
  const { result } = await getAddressByXY(xy);
  return result.formatted_address;
}