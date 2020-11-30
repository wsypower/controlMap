export default {
  namespaced: true,
  state: {
    baoZhangData:{}
  },
  getters: {
    baoZhangData: state => {
      return state.baoZhangData
    }
  },
  mutations: {
    // 更新一条保障视图数据
    updateBaoZhangMapItemData(state, baoZhangMapItemData) {
      state.baoZhangData[baoZhangMapItemData.keyPositionId] = {
        keyPositionId: '',
        positionId: '',
        mapId: '',
        mapType: '',
        drawFeature: null
      };
      state.baoZhangData[baoZhangMapItemData.keyPositionId].keyPositionId = baoZhangMapItemData.keyPositionId;
      state.baoZhangData[baoZhangMapItemData.keyPositionId].positionId = baoZhangMapItemData.positionId;
      state.baoZhangData[baoZhangMapItemData.keyPositionId].mapId = baoZhangMapItemData.mapId;
      state.baoZhangData[baoZhangMapItemData.keyPositionId].mapType = baoZhangMapItemData.mapType;
      state.baoZhangData[baoZhangMapItemData.keyPositionId].drawFeature = baoZhangMapItemData.drawFeature;

      // state.baoZhangData[baoZhangMapItemData.keyPositionId] = JSON.parse(JSON.stringify(baoZhangMapItemData));
    },

    // 删除一条保障视图数据
    deleteBaoZhangMapItemData(state, keyPositionId) {
      let index = Object.keys(state.baoZhangData).findIndex(key => keyPositionId);
      if(index>=0){
        delete state.baoZhangData[keyPositionId]
      }
    },

    // 更新全部保障视图数据
    updateBaoZhangData(state, baoZhangData) {
      state.baoZhangData = JSON.parse(JSON.stringify(baoZhangData));
    },

    //清理自身数据
    clearSelfData(state){
      Object.keys(state.baoZhangData).forEach(key => {
        state.baoZhangData[key].drawFeature = null;
      })
    }
  }
};
