<template>
    <a-form :form="form" layout="horizontal" class="base-info-panel">
        <a-row>
            <a-form-item label="事件名称：" :label-col="{ span: 4 }" :wrapper-col="{ span: 10 }">
                <a-input v-if="optType!='look'"
                        v-decorator="['name', { rules: [{ required: true, message: '请输入事件名!' }] }]"
                        placeholder="请输入事件名称"
                />
                <span v-else>{{submitForm.name}}</span>
            </a-form-item>
        </a-row>
        <a-row>
            <a-form-item label="事件类型：" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
                <a-select v-if="optType!='look'"
                        v-decorator="['typeId', { rules: [{ required: true, message: '请选择事件类型！' }] }]"
                        placeholder="请选择事件类型"
                        style="width: 200px;"
                >
                    <a-select-option v-for="(item, index) in eventTypeList" :value="item.id" :key="index">{{
                        item.name
                        }}</a-select-option>
                </a-select>
                <span v-else>{{submitForm.typeName}}</span>
            </a-form-item>
        </a-row>
        <a-row>
            <a-form-item label="保障时间：" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
                <a-range-picker v-if="optType!='look'"
                        show-time
                        v-decorator="[
                            'dayRange',
                            { rules: [{ type: 'array', required: true, message: '请选择保障时间！' }] }
                          ]"
                        format="YYYY-MM-DD HH:mm:ss"
                />
                <span v-else>{{new Date(submitForm.startDayTime)|date_format('YYYY-MM-DD HH:mm:ss')}}
                              ~
                              {{new Date(submitForm.endDayTime)|date_format('YYYY-MM-DD HH:mm:ss')}}</span>
            </a-form-item>
        </a-row>
        <a-row>
            <a-form-item label="事件描述：" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
                <a-textarea v-if="optType!='look'"
                        v-model="submitForm.description"
                        v-decorator="['description', { rules: [{ required: true, message: '请输入事件描述!' }] }]"
                        placeholder="示例：为切实做好6月9日张学友演唱会的保障工作，确保以一流的市容环境向观看演唱会的全国各地歌迷展示金华的整体形象，根据上级的工作部署，特制定如下保障方案。"
                        :autosize="{ minRows: 2, maxRows: 2 }"
                />
                <span v-else>{{submitForm.description}}</span>
            </a-form-item>
        </a-row>
        <a-row>
            <a-form-item label="工作目标：" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
                <a-textarea v-if="optType!='look'"
                        v-model="submitForm.jobGoal"
                        v-decorator="['jobGoal', { rules: [{ required: true, message: '请输入工作目标!' }] }]"
                        placeholder="示例：紧紧围绕建设“美丽金华”的总体目标，积极做好演唱会期间各项城市管理保障工作，确保整个城市容貌整洁、道路畅通、环境优美。"
                        :autosize="{ minRows: 2, maxRows: 2 }"
                />
                <span v-else>{{submitForm.jobGoal}}</span>
            </a-form-item>
        </a-row>
        <a-row>
            <a-form-item label="组织领导及任务分工：" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
                <a-textarea v-if="optType!='look'"
                        v-model="submitForm.jobAssignment"
                        v-decorator="['jobAssignment', { rules: [{ required: true, message: '请输入组织领导及任务分工!' }] }]"
                        placeholder="示例：为加强演唱会期间保障工作的组织领导与协调，切实应对保障工作中所出现的各类问题，及时有效处置保障工作中出现的突发事件，决定成立保障工作领导小组，分局党委书记、局长陈威虎任总指挥，分局副局长余文斌任副总指挥，各中队长、科长为领导小组成员。领导小组下设专项工作组，由我分局165名人员组成，确保保障期间各项工作的顺利实施。"
                        :autosize="{ minRows: 2, maxRows: 2 }"
                />
                <span v-else>{{submitForm.jobAssignment}}</span>
            </a-form-item>
        </a-row>
        <a-row>
            <a-form-item label="工作内容：" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
                <a-textarea v-if="optType!='look'"
                        v-model="submitForm.jobContent"
                        v-decorator="['jobContent', { rules: [{ required: true, message: '请输入工作内容!' }] }]"
                        placeholder="示例：落实蹲点劝导与机动巡查相结合的方式开展保障工作，重点做好占道经营、流动摊贩、人行道机动车与非机动车乱停放的管理，无流动无照经营、散发小广告、乱张贴等违法行为。同时配合相关部门维护现场秩序，确保人员财产安全。"
                        :autosize="{ minRows: 2, maxRows: 2 }"
                />
                <span v-else>{{submitForm.jobContent}}</span>
            </a-form-item>
        </a-row>
        <a-row>
            <a-form-item label="工作要求：" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
                <a-textarea v-if="optType!='look'"
                        v-model="submitForm.jobRequirements"
                        v-decorator="['jobRequirements', { rules: [{ required: true, message: '请输入工作要求!' }] }]"
                        placeholder="示例：（一）统一思想、加强领导。此次保障工作时间紧，任务重，各单位要进一步提高认识，强化组织领导，认真做好前期组织动员工作，明确任务，落实责任，集中力量做好保障工作，确保保障工作不出现纰漏。
      （二）密切配合，听从指挥。各单位保障期间要密切配合，听从指挥，严格执行领导小组下达的各项任务指令，确保保障工作落实到位。
      （三）文明劝导，严格执法。要树立以人为本的理念，开展文明劝导，注意方式方法。对一些屡教不改的行为，要从严处罚,严肃处理。
      （四）严格督查、责任追究。参加人员要统一着装（要求着短袖制服、作训帽、黑皮鞋），按时到岗，服从指挥，工作中要自觉维护队伍形象。政工科、业务督查科要加强对人员到岗、执勤工作和队容风纪等情况进行督查和通报。"
                        :autosize="{ minRows: 2, maxRows: 2 }"
                />
                <span v-else>{{submitForm.jobRequirements}}</span>
            </a-form-item>
        </a-row>
    </a-form>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
import moment from 'moment'

export default {
  name: 'baseInfo',
  props:{
    optType:{
      type: String,
      default: 'add' //add\edit\look
    },
    baseData:{
      type: Object,
      default(){
        return {
          name: '',
          typeId: '',
          startDayTime: '',
          endDayTime: '',
          description: '',
          jobGoal: '',
          jobAssignment: '',
          jobContent: '',
          jobRequirements: '',
        }
      }
    }
  },
  data(){
    return {
      form: null,
      eventTypeList: [],
      submitForm: {}
    }
  },
  created() {
    this.form = this.$form.createForm(this);
  },
  mounted() {
    this.init();
  },
  methods:{
    ...mapActions('event/common', ['getEventTypeDataList']),
    init(){
      this.getEventTypeDataList().then((r)=>{
        this.eventTypeList = r.data;
      });
      console.log('11111111111');
      this.submitForm = JSON.parse(JSON.stringify(this.baseData))
      let startTime  = moment(this.submitForm.startDayTime).format('YYYY-MM-DD HH:mm:ss');
      let endTime  = moment(this.submitForm.endDayTime).format('YYYY-MM-DD HH:mm:ss');
      this.form.setFieldsValue({
        typeId: this.submitForm.typeId,
        name: this.submitForm.name,
        dayRange: [moment(startTime,'YYYY-MM-DD HH:mm:ss'),moment(endTime,'YYYY-MM-DD HH:mm:ss')]
      });
    },
    getResultData(){
      return this.submitForm
    }
  }
}
</script>
<style lang="scss" scoped>
.base-info-panel{
    width: 100%;
    /deep/.ant-form-item{
        margin-bottom: 10px;
    }
}
</style>