/**
 * @description:地图数据管理
 * @author:sijianting
 * @createDate:2019/7/16 8:48
 */

export default {
  namespaced: true,
  state: {
    mapManager: null,
    emergencyAllArea: null,
    selectEmergencyFeature: null,//当前选中应急预案的要素
  },
  mutations: {
    setMapManager(state, mapManager) {
      state.mapManager = mapManager;
    },
    setEmergencyAllArea(state, emergencyAllArea) {
      state.emergencyAllArea = emergencyAllArea;
    },
    setSelectEmergencyFeature(state, selectEmergencyFeature) {
      state.selectEmergencyFeature = selectEmergencyFeature;
    },
  },
  actions: {

  },
  getters: {

  }
}