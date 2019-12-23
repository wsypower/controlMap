<template>
    <div class="work-time-panel" flex="dir:top">
        <div class="part">
            <h1>今日打卡</h1>
            <div class="message">
                <p flex="cross:center main:justify">
                    <span>签到时间：{{todayData.signIn}}</span>
                    <span class="status" :class="{normal: todayData.signInState==='1',wrong: todayData.signInState==='2'}">{{todayData.signInState==='1'?'正常':'迟到'}}</span>
                </p>
                <p flex="cross:center main:justify">
                    <span>签退时间：{{todayData.signOut}}</span>
                    <span class="status" :class="{normal: todayData.signOutState==='1',wrong: todayData.signOutState==='2'}">{{todayData.signOutState==='1'?'正常':'早退'}}</span></p>
            </div>
        </div>
        <div class="part">
            <h1>本月统计</h1>
            <div class="table-panel">
                <ul>
                    <li><span>应打卡数</span><span>正常打卡数</span><span>迟到</span><span>早退</span></li>
                    <li><span>{{monthData.totalNum}}</span><span>{{monthData.normalNum}}</span><span>{{monthData.lateNum}}</span><span>{{monthData.earlyNum}}</span></li>
                </ul>
            </div>
        </div>
        <div class="part work-time">
            <h1>考勤查询</h1>
            <div class="people-work-time" flex="dir:top">
                <div class="search-panel">
                    <div flex="fir:left cross:center">
                        <label style="width: 90px;">查询类型：</label>
                        <a-radio-group name="sType" v-model="query.sType" style="width: 100%;">
                            <a-radio value="1">全部</a-radio>
                            <a-radio value="2">迟到</a-radio>
                            <a-radio value="3">早退</a-radio>
                        </a-radio-group>
                    </div>
                    <div flex="fir:left cross:center" style="margin:10px 0px;">
                        <label style="width: 90px;">查询时间：</label>
                        <a-range-picker v-model="dayRange" format="YYYY-MM-DD" style="width: 100%" />
                    </div>
                    <a-button type="primary" style="width: 100%" @click="onSearch">查询</a-button>
                </div>
                <div class="table_header">
                    <span>序号</span>
                    <div>
                        <span>起止时间</span>
                        <span class="sort-icon">
          <i @click="onSort('desc')">
            <cg-icon-svg name="caret-up" class="svg_icon_up" :class="{ active: activeName === 'desc' }"></cg-icon-svg>
          </i>
          <i @click="onSort('asc')">
            <cg-icon-svg
                    name="caret-down"
                    class="svg_icon_down"
                    :class="{ active: activeName === 'asc' }"
            ></cg-icon-svg>
          </i>
        </span>
                    </div>
                </div>
                <div class="content_body">
                    <div class="spin-panel" flex="main:center cross:center" v-if="showLoading">
                        <a-spin tip="数据加载中..."></a-spin>
                    </div>
                    <cg-container scroll v-if="!showLoading && dataList.length > 0">
                        <div class="item" flex="dir:left main:justify" v-for="(item, index) in dataList" :key="index">
                            <div flex="cross:center main:center">
                                <span>{{ item.weekDay }}</span>
                            </div>
                            <div>
                                <p v-if="item.signInTime"><span class="dot green"></span>{{ new Date(item.signInTime) | date_format() }}</p>
                                <p v-else><span class="dot green"></span>--------未签到--------</p>
                                <p v-if="item.signOutTime"><span class="dot red"></span>{{ new Date(item.signOutTime) | date_format() }}</p>
                                <p v-else><span class="dot green"></span>--------未签退--------</p>
                            </div>
                            <div flex="cross:center main:center">
                                <span class="look" @click="lookDetail(item)">查看</span>
                            </div>
                        </div>
                        <div class="pagination-panel" v-if="totalSize > 20">
                            <a-pagination
                                    size="small"
                                    :total="totalSize"
                                    :showTotal="total => `共 ${total} 条`"
                                    :pageSize="20"
                                    :current="query.curPage"
                                    @change="changePagination"
                            />
                        </div>
                    </cg-container>
                    <div v-if="!showLoading && dataList.length == 0" class="nodata-panel" flex="main:center cross:center">
                        <img src="~@img/zanwudata.png" />
                    </div>
                </div>
            </div>
        </div>
        <div hidden>
            <people-sign-info
                    ref="peopleSignInfo"
                    :info="signInfoData"
                    @closeTip="closeTip"
            ></people-sign-info>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
  import { mapActions,mapState } from 'vuex';
  import moment from 'moment';
  import util from '@/utils/util';
  import PeopleSignInfo from './PeopleSignInfo.vue';
  // import { pointByCoord } from '@/utils/util.map.manage';
  // import { PeoplePointStyle } from '@/utils/util.map.style'
  const weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  export default {
    name: 'workTimeInfo',
    components:{
      PeopleSignInfo
    },
    props:{
      userId: {
        type: String,
        default: ''
      }
    },
    data(){
      return {
        todayData: {
          signIn: '',
          signInState: '',
          signOut: '',
          signOutState: '',
        },
        monthData:{
          totalNum: 0,
          normalNum: 0,
          lateNum: 0,
          earlyNum: 0
        },
        query: {
          userId: '',
          sType: '1',
          startTime: '',
          endTime: '',
          sortType: 'desc',
          curPage: 1,
          pageSize: 20
        },
        dayRange: [],

        showLoading: false,
        activeName: 'desc',
        activeIndex: null,
        dataList:[],
        totalSize: 0,
        signInfoData: {},
        photoList: [],
        toIndex: 0,
        //签到点位图层
        signLayer:null
      }
    },
    computed:{
    },
    watch:{
      userId:function(val){
        this.query.userId = val;
      }
    },
    mounted(){
      this.getUserWorkTimeDataMessage();
      let day = moment(new Date()).format('YYYY-MM-DD');
      this.dayRange = [moment(day, 'YYYY-MM-DD'),moment(day, 'YYYY-MM-DD')];
      this.query.startTime = new Date(day).getTime();
      this.query.endTime = new Date(day).getTime();
      this.getDataList();
      this.map = this.mapManager.getMap();
      this.map.on('click', this.signMapClickHandler);
      this.signOverlay = this.mapManager.addOverlay({
        id:'peopleSignInfoOverlay',
        offset:[0,-20],
        positioning: 'bottom-center',
        element: this.$refs.peopleSignInfo.$el
      });
    },
    methods:{
      ...mapActions('section/manage', ['getUserWorkTimeTotalData','getUserWorkTimeDataList']),
      getUserWorkTimeDataMessage(){
        this.getUserWorkTimeTotalData({userId: this.query.userId}).then( res => {
          this.todayData  = res.data.todayData;
          this.monthData = res.data.monthData;
        });
      },
      //获取人员签到签退数据
      getDataList(){
        console.log('this.query',this.query);
        this.showLoading = true;
        this.getUserWorkTimeDataList(this.query).then(res=>{
          this.showLoading = false;
          this.dataList = res.data.list.map(item=>{
            item.hasDetail = false;
            let week = new Date(item.day).getDay();
            item.weekDay = weekArr[week];
            return item
          });

          this.totalSize = res.data.total;
        });
      },

      //查询(默认显示当天，当前登入的用户)
      onSearch() {
        this.query.startTime = this.dayRange[0]._d.getTime();
        this.query.endTime = this.dayRange[1]._d.getTime();
        this.query.curPage = 1;
        this.getDataList()
      },

      //翻页
      changePagination(pageNo, pageSize) {
        console.log('changePagination', pageNo, pageSize);
        this.query.curPage = pageNo;
        this.getDataList()
      },

      //按照时间排序（正序、倒序）
      onSort(sortType){
        console.log(11111111111,sortType);
        this.activeName = sortType;
        this.query.sortType = sortType;
        this.query.curPage = 1;
        this.getDataList();
      },
      //查看详情
      lookDetail(item){
        let params = {
          userId: this.query.userId,
          id: item.id
        };
        this.getUserSignDetailData(params).then(res=>{
          console.log('signDetail',res);
          item.hasDetail = true;
          //如果点击签到  则显示签到的信息   如果是签退，则signInfoData存放签退的信息，isSignIn设置为false
          this.signInfoData = {
            photoUrl: res.signIn.fileList[0].url,
            photoName: res.signIn.fileList[0].name,
            photoList: res.signIn.fileList,
            signTime: res.signIn.time,
            isSignIn: true
          };
          let signFeature=[];
          if(res.signIn.positionX&&res.signIn.positionY){
            const signInFeature=pointByCoord([parseFloat(res.signIn.positionX),parseFloat((res.signIn.positionY))]);
            signInFeature.set('icon','people-zx');
            signInFeature.set('type','peopleWorkTime');
            signFeature.push(signInFeature);
          }
          if(res.signOut.positionX&&res.signOut.positionY){
            const signOutFeature=pointByCoord([parseFloat(res.signOut.positionX),parseFloat((res.signOut.positionY))]);
            signOutFeature.set('icon','people-lx');
            signOutFeature.set('type','peopleWorkTime');
            signFeature.push(signOutFeature);
          }
          this.signLayer=this.mapManager.addVectorLayerByFeatures(signFeature,PeoplePointStyle(),3);
          this.signLayer.set('featureType','peopleWorkTime');
          this.mapManager.getMap().getView().fit(this.signLayer.getSource().getExtent());
          console.log('this.signInfoData',this.signInfoData);
          // this.$refs.peopleSignInfo.$el.style.display = 'block';
        });
      },
      signMapClickHandler({ pixel, coordinate }){
        const feature = this.map.forEachFeatureAtPixel(pixel, feature => feature)
        if(feature&& feature.get('type')=='peopleWorkTime'){
          this.signOverlay.setPosition(coordinate);
        }
      },
      closeTip(){
        this.signOverlay.setPosition(undefined);
      }
    }
  }
