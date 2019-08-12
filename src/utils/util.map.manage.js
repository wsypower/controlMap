/**
 * @description: 地图管理类
 * @author:sijianting
 * @createDate:2019/7/11 9:48
 */
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import Draw from 'ol/interaction/Draw.js';
import { Modify } from 'ol/interaction.js';
import Feature from 'ol/Feature';
import MultiPolygon from 'ol/geom/MultiPolygon';
import { fromCircle } from 'ol/geom/Polygon'

export class MapManager {
  constructor(map) {
    this.map = map;
    this.drawLayer = null;
  }
  /**
   * @description: 通过geojson格式数据添加矢量图层
   * @param {geojson} geojson
   * @param {style} style
   */
  addVectorLayerByGeoJSON(geojson, style) {
    const source = new VectorSource({})
    const vectorLayer = new VectorLayer({
      source,
      style
    })
    const features = new GeoJSON().readFeatures(geojson)
    source.addFeatures(features)
    this.map.addLayer(vectorLayer)
    return vectorLayer
  }
  /**
   * @description: 通过features数组添加矢量图层
   * @param {Array} features
   * @param {style} style
   * @param {number} zIndex
   */
  addVectorLayerByFeatures(features, style, zIndex) {
    const source = new VectorSource({})
    const vectorLayer = new VectorLayer({
      source,
      style,
      zIndex
    })
    source.addFeatures(features)
    this.map.addLayer(vectorLayer)
    return vectorLayer
  }
  /**
   * @description: 定位
   * @param  {Array} coord 经纬度
   */
  locateTo(coord) {
    this.map.getView().animate({
      center: coord,
      zoom: 15,
      duration: 500
    })
  }
  /**
   * @description: 激活绘制功能
   * @param {String}type 绘制类型
   * @param {Boolean}isFreeHand 是否自由绘制
   * @return {*}
   */
  activateDraw(type,source) {
    // let pointSource = new VectorSource({ wrapX: false });
    let draw;
    // let lineSource= new VectorSource({ wrapX: false });
    // let polygonSource = new VectorSource({ wrapX: false });
    if (type !== 'None') {
      draw = new Draw({
        source: source,
        type: type
      });
      // this.drawLayer = new VectorLayer({
      //   source: pointSource,
      // })
      // this.map.addLayer(this.drawLayer)
      this.map.addInteraction(draw);
    }
    return draw;
  }
  /**
   * @description: 激活点绘制功能
   * @return {*}
   */
  activePointDraw(){

  }
  /**
   *  @description:取消激活绘制功能
   */
  inactivateDraw(draw) {
    this.map.removeInteraction(draw)
  }

  /**
   * @description:激活修改地图
   * @author:sijianting
   * @createDate:2019/7/26 9:52
   */
  activeModifyFeature(modify, modifySource){
    if(modify){
      this.inactivateDraw(modify);
    }
    modify = new Modify({ source: modifySource});
    this.map.addInteraction(modify);
    return modify;
  }
  /**
   * @description:移除单个图层
   * @param layer 需要移除的图层
   */
  removeLayer(layer) {
    this.map.removeLayer(layer)
  }
  getMap(){
    return this.map;
  }
}

/**
 * @description:过滤区域内点位的方法
 * @author:sijianting
 * @createDate:2019/7/25 14:56
 */
export function filterMeetingPeople(feature, points) {
  const geo = feature.getGeometry();
  const peoples = points.filter(p => {
    if(geo.intersectsCoordinate(p.position)){
      return p;
    }
  });
  return peoples;
}

/**
 * @description:圆转面保存
 * @author:sijianting
 * @createDate:2019/7/26 15:22
 */
export function circleToPloygon(feature) {
  const polygon = fromCircle(feature.getGeometry(), 64,90);
  let mutiPolygon = new MultiPolygon({});
  mutiPolygon.appendPolygon(polygon);
  feature = new Feature({
    geometry: mutiPolygon
  })
  return feature;
}

