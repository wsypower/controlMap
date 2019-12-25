<template>
    <div class="ctrl-panel">
        <div class="ctrl-panel-b">
            <ul>
                <li class="ctrl-panel-item" v-for="(layer,index) in allLayers" :key="index">
                    <p class="ctrl-panel-item-checkbox" @click="toggleService(layer)">
                        <img :src="getSelectState(layer.name)">
                    </p>
                    <div class="ctrl-panel-item-middle">
                        <!--<p class="ctrl-panel-item-icon df aic">-->
                            <!--<img :src="layer.icon">-->
                        <!--</p>-->
                        <p>{{layer.name}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import selectedImg from '@/assets/mapImage/selected.png';
    import unselectedImg from '@/assets/mapImage/unselected.png';
    import { getTypePoint } from '@/api/map/service';
    import {gridStyle} from '@/utils/util.map.style';
    let  selectLayer=['区县','街道','社区','监督网格','单元网格','人员','车辆','视频'];
    let gridLayer=['区县','街道','社区','监督网格','单元网格'];
    export default {
        name: "LayersSwitch",
        props: {
            show: {
                type: Boolean
            },
        },
        data(){
            return {
                allLayers:[
                    {
                        name: '区县',
                        color:'#800000',
                        // icon: require('@/assets/images/公厕.png'),
                        lyr: null
                    }, {
                        name: '街道',
                        color:'#400000',
                        lyr: null
                    }, {
                        name: '社区',
                        color:'#808080',
                        lyr: null
                    }, {
                        name: '监督网格',
                        color:'#0000FF',
                        lyr:null
                    }, {
                        name: '单元网格',
                        color:'#FF0000',
                        lyr: null
                    },{
                        name: '人员',
                        lyr:null
                    }, {
                        name: '车辆',
                        lyr: null
                    },{
                        name: '视频',
                        lyr: null
                    }, {
                        name: '案卷',
                        lyr: null
                    },
                ],
                selectLayer:['区县','街道','社区','监督网格','单元网格']
            }
        },
        computed: {
            ...mapState('map', ['mapManager']),
            getSelectState: function (layer) {
                return function (layer) {
                    return this.selectLayer.includes(layer) ? selectedImg : unselectedImg
                }
            }
        },
        mounted(){
            this.getAllLayers();
        },
        methods:{
            getAllLayers(){
                const _this=this;
                this.allLayers.forEach(layer => {
                    if(gridLayer.includes(layer.name)){
                        getTypePoint(layer.name).then(data=>{
                            console.log('区县数据====',data);
                            layer.lyr = _this.mapManager.addVectorLayerByFeatures(data,gridStyle(layer.color),33);
                        });
                    }else{

                    }
                });
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
            this.allLayers.forEach(layer=>{
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
    padding: 20px 5px;
    background-color: rgba(255, 255, 255, 1);
    border: solid 1px rgba(221, 221, 221, 1);
    z-index: 99;
    box-sizing: border-box;
    font-size:13px;
    .ctrl-panel-item {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
        height: 18px;
        &:last-child {
            margin-bottom: 0;
        }
        .ctrl-panel-item-checkbox {
            margin-right: 18px;
            display:flex;
            align-items: center;
            cursor:pointer;
        }
        .ctrl-panel-item-middle {
            display: flex;
            width: 100px;
            flex: none;
        }
    }
}
</style>