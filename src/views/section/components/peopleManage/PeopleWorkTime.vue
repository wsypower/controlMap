<template>
  <div class="people-trail" flex="dir:top">
    <div class="search-panel">
      <div flex="fir:left cross:center">
        <label style="width: 70px;">选择人员：</label>
        <a-select v-model="query.userDisplayId" showSearch placeholder="请选择" style="flex:1;width:246px;">
          <a-select-option v-for="(people, index) in peopleDataList" :value="people.userDisplayId" :key="index">{{ people.name }}（{{ people.dept }}）</a-select-option>
        </a-select>
      </div>
      <div flex="fir:left cross:center" style="margin:10px 0px;">
        <label style="width: 90px;">查询时间：</label>
        <a-range-picker v-model="dayRange" format="YYYY-MM-DD" style="width: 100%" />
      </div>
      <a-button type="primary" style="width: 100%" @click="onSearch">查询</a-button>
    </div>
    <div class="table_header">
      <div>
        <span>星期</span>
        <span class="sort-icon">
          <i @click="onSort('desc')">
            <cg-icon-svg name="caret-up" class="svg_icon_up" :class="{ active: activeName === 'desc' }"></cg-icon-svg>
          </i>
          <i @click="onSort('asc')">
            <cg-icon-svg name="caret-down" class="svg_icon_down" :class="{ active: activeName === 'asc' }"></cg-icon-svg>
          </i>
        </span>
      </div>
      <span>起止时间</span>
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
          <a-pagination :total="totalSize" :showTotal="total => `共 ${total} 条`" :pageSize="20" :current="query.curPage" @change="changePagination" />
        </div>
      </cg-container>
      <div v-if="!showLoading && dataList.length == 0" class="nodata-panel" flex="main:center cross:center">
        <img src="~@img/zanwudata.png" />
      </div>
    </div>
    <div hidden>
      <people-sign-info ref="peopleSignInfo" :info="signInfoData" @showPhoto="showPhoto" @closeTip="closeTip"></people-sign-info>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions, mapState } from 'vuex';
