<template>
    <div class="ctrl-panel">
        <div class="ctrl-panel-b">
            <ul>
                <li class="ctrl-panel-item" v-for="(layer,index) in allLayers" :key="index">
                    <p class="ctrl-panel-item-checkbox df aic poi" @click="toggleService(layer)">
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
    let  selectLayer=['全部图层','区县','街道','社区','监督网格','单元网格','人员','车辆','视频'];
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
                        name: '全部图层',
                    }, {
                        name: '区县',
                        // icon: require('@/assets/images/公厕.png'),
                        lyr: null
                    }, {
                        name: '街道',
                        lyr: null
                    }, {
                        name: '社区',
                        lyr: null
                    }, {
                        name: '监督网格',
                        lyr:null
                    }, {
                        name: '单元网格',
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
                    },
                ],
                selectLayer:[...selectLayer]
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
        methods:{
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