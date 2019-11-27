<template>
  <div class="people-manage" flex="dir:top">
    <div class="search-panel">
      <a-input-search placeholder="输入关键词搜索" @search="onSearch" enterButton="搜 索"></a-input-search>
    </div>
    <div class="yuan_dialog_body">
      <div class="spin-panel" flex="main:center cross:center" v-if="showLoading">
        <a-spin tip="数据加载中..."></a-spin>
      </div>
      <cg-container scroll v-if="!showLoading && treeData.length > 0">
        <a-tree class="tree-panel" showIcon showLine :treeData="treeData" @select="onSelect">
          <img slot="dept" src="~@img/avatar_dept.png" />
          <img slot="male" src="~@img/avatar-male.png" />
          <img slot="male-outline" src="~@img/avatar-male-outline.png" />
          <img slot="female" src="~@img/avatar-female.png" />
          <img slot="female-outline" src="~@img/avatar-female-outline.png" />
        </a-tree>
      </cg-container>
      <div v-if="!showLoading && treeData.length == 0" class="nodata-panel" flex="main:center cross:center">
        <img src="~@img/zanwudata.png" />
      </div>
    </div>
    <div hidden>
      <people-info
        ref="peopleInfo"
        :info="peopleInfoData"
        @closeTip="closeTip"
        @getUserId="getUserId"></people-info>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions,mapState } from 'vuex'
import PeopleInfo from './PeopleInfo.vue';
import {PeoplePointStyle} from '@/utils/util.map.style'
export default {
    name: '',
    components:{
        PeopleInfo
    },
    data(){
        return {
            showLoading: false,
            sourceData: [],
            peopleInfoData: {},
            peopleFeatures:[],
            peopleLayer:null,
            isLoadData:false,
        }
    },
    watch:{
      isLoadData:function() {
        if(this.peopleFeatures.length>0){
          const peopleLayer = this.mapManager.addVectorLayerByFeatures(this.peopleFeatures,PeoplePointStyle(),3);
          this.mapManager.getMap().getView().fit(peopleLayer.getSource().getExtent());
        }
      }
    },
    computed:{
       ...mapState('map', ['mapManager']),
        //获得展示的数据与属性
       treeData:function(){
           let data = JSON.parse(JSON.stringify(this.sourceData));
           this.peopleFeatures=[];
           this.changeTreeData(data);
           this.isLoadData=!this.isLoadData;
           return data;
       }
    },
    mounted(){
        this.showLoading = true;
        this.getAllPeopleTreeData().then(res=>{
            this.sourceData = res.data;
            this.showLoading = false;
        });
        this.map = this.mapManager.getMap()
        this.map.on('click', this.peopleMapClickHandler);
        this.peopleOverlay = this.mapManager.addOverlay({
          offset:[0,-20],
          positioning: 'bottom-center',
          element: this.$refs.peopleInfo.$el
        });
    },
    methods:{
        ...mapActions('section/common', ['getAllPeopleTreeData']),
        onSearch(val){
            this.showLoading = true;
            this.getAllPeopleTreeData({searchContent: val}).then(res=>{
                this.sourceData = res.data;
                this.showLoading = false;
            });
        },
        //给后端的数据增加一些前端展示与判断需要的属性
        changeTreeData(arr){
            const _this=this;
            arr.forEach(item=>{
                item.title = item.name;
                let pointImg;
                if(item.isLeaf){
                    item.key = item.id;
                    if(item.sex=='female'){
                        if(item.online){
                            item.slots = {icon: 'female'};
                            pointImg='female_online';
                        }
                        else{
                            item.slots = {icon: 'female-outline'};
                            pointImg='female_offline';
                        }
                    }
                    else{
                        if(item.online){
                            item.slots = {icon: 'male'};
                            pointImg='male_online';
                        }
                        else{
                            item.slots = {icon: 'male-outline'};
                            pointImg='male_offline';
                        }
                    }
                    item.class = 'itemClass';
                    // 通过经纬度生成点位加到地图上
                    if(item.x && item.x.length>0 && item.y && item.y.length>0){
                      const feature=_this.mapManager.xyToFeature(item.x,item.y);
                      feature.set('icon',pointImg);
                      feature.set('props',item);
                      _this.peopleFeatures.push(feature);
                    }
                }
                else{
                    item.key = 'dept_' + item.id;
                    item.slots = {icon: 'dept'}
                    this.changeTreeData(item.children)
                }
            })
        },
        //点击树中某个节点（某个人员）时触发
        onSelect(selectedKeys, e){
          this.getUserInfoById(this.sourceData,selectedKeys[0],'');
          this.peopleOverlay.setPosition([parseFloat(this.peopleInfoData.x),parseFloat(this.peopleInfoData.y)])
        },
        //获取父节点的一些关键信息存放入peopleInfoData，给peopleInfo使用
        getUserInfoById(arr,id,dept){
            for(let i=0;i<arr.length;i++){
                if(arr[i].isLeaf){
                    if(arr[i].id == id){
                        arr[i].dept = dept;
                        this.peopleInfoData = arr[i];
                    }
                }
                else{
                    this.getUserInfoById(arr[i].children,id,arr[i].name);
                }
            }
        },
        //地图上人员点击事件处理器
        peopleMapClickHandler({ pixel, coordinate }){
          const feature = this.map.forEachFeatureAtPixel(pixel, feature => feature)
          if(feature){
            this.peopleInfoData=feature.get('props');
            this.peopleOverlay.setPosition(coordinate);
          }
        },
        //人员轨迹触发
        getUserId(data){
            this.$emit('getUserId',data);
        },
        closeTip(){
          this.peopleOverlay.setPosition(undefined);
        }
    }
}
</script>
<style lang="scss" scoped>
.people-manage {
  height: 100%;
  width: 100%;
  .search-panel {
    padding: 20px 0px;
  }
  .yuan_dialog_body {
    background-color: #f5f5f5;
    height: calc(100% - 70px);
    position: relative;
    .tree-panel {
      width: 100%;
      height: 100%;
      padding: 10px;
      img {
        width: 20px;
        height: 20px;
        display: inline-block;
        border-radius: 12px;
        margin-right: 8px;
      }
    }
    .nodata-panel,
    .spin-panel {
      width: 100%;
      height: 100%;
    }
    /deep/.ant-tree.ant-tree-show-line li:not(:last-child):before {
      border-left: 1px dashed rgba(0, 164, 254, 0.8);
    }
    /deep/.ant-tree.ant-tree-show-line li span.ant-tree-switcher {
      background-color: #f5f5f5;
      color: rgba(43, 144, 243, 0.8);
    }
    /deep/.itemClass {
      &::before {
        opacity: 0;
      }
      span.ant-tree-switcher {
        opacity: 0;
      }
    }
  }
}
</style>
