<template>
  <div class="map-file-model">
    <div class="map-file-model-header" flex="cross:center main:justify">
      <div class="info-body-left" flex="cross:center">
        <cg-icon-svg name="menu-records" class="svg_icon_records"></cg-icon-svg>
        <span>{{ detailInfo.taskcode }}</span>
      </div>
      <div class="close" @click="closeDialog"></div>
    </div>
    <div class="map-file-model-body">
      <div class="map-file-model-body-nav">
        <ul flex>
          <li flex="cross:center main:center" :class="{ active: activeIndex === 0 }" @click="navClickHandle(0)">
            详细信息
          </li>
          <li flex="cross:center main:center" :class="{ active: activeIndex === 1 }" @click="navClickHandle(1)">
            图片信息
          </li>
          <li flex="cross:center main:center" :class="{ active: activeIndex === 2 }" @click="navClickHandle(2)">
            处理日志
          </li>
        </ul>
      </div>
      <div class="map-file-model-body-content">
        <div class="file-model-body-content" :class="{ active: activeIndex === 0 }">
          <div class="file-message-item">
            <div class="file-message-item-list" flex>
              <div class="one-line">
                问题来源：
                <span>{{ detailInfo.sourcename }}</span>
              </div>
              <div class="two-line" flex>
                问题描述：
                <span :title="detailInfo.eventdesc">{{ detailInfo.eventdesc }}</span>
              </div>
            </div>
            <div class="file-message-item-list" flex>
              <div class="one-line">
                问题分类：
                <span>{{ detailInfo.type1name }}</span>
              </div>
            </div>
            <div class="file-message-item-list" flex>
              <div class="one-line">
                大&emsp;&emsp;类：
                <span>{{ detailInfo.type2name }}</span>
              </div>
              <div class="one-line">
                核查结果：
                <span>{{ detailInfo.checkmsg }}</span>
              </div>
            </div>
            <div class="file-message-item-list" flex>
              <div class="one-line">
                小&emsp;&emsp;类：
                <span>{{ detailInfo.type3name }}</span>
              </div>
              <div class="one-line">
                核实结果：
                <span>{{ detailInfo.verifymsg }}</span>
              </div>
            </div>
          </div>
          <div class="file-message-item">
            <div class="file-message-item-list" flex>
              <div class="one-line">
                街&emsp;&emsp;道：
                <span>{{ detailInfo.streetname }}</span>
              </div>
              <div class="one-line">
                单元网格：
                <span>{{ detailInfo.gridname }}</span>
              </div>
            </div>
            <div class="file-message-item-list" flex>
              <div class="one-line">
                社&emsp;&emsp;区：
                <span>{{ detailInfo.countryname }}</span>
              </div>
              <div class="one-line">
                位&emsp;&emsp;置：
                <span>{{ detailInfo.address }}</span>
              </div>
            </div>
          </div>
          <div class="file-message-item">
            <div class="file-message-item-list" flex>
              <div class="one-line">
                受&ensp;理&ensp;员：
                <span>{{ detailInfo.createname }}</span>
              </div>
              <div class="one-line">
                举&ensp;报&ensp;人：
                <span>{{ detailInfo.reportername }}</span>
              </div>
            </div>
            <div class="file-message-item-list" flex>
              <div class="one-line">
                监&ensp;督&ensp;员：
                <span>{{ detailInfo.patrolername }}</span>
              </div>
              <div class="one-line">
                联系方式：
                <span>{{ detailInfo.reporterphone }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="file-model-body-content" :class="{ active: activeIndex === 1 }">
          <div class="file-img-content" flex>
            <div class="file-img-content-item">
              <div class="img-box" v-if="handleBeforeObj.photosList.length>1">
                <swiper :options="swiperOption" ref="beforeSwiper" style="height:100%" v-viewer>
                  <swiper-slide v-for="(item, index) in handleBeforeObj.photosList" :key="index">
                    <div class="photo-panel">
                      <img class="photo-panel_img" :src="fileServer + item.path" alt="" />
                      <div class="photo-panel_mes"><span>{{item.type}}</span><span>{{ new Date(item.createtime) | date_format() }}</span></div>
                    </div>
                  </swiper-slide>
                </swiper>
                <div class="swiper-button-prev" slot="button-prev">
                  <a-icon type="left" />
                </div>
                <div class="swiper-button-next" slot="button-next">
                  <a-icon type="right" />
                </div>
              </div>
              <div class="img-box" v-else>
                <div class="photo-panel" v-for="(item, index) in handleBeforeObj.photosList" :key="index" v-viewer>
                  <img class="photo-panel_img" :src="fileServer + item.path" alt="" />
                  <div class="photo-panel_mes"><span>{{item.type}}</span><span>{{ new Date(item.createtime) | date_format() }}</span></div>
                </div>
              </div>
              <div class="img-box-title">
                <div>处理前（{{handleBeforeObj.photosList.length}}）</div>
              </div>
            </div>
            <div class="file-img-content-item">
              <div class="img-box" v-if="handleAfterObj.photosList.length>1">
                <swiper :options="swiperOption" ref="afterSwiper" style="height:100%" v-viewer>
                  <swiper-slide v-for="(item, index) in handleAfterObj.photosList" :key="index">
                    <div class="photo-panel">
                      <img class="photo-panel_img" :src="fileServer+item.path" alt="" />
                      <div class="photo-panel_mes"><span>{{item.type}}</span><span>{{ new Date(item.createtime) | date_format() }}</span></div>
                    </div>
                  </swiper-slide>
                </swiper>
                <div class="swiper-button-prev" slot="button-prev">
                  <a-icon type="left" />
                </div>
                <div class="swiper-button-next" slot="button-next">
                  <a-icon type="right" />
                </div>
              </div>
              <div class="img-box" v-else>
                <div class="photo-panel" v-for="(item, index) in handleAfterObj.photosList" :key="index" v-viewer>
                  <img class="photo-panel_img" :src="fileServer+item.path" alt="" />
                  <div class="photo-panel_mes"><span>{{item.type}}</span><span>{{ new Date(item.createtime) | date_format() }}</span></div>
                </div>
              </div>
              <div class="img-box-title">
                <div>处理后（{{handleAfterObj.photosList.length}}）</div>
              </div>
            </div>
          </div>
        </div>
        <div class="file-model-body-content" :class="{ active: activeIndex === 2 }">
          <div class="file-log-content">
            <my-scroll>
              <div class="file-log-content-item" v-for="(log, index) in logData" :key="index">
                <div class="log-content-item-header" flex="cross:center">
                  <div class="title" flex="cross:center">
                    {{log.typename}}
                    <cg-icon-svg name="time2" class="svg_icon_time"></cg-icon-svg>
                  </div>
                  <div class="text" flex="cross:center">
                    【{{log.dealdept}}】环节用时：{{log.usetime}}
                  </div>
                </div>
                <div class="log-content-item-body">
                  <div class="log-content-item-body-content">
                    <div class="item-content" v-for="detail in log.detailelogs" :key="detail.id">
                      <div class="item-content-header">
                        {{new Date(detail.dealtime) | date_format()}}
                      </div>
                      <div class="item-content-body">
                        <div class="log" flex="dir:left">
                          <span>[批转意见]</span>
                          <span style="flex:1">{{detail.dealmsg}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </my-scroll>
          </div>
        </div>
      </div>
    </div>
    <div class="tooltip__arrow"></div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
import util from '@/utils/util'
const typeArr = ['上报', '核实', '核查', '处置'];
export default {
  name: 'recordInfo',
  props: {
    code: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      swiperOption: {
        loop: false,
        slidesPerView: 1,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      activeIndex: 0,
      detailInfo: {
        taskcode: '',
        sourcename: '',
        type1name: '',
        type2name: '',
        type3name: '',
        eventdesc: '',
        checkmsg: '',
        verifymsg: '',

        streetname: '',
        countryname: '',
        gridname: '',
        address: '',

        createname: '',
        patrolername: '',
        reportername: '',
        reporterphone: '',
      },
      fileServer: '',
      handleBeforeObj: {
        photosList: []
      },
      handleAfterObj: {
        photosList: []
      },
      logData: []
    }
  },
  mounted() {
    console.log('code: ' + this.code);
  },
  watch: {
    code: function(val) {
      console.log('watch code: ' + val);
      this.getRecordDetailData({ taskcode: val }).then(res => {
        this.detailInfo = res;
      })
      this.getRecordPhotosData({ taskcode: val }).then(res => {
        this.fileServer = res.fileServer;
        res.handleBefore.photosList.forEach(photo => {
          photo.type = typeArr[parseInt(photo.submittype)];
        })
        res.handleAfter.photosList.forEach(photo => {
          photo.type = typeArr[parseInt(photo.submittype)];
        })
        this.handleBeforeObj = res.handleBefore;
        this.handleAfterObj = res.handleAfter;
      })
      this.getRecordLogsData({ taskcode: val }).then(res => {
        res.forEach(log => {
          let timeArr = util.timediff(log.starttime, log.endtime);
          if (timeArr.length === 0) {
            log.usetime = ''
          } else {
            log.usetime = timeArr[0] + '天' + timeArr[1] + '时' + timeArr[2] + '分' + timeArr[3] + '秒'
          }
        })
        this.logData = res;
      })
    }
  },
  methods: {
    ...mapActions('records/manage', ['getRecordDetailData', 'getRecordPhotosData', 'getRecordLogsData']),
    navClickHandle(index) {
      console.log('111111');
      this.activeIndex = index;
    },
    closeDialog() {
      this.$emit('closeTip')
    }
  }
}
</script>
<style lang="scss" scoped>
.map-file-model {
  width: 482px;
  height: 350px;
  background-image: linear-gradient(90deg, #0065ea 0%, #00a5ff 100%);
  border-radius: 6px;
  box-shadow: -1px 0px 4px 0px rgba(0, 0, 0, 0.12);
  z-index: 10;

  .map-file-model-header {
    height: 40px;
    width: 100%;
    padding-left: 20px;
    padding-right: 10px;

    .info-body-left {
      height: 100%;

      .svg_icon_records {
        color: #ffffff;
        font-size: 18px;
      }

      span {
        margin-left: 10px;
        color: #ffffff;
        font-size: 16px;
      }
    }

    .close {
      width: 24px;
      height: 24px;
      transition: all 0.2s;
      transform: rotate(0deg);
      transform-origin: center;
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA4ElEQVRYR+2WUQ4CMQhEh5vozfRkejO9CaaJTYhpy8Cq7Uf3d4F5O8C2gsmPTNbHBtgOuA6o6klEnplhZXKHAKp6AXADcBWRewSCze0CFHoADyNKQxjxmn7uucg6UAu5EA3xYQ4zA7UNLkRUvBR0AUoQU5iJac0QBeBBZMVpByp5S+j9rmyK26JDDgwgbF13SD8h6BbYxIYT5XVYPNwCx4X/AHS+PtX/sANTh3C0aj9fQ0aAiUmtYaRwJLbCrHsYrXYch3f88IXE/HTmXckiV7BsbOosyIql1vCbYhtgSQdeDpKoIXzqLREAAAAASUVORK5CYII=') no-repeat;
      background-size: 100% 100%;

      &:hover {
        text-decoration: none;
        cursor: pointer;
        transform: rotate(90deg);
      }
    }
  }

  .map-file-model-body {
    width: 482px;
    height: 310px;
    background-color: #fff;

    .map-file-model-body-nav {
      width: 100%;
      height: 54px;
      padding: 0 20px;
      padding-top: 14px;

      ul {
        width: 100%;
        height: 100%;
        padding: 0px;

        li {
          width: 149px;
          height: 40px;
          background-color: #f5f7f8;
          border: solid 1px #dddddd;
          color: #333333;
          font-size: 13px;
          cursor: pointer;

          &:not(:nth-child(3)) {
            border-right: none;
          }

          &.active {
            border-top: 3px solid #00a5ff;
            background-color: #fff;
          }
        }
      }
    }

    .map-file-model-body-content {
      width: 100%;
      height: -webkit-calc(100% - 54px);
      height: calc(100% - 54px);
      padding: 5px 20px 5px 20px;

      .file-model-body-content {
        width: 100%;
        height: 100%;
        display: none;

        &.active {
          display: block;
        }

        .file-message-item {
          width: 100%;
          border-bottom: dotted 1px #dddddd;
          padding-bottom: 5px;
          padding-top: 5px;

          &:last-of-type {
            border-bottom: none;
          }

          .file-message-item-list {
            height: 26px;
            width: 100%;

            .one-line {
              width: 40%;
              height: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              line-height: 26px;
              color: #999999;
              font-size: 12px;

              &:last-child {
                width: 60%;
              }

              span {
                flex: 1;
                color: #333333;
              }
            }

            .two-line {
              width: 60%;
              height: 200%;
              line-height: 26px;
              color: #999999;
              font-size: 12px;

              span {
                width: 225px;
                color: #333333;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                flex: 1;
              }
            }
          }
        }

        .file-img-content {
          width: 100%;
          height: 100%;
          padding-bottom: 15px;
          padding-top: 20px;

          .file-img-content-item {
            width: 50%;
            height: 184px;

            &:first-of-type {
              border-right: 2px dotted #ddd;
              padding-right: 20px;
            }

            &:last-of-type {
              margin-left: 20px;
            }

            .img-box {
              width: 200px;
              height: 124px;
              background: #fafafa url('~@img/noImage.png') no-repeat 30px 10px;
              overflow: hidden;
              position: relative;

              .photo-panel {
                width: 100%;
                height: 100%;
                position: relative;

                img {
                  width: 100%;
                  cursor: zoom-in;
                }

                .photo-panel_mes {
                  position: absolute;
                  bottom: 0px;
                  left: 0px;
                  width: 100%;
                  height: 30px;
                  line-height: 30px;
                  padding-left: 10px;
                  background-color: rgba(0, 0, 0, 0.5);
                  color: #fff;

                  span:last-child {
                    margin-left: 5px;
                  }
                }
              }

              .swiper-button-prev,
              .swiper-button-next {
                position: absolute;
                top: 40%;
                width: 20px;
                height: 34px;
                margin-top: 0px;
                z-index: 10;
                cursor: pointer;
                background-image: unset !important;
                background-color: #eeeeee;
                outline: unset;

                i {
                  margin-top: 10px;
                  margin-left: 4px;
                }
              }

              .swiper-button-prev {
                left: 0px;
              }

              .swiper-button-next {
                right: 0px;
              }
            }

            .img-box-title {
              width: 100%;
              height: 60px;
              padding-top: 15px;

              div {
                &:nth-child(1) {
                  font-size: 14px;
                  color: #333333;
                  margin-bottom: 5px;
                }

                &:nth-child(2) {
                  font-size: 13px;
                  color: #999999;

                  span {
                    margin-right: 10px;
                  }
                }
              }
            }
          }
        }

        .file-log-content {
          width: 100%;
          padding-top: 15px;
          height: 100%;

          .file-log-content-item {
            width: 100%;

            .log-content-item-header {
              height: 26px;
              width: 100%;

              .title {
                font-size: 16px;
                color: #2c90f3;

                .svg_icon_time {
                  margin-left: 5px;
                }
              }

              .text {
                color: #2c90f3;
                font-size: 14px;
                height: 36px;
              }
            }

            .log-content-item-body {
              width: 100%;
              padding-left: 53px;

              .log-content-item-body-content {
                width: 100%;
                border-left: 2px solid #2c90f3;
                padding-left: 22px;
                padding-bottom: 15px;

                .item-content-header {
                  color: #333333;
                  font-size: 13px;
                  padding-top: 5px;
                  margin-bottom: 3px;
                }

                .item-content-body {
                  width: 370px;
                  min-height: 34px;
                  background-color: #ebf0f2;
                  padding-top: 8px;
                  font-size: 13px;
                  padding-bottom: 5px;

                  .log {
                    padding-right: 15px;
                    padding-left: 15px;
                    margin-bottom: 3px;

                    span:first-child {
                      color: #f38e2c;
                      margin-right: 5px;
                    }
                  }

                  .opinion {
                    margin-bottom: 3px;
                    word-wrap: break-word;
                    padding-right: 15px;
                    padding-left: 15px;

                    span {
                      white-space: pre-wrap;
                      word-break: break-all;
                      word-wrap: break-word;

                      &:first-child {
                        color: #39b80c;
                        margin-right: 5px;
                      }
                    }
                  }
                }
              }
            }

            &:last-child {
              .log-content-item-body-content {
                border-left: 2px solid transparent;
              }
            }
          }
        }
      }
    }
  }

  .tooltip__arrow {
    width: 50px;
    height: 25px;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      background: white;
      transform: translateX(-50%) translateY(-50%) rotate(45deg);
      top: 0;
      left: 50%;
      box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.12);
      border: solid 1px #dddddd;
    }
  }
}
</style>