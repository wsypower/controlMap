<template>
    <div class="part things">
        <div class="title">应急事项</div>
        <div class="add_btn" @click="addItem"><a-icon type="plus-circle" style="margin-right: 5px"/>新增应急阶段</div>
        <div class="content">
            <a-row v-for="(item, index) in stageData" :key="index">
                <a-col :span="5">
                    <div class="col-panel" flex="dir:left cross:center">
                        <label class="subtitle">阶段：</label>
                        <a-select v-model="item.stageName" @change="" style="width: 100%">
                            <a-select-option value="消息阶段">消息阶段</a-select-option>
                            <a-select-option value="警报阶段">警报阶段</a-select-option>
                            <a-select-option value="紧急警报阶段">紧急警报阶段</a-select-option>
                            <a-select-option value="警报解除阶段">警报解除阶段</a-select-option>
                        </a-select>
                    </div>
                </a-col>
                <a-col :span="6">
                    <div class="col-panel" flex="dir:left cross:center">
                        <label class="subtitle">责任事项：</label>
                        <a-input v-model="item.description" placeholder="请输入"/>
                    </div>
                </a-col>
                <a-col :span="6">
                    <div class="col-panel" flex="dir:left cross:center">
                        <label class="subtitle">责任人：</label>
                        <a-input v-model="item.person" placeholder="请输入"/>
                    </div>
                </a-col>
                <a-col :span="6">
                    <div class="col-panel" flex="dir:left cross:center">
                        <label class="subtitle">电话号码：</label>
                        <a-input v-model="item.tel" placeholder="请输入"/>
                    </div>
                </a-col>
                <a-col :span="1">
                    <a-popconfirm
                            v-if="stageData.length > 1"
                            title="确定删除这个阶段吗？"
                            @confirm="() => deleteItem(index)"
                    >
                        <a-icon type="minus-circle" class="del_btn"/>
                    </a-popconfirm>
                </a-col>
            </a-row>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        name: 'yuanStage',
        props:{
            stageData:{
                type: Array,
                default(){
                    return [{
                        id: '',
                        stageName: '',
                        description: '',
                        person: '',
                        tel: ''
                    }]
                }
            }
        },
        data(){
            return {}
        },
        watch:{},
        mounted(){},
        methods:{
            addItem(){
                console.log('add item');
                let temp = {
                    id: '',
                    stageName: '',
                    description: '',
                    person: '',
                    tel: ''
                }
                this.stageData.push(temp);
            },
            deleteItem(index){
                this.stageData.slice(index,1);
            }
        }
    }
</script>
<style lang="scss" scoped>
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
    .things {
        position: relative;
        .ant-row{
            margin-bottom: 5px;
            &:last-child{
                margin-bottom: 0px;
            }
        }
        .add_btn {
            position: absolute;
            right: 5px;
            top: 5px;
            font-family: PingFang-SC-Medium;
            font-size: 13px;
            color: #2b8ff3;
            cursor: pointer;
            &:hover{
                color: #1e62a4;
            }
        }
        .del_btn{
            margin-top: 10px;
            margin-left: 10px;
            font-family: PingFang-SC-Medium;
            font-size: 13px;
            color: #2b8ff3;
            cursor: pointer;
            &:hover{
                color: #1e62a4;
            }
        }
    }
</style>
