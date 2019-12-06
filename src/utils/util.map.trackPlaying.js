/**
 * @description:
 * @author:sijianting
 * @createDate:2019/12/6 14:57
 */
import {Fill, Stroke, Circle, Style,Icon} from 'ol/style';
export class TrackPlaying{
    constructor(map, data, routeStyle, trackPointStyle,type) {
        this.map = map;
        this.data = data;
        this.cycleNumber = 0;
        this.type=type;
        this.trackCoords = null;//所有经纬度点
        this.trackLength = 0;//轨迹点总数
        this.animation=null;//定义requestAnimationFrame变量
        this.routeStyle = routeStyle || new Style({
            stroke: new Stroke({
                color: 'blue',
                width: 2
            })
        });
        this.trackPointStyle = trackPointStyle || new Style({
            image:new Circle({
                radius:8,
                fill:new Fill({
                    color:'red'
                })
            })
        });
        this.geoMarker = new Feature();//轨迹开始点
        this.lineSource = new ol.source.Vector();//线条数据源
        this.lineLayer = new ol.layer.Vector();//定义线条图层
        this.trackLayer = new ol.layer.Vector({//定义轨迹图层
            source: new ol.source.Vector({})
        });
        this.init();
    }
}