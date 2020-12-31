<template>
  <div class="manage">
    <a-tabs v-model="activeTab" @change="changeTab" class="content_tab">
      <a-tab-pane tab="车辆定位" key="1">
        <car-position @getCarId="getCarId"></car-position>
      </a-tab-pane>
      <a-tab-pane tab="轨迹查询" key="2">
        <car-trail :carDataList="carDataList" :infoId="infoId"></car-trail>
      </a-tab-pane>
      <!-- <a-tab-pane tab="违规查询" key="3">
        <violate-rules></violate-rules>
      </a-tab-pane> -->
    </a-tabs>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions, mapState } from 'vuex'
import util from '@/utils/util';
import CarPosition from './carManage/CarPosition'
import CarTrail from './carManage/CarTrail'
import ViolateRules from './carManage/ViolateRules'
export default {
  name: 'carManage',
  data() {
    return {
      activeTab: '1',
      infoId: '',
      carDataList: []
    }
  },
  components: {
    CarPosition,
    CarTrail,
    ViolateRules
  },
  computed: {
    ...mapState('map', ['mapManager'])
  },
  mounted() {
    this.map = this.mapManager.getMap();
    const userId = util.cookies.get('userId');
    this.getAllCarDataList({ userId: userId }).then(res => {
      res.forEach(item => {
        item.carDisplayId = item.id + '_' + item.name;
        this.carDataList.push(item);
      });
    });
  },
  methods: {
    ...mapActions('car/manage', ['getAllCarDataList']),
    init() {},
    changeTab(val) {
      this.map.getOverlayById('carPositionOverlay') && this.map.getOverlayById('carPositionOverlay').setPosition(undefined);
      this.map.getOverlayById('carTrailOverlay') && this.map.getOverlayById('carTrailOverlay').setPosition(undefined);
      console.log("点击值====", val);
      const layers = this.map.getLayers().array_;
      //切换时清除地图上的一些操作
      layers.forEach(l => {
        if (l.get('featureType')) {
          if (val == '1') { //人员定位
            if (l.get('featureType') == 'CarPosition') {
              l.setVisible(true);
              this.map.getView().fit(l.getSource().getExtent());
            } else {
              l.setVisible(false);
            }
          } else if (val == '2') { //轨迹查询
            if (l.get('featureType') == 'CarTrail' || l.get('featureType') == 'trackLine') {
              l.setVisible(true);
              this.map.getView().fit(l.getSource().getExtent());
            } else {
              l.setVisible(false);
            }
          } else if (val == '3') { //违规查询
            if (l.get('featureType') == 'CarViolateRules') {
              l.setVisible(true);
              this.map.getView().fit(l.getSource().getExtent());
            } else {
              l.setVisible(false);
            }
          }
        }
      });
    },
    //车辆查看轨迹触发，使页面显示人员轨迹的tab以及地图显示轨迹
    getCarId(data) {
      console.log('carManage-carId:' + data);
      this.activeTab = '2';
      this.infoId = data;
      this.changeTab('2');
    }
  }
}
</script>
<style lang="scss" scoped>
.manage {
  width: 100%;
  padding: 20px;
  height: 100%;
}

.content_tab {
  height: 100%;

  ::v-deep.ant-tabs-nav-scroll {
    height: 44px;
  }

  ::v-deep.ant-tabs-nav {
    border: 1px solid #dddddd;

    .ant-tabs-tab {
      padding: 10px;
      font-size: 14px !important;
      color: #333333;
      border-right: solid 1px #dddddd;

      &:last-child {
        border-right: unset;
      }
    }

    .ant-tabs-tab-active {
      background-color: #ffffff;
    }

    .ant-tabs-ink-bar {
      top: 0px;
    }
  }

  ::v-deep.ant-tabs-bar {
    background-color: #f5f7f8 !important;
    margin-bottom: 0px !important;
    padding: 0px !important;

    .ant-tabs-nav {
      width: 100%;

      .ant-tabs-tab {
        width: 50% !important;
        text-align: center;
        margin: 0px;
      }
    }
  }

  ::v-deep.ant-tabs-content {
    height: calc(100% - 45px) !important;

    .ant-tabs-tabpane {
      position: relative;
      height: 100%;
    }
  }
}
</style>