<template>
    <div class="photo-show-mask" flex="cross:center main:center">
        <!--<div class="swiper-container" ref="slider">-->
            <!--<div class="swiper-wrapper">-->
                <!--<div class="swiper-slide" v-for="slide in slides" flex="cross:center main:center">-->
                    <!--<img :src="slide.img_url"/>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
        <swiper :options="swiperOption" ref="mySwiper">
            <!-- slides -->
            <swiper-slide v-for="(slide,index) in photoList" flex="cross:center main:center" :key="index">
                <img :src="slide.url"/>
            </swiper-slide>

            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
            <!--<div class="swiper-scrollbar"   slot="scrollbar"></div>-->
        </swiper>
        <div class="close-panel" @click="closePhotoShow">X</div>
    </div>
</template>
<script>
    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default {
        name: "Slider",
        props:{
            photoList:{
                type: Array,
                default(){
                    return []
                }
            },
            toIndex:{
                type: Number,
                default: 0
            }
        },
        data(){
            return{
                swiperOption:{
                    // some swiper options/callbacks
                    // 所有的参数同 swiper 官方 api 参数
                    // ...
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    pagination: {
                        el: '.swiper-pagination'
                    }
                },
                slides:[{
                    id:1,
                    img_url: require('../../assets/images/topone.png')
                },{
                    id:2,
                    img_url: require('../../assets/images/toptwo.png')
                }]
            }
        },
        components: {
            swiper,
            swiperSlide
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        mounted(){
            // current swiper instance
            // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
            console.log('this is current swiper instance object', this.swiper)
            this.swiper.slideTo(this.toIndex, 1000, false)
        },
        methods:{
            closePhotoShow(){

                this.$emit('closePhotoShow');
            }
        }
    }
</script>
<style lang="scss" scoped>
    .photo-show-mask{
        position:fixed;
        top: 0px;
        right:0px;
        display: none;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.6);
        z-index: 100;

        .close-panel{
            position: absolute;
            right: 0px;
            top: 60px;
            width: 50px;
            height: 50px;
            background-color: #000000;
            cursor: pointer;
            opacity: 0.8;
            font-size: 22px;
            color: #ffffff;
            border-bottom-left-radius: 50px;
            padding: 4px 0px 0px 26px;
        }
        .swiper-container{
            width: 80%;
            height: 80%;
            .swiper-slide{
                img{
                    height: 100%
                }
            }
        }
        /deep/.swiper-button-prev, /deep/.swiper-button-next{
            width: 50px;
            height: 50px;
            border-radius: 50px;
            background-color: rgb(255,255,255);
        }
        /deep/.swiper-button-prev{
            background-image: url('~@img/prev.png');
            background-size: 100%;
        }
        /deep/.swiper-button-next{
            background-image: url('~@img/next.png');
            background-size: 100%;
        }
    }
</style>
