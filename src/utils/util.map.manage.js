/**
 * @description: 地图管理类
 * @author:sijianting
 * @createDate:2019/7/11 9:48
 */
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import Draw from 'ol/interaction/Draw.js'
import { Modify, Snap } from 'ol/interaction.js'
import Feature from 'ol/Feature'
// import MultiPolygon from 'ol/geom/MultiPolygon'
import { fromCircle } from 'ol/geom/Polygon'
import Overlay from 'ol/Overlay'
import Cluster from 'ol/source/Cluster'
import Icon from 'ol/style/Icon'
import Style from 'ol/style/Style'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import Circle from 'ol/style/Circle'
import Text from 'ol/style/Text';
import LinearRing from 'ol/geom/LinearRing.js';
import {Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon} from 'ol/geom.js';

export class MapManager {
  constructor(map) {
    this.map = map
    this.drawLayer = null
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
   * @description:
   * @author:sijianting
   * @createDate:2019/8/15 19:16
   */
  addClusterLayerByFeatures(features) {
    const source = new VectorSource({
      features: features
    })
    const clusterSource = new Cluster({
      distance: 40,
      source: source
    })
    let styleCache = {}
    const clusters = new VectorLayer({
      source: clusterSource,
      style: function(feature) {
        const size = feature.get('features').length
        let style = styleCache[size];
        if (!style) {
          if (size > 1) {
            style = [
              new Style({
                image: new Circle({
                  radius: 18,
                  stroke: new Stroke({
                    color: '#fff'
                  }),
                  fill: new Fill({
                    color: '#ffcc00'
                  })
                }),
                text: new Text({
                  text: size.toString(),
                  font: '16px bold serif',
                  fill: new Fill({
                    color: '#000000'
                  })
                })
              })
            ]
            styleCache[size] = style
          } else {
            style = [
              new Style({
                image: new Icon({
                  src: '@/assets/mapImage/people-zx.png'
                })
              })
            ]
            styleCache[size] = style
          }
        }
        return style
      }
    })
    this.map.addLayer(clusters)
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
   * @description: 激活绘制图形功能
   * @param {String}type 绘制类型
   * @param {Boolean}isFreeHand 是否自由绘制
   * @return {*}
   */
  activateDraw(draw,type, source) {
    // let draw
    if (type !== 'None') {
      draw = new Draw({
        source: source,
        type: type
      })
      this.map.addInteraction(draw)
    }
    return draw
  }
  /**
   * @description: 激活修改图形功能
   * @return {*}
   */
  activeModify(source) {
    let modify, snap
    modify = new Modify({ source: source })
    this.map.addInteraction(modify)
    snap = new Snap({ source: source })
    this.map.addInteraction(snap)
    return modify
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
  activeModifyFeature(modify, modifySource) {
    if (modify) {
      this.inactivateDraw(modify)
    }
    modify = new Modify({ source: modifySource })
    this.map.addInteraction(modify)
    return modify
  }
  /**
   * @description:移除单个图层
   * @param layer 需要移除的图层
   */
  removeLayer(layer) {
    this.map.removeLayer(layer)
  }
  getMap() {
    return this.map
  }
}

/**
 * @description:过滤区域内点位的方法
 * @author:sijianting
 * @createDate:2019/7/25 14:56
 */
export function filterVideoPoint(geo, points) {
  // let geo = feature.getGeometry();
  if(geo.getType()=='Point'||geo.getType()=='LineString'){
    geo = createBuffer(geo);
  }
  const videos = points.filter(p => {
    if (geo.intersectsCoordinate(p.getGeometry().getCoordinates())) {
      return p
    }
  })
  return videos
}
/**
 * @description:
 * @author:sijianting
 * @createDate:2019/8/14 10:57
 */
export function filterMapId(data) {
  //点查询idlist
  const pointList = data.filter(p => {
    if (p.mapType == 'Point') {
      return p
    }
  })
  let searchPointId
  if (pointList.length > 0) {
    searchPointId = '('
    for (let i = 0; i < pointList.length; i++) {
      searchPointId += "'" + pointList[i].mapId + "'"
      if (i + 1 < pointList.length) {
        searchPointId += ','
      }
    }
    searchPointId += ')'
  }
  //线查询idlist
  const lineList = data.filter(p => {
    if (p.mapType == 'LineString') {
      return p
    }
  })
  let searchLineId
  if (lineList.length > 0) {
    searchLineId = '('
    for (let i = 0; i < lineList.length; i++) {
      searchLineId += "'" + lineList[i].mapId + "'"
      if (i + 1 < lineList.length) {
        searchLineId += ','
      }
    }
    searchLineId += ')'
  }
  //面查询idlist
  const polygonList = data.filter(p => {
    if (p.mapType == 'Polygon') {
      return p
    }
  })
  let searchPolygonId
  if (polygonList.length > 0) {
    searchPolygonId = '('
    for (let i = 0; i < polygonList.length; i++) {
      searchPolygonId += "'" + polygonList[i].mapId + "'"
      if (i + 1 < polygonList.length) {
        searchPolygonId += ','
      }
    }
    searchPolygonId += ')'
  }
  return [searchPointId, searchLineId, searchPolygonId]
}
/**
 * @description:
 * @author:sijianting
 * @createDate:2019/8/14 17:24
 */
export function filterMapFeature(features) {}
/**
 * @description:圆转面保存
 * @author:sijianting
 * @createDate:2019/7/26 15:22
 */
export function circleToPloygon(feature) {
  const polygon = fromCircle(feature.getGeometry(), 64, 90)
  let mutiPolygon = new MultiPolygon({})
  mutiPolygon.appendPolygon(polygon)
  feature = new Feature({
    geometry: mutiPolygon
  })
  return feature
}
/**
 * @description:通过点或者线生成缓冲区图形
 * @author:sijianting
 * @createDate:2019/8/16 10:16
 */
function createBuffer(geometry) {
  var parser = new jsts.io.OL3Parser();
  parser.inject(Point, LineString, LinearRing, Polygon, MultiPoint, MultiLineString, MultiPolygon);
  var jstsGeom = parser.read(geometry.transform("EPSG:4326", "EPSG:3857"));
  var buffered = jstsGeom.buffer(20);
  var olBuffered = parser.write(buffered);
  var transFormGeo = olBuffered.transform("EPSG:3857","EPSG:4326");
  return transFormGeo;
}

/**
 * @description:通过peoplelist获取相关图形点
 * @author:sijianting
 * @createDate:2019/8/16 10:48
 */
export function getPointByPeopleList(list) {
  let data = [];
  list.map(arr => {
    data = data.concat(arr);
  });
  console.log('222',data);
  const features = data.map(r => {
    if (r.x.length > 0 && r.y.length > 0) {
      r.position = [parseFloat(r.x), parseFloat(r.y)]
      let feature = new Feature(new Point(r.position));
      feature.setId(r.userid);
      feature.set('id',r.userid);
      feature.set('type','people');
      return feature;
    }
  });
  return features.filter(Boolean);
}