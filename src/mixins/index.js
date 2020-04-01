export const mixins = {
  data: function() {
    return {
      //选择的城市---数组形式
      selectedCity: [],
      //监测点名称
      watchPointName: '',
      //展示数据的过渡效果
      showLoading: false,
      //后台传过来的数据
      sourceData: [],
      //查询结果个数
      totalSize: 0,
      //详情tip需要的所有数据
      detailInfoData: {
        type: '',
        detailMessage:{
          name: '',
          online: false,
          flagName: '',
          value: 0,
          unit: '',
          yty: 0,
          mtm: 0
        },
        chartData: []
      }
    }
  },
  methods: {

  }
}