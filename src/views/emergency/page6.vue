<template>
  <div class="page">
    <div v-if="yuAnId" class="view-panel" >
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
                <span>进入现场</span>
              </div>
              <div class="des-panel">
                <div>开始时间：{{item.startDayTime}}</div>
                <div>结束时间：{{item.endDayTime}}</div>
              </div>
            </div>
          </div>
        </cg-container>
      </div>
      <div class="no-data" flex="main:center cross:center" v-if="!dataLoading&&yuAnList.length===0">
        <img src="~@img/zanwuyuan.png" />
      </div>
    </div>
    <div v-else class="info-panel">
      <div class="info-panel-header">
        <span>萧敬腾演唱会方案 指挥现场</span>
        <span>进行中</span>
      </div>
      <div class="online-panel">
        <p>人员在岗检测</p>
        <div class="online-content-panel" id="person-monitor">

        </div>
      </div>
      <div class="case-panel">
        <p>案件检测</p>
        <div class="">
          <a-radio-group @change="onChangeTab" v-model="caseType">
            <a-radio-button value="all">案件总计:15</a-radio-button>
            <a-radio-button value="noHandle">未处理：2</a-radio-button>
          </a-radio-group>
        </div>
        <div class="case-content-panel" id="case-monitor">

        </div>
      </div>
    </div>
    <div class="operate-panel">
      <div class="quantu">
        <span @mouseenter="active=true" @mouseleave="active=false">圈图工具</span>
        <div class="choose-panel" :class="{active: active}">
          <span @click="drawArea">1</span>
          <span @click="drawLine">2</span>
          <span @click="drawDot">3</span>
        </div>
      </div>
      <a-button type="primary" >对讲调度</a-button>
      <a-button type="primary" >视频会议</a-button>
    </div>
    <div class="resource-panel">
      <a-checkbox :indeterminate="indeterminate" @change="onCheckAllChange" :checked="checkAll">全部资源</a-checkbox>
      <a-checkbox-group :options="plainOptions" v-model="checkedList" @change="onChange" />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapActions } from 'vuex'
import Pin from './components/Position'
const plainOptions = [{ label: '人力资源', value: 'people' },
  { label: '视频监控', value: 'video' }];
const allValues = plainOptions.reduce((res,item)=>{
  res.push(item.value);
  return res
},[])
export default {
  name: 'page6',
  components:{
    Pin
  },
  data() {
    return {
      yuAnId: null,
      dataLoading: false,
      yuAnList: [{
        name: 'hasjgdjgjhfdas',
        startDayTime: 1565347245,
        endDayTime: 1565433645
      },{
        name: 'aznmjkeehkjgdsf',
        startDayTime: 1565347245,
        endDayTime: 1565433645
      }],
      totalSize: 0,
      active: false,
      indeterminate: false,
      checkAll: true,
      plainOptions: plainOptions,
      checkedList: ['people','video'],

      caseType: 'all',
    }
  },
  mounted() {
    this.dataLoading = true;
    this.getEmergencyYuAnDataList({statusId: '005'}).then((res)=>{
      this.yuAnList = res.data;
      this.totalSize = res.total;
      this.dataLoading = false;
    });
  },
  watch:{
    checkedList(val){
      console.log(val);
      this.drawMap();
    }
  },
  methods:{
    ...mapActions('emergency/emergency', ['getEmergencyYuAnDataList']),
    onChangeTab(){

    },
    onChange (checkedList) {
      this.indeterminate = !!checkedList.length && (checkedList.length < plainOptions.length)
      this.checkAll = checkedList.length === plainOptions.length
    },
    onCheckAllChange (e) {
      Object.assign(this, {
        checkedList: e.target.checked ? allValues : [],
        indeterminate: false,
        checkAll: e.target.checked,
      })
    },

    //绘制地图--添加资源显示
    drawMap(){

    },
    //绘制地图--区域多边形
    drawArea(){

    },
    //绘制地图--线
    drawLine(){

    },
    //绘制地图--点
    drawDot(){

    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%;
  background-color: #f4f4f5;
  padding-top: 60px;
  position: relative;
  .loading,.no-data{
    width: 100%;
    height: calc(100% - 160px);
  }
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
  .info-panel{
    position: absolute;
    top: 80px;
    left:20px;
    width: 300px;
    height: 600px;
    border: 1px solid #275bcf;
    background-color: #275bcf;
    border-radius: 6px;
    .info-panel-header{
      height: 40px;
      font-size: 16px;
      line-height: 40px;
      padding: 0px 10px;
      span{
        font-size: 16px;
        &:first-child{
          color:#ffffff;
        }
        &:last-child{
          color: #0ca678;
        }
      }
    }
    .online-panel{
      p{
        color: #ffffff;
        font-size: 14px;
      }
      .online-content-panel{
        width: 100%;
        height: 200px;
      }
    }
    .case-panel{
      p{
        color: #ffffff;
        font-size: 14px;
      }
      .case-content-panel{
        width: 100%;
        height: 200px;
      }
    }
  }
  .operate-panel{
    position: absolute;
    left: 330px;
    top: 80px;
    .quantu{
      height: 32px;
      line-height: 32px;
      margin-bottom: 10px;
      cursor: pointer;
      position: relative;
      >span{
        display:inline-block;
        text-align: center;
          background-color: #1890ff;
          font-size: 14px;
          color:#ffffff;
          padding: 0px 15px;
        border-radius: 4px;
        position: absolute;
        z-index: 10;
      }
      .choose-panel{
        position: absolute;
        z-index: 9;
        width: 100px;
        transform: translateX(0px);
        transition: transform 0.8s;
        &.active{
          transform: translateX(86px);
        }
        span{
          display:inline-block;
          width: 32px;
          text-align: center;
          vertical-align: middle;
          cursor: pointer;
        }
      }
    }
    button{
      display: block;
      margin-bottom: 10px;
    }
  }
  .resource-panel{
    position: absolute;
    top: 80px;
    left: 600px;
    height: 30px;
    background-color: #ffffff;
    padding: 0px 20px;
    line-height: 30px;
  }
}
</style>
