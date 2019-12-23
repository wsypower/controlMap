<template>
  <div class="detail-panel">
      <!--是否飘着过？-->
      <div class="detail-panel-header">
          <cg-icon-svg name="back" class="svg_icon_back"></cg-icon-svg>
          <span @click="backFun">返回</span>
      </div>
      <a-tabs v-model="activeTab" @change="changeTab" class="content_tab">
          <a-tab-pane tab="基本信息" key="1">
              <people-base-info :userId="userId"></people-base-info>
          </a-tab-pane>
          <a-tab-pane tab="考勤信息" key="2">
            <work-time-info :userId="userId"></work-time-info>
          </a-tab-pane>
      </a-tabs>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
import PeopleBaseInfo from './PeopleBaseInfo'
import WorkTimeInfo from './WorkTimeInfo'
import util from '@/utils/util'
export default {
  name: 'peopleDetail',
  components:{
    PeopleBaseInfo,
    WorkTimeInfo
  },
  pros:{
    mId:{
      type: 'String',
      default: ''
    }
  },
  data(){
    return {
      activeTab: '1'
    }
  },
  computed:{
    userId: function(){
      if(this.mId){
        return this.mId.split('_')[0];
      }
      else{
        return ''
      }
    }
  },
  watch:{},
  mounted(){},

  methods:{
    ...mapActions('section/manage', ['getAllPeopleTreeData']),
    backFun(){
      this.activeTab = '1';
      this.$emit('toList');
    },
    changeTab(){

    }
  }
}
</script>
<style lang="scss" scoped>
.detail-panel {
  height: 100%;
  width: 50%;
  padding: 20px;
  .detail-panel-header{
      height: 30px;
      line-height: 30px;
      .svg_icon_back{
          color: #cccccc;
          cursor: pointer;
      }
      span{
          margin-left: 5px;
          color: #cccccc;
          cursor: pointer;
      }
      &:hover{
          .svg_icon_back{
              color: #00a4fe;
          }
          span{
              color: #00a4fe;
          }

      }
  }
    .content_tab {
        width: 100%;
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
                    width: 50% !important;
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
}
</style>
