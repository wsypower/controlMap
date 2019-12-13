/**
 * @description:轨迹播放方法
 * @author:sijianting
 * @createDate:2019/12/6 14:57
 */
import {Fill, Stroke, Circle, Style,Icon} from 'ol/style';
import {transform} from 'ol/proj';
import {getDistance} from 'ol/sphere';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
export class TrackPlaying{
    constructor(map, data, routeStyle, trackPointStyle,type) {
        this.map = map;
        this.data = data;
        this.cycleNumber = 0;
        this.type=type;
        this.trackCoords = null;//所有经纬度点
        this.trackLength = 0;//轨迹点总数
        this.speed=0.1;
        this.animation=null;//定义requestAnimationFrame变量
        this.routeStyle = routeStyle || new Style({
            stroke: new Stroke({
                color: 'blue',
                width: 4
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
        this.lineSource = new VectorSource();//线条数据源
        this.lineLayer = new VectorLayer({
            zIndex:4
        });//定义线条图层
        this.trackLayer = new VectorLayer({//定义轨迹图层
            source: new VectorSource({}),
            zIndex:4
        });
        this.init();
    }
    init(){
        if (this.map === null || this.map === undefined || this.map === "") {
            this.$message.warning('没有定义地图对象!');
            return;
        };
        this.map.addLayer(this.lineLayer);
        this.map.addLayer(this.trackLayer);
    }
    //处理经纬度数据
    dealCoordsData(){
        let x, y, x1, y1;
        const data = this.data, speed = parseInt(this.speed);
        if (data === null || data === undefined || data === "" || data.length <= 0) {
            console.log("经纬度数据为空！"); return;
        }
        let newArray = [];
        for (let i = 0; i < data.length - 1; i++) {
            x = data[i][0];
            y = data[i][1];
            x1 = data[i + 1][0]; y1 = data[i + 1][1];
            if (x === x1 && y === y1) {
                continue;
            }
            if ( x && x>0 && y && y>0) {
                x = parseFloat(x);
                y = parseFloat(y);
                x1 = parseFloat(x1);
                y1 = parseFloat(y1);
                let distance = Math.floor(this.calDistance([[x, y], [x1, y1]]));
                if (distance < 1) {
                    continue;
                }
                if (distance >= 20) {//这里其实起到一个限制速度的作用
                    distance = Math.floor(distance / speed);
                }
                const arcGenerator = new GreatCircle({x: x, y: y}, {x: x1, y: y1});
                let arcLine = arcGenerator.arc(distance, {offset: 0});//在两个点之间生成n个点
                let coords = arcLine[0].coords;//获取生成的所有坐标点
                for (let j = 0; j < coords.length; j++) {
                    newArray.push([coords[j][0], coords[j][1]]);
                }
            }
        }
        newArray.push([parseFloat(data[data.length - 1][0]), parseFloat(data[data.length - 1][1])]);
        this.trackCoords = newArray;
        this.trackLength = newArray.length;
    }
    //在地图上画出路线
    drawLine(){
        const data = this.trackCoords;
        if (data === null || data === undefined || data === "" || data.length <= 0) {
            console.log("经纬度数据为空！"); return;
        };
        //定义线条要素,把线条要素添加进去
        let lineArr=[];
        for (let i = 0; i < data.length; i++) {
            lineArr.push([parseFloat(data[i][0]), parseFloat(data[i][1])]);
            // geometry.appendCoordinate([parseFloat(data[i][0]), parseFloat(data[i][1])]);
        }
        const geometry = new LineString(lineArr);
        let routeFeature = new Feature({
            geometry:geometry
        });
        routeFeature.setStyle(this.routeStyle);
        this.lineSource.addFeature(routeFeature);
        this.map.getView().fit(geometry);
        //显示轨迹点图标并将数据放入到图层里
        this.lineLayer.setSource(this.lineSource);
    }
    //沿轨迹移动
    trackMoving(){
        if (this.trackCoords === null || this.trackLength <= 0) {
            this.$message.warning('没有经纬度数据或经纬度数据不合格！');
            return;
        }
        this.cycleNumber += 1;
        if (this.cycleNumber === 1) {
            this.geoMarker.setStyle(null);
        }
        let x, x1, y, y1;
        if (this.cycleNumber < this.trackLength) {
            x = this.trackCoords[this.cycleNumber][0];
            x1 = this.trackCoords[this.cycleNumber - 1][0];
            y = this.trackCoords[this.cycleNumber][1];
            y1 = this.trackCoords[this.cycleNumber - 1][1];
        }
        let dx = x - x1, dy = y - y1;
        if((dx && dy) && (dx != 0 || dy != 0)){
            const rotation = Math.atan2(dy, dx);
            const PI=Math.PI;
            //var angle=rotation*180/Math.PI;
            let rotationTrue=0;
            let suffix='';
            if (rotation>=0&&rotation<PI/2) {//24象限顺指针旋转，为正值,13象限逆时针旋转，为负值；1，4象限脸朝右，2，3象限脸朝左
                rotationTrue=-rotation;
                suffix='';
            } else if (rotation>=PI/2&&rotation<PI) {
                rotationTrue=(PI-rotation);
                suffix='bak';
            }else if (rotation>=-PI&&rotation<-PI/2){
                rotationTrue=-(rotation+PI);
                suffix='bak';
            }else if (rotation>=-PI/2&&rotation<0){
                suffix='';
                rotationTrue=(-rotation);
            }
            const num=this.cycleNumber%20+1;//动图,换掉文件夹里的图
            let this_img;
            if(this.type=='people'){
                this_img=new Icon({
                    src: require('@/assets/mapImage/track/people/'+num+suffix+'.png'),
                    rotateWithView: false,
                    scale:0.3,
                    anchor:[0.5,1],
                    rotation:rotationTrue
                })
            }
            else{
                this_img=new Icon({
                    src: require('@/assets/mapImage/track/car/car_track.png'),
                    rotateWithView: false,
                    scale:0.3,
                    anchor:[0.5,1],
                    rotation:rotationTrue
                })
            }
            this.trackPointStyle.setImage(this_img);
            const feature = new Feature(new Point(this.trackCoords[this.cycleNumber]));
            this.trackLayer.getSource().clear();
            this.trackLayer.getSource().addFeature(feature);
            this.trackLayer.setStyle(this.trackPointStyle);
        };
        if (this.cycleNumber < this.trackLength) {
            this.animation = window.requestAnimationFrame(this.trackMoving.bind(this));
        }else{ //播放完毕,暂停按钮要换成播放按钮

        }
    }
    //停止移动
    stopMoving(){
        this.cycleNumber = 0;
        if (this.trackLayer.getSource() != null){
            this.trackLayer.getSource().clear();
        }
        if (this.trackLength > 0) {
            this.geoMarker.setGeometry(new Point(this.trackCoords[0]));
            this.geoMarker.setStyle(this.trackPointStyle);
        }
        window.cancelAnimationFrame(this.animation);
    }
    //暂停移动
    pauseMoving(){
        window.cancelAnimationFrame(this.animation);
    }
    //继续移动
    continueMoving(){
        this.animation = window.requestAnimationFrame(this.trackMoving.bind(this));
    }
    //清除图层
    clearLayer(){
        if (this.lineSource != null) {
            this.lineSource.clear();
        }
        if (this.trackLayer.getSource() != null){
            this.trackLayer.getSource().clear();
        }
        //计数器清零
        this.cycleNumber = 0;
    }
    //计算距离
    calDistance(coordinates){
        let length = 0;
        let sourceProj = this.map.getView().getProjection();
        for (let i = 0, ii = coordinates.length - 1; i < ii; ++i) {
            const c1 = transform(coordinates[i], sourceProj, 'EPSG:4326');
            const c2 = transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
            length += getDistance(c1, c2,6378137);
        }
        return length;
    }
}

export class GreatCircle{
    constructor(start,end){
        this.properties = {};
        this.geometries = [];
        if (!start || start.x === undefined || start.y === undefined) {
            return;
        }
        if (!end || end.x === undefined || end.y === undefined) {
            return;
        }
        this.thisStart = this.getCoord(start.x,start.y);
        this.thisEnd = this.getCoord(end.x,end.y);

        const w = this.thisStart.x - this.thisEnd.x;
        const h = this.thisStart.y - this.thisEnd.y;
        const z = Math.pow(Math.sin(h / 2.0), 2) +
            Math.cos(this.thisStart.y) *
            Math.cos(this.thisEnd.y) *
            Math.pow(Math.sin(w / 2.0), 2);
        this.g = 2.0 * Math.asin(Math.sqrt(z));
    }
    getCoord(lon,lat) {
        return  {
            lon:lon,
            lat:lat,
            x:Math.PI / 180*lon,
            y:Math.PI / 180*lat
        }
    }
    interpolate(f){
        this.D2R = Math.PI / 180;
        this.R2D = 180 / Math.PI;
        const A = Math.sin((1 - f) * this.g) / Math.sin(this.g);
        const B = Math.sin(f * this.g) / Math.sin(this.g);
        const x = A * Math.cos(this.thisStart.y) * Math.cos(this.thisStart.x) + B * Math.cos(this.thisEnd.y) * Math.cos(this.thisEnd.x);
        const y = A * Math.cos(this.thisStart.y) * Math.sin(this.thisStart.x) + B * Math.cos(this.thisEnd.y) * Math.sin(this.thisEnd.x);
        const z = A * Math.sin(this.thisStart.y) + B * Math.sin(this.thisEnd.y);
        const lat = this.R2D * Math.atan2(z, Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
        const lon = this.R2D * Math.atan2(y, x);
        return [lon, lat];
    }
    arc(npoints,options){
        let first_pass = [];
        if (!npoints || npoints <= 2) {
            first_pass.push([this.thisStart.lon, this.thisStart.lat]);
            first_pass.push([this.thisEnd.lon, this.thisEnd.lat]);
        } else {
            const delta = 1.0 / (npoints - 1);
            for (let i = 0; i < npoints; ++i) {
                const step = delta * i;
                const pair = this.interpolate(step);
                first_pass.push(pair);
            }
        }
        let bHasBigDiff = false;
        let dfMaxSmallDiffLong = 0;
        const dfDateLineOffset = options && options.offset ? options.offset : 10;
        const dfLeftBorderX = 180 - dfDateLineOffset;
        const dfRightBorderX = -180 + dfDateLineOffset;
        const dfDiffSpace = 360 - dfDateLineOffset;
        for (let j = 1; j < first_pass.length; ++j) {
            const dfPrevX = first_pass[j-1][0];
            const dfX = first_pass[j][0];
            const dfDiffLong = Math.abs(dfX - dfPrevX);
            if (dfDiffLong > dfDiffSpace &&
                ((dfX > dfLeftBorderX && dfPrevX < dfRightBorderX) || (dfPrevX > dfLeftBorderX && dfX < dfRightBorderX))) {
                bHasBigDiff = true;
            } else if (dfDiffLong > dfMaxSmallDiffLong) {
                dfMaxSmallDiffLong = dfDiffLong;
            }
        }
        let poMulti = [];
        if (bHasBigDiff && dfMaxSmallDiffLong < dfDateLineOffset) {
            let poNewLS = [];
            poMulti.push(poNewLS);
            for (let k = 0; k < first_pass.length; ++k) {
                const dfX0 = parseFloat(first_pass[k][0]);
                if (k > 0 &&  Math.abs(dfX0 - first_pass[k-1][0]) > dfDiffSpace) {
                    let dfX1 = parseFloat(first_pass[k-1][0]);
                    let dfY1 = parseFloat(first_pass[k-1][1]);
                    let dfX2 = parseFloat(first_pass[k][0]);
                    let dfY2 = parseFloat(first_pass[k][1]);
                    if (dfX1 > -180 && dfX1 < dfRightBorderX && dfX2 == 180 && k+1 < first_pass.length && first_pass[k-1][0] > -180 && first_pass[k-1][0] < dfRightBorderX){
                        poNewLS.push([-180, first_pass[k][1]]);
                        k++;
                        poNewLS.push([first_pass[k][0], first_pass[k][1]]);
                        continue;
                    }else if (dfX1 > dfLeftBorderX && dfX1 < 180 && dfX2 == -180 && k+1 < first_pass.length &&	first_pass[k-1][0] > dfLeftBorderX && first_pass[k-1][0] < 180){
                        poNewLS.push([180, first_pass[k][1]]);
                        k++;
                        poNewLS.push([first_pass[k][0], first_pass[k][1]]);
                        continue;
                    }
                    if (dfX1 < dfRightBorderX && dfX2 > dfLeftBorderX){
                        const tmpX = dfX1;
                        dfX1 = dfX2;
                        dfX2 = tmpX;
                        const tmpY = dfY1;
                        dfY1 = dfY2;
                        dfY2 = tmpY;
                    }
                    if (dfX1 > dfLeftBorderX && dfX2 < dfRightBorderX) {
                        dfX2 += 360;
                    }
                    if (dfX1 <= 180 && dfX2 >= 180 && dfX1 < dfX2){
                        const dfRatio = (180 - dfX1) / (dfX2 - dfX1);
                        const dfY = dfRatio * dfY2 + (1 - dfRatio) * dfY1;
                        poNewLS.push([first_pass[k-1][0] > dfLeftBorderX ? 180 : -180, dfY]);
                        poNewLS = [];
                        poNewLS.push([first_pass[k-1][0] > dfLeftBorderX ? -180 : 180, dfY]);
                        poMulti.push(poNewLS);
                    }else{
                        poNewLS = [];
                        poMulti.push(poNewLS);
                    }
                    poNewLS.push([dfX0, first_pass[k][1]]);
                } else {
                    poNewLS.push([first_pass[k][0], first_pass[k][1]]);
                }
            }
        } else {
            let poNewLS0 = [];
            poMulti.push(poNewLS0);
            for (let l = 0; l < first_pass.length; ++l) {
                poNewLS0.push([first_pass[l][0],first_pass[l][1]]);
            }
        }
        for (let m = 0; m < poMulti.length; ++m) {
            let line = new lineString();
            this.geometries.push(line);
            const points = poMulti[m];
            for (let j0 = 0; j0 < points.length; ++j0) {
                line.move_to(points[j0]);
            }
        }
        return this.geometries;
    }
}

export class lineString {
    constructor(){
        this.coords = [];
        this.length = 0;
    }
    move_to(coord){
        this.length++;
        this.coords.push(coord);
    }
}