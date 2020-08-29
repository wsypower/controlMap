
export default {
  namespaced: true,
  state: {
    dunDianQuanDaoInfo:{
      groupName: 'jidongxuncha',
      leaderPosition: '1',
      personPosition: '1',
      teamPersonList:[]
    }
  },
  getters: {
    dunDianQuanDaoInfo: state => {
      return state.dunDianQuanDaoInfo
    }
  },
  mutations: {
    // 更新服务点
    updateDunDianQuanDaoInfo(state, dunDianQuanDaoInfo) {
      state.dunDianQuanDaoInfo = JSON.parse(JSON.stringify(dunDianQuanDaoInfo));
    },
  }
};
