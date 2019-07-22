/**
 * @description: 地图管理类
 * @author:sijianting
 * @createDate:2019/7/11 9:48
 */
import VectorLayer from 'ol/layer/Vector'
import { Heatmap as HeatmapLayer } from 'ol/layer'
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import Overlay from 'ol/Overlay'
import Draw, {createRegularPolygon, createBox} from 'ol/interaction/Draw.js';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style.js';

export class MapManager {
  constructor(map) {
    this.map = map
    this.drawFeature=null;
    this.drawId=null;
    this.drawCenter=null;
  }
  /**
   * @description: 通过url添加矢量图层
   * @param {String} url
   * @param {style} style
   */
  addVectorLayerByUrl(url, style) {
    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        url
      }),
      style
    })
    this.map.addLayer(vectorLayer)
    return vectorLayer
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
   * @description: 通过features数组添加热力图图层
   * @param {Array} features
   * @param {Array} gradient
   * @param {number} blur
   * @param {number} radius
   */
  addHeatMapLayerByFeatures(features, gradient, blur, radius) {
    const source = new VectorSource({})
    const heatmapLayer = new HeatmapLayer({
      source,
      gradient,
      blur,
      radius
    })
    source.addFeatures(features)
    this.map.addLayer(heatmapLayer)
    return heatmapLayer
  }
  /**
   * @description: 添加弹框
   * @param {[type]} options [description]
   */
  addOverlay(options) {
    const overlay = new Overlay(options)
    this.map.addOverlay(overlay)
    return overlay
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
  activateDraw(type,draw) {
    let source = new VectorSource({ wrapX: false })
    if(draw){
      this.inactivateDraw(draw)
    }
    if(type===0 ||type===1) {
      draw = new Draw({
        source,
        type: 'Circle',
        geometryFunction:type==0?createRegularPolygon(4):createBox()
      })
    } else if(type===4) {
      draw = new Draw({
        source,
        type: 'Polygon',
        freehand: true
      })
    }
    else{
      draw = new Draw({
        source,
        type: type===2?'Circle':'Polygon'
      })
    }
    this.map.addInteraction(draw)
    let drawLayer = new VectorLayer({
      source: source,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.4)'
        }),
        stroke: new Stroke({
          color: '#064ac2',
          width: 2
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: '#064ac2'
          })
        })
      })
    })
    this.map.addLayer(drawLayer)
    return draw
  }
  /**
   *  @description:取消激活绘制功能
   */
  inactivateDraw(draw) {
    this.map.removeInteraction(draw)
  }
  /**
   * @description:移除单个图层
   * @param layer 需要移除的图层
   */
  removeLayer(layer) {
    this.map.removeLayer(layer)
  }
}
