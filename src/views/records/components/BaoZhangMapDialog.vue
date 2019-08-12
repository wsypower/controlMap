<template>
    <a-modal ref="baoZhangDialog" title="保障视图" v-model="mapDialogVisible" width="100%"
             @cancel="handleCancel">
        <div class="yuan_dialog_body" id="bao_zhang_map" ref="baoZhangBody">
            <a-button type="primary" @click="showSetDialog(0)">展示设置弹窗</a-button>
            <div class="set-baozhang-dialog">
                <div class="set-baozhang-dialog-header" flex="main:justify cross:center">
                    <span>设置保障信息</span>
                    <a-icon type="close" @click="closeSetDialog"/>
                </div>
                <div class="set-baozhang-dialog-body">
                    <cg-container scroll>
                        <a-form :form="form" style="margin:10px">
                            <a-form-item label="保障点位：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                                <a-input v-model="baoZhangFormData.name" placeholder="请输入保障点位"/>
                            </a-form-item>
                            <a-form-item label="人员选择：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                                <a-select
                                        mode="multiple"
                                        placeholder="请选择人员"
                                        @change="handleChange"
                                        v-model="baoZhangFormData.personList"
                                >
                                    <a-select-option v-for="person in peopleList" :key="person.id">
                                        {{person.name}}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item label="备注：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                                <a-textarea v-model="baoZhangFormData.remark" placeholder="" :autosize="{ minRows: 2, maxRows: 2 }" />
                            </a-form-item>
                        </a-form>
                    </cg-container>
                </div>
                <div class="set-baozhang-dialog-footer">
                    <a-button type="primary" size="small" @click="svaeBaoZhangInfo">确定</a-button>
                    <a-button type="primary" size="small" @click="reset">重置</a-button>
                </div>
            </div>
            <div class="operate-panel">
                <a-dropdown>
                    <a-menu slot="overlay" @click="handleOperateClick">
                        <a-menu-item key="area">多边形</a-menu-item>
                        <a-menu-item key="line">线</a-menu-item>
                        <a-menu-item key="dot">点</a-menu-item>
                    </a-menu>
                    <a-button class="op-btn yacz-btn">
                        <span class="memu-title-text">绘图工具</span>
                        <a-icon type="down" />
                    </a-button>
                </a-dropdown>
                <a-button type="primary" @click="clearDraw">清除选中区域</a-button>
            </div>
        </div>

        <template slot="footer">
            <a-button type="primary" @click="saveMap">保存视图</a-button>
            <a-button @click="resetMap">重置视图</a-button>
        </template>
    </a-modal>
