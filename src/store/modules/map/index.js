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
    selectEmergencyFeature: null, //当前选中应急预案的要素
    pageLayers:[],
    clickHandler:null,
    yuanOverlay:null
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
    pushPageLayers(state, pageLayer){
      state.pageLayers.push(pageLayer);
    },
    setPageLayers(state, pageLayers){
      state.pageLayers = pageLayers;
    },
    setClickHandler(state, clickHandler){
      state.clickHandler = clickHandler;
    },
    setOverlay(state, yuanOverlay){
      state.yuanOverlay = yuanOverlay;
    },
  },
  actions: {

  },
  getters: {

  }
}
