<template>
  <div class="map-file-model">
    <div class="map-file-model-header" flex="cross:center main:justify">
      <div class="info-body-left" flex="cross:center">
        <cg-icon-svg name="menu-records" class="svg_icon_records"></cg-icon-svg>
        <span>{{ detailInfo.code }}</span>
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
                <span>{{ detailInfo.sourceName }}</span>
              </div>
              <div class="two-line" flex>
                问题描述：
                <span :title="detailInfo.description">{{ detailInfo.description }}</span>
              </div>
            </div>
            <div class="file-message-item-list" flex>
              <div class="one-line">
                问题分类：
                <span>{{ detailInfo.type1Name }}</span>
              </div>
            </div>
            <div class="file-message-item-list" flex>
              <div class="one-line">
                大&emsp;&emsp;类：
                <span>{{ detailInfo.type2Name }}</span>
              </div>
              <div class="one-line">
                核查结果：
                <span>{{ detailInfo.hcResult }}</span>
              </div>
            </div>
            <div class="file-message-item-list" flex>
              <div class="one-line">
                小&emsp;&emsp;类：
                <span>{{ detailInfo.type3Name }}</span>
              </div>
              <div class="one-line">
                核实结果：
                <span>{{ detailInfo.hsResult }}</span>
              </div>
            </div>
          </div>
          <div class="file-message-item">
            <div class="file-message-item-list" flex>
              <div class="one-line">
                街&emsp;&emsp;道：
                <span>{{ detailInfo.streetName }}</span>
              </div>
              <div class="one-line">
                单元网格：
                <span>{{ detailInfo.gridName }}</span>
              </div>
            </div>
            <div class="file-message-item-list" flex>
              <div class="one-line">
                社&emsp;&emsp;区：
                <span>{{ detailInfo.countryName }}</span>
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
                <span>{{ detailInfo.creator }}</span>
              </div>
              <div class="one-line">
                举&ensp;报&ensp;人：
                <span>{{ detailInfo.reporterName }}</span>
              </div>
            </div>
            <div class="file-message-item-list" flex>
              <div class="one-line">
                监&ensp;督&ensp;员：
                <span>{{ detailInfo.supervisor }}</span>
              </div>
              <div class="one-line">
                联系方式：
                <span>{{ detailInfo.reporterPhone }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="file-model-body-content" :class="{ active: activeIndex === 1 }">
          <div class="file-img-content" flex>
            <div class="file-img-content-item">
              <div class="img-box" v-if="handleBeforeObj.photosList.length>1">
                <swiper :options="swiperOption" ref="beforeSwiper">
                  <swiper-slide v-for="(item, index) in handleBeforeObj.photosList" :key="index">
                    <img :src="item" alt="" />
                  </swiper-slide>
                </swiper>
                <div class="swiper-button-prev" slot="button-prev"><a-icon type="left" /></div>
                <div class="swiper-button-next" slot="button-next"><a-icon type="right" /></div>
              </div>
              <div class="img-box" v-else>
                <img v-for="(item, index) in handleBeforeObj.photosList" :key="index" :src="item" />
              </div>
              <div class="img-box-title">
                <div>处理前（{{handleBeforeObj.photosList.length}}）</div>
                <div>{{ new Date(handleBeforeObj.uploadTime) | date_format() }}</div>
              </div>
            </div>
            <div class="file-img-content-item">
              <div class="img-box" v-if="handleAfterObj.photosList.length>1">
                <swiper :options="swiperOption" ref="afterSwiper">
                  <swiper-slide v-for="(item, index) in handleAfterObj.photosList" :key="index">
                    <img :src="item" alt="" />
                  </swiper-slide>
                </swiper>
                <div class="swiper-button-prev" slot="button-prev"><a-icon type="left" /></div>
                <div class="swiper-button-next" slot="button-next"><a-icon type="right" /></div>
              </div>
              <div class="img-box" v-else>
                <img v-for="(item, index) in handleAfterObj.photosList" :key="index" :src="item">
              </div>
              <div class="img-box-title">
                <div>处理后（{{handleAfterObj.photosList.length}}）</div>
                <div>{{ new Date(handleAfterObj.uploadTime) | date_format() }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="file-model-body-content" :class="{ active: activeIndex === 2 }">
          <div class="file-log-content">
            <cg-container scroll>
              <div class="file-log-content-item">
                <div class="log-content-item-header" flex="cross:center">
                  <div class="title" flex="cross:center">
                    结案
                    <!--                    <i class="iconfont icon-shijian"></i>-->
                    <cg-icon-svg name="time2" class="svg_icon_time"></cg-icon-svg>
                  </div>
                  <div class="text" flex="cross:center">
                    【监督中心】环节用时：14时55分
                  </div>
                </div>
                <div class="log-content-item-body">
                  <div class="log-content-item-body-content">
                    <div class="item-content">
                      <div class="item-content-header">
                        2018.08.29 15:27
                      </div>
                      <div class="item-content-body">
                        <div class="log" flex="cross:center">
                          <span>[批转意见]</span>
                          <span>区受理员[jksly003]执行了办理操作</span>
                        </div>
                        <div class="opinion" flex="cross:center">
                          <span>[批转意见]</span>
                          <span>区受理员[jksly003]执行了办理操作</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="file-log-content-item">
                <div class="log-content-item-header" flex="cross:center">
                  <div class="title" flex="cross:center">
                    处置
                    <cg-icon-svg name="time2" class="svg_icon_time"></cg-icon-svg>
                    <!--                    <i class="iconfont icon-shijian"></i>-->
                  </div>
                  <div class="text" flex="cross:center">
                    【监督中心】环节用时：14时55分
                  </div>
                </div>
                <div class="log-content-item-body">
                  <div class="log-content-item-body-content">
                    <div class="item-content">
                      <div class="item-content-header">
                        2018.08.29 15:27
                      </div>
                      <div class="item-content-body">
                        <div class="log" flex="cross:center">
                          <span>[批转意见]</span>
                          <span>区受理员[jksly003]执行了办理操作</span>
                        </div>
                        <div class="opinion" flex="cross:center">
                          <span>[批转意见]</span>
                          <span>区受理员[jksly003]执行了办理操作</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="file-log-content-item">
                <div class="log-content-item-header" flex="cross:center">
                  <div class="title" flex="cross:center">
                    立案
                    <!--                    <i class="iconfont icon-shijian"></i>-->
                    <cg-icon-svg name="time2" class="svg_icon_time"></cg-icon-svg>
                  </div>
                  <div class="text" flex="cross:center">
                    【监督中心】环节用时：14时55分
                  </div>
                </div>
                <div class="log-content-item-body">
                  <div class="log-content-item-body-content">
                    <div class="item-content">
                      <div class="item-content-header">
                        2018.08.29 15:27
                      </div>
                      <div class="item-content-body">
                        <div class="log" flex="cross:center">
                          <span>[批转意见]</span>
                          <span>区受理员[jksly003]执行了办理操作</span>
                        </div>
                        <div class="opinion" flex="cross:center">
                          <span>[批转意见]</span>
                          <span>区受理员[jksly003]执行了办理操作</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="file-log-content-item">
                <div class="log-content-item-header" flex="cross:center">
                  <div class="title" flex="cross:center">
                    上报
                    <!--                    <i class="iconfont icon-shijian"></i>-->
                    <cg-icon-svg name="time2" class="svg_icon_time"></cg-icon-svg>
                  </div>
                  <div class="text" flex="cross:center">
                    【监督中心】环节用时：14时55分
                  </div>
                  <!--                  <div>-->
                  <!--                    <h6>附件1：</h6>-->
                  <!--                    <ul style="list-style: none;padding-left: 15px;">-->
                  <!--                      <li>1111</li>-->
                  <!--                      <li>2222</li>-->
                  <!--                      <li>3333</li>-->
                  <!--                    </ul>-->
                  <!--                    <h6>附件2：</h6>-->
                  <!--                    <ul style="list-style: none">-->
                  <!--                      <li>1111</li>-->
                  <!--                      <li>2222</li>-->
                  <!--                      <li>3333</li>-->
                  <!--                    </ul>-->
                  <!--                  </div>-->
                </div>
              </div>
            </cg-container>
          </div>
        </div>
      </div>
    </div>
    <div class="tooltip__arrow"></div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
export default {
  name: 'recordInfo',
  props:{
    code: {
      type: String,
      default: ''
    }
  },
  data(){
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
        code: '',
        sourceName: '',
        type1Name: '',
        type2Name: '',
        type3Name: '',
        description: '',
        hcResult: '',
        hsResult: '',

        streetName: '',
        countryName: '',
        gridName: '',
        address: '',

        creator: '',
        supervisor: '',
        reporterName: '',
        reporterPhone: '',
      },
      handleBeforeObj:{
        time: null,
        photosList: []
      },
      handleAfterObj:{
        time: null,
        photosList: []
      }
    }
  },
  mounted(){
    console.log('code: ' + this.code);
  },
  watch:{
    code: function(val){
      this.getRecordDetailData({code: val}).then( res => {
        this.detailInfo = res.data;
      })
      this.getRecordPhotosData({code: val}).then( res => {
        this.handleBeforeObj = res.data.handleBefore;
        this.handleAfterObj = res.data.handleAfter;
      })
      this.getRecordLogsData({code: val}).then( res => {

      })
    }
  },
  methods:{
    ...mapActions('records/manage', ['getRecordDetailData','getRecordPhotosData','getRecordLogsData']),
    navClickHandle(index){
      console.log('111111');
      this.activeIndex = index;
    },
    closeDialog(){
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
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA4ElEQVRYR+2WUQ4CMQhEh5vozfRkejO9CaaJTYhpy8Cq7Uf3d4F5O8C2gsmPTNbHBtgOuA6o6klEnplhZXKHAKp6AXADcBWRewSCze0CFHoADyNKQxjxmn7uucg6UAu5EA3xYQ4zA7UNLkRUvBR0AUoQU5iJac0QBeBBZMVpByp5S+j9rmyK26JDDgwgbF13SD8h6BbYxIYT5XVYPNwCx4X/AHS+PtX/sANTh3C0aj9fQ0aAiUmtYaRwJLbCrHsYrXYch3f88IXE/HTmXckiV7BsbOosyIql1vCbYhtgSQdeDpKoIXzqLREAAAAASUVORK5CYII=')
        no-repeat;
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
              img {
                width: 100%;
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
          position: relative;
          .file-log-content-item {
            width: 100%;
            .log-content-item-header {
              height: 26px;
              width: 100%;
              .title {
                font-size: 16px;
                color: #2c90f3;
                .svg_icon_time {
                  margin-left: 14px;
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
