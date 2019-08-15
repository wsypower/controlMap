<template>
    <div class="view-panel">
        <div class="view-content-header" flex="cross:center">
            <span class="title">预案列表</span>
        </div>
        <!-- <div class="view-content-header" flex="cross:center"></div> -->
        <div class="loading" v-if="dataLoading" flex="main:center cross:center">
            <a-spin tip="数据加载中..."></a-spin>
        </div>
        <div class="view-content" v-if="!dataLoading&&yuAnList.length>0">
            <cg-container scroll>
                <div class="content-tip" flex="cross:center main:center">
                    <span class="description">-------- 目前有{{totalSize}}个预案正在进行中 --------</span>
                </div>
                <div v-for="(item,index) in yuAnList" :key="index"
                     class="item" flex
                     :class="{active: activeIndex===index}"
                     @click="gotoMonitor(item,index)">
                    <div class="item-left">
                        <pin :content="index+1" class="pint"></pin>
                    </div>
                    <div class="item-right" flex="dir:top">
                        <div class="title-panel" flex="main:justify cross:center">
                            <span>{{item.name}}</span>
                            <span @click="gotoMonitor(item,index)">
                <cg-icon-svg name="shexiangtou" class="camera"></cg-icon-svg>
              </span>
                        </div>
                        <div class="des-panel">
                            <div class="des-title">
                                <a-icon type="dashboard" style="marginRight:5px;color: #b8b8b8;" />
                                <span>开始时间：</span>
                                {{new Date(item.startDayTime)|date_format()}}
                            </div>
                            <div class="des-title">
                                <a-icon type="dashboard" style="marginRight:5px;color: #b8b8b8;" />
                                <span>结束时间：</span>
                                {{new Date(item.endDayTime)|date_format()}}
                            </div>
                            <div class="line"></div>
                        </div>
                    </div>
                </div>
            </cg-container>
        </div>
        <div class="no-data" flex="main:center cross:center" v-if="!dataLoading&&yuAnList.length===0">
            <img src="~@img/zanwuyuan.png" />
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
  import { mapActions } from 'vuex'
  import Pin from './Position'
    export default {
      name: 'runningYuAn',
      components:{
        Pin
      },
      props:{
        yuAnId:{
          type: String,
          default: ''
        }
      },
      data(){
        return {
          dataLoading: false,
          activeIndex: null,
          yuAnList: [],
          totalSize: 0,
        }
      },
      mounted(){
        this.dataLoading = true;
        this.getEmergencyYuAnDataList({statusId: '06'}).then((res)=>{
          this.yuAnList = res.list;
          if(this.yuAnId !== ''){
            this.yuAnList.forEach((item,index)=>{
              if(item.id===this.yuAnId){
                this.activeIndex = index;
              }
            })
          }
          this.totalSize = res.total;
          this.dataLoading = false;
        });
      },
      methods: {
        ...mapActions('emergency/emergency', ['getEmergencyYuAnDataList']),
        gotoMonitor(item,index){
          this.activeIndex = index;
          console.log('gotoMonitor',item);
        }
      }
    }
</script>
<style lang="scss" scoped>
    .view-panel {
        position: absolute;
        top: 60px;
        left: 0px;
        width: 358px;
        height: calc(100% - 70px);
        border-radius: 6px;
        box-shadow: 1px 5px 11px 0px #8183854a;
        overflow: hidden;
        background-color: #fff;
        .view-content-header {
            height: 60px;
            font-size: 16px;
            line-height: 40px;
            background-color: #f5f7f8;
            color: #666666;
            padding-left: 12px;
            .title {
                font-weight: 600;
                font-size: 20px;
                color: #00a4fe;
            }
            .description {
                color: #666666;
                font-size: 12px;
            }
        }
        .loading,
        .no-data {
            width: 100%;
            height: calc(100% - 160px);
        }
        .view-content {
            width: 100%;
            height: calc(100% - 60px);
            position: relative;
            background-color: #fff;
            .content-tip {
                height: 40px;
                color: #228ef0;
                font-size: 12px;
            }
            .item {
                padding: 10px 10px;
                background-color: #fff;
                cursor: pointer;
                position: relative;
                @include last(1) {
                    .line {
                        border: none;
                    }
                }
                .line {
                    position: absolute;
                    bottom: 0px;
                    width: 93%;
                    height: 15px;
                    border-bottom: 1px dashed rgb(203, 204, 205);
                    left: 13px;
                }
                &:hover,&.active {
                    background-color: #e9f6ff;
                    .item-left {
                        .pint {
                            color: #f27070;
                        }
                    }
                }
                .camera {
                    color: #228ef0;
                    font-size: 18px;
                }
                .item-left {
                    width: 30px;
                    .pint {
                        color: #228ef0;
                    }
                }
                .item-right {
                    width: 100%;
                    .title-panel {
                        span:first-child {
                            font-size: 15px;
                            font-weight: 600;
                        }
                        span:last-child {
                            color: #00a4fe;
                            cursor: pointer;
                            &:hover {
                                color: #00a4fe;
                            }
                        }
                    }
                    .des-panel {
                        margin-top: 10px;
                        .des-title {
                            color: #707070;
                            span {
                                color: #b8b8b8;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
