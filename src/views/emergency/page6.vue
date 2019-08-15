<template>
  <div class="page">
    <!-- 地图控件注入地址 -->
    <LayoutMap ref="olMap"></LayoutMap>
    <monitor-yu-an v-if="yuAnId"></monitor-yu-an>
    <control-yu-ans v-else></control-yu-ans>
    <div class="operate-panel">
      <div class="quantu" @mouseenter="active=true" @mouseleave="active=false">
        <span>圈图工具</span>
        <div class="choose-panel" :class="{active: active}" flex="cross:center">
          <span @click="drawArea" class="area"><cg-icon-svg name="duobianxing" class="svg_icon"></cg-icon-svg></span>
          <span @click="drawLine" class="line"><cg-icon-svg name="zhexian" class="svg_icon"></cg-icon-svg></span>
          <span @click="drawDot" class="dot"><cg-icon-svg name="dot" class="svg_icon"></cg-icon-svg></span>
        </div>
      </div>
      <a-button type="primary" >对讲调度</a-button>
      <a-button type="primary" >视频会议</a-button>
    </div>
    <div class="resource-panel">
      <a-checkbox :indeterminate="indeterminate" @change="onCheckAllChange" :checked="checkAll">全部资源</a-checkbox>
      <a-checkbox-group :options="plainOptions" v-model="checkedList" @change="onChange" />
    </div>
    <div class="person-info-dialog">
      <div class="person-info-dialog-header" flex="main:justify cross:center">
        <span>人员信息</span>
        <a-icon type="close" @click="closeInfoDialog" />
      </div>
      <div class="person-info-dialog-body" flex="dir:left">
          <div class="info-body-left" flex="main:center cross:center">
            <img src="~@img/avatar_boy.png"/>
            <!--<img v-else src="~@img/avatar_girl.png"/>-->
          </div>
          <div class="info-body-right">
            <div flex="dir:left cross:center main:justify">
              <span>{{info.realName}}</span>
              <span>{{info.online=='0'?'离线':'在线'}}</span>
            </div>
            <div flex="dir:left cross:center">
              <cg-icon-svg name="telephone" class="svg_icon_telephone"></cg-icon-svg>
              <span>{{info.phone}}</span>
            </div>
            <div flex="dir:left cross:center">
              <cg-icon-svg name="menu-section" class="svg_icon_section"></cg-icon-svg>
              <span>{{info.deptName}}</span>
            </div>
          </div>
      </div>
      <div class="info-body-operation" flex="cross:center">
        <span @click="handleVideo">远程视频</span>
        <span @click="handlePhone">远程通话</span>
      </div>
    </div>
    <div class="video-dialog">
      <div class="close-panel">
        <a-icon type="close" style="color: #ffffff" @click="closeVideoDialog" />
      </div>
      <my-video-player ref="myPlayer"></my-video-player>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapActions } from 'vuex'
  import LayoutMap from '@/views/map/olMap.vue'
  import ControlYuAns from './components/ControlYuAns';
  import MonitorYuAn from './components/MonitorYuAn';
  import { MapManager } from '@/utils/util.map.manage';
  import {getAllVideo,getAllPeople} from '@/api/map/service'
  import { peopleStyle,videoStyle } from '@/utils/util.map.style'

  const plainOptions = [{ label: '人力资源', value: 'people' },
  { label: '视频监控', value: 'video' }];
  const allValues = plainOptions.reduce((res,item)=>{
    res.push(item.value);
    return res
  },[])
  let map;
  let mapManager;
