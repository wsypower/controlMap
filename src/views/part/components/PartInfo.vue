<template>
  <div class="map-file-model">
    <div class="map-file-model-header" flex="cross:center main:justify">
      <div class="info-body-left" flex="cross:center">
        <cg-icon-svg name="bujian" class="svg_icon_records"></cg-icon-svg>
        <span>{{ partData.OBJNAME }}</span>
      </div>
      <div class="close" @click="closeDialog"></div>
    </div>
    <div class="map-file-model-body">
      <div class="map-file-model-body-content">
        <div class="file-model-body-content active">
          <div class="file-message-item">
            <div class="file-message-item-list" flex>
              <div class="one-line">
                标&ensp;识&ensp;码：
                <span>{{ partData.OBJCODE }}</span>
              </div>
            </div>
            <div class="file-message-item-list" flex>
              <div class="one-line">
                主管部门：
                <span :title="partData.CDEPNAME">{{ partData.CDEPNAME }}</span>
              </div>
            </div>
            <div class="file-message-item-list" flex>
              <div class="one-line">
                权属单位：
                <span :title="partData.OWNDEPNAME">{{ partData.OWNDEPNAME }}</span>
              </div>
            </div>
            <div class="file-message-item-list" flex>
              <div class="one-line">
                养护单位：
                <span :title="partData.MATDEPNAME">{{ partData.MATDEPNAME }}</span>
              </div>
            </div>
            <div class="file-message-item-list" flex>
              <div class="one-line">
                材&emsp;&emsp;质：
                <span>{{ partData.MATERIAL }}</span>
              </div>
            </div>
            <div class="file-message-item-list" flex>
              <div class="one-line">
                状&emsp;&emsp;态：
                <span>{{ partData.OBJSTATE }}</span>
              </div>
            </div>
            <div class="file-message-item-list" flex>
              <div class="one-line">
                数据来源：
                <span>{{ partData.DATASOURCE }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tooltip__arrow"></div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'partInfo',
  props: {
    partData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {}
  },
  mounted() {},
  watch: {
    partData: function(val) {}
  },
  methods: {
    closeDialog() {
      this.$emit('closeTip');
    }
  }
}
</script>
<style lang="scss" scoped>
.map-file-model {
  width: 220px;
  height: 250px;
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
    width: 220px;
    height: 210px;
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
                width: 95%;
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