<template>
  <div class="top-operate-panel" :class="{ animation: isAnimationActive }" v-show="isActive">
    <a-dropdown>
      <a-menu slot="overlay" @click="handleOperateClick">
        <a-menu-item key="add"> <a-icon type="plus-square" theme="filled" />新增预案</a-menu-item>
      </a-menu>
      <a-button class="op-btn yacz-btn">
        <i class="icon_yacz">
          <cg-icon-svg name="anjianhuizong" class="svg_icon_anjianhuizong"></cg-icon-svg>
        </i>
        <span class="memu-title-text">预案操作</span>
        <a-icon type="down" />
      </a-button>
    </a-dropdown>
    <a-button class="op-btn ychj-btn" @click="clickYCHJBtn">
      <i class="icon_ychj">
        <cg-icon-svg name="shipin" class="svg_icon_shipin"></cg-icon-svg>
      </i>
      <span class="memu-title-text">远程呼叫</span>
      <a-icon type="right" style="font-size: 12px;" />
    </a-button>
    <a-dropdown v-model="visible">
        <a-button class="op-btn yjzy-btn">
            <i class="icon_yjzy">
                <cg-icon-svg name="yinjiguanli" class="svg_icon_yinjiguanli"></cg-icon-svg>
            </i>
            <span class="memu-title-text">应急资源</span>
            <a-icon type="down" />
        </a-button>
        <a-menu slot="overlay" multiple :openKeys.sync="openKeys" @click="handleResourceClick">
            <template v-for="(item, index) in selectType">
                <a-menu-item v-if="!item.children" :key="item.key" @click="clickShowPoints(item,index)"><cg-icon-svg :name="item.icon" class="svg_icon_common"></cg-icon-svg>{{item.name}}</a-menu-item>
                <a-sub-menu v-if="item.children" :key="item.key"><span slot="title"><cg-icon-svg :name="item.icon" class="svg_icon_common"></cg-icon-svg><span>{{item.name}}</span></span>
                    <a-menu-item v-for="(bncs, index) in item.children" :key="bncs.key" @click="showTypePoints(bncs.type)"><a-checkbox :checked="bncs.checked" class="checkbox_d"></a-checkbox>{{ bncs.name }}</a-menu-item>
                </a-sub-menu>
            </template>
      </a-menu>
    </a-dropdown>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapState } from 'vuex'
import { getAreaVideo,getTypeResources,getTypeEquip } from '@/api/map/service'
import { emergencyPointStyle,videoStyle,emergencyResourceStyle } from '@/utils/util.map.style'
import { filterMeetingPeople } from '@/utils/util.map.manage'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'

export default {
    name: 'operation',
    data(){
        return {
            //应急资源菜单显示
            visible: false,
            //应急资源二级菜单显示
            openKeys:[],
            //是否添加动效
            isAnimationActive: false,
            //组件是否渲染
            isActive: false,
            //应急资源选择类别
          selectType:[
              {
            key:'partVideo',
            name:'区域视频',
            icon:'video-two'
          },
            {
            key:'manager',
            name:'管理人员',
            icon:'menu-section'
          },
            {
            key:'equip',
            name:'物联设备',
            icon:'zhangpeng',
            children: [{
                'key':'all',
                'name':'全部',
                'checked': false,
                'type':'0'
                },{
                'key':'jinggai',
                'name':'井盖',
                'checked': false,
                'type':'3'
                },{
                'key':'lajitong',
                'name':'智慧垃圾桶',
                'checked': false,
                'type':'7'
                },{
                'key':'shuiwei',
                'name':'水位',
                'checked': false,
                'type':'8'
                }]
          },{
            key:'terminal',
            name:'执法终端',
            icon:'wuzi'
          },{
            key:'gps',
            name:'车载卡口gps',
            icon:'jianzhu'
          },{
            key:'car',
            name:'市政环卫车辆',
            icon:'zhuanjia'
          }],
            //已勾选的避难场所
          checkedPlaceList:[],
          emergencyResourceLayer:null
        }
    },
    props:{
        //组件是否渲染
        isActiveOperation:{
            type: Boolean,
            default: false
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
        selectType: function(newValue){
            this.checkedPlaceList = [];
            let placeList = this.selectType[3].children;
            for(let i=1;i<placeList.length;i++){
                if(placeList[i].checked){
                    this.checkedPlaceList.push(placeList[i].name);
                }
            }
            console.log('this.checkedPlaceList',this.checkedPlaceList);
        }
    },
    mounted(){
        // this.$nextTick(() => {
        //     const body = document.querySelector("body");
        //     if (body.append) {
        //         body.append(this.$el);
        //     } else {
        //         body.appendChild(this.$el);
        //     }
        // });
    },
    methods:{
        //预案操作：目前只有新增预案
        handleOperateClick(value){
            console.log('handleMenuClick',value);
            switch(value.key){
                case 'add':
                    console.log('add operation');
                    this.$emit('addItem');
                    break;
                default:
                    console.log('no operation');
            }
        },
        //远程呼叫
        clickYCHJBtn(){
            this.$emit('ychjOperate');
        },
        handleResourceClick(e){
            this.openKeys = [...e.keyPath];
            console.log('handleResourceClick openKeys',e,this.openKeys);
        },
        clickShowPoints(item,index){
            if(item.name=='区域视频'){
              getAreaVideo().then(res=>{
                console.log(this.selectEmergencyFeature[0]);
                const points = filterMeetingPeople(this.selectEmergencyFeature[0],res);
                const features =points.map(p =>{
                  const point = new Feature({
                    geometry: new Point(p.position)
                  });
                  point.set('id',p.id);
                  return point;
                });
                this.selectType[index].layer=this.mapManager.addVectorLayerByFeatures(features,videoStyle(),3);
              })
            }
            else{
              //获取其他类型的应急资源
              getTypeResources(item.key).then( points => {
                const features =points.map(p =>{
                  const point = new Feature({
                    geometry: new Point(p.position)
                  });
                  point.set('id',p.id);
                  return point;
                });
                if(this.emergencyResourceLayer){
                  this.emergencyResourceLayer.getSource().clear();
                }
                // this.selectType[index].layer=this.mapManager.addVectorLayerByFeatures(features,emergencyResourceStyle(item.name),3);
                this.emergencyResourceLayer=this.mapManager.addVectorLayerByFeatures(features,emergencyResourceStyle(item.name),3);
              })
            }
        },
        //在地图上显示不同类型点位
        showTypePoints(type){

          getTypeEquip(type).then(res=>{
            console.log("====设备信息===",res);
          })
        },
        debounce(func, wait) {
            let timeout;
            return function () {
                let context = this;
                let args = arguments;

                if (timeout) clearTimeout(timeout);

                timeout = setTimeout(() => {
                    func.apply(context, args)
                }, wait);
            }
        }
    },
      computed:{
        ...mapState('map', [
          'mapManager',
          'selectEmergencyFeature'
        ]),
      }
}
</script>
<style lang="scss" scoped>
.animation {
  opacity: 1 !important;
  transition: opacity 1s;
  -moz-transition: opacity 1s; /* Firefox 4 */
  -webkit-transition: opacity 1s; /* Safari 和 Chrome */
  -o-transition: opacity 1s; /* Opera */
}
.top-operate-panel {
  position: fixed;
  left: 437px;
  top: 70px;
  width: 426px;
  opacity: 0;
  transition: opacity 1s;
  -moz-transition: opacity 1s; /* Firefox 4 */
  -webkit-transition: opacity 1s; /* Safari 和 Chrome */
  -o-transition: opacity 1s; /* Opera */
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