</template>
<script type="text/ecmascript-6">
    export default{
      name: 'baoZhangMapDialog',
      props:{
        visible: {
            type: Boolean,
            default: false
        },
        sourcePeopleList:{
          type: Array,
          default(){
            return []
          }
        },
        baoZhangData:{
          type: Array,
          default(){
            return []
          }
        }
      },
      data(){
        return {
          mapDialogVisible: false,
          form: null,
          //一条保障点位的数据
          baoZhangFormData: {
            mapId: '',
            name: '',
            personList: [],
            remark: ''
          },
          //识别编辑/新增保障点位
          opType: 'add',
          index: 0,
          //某一个保障点位，需要过滤的人员数据
          filterPeopleList: [],
          allBaoZhangData: []
        }
      },
      computed:{
        //所有已选择人员数据
        checkedPeopleIdList: function(){
          return this.allBaoZhangData.reduce((res,item)=>{
            let temp = item.peopleList.reduce((r,i)=>{
              r.push(i.id);
              return r
            },[])
            return res.concat(temp)
          },[]);
        },
        //可选择的人员数据
        peopleList:function(){
          let resArr = this.sourcePeopleList.reduce((res,item)=>{
            if(!this.filterPeopleList.includes(item.id)){
              res.push(item)
            }
            return res
          },[])
            return resArr
        }
      },
      watch:{
        mapDialogVisible:function(val){
          if(val){
            this.init();
          }
          else{
            this.$emit('update:visible', false);
          }
        },
        visible:function(val){
          if(val){
            this.mapDialogVisible = true;
          }
        },

      },
      created(){
        this.form = this.$form.createForm(this);
      },
      mounted() {
        this.allBaoZhangData = JSON.parse(JSON.stringify(this.baoZhangData));
      },
      updated(){
        let height = document.body.clientHeight - 300;
        this.$refs.baoZhangBody.style.height= height + 'px';
      },
      methods:{
        init(){

        },
        handleOperateClick(value){
          console.log('handleMenuClick',value);
          switch(value.key){
            case 'area':
              this.drawArea();
              break;
            case 'line':
              this.drawLine();
              break;
            case 'dot':
              this.drawDot();
              break;
            default:
              console.log('no operation');
          }
        },
        showSetDialog(mapId){
          let flag = this.allBaoZhangData.some(item =>{
            return item.mapId === mapId
          });
          this.opType = flag? 'edit': 'add';

          if(this.opType === 'edit'){
            let temp = null;
            for(let i=0;i<this.allBaoZhangData.length;i++){
              if(this.allBaoZhangData[i].mapId === mapId){
                temp = this.allBaoZhangData[i];
                this.index = i;
              }
            }
            let selectList = temp.peopleList.reduce((r,i)=>{
              r.push(i.id);
              return r
            },[])
            this.filterPeopleList = this.checkedPeopleIdList.reduce((res,item)=>{
              if(!selectList.includes(item)){
                res.push(item)
              }
              return res
            },[]);

            this.baoZhangFormData.name = temp.name;
            this.baoZhangFormData.personList = temp.personList;
            this.baoZhangFormData.remark = temp.remark;
          }
          else{
            this.baoZhangFormData.mapId = mapId;
            this.baoZhangFormData.name = '';
            this.baoZhangFormData.personList = [];
            this.baoZhangFormData.remark = '';
          }
        },
        handleChange(value) {
          console.log(`Selected: ${value}`,value);
          this.baoZhangFormData.personList = value;
        },
        svaeBaoZhangInfo(){
          console.log('this.baoZhangFormData',this.baoZhangFormData)
          if(this.opType == 'edit'){
            this.allBaoZhangData[this.index].name = this.baoZhangFormData.name;
            this.allBaoZhangData[this.index].personList = this.baoZhangFormData.personList;
            this.allBaoZhangData[this.index].remark = this.baoZhangFormData.remark;
          }
          else{
            this.allBaoZhangData.push(this.baoZhangFormData);
          }
        },
        reset(){
          let mapId = this.baoZhangFormData.mapId;
          this.baoZhangFormData = Object.assign({},this.$options.data()['baoZhangFormData']);
          this.baoZhangFormData.mapId = mapId;
        },
        closeSetDialog(){
            this.reset();
        },
        drawArea(){

        },
        drawLine(){

        },
        drawDot(){

        },
        clearDraw(){

        },
        saveMap(){
            console.log('this.allBaoZhangData',this.allBaoZhangData);
        },
        resetMap(){
          this.allBaoZhangData = [];
        },
        handleCancel(){
          this.allBaoZhangData = [];
          this.mapDialogVisible = false;
        }
      }
  }
</script>
<style lang="scss" scoped>
    .yuan_dialog_body {
        height: 500px;
        width: 100%;
        position: relative;
        .operate-panel {
            position: absolute;
            top: 20px;
            right: 20px;
            button {
                margin-left: 10px;
            }
        }
        .set-baozhang-dialog{
            position: absolute;
            top: 60px;
            width: 400px;
            height: 300px;
            border: 1px solid #cccccc;
            border-radius: 6px;
            .set-baozhang-dialog-header{
                padding: 0px 10px;
                height: 40px;
                width: 100%;
                border-bottom: 1px solid #cccccc;
                i{
                    font-size: 16px;
                    cursor: pointer;
                    color: #868e96;
                    &:hover{
                        color: #343434;
                    }
                }
            }
            .set-baozhang-dialog-footer{
                height: 40px;
                width: 100%;
                text-align: center;
                line-height: 40px;
                border-top: 1px solid #cccccc;
                button:last-child{
                    margin-left: 10px;
                }
            }
            .set-baozhang-dialog-body{
                height:calc(100% - 80px);
                width:100%;
                padding:10px;
                position: relative;
                /deep/.ant-form-item{
                    margin-bottom: 6px;
                }
            }
        }
    }


</style>
