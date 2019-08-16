<template>
  <div class="page">
    <!-- 地图控件注入地址 -->
    <LayoutMap ref="olMap"></LayoutMap>
    <control-yu-ans :yuAnId="yuAnId" @goMonitor="realTimeMonitor"></control-yu-ans>
    <div class="function__buttons" flex>
      <div flex="dir:top" class="function__buttons_items">
        <!-- 圈图工具 -->
        <a-tooltip placement="left" title="圈图工具">
          <a-button type="primary" class="function__buttons_item" @click="showDrawer">
            <a-icon type="highlight" theme="twoTone" />
          </a-button>
        </a-tooltip>

        <!-- 对讲调度 -->
        <a-tooltip placement="left" title="对讲调度">
          <a-button type="primary" class="function__buttons_item" @click="startDuiJiangDiaoDu">
            <a-icon type="message" theme="twoTone" />
          </a-button>
        </a-tooltip>
        <!-- 视频会议 -->
        <a-tooltip placement="left" title="视频会议">
          <a-button type="primary" class="function__buttons_item" @click="startShiPinHuiYi">
            <a-icon type="video-camera" theme="twoTone" />
          </a-button>
        </a-tooltip>
      </div>
    </div>
    <div class="resource-panel" flex="cross:center">
      <a-checkbox :indeterminate="indeterminate" @change="onCheckAllChange" :checked="checkAll">全部资源</a-checkbox>
      <a-checkbox-group :options="plainOptions" v-model="checkedList" @change="onChange" />
    </div>

    <!-- 圈图工具抽屉 -->
    <a-drawer
            :width="wrapwidth"
            placement="right"
            :closable="false"
            @close="onClose"
            :visible="visible"
            :destroyOnClose="true"
            :maskClosable="false"
            :mask="false"
            :z-index="1500"
            :getContainer="'.function__buttons'"
            :wrapClassName="'funtion__drawer'"
    >
      <cg-container scroll>
        <div class="choose-panel" :class="{active: active}" flex="dir:top cross:center">
          <span @click="drawArea" class="area">
            <cg-icon-svg name="duobianxing" class="svg_icon"></cg-icon-svg>
          </span>
          <span @click="drawLine" class="line">
            <cg-icon-svg name="zhexian" class="svg_icon"></cg-icon-svg>
          </span>
          <span @click="drawDot" class="dot">
            <cg-icon-svg name="dot" class="svg_icon"></cg-icon-svg>
          </span>
        </div>
      </cg-container>
    </a-drawer>
    <div class="person-info-dialog" ref="peopleOverlay">
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
    <div class="video-dialog" ref="videoOverlay">
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
  import { MapManager,getPointByPeopleList,filterMapId,filterVideoPoint } from '@/utils/util.map.manage';
  import {getAllVideo,getAllPeople,getEmergencyFeatures} from '@/api/map/service'
  import { peopleStyle,videoStyle,areaStyle } from '@/utils/util.map.style'

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
    LayoutMap
  },
  data() {
    return {
      baozhangLayer:null,
      peopleOverlay:null,
      videoOverlay:null,
      yuAnId: '',
      active: false,
      indeterminate: false,
      checkAll: true,
      plainOptions: plainOptions,
      checkedList: ['people','video'],
      emergencyList:[
        {
          type:'people',
          features:null,
          layer:null
        },
        {
          type:'video',
          features:null,
          layer:null
        }
      ],
      layerList:{
        'people':null,
        'video':null
      },
      caseType: 'all',
      info: {},
      visible: true
    }
  },
  computed: {
    /* 滑动抽屉的宽度 */
    wrapwidth() {
      return this.visible ? 50 : 0
    }
  },
  created(){
    if(this.$route.query.yuAnId){
      this.yuAnId = this.$route.query.yuAnId;
    }
    else{
      this.yuAnId = '';
    }
  },
  mounted() {
    this.visible = false
    this.$nextTick().then(() => {
      map = this.$refs.olMap.getMap();
      mapManager = new MapManager(map);
      //初始化地图弹框
      this.peopleOverlay = mapManager.addOverlay({
        element: this.$refs.peopleOverlay
      });
      this.videoOverlay = mapManager.addOverlay({
        element: this.$refs.videoOverlay
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
      }
      else{
        this.yuAnId = '';
      }
    },
    checkedList(val){
      console.log(val);
      this.drawMap(val);
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
    //抽屉控制
    showDrawer() {
      this.visible = !this.visible
    },
    //抽屉关闭的回调
    onClose() {
      this.visible = false
    },
    initMapData(){
      getAllPeople().then(data=>{
        this.emergencyList[0].features=data;
        this.emergencyList[0].layer=mapManager.addVectorLayerByFeatures(data,peopleStyle(),3)
      })
      getAllVideo().then(data=>{
        this.emergencyList[1].features=data;
        this.emergencyList[1].layer=mapManager.addVectorLayerByFeatures(data,videoStyle(),3)
      })
    },
    //地图点击事件处理器
    mapClickHandler({ pixel, coordinate }) {
        const feature = map.forEachFeatureAtPixel(pixel, feature => feature)
        if(feature){
          if(feature.get('type')=='people'){
            this.getUserInfoData(feature.get('id'));
            this.peopleOverlay.setPosition(coordinate);
          }
          else if(feature.get('type')=='video'){
            this.videoOverlay.setPosition(coordinate);
          }
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
    getUserInfoData(id){
      this.getUserInfo({userId:id}).then((res)=>{
        console.log('userInfo',res);
        this.info = Object.assign({},res);
      });
    },
    handleVideo(){
      this.$notification['warning']({
        message: '还没有接入插件，无法使用'
      });
    },
    handlePhone(){
      this.$notification['warning']({
        message: '还没有接入插件，无法使用'
      });
    },
    closeInfoDialog(){
      this.peopleOverlay.setPosition(undefined);
    },
    closeVideoDialog(){
      this.videoOverlay.setPosition(undefined);
    },
    //绘制地图--添加资源显示
    drawMap(list){
      for(let i=0;i<this.emergencyList.length;i++){
        if(list.includes(this.emergencyList[i].type)){
          this.emergencyList[i].layer.setVisible(true);
        } else{
          this.emergencyList[i].layer.setVisible(false);
        }
      }
    },
    startDuiJiangDiaoDu(){
      this.$notification['warning']({
        message: '还未开发，无法使用'
      });
    },
    startShiPinHuiYi() {
      this.$notification['warning']({
        message: '还未开发，无法使用'
      });
    },
    getAreaByIdList(idList,type){
      const source = this.baozhangLayer.getSource();
      const videoFeatures = this.emergencyList[1].features;
      getEmergencyFeatures(idList,type).then(data=>{
        source.addFeatures(data);
        for(let i=0;i<data.length;i++){
          const geo = data[i].getGeometry();
          const filterVideos = filterVideoPoint(geo.clone(),videoFeatures);
          if(filterVideos.length>0){
            this.emergencyList[1].layer.getSource().addFeatures(filterVideos);
          }
        }
      });
    },
    realTimeMonitor(item){
      this.emergencyList[0].layer && this.emergencyList[0].layer.getSource().clear();
      this.emergencyList[1].layer && this.emergencyList[1].layer.getSource().clear();
      this.baozhangLayer && this.baozhangLayer.getSource().clear();
      if(item.baoZhangData.length>0) {
        //获取当前预案区域数据
        const idList = filterMapId(item.baoZhangData);
        this.baozhangLayer=mapManager.addVectorLayerByFeatures([],areaStyle(),2);
        //视频数据过滤
        if(idList[0]){this.getAreaByIdList(idList[0],'Point');}
        if(idList[1]){this.getAreaByIdList(idList[1],'LineString');}
        if(idList[2]){this.getAreaByIdList(idList[2],'Polygon');}
        //人员数据提取
        let peopleList = [];
        for (let i = 0; i < item.baoZhangData.length; i++) {
          peopleList.push(item.baoZhangData[i].peopleList);
        }
        //人员数据过滤,只显示当前预案相关人员
        const peopleFeatures = getPointByPeopleList(peopleList);
        this.emergencyList[0].layer.getSource().addFeatures(peopleFeatures);
        //视频数据过滤
      }
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
  .operate-panel {
    position: absolute;
    right: 0px;
    top: 80px;
    .quantu {
      height: 32px;
      line-height: 32px;
      margin-bottom: 10px;
      cursor: pointer;
      position: relative;
      width: 200px;
      // overflow: hidden;
      > span {
        display: inline-block;
        text-align: center;
        background-color: #1890ff;
        font-size: 14px;
        color: #ffffff;
        padding: 0px 15px;
        border-radius: 4px;
        position: absolute;
        z-index: 10;
      }
    }
    button {
      display: block;
      margin-bottom: 10px;
    }
  }
  /deep/.ant-checkbox-wrapper {
    border-right: 1px solid #dddddd;
    margin-left: 10px;
    @include last(1) {
      margin-left: 0;
      border: none;
    }
  }
  .resource-panel {
    position: absolute;
    @include center-translate(x);
    top: 80px;
    height: 40px;
    background-color: #ffffff;
    padding: 0px 20px;
    // line-height: 30px;
    border-radius: 6px;
    box-shadow: 3px 3px 6px 2px #d8dbdc73;
  }
  .function__buttons {
    position: absolute;
    right: 0px;
    top: 53px;
    // background-color: red;
    height: calc(100% - 100px);
    transition: all 0.4s;
    min-height: 250px; // width: auto;
    .function__buttons_items {
      position: relative;
      padding-top: 30px;
      transition: all 0.4s;
    }
    .function__buttons_item {
      width: 40px;
      height: 40px;
      background-color: #fff;
      color: #028efc;
      box-shadow: 0px 2px 10px 0px rgba(6, 61, 114, 0.2);
      border-radius: 4px;
      padding: 0;
      font-size: 19px;
      border: none;
      margin-bottom: 20px;
      margin-right: 10px;
      // i {
      //   font-size: 16px;
      // }
      // /deep/.anticon {
      //   font-size: 16px;
      // }
    }
    /deep/.funtion__drawer {
      position: relative;
      transition: all 0.4s;
      width: auto;
      padding-top: 30px;
      .ant-drawer-content-wrapper {
        position: initial;
        height: 100%;
        transition: all 0.3s;
        margin-right: 5px;
        border-radius: 5px;
        .ant-drawer-content {
          border-radius: 5px;
        }
        .choose-panel {
          width: 100%;
          padding-top: 10px;
          span {
            display: inline-block;
            width: 28px;
            height: 28px;
            line-height: 28px;
            text-align: center;
            vertical-align: middle;
            cursor: pointer;
            margin: 0px 5px;
            border-radius: 4px;
            margin-bottom: 10px;
            &.area {
              background-color: #b19bf6;
            }
            &.line {
              background-color: #42c199;
            }
            &.dot {
              background-color: #fbb76e;
            }
            .svg_icon {
              width: 14px;
              height: 14px;
              color: #ffffff;
            }
          }
        }
      }
    }
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
