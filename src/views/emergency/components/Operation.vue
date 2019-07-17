<template>
    <div class="top-operate-panel" :class="{animation: isAnimationActive}" v-if="isActive">
        <a-dropdown>
            <a-menu slot="overlay" @click="handleOperateClick">
                <a-menu-item key="add">
                    <a-icon type="plus-square" theme="filled" />新增预案</a-menu-item>
            </a-menu>
            <a-button class="op-btn yacz-btn">
                <i class="icon_yacz">
                    <cg-icon-svg name="anjianhuizong" class="svg_icon_anjianhuizong"></cg-icon-svg>
                </i>
                <span class="memu-title-text">预案操作</span>
                <a-icon type="down" />
            </a-button>
        </a-dropdown>
        <a-button class="op-btn ychj-btn" @click="clickYCHJBtn">
            <i class="icon_ychj">
                <cg-icon-svg name="shipin" class="svg_icon_shipin"></cg-icon-svg>
            </i>
            <span class="memu-title-text">远程呼叫</span>
            <a-icon type="right" style="font-size: 12px;" />
        </a-button>
        <a-dropdown>
            <a-menu slot="overlay" @click="handleResourceClick">
                <a-menu-item key="allVideo"><cg-icon-svg name="video-one" class="svg_icon_common"></cg-icon-svg>全部视频</a-menu-item>
                <a-menu-item key="partVideo"><cg-icon-svg name="video-two" class="svg_icon_common"></cg-icon-svg>周边视频</a-menu-item>
                <a-menu-item key="jiuyuan"><cg-icon-svg name="menu-section" class="svg_icon_common"></cg-icon-svg>救援队伍</a-menu-item>
                <a-sub-menu>
                    <span slot="title"><cg-icon-svg name="zhangpeng" class="svg_icon_common"></cg-icon-svg><span>避难场所</span></span>
                    <a-menu-item key="allPlace">全部</a-menu-item>
                    <a-menu-item v-for="(item,index) in placeList" :key="item.key">{{item}}</a-menu-item>
                </a-sub-menu>
                <a-menu-item key="equip"><cg-icon-svg name="wuzi" class="svg_icon_common"></cg-icon-svg>物资装备</a-menu-item>
                <a-menu-item key="enterprise"><cg-icon-svg name="jianzhu" class="svg_icon_common"></cg-icon-svg>物资企业</a-menu-item>
                <a-menu-item key="expert"><cg-icon-svg name="zhuanjia" class="svg_icon_common"></cg-icon-svg>专家库</a-menu-item>
            </a-menu>
            <a-button class="op-btn yjzy-btn">
                <i class="icon_yjzy">
                    <cg-icon-svg name="yinjiguanli" class="svg_icon_yinjiguanli"></cg-icon-svg>
                </i>
                <span class="memu-title-text">应急资源</span>
                <a-icon type="down" />
            </a-button>
        </a-dropdown>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        name: 'operation',
        data(){
            return{
                //是否添加动效
                isAnimationActive: false,
                //组件是否渲染
                isActive: false,
                //避难场所下的所有类别
                placeList:[{'key':'jiuzhuzhan','name':'救助管理站'},
                    {'key':'park','name':'公园'},
                    {'key':'square','name':'广场'},
                    {'key':'greenbelt','name':'绿地'},
                    {'key':'otherbncs','name':'其他避难场所'},
                    {'key':'fangkongdong','name':'防空洞'},
                    {'key':'fkdxs','name':'防空地下室'},
                    {'key':'fkbjzd','name':'防空报警站点'},
                    {'key':'othergongshi','name':'其他人防工事'}]
            }
        },
        props:{
            //组件是否渲染
            isActiveOperation:{
                type: Boolean,
                default: false
            }
        },
        watch:{
            //监听从而实现动画效果
            isActiveOperation: function(newValue,oldValue){
                console.log('isActiveOperation: ' + newValue);
                if(newValue){
                    this.isActive = true;
                    setTimeout(()=> {
                        this.isAnimationActive = true;
                    },200)
                }
                else{
                    this.isAnimationActive = false;
                    setTimeout(()=>{
                        this.isActive = false;
                    },1000);

                }
            }
        },
        mounted(){
            this.$nextTick(() => {
                const body = document.querySelector("body");
                if (body.append) {
                    body.append(this.$el);
                } else {
                    body.appendChild(this.$el);
                }
            });
        },

        methods:{
            //预案操作：目前只有新增预案
            handleOperateClick(value){
                console.log('handleMenuClick',value);
                switch(value.key){
                    case 'add':
                        console.log('add operation');
                        this.$emit('addItem');
                        break;
                    default:
                        console.log('no operation');
                }
            },
            //远程呼叫
            clickYCHJBtn(){
                this.$emit('ychjOperate');
            },
            //应急资源
            handleResourceClick(value){
                console.log('handleResourceClick',value);
                switch(value.key){
                    case 'allVideo':
                        break;
                    case 'partVideo':
                        break;
                    case 'jiuyuan':
                        break;
                    case 'allPlace':
                        break;
                    case 'jiuzhuzhan':
                        break;
                    case 'park':
                        break;
                    case 'square':
                        break;
                    case 'greenbelt':
                        break;
                    case 'otherbncs':
                        break;
                    case 'fangkongdong':
                        break;
                    case 'fkdxs':
                        break;
                    case 'fkbjzd':
                        break;
                    case 'othergongshi':
                        break;
                    case 'equip':
                        break;
                    case 'enterprise':
                        break;
                    case 'expert':
                        break;
                    default:
                        console.log('no operation');
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .animation{
        opacity: 1 !important;
        transition: opacity 1s;
        -moz-transition: opacity 1s; /* Firefox 4 */
        -webkit-transition: opacity 1s; /* Safari 和 Chrome */
        -o-transition: opacity 1s; /* Opera */
    }
    .top-operate-panel {
        position: fixed;
        left: 437px;
        top: 70px;
        width: 426px;
        opacity: 0;
        transition: opacity 1s;
        -moz-transition: opacity 1s; /* Firefox 4 */
        -webkit-transition: opacity 1s; /* Safari 和 Chrome */
        -o-transition: opacity 1s; /* Opera */
        .op-btn {
            height: 36px;
            border-radius: 0px;
            .memu-title-text {
                display: inline-block;
                margin-left: 10px;
                font-family: PingFang-SC-Heavy;
                font-size: 14px;
                color: #333333;
                vertical-align: middle;
            }
        }
        .yacz-btn {
            .icon_yacz {
                display: inline-block;
                width: 24px;
                height: 24px;
                background-color: #f99f12;
                border-radius: 12px;
                vertical-align: middle;
                .svg_icon_anjianhuizong{
                    color: #ffffff;
                    margin-top: 5px;
                }
            }
        }
        .ychj-btn {
            .icon_ychj {
                display: inline-block;
                width: 24px;
                height: 24px;
                background-color: #2b8ff3;
                border-radius: 12px;
                vertical-align: middle;
                .svg_icon_shipin{
                    color: #ffffff;
                    margin-top: 5px;
                }
            }
        }
        .yjzy-btn {
            .icon_yjzy {
                display: inline-block;
                width: 24px;
                height: 24px;
                background-color: #f07171;
                border-radius: 12px;
                vertical-align: middle;
                .svg_icon_yinjiguanli{
                    color: #ffffff;
                    margin-top: 5px;
                }
            }
        }
    }
    /deep/.svg_icon_common{
        color: #999999;
        margin-right: 8px;
    }
    /deep/.ant-dropdown-menu-item:hover{
        background-color: #eaf1fa;
        color: #2b8ff3;
        .svg_icon_common{
            color: #2b8ff3;
        }
    }
    /deep/.ant-dropdown-menu-submenu-title:hover{
        background-color: #eaf1fa;
        color: #2b8ff3;
        .svg_icon_common{
            color: #2b8ff3;
        }
    }
</style>
