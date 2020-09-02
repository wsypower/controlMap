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
import  AnimatedCluster from 'ol-ext/layer/AnimatedCluster';

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
      zoom: 18,
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