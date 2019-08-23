<template>
    <div class="part people">
        <div class="title">应急人员</div>
        <div class="content leader">
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">组长：</label>
                    <a-select mode="multiple"
                              v-model="peopleData.leaderOne"
                              style="width: 100%"
                              @change="(val)=>{changeSelect(val,'leaderOne')}"
                              placeholder="请选择"
                              @dropdownVisibleChange="()=>{getSelectOptions('leaderOne')}">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="index" :value="item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">副组长：</label>
                    <a-select mode="multiple"
                              v-model="peopleData.leaderTwo"
                              style="width: 100%"
                              @change="(val)=>{changeSelect(val,'leaderTwo')}"
                              placeholder="请选择"
                              @dropdownVisibleChange="()=>{getSelectOptions('leaderTwo')}">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="index" :value="item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">组员：</label>
                        <a-select mode="multiple"
                                  v-model="peopleData.leaderThree"
                                  style="width: 100%"
                                  @change="(val)=>{changeSelect(val,'leaderThree')}"
                                  placeholder="请选择"
                                  @dropdownVisibleChange="()=>{getSelectOptions('leaderThree')}">
                            <a-select-option v-for="(item,index) in canSelectPeople" :key="index" :value="item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">主任：</label>
                    <a-select mode="multiple"
                              v-model="peopleData.leaderFour"
                              style="width: 100%"
                              @change="(val)=>{changeSelect(val,'leaderFour')}"
                              placeholder="请选择"
                              @dropdownVisibleChange="()=>{getSelectOptions('leaderFour')}">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="index" :value="item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">副主任：</label>
                    <a-select mode="multiple"
                              v-model="peopleData.leaderFive"
                              style="width: 100%"
                              @change="(val)=>{changeSelect(val,'leaderFive')}"
                              placeholder="请选择"
                              @dropdownVisibleChange="()=>{getSelectOptions('leaderFive')}">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="index" :value="item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
        </div>
        <div class="content member">
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">队长：</label>
                    <a-select mode="multiple"
                              v-model="peopleData.memberOne"
                              style="width: 100%"
                              @change="(val)=>{changeSelect(val,'memberOne')}"
                              placeholder="请选择"
                              @dropdownVisibleChange="()=>{getSelectOptions('memberOne')}">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="index" :value="item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">副队长：</label>
                    <a-select mode="multiple"
                              v-model="peopleData.memberTwo"
                              style="width: 100%"
                              @change="(val)=>{changeSelect(val,'memberTwo')}"
                              placeholder="请选择"
                              @dropdownVisibleChange="()=>{getSelectOptions('memberTwo')}">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="index" :value="item.id">{{item.name}} {{item.tel}}</a-select-option>
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
                              v-model="peopleData.groupOneForOne"
                              style="width: 100%"
                              @change="(val)=>{changeSelect(val,'groupOneForOne')}"
                              placeholder="请选择"
                              @dropdownVisibleChange="()=>{getSelectOptions('groupOneForOne')}">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="index" :value="item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">副组长：</label>
                    <a-select mode="multiple"
                              v-model="peopleData.groupOneForTwo"
                              style="width: 100%"
                              @change="(val)=>{changeSelect(val,'groupOneForTwo')}"
                              placeholder="请选择"
                              @dropdownVisibleChange="()=>{getSelectOptions('groupOneForTwo')}">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="index" :value="item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">队员：</label>
                    <a-select mode="multiple"
                              v-model="peopleData.groupOneForThree"
                              style="width: 100%"
                              @change="(val)=>{changeSelect(val,'groupOneForThree')}"
                              placeholder="请选择"
                              @dropdownVisibleChange="()=>{getSelectOptions('groupOneForThree')}">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="index" :value="item.id">{{item.name}} {{item.tel}}</a-select-option>
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
                              v-model="peopleData.groupTwoForOne"
                              style="width: 100%"
                              @change="(val)=>{changeSelect(val,'groupTwoForOne')}"
                              placeholder="请选择"
                              @dropdownVisibleChange="()=>{getSelectOptions('groupTwoForOne')}">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="index" :value="item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">副组长：</label>
                    <a-select mode="multiple"
                              v-model="peopleData.groupTwoForTwo"
                              style="width: 100%"
                              @change="(val)=>{changeSelect(val,'groupTwoForTwo')}"
                              placeholder="请选择"
                              @dropdownVisibleChange="()=>{getSelectOptions('groupTwoForTwo')}">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="index" :value="item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">队员：</label>
                    <a-select mode="multiple"
                              v-model="peopleData.groupTwoForThree"
                              style="width: 100%"
                              @change="(val)=>{changeSelect(val,'groupTwoForThree')}"
                              placeholder="请选择"
                              @dropdownVisibleChange="()=>{getSelectOptions('groupTwoForThree')}">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="index" :value="item.id">{{item.name}} {{item.tel}}</a-select-option>
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
                              v-model="peopleData.groupThreeForOne"
                              style="width: 100%"
                              @change="(val)=>{changeSelect(val,'groupThreeForOne')}"
                              placeholder="请选择"
                              @dropdownVisibleChange="()=>{getSelectOptions('groupThreeForOne')}">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="index" :value="item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">副组长：</label>
                    <a-select mode="multiple"
                              v-model="peopleData.groupThreeForTwo"
                              style="width: 100%"
                              @change="(val)=>{changeSelect(val,'groupThreeForTwo')}"
                              placeholder="请选择"
                              @dropdownVisibleChange="()=>{getSelectOptions('groupThreeForTwo')}">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="index" :value="item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">队员：</label>
                    <a-select mode="multiple"
                              v-model="peopleData.groupThreeForThree"
                              style="width: 100%"
                              @change="(val)=>{changeSelect(val,'groupThreeForThree')}"
                              placeholder="请选择"
                              @dropdownVisibleChange="()=>{getSelectOptions('groupThreeForThree')}">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="index" :value="item.id">{{item.name}} {{item.tel}}</a-select-option>
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
            }
        },
        data(){
            return {
                totalPeople: [],
                canSelectPeople: []
            }
        },
        computed:{
           allCheckedPeopleIdList:function(){
               console.log('allCheckedPeopleIdList change');
               let _this = this, arr = [];
               Object.keys(_this.peopleData).forEach(function(key){
                    _this.peopleData[key].reduce((res,id)=>{
                        res.push(id);
                        return res
                    },arr);
               })
               return arr
           }
        },
        watch:{
            // innerPeople:function(val){
            //     this.$emit('update:peopleData', val);
            // }
        },
        created(){
            this.getAllPeopleDataList().then((res)=>{
                this.totalPeople = res.data;
                this.canSelectPeople = this.totalPeople;
            });
        },
        mounted(){

        },
        methods:{
            ...mapActions('emergency/common', ['getAllPeopleDataList']),
            changeSelect(val,type){
                console.log(val,type);
                this.peopleData[type] = val;
                console.log('allCheckedPeopleIdList',this.allCheckedPeopleIdList);
            },
            getSelectOptions(type){
                console.log(type);
                this.canSelectPeople = [];
                let arr = [];
                this.allCheckedPeopleIdList.forEach(id=>{
                    if(!this.peopleData[type].includes(id)){
                        arr.push(id);
                    }
                });
                console.log('arr',arr);
                this.totalPeople.forEach(item=>{
                    if(!arr.includes(item.id)){
                        this.canSelectPeople.push(item);
                    }
                });
            },
            handleChange(val){
                console.log('people',val);
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
