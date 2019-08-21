<template>
    <div class="part people">
        <div class="title">应急人员</div>
        <div class="content leader">
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">组长：</label>
                    <a-select mode="multiple" v-model="innerPeople.leaderOne" style="width: 100%" @change="(val)=>{changeSelect(val,'leaderOne')}" placeholder="请选择">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="index" :value="item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">副组长：</label>
                    <a-select mode="multiple" v-model="innerPeople.leaderTwo" style="width: 100%"@change="(val)=>{changeSelect(val,'leaderTwo')}" placeholder="请选择">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="index" :value="item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">组员：</label>
                        <a-select mode="multiple" v-model="innerPeople.leaderThree"  style="width: 100%" @change="(val)=>{changeSelect(val,'leaderThree')}" placeholder="请选择">
                            <a-select-option v-for="(item,index) in canSelectPeople" :key="index" :value="item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">主任：</label>
                    <a-select mode="multiple" v-model="innerPeople.leaderFour" style="width: 100%" @change="(val)=>{changeSelect(val,'leaderFour')}" placeholder="请选择">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="index" :value="item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">副主任：</label>
                    <a-select mode="multiple" v-model="innerPeople.leaderFive" style="width: 100%" @change="(val)=>{changeSelect(val,'leaderFive')}" placeholder="请选择">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="index" :value="item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
        </div>
        <div class="content member">
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">队长：</label>
                    <a-select mode="multiple" v-model="innerPeople.memberOne" style="width: 100%" @change="(val)=>{changeSelect(val,'memberOne')}" placeholder="请选择">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="index" :value="item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">副队长：</label>
                    <a-select mode="multiple" v-model="innerPeople.memberTwo" style="width: 100%" @change="(val)=>{changeSelect(val,'memberTwo')}" placeholder="请选择">
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
                    <a-select mode="multiple" v-model="innerPeople.groupOneForOne" style="width: 100%" @change="(val)=>{changeSelect(val,'groupOneForOne')}" placeholder="请选择">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="index" :value="item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">副组长：</label>
                    <a-select mode="multiple" v-model="innerPeople.groupOneForTwo" style="width: 100%" @change="(val)=>{changeSelect(val,'groupOneForTwo')}" placeholder="请选择">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="index" :value="item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">队员：</label>
                    <a-select mode="multiple" v-model="innerPeople.groupOneForThree" style="width: 100%" @change="(val)=>{changeSelect(val,'groupOneForThree')}" placeholder="请选择">
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
                    <a-select mode="multiple" v-model="innerPeople.groupTwoForOne" style="width: 100%" @change="(val)=>{changeSelect(val,'groupTwoForOne')}" placeholder="请选择">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="index" :value="item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">副组长：</label>
                    <a-select mode="multiple" v-model="innerPeople.groupTwoForTwo" style="width: 100%" @change="(val)=>{changeSelect(val,'groupTwoForTwo')}" placeholder="请选择">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="index" :value="item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">队员：</label>
                    <a-select mode="multiple" v-model="innerPeople.groupTwoForThree" style="width: 100%" @change="(val)=>{changeSelect(val,'groupTwoForThree')}" placeholder="请选择">
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
                    <a-select mode="multiple" v-model="innerPeople.groupThreeForOne" style="width: 100%" @change="(val)=>{changeSelect(val,'groupThreeForOne')}" placeholder="请选择">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="index" :value="item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">副组长：</label>
                    <a-select mode="multiple" v-model="innerPeople.groupThreeForTwo" style="width: 100%" @change="(val)=>{changeSelect(val,'groupThreeForTwo')}" placeholder="请选择">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="index" :value="item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
            <a-row>
                <div class="col-panel" flex="dir:left">
                    <label class="subtitle">队员：</label>
                    <a-select mode="multiple" v-model="innerPeople.groupThreeForThree" style="width: 100%" @change="(val)=>{changeSelect(val,'groupThreeForThree')}" placeholder="请选择">
                        <a-select-option v-for="(item,index) in canSelectPeople" :key="index" :value="item.id">{{item.name}} {{item.tel}}</a-select-option>
                    </a-select>
                </div>
            </a-row>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
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
                innerPeople: {},
                totalPeople: [],
                canSelectPeople: []
            }
        },
        computed:{
           allCheckedPeopleIdList:function(){
               let arr = [];
               Object.keys(this.innerPeople).forEach(function(key){
                    this.innerPeople[key].reduce((res,id)=>{
                        res.push(id);
                        return res
                    },arr);
               })
               return arr
           }
        },
        mounted(){
            this.innerPeople = JSON.parse(JSON.stringify(this.peopleData));
        },
        methods:{
            changeSelect(val,type){
                console.log(val,type);
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
