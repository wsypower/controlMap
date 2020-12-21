<template>
  <div class="manage">
    <a-tabs v-model="activeTab" @change="changeTab" class="content_tab">
      <a-tab-pane tab="监测查询" key="1">
        <manage></manage>
      </a-tab-pane>
      <a-tab-pane tab="数据统计" key="2">
        <statistical-analysis></statistical-analysis>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script type="text/ecmascript-6">
  import { mapActions,mapState } from 'vuex'
  import Manage from './Manage.vue'
  import StatisticalAnalysis from './StatisticalAnalysis.vue'
  import util from '@/utils/util'
  export default {
    name: 'pressure',
    data(){
      return {
        activeTab: '1',
      }
    },
    components:{
      Manage,
      StatisticalAnalysis
    },
    computed:{
      ...mapState('map', ['mapManager'])
    },
    mounted(){

    },
    methods:{
      ...mapActions('section/common', ['getAllPeopleDataList']),
      init(){

      },
      changeTab(val){

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