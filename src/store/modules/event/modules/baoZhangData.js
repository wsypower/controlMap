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
    updateBaoZhangItemData(state, baoZhangItemData) {
      state.baoZhangData[baoZhangItemData.keyPositionId] = baoZhangItemData;
    },

    // 删除一条保障视图数据
    deleteBaoZhangItemData(state, keyPositionId) {
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
