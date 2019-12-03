/**
 * @description:地图样式公共方法
 * @author:sijianting
 * @createDate:2019/7/11 11:16
 */
import Icon from 'ol/style/Icon'
import Style from 'ol/style/Style'
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
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
 * @description:车辆点位样式
 * @author:sijianting
 * @createDate:2019/7/22 14:47
 */
export function carPointStyle() {
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
 * @description:应急预案应急资源点位样式
 * @author:sijianting
 * @createDate:2019/7/22 14:47
 */
export function emergencyPointStyle(type) {
  return new Style({
    image: new Icon({
      src: require('@/assets/mapImage/' + type + '.png')
    }),
    anchor: [0.5, 1]
  })
}

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
 * @description:应急预案中心点位样式
 * @author:sijianting
 * @createDate:2019/7/23 14:49
 */
export function emergencyCenterStyle() {
  return new Style({
    image: new Icon({
      src: require('@/assets/mapImage/dingwei.png')
    }),
    anchor: [0.5, 1]
  })
}
/**
 * @description:应急预案呼叫人员样式
 * @author:sijianting
 * @createDate:2019/7/25 16:53
 */
export function emergencyPeopleStyle() {
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
const allType=['挖掘机','救援绳','救生衣','水车','渣土车','皮划艇','管理人员','执法终端','车载卡口gps','市政环卫车辆']
/**
 * @description:应急资源图标
 * @author:sijianting
 * @createDate:2019/7/30 9:49
 */
export function emergencyResourceStyle(type) {
  if(!allType.includes(type)){
    type = 'mrtb';
  }
  return new Style({
    image: new Icon({
      src: require('@/assets/mapImage/' + type + '.png')
    }),
    anchor: [0.5, 1]
  })
}

/**
 * @description:物联网设备图标
 * @author:sijianting
 * @createDate:2019/7/31 16:37
 */
export function emergencyEquipStyle(type) {
  return function(feature) {
    let iconOptions = {}
    const state = feature.get('state');
    if (state=='1') {
      iconOptions = {
        src: require('@/assets/mapImage/物联设备-' + type + '-normal.png')
      }
    } else {
      iconOptions = {
        src: require('@/assets/mapImage/物联设备-' + type + '-alarm.png')
      }
    }
    let style = new Style({
      image: new Icon(iconOptions),
      anchor: [0.5, 1],
    })
    return style
  }
}
