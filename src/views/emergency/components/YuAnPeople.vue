<template>
    <div class="part people">
        <div class="title">应急人员</div>
        <div class="content leader">
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">组长：</label>
                    <a-select mode="multiple"
                              v-model="peopleDisplayData.leaderOne"
                              style="width: 100%"
                              @change="(val)=>{changeSelect(val,'leaderOne')}"
                              placeholder="请选择"
                              :disabled="operateType==='look'">
                        <a-select-option v-for="(item,index) in totalPeople" :key="item.id" :value="item.name+'_'+item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">副组长：</label>
                    <a-select mode="multiple"
                              v-model="peopleDisplayData.leaderTwo"
                              style="width: 100%"
                              @change="(val)=>{changeSelect(val,'leaderTwo')}"
                              placeholder="请选择"
                              :disabled="operateType==='look'">
                        <a-select-option v-for="(item,index) in totalPeople" :key="item.id" :value="item.name+'_'+item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">组员：</label>
                        <a-select mode="multiple"
                                  v-model="peopleDisplayData.leaderThree"
                                  style="width: 100%"
                                  @change="(val)=>{changeSelect(val,'leaderThree')}"
                                  placeholder="请选择"
                                  :disabled="operateType==='look'">
                            <a-select-option v-for="(item,index) in totalPeople" :key="item.id" :value="item.name+'_'+item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">主任：</label>
                    <a-select mode="multiple"
                              v-model="peopleDisplayData.leaderFour"
                              style="width: 100%"
                              @change="(val)=>{changeSelect(val,'leaderFour')}"
                              placeholder="请选择"
                              :disabled="operateType==='look'">
                        <a-select-option v-for="(item,index) in totalPeople" :key="item.id" :value="item.name+'_'+item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">副主任：</label>
                    <a-select mode="multiple"
                              v-model="peopleDisplayData.leaderFive"
                              style="width: 100%"
                              @change="(val)=>{changeSelect(val,'leaderFive')}"
                              placeholder="请选择"
                              :disabled="operateType==='look'">
                        <a-select-option v-for="(item,index) in totalPeople" :key="item.id" :value="item.name+'_'+item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
        </div>
        <div class="content member">
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">队长：</label>
                    <a-select mode="multiple"
                              v-model="peopleDisplayData.memberOne"
                              style="width: 100%"
                              @change="(val)=>{changeSelect(val,'memberOne')}"
                              placeholder="请选择"
                              :disabled="operateType==='look'">
                        <a-select-option v-for="(item,index) in totalPeople" :key="item.id" :value="item.name+'_'+item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">副队长：</label>
                    <a-select mode="multiple"
                              v-model="peopleDisplayData.memberTwo"
                              style="width: 100%"
                              @change="(val)=>{changeSelect(val,'memberTwo')}"
                              placeholder="请选择"
                              :disabled="operateType==='look'">
                        <a-select-option v-for="(item,index) in totalPeople" :key="item.id" :value="item.name+'_'+item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
            <div class="group-member-panel" v-for="(groupItem,index) in groupMember" :key="index">
                <div class="member-top" flex="dir:left cross:center main:justify">
                    <span class="member-top-group">第{{numArr[index]}}组</span>
                    <div>
                        <a-icon v-if="index===groupMember.length-1" type="plus-circle" style="margin-right: 10px;" @click="addGroupItem"/>
                        <a-popconfirm
                                title="确定删除这个组吗？"
                                @confirm="() => deleteGroupItem(index)"
                        >
                            <a-icon type="minus-circle" class="del_btn"/>
                        </a-popconfirm>
                    </div>
                </div>
                <a-row>
                    <div class="col-panel" flex="dir:left">
                        <label class="subtitle">组长：</label>
                        <a-select mode="multiple"
                                  v-model="groupItem.groupForOne"
                                  style="width: 100%"
                                  @change="(val)=>{changeSelect(val,index + '_groupForOne')}"
                                  placeholder="请选择"
                                  :disabled="operateType==='look'">
                            <a-select-option v-for="(item,index) in totalPeople" :key="item.id" :value="item.name+'_'+item.id">{{item.name}} {{item.tel}}</a-select-option>
                        </a-select>
                    </div>
                </a-row>
                <a-row>
                    <div class="col-panel" flex="dir:left">
                        <label class="subtitle">副组长：</label>
                        <a-select mode="multiple"
                                  v-model="groupItem.groupForTwo"
                                  style="width: 100%"
                                  @change="(val)=>{changeSelect(val,index + '_groupForTwo')}"
                                  placeholder="请选择"
                                  :disabled="operateType==='look'">
                            <a-select-option v-for="(item,index) in totalPeople" :key="item.id" :value="item.name+'_'+item.id">{{item.name}} {{item.tel}}</a-select-option>
                        </a-select>
                    </div>
                </a-row>
                <a-row>
                    <div class="col-panel" flex="dir:left">
                        <label class="subtitle">队员：</label>
                        <a-select mode="multiple"
                                  v-model="groupItem.groupForThree"
                                  style="width: 100%"
                                  @change="(val)=>{changeSelect(val,index + '_groupForThree')}"
                                  placeholder="请选择"
                                  :disabled="operateType==='look'">
                            <a-select-option v-for="(item,index) in totalPeople" :key="item.id" :value="item.name+'_'+item.id">{{item.name}} {{item.tel}}</a-select-option>
                        </a-select>
                    </div>
                </a-row>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { mapActions } from 'vuex'
    const _ = require('lodash')
    const numArr= ['一','二','三','四','五','六','七','八','九','十',
      '十一','十二','十三','十四','十五','十六','十七','十八','十九','二十'];
    export default {
        name: 'yuAnPeople',
        props:{
            peopleData:{
                type: Object,
                default(){
                    return {
                        leaderOne: [],
                        leaderTwo: [],
                        leaderThree: [],
                        leaderFour: [],
                        leaderFive: [],
                        memberOne: [],
                        memberTwo: [],
                        groupMember: []
                    }
                }
            },
          //是否可编辑，look表示不可编辑
          operateType:{
            type: String,
            default: 'set'
          }
        },
        data(){
            return {
                numArr: numArr,
                //为了能够模糊搜索而使用的数据
                peopleDisplayData:{
                    leaderOne: [],
                    leaderTwo: [],
                    leaderThree: [],
                    leaderFour: [],
                    leaderFive: [],
                    memberOne: [],
                    memberTwo: [],
                    groupMember: []
                },
                //组员信息
                groupMember:[
                  {
                    groupForOne: [],
                    groupForTwo: [],
                    groupForThree: []
                  }
                ],
                //所有人员
                totalPeople: [],
                //可被选择的人员
                canSelectPeople: []
            }
        },
        computed:{
            //已选的人员
           allCheckedPeopleIdList:function(){
               // console.log('allCheckedPeopleIdList change');
               let _this = this, arr = [];
               Object.keys(_this.peopleDisplayData).forEach(function(key){
                    _this.peopleDisplayData[key].reduce((res,nameId)=>{
                        res.push(nameId);
                        return res
                    },arr);
               })
               return arr
           }
        },
        watch:{
            peopleData:{
                handler(newValue){
                  console.log('peopleData newValue', newValue);
                    Object.keys(newValue).forEach(key=>{
                      if(key!=='groupMember'){
                        newValue[key].forEach(id=>{
                          let data = this.totalPeople.filter(item => item.id===id)
                          console.log('data',data);
                          this.peopleDisplayData[key].push(data[0].name + '_' + data[0].id);
                        })
                      }
                      else{

                        if(newValue[key]&&newValue[key].length>0){
                          this.groupMember = [];
                          newValue[key].forEach(item=>{
                            let temp = {
                              groupForOne: [],
                              groupForTwo: [],
                              groupForThree: []
                            }
                            item.groupForOne.map(id=>{
                              let data = this.totalPeople.filter(item => item.id===id)
                              temp.groupForOne.push(data[0].name + '_' + data[0].id);
                            })
                            item.groupForTwo.map(id=>{
                              let data = this.totalPeople.filter(item => item.id===id)
                              temp.groupForTwo.push(data[0].name + '_' + data[0].id);
                            })
                            item.groupForThree.map(id=>{
                              let data = this.totalPeople.filter(item => item.id===id)
                              temp.groupForThree.push(data[0].name + '_' + data[0].id);
                            })
                            this.groupMember.push(temp);
                          })
                        }
                      }
                    });
                },
                deep: true
            },
          groupMember:{
            handler(newValue){
              this.peopleDisplayData.groupMember = _.cloneDeep(newValue);//JSON.parse(JSON.stringify(newValue));
            },
            deep: true
          },
            peopleDisplayData:{
                handler(newValue,oldValue){
                    console.log('watch peopleDisplayData',newValue);
                    let resultData = {
                        leaderOne: [],
                        leaderTwo: [],
                        leaderThree: [],
                        leaderFour: [],
                        leaderFive: [],
                        memberOne: [],
                        memberTwo: [],
                        groupMember: []
                    };
                    Object.keys(newValue).forEach(key=>{
                      if(key=='groupMember'){
                        newValue[key].forEach(item => {
                          let temp = {
                            groupForOne: [],
                            groupForTwo: [],
                            groupForThree: []
                          }
                          Object.keys(item).forEach(k=>{
                            item[k].forEach(nameId=>{
                              temp[k].push(nameId.split('_')[1]);
                            })
                          });
                          resultData.groupMember.push(temp);
                        })
                      }
                      else{
                        newValue[key].forEach(nameId=>{
                          resultData[key].push(nameId.split('_')[1]);
                        })
                      }
                    });
                    this.$emit('getResult', resultData);
                },
                deep: true
            },
        },
        created(){
            this.getAllPeopleDataList().then((res)=>{
                this.totalPeople = res;
                this.canSelectPeople = this.totalPeople;
            });
        },
        mounted(){

        },
        methods:{
            ...mapActions('emergency/common', ['getAllPeopleDataList']),
            //下拉选择后触发
            changeSelect(val,type){
              if(type.split('_').length>1){
                let index = type.split('_')[0];
                let typeTemp = type.split('_')[1];
                this.groupMember[index][typeTemp] = val;
              }
              else{
                this.peopleDisplayData[type] = val;
              }

                // console.log('allCheckedPeopleIdList',this.allCheckedPeopleIdList);
            },

          addGroupItem(){
              let temp = {
                groupForOne: [],
                groupForTwo: [],
                groupForThree: []
              }
              this.groupMember.push(temp);
          },
          deleteGroupItem(index){
            this.groupMember.splice(index,1);
          }
        }
    }