export default {
  name: 'page6',
  components:{
    ControlYuAns,
    MonitorYuAn,
    LayoutMap
  },
  data() {
    return {
      yuAnId: null,
      active: false,
      indeterminate: false,
      checkAll: true,
      plainOptions: plainOptions,
      checkedList: ['people','video'],
      layerList:{
        'people':null,
        'video':null
      },
      caseType: 'all',
      info: {

      }
    }
  },
  created(){
    if(this.$route.query.yuAnId){
      this.yuAnId = this.$route.query.yuAnId;
      this.mapIdList = this.$route.query.mapIdList.split(',');
    }
    else{
      this.yuAnId = null;
      this.mapIdList = [];
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      map = this.$refs.olMap.getMap();
      mapManager = new MapManager(map);
      //初始化地图弹框
      this.infoOverlay = mapManager.addOverlay({
        element: this.$refs.infoOverlay
      });
      //绑定地图双击事件
      map.on('click', this.mapClickHandler);
      this.initMapData();
    })
    // this.$refs['myPlayer'].videoSrc = 'rtmp://192.168.10.3:1935/live/pag/192.168.10.2/7302/33092104001320012103/0/MAIN/TCP?checkinfo=ewogICAidGltZSIgOiAiMjAxOTA3MjBUMDkzNzE0WiIsCiAgICJ1cmwiIDogInJ0bXA6Ly8xOTIuMTY4LjEwLjM6MTkzNS9saXZlL3BhZy8xOTIuMTY4LjEwLjIvNzMwMi8zMzA5MjEwNDAwMTMyMDAxMjEwMy8wL01BSU4vVENQIgp9Cg%3D%3D&idinfo=EAAAAAAQAADh9flnMdrvl03BuMSu0R3r6u3NZ06p6V%2BogbhAGOojgXCnScym5Ls3Uf%2BOx6Ctcbc%3D'
    // this.$refs['myPlayer'].playerOptions.sources[0].src = 'rtmp://192.168.10.3:1935/live/pag/192.168.10.2/7302/33092104001320012103/0/MAIN/TCP?checkinfo=ewogICAidGltZSIgOiAiMjAxOTA3MjBUMDkzNzE0WiIsCiAgICJ1cmwiIDogInJ0bXA6Ly8xOTIuMTY4LjEwLjM6MTkzNS9saXZlL3BhZy8xOTIuMTY4LjEwLjIvNzMwMi8zMzA5MjEwNDAwMTMyMDAxMjEwMy8wL01BSU4vVENQIgp9Cg%3D%3D&idinfo=EAAAAAAQAADh9flnMdrvl03BuMSu0R3r6u3NZ06p6V%2BogbhAGOojgXCnScym5Ls3Uf%2BOx6Ctcbc%3D'
  },
  watch:{
    '$route.query'(val){
      console.log('$route.query',val);
      if(this.$route.query.yuAnId){
        this.yuAnId = this.$route.query.yuAnId;
        this.mapIdList = this.$route.query.mapIdList.split(',');
      }
      else{
        this.yuAnId = null;
        this.mapIdList = [];
      }
    },
    checkedList(val){
      console.log(val);
      this.drawMap();
    }
  },
  beforeRouteUpdate(to, from, next) {
    //先刷新页面路劲
    next()
    //指向refresh页面，然后再次跳转回本页面，重走页面的生命周期
    this.reload()
  },
  methods:{
    ...mapActions('emergency/common', ['getUserInfo']),
    initMapData(){
      getAllVideo().then(data=>{
        this.layerList['video']=mapManager.addVectorLayerByFeatures(data,videoStyle(),2)
        console.log(data);
      })
      getAllPeople().then(data=>{
        console.log(data);
        this.layerList['people']=mapManager.addVectorLayerByFeatures(data,peopleStyle(),2)
      })
    },
    //地图点击事件处理器
    mapClickHandler({ pixel, coordinate }) {
        const feature = map.forEachFeatureAtPixel(pixel, feature => feature)
        if(feature){
          this.getUserInfo(feature.getId());
          // this.infoOverlay.setPosition(coordinate);
          console.log('==点击feature==',feature);
        }
    },
    reload() {
      this.$router.replace('/refresh')
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

    getUserInfoData(){
      this.getUserInfo({userId:'0129b7e06f9d11e8772ac3324197bfce'}).then((res)=>{
        console.log('userInfo',res);
        this.info = Object.assign({},res);
      });
    },
    handleVideo(){
      this.$notification['Warning']({
        message: '还没有接入插件，无法使用'
      });
    },
    handlePhone(){
      this.$notification['Warning']({
        message: '还没有接入插件，无法使用'
      });
    },
    closeInfoDialog(){

    },
    closeVideoDialog(){

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
      width: 200px;
      overflow: hidden;
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
        height: 100%;
        background-color: #ffffff;
        z-index: 9;
        transform: translateX(-30px);
        transition: transform 0.8s;
        &.active{
          transform: translateX(86px);
        }
        span{
          display:inline-block;
          width: 28px;
          height: 28px;
          line-height: 28px;
          text-align: center;
          vertical-align: middle;
          cursor: pointer;
          margin: 0px 5px;
          border-radius: 4px;
          &.area{
            background-color: #b19bf6;
          }
          &.line{
            background-color: #42c199;
          }
          &.dot{
            background-color: #fbb76e;
          }
          .svg_icon{
            width: 14px;
            height: 14px;
            color:#ffffff;
          }
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
  .person-info-dialog{
    width: 240px;
    background-color: #ffffff;
    border-radius: 6px;
    .person-info-dialog-header{
      padding: 0px 10px;
      height: 30px;
      width: 100%;
      border-bottom: 1px solid #eee;
      i {
        font-size: 16px;
        cursor: pointer;
        color: #868e96;
        &:hover {
          color: #343434;
        }
      }
    }
    .person-info-dialog-body{
      height:80px;
      width: 100%;
      .info-body-left{
        width: 100px;
        height: 100%;
        img{
          width: 50px;
          height: 50px;
        }
      }
      .info-body-right{
        padding-top: 5px;
        >div{
          font-family: PingFang-SC-Regular;
          font-size: 13px;
          color: #333333;
          line-height: 24px;
          .svg_icon_telephone,.svg_icon_section{
            width: 14px;
            height: 14px;
            color: #00a5ff;
            margin-right: 10px;
          }
          &:first-child{
            span:first-child{
              font-size: 16px;
              color: #222;
            }
          }
        }
      }
    }
    .info-body-operation{
      height: 30px;
      width: 100%;
      border-top: 1px solid #eee;
      span{
        display: inline-block;
        width: 50%;
        cursor: pointer;
        text-align: center;
        &:hover{
          color: #00a5ff;
        }
      }
    }
  }
  .video-dialog{
    width: 200px;
    height: 200px;
    .close-panel{
      position: absolute;
      right: 10px;
      top: 10px;
      z-index: 10;
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }

}
</style>
