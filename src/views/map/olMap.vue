<template>
  <div id="map">
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import 'ol/ol.css'
import { Map, View } from 'ol'
import { defaults as defaultControls } from 'ol/control'
import { get as projGet } from 'ol/proj'
import { Tile as TileLayer } from 'ol/layer'
import WMTS from 'ol/source/WMTS'
import WMTSTileGrid from 'ol/tilegrid/WMTS'
import { getTopLeft } from 'ol/extent'
import { MapManager } from '@/utils/util.map.manage'

const namespace = 'map'
let mapManager
export default {
  data() {
    return {
      mockPoints: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 初始化地图底图
      this.initMap()
    })
  },
  methods: {
    ...mapMutations(namespace, [
      'setMapManager',
    ]),
    initMap() {
      /* 添加影像地图 */
      this.map = new Map({
        loadTilesWhileAnimating: true,
        target: 'map',
        view: new View({
          projection: 'EPSG:4326',
          center: [120.6764940639754, 30.514338438237456],
          zoom: 11,
          maxZoom: 20,
          minZoom: 7
        }),
        layers: this.getBaseLayers(),
        controls: defaultControls({ attribution: false, rotate: false, zoom: false }) // 默认控件配置
      })
      mapManager = new MapManager(this.map)
      // 将mapManager状态存至vuex
      this.setMapManager(mapManager)
    },
    getBaseLayers() {
      /**
       * @desc 定义坐标系统与范围
       */
      const projection = projGet('EPSG:4326') // 4326坐标
      const projectionExtent = projection.getExtent()
      /**
       * @desc 去掉第0层的天地图分辨率信息，不会出现缩放到最后是空白的现象
       */
      const tdtResolutions = [
        0.02197265625,
        0.010986328125,
        0.0054931640625,
        0.00274658203125,
        0.001373291015625,
        0.0006866455078125,
        0.00034332275390625,
        0.000171661376953125,
        0.0000858306884765625,
        0.00004291534423828125,
        0.000021457672119140625,
        0.0000107288360595703125,
        0.00000536441802978515625,
        0.000002682209014892578125,
        0.0000013411045074462890625
      ]

      /**
       * @desc 与分辨率信息需要每层严格对应起来
       */
      const matrixIds = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
      const matrixIdszj = [15, 16, 17, 18, 19, 20]
      /**
       * @desc 天地图格网信息
       */
      const tdtGrid = new WMTSTileGrid({
        origin: getTopLeft(projectionExtent),
        resolutions: tdtResolutions.slice(0, 12),
        matrixIds: matrixIds
      })
      const tdtGridzj = new WMTSTileGrid({
        origin: getTopLeft(projectionExtent),
        resolutions: tdtResolutions.slice(9, 15),
        matrixIds: matrixIdszj
      })
      /**
       * @desc 国家天地图图层
       */
      const wmtsVecLayer = new TileLayer({
        source: new WMTS({
          layer: 'vec',
          style: 'default',
          version: '1.0.0',
          matrixSet: 'c',
          format: 'tiles',
          url: 'http://t{0-6}.tianditu.com/vec_c/wmts?tk=c5ea7cd74c9b43ebb4fd9b73ef2f9f74',
          tileGrid: tdtGrid,
          wrapX: true
        })
      })
      const wmtsAnnoLayer = new TileLayer({
        source: new WMTS({
          layer: 'cva',
          style: 'default',
          version: '1.0.0',
          matrixSet: 'c',
          format: 'tiles',
          url: 'http://t{0-6}.tianditu.com/cva_c/wmts?tk=c5ea7cd74c9b43ebb4fd9b73ef2f9f74',
          tileGrid: tdtGrid,
          wrapX: true
        })
      })
      /**
       * @desc 浙江天地图图层
       */
      const zJVecLayer = new TileLayer({
        source: new WMTS({
          style: 'default',
          version: '1.0.0',
          layer: 'ZJEMAP',
          matrixSet: 'TileMatrixSet0',
          format: 'image/png',
          url: 'http://srv.zjditu.cn/ZJEMAP_2D/wmts?tk=c5ea7cd74c9b43ebb4fd9b73ef2f9f74',
          tileGrid: tdtGridzj,
          wrapX: true
        }),
        minResolution: 0.0000013411045074462890625,
        maxResolution: 0.0000858306884765625
      })

      const zJAnnoLayer = new TileLayer({
        source: new WMTS({
          style: 'default',
          version: '1.0.0',
          layer: 'ZJEMAPANNO',
          matrixSet: 'TileMatrixSet0',
          format: 'image/png',
          url: 'http://srv.zjditu.cn/ZJEMAPANNO_2D/wmts?tk=c5ea7cd74c9b43ebb4fd9b73ef2f9f74',
          tileGrid: tdtGridzj,
          wrapX: true
        }),
        minResolution: 0.0000013411045074462890625,
        maxResolution: 0.0000858306884765625
      })
      return [wmtsVecLayer, wmtsAnnoLayer, zJVecLayer, zJAnnoLayer]
    }
  }
}
</script>
<style scoped>
#map {
  width: 100%;
  height: 100%;
  position: relative;
}
.draw {
  position: absolute;
  top: 100px;
  right: 100px;
  width: 60px;
  height: 40px;
  z-index: 999;
}
.draw1 {
  position: absolute;
  top: 200px;
  right: 100px;
  width: 60px;
  height: 40px;
  z-index: 999;
}
</style>
