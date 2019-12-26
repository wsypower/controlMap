<template>
    <div class="ctrl-panel">
        <div class="ctrl-panel-b">
            <ul style="padding-left: 10px">
                <li class="ctrl-panel-item" v-for="(layer,index) in areaLayer" :key="index">
                    <p class="ctrl-panel-item-checkbox" @click="toggleService(layer)">
                        <img :src="getSelectState(layer.name)">
                    </p>
                    <div class="ctrl-panel-item-middle">
                        <p class="ctrl-panel-item-icon df aic">
                            <img :src="layer.icon" style="width: 15px;height: 15px">
                        </p>
                        <p>{{layer.name}}</p>
                    </div>
                </li>
                <li class="ctrl-panel-item" v-for="(layer,index) in moduleLayers" :key="index">
                    <p class="ctrl-panel-item-checkbox" @click="toggleService(layer)">
                        <img :src="getSelectState(layer.name)">
                    </p>
                    <div class="ctrl-panel-item-middle">
                        <p class="ctrl-panel-item-icon df aic">
                            <img :src="layer.icon" style="width: 15px;height: 15px">
                        </p>
                        <p>{{layer.name}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { mapActions,mapState } from 'vuex';
    import selectedImg from '@/assets/mapImage/selected.png';
    import unselectedImg from '@/assets/mapImage/unselected.png';
    import { getTypePoint } from '@/api/map/service';
    import {gridStyle} from '@/utils/util.map.style';
    import {listToFeatures} from '@/utils/util.map.manage';
    import { getTypeEquip } from '@/api/map/service';
    import { emergencyEquipStyle } from '@/utils/util.map.style';
    import util from '@/utils/util'
    let  selectLayer=['区县','街道','社区','监督网格','单元网格','人员','车辆','视频','案卷'];
    export default {
        name: "LayersSwitch",
        props: {
            show: {
                type: Boolean
            },
        },
        data(){
            return {
                areaLayer:[
                    {
                        name: '区县',
                        color:'#800000',
                        icon: require('@/assets/mapImage/qx.png'),
                        lyr: null
                    }, {
                        name: '街道',
                        color:'#400000',
                        icon: require('@/assets/mapImage/jd.png'),
                        lyr: null
                    }, {
                        name: '社区',
                        color:'#808080',
                        icon: require('@/assets/mapImage/sq.png'),
                        lyr: null
                    }, {
                        name: '监督网格',
                        color:'#0000FF',
                        icon: require('@/assets/mapImage/jdwg.png'),
                        lyr:null
                    }, {
                        name: '单元网格',
                        color:'#FF0000',
                        icon: require('@/assets/mapImage/dywg.png'),
                        lyr: null
                    }
                ],
                moduleLayers:[
                    {
                        name: '人员',
                        icon: require('@/assets/mapImage/ry.png'),
                        lyr:null
                    }, {
                        name: '车辆',
                        icon: require('@/assets/mapImage/cl.png'),
                        lyr: null
                    },{
                        name: '视频',
                        icon: require('@/assets/mapImage/sp.png'),
                        lyr: null
                    },{
                        name: '井盖',
                        icon: require('@/assets/mapImage/jg.png'),
                        lyr: null
                    },{
                        name: '垃圾桶',
                        icon: require('@/assets/mapImage/ljt.png'),
                        lyr: null
                    },{
                        name: '水位计',
                        icon: require('@/assets/mapImage/swj.png'),
                        lyr: null
                    },
                ],
                selectLayer:[]
            }
        },
        computed: {
            ...mapState('map', ['mapManager']),
            ...mapState('cgadmin/menu', ['activeModule']),
            getSelectState: function (layer) {
                return function (layer) {
                    return this.selectLayer.includes(layer) ? selectedImg : unselectedImg
                }
            }
        },
        mounted(){
            if(this.activeModule=='jm'){
                this.moduleLayers.splice(0,2);
                this.moduleLayers.splice(1,3);
            }else if(this.activeModule=='ps'){
                this.moduleLayers.splice(1,1);
                this.moduleLayers.splice(2,2);
            }else if(this.activeModule=='sz'){
                this.moduleLayers.splice(4,2);
            }else if(this.activeModule=='hw'){
                this.moduleLayers.splice(3,1);
                this.moduleLayers.splice(4,1);
            }
            this.getAllLayers();
        },
        methods:{
            ...mapActions('section/common', ['getAllPeopleDataList']),
            ...mapActions('video/manage', ['getAllCameraDataList']),
            ...mapActions('car/manage', ['getAllCarDataList']),
            getAllLayers(){
                console.log('activeModule====',this.activeModule);
                const _this=this;
                const userId = util.cookies.get('userId');
                this.areaLayer.forEach(layer=>{
                    getTypePoint(layer.name).then(data=>{
                        layer.lyr = _this.mapManager.addVectorLayerByFeatures(data,gridStyle(layer.color),33);
                        layer.lyr.setVisible(false);
                    });
                })
                this.moduleLayers.forEach(layer => {
                    //获取人员数据
                    if(layer.name=='人员'){
                        _this.getAllPeopleDataList({userId: userId,moduleType: _this.activeModule}).then(res=>{
                            if(res&& res.length>0) {
                                _this.datToLayer(layer,res,layer.name);
                            }
                        });
                    }else if(layer.name=='车辆'){
                        _this.getAllCarDataList({userId: userId,moduleType: _this.activeModule}).then(res=>{
                            if(res&& res.length>0){
                                _this.datToLayer(layer,res,layer.name);
                            }
                        });
                    }else if(layer.name=='视频'){
                        _this.getAllCameraDataList({userId: userId,moduleType: _this.activeModule}).then(res=>{
                            if(res&&res.length>0){
                                _this.datToLayer(layer,res,layer.name);
                            }
                        });
                    }else if(layer.name=='井盖'){
                        getTypeEquip('3').then(res => {
                            _this.datToLayer(layer,res,layer.name);
                        })
                    }else if(layer.name=='垃圾桶'){
                        getTypeEquip('7').then(res => {
                            _this.datToLayer(layer,res,layer.name);
                        })
                    }else if(layer.name=='水位计'){
                        getTypeEquip('8').then(res => {
                            _this.datToLayer(layer,res,layer.name);
                        })
                    }
                });
            },
            //数据生成对应图层
            datToLayer(layer,data,type){
                const features=listToFeatures(data,type);
                layer.lyr=this.mapManager.addClusterLayerByFeatures(features);
                layer.lyr.setVisible(false);
            },
            toggleService (layer) {
                if (layer.name === '全部图层') {
                    if (this.selectLayer.includes(layer.name)) {
                        for (let i = 1; i < this.allLayers.length; i++) {
                            this.allLayers[i].lyr.setVisible(false)
                        }
                        this.selectLayer = [];
                    } else {
                        for (let i = 1; i < this.allLayers.length; i++) {
                            this.allLayers[i].lyr.setVisible(true);
                        }
                        this.selectLayer = [...selectLayer];
                    }
                } else {
                    const index = this.selectLayer.indexOf(layer.name);
                    if (index !== -1) {
                        this.selectLayer.splice(index, 1)
                    } else {
                        this.selectLayer.push(layer.name)
                    }
                    if (!this.selectLayer.includes(layer.name)) {
                        layer.lyr.setVisible(false)
                    } else {
                        layer.lyr.setVisible(true)
                    }
                }
            }
        },
        destroyed(){
            this.areaLayer.forEach(layer=>{
                if(layer.lyr) {
                    this.mapManager.removeLayer(layer.lyr);
                }
            });
            this.moduleLayers.forEach(layer=>{
                if(layer.lyr) {
                    this.mapManager.removeLayer(layer.lyr);
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
.ctrl-panel {
    position: absolute;
    right: 50px;
    padding: 10px;
    background-color: rgba(255, 255, 255, 1);
    border: solid 1px rgba(221, 221, 221, 1);
    z-index: 99;
    box-sizing: border-box;
    font-size:13px;
    .ctrl-panel-item {
        display: -webkit-box;
        align-items: center;
        margin-bottom: 12px;
        height: 18px;
        &:last-child {
            margin-bottom: 0;
        }
        .ctrl-panel-item-checkbox {
            margin-right: 12px;
            display:flex;
            align-items: center;
            cursor:pointer;
        }
        .ctrl-panel-item-middle {
            display: flex;
            width: 90px;
            flex: none;
            .ctrl-panel-item-icon {
                margin-right: 5px;
                display:flex;
                align-items: center;
            }
        }
    }
}
</style>