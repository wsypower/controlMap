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
    hasBaoZhangItemData(state, positionId) {
      let index = Object.keys(state.baoZhangData).findIndex(key => key.split('_')[1] === positionId);
      if(index>=0){
        return true
      }
      else{
        return false
      }
    },
    //是否存在这一行
    hasLoadBaoZhangItemData(state, keyPositionId) {
      let index = Object.keys(state.baoZhangData).findIndex(key => key === keyPositionId);
      if(index>=0){
        return true
      }
      else{
        return false
      }
    },
    //获取保障视图信息
    getBaoZhangItemData(state, positionId) {
      let item = Object.keys(state.baoZhangData).find(key => key.split('_')[1] === positionId);
      return item[0]
    },
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
