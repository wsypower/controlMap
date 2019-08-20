<template>
    <div class="yuan-form">
        <div class="part name">
            <div class="title">预案名称</div>
            <a-input placeholder="请输入"/>
        </div>
        <div class="part things">
            <div class="title">应急事项</div>
            <div class="content">
                <a-row>
                    <a-col :span="6">
                        <label>阶段：</label>
                        <a-select @change="">
                            <a-select-option value="消息阶段">消息阶段</a-select-option>
                            <a-select-option value="警报阶段">警报阶段</a-select-option>
                            <a-select-option value="紧急警报阶段">紧急警报阶段</a-select-option>
                            <a-select-option value="警报解除阶段">警报解除阶段</a-select-option>
                        </a-select>
                    </a-col>
                    <a-col :span="6">
                        <label>责任事项：</label>
                        <a-input placeholder="请输入"/>
                    </a-col>
                    <a-col :span="6">
                        <label>责任人：</label>
                        <a-input placeholder="请输入"/>
                    </a-col>
                    <a-col :span="6">
                        <label>电话号码：</label>
                        <a-input placeholder="请输入"/>
                    </a-col>
                </a-row>
            </div>
        </div>
        <div class="part people">
            <div class="title">应急人员</div>
            <div class="content leader">
                <a-row>
                    <label>组长：</label>
                    <a-select mode="multiple" :defaultValue="['a1', 'b2']" style="width: 100%" @change="handleChange" placeholder="Please select">
                        <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">{{(i + 9).toString(36) + i}}</a-select-option>
                    </a-select>
                </a-row>
                <a-row>
                    <label>副组长：</label>
                    <a-select mode="multiple" :defaultValue="['a1', 'b2']" style="width: 100%" @change="handleChange" placeholder="Please select">
                        <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">{{(i + 9).toString(36) + i}}</a-select-option>
                    </a-select>
                </a-row>
            </div>
            <div class="content member">
                <a-row>
                    <label>队长：</label>
                    <a-select mode="multiple" :defaultValue="['a1', 'b2']" style="width: 100%" @change="handleChange" placeholder="Please select">
                        <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">{{(i + 9).toString(36) + i}}</a-select-option>
                    </a-select>
                </a-row>
                <a-row>
                    <label>副队长：</label>
                    <a-select mode="multiple" :defaultValue="['a1', 'b2']" style="width: 100%" @change="handleChange" placeholder="Please select">
                        <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">{{(i + 9).toString(36) + i}}</a-select-option>
                    </a-select>
                </a-row>
            </div>
        </div>
        <div class="part resource">
            <div class="title">应急物资管理</div>
            <div class="content"></div>
        </div>
        <div class="part place">
            <div class="title">应急场地管理</div>
            <div class="content"></div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        name: '',
        data(){
            return {
                yuAnForm: {
                    name: '',
                    stageThings: [
                        {
                            'id': '',
                            'stageId': '',
                            'stageName':'',
                            'description':'',
                            'person':'',
                            'telephone': ''
                        }],

                }
            }
        },
        methods:{

        }
    }
</script>
<style lang="scss" scoped>
    .yuan-form{

    }
</style>
