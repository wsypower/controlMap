/**
 * 车辆管理地图管理器
 * @authors jisj
 * @date    2019-03-11 15:40:13
 */
import VectorLayer from 'ol/layer/Vector';
import { Heatmap as HeatmapLayer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Overlay from 'ol/Overlay';
import { Draw} from 'ol/interaction';
export default class MapManager {
  constructor(map) {
    this.map = map;
  }
  addVectorLayerByUrl(url, style) {
    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        url
      }),
      style
    });
    this.map.addLayer(vectorLayer);
    return vectorLayer;
  }
  addVectorLayerByGeoJSON(geojson, style) {
    const source = new VectorSource({});
    const vectorLayer = new VectorLayer({
      source,
      style
    });
    const features = new GeoJSON().readFeatures(geojson);
    source.addFeatures(features);
    this.map.addLayer(vectorLayer);
    return vectorLayer;
  }
  addVectorLayerByFeatures(features, style, zIndex) {
    const source = new VectorSource({});
    const vectorLayer = new VectorLayer({
      source,
      style,
      zIndex
    });
    source.addFeatures(features);
    this.map.addLayer(vectorLayer);
    return vectorLayer;
  }

  /**
   * 添加热力图
   */
  addHeatMapLayerByFeatures(features, gradient, blur, radius) {
    const source = new VectorSource({});
    const heatmapLayer = new HeatmapLayer({
      source,
      gradient,
      blur,
      radius
    });
    source.addFeatures(features);
    this.map.addLayer(heatmapLayer);
    return heatmapLayer;
  }
  /**
   * 添加弹框
   * @param {[type]} options [description]
   */
  addOverlay(options) {
    const overlay = new Overlay(options);
    this.map.addOverlay(overlay);
    return overlay;
  }

  /**
   * 定位
   * @param  {[type]} coord [description]
   * @return {[type]}       [description]
   */
  locateTo(coord) {
    this.map.getView().animate({
      center: coord,
      zoom: 15,
      duration: 500
    })
  }

  /**
   * 激活绘制功能
   * type可为Polygon Circle
   * isFreeHand为true or false
   */
  activateDraw(type,isFreeHand) {
    let source = new VectorSource();
    let draw;
    if(isFreeHand){
      draw = new Draw({
        source,
        type: type,
        freehand: true
      });}
    else{
      draw = new Draw({
        source,
        type: type,
      });}
    this.map.addInteraction(draw);
    return draw;
  }

  /**
   * 取消激活绘制功能
   * @return {[type]} [description]
   */
  inactivateDraw(draw) {
    this.map.removeInteraction(draw);
  }

  /**
   * 移除图层
   */
  removeLayer(layer) {
    this.map.removeLayer(layer);
  }
}