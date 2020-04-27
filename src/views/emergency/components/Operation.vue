<template>
    <div>
        <div class="top-operate-panel">
            <a-button class="op-btn yacz-btn" @click="addEvent">
                <i class="icon_yacz">
                    <cg-icon-svg name="anjianhuizong" class="svg_icon_anjianhuizong"></cg-icon-svg>
                </i>
                <span class="memu-title-text">新增事件</span>
            </a-button>
            <!--<a-button class="op-btn ychj-btn" @click="clickYCHJBtn">-->
            <!--<i class="icon_ychj">-->
            <!--<cg-icon-svg name="shipin" class="svg_icon_shipin"></cg-icon-svg>-->
            <!--</i>-->
            <!--<span class="memu-title-text">远程呼叫</span>-->
            <!--<a-icon type="right" style="font-size: 12px;" />-->
            <!--</a-button>-->
            <a-dropdown v-model="visible" @visibleChange="visibleChange">
                <a-button class="op-btn yjzy-btn">
                    <i class="icon_yjzy">
                        <cg-icon-svg name="dianchi" class="svg_icon_yinjiguanli"></cg-icon-svg>
                    </i>
                    <span class="memu-title-text">周边物资</span>
                    <a-icon type="down" />
                </a-button>
                <a-menu slot="overlay" multiple :openKeys.sync="openKeys">
                    <template v-for="(item, index) in sourceType">
                        <a-menu-item :key="item.key" @click="clickShowPoints(item,index)">
                            <a-checkbox :checked="item.checked" class="checkbox_d"></a-checkbox>
                            <cg-icon-svg :name="item.icon" class="svg_icon_common"></cg-icon-svg>
                            {{item.name}}
                        </a-menu-item>
                    </template>
                </a-menu>
            </a-dropdown>
            <a-dropdown v-model="bestVisible">
                <a-button class="op-btn best-btn">
                    <i class="icon_best">
                        <cg-icon-svg name="wulianwang" class="svg_icon_best"></cg-icon-svg>
                    </i>
                    <span class="memu-title-text">周边最优资源</span>
                    <a-icon type="down" />
                </a-button>
                <a-menu slot="overlay" multiple >
                    <template v-for="(item, index) in selectType">
                        <a-menu-item :key="item.key" @click="clickShowBestPoints(item,index)">
                            <a-checkbox :checked="item.checked" class="checkbox_d"></a-checkbox>
                            <cg-icon-svg :name="item.icon" class="svg_icon_common"></cg-icon-svg>
                            {{item.name}}
                        </a-menu-item>
                    </template>
                </a-menu>
            </a-dropdown>
        </div>
        <!--<div hidden>-->
            <!--<video-info ref="videoInfo" :info="videoInfoData" @closeTip="closeTip" @openVideoPlayer="openVideoPlayer"></video-info>-->
        <!--</div>-->
    </div>
</template>
<script type="text/ecmascript-6">
import { mapState, mapActions, mapMutations } from 'vuex'
import { getAreaVideo,getTypeResources } from '@/api/map/service'
import { videoStyle,emergencyResourceStyle,emergencyBestResourceStyle } from '@/utils/util.map.style'
import { filterMeetingPeople } from '@/utils/util.map.manage'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'

