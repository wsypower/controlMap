import Vue from 'vue'
import iconSvg from './cg-icon/cg-icon-svg/index'
import cgContainer from './cg-container'
import dialog from './Dialog.vue'
import tipModal from './TipModal.vue'
import myVideoPlayer from './MyVideoPlayer.vue'
import contentTab from './content-tab/index'

//!注意 有些组件使用异步加载会有影响
Vue.component('cg-container', cgContainer)
Vue.component('cg-icon-svg', iconSvg)
Vue.component('custom-dialog', dialog)
Vue.component('tipModal', tipModal)
Vue.component('myVideoPlayer',myVideoPlayer)
Vue.component('content-tabs', contentTab)