import moment from 'moment';
import util from '@/utils/util';
import PeopleSignInfo from './PeopleSignInfo.vue';
import { pointByCoord } from '@/utils/util.map.manage';
import { PeoplePointStyle } from '@/utils/util.map.style'
const weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
export default {
  name: 'peopleWorkTime',
  props: {
    peopleDataList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data() {
    return {
      query: {
        userId: '',
        userDisplayId: '',
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
      dataList: [],
      totalSize: 0,
      signInfoData: {},
      photoList: [],
      toIndex: 0,
      //签到点位图层
      signLayer: null
    }
  },
  components: {
    PeopleSignInfo
  },
  computed: {
    ...mapState('map', ['mapManager']),
  },
  mounted() {
    this.query.userId = util.cookies.get('userId');
    let temp = this.peopleDataList.find(item => item.id === this.query.userId);
    if (temp) {
      this.query.userDisplayId = temp.userDisplayId;
    } else {
      this.query.userDisplayId = this.peopleDataList[0].userDisplayId;
      // this.query.userDisplayId = '';
    }
    let day = moment(new Date()).format('YYYY-MM-DD');
    this.dayRange = [moment(day, 'YYYY-MM-DD'), moment(day, 'YYYY-MM-DD')];
    this.query.startTime = new Date(day).getTime();
    this.query.endTime = new Date(day).getTime();
    this.getDataList();
    this.map = this.mapManager.getMap();
    this.map.on('click', this.signMapClickHandler);
    this.signOverlay = this.mapManager.addOverlay({
      id: 'peopleSignInfoOverlay',
      offset: [0, -20],
      positioning: 'bottom-center',
      element: this.$refs.peopleSignInfo.$el
    });
  },
  methods: {
    ...mapActions('section/manage', ['getUserWorkTimeDataList', 'getUserSignDetailData']),
    //获取人员签到签退数据
    getDataList() {
      console.log('this.query', this.query);
      if (this.signLayer) {
        this.signLayer.getSource().clear();
        this.closeTip();
      }
      this.showLoading = true;
      this.getUserWorkTimeDataList(this.query).then(res => {
        this.showLoading = false;
        this.dataList = res.queryList.map(item => {
          item.hasDetail = false;
          let week = new Date(item.day).getDay();
          item.weekDay = weekArr[week];
          return item
        });
        this.totalSize = res.count;
      });
    },
    //查询(默认显示当天，当前登入的用户)
    onSearch() {
      this.query.startTime = this.dayRange[0] ? this.dayRange[0]._d.getTime() : '';
      this.query.endTime = this.dayRange[1] ? this.dayRange[1]._d.getTime() : '';
      let dates = Math.floor((this.query.endTime - this.query.startTime)) / (1000 * 60 * 60 * 24);
      if (dates > 3) {
        this.$message.warning('查询时间不可超过3天！！！');
        return;
      }
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
    onSort(sortType) {
      console.log(11111111111, sortType);
      this.activeName = sortType;
      this.query.sortType = sortType;
      this.query.curPage = 1;
      this.getDataList();
    },
    //查看详情
    lookDetail(item) {
      let params = {
        userId: this.query.userId,
        id: item.id
      };
      this.closeTip();
      this.getUserSignDetailData(params).then(res => {
        console.log('signDetail', res);
        item.hasDetail = true;
        //如果点击签到  则显示签到的信息   如果是签退，则signInfoData存放签退的信息，isSignIn设置为false
        this.signInfoData = {};
        let signFeature = [];
        if (res.signIn.positionX && res.signIn.positionY) {
          let signInfoProps = {
            photoUrl: res.signIn.fileList ? res.signIn.fileList[0].url : null,
            photoName: res.signIn.fileList ? res.signIn.fileList[0].name : null,
            photoList: res.signIn.fileList,
            signTime: res.signIn.time,
            isSignIn: true
          };
          const signInFeature = pointByCoord([parseFloat(res.signIn.positionX), parseFloat((res.signIn.positionY))]);
          signInFeature.set('icon', 'people-zx');
          signInFeature.set('type', 'peopleWorkTime');
          signInFeature.set('props', signInfoProps);
          signFeature.push(signInFeature);
        }
        if (res.signOut.positionX && res.signOut.positionY) {
          let signInfoProps = {
            photoUrl: res.signOut.fileList ? res.signOut.fileList[0].url : null,
            photoName: res.signOut.fileList ? res.signOut.fileList[0].name : null,
            photoList: res.signOut.fileList,
            signTime: res.signOut.time,
            isSignIn: false
          };
          const signOutFeature = pointByCoord([parseFloat(res.signOut.positionX), parseFloat((res.signOut.positionY))]);
          signOutFeature.set('icon', 'people-lx');
          signOutFeature.set('type', 'peopleWorkTime');
          signOutFeature.set('props', signInfoProps);
          signFeature.push(signOutFeature);
        }
        if (this.signLayer) {
          this.signLayer.getSource().clear();
          this.signLayer.getSource().addFeatures(signFeature);
        } else {
          this.signLayer = this.mapManager.addVectorLayerByFeatures(signFeature, PeoplePointStyle(), 3);
          this.signLayer.set('featureType', 'peopleWorkTime');
        }
        this.mapManager.getMap().getView().fit(this.signLayer.getSource().getExtent());
        // console.log('this.signInfoData', this.signInfoData);
        // this.$refs.peopleSignInfo.$el.style.display = 'block';
      });
    },
    signMapClickHandler({ pixel, coordinate }) {
      const feature = this.map.forEachFeatureAtPixel(pixel, feature => feature)
      if (feature && feature.get('type') == 'peopleWorkTime') {
        this.signInfoData = feature.get('props');
        this.signOverlay.setPosition(feature.getGeometry().getCoordinates());
      }
    },
    closeTip() {
      this.signOverlay.setPosition(undefined);
    },
    //无用，后续需要清除
    showPhoto(index) {
      this.photoList = this.signInfoData.photoList;
      this.toIndex = index;
      this.$refs.photoShow.$el.style.display = 'block';
    },
    closePhotoShow() {
      this.$refs.photoShow.$el.style.display = 'none';
    }
  }
}
</script>
<style lang="scss" scoped>
.people-trail {
  height: 100%;
  width: 100%;

  .search-panel {
    padding: 20px 0px;
  }

  .table_header {
    margin-bottom: 8px;

    >div {
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

      >* {
        vertical-align: middle;
      }
    }

    >span {
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

      &:nth-last-child(2) {
        border-bottom: solid 1px #f5f5f5;
      }

      &:hover {
        background-color: #e9f6ff;
        border: solid 1px #2b90f3;
      }

      >div {
        &:first-child {
          width: 74px;
          height: 100%;

          span {
            color: #ffffff;
            font-size: 14px;
            padding: 2px 8px;
            background-color: #2b90f3;
            border-radius: 4px;
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

          /*i{*/
          /*color: #2bbdf3;*/
          /*font-size:26px;*/
          /*cursor: pointer;*/
          /*&:hover{*/
          /*color: #2b90f3;*/
          /*}*/
          /*}*/
        }
      }
    }

    .pagination-panel {
      text-align: right;
      padding: 20px 20px 0px 0px;
      background-color: #ffffff;
    }

    .nodata-panel,
    .spin-panel {
      width: 100%;
      height: 100%;
    }
  }
}
</style>