export default {
    name: 'operation',
    data(){
        return {
            //周边物资菜单显示
            visible: false,
            //应急资源二级菜单显示
            openKeys:[],
            //是否添加动效
            isAnimationActive: false,
            //组件是否渲染
            isActive: false,
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
            //周边物资选择类别
            sourceType:[],
            //周边最优资源菜单显示
            bestVisible: false,
            //周边最优资源选择类别
            selectType:[
                {
                    key:'partVideo',
                    name:'摄像头',
                    icon:'camera',
                    checked: false
                },
                // {
                //     key:'zfPeople',
                //     name:'最优执法队员',
                //     icon:'zf-people',
                //     checked: false
                // },
                // {
                //     key:'zfCar',
                //     name:'最优执法车辆',
                //     icon:'zf-car',
                //     checked: false
                // },
                {
                    key:'manager',
                    name:'管理人员',
                    icon:'menu-section',
                    checked: false
                },
                // {
                //     key:'zfPeople',
                //     name:'执法人员',
                //     icon:'zhifa',
                //     checked: false
                // },
                {
                    key:'gps',
                    name:'执法车辆',
                    icon:'gps',
                    checked: false
                },{
                    key:'hwcl',
                    name:'市政环卫车辆',
                    icon:'huoche',
                    checked: false
                }],

          emergencyResourceLayer:null,
          resourceLayer:[],
            selectOverlay:null,
            videoInfoData:{
                addressName: '视频列表',
                videoList: []
            },
        }
    },
    props:{
        //组件是否渲染
        isActiveOperation:{
            type: Boolean,
            default: false
        },
        eventId:{
            type: String,
            default: ''
        },
        isCheckedTuAn: {
            type: Boolean,
            default: false
        }
    },
    computed:{
        ...mapState('map', [
            'mapManager',
            'selectEmergencyFeature'
        ]),
        //已选择的周边最优资源
        checkedBestList:function(){
            return this.selectType.filter(item=>{
                return item.checked===true
            })
        },
        //已选择的周边物资
        checkedResourceList:function(){
            return this.sourceType.filter(item=>{
                return item.checked===true
            })
        }
    },
    watch:{
        //监听从而实现动画效果
        isActiveOperation: function(newValue,oldValue){
            console.log('isActiveOperation: ' + newValue);
            if(newValue){
                this.isActive = true;
                setTimeout(()=> {
                    this.isAnimationActive = true;
                },100)
            }
            else{
                this.isAnimationActive = false;
                setTimeout(()=>{
                    this.isActive = false;
                },100);
            }
        },
        checkedResourceList:function(newVal){
            let data = {
                'best': this.checkedBestList,
                'resource': newVal
            }
            this.$emit('getCheckedOption',data);
        },
        checkedBestList:function(newVal){
            let data = {
                'best': newVal,
                'resource': this.checkedResourceList
            }
            this.$emit('getCheckedOption',data);
        },
        eventId:function(id) {
           if(id){
             this.setPointForBestAndResource();
           }
        }
    },
    mounted(){
        // this.selectOverlay = this.mapManager.addOverlay({
        //     id:'selectVideoOverlay',
        //     offset:[0,-20],
        //     positioning: 'bottom-center',
        //     element: this.$refs.videoInfo.$el
        // });
    },
    methods:{
        ...mapActions('emergency/yuan', ['getResourceDataList','getMapInfoByEventIdAndRTypeId']),
        //新增事件
        addEvent(){
            this.$emit('addItem');
        },
        //远程呼叫
        clickYCHJBtn(){
            this.$emit('ychjOperate');
        },
        //周边物资下拉时获取新数据
        visibleChange(visible){
            console.log('visibleChange',visible);
            console.log('this.checkedResourceList',this.checkedResourceList);
            if(visible){
                this.getResourceDataList().then((res)=>{
                    let arr = res.reduce((cal,item)=>{
                        let icon = '';
                        let hasIcon = this.iconType.some((ic)=>{
                            if(item.name.indexOf(ic.key)>=0){
                                icon = ic.icon;
                            }
                            return item.name.indexOf(ic.key)>=0
                        });
                        if(!hasIcon){
                            icon = 'jiuyuan'
                        }
                        let temp = {
                            key: item.id,
                            name: item.name,
                            icon: icon,
                            checked: false
                        }
                        let ischecked = this.checkedResourceList.some((it)=>{
                            return it.key===item.id
                        })
                        if(ischecked){
                            temp.checked = true;
                        }
                        cal.push(temp);
                        return cal
                    },[]);
                    this.sourceType = arr;
                });
            }
        },
        //展示周边物资
        clickShowPoints(item,index){
            this.sourceType[index].checked = !this.sourceType[index].checked;
            // console.log('clickShowPoints',this.checkedResourceList);
            if(this.sourceType[index].checked){
                this.getMapInfoByEventIdAndRTypeId({rTypeId: this.sourceType[index].key, eventId: this.eventId}).then((res)=>{
                    console.log('getMapInfoByEventIdAndRTypeId',res);
                  const features = res.map(p => {
                    if(p.x.length>0 && p.y.length>0) {
                      const point = new Feature({
                        geometry: new Point([parseFloat(p.x), parseFloat(p.y)])
                      });
                      point.set('id', p.id);
                      point.set('info', p);
                      point.set('pointType', 'resource');
                      return point;
                    }
                  })
                  const layer=this.mapManager.addVectorLayerByFeatures(features.filter(Boolean), emergencyResourceStyle(item.icon), 3);
                  this.mapManager.getMap().getView().fit(layer.getSource().getExtent());
                  this.resourceLayer.push({
                    key:item.key,
                    layer:layer
                  });
                });
            } else{
              //清理此类物资在地图上的显示
              for(let i=0;i<this.resourceLayer.length;i++){
                if(this.resourceLayer[i].key==this.sourceType[index].key){
                  this.resourceLayer[i].layer.getSource().clear();
                }
              }
            }
        },

        //事件改变时，设置地图点位
        setPointForBestAndResource(){
            console.log('已选物资',this.checkedResourceList);
            for(let j=0;j<this.resourceLayer.length;j++){
                this.resourceLayer[j].layer.getSource().clear();
            }
            for(let i=0;i<this.checkedResourceList.length;i++){
                this.getMapInfoByEventIdAndRTypeId({rTypeId: this.checkedResourceList[i].key, eventId: this.eventId}).then((res)=>{
                    console.log('getMapInfoByEventIdAndRTypeId',res);
                    const features = res.map(p => {
                        if(p.x.length>0 && p.y.length>0) {
                            const point = new Feature({
                                geometry: new Point([parseFloat(p.x), parseFloat(p.y)])
                            });
                            point.set('id', p.id);
                            point.set('info', p);
                            point.set('pointType', 'resource');
                            return point;
                        }
                    })
                    const layer=this.mapManager.addVectorLayerByFeatures(features.filter(Boolean), emergencyResourceStyle(this.checkedResourceList[i].icon), 3);
                    for(let k=0;k<this.resourceLayer.length;k++){
                        if(this.resourceLayer[k].key==this.checkedResourceList[i].key){
                            this.resourceLayer[k].layer = layer;
                        }
                    }
                    // this.resourceLayer[index]={
                    //     key:item.key,
                    //     layer:layer
                    // };
                });
            }
          if(this.selectType[0].checked){
            this.emergencyResourceLayer.getSource().getSource().clear();
            getAreaVideo().then(res => {
              let points;
              if (this.selectEmergencyFeature) {
                points = filterMeetingPeople(this.selectEmergencyFeature[0], res);
              } else {
                points = res;
              }
            const features = points.map(p => {
                const point = new Feature({
                    geometry: new Point(p.position)
                });
                point.set('icon','zbsp')
                point.set('id', p.id);
                point.set('name',p.name);
                return point;
            });
            this.emergencyResourceLayer.getSource().getSource().addFeatures(features);
            this.mapManager.getMap().getView().fit(this.emergencyResourceLayer.getSource().getSource().getExtent());
              // this.emergencyResourceLayer = this.mapManager.addVectorLayerByFeatures(features, videoStyle(), 3);
              // this.mapManager.getMap().getView().fit(this.emergencyResourceLayer.getSource().getExtent());
            })
          }
        },
        //展示周边最优资源
        clickShowBestPoints(item,index){
          this.selectType[index].checked = !this.selectType[index].checked;
          if(this.selectType[index].name=='最优执法队员'||this.selectType[index].name=='最优执法车辆'){
            return;
          }
          if(this.selectType[index].checked) {
            if (item.name == '摄像头') {
              if (this.isCheckedTuAn) {
                getAreaVideo().then(res => {
                  // console.log(this.selectEmergencyFeature[0]);
                  let points;
                  if (this.selectEmergencyFeature) {
                    points = filterMeetingPeople(this.selectEmergencyFeature[0], res);
                  } else {
                    points = res;
                  }
                  const features = points.map(p => {
                    const point = new Feature({
                      geometry: new Point(p.position)
                    });
                    point.set('icon','zbsp')
                    point.set('id', p.id);
                    point.set('name',p.name);
                    // point.set('pointType','video');
                    return point;
                  });
                  if (this.emergencyResourceLayer) {
                    this.emergencyResourceLayer.getSource().getSource().clear();
                  }
                  if(features.length>0) {
                    // this.emergencyResourceLayer = this.mapManager.addVectorLayerByFeatures(features, videoStyle(), 3);
                      const data=this.mapManager.addClusterLayerByFeatures(features);
                      this.emergencyResourceLayer =data[0];
                      const selectCluster = data[1];
                      const _this=this;
                      // selectCluster.getFeatures().on(['add'], function(e) {
                      //     const c = e.element.get('features');
                      //     if (!c) {
                      //         return;
                      //     }
                      //     // if (c.length == 1) {
                      //     // } else
                      //     if(c.length <6){
                      //         _this.videoInfoData.videoList=[];
                      //         for(let i=0;i<c.length;i++){
                      //             _this.videoInfoData.videoList.push({
                      //                 label:c[i].get('name'),
                      //                 value:c[i].get('id')
                      //             })
                      //         }
                      //         const coor = e.element.get('geometry').getCoordinates();
                      //         _this.selectOverlay.setPosition(coor);
                      //         console.log('selectCluster',c);
                      //     }
                      // });
                      this.emergencyResourceLayer.set('featureType','videoDistribute');
                      const extent = this.emergencyResourceLayer.getSource().getSource().getExtent();
                      this.mapManager.getMap().getView().fit(extent);
                    // this.emergencyResourceLayer = this.mapManager.addClusterLayerByFeatures(features);
                    // this.mapManager.getMap().getView().fit(this.emergencyResourceLayer.getSource().getExtent());
                  }
                })
              }
              else {
                this.$message.error('请先选择一个预案');
                this.selectType[index].checked = !this.selectType[index].checked;
              }
            }
            else {
              // this.selectType[index].checked = !this.selectType[index].checked;
              //获取其他类型的应急资源
              getTypeResources(item.key).then(points => {
                const features = points.map(p => {
                  const point = new Feature({
                    geometry: new Point(p.position)
                  });
                  point.set('id', p.id);
                  point.set('info',p.info);
                  point.set('online',p.online);
                  point.set('pointType','bestResource');
                  point.set('key',item.key);
                  return point;
                });
                this.selectType[index].layer = this.mapManager.addVectorLayerByFeatures(features, emergencyBestResourceStyle(item.key), 3);
                this.mapManager.getMap().getView().fit(this.selectType[index].layer.getSource().getExtent());
                // this.emergencyResourceLayer=this.mapManager.addVectorLayerByFeatures(features,emergencyResourceStyle(item.name),3);
              })
            }
          }
          else{
            if(this.selectType[index].name == '摄像头'){
              this.emergencyResourceLayer.getSource().getSource().clear();
            }
            else{
              this.selectType[index].layer.getSource().clear();
            }
          }
        },
    },
      beforeDestroy(){
        this.mapManager.removeLayer(this.emergencyResourceLayer);
        this.selectType.map(item =>{
          item.layer && this.mapManager.removeLayer(item.layer);
        });
        this.resourceLayer.map(item=>{
          item.layer && this.mapManager.removeLayer(item.layer);
        })
      }
}
</script>
<style lang="scss" scoped>
.top-operate-panel {
  position: fixed;
  left: 437px;
  top: 70px;
  width: 440px;

  .op-btn {
    height: 36px;
    border-radius: 0px;
    .memu-title-text {
      display: inline-block;
      margin-left: 10px;
      font-family: PingFang-SC-Heavy;
      font-size: 14px;
      color: #333333;
      vertical-align: middle;
    }
  }
  .yacz-btn {
    .icon_yacz {
      display: inline-block;
      width: 24px;
      height: 24px;
      background-color: #f99f12;
      border-radius: 12px;
      vertical-align: middle;
      .svg_icon_anjianhuizong {
        color: #ffffff;
        margin-top: 5px;
      }
    }
  }
  .ychj-btn {
    .icon_ychj {
      display: inline-block;
      width: 24px;
      height: 24px;
      background-color: #2b8ff3;
      border-radius: 12px;
      vertical-align: middle;
      .svg_icon_shipin {
        color: #ffffff;
        margin-top: 5px;
      }
    }
  }
  .yjzy-btn {
    .icon_yjzy {
      display: inline-block;
      width: 24px;
      height: 24px;
      background-color: #f07171;
      border-radius: 12px;
      vertical-align: middle;
      .svg_icon_yinjiguanli {
        color: #ffffff;
        margin-top: 5px;
      }
    }
  }
    .best-btn {
        .icon_best {
            display: inline-block;
            width: 24px;
            height: 24px;
            background-color: #50cf3f;
            border-radius: 12px;
            vertical-align: middle;
            .svg_icon_best {
                color: #ffffff;
                margin-top: 5px;
            }
        }
    }
}
/deep/.svg_icon_common {
  color: #999999;
  margin-right: 8px;
}
/deep/.ant-dropdown-menu-item:hover {
  background-color: #eaf1fa;
  color: #2b8ff3;
  .svg_icon_common {
    color: #2b8ff3;
  }
}
/deep/.ant-dropdown-menu-item-selected{
    .svg_icon_common {
        color: #2b8ff3;
    }
}
/deep/.ant-dropdown-menu-submenu-title:hover {
  background-color: #eaf1fa;
  color: #2b8ff3;
  .svg_icon_common {
    color: #2b8ff3;
  }
}
.checkbox_d{
    margin-right: 6px;
}
</style>
<style lang="scss">
.ant-dropdown ul{
    max-height: 400px;
    overflow-y: auto;
}
</style>