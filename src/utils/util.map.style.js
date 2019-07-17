/**
 * @description:地图样式公共方法
 * @author:sijianting
 * @createDate:2019/7/11 11:16
 */
import Icon from 'ol/style/Icon'
import Style from 'ol/style/Style'

export function emergencyPointStyle(type) {
  return new Style({
    image: new Icon({
      src: require('@/assets/mapImage/' + type + '.png')
    }),
    anchor: [0.5, 1]
  })
}
