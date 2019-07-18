/**
 * @description:地图数据管理
 * @author:sijianting
 * @createDate:2019/7/16 8:48
 */

export default {
  namespaced: true,
  state: {
    mapManager: null
  },
  mutations: {
    setMapManager(state, mapManager) {
      state.mapManager = mapManager;
    }
  },
  actions: {

  },
  getters: {

  }
}
