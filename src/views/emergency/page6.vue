<template>
  <div class="left-message">
    <div class="left-message-title">
      事件列表
    </div>
    <div class="search-panel">
      <a-input-search placeholder="输入事件（预案）名称搜索" @search="onSearch" enterButton="搜 索"></a-input-search>
    </div>
    <div class="search-result">
      <div class="spin-panel" flex="main:center cross:center" v-if="showLoading">
        <a-spin tip="数据加载中..."></a-spin>
      </div>
      <div class="data-panel" v-else>
        <cg-container scroll v-if="dataArr.length > 0">
          <event-item
            v-for="(item, index) in dataArr"
            :itemData="item"
            :index="index"
            :key="index"
            :class="{ active: activeIndex == index }"
            :isActive="activeIndex == index"
            @editYuAnItem="editYuAnItem"
            @deleteYuAnItem="deleteYuAnItem"
            @onClick="clickDataItem(index)"
          >
          </event-item>
          <div v-if="totalSize > 10" class="pagination-panel">
            <a-pagination
                    :total="totalSize"
                    :showTotal="total => `共 ${total} 条`"
                    :pageSize="10"
                    :defaultCurrent="1"
                    @change="changePagination"
            />
          </div>
        </cg-container>
        <div v-else class="none-panel" flex="main:center cross:center">
          <img src="~@img/zanwuyuan.png" />
        </div>
      </div>
    </div>
    <div class="left-message-footer" :class="{disable: activeIndex===null||dataArr[activeIndex].statusId!=='1'}" @click="startYuAn">启动预案</div>
    <yu-an-list v-show="showYuAnList" ref='yuAnList' @operate="listOperate"></yu-an-list>
    <operation
      ref="Operate"
      v-show="showOperate"
      :isCheckedTuAn="activeIndex!==null"
      :eventId='eventId'
      @addItem="addItemOperation"
      @ychjOperate="ychjOperation"
      @getCheckedOption="getCheckedOption"
    ></operation>
    <custom-dialog
      :visible.sync="dialogVisible"
      :dWidth="dWidth"
      :dHeight="dHeight"
      :dialogTitle="dialogTitle"
      :bodyPadding="bodyPadding"
      :componentId="dialogComponentId"
      :sourceData="sourceData"
      :closeCallBack="closeCallBack"
    >
    </custom-dialog>
    <div hidden>
      <tip-modal
        ref="yuAnOverlay"
        :modalWidth="modalWidth"
        :modalHeight="modalHeight"
        :iconName="iconName"
        :title="modalTitle"
        :subTitle="subTitle"
        :componentId="tipComponentId"
        :info="infoData"
        @closeDialog="closeOverlay()"
      ></tip-modal>
    </div>
    <iframe width=0 height=0 id="camera"></iframe>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions, mapMutations } from 'vuex'
import Operation from './components/Operation.vue'
import EventForm from './components/EventForm.vue'
import FarCall from './components/FarCall.vue'
import EventItem from './components/EventItem.vue'
import YuAnInfo from './components/YuAnInfo.vue'
import UserInfo from './components/UserInfo.vue'
import ResourceInfo from './components/ResourceInfo.vue'
import YuAnList from './components/YuAnList.vue'
import EventYuAnForm from './components/EventYuAnForm.vue'
import YuAnForm from './components/YuAnForm.vue'
import { getAllEmergencyArea, postEmergencyArea } from '@/api/map/service'
import { emergencyAreaStyle, emergencyCenterStyle,emergencyPeopleStyle } from '@/utils/util.map.style'
import { stampConvertToTime } from '@/utils/util.tool'
import { filterMeetingPeople } from '@/utils/util.map.manage'
import { getCenter } from 'ol/extent'