</script>
<style lang="scss" scoped>
    .work-time-panel {
        height: 100%;
        width: 100%;
        .part{
            width: 100%;
            h1{
                font-size: 16px;
                height: 40px;
                line-height: 40px;
            }
            .message{
                width: 100%;
                p{
                    line-height: 16px;
                    font-size: 14px;
                    color: #333333;
                    .status{
                        &.wrong{
                            color: #e03131;
                        }
                        &.normal{
                            color:#37b24d;
                        }
                    }
                }
            }
            .table-panel{
                ul{
                    width: 100%;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    li{
                        height: 30px;
                        line-height: 30px;
                        &:first-child{
                            background-color: #40a9ff;
                            border: 1px solid #40a9ff;
                            span{
                                color: #ffffff;
                            }
                        }
                        &:last-child{
                            background-color: #eeeeee;
                            border: 1px solid #eeeeee;
                            span{
                                color: #666666;
                            }
                        }
                        span{
                            display: inline-block;
                            text-align: center;
                            width: 25%;
                            border-right: 1px solid #ffffff;
                            &:last-child{
                                border-width: 0px;
                            }
                            /*&:first-child{*/
                                /*width: 100px;*/
                            /*}*/
                            /*&*/
                        }
                    }
                }
            }
            .people-work-time {
                height: 100%;
                width: 100%;
                .search-panel {
                    padding-bottom: 20px;
                }
                .table_header {
                    margin-bottom: 8px;
                    > div {
                        display: inline-block;
                        width: 100px;
                        text-align: center;
                        .sort-icon {
                            display: inline-block;
                            margin-left: 5px;
                            .svg_icon_up,
                            .svg_icon_down {
                                display: block;
                                width: 8px;
                                height: 8px;
                                color: #cccecf;
                                cursor: pointer;
                                &.active {
                                    color: #333333;
                                }
                            }
                        }
                        > * {
                            vertical-align: middle;
                        }
                    }
                    > span {
                        display: inline-block;
                        width: 80px;
                        text-align: center;
                        vertical-align: middle;
                    }
                }
                .content_body {
                    background-color: #f5f5f5;
                    height: calc(100% - 70px);
                    position: relative;
                    .item {
                        width: 100%;
                        height: 68px;
                        border-top: solid 1px #f5f5f5;
                        border-right: solid 1px #f5f5f5;
                        border-left: solid 1px #f5f5f5;
                        border-bottom: 1px solid #dddddd;
                        &:hover {
                            background-color: #e9f6ff;
                            border: solid 1px #2b90f3;
                        }
                        > div {
                            &:first-child {
                                width: 74px;
                                height: 100%;
                                span {
                                    color: #ffffff;
                                    font-size: 14px;
                                    padding: 5px 8px;
                                    background-color: #2b90f3;
                                    border-radius: 4px;
                                    width: 45px;
                                    text-align: center;
                                }
                            }
                            &:nth-child(2) {
                                border-left: 1px dashed #dddddd;
                                margin: 20px 0px 20px -30px;
                                p {
                                    margin-bottom: 5px;
                                    margin-left: -4px;
                                    &:first-child {
                                        margin-top: -10px;
                                    }
                                }
                                .dot {
                                    display: inline-block;
                                    width: 8px;
                                    height: 8px;
                                    border-radius: 8px;
                                    margin-right: 15px;
                                    &.green {
                                        background-color: #50cf3f;
                                    }
                                    &.red {
                                        background-color: #f07171;
                                    }
                                }
                            }
                            &:last-child {
                                width: 66px;
                                height: 100%;
                                .look {
                                    color: #2bbdf3;
                                    cursor: pointer;
                                    border-bottom: 1px solid transparent;
                                    &:hover {
                                        border-bottom: 1px solid #2bbdf3;
                                    }
                                }
                            }
                        }
                    }
                    .pagination-panel {
                        text-align: right;
                        padding: 20px 20px 0px 0px;
                    }
                    .nodata-panel,
                    .spin-panel {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
        .work-time{
            flex: 1;
        }
    }
</style>
