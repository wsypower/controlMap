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
                              @dropdownVisibleChange="()=>{getSelectOptions('leaderOne')}"
                              :disabled="operateType==='look'">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="item.id" :value="item.name+'_'+item.id">{{item.name}} {{item.tel}}</a-select-option>
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
                              @dropdownVisibleChange="()=>{getSelectOptions('leaderTwo')}"
                              :disabled="operateType==='look'">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="item.id" :value="item.name+'_'+item.id">{{item.name}} {{item.tel}}</a-select-option>
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
                                  @dropdownVisibleChange="()=>{getSelectOptions('leaderThree')}"
                                  :disabled="operateType==='look'">
                            <a-select-option v-for="(item,index) in canSelectPeople" :key="item.id" :value="item.name+'_'+item.id">{{item.name}} {{item.tel}}</a-select-option>
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
                              @dropdownVisibleChange="()=>{getSelectOptions('leaderFour')}"
                              :disabled="operateType==='look'">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="item.id" :value="item.name+'_'+item.id">{{item.name}} {{item.tel}}</a-select-option>
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
                              @dropdownVisibleChange="()=>{getSelectOptions('leaderFive')}"
                              :disabled="operateType==='look'">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="item.id" :value="item.name+'_'+item.id">{{item.name}} {{item.tel}}</a-select-option>
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
                              @dropdownVisibleChange="()=>{getSelectOptions('memberOne')}"
                              :disabled="operateType==='look'">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="item.id" :value="item.name+'_'+item.id">{{item.name}} {{item.tel}}</a-select-option>
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
                              @dropdownVisibleChange="()=>{getSelectOptions('memberTwo')}"
                              :disabled="operateType==='look'">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="item.id" :value="item.name+'_'+item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
            <div class="member-top">
                <span class="member-top-group">第一组</span>
            </div>
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">组长：</label>
                    <a-select mode="multiple"
                              v-model="peopleDisplayData.groupOneForOne"
                              style="width: 100%"
                              @change="(val)=>{changeSelect(val,'groupOneForOne')}"
                              placeholder="请选择"
                              @dropdownVisibleChange="()=>{getSelectOptions('groupOneForOne')}"
                              :disabled="operateType==='look'">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="item.id" :value="item.name+'_'+item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">副组长：</label>
                    <a-select mode="multiple"
                              v-model="peopleDisplayData.groupOneForTwo"
                              style="width: 100%"
                              @change="(val)=>{changeSelect(val,'groupOneForTwo')}"
                              placeholder="请选择"
                              @dropdownVisibleChange="()=>{getSelectOptions('groupOneForTwo')}"
                              :disabled="operateType==='look'">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="item.id" :value="item.name+'_'+item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">队员：</label>
                    <a-select mode="multiple"
                              v-model="peopleDisplayData.groupOneForThree"
                              style="width: 100%"
                              @change="(val)=>{changeSelect(val,'groupOneForThree')}"
                              placeholder="请选择"
                              @dropdownVisibleChange="()=>{getSelectOptions('groupOneForThree')}"
                              :disabled="operateType==='look'">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="item.id" :value="item.name+'_'+item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
            <div class="member-top">
                <span class="member-top-group">第二组</span>
            </div>
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">组长：</label>
                    <a-select mode="multiple"
                              v-model="peopleDisplayData.groupTwoForOne"
                              style="width: 100%"
                              @change="(val)=>{changeSelect(val,'groupTwoForOne')}"
                              placeholder="请选择"
                              @dropdownVisibleChange="()=>{getSelectOptions('groupTwoForOne')}"
                              :disabled="operateType==='look'">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="item.id" :value="item.name+'_'+item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">副组长：</label>
                    <a-select mode="multiple"
                              v-model="peopleDisplayData.groupTwoForTwo"
                              style="width: 100%"
                              @change="(val)=>{changeSelect(val,'groupTwoForTwo')}"
                              placeholder="请选择"
                              @dropdownVisibleChange="()=>{getSelectOptions('groupTwoForTwo')}"
                              :disabled="operateType==='look'">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="item.id" :value="item.name+'_'+item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">队员：</label>
                    <a-select mode="multiple"
                              v-model="peopleDisplayData.groupTwoForThree"
                              style="width: 100%"
                              @change="(val)=>{changeSelect(val,'groupTwoForThree')}"
                              placeholder="请选择"
                              @dropdownVisibleChange="()=>{getSelectOptions('groupTwoForThree')}"
                              :disabled="operateType==='look'">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="item.id" :value="item.name+'_'+item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
            <div class="member-top">
                <span class="member-top-group">第三组</span>
            </div>
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">组长：</label>
                    <a-select mode="multiple"
                              v-model="peopleDisplayData.groupThreeForOne"
                              style="width: 100%"
                              @change="(val)=>{changeSelect(val,'groupThreeForOne')}"
                              placeholder="请选择"
                              @dropdownVisibleChange="()=>{getSelectOptions('groupThreeForOne')}"
                              :disabled="operateType==='look'">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="item.id" :value="item.name+'_'+item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">副组长：</label>
                    <a-select mode="multiple"
                              v-model="peopleDisplayData.groupThreeForTwo"
                              style="width: 100%"
                              @change="(val)=>{changeSelect(val,'groupThreeForTwo')}"
                              placeholder="请选择"
                              @dropdownVisibleChange="()=>{getSelectOptions('groupThreeForTwo')}"
                              :disabled="operateType==='look'">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="item.id" :value="item.name+'_'+item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">队员：</label>
                    <a-select mode="multiple"
                              v-model="peopleDisplayData.groupThreeForThree"
                              style="width: 100%"
                              @change="(val)=>{changeSelect(val,'groupThreeForThree')}"
                              placeholder="请选择"
                              @dropdownVisibleChange="()=>{getSelectOptions('groupThreeForThree')}"
                              :disabled="operateType==='look'">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="item.id" :value="item.name+'_'+item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { mapActions } from 'vuex'
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
                        groupOneForOne: [],
                        groupOneForTwo: [],
                        groupOneForThree: [],
                        groupTwoForOne: [],
                        groupTwoForTwo: [],
                        groupTwoForThree: [],
                        groupThreeForOne: [],
                        groupThreeForTwo: [],
                        groupThreeForThree: []
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
                //为了能够模糊搜索而使用的数据
                peopleDisplayData:{
                    leaderOne: [],
                    leaderTwo: [],
                    leaderThree: [],
                    leaderFour: [],
                    leaderFive: [],
                    memberOne: [],
                    memberTwo: [],
                    groupOneForOne: [],
                    groupOneForTwo: [],
                    groupOneForThree: [],
                    groupTwoForOne: [],
                    groupTwoForTwo: [],
                    groupTwoForThree: [],
                    groupThreeForOne: [],
                    groupThreeForTwo: [],
                    groupThreeForThree: []
                },
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
                    Object.keys(newValue).forEach(key=>{
                        newValue[key].forEach(id=>{
                            let data = this.totalPeople.filter(item => item.id===id)
                            console.log('data',data);
                            this.peopleDisplayData[key].push(data[0].name + '_' + data[0].id);
                        })
                    });
                },
                deep: true
            },
            peopleDisplayData:{
                handler(newValue,oldValue){
                    // console.log('watch peopleDisplayData',newValue);
                    let resultData = {
                        leaderOne: [],
                        leaderTwo: [],
                        leaderThree: [],
                        leaderFour: [],
                        leaderFive: [],
                        memberOne: [],
                        memberTwo: [],
                        groupOneForOne: [],
                        groupOneForTwo: [],
                        groupOneForThree: [],
                        groupTwoForOne: [],
                        groupTwoForTwo: [],
                        groupTwoForThree: [],
                        groupThreeForOne: [],
                        groupThreeForTwo: [],
                        groupThreeForThree: []
                    };
                    Object.keys(newValue).forEach(key=>{
                        newValue[key].forEach(nameId=>{
                            resultData[key].push(nameId.split('_')[1]);
                        })

                    });
                    this.$emit('getResult', resultData);
                },
                deep: true
            }
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
                this.peopleDisplayData[type] = val;
                // console.log('allCheckedPeopleIdList',this.allCheckedPeopleIdList);
            },
            //出现下拉区域前触发，获取可以选择的人员名单，达到不可重复的目的
            getSelectOptions(type){
                // console.log(type);
                this.canSelectPeople = [];
                let arr = [];
                this.allCheckedPeopleIdList.forEach(nameId=>{
                    if(!this.peopleDisplayData[type].includes(nameId)){
                        arr.push(nameId);
                    }
                });
                // console.log('arr',arr);
                this.totalPeople.forEach(item=>{
                    if(!arr.includes(item.name + '_' + item.id)){
                        this.canSelectPeople.push(item);
                    }
                });
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
            padding-left: 10px;
            margin: 10px 0px;
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
