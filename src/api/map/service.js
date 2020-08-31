/**
 * @description:获取地图接口数据的方法文件
 * @author:sijianting
 * @createDate:2019/7/11 9:18
 **/
import {
  getPointFeatures,
  postFeature,
  getVideoListApi,
  getResourceListApi,
  getEquipListApi,
  getPeopleListApi
} from '@/api/map/map'
import GeoJSON from 'ol/format/GeoJSON'
import WFS from 'ol/format/WFS'
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

/**
 * @description：获取不同类型点位数据
 * @author:sijianting
 * @returns {Promise<*>}
 */
export async function getTypePoint(type) {
  const data = await getPointFeatures(type)
  return new GeoJSON().readFeatures(data)
}

/**
 * @description:
 * @author:sijianting
 * @createDate:2019/7/22 15:26
 */
export async function getEmergencyFeatures(mapIdList,mapType) {
  let featureType
  switch (mapType) {
    case 'Point':
      featureType = 'yj_point'
      break
    case 'LineString':
      featureType = 'yj_line'
      break
    case 'Polygon':
      featureType = 'yj_polygon'
      break
    default:
      featureType = 'yj_point'
      break
  }
  const data = await getPointFeatures(mapIdList, featureType)
  return new GeoJSON().readFeatures(data)
}

/**
 * @description:保存绘制数据到gis数据库
 * @param type 编辑的类型：add,edit,delete
 * @param drawType 保存的图形类型：Point,LineString,Polygon
 * @param feature 保存的图形要素
 * @author: sijianting
 */
export async function postEmergencyFeatures(drawType, feature) {
  const format = new WFS()
  let xml
  let featureType
  switch (drawType) {
    case 'Point':
      featureType = 'yj_point'
      break
    case 'LineString':
      featureType = 'yj_line'
      break
    case 'Polygon':
      featureType = 'yj_polygon'
      break
    default:
      featureType = 'yj_point'
      break
  }
  const obj = {
    featureNS: 'http://www.' + URL_CONFIG.featurePre + '.com', //该图层所在工作空间的url
    featurePrefix: URL_CONFIG.featurePre, //工作空间名称0
    featureType: featureType //图层名称
  }
  let addFeature=null;
  let updateFeature=null;
  let deleteFeature=null;
  if(feature.add){
    addFeature=feature.add;
  }
  if(feature.update){
    updateFeature=feature.update;
  }
  if(feature.delete){
    deleteFeature=feature.delete;
  }
  xml = format.writeTransaction(addFeature, updateFeature, deleteFeature, obj)
  const serializer = new XMLSerializer();
  //将参数转换为xml格式数据
  const featString = serializer.serializeToString(xml)
  const result = await postFeature(featString)
  return result;
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
        position: r.position
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
  const result = await getResourceListApi(type)
  const data = result.map(r => {
    if (r.x.length > 0 && r.y.length > 0) {
      r.position = [parseFloat(r.x), parseFloat(r.y)]
      return {
        id: r.id,
        position: r.position
      }
    }
  })
  return data.filter(Boolean)
}

/**
 * @description:获取不同种类的物联网设备
 * @author:sijianting
 * @createDate:2019/7/30 14:59
 */
export async function getTypeEquip(type) {
  const result = await getEquipListApi(type)
  const data = result.map(r => {
    if (r.longitudeY.length > 0 && r.latitudeX.length > 0) {
      r.position = [parseFloat(r.longitudeY), parseFloat(r.latitudeX)]
      return {
        id: r.id,
        position: r.position
      }
    }
  })
  return data.filter(Boolean)
}

/**
 * @description:获取所有视频数据
 * @author:sijianting
 * @createDate:2019/8/15 14:46
 */
export async function getAllVideo() {
  const result = await getVideoListApi();
  const data = result.data.map(r => {
    if (r.longitude.length > 0 && r.latitude.length > 0) {
      r.position = [parseFloat(r.longitude), parseFloat(r.latitude)]
      let feature = new Feature(new Point(r.position));
      feature.setId(r.mpid);
      feature.set('id',r.mpid);
      feature.set('type','video');
      return feature;
    }
  })
  return data;
}

/**
 * @description:获取所有应急人员数据
 * @author:sijianting
 * @createDate:2019/8/15 15:26
 */
export async function getAllPeople() {
  const result = await getPeopleListApi();
  console.log('取数据',result);
  const data = result.map(r => {
    if (r.x.length > 0 && r.y.length > 0) {
      r.position = [parseFloat(r.x), parseFloat(r.y)]
      let feature = new Feature(new Point(r.position));
      feature.setId(r.userid);
      feature.set('id',r.userid);
      feature.set('type','people');
      return feature;
    }
  })
  return data;
}