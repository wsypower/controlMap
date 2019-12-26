/**
 * @description: 地图管理类
 * @author:sijianting
 * @createDate:2019/7/11 9:48
 */
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Heatmap as HeatmapLayer } from 'ol/layer'
import GeoJSON from 'ol/format/GeoJSON'
import Overlay from 'ol/Overlay'
import Draw, {createRegularPolygon, createBox} from 'ol/interaction/Draw.js';
import { Modify } from 'ol/interaction.js';
import {Fill, Stroke, Circle, Style,Icon,Text} from 'ol/style';
import Feature from 'ol/Feature';
import MultiPolygon from 'ol/geom/MultiPolygon';
import { fromCircle } from 'ol/geom/Polygon';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import Cluster from 'ol/source/Cluster';
import  AnimatedCluster from 'ol-ext/layer/AnimatedCluster';
import  SelectCluster from 'ol-ext/interaction/SelectCluster';
export class MapManager {
  constructor(map) {
    this.map = map
    this.drawLayer=null;
  }
  /**
   * @description: xy生成要素
   * @param {number} x
   * @param {number} y
   */
  xyToFeature(x, y) {
    return new Feature({
      geometry: new Point([parseFloat(x), parseFloat(y)])
    })
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
    source.addFeatures(features);
    this.map.addLayer(vectorLayer);
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
    source.addFeatures(features);
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
    source.addFeatures(features);
    this.map.addLayer(heatmapLayer);
    return heatmapLayer
  }
    /**
     * @description: 通过features数组添加聚类图层
     * @param {Array} features
     */
  addClusterLayerByFeatures(features){
    const clusterSource = new Cluster({
        distance: 40,
        source: new VectorSource()
    });
    const clusterLayer = new AnimatedCluster({
        name: 'Cluster',
        source: clusterSource,
        animationDuration: 700,
        style: getClusterStyle
    });
    this.map.addLayer(clusterLayer);
    function getClusterStyle(feature, resolution) {
        let styleCache = {};
        if (!feature.get('features')) {
            return;
        }
        let size = feature.get('features').length;

        let style = styleCache[size];
        if (!style) {
            if (size == 1) {
                const styleFeature=feature.get('features')[0];
                style = styleCache[size] = new Style({
                    image:  new Icon({
                        src: require('@/assets/mapImage/'+styleFeature.get('icon')+'.png'),
                        anchor: [0.5, 0.5],
                        size: [30, 39],
                        opacity: 1
                    }),
                });
            } else {
                const color = size>25 ? '192, 0, 0' : size>8 ? '255, 128, 0' : '0, 128, 0';
                const radius = Math.max(8, Math.min(size * 0.75, 20));
                style = styleCache[size] = new Style({
                    image: new Circle({
                        radius: radius,
                        stroke: new Stroke({
                            color: 'rgba(' + color + ', 0.5)',
                            width: 15
                        }),
                        fill: new Fill({
                            color:'rgba(' + color + ', 1)'
                        })
                    }),
                    text: new Text({
                        text: size.toString(),
                        fill: new Fill({
                            color: '#fff'
                        })
                    })
                });
            }
        }
        return [style];
    }
    clusterSource.getSource().addFeatures(features);
    return clusterLayer;
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
      zoom: 17,
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
    if(this.drawLayer){
      this.drawLayer.getSource().clear();
    }
    if(type==='0' ||type==='1') {
      draw = new Draw({
        source,
        type: 'Circle',
        geometryFunction:type=='0'?createRegularPolygon(4):createBox()
      })
    } else if(type==='4') {
      draw = new Draw({
        source,
        type: 'MultiPolygon',
        freehand: true
      })
    }
    else{
      draw = new Draw({
        source,
        type: type === '2' ? 'Circle' : 'MultiPolygon'
      })
    }
    this.map.addInteraction(draw)
    this.drawLayer = new VectorLayer({
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
    this.map.addLayer(this.drawLayer)
    return [draw, this.drawLayer]
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

/**
 * @description:根据请求到的点位列表数据生成轨迹矢量集合
 * @author:sijianting
 * @createDate:2019/12/5 15:31
 */
export function trackByLocationList(list) {
    const features = []
    const coords = []
    // 根据点列生成轨迹线
    list.forEach(trackPt => {
        if (trackPt.gpsx && trackPt.gpsy) {
            const coord = [Number(trackPt.gpsx), Number(trackPt.gpsy)];
            coords.push(coord);
        }
    });
    if (coords.length > 0) {
        // 根据数据生成feature
        const trackLine = trackFeatureByCoords(coords)
        // const firstPoint = pointByCoord(coords[0])
        // const lastPoint = pointByCoord(coords[coords.length - 1])
        features.push(trackLine)
    }
    return features
}

/**
 * 根据点列生成点位轨迹feature
 * @param  {[type]} coords [description]
 * @return {[type]}        [description]
 */
export function trackFeatureByCoords (coords) {
    return new Feature(new LineString(coords))
}
/**
 * 根据点生成点位feature
 * @param  {[type]} coords [description]
 * @return {[type]}        [description]
 */
export function pointByCoord (coord) {
    return new Feature(new Point(coord))
}
/**
 * 根据list生成点位feature
 * @param  {[type]} list [description]
 * @return {[type]}        [description]
 */
export function listToFeatures (list,type) {
    let features;
    switch (type){
        case '人员':
            features = list.map(item=>{
                let pointImg;
                if(item.sex === '1'){
                    if(item.online){
                        pointImg='female_online';
                    }
                    else{
                        pointImg='female_offline';
                    }
                }
                else{
                    if(item.online){
                        pointImg='male_online';
                    }
                    else{
                        pointImg='male_offline';
                    }
                }
                // 通过经纬度生成点位加到地图上
                return pointToFeature(item,pointImg);
            });
            break;
        case '车辆':
            features = list.map(item=>{
                let pointImg;
                if(item.online){
                    pointImg='car-online';
                }
                else{
                    pointImg='car-offline';
                }
                // 通过经纬度生成点位加到地图上
                return pointToFeature(item,pointImg);
            });
            break;
        case '视频':
            features = list.map(item=>{
                // 通过经纬度生成点位加到地图上
                return pointToFeature(item,'carmera_online');
            });
            break;
        case '井盖':
            features=list.map(item=>{
                // 通过经纬度生成点位加到地图上
                let pointImg;
                if(item.info.alarmState=='1'){
                    pointImg='物联设备-3-normal';
                }else{
                    pointImg='物联设备-3-alarm';
                }
                return pointToFeature(item,pointImg);
            });
            break;
        case '垃圾桶':
            features=list.map(item=>{
                // 通过经纬度生成点位加到地图上
                let pointImg;
                if(item.info.alarmState=='1'){
                    pointImg='物联设备-7-normal';
                }else{
                    pointImg='物联设备-7-alarm';
                }
                return pointToFeature(item,pointImg);
            });
            break;
        case '水位计':
            features=list.map(item=>{
                // 通过经纬度生成点位加到地图上
                let pointImg;
                if(item.info.alarmState=='1'){
                    pointImg='物联设备-8-normal';
                }else{
                    pointImg='物联设备-8-alarm';
                }
                return pointToFeature(item,pointImg);
            });
            break;
    }
    return features.filter(Boolean);
}
export function pointToFeature(item,icon) {
    if(item.x && item.x.length>0 && item.y && item.y.length>0){
        const feature=new Feature({
            geometry: new Point([parseFloat(item.x), parseFloat(item.y)])
        });
        feature.set('icon',icon);
        feature.set('props',item);
        return feature;
    }
}

