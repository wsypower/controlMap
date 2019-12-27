<template>
  <div class="list-panel" flex="dir:top">
    <div class="search-panel">
      <a-input-search
        placeholder="输入关键词搜索"
        v-model="searchValue"
        @search="onSearch"
        @change="onChange"
        enterButton="搜 索"
      ></a-input-search>
    </div>
    <div class="yuan_dialog_body">
      <div class="spin-panel" flex="main:center cross:center" v-if="showLoading">
        <a-spin tip="数据加载中..."></a-spin>
      </div>
      <cg-container scroll v-if="!showLoading && peopleList.length > 0 && showTree">
        <ul class="data-panel">
          <li v-for="(people, index) in peopleList" :key="index" flex="cross:center main:justify">
            <div flex="cross:center">
              <img v-if="people.online && people.sex == 'female'" src="~@img/avatar-female.png" />
              <img v-if="people.online && people.sex == 'male'" src="~@img/avatar-male.png" />
              <img v-if="!people.online && people.sex == 'female'" src="~@img/avatar-female-outline.png" />
              <img v-if="!people.online && people.sex == 'male'" src="~@img/avatar-female-outline.png" />
              <span>{{ people.code }}({{ people.name }})</span>
            </div>
            <span @click="toDetail(people)" class="detail">详情</span>
          </li>
        </ul>
      </cg-container>
      <div
        v-if="(!showLoading && peopleList.length == 0) || !showTree"
        class="nodata-panel"
        flex="main:center cross:center"
      >
        <img src="~@img/zanwudata.png" />
      </div>
    </div>
    <div hidden>
      <people-info ref="peopleInfo" :info="peopleInfoData" @closeTip="closeTip" @getUserId="getUserId"></people-info>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import PeopleInfo from './PeopleInfo'
import { mapActions,mapState } from 'vuex'
import util from '@/utils/util'

export default {
  name: 'peopleList',
  components:{
    PeopleInfo
  },
  data(){
    return {
      //查询输入
      searchValue: '',
      //获取数据时的动效
      showLoading: false,
      //获取人员的原始数据
      peopleList: [],

      //获取某个人员的详细数据，用于弹窗显示
      peopleInfoData: {},
      //当查询时没哟数据时，需要展示无数据图片
      showTree: true,
      //人员数据需要定时刷新
      timer: null,
      peopleLayer:null
    }
  },
  computed:{
      ...mapState('map', ['mapManager']),
  },
  watch:{},
  mounted(){
    this.map=this.mapManager.getMap();
    let _this = this;
    this.getPeopleList();
    _this.timer = setInterval(function() {
      _this.getAllPeopleTreeData({userId:userId}).then(res=>{
        _this.peopleList = res;
      });
    },600000)
  },
  beforeDestroy(){
    clearInterval(this.timer)
  },
  methods:{
    ...mapActions('section/manage', ['getAllPeopleTreeData']),
    getPeopleList(){
        const userId = util.cookies.get('userId');
        this.showLoading = true;
        this.getAllPeopleTreeData({userId:userId}).then(res=>{
            this.peopleList = res.data;
            this.showLoading = false;
            if(this.peopleList.length>0){
                const features=this.peopleList.map(item=>{
                    if(item.x&&item.y){
                        const feature=this.mapManager.xyToFeature(item.x,item.y);
                        // const feature=new Feature({
                        //     geometry: new Point([parseFloat(item.x), parseFloat(item.y)])
                        // });
                        let pointImg;
                        if(item.sex === '1'){
                            if(item.online){
                                pointImg='female_online';
                            }
                            else{
                                pointImg='female_offline';
                            }
                        }
                        else{
                            if(item.online){
                                pointImg='male_online';
                            }
                            else{
                                pointImg='male_offline';
                            }
                        }
                        feature.set('icon',pointImg);
                        feature.set('props',item);
                        return feature;
                    }
                })
                this.peopleLayer= this.mapManager.addClusterLayerByFeatures(features);
                this.peopleLayer.set('layerType','peopleList');
                const extent=this.peopleLayer.getSource().getSource().getExtent();
                this.mapManager.getMap().getView().fit(extent);
            }
        });
    },
    onChange(){
      this.onSearch(this.searchValue);
      //this.searchValue
    },
    //查询后直接筛选数据，不走后端接口调用
    onSearch(val){

    },
    toDetail(info) {
      const layers=this.map.getLayers().array_;
      //切换时清除地图上的一些操作
      layers.forEach(l=>{
          if(l.get('layerType')){
              if (l.get('layerType') == 'peopleList') {
                  l.setVisible(false);
              }else if(l.get('layerType') == 'PeopleTrail'){
                  l.setVisible(true);
                  this.map.getView().fit(l.getSource().getExtent());
              }
          }
      });
      this.$emit('toDetail', info);
    },
    getUserId(id){

    },
    closeTip(){

    }
  }
}
</script>
<style lang="scss" scoped>
.list-panel {
  height: 100%;
  width: 50%;
  padding: 20px;
  .search-panel {
    padding: 20px 0px;
  }
  .yuan_dialog_body {
    background-color: #f5f5f5;
    height: calc(100% - 70px);
    position: relative;
    .data-panel {
      width: 100%;
      height: 100%;
      padding: 10px;
      list-style: none;
      li {
        height: 40px;
        line-height: 40px;
        .detail {
          color: #00a4fe;
          margin-right: 10px;
          cursor: pointer;
        }
      }
      img {
        width: 26px;
        height: 26px;
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
  }
}
</style>
