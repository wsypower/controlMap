<template>
  <div class="people-trail" flex="dir:top">
    <div class="search-panel">
      <div flex="fir:left cross:center">
        <label style="width: 90px;">查询时间：</label>
        <a-range-picker v-model="dayRange" style="width: 100%" />
      </div>
      <div flex="fir:left cross:center" style="margin:10px 0px;">
        <label style="width: 70px;">选择人员：</label>
        <a-select v-model="query.peopleId" showSearch placeholder="请选择" style="flex:1;width:246px;">
          <a-select-option value="" key="-1">全部</a-select-option>
          <a-select-option v-for="(people, index) in peopleDataList" :value="people.id" :key="index"
            >{{ people.name }}（{{ people.dept }}）</a-select-option
          >
        </a-select>
      </div>
      <div flex="fir:left cross:center" style="margin-bottom:10px;">
        <label style="width: 90px;">违规类型：</label>
        <a-select v-model="query.vType" showSearch placeholder="请选择" style="width: 100%;">
          <a-select-option value="">全部</a-select-option>
          <a-select-option value="1">越界</a-select-option>
<!--          <a-select-option value="2">不在岗</a-select-option>-->
        </a-select>
      </div>
      <a-button type="primary" style="width: 100%" @click="onSearch">查询</a-button>
    </div>
    <div class="table_header" flex="dir:left cross:center main:justify">
      <span>违规记录</span>
      <span v-if="dataList.length > 0">人数：{{ dataList.length }}</span>
    </div>
    <div class="content_body">
      <div class="spin-panel" flex="main:center cross:center" v-if="showLoading">
        <a-spin tip="数据加载中..."></a-spin>
      </div>
      <cg-container scroll v-if="!showLoading && dataList.length > 0">
        <div class="item" v-for="(item, index) in dataList" :key="index">
          <div class="base-info-panel">
            <div class="base">
              <span>{{ item.name }}</span
              ><span>（{{ item.dept }}）</span>
            </div>
            <div class="type">
              <span
                v-for="vType in item.vTypeList"
                :class="{ yuejie: vType == '1', buzaigang: vType == '2' }"
                :key="vType">{{ vType == '1' ? '越界':'不在岗' }}</span
              >
            </div>
            <div class="right-top-panel">违规{{ item.vLog.length }}次</div>
            <div class="right-bottom-panel" @click="onExpend(index, item)">
              <span>{{ item.expend ? '收起' : '展开' }}</span
              ><a-icon type="caret-down" class="expend-icon" :class="{ up: item.expend }" />
            </div>
          </div>
          <ul ref="animatePanel" class="animate-panel" :class="{ downAnimate: item.expend, upAnimate: !item.expend }">
            <div class="animate-content" ref="animateContent">
              <li v-for="(log, i) in item.vLog" :key="i">
                <span>{{ log.day }}</span>
                <span>{{ log.startTimeStr }}~{{ log.endTimeStr }}</span>
                <span :class="{ yuejie: log.vType === '1', buzaigang: log.vType === '2' }">{{
                  log.vType=='1' ? '越界' : '不在岗'
                }}</span>
                <span v-if="!log.isStart" @click="startPlay(log)">播放</span>
                <span v-else @click="pausePlay(log)">暂停</span>
                <span><a-icon type="delete" @click="deleteVLog(log, i, index)"/></span>
              </li>
            </div>
          </ul>
        </div>
      </cg-container>
      <div v-if="!showLoading && dataList.length == 0" class="nodata-panel" flex="main:center cross:center">
        <img src="~@img/zanwudata.png" />
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex';
import moment from 'moment';
import util from '@/utils/util';
export default {
    name: 'peopleViolateRules',
    props:{
        peopleDataList:{
            type: Array,
            default(){
                return []
            }
        }
    },
    data(){
        return {
            //查询条件--不分页
            query: {
                userId: '',
                peopleId: '',
                startTime: '',
                endTime: '',
                //违规类型
                vType: '',
            },
            //时间范围
            dayRange: [],
            //查询数据的过渡效果
            showLoading: false,
            dataList:[]
        }
    },
    mounted(){
      this.query.userId = util.cookies.get('userId');
      //获取当前日期并进行转化与显示
      let day = moment(new Date()).format('YYYY-MM-DD');
      this.dayRange = [moment(day, 'YYYY-MM-DD'),moment(day, 'YYYY-MM-DD')];
      this.query.startTime = new Date(day).getTime();
      this.query.endTime =  new Date(day).getTime();
      this.getDataList();
    },
    methods:{
        ...mapActions('section/manage', ['getUserViolateRulesDataList','getUserTrailDataList','deleteUserViolateRules']),
        //获取人员违规数据
        getDataList(){
            console.log('this.query',this.query);
            this.showLoading = true;
            this.getUserViolateRulesDataList(this.query).then(res=>{
                this.dataList = res.map(item=>{
                    item.expend = false;
                    let typeArr = [];
                    item.vLog.forEach(log=>{
                      log.userId = item.userId;
                        log.day = moment(log.startTime).format('YYYY-MM-DD');
                        log.startTimeStr = moment(log.startTime).format('HH:mm');
                        log.endTimeStr = moment(log.endTime).format('HH:mm');
                        log.isStart = false;
                        log.hasDetail = false;
                        if(typeArr.indexOf(log.vType)<0){
                            typeArr.push(log.vType);
                        }
                    })
                    item.vTypeList = typeArr;
                    return item
                })
                this.showLoading = false;
            });
        },
        //搜索查询
        onSearch() {
            this.query.startTime = this.dayRange[0]._d.getTime();
            this.query.endTime = this.dayRange[1]._d.getTime();
            this.getDataList();
        },
        //展开或者收起违规详情
        onExpend(index,item){
            //由于高度是由内容撑开的，所以不是固定值，而动效需要固定高度才能触发，故每一次都需要去计算一下
            let height = this.$refs.animateContent[index].offsetHeight;
            console.log('onExpend',height);
            item.expend = !item.expend;
            if(item.expend){
                this.$refs.animatePanel[index].style.height = height + 'px';
            }
            else{
                this.$refs.animatePanel[index].style.height = '0px';
            }
        },
        //开始播放
        startPlay(log){
            log.isStart = true;
            if(log.hasDetail){
                //已经有轨迹数据，直接在地图上播放
            }
            else{
                let temp = {
                    userId: log.userId,
                    startTime: log.startTime,
                    endTime: log.endTime
                }
                this.getUserTrailDataList(temp).then(res=>{
                    console.log('TrailDetailData',res.data);
                    log.hasDetail = true;
                    //轨迹数据在res.data中，直接在地图上播放
                });
            }

        },
        //暂停播放
        pausePlay(log){
          //地图上处理暂停播放
          log.isStart = false;
        },
        //删除某条非违规记录
        deleteVLog(log,i,index){
          let _this = this;
          this.$confirm({
            title: '确定要删除这条记录吗？',
            content: '',
            onOk() {
              _this.deleteUserViolateRules({id: log.id}).then(res=>{
                _this.dataList[index].vLog.splice(i,1);
                //删除记录后，高度需要重新计算
                setTimeout(()=>{
                  let height = _this.$refs.animateContent[index].offsetHeight;
                  if(_this.dataList[index].expend){
                    _this.$refs.animatePanel[index].style.height = height + 'px';
                  }
                },200)
              });
            },
            onCancel() {},
          });
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
  }
  .content_body {
    height: calc(100% - 70px);
    position: relative;
    .spin-panel,
    .nodata-panel {
      width: 100%;
      height: 100%;
    }
    .item {
      width: 100%;
      margin-bottom: 10px;
      background-color: #f5f5f5;
      position: relative;
      .base-info-panel {
        padding: 8px 12px 0px 12px;
        width: 100%;
        position: relative;
      }
      .base {
        span {
          &:first-child {
            font-family: PingFang-SC-Bold;
            font-size: 18px;
            font-weight: bold;
            color: #333333;
          }
          &:last-child {
            font-family: PingFang-SC-Medium;
            font-size: 13px;
            color: #333333;
          }
        }
      }
      .type {
        margin-top: 6px;
        padding-bottom: 12px;
        span {
          display: inline-block;
          width: 66px;
          height: 22px;
          line-height: 22px;
          border-radius: 11px;
          text-align: center;
          font-family: PingFang-SC-Bold;
          font-size: 13px;
          margin-right: 8px;
          &.yuejie {
            background-color: rgba(240, 113, 113, 0.2);
            color: #f07171;
          }
          &.buzaigang {
            background-color: rgba(254, 135, 8, 0.2);
            color: #fe8708;
          }
        }
      }
      .right-top-panel {
        position: absolute;
        right: 0px;
        top: 0px;
        background-color: #f07171;
        border-bottom-left-radius: 8px;
        font-family: PingFang-SC-Medium;
        font-size: 13px;
        line-height: 20px;
        color: #ffffff;
        padding: 2px 8px;
      }
      .right-bottom-panel {
        position: absolute;
        right: 12px;
        top: 45px;
        cursor: pointer;
        span {
          font-family: PingFang-SC-Medium;
          font-size: 13px;
          color: #2b90f3;
          margin-right: 2px;
        }
        i {
          color: #aaaaaa;
          &.expend-icon {
            transition: all 0.2s;
            transform: rotate(0deg);
            transform-origin: center;
            &.up {
              transform: rotate(180deg);
            }
          }
        }
      }
      .animate-panel {
        height: 0px;
        overflow: hidden;
        transition: height 0.3s;
        &.upAnimate {
          height: 0px;
        }
        &.downAnimate {
          height: auto;
        }
      }
      ul {
        width: 100%;
        list-style: unset;
        padding: 0;
        margin: 0;
        li {
          width: 100%;
          height: 27px;
          line-height: 27px;
          border-top: 1px dashed #ddd;
          &:first-child {
            border-top: 1px solid #dddddd;
          }
          span {
            display: inline-block;
            text-align: center;
            font-size: 13px;
            color: #666666;
            &:nth-child(1) {
              width: 90px;
            }
            &:nth-child(2) {
              width: 90px;
            }
            &:nth-child(3) {
              width: 60px;
              &.yuejie {
                color: #f07171;
              }
              &.buzaigang {
                color: #fe8708;
              }
            }
            &:nth-child(4) {
              width: 50px;
              color: #2b90f3;
              cursor: pointer;
            }
            &:nth-child(5) {
              cursor: pointer;
              &:hover {
                color: #2b90f3;
              }
            }
          }
        }
      }
    }
  }
}
</style>
