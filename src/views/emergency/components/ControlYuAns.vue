<template>
    <div class="view-panel">
        <div class="view-content-header">目前有{{totalSize}}个预案正在进行中</div>
        <div class="loading" v-if="dataLoading" flex="main:center cross:center">
            <a-spin tip="数据加载中..."></a-spin>
        </div>
        <div class="view-content" v-if="!dataLoading&&yuAnList.length>0">
            <cg-container scroll>
                <div v-for="(item,index) in yuAnList" :key="index" class="item" flex>
                    <div class="item-left">
                        <pin :content="index+1"></pin>
                    </div>
                    <div class="item-right" flex="dir:top">
                        <div class="title-panel" flex="main:justify cross:center">
                            <span>{{item.name}}</span>
                            <span @click="gotoMonitor(item)">进入现场</span>
                        </div>
                        <div class="des-panel">
                            <div>开始时间：{{new Date(item.startDayTime)|date_format()}}</div>
                            <div>结束时间：{{new Date(item.endDayTime)|date_format()}}</div>
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
      data(){
        return {
          dataLoading: false,
          yuAnList: [],
          totalSize: 0,
        }
      },
      mounted(){
        this.dataLoading = true;
        this.getEmergencyYuAnDataList({statusId: '06'}).then((res)=>{
          this.yuAnList = res.list;
          this.totalSize = res.total;
          this.dataLoading = false;
        });
      },
      methods: {
        ...mapActions('emergency/emergency', ['getEmergencyYuAnDataList']),
        gotoMonitor(item){
          this.$router.push(
            {
              path:'/emergency',
              query:{
                yuAnId: item.id,
                mapIdList: item.mapIdList.join(',')
              }
            }
          )
        }
      }
    }
</script>
<style lang="scss" scoped>
    .view-panel{
        position: absolute;
        top: 80px;
        left:20px;
        width: 300px;
        height: 600px;
        border: 1px solid #cccccc;
        background-color: #ffffff;
        border-radius: 6px;
        .view-content-header{
            height: 40px;
            font-size: 16px;
            line-height: 40px;
            background-color: #00a4fe;
            color: #ffffff;
            padding-left: 10px;
        }
        .loading,.no-data{
            width: 100%;
            height: calc(100% - 160px);
        }
        .view-content{
            width: 100%;
            height: calc(100% - 40px);
            position: relative;
            .item{
                padding: 10px 10px;
                .item-left{
                    width: 30px;
                }
                .item-right{
                    width: 100%;
                    .title-panel{
                        span:first-child{
                            font-size: 14px;
                        }
                        span:last-child{
                            color: #00a4fe;
                            cursor: pointer;
                            &:hover{
                                color: #00a4fe;
                            }
                        }
                    }
                    .des-panel{
                        margin-top: 10px;
                    }
                }
            }
        }
    }
</style>
