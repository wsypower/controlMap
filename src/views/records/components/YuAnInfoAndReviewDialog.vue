<template>
    <a-modal title="预案详情" v-model="yuAnInfoDialogVisible" width="1080px" class="yuan-info-dialog">
        <div style="width:100%; height: 500px;position:relative;background-color: #eee;padding:10px;" class="yuan_dialog_body">
            <cg-container scroll>
                <div class="part base">
                    <h3>演唱会保障方案</h3>
                    <span class="status">待审核</span>
                    <div><span class="attr">创建人：</span><span class="content">田甜</span></div>
                    <div><span class="attr">保障区域：</span><span class="content">金华市体育中心</span></div>
                    <div><span class="attr">保障时间：</span><span class="content">2019.01.01~2019.02.02</span></div>
                    <div><span class="attr">预案描述：</span><span class="content">为切实做好6月9日张学友演唱会的保障工作，确保以一流的市容环境向观看演唱会的全国各地歌迷展示金华的整体形象，根据上级的工作部署，特制定如下保障方案。</span></div>
                    <div><span class="attr">工作目标：</span><span class="content">紧紧围绕建设“美丽金华”的总体目标，积极做好演唱会期间各项城市管理保障工作，确保整个城市容貌整洁、道路畅通、环境优美。</span></div>
                    <div><span class="attr">组织领导及任务分工：</span><span class="content">为加强演唱会期间保障工作的组织领导与协调，切实应对保障工作中所出现的各类问题，及时有效处置保障工作中出现的突发事件，决定成立保障工作领导小组，分局党委书记、局长陈威虎任总指挥，分局副局长余文斌任副总指挥，各中队长、科长为领导小组成员。领导小组下设专项工作组，由我分局165名人员组成，确保保障期间各项工作的顺利实施。
（一）蹲点、路段劝导组（130人）：采取“定人定岗定责”要求，负责做好海棠路、二环南路、金安公路等主要路段各路口、各路口之间路段及体育中心周边的管控工作，确保管理到位，按照分局统一部署完成各项临时保障任务。具体点位、路段、人员安排附后
（二）机动巡查组（33人）：负责体育中心外围道路、体育中心外场的巡查工作。通过机动巡查方式，做到问题第一时间发现，第一时间处理。具体区域、人员安排附后
（三）后勤保障组（2人）：负责做好保障期间相关后勤保障工作，具体由分局办公室负责（负责人：汤志刚629596）。</span></div>
                    <div><span class="attr">工作内容：</span><span class="content">落实蹲点劝导与机动巡查相结合的方式开展保障工作，重点做好占道经营、流动摊贩、人行道机动车与非机动车乱停放的管理，无流动无照经营、散发小广告、乱张贴等违法行为。同时配合相关部门维护现场秩序，确保人员财产安全。</span></div>
                    <div><span class="attr">工作要求：</span><span class="content">（一）统一思想、加强领导。此次保障工作时间紧，任务重，各单位要进一步提高认识，强化组织领导，认真做好前期组织动员工作，明确任务，落实责任，集中力量做好保障工作，确保保障工作不出现纰漏。
（二）密切配合，听从指挥。各单位保障期间要密切配合，听从指挥，严格执行领导小组下达的各项任务指令，确保保障工作落实到位。
（三）文明劝导，严格执法。要树立以人为本的理念，开展文明劝导，注意方式方法。对一些屡教不改的行为，要从严处罚,严肃处理。
（四）严格督查、责任追究。参加人员要统一着装（要求着短袖制服、作训帽、黑皮鞋），按时到岗，服从指挥，工作中要自觉维护队伍形象。政工科、业务督查科要加强对人员到岗、执勤工作和队容风纪等情况进行督查和通报。</span></div>
                </div>
                <div class="part ziyuan">
                    <h3>资源部署</h3>
                    <a-button type="primary" size="small" @click="">视图</a-button>
                    <a-table :columns="ziyuanColumns"
                             :rowKey="record => record.id"
                             :dataSource="ziYuanData"
                             :pagination="false">
                    </a-table>
                </div>
                <div class="part log">
                    <h3>操作日志</h3>
                    <a-table :columns="logColumns"
                             :rowKey="record => record.id"
                             :dataSource="logData"
                             :pagination="false">
                    </a-table>
                </div>
            </cg-container>
        </div>
        <template slot="footer">
            <a-button type="primary" @click="agree">同意</a-button>
            <a-button type="primary" @click="back">驳回</a-button>
        </template>
    </a-modal>
