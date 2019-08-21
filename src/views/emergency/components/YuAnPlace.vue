<template>
    <div class="part place">
        <div class="title">应急场地管理</div>
        <div class="content place_table">
            <a-table :columns="placeColumns"
                     :dataSource="resultData"
                     :pagination="false"
                     bordered
                     :rowKey="record => record.id">
                <template slot="index" slot-scope="text, record, index">
                    <div>{{index+1}}</div>
                </template>
                <template slot="name" slot-scope="text, record, index">
                    <a-input :value="text" @change="e => changeVal(e.target.value, record.id, 'name')" />
                </template>
                <template slot="num" slot-scope="text, record, index">
                    <a-input :value="text" @change="e => changeVal(e.target.value, record.id, 'num')" />
                </template>
                <template slot="person" slot-scope="text, record, index">
                    <a-input :value="text" @change="e => changeVal(e.target.value, record.id, 'person')" />
                </template>
                <template slot="tel" slot-scope="text, record, index">
                    <a-input :value="text" @change="e => changeVal(e.target.value, record.id, 'tel')" />
                </template>
                <template slot="address" slot-scope="text, record, index">
                    <div>
                        <div flex="cross:center main:justify">
                            <span>位置：</span>
                            <span @click="openMapDialog(index)">
                                <cg-icon-svg name="ditu" class="svg_icon"></cg-icon-svg>
                            </span>
                        </div>
                        <div>X轴：</div>
                        <div>Y轴：</div>
                    </div>
                </template>
                <template slot="operate" slot-scope="text, record, index">
                    <div class="operate-cell">
                        <span @click="resetRow(index)">重置</span>
                        <span>|</span>
                        <span @click="deleteRow(index)">删除</span>
                    </div>
                </template>
                <template slot="footer">
                    <div class="table_footer">
                        <span @click="addRow">
                            <a-icon type="plus-circle" style="margin-right: 5px"/>新增场地
                        </span>
                    </div>
                </template>
            </a-table>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    const placeColumns = [{
        title: '序号',
        dataIndex: 'index',
        scopedSlots: { customRender: 'index' },
        width: '70px'
    }, {
        title: '场地名称',
        dataIndex: 'name',
        scopedSlots: { customRender: 'name' },
        width: '200px'
    }, {
        title: '场地数量',
        dataIndex: 'num',
        scopedSlots: { customRender: 'num' },
        width: '100px'
    }, {
        title: '场地责任人',
        dataIndex: 'person',
        scopedSlots: { customRender: 'person' },
        width: '200px'
    }, {
        title: '电话',
        dataIndex: 'tel',
        scopedSlots: { customRender: 'tel' },
        width: '180px'
    }, {
        title: '场地位置',
        dataIndex: 'address',
        scopedSlots: { customRender: 'address' }
    }, {
        title: '操作',
        dataIndex: 'operate',
        scopedSlots: { customRender: 'operate' },
        width: '120px'
    }];
    export default {
        name: 'yuAnPlace',
        props:{
            placeData:{
                type: Array,
                default(){
                    return []
                }
            }
        },
        data(){
            return {
                placeColumns: placeColumns,
                resultData: []
            }
        },
        mounted(){
            this.resultData = JSON.parse(JSON.stringify(this.placeData));
        },
        watch:{
            resultData:function(val){
                this.$emit('update:placeData', val);
            }
        },
        methods:{
            addRow(){
                let temp = {
                    id: 'jjdjd' + this.count++,
                    name: '',
                    num: '',
                    person: '',
                    tel: '',
                    address: '',
                    x: '',
                    y: ''
                };
                this.resultData.push(temp);
            },
            changeVal(val,id,colName){
                const newData = [...this.resultData];
                const target = newData.filter(item => id === item.id)[0];
                if (target) {
                    target[colName] = val;
                    this.resultData = newData;
                }
            },
            openMapDialog(index){
                debugger
                let data = this.resultData[index];
                this.positionData = {
                    address: data.address,
                    x: data.x,
                    y: data.y
                }
                console.log('openMapDialog');
                this.positionMapDialogVisible = true;
            },
            resetRow(index){
                let temp = {
                    id: 'jjdjd' + this.count++,
                    name: '',
                    num: '',
                    person: '',
                    tel: '',
                    address: '',
                    x: '',
                    y: ''
                };
                this.resultData[index]=Object.assign(this.resultData[index],temp);
            },

            deleteRow(index){
                this.positionData = {
                    address: '',
                    x: '',
                    y: ''
                }
                this.resultData.splice(index,1);
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
    .place_table{
        padding: 0px !important;
        background-color: #ffffff !important;
        .svg_icon{
            width: 24px;
            height: 24px;
            color: #2b8ff3;
            cursor: pointer;
            &:hover{
                color: #1e62a4;
            }
        }
        .operate-cell{
            span:first-child,span:last-child{
                font-family: PingFang-SC-Medium;
                font-size: 13px;
                color: #2b8ff3;
            }
            span:nth-child(2){
                display:inline-block;
                margin: 0px 10px;
            }
        }
        .table_footer{
            text-align: center;
            color: #2b8ff3;
            cursor: pointer;
            &:hover{
                color: #1e62a4;
            }
        }
    }
</style>