import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
let map
export default {
  name: 'page6',
  data() {
    return {
      peopleLayer: null,
      yuAnOverlay: null,
      emergencyLayer: null,
      emergencyCenterLayer: null,
      addPositionClass: false,
      showYuAnList: false,
      showOperate: false,
      eventId: '',
      //查询条件
      query: {
        searchContent: '', //搜索关键字
        status: '', //状态，‘’代表全部
        pageNo: 1, //当前页码
        pageSize: 10 //当前页条数
      },
      //数据查询中
      showLoading: false,
      //数据存放处
      dataArr: [],
      //预案总数
      totalSize: 0,
      //目前激活的预案序号
      activeIndex: null,
      //操作区是否展示
      isActiveOperation: false,
      //新增预案弹窗是否隐藏
      showAddYuAnDialog: false,
      //dialog弹窗是否渲染
      dialogVisible: false,
      //dialog弹窗宽度
      dWidth: 0,
      //dialog弹窗高度
      dHeight: 0,
      //dialog弹窗标题
      dialogTitle: '新增预案',
      //dialog弹窗body内边距设置
      bodyPadding: [0, 10, 10, 10],
      //dialog弹窗body内组件
      dialogComponentId: {},
      //dialog弹窗body内组件需要使用的数据
      sourceData: {},
      //回调函数名
      closeCallBack: null,
      //tipModal弹窗是否渲染
      yuAnTipVisible: true,
      //tipModal弹窗宽
      modalWidth: 482,
      //tipModal弹窗高
      modalHeight: 254,
      //tipModal弹窗显示位置X
      positionX: 0,
      //tipModal弹窗显示位置Y
      positionY: 0,
      //tipModal弹窗标题上的icon
      iconName: '',
      //tipModal弹窗标题
      modalTitle: '',
      //tipModal弹窗副标题
      subTitle: '',
      //tipModal弹窗body内组件
      tipComponentId: {},
      //tipModal组件内组件的原始数据
      infoData: {},
      emergencyAreas: null,
      //远程呼叫所有人员
      ychjPeopleList:[],
      //资源图标
      iconType:[{
          key: '救援绳',
          icon: 'jiuyuanshen'
      },{
          key: '救生衣',
          icon: 'jiushengyi'
      },{
          key: '渣土车',
          icon: 'zhatuche'
      },{
          key: '水车',
          icon: 'shashuiche'
      },{
          key: '挖掘机',
          icon: 'wajueji'
      },{
          key: '皮划艇',
          icon: 'pihuating'
      }],
    }
  },
  components: {
    Operation,
    EventForm,
    FarCall,
    EventItem,
    ResourceInfo,
    YuAnInfo,
    UserInfo,
    YuAnList,
    YuAnForm,
    EventYuAnForm
  },
  computed: {
    ...mapState('cgadmin/menu', ['aside', 'asideCollapse']),
    ...mapState('cgadmin/page', ['current']),
    ...mapState('map', ['mapManager'])
  },
  mounted() {
    this.getDataList()
      setTimeout(() => {
          this.showOperate = true;
          this.showYuAnList = true;
      }, 400);
    this.yuAnOverlay = this.mapManager.addOverlay({
      element: this.$refs.yuAnOverlay.$el
    })
    map = this.mapManager.getMap()
    map.on('click', this.mapClickHandler)
  },
  watch: {
    asideCollapse: function(val) {
      // console.log('asideCollapse 777777', val)
      //true:展开，false:关闭
      if (val) {
        setTimeout(() => {
          this.showOperate = true;
          this.showYuAnList = true;
        }, 400)
      } else {
          this.showOperate = false;
          this.showYuAnList = false;
      }
    }
  },
  methods: {
    ...mapMutations('map', ['pushPageLayers','setEmergencyAllArea', 'setSelectEmergencyFeature']),
    ...mapActions('emergency/emergency', ['getEventDataList','deleteEvent']),
    //地图点击事件处理器
    mapClickHandler({ pixel, coordinate }) {
      const feature = map.forEachFeatureAtPixel(pixel, feature => feature)
        console.log('videofeature',feature);
      if (feature && feature.get('pointType')) {
        if(feature.get('pointType')=='people'){
          //人员弹框
          console.log(feature.get('userid'));
          this.getPersonInfo({Id:feature.get('userid')}).then(res => {
              console.log('getPersonInfo',res)
              this.$refs.yuAnOverlay.$el.style.width='260px';
              this.$refs.yuAnOverlay.$el.style.height='140px';
              this.modalTitle = res.realname;
              this.subTitle = res.isonline ==='0'?'离线':'在线';
              this.iconName = '';
              this.infoData = res;
              this.tipComponentId = UserInfo;
              this.yuAnOverlay.setPosition(coordinate)
          })
        }
        else if(feature.get('pointType')=='resource'){
          //物资弹框
          const info=feature.get('info');
          console.log('info',info);
          let icon = '';
          let hasIcon = this.iconType.some((ic)=>{
              if(info.name.indexOf(ic.key)>=0){
                  icon = ic.icon;
              }
              return info.name.indexOf(ic.key)>=0
          });
          if(!hasIcon){
              icon = 'jiuyuan'
          }
          this.iconName = icon;
          this.modalTitle = info.name;
          this.infoData = info;
          this.tipComponentId = ResourceInfo;
          this.yuAnOverlay.setPosition(coordinate);
        }
        else if(feature.get('pointType')=='bestResource'){
          //最优资源弹框
          const info=feature.get('info');
          console.log(info);
        }
        else if(feature.get('pointType')=='video'){
          //视频弹框
          console.log('video code',feature.get('id'));
          this.openCameraDevice(feature.get('id'));
        }
        else{
          //预案点击弹框
          // this.$refs.yuAnOverlay.$el.style.width='482px';
          // this.$refs.yuAnOverlay.$el.style.height='254px';
          this.tipComponentId = YuAnInfo;
          this.iconName = 'menu-special';
          this.modalTitle = this.infoData.name;
          this.subTitle = stampConvertToTime(this.infoData.startDay) + '-' + stampConvertToTime(this.infoData.endDay)
          this.yuAnOverlay.setPosition(coordinate)
        }
      }
    },

    //打开摄像头第三方插件
    openCameraDevice(code){
        axios.get('http://192.168.71.33:8015/api/sp/getSecretApi')
            .then(function (response) {
                if(response){
                    let PalyType = "PlayReal";
                    let SvrPort = "443";
                    let httpsflag = "1";
                    let data = response.data;
                    let SvrIp = data.SvrIp;
                    let appkey = data.appkey;
                    let appSecret = data.appSecret;
                    let time = data.time;
                    let timeSecret = data.timeSecret;
                    let CamList = code;
                    //主要是添加了'hikvideoclient://' 和 'VersionTag:artemis'2段字符串
                    let param = 'hikvideoclient://ReqType:' + PalyType + ';'
                        + 'VersionTag:artemis' + ';'
                        + 'SvrIp:' + SvrIp + ';'
                        + 'SvrPort:' + SvrPort + ';'
                        + 'Appkey:' + appkey + ';'
                        + 'AppSecret:' + appSecret + ';'
                        + 'time:' + time + ';'
                        + 'timesecret:' + timeSecret + ';'
                        + 'httpsflag:' + httpsflag + ';'
                        + 'CamList:' + CamList + ';';
                    document.getElementById("camera").src = param;
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    //关闭地图弹框
    closeOverlay() {
      this.yuAnOverlay.setPosition(undefined);
    },
    //获取事件预案数据
    getDataList() {
      this.showLoading = true;
      this.getEventDataList(this.query).then(res => {
        console.log(res);
        this.dataArr = res.list;
        this.totalSize = res.total;
        this.showLoading = false;
      })
      //获取预案区域数据
      getAllEmergencyArea().then(points => {
        this.emergencyAreas = points
        this.setEmergencyAllArea(points)
      })
    },
    //搜索关键字查询事件预案
    onSearch(val) {
      this.query.searchContent = val
      this.getDataList()
    },
    //翻页
    changePagination(pageNo, pageSize) {
      console.log('changePagination', pageNo, pageSize)
      this.query.pageNo = pageNo
      this.getDataList()
    },
    //增加事件预案
    addItemOperation() {
      if(this.emergencyLayer){
        this.emergencyLayer.getSource().clear();
      }
      if (this.emergencyCenterLayer) {
        this.emergencyCenterLayer.getSource().clear()
      }
      if(this.peopleLayer){
        this.peopleLayer.getSource().clear();
      }
      this.dialogComponentId = EventForm
      this.dWidth = 810
      this.dHeight = 470
      this.dialogTitle = '新增事件'
      this.bodyPadding = [0, 10, 10, 10]
      this.sourceData = {};
      this.closeCallBack = this.getDataList;
      this.dialogVisible = true
    },
    //编辑事件预案
    editYuAnItem(item) {
      if (this.emergencyLayer) {
        this.emergencyLayer.getSource().clear()
      }
      if (this.emergencyCenterLayer) {
        this.emergencyCenterLayer.getSource().clear()
      }
      if(this.peopleLayer){
        this.peopleLayer.getSource().clear();
      }
      console.log('editYuan item', item)
      this.dialogComponentId = EventForm
      this.dWidth = 810
      this.dHeight = 470
      this.dialogTitle = '修改事件'
      this.bodyPadding = [0, 10, 10, 10]
      this.sourceData = item;
        this.closeCallBack = this.getDataList;
      this.dialogVisible = true
    },
    //删除事件预案
    deleteYuAnItem(item) {
      console.log('deleteYuan', item)
      let data = { id: item.id }
      let _this = this
      this.$confirm({
        title: '确定删除这个事件吗？',
        content: '',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          console.log(_this.emergencyCenterLayer)
          if (_this.emergencyCenterLayer) {
            _this.emergencyCenterLayer.getSource().clear()
          }
          //需要删除的数据
          const feature = _this.emergencyAreas.filter(p => p.get('id') == item.mapId)
          if (feature) {
            //删除应急预案区域
            postEmergencyArea('delete', feature).then(res => {
              console.log(res)
            })
          }
          _this.deleteEvent(data).then(res => {
            console.log(res)
            _this.getDataList()
          })
        },
        onCancel() {}
      })
    },
    //选择某个事件预案
    clickDataItem(index) {
      console.log('clickDataItem', index);
      this.ychjPeopleList = [];
      if (this.emergencyLayer) {
        this.emergencyLayer.getSource().clear()
      }
      if (this.emergencyCenterLayer) {
        this.emergencyCenterLayer.getSource().clear()
      }
      if(this.peopleLayer){
        this.peopleLayer.getSource().clear();
      }
      this.activeIndex = index;
      this.eventId = this.dataArr[index].id;
      const data = this.dataArr[index]
      this.infoData = data;
      if(data.mapId){
        //过滤当前选择的预案区域
        const feature = this.emergencyAreas.filter(p => p.get('id') == data.mapId);
        //当前选中要素保存到vuex
        this.setSelectEmergencyFeature(feature);
        //预案区域图层
        this.emergencyLayer = this.mapManager.addVectorLayerByFeatures(feature, emergencyAreaStyle(), 2);
        this.pushPageLayers(this.emergencyLayer);
        const point = new Feature({
          geometry: new Point([parseFloat(data.positionX), parseFloat(data.positionY)])
        });
        point.set('pointType', 'center');
        //预案中心点图标图层
        this.emergencyCenterLayer = this.mapManager.addVectorLayerByFeatures([point], emergencyCenterStyle(), 3);
        this.pushPageLayers(this.emergencyCenterLayer);
        this.mapManager.getMap().getView().fit(this.emergencyLayer.getSource().getExtent());
        // this.mapManager.locateTo([parseFloat(data.positionX), parseFloat(data.positionY)])
      }
      else{
        this.setSelectEmergencyFeature(null);
      }
    },
      //启动事件预案
      startYuAn(e){
          if(this.activeIndex===null||this.dataArr[this.activeIndex].statusId!=='1'){
              e.preventDefault();
              // this.$notification['warning']({
              //     message: '只能启动状态为未开始的预案',
              //     description: '请重新选择',
              //     style: {
              //         width: '350px',
              //         marginLeft: `50px`,
              //         fontSize: '14px'
              //     }
              // });
          }
          else{
              this.dialogTitle = '启动预案';
              this.closeCallBack = this.getDataList;
              this.sourceData = this.dataArr[this.activeIndex].id;
              this.dialogComponentId = EventYuAnForm;
              this.dWidth = 1200;
              this.dHeight = 644;
              this.bodyPadding = [0, 10, 10, 10];
              this.dialogVisible = true;
          }
      },
    //远程呼叫
    ychjOperation() {
      if (this.activeIndex === null) {
        this.$message.warning('请先选择一个预案')
      } else {
          if(this.ychjPeopleList.length>0){
              this.openYchjDialog(this.ychjPeopleList);
          }
          else{
              this.getAllEmergencyPeople().then(res => {
                  const points = res.map(item => {
                      item.position = [parseFloat(item.x), parseFloat(item.y)];
                      return item;
                  })
                  //过滤出应急区域内的点位
                  const peoples = filterMeetingPeople(this.emergencyLayer.getSource().getFeatures()[0], points)
                  const peopleFeatures = peoples.map(people => {
                      let feature = new Feature({
                          geometry: new Point(people.position)
                      })
                      feature.set('userid', people.userid);
                      feature.set('pointType', 'people');
                      return feature
                  });
                  //创建过滤后的人员点位图层
                  this.peopleLayer = this.mapManager.addVectorLayerByFeatures(peopleFeatures, emergencyPeopleStyle(), 4);
                  //过滤后的人员视频对话
                  this.ychjPeopleList = peoples;
                  this.openYchjDialog(this.ychjPeopleList);
              })
          }
      }
    },
    //获取已选择的周边物资+周边最优资源
    getCheckedOption(data){
      console.log('getCheckedOption',data);
    },
    //人员区域选择后调用此接口
    openYchjDialog(persons) {
      console.log('==过滤后的人员===', persons);
      this.dialogComponentId = FarCall
      this.dWidth = 1200
      this.dHeight = 644
      this.sourceData = persons
      this.dialogTitle = '远程呼叫'
      this.bodyPadding = [0, 10, 10, 10]
      this.dialogVisible = true
    },

      //应急预案组件的各个对外操作
      listOperate(data){
        switch(data.type){
            case 'add':
                this.dialogTitle = '新增预案';
                this.closeCallBack = this.refreshYuAnList;
                this.sourceData = '';
                break;
            case 'edit':
                this.dialogTitle = '编辑预案';
                this.closeCallBack = this.refreshYuAnList;
                this.sourceData = data.id;
                break;
            case 'info':
                break;
            default:
                console.log('no operate')
        }
          this.dialogComponentId = YuAnForm;
          this.dWidth = 1200;
          this.dHeight = 644;
          this.bodyPadding = [0, 10, 10, 10];
          this.dialogVisible = true;
      },

      refreshYuAnList(){
        console.log('go to refreshYuAnList');
        this.$refs.yuAnList.getYuAnList();
      }
  }
}
</script>

<style lang="scss" scoped>
.left-message {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  position: relative;
  .left-message-title {
    height: 50px;
    width: 100%;
    padding-left: 20px;
    line-height: 50px;
    background-color: #f5f7f8;
    color: #2b90f3;
    font-size: 18px;
    text-align: left;
  }
  .search-panel {
    padding: 20px;
  }
  .search-result {
    width: 100%;
    height: calc(100% - 170px);
    position: relative;
    .spin-panel {
      width: 100%;
      height: 480px;
    }
    .data-panel {
      width: 100%;
      height: 100%;
      .none-panel {
        width: 100%;
        height: 100%;
      }
    }
  }
  .pagination-panel {
    text-align: right;
    padding: 20px 20px 0px 0px;
  }
  .left-message-footer{
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: #2b8ff3;
    font-family: PingFang-SC-Heavy;
    font-size: 16px;
    color: #ffffff;
    cursor: pointer;
    &.disable{
      background-color: #b0b0ad;
      cursor: not-allowed;
    }
  }
  .position {
    left: 380px;
    top: 20px;
  }
}
</style>