</template>
<script type="text/ecmascript-6">
    export default{
      name: 'yuAnInfoAndReviewDialog',
      props:{
        visible: {
          type: Boolean,
          default: false
        },
        yuAnId: {
          type: Object,
          default(){
            return {}
          }
        }
      },
      data(){
        return {
          yuAnInfoDialogVisible: false,
          ziyuanColumns:[{
            title: '保障点位',
            dataIndex: 'position',
            width: '20%',
          }, {
            title: '行动组名称',
            dataIndex: 'groupName',
            width: '20%',
          }, {
            title: '人数总计',
            dataIndex: 'totalNum',
            width: '20%',
          }, {
            title: '组成员',
            dataIndex: 'groupPeople'
          }],
          ziYuanData:[
            {'id':'azxs','groupName':'指挥室','totalNum':5,'position':'A','groupPeople':'田甜甜,张良亮,梁丽,王明明,柳知行','dept':'指挥中心'},
            {'id':'azwe','groupName':'A组','totalNum':8,'position':'B','groupPeople':'田甜甜,张良亮,梁丽,王明明,柳知行,程序猿，码农','dept':'XX大队'},
            {'id':'ahxs','groupName':'B组','totalNum':8,'position':'C','groupPeople':'田甜甜,张良亮,梁丽,王明明,柳知行,美国队长，钢铁侠','dept':'XX大队'},
            {'id':'azlk','groupName':'C组','totalNum':6,'position':'D','groupPeople':'梁丽,王明明,柳知行,凉宫，阿虚，亮','dept':'XX大队'}
          ],
          logColumns:[{
            title: '时间',
            dataIndex: 'time',
            width: '20%',
          }, {
            title: '操作内容',
            dataIndex: 'content',
            width: '40%',
          }, {
            title: '用户姓名',
            dataIndex: 'user',
            width: '20%',
          }, {
            title: '归属部门',
            dataIndex: 'dept',
          }],
          logData:[
            {'id':'azxs','time':'2018.12.15 18:00','content':'方案发布','user':'柳知行','dept':'指挥中心'},
            {'id':'azwe','time':'2018.12.15 17:00','content':'审核','user':'码农','dept':'XX大队'},
            {'id':'ahxs','time':'2018.12.15 14:00','content':'添加xx大队xx','user':'钢铁侠','dept':'XX大队'},
            {'id':'azlk','time':'2018.12.15 13:00','content':'编辑方案','user':'梁丽','dept':'XX大队'}
          ]
        }
      },
      watch:{
        yuAnInfoDialogVisible:function(val){
          if(val){
            this.init();
          }
          else{
            this.$emit('update:visible', false);
          }
        },
        visible:function(val){
          if(val){
            this.yuAnInfoDialogVisible = true;
          }
        }
      },
      methods:{
        init(){

        },
        agree(){
          //调取接口修改状态（待审核->已同意）
          this.yuAnInfoDialogVisible = false;
        },
        back(){
          //调取接口修改状态（待审核->已驳回）
          this.yuAnInfoDialogVisible = false;
        },
      }
    }
</script>
<style lang="scss" scoped>
    .yuan-info-dialog{
        .yuan_dialog_body {
            .part {
                margin-bottom: 10px;
                background-color: #ffffff;
                width: 100%;
                border-radius: 6px;
                h3 {
                    height: 30px;
                    line-height: 30px;
                }
                &.base {
                    position: relative;
                    .status {
                        position: absolute;
                        top: 10px;
                        right: 10px;
                        display: inline-block;
                        padding: 0px 8px;
                        background-color: #ffd43b;
                        color: #ffffff;
                        text-align: center;
                        border-radius: 10px;
                        font-size: 14px;
                        line-height: 20px;
                    }
                    > div {
                        border-bottom: 1px solid #eeeeee;
                        padding: 5px 0px;
                        .attr {
                            display: inline-block;
                            width: 140px;
                            color: #888888;
                            text-align: left;
                            vertical-align: top;
                        }
                        .content {
                            display: inline-block;
                            width: calc(100% - 140px);
                        }
                    }
                }
                &.ziyuan {
                    position: relative;
                    button {
                        position: absolute;
                        top: 5px;
                        right: 10px;
                    }
                }
            }
        }
    }
</style>
