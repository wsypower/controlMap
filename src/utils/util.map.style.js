/**
 * @description:地图样式公共方法
 * @author:sijianting
 * @createDate:2019/7/11 11:16
 */
import {Fill, Stroke, Circle, Style,Icon} from 'ol/style';
/**
 * @description:人员点位样式
 * @author:sijianting
 * @createDate:2019/7/22 14:47
 */
export function PeoplePointStyle() {
  return function(feature) {
    return new Style({
      image: new Icon({
        src: require('@/assets/mapImage/' + feature.get('icon') + '.png')
      }),
      anchor: [0.5, 1],
    })
  }
}
/**
 * @description:普通轨迹样式
 * @author:sijianting
 * @createDate:2019/12/6 10:36
 */
export function trackStyle() {
    return new Style({//红线
        stroke: new Stroke({
            color: 'red',
            width: 5
        })
    })
}
/**
 * @description:轨迹点位样式
 * @author:sijianting
 * @createDate:2019/12/6 10:46
 */
export function trackPointStyle() {
    return function(feature) {
        if (feature.get('operate')) {//是案卷点
            return new Style({//普通轨迹点样式
                image: new Circle({
                    radius: 5,
                    fill: new Fill({
                        color: '#3399CC'
                    }),
                    stroke: new Stroke({
                        color: '#fff',
                        width: 2
                    })
                })
            });
        }
    }
}
const violateTypeColor={
    '1':'#f07171',
    '2':'orange',
    '3':'red'
};
/**
 * @description:违规轨迹样式
 * @author:sijianting
 * @createDate:2019/12/6 10:36
 */
export function violateStyle(type) {
    return function(feature) {
        return new Style({//红线
            stroke: new Stroke({
                color: violateTypeColor[type],
                width: 5
            })
        })
    }
}
/**
 * @description:违规轨迹点位样式
 * @author:sijianting
 * @createDate:2019/7/22 14:47
 */
export function violatePointStyle(type) {
    return function(feature) {
        return new Style({//普通轨迹点样式
            image: new Circle({
                radius: 5,
                fill: new Fill({
                    color: '#fff',
                }),
                stroke: new Stroke({
                    color: violateTypeColor[type],
                    width: 3
                })
            })
        });
    }
}
