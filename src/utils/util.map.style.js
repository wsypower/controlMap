/**
 * @description:地图样式公共方法
 * @author:sijianting
 * @createDate:2019/7/11 11:16
 */
import Icon from 'ol/style/Icon'
import { Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style.js';

/**
 * @description:应急预案区域样式
 * @author:sijianting
 * @createDate:2019/7/22 15:16
 */
export function emergencyAreaStyle() {
  return new Style({
    stroke: new Stroke({
      color: 'rgb(240,113,113)',
      width: 3
    }),
    fill: new Fill({
      color: 'rgba(80,207,63,.1)'
    })
  })
}
/**
 * @description:应急预案呼叫人员样式
 * @author:sijianting
 * @createDate:2019/7/25 16:53
 */
export function peopleStyle() {
  return new Style({
    image: new Icon({
      src: require('@/assets/mapImage/people-zx.png')
    }),
    anchor: [0.5, 1]
  })
}
/**
 * @description:
 * @author:sijianting
 * @createDate:2019/7/29 16:47
 */
export function videoStyle() {
  return new Style({
    image: new Icon({
      src: require('@/assets/mapImage/周边视频.png')
    }),
    anchor: [0.5, 1]
  })
}
/**
 * @description:保障区域样式
 * @author:sijianting
 * @createDate:2019/8/16 14:37
 */
export function areaStyle() {
  return new Style({
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.3)'
    }),
    stroke: new Stroke({
      color: '#FF0000',
      width: 2
    }),
    image: new CircleStyle({
      radius: 7,
      fill: new Fill({
        color: '#FF0000'
      })
    })
  })
}
