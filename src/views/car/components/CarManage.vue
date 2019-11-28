<template>
  <div class="manage">
    <a-tabs v-model="activeTab" @change="changeTab" class="content_tab">
      <a-tab-pane tab="车辆定位" key="1">
        <car-position @getCarId="getCarId"></car-position>
      </a-tab-pane>
      <a-tab-pane tab="轨迹查询" key="2">
        <car-trail :carDataList="carDataList" :infoId="infoId"></car-trail>
      </a-tab-pane>
      <a-tab-pane tab="违规查询" key="3">
        <violate-rules></violate-rules>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
import CarPosition from './carManage/CarPosition'
import CarTrail from './carManage/CarTrail'
import ViolateRules from './carManage/ViolateRules'
export default {
    name: 'carManage',
    data(){
        return {
            activeTab: '1',
            infoId: '',
            carDataList: []
        }
    },
    components:{
      CarPosition,
      CarTrail,
      ViolateRules
    },
    mounted(){
        this.getAllCarDataList().then(res=>{
            this.carDataList = res.data;
        });
    },
    methods:{
        ...mapActions('car/manage', ['getAllCarDataList']),
        init(){},
        changeTab(){

        },
        //车辆查看轨迹触发，使页面显示人员轨迹的tab以及地图显示轨迹
      getCarId(data){
            console.log('carManage-carId:' + data);
            this.activeTab = '2';
            this.infoId = data;
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
  /deep/.ant-tabs-nav-scroll {
    height: 44px;
  }
  /deep/.ant-tabs-nav {
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
  /deep/.ant-tabs-bar {
    background-color: #f5f7f8 !important;
    margin-bottom: 0px !important;
    padding: 0px !important;
    .ant-tabs-nav {
      width: 100%;
      .ant-tabs-tab {
        width: 33.3% !important;
        text-align: center;
        margin: 0px;
      }
    }
  }
  /deep/.ant-tabs-content {
    height: calc(100% - 45px) !important;
    .ant-tabs-tabpane {
      position: relative;
      height: 100%;
    }
  }
}
</style>
