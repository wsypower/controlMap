<template>
    <div class="log-panel">
        <div class="log-panel_header" flex="cross:center">审核日志</div>
        <div class="log-panel_body" v-show="dataLoading">
            <div class="loading" flex="main:center cross:center">
                <a-spin tip="数据加载中..."></a-spin>
            </div>
        </div>
        <div class="log-panel_body">
            <my-scroll>
                <div class="log-panel_body-item" flex="dir:left" v-for="log in logData">
                    <div class="log-item_left">{{new Date(log.createtime)|date_format('YYYY-MM-DD HH:mm:ss')}}</div>
                    <div class="log-item_right">
                        <div class="dot"></div>
                        <div class="log-item_right-dept">{{log.dept}} {{log.user}}</div>
                        <div class="log-item_right-content">
                            <div><span>【操作步骤】</span><span class="blue" :class="{red:log.step.indexOf('驳回')>=0,yellow:log.step.indexOf('提交')>=0,green:log.step.indexOf('确认')>=0}">{{log.step}}</span></div>
                            <div><span>【操作内容】</span><span>{{log.content}}</span></div>
                        </div>
                    </div>
                </div>
            </my-scroll>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { mapActions } from 'vuex'

    export default {
      name:'log',
      props:{
        eventId:{
          type: String,
          default: ''
        }
      },
      data(){
        return {
          dataLoading: false,
          logData:[]
        }
      },
      mounted() {
        this.getLogData();
      },
      methods:{
        ...mapActions('event/event', ['getLogDataByEventId']),
        getLogData(){
          this.dataLoading = true;
          this.getLogDataByEventId({eventId:this.eventId}).then(res => {
            this.dataLoading = false;
            this.logData = res;
          })
        }
      }
    }
</script>
<style lang="scss" scoped>
.log-panel{
    width: 100%;
    padding: 0px 16px;
    border-bottom: solid 10px #eeeeee;
    .log-panel_header{
        width: 100%;
        height: 40px;
        font-family: PingFang-SC-Bold;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 40px;
        letter-spacing: 0px;
        color: #00a4fe;
        font-weight: 600;
        border-bottom: solid 1px #e5e5e5;
    }
    .log-panel_body{
        padding: 10px;
        height: 200px;
        .log-panel_body-item{
            .log-item_left{
                width: 110px;
                text-align: right;
                padding-right: 20px;
            }
            .log-item_right{
                position: relative;
                border-left: 1px solid #299dfd;
                padding-left: 20px;
                padding-bottom: 30px;
                .dot{
                    position: absolute;
                    left:-8px;
                    top: 0px;
                    width: 16px;
                    height: 16px;
                    background: #ffffff url('~@img/radio.png');
                    background-size: 100% 100%;
                }
                .log-item_right-dept{
                    font-family: PingFang-SC-Medium;
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 22px;
                    letter-spacing: 0px;
                    color: #299dfd;
                    margin-bottom: 10px;
                }
                .log-item_right-content{
                    width: 1074px;
                    background-color: #fafafa;
                    border-radius: 4px;
                    border: solid 1px #e5e5e5;
                    padding: 8px 0px;
                    >div{
                        span.blue {
                            color: #00a4fe;
                        }
                        span {
                            &.red{
                                color: #d30616;
                            }
                            &.yellow{
                                color: #eda50a;
                            }
                            &.green{
                                color: #22ac38;
                            }
                        }
                    }
                }
            }
            &:last-child{
                .log-item_right{
                    border-width: 0px;
                    padding-bottom: 10px;
                }
            }
        }
    }
}
</style>