</script>
<style scoped lang="scss">
    .part {
        margin-bottom: 10px;
        .title {
            font-family: PingFang-SC-Bold;
            font-size: 14px;
            line-height: 30px;
            color: #2b8ff3;
        }
        .content {
            background-color: #f5f7f8;
            padding: 5px;
            .col-panel {
                padding: 0px 10px 0px 0px;
                .subtitle {
                    text-align: right;
                    width: 100px;
                }
            }
            .ant-row{
                margin-bottom: 5px;
                &:last-child{
                    margin-bottom: 0px;
                }
            }
        }
    }
    .leader,.member{
        .subtitle{
            width: 70px !important;
        }
    }
    .leader{
        border-left: 2px solid #f8b551;
        margin-bottom: 10px;
    }
    .member{
        border-left: 2px solid #89e10c;
        .member-top{
            border-top: solid 1px #dddddd;
            padding: 0px 10px;
            margin: 10px 0px;
            i{
                color: #2b8ff3;
                cursor: pointer;
            }
            .member-top-group{
                display:inline-block;
                width: 60px;
                height: 26px;
                background-color: #2b8ff3;
                line-height: 26px;
                text-align: center;
                border-bottom-left-radius: 6px;
                border-bottom-right-radius: 6px;
                font-family: PingFang-SC-Medium;
                font-size: 13px;
                color: #ffffff;
            }
        }
    }
</style>
