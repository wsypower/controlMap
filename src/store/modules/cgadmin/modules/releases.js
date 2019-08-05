import util from '@/utils/util.js'

export default {
  namespaced: true,
  mutations: {
    /**
     * @description 显示版本信息
     * @param {Object} state vuex state
     */
    versionShow() {
      util.log.capsule('智能管控平台（cg-Admin）', `版本号:v${process.env.VUE_APP_VERSION}`)
    }
  }
}
