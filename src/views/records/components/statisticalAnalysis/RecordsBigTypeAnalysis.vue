<template>
  <div class="analysis-panel" flex="cross:center main:justify">
    <div class="type-item" flex="cross:center">
      <div class="icon blue" flex="cross:center main:center">
        <cg-icon-svg name="shijian" class="svg_icon_shijian"></cg-icon-svg>
      </div>
      <div class="mes-panel">
        <div class="title">事件数</div>
        <div class="num">{{resultData.sj}}</div>
      </div>
    </div>
    <div class="type-item" flex="cross:center">
      <div class="icon green" flex="cross:center main:center">
        <cg-icon-svg name="bujian" class="svg_icon_bujian"></cg-icon-svg>
      </div>
      <div class="mes-panel">
        <div class="title">部件数</div>
        <div class="num">{{resultData.bj}}</div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
export default {
  name: 'RecordsBigTypeAnalysis',
  data() {
    return {
      resultData: {
        sj: 0,
        bj: 0
      }
    }
  },
  mounted() {
    this.getChartData();
  },
  methods: {
    ...mapActions('records/statistical', ['getShiBuJianAnalysisData']),
    getChartData() {
      this.getShiBuJianAnalysisData().then(res => {
        console.log('getShiBuJianAnalysisData', res);
        this.resultData = res[0];
      });
      // let data = {
      //   shiJianNum: 15420,
      //   buJianNum: 14900
      // }
      // this.resultData = data;
    }
  }
}
</script>
<style lang="scss" scoped>
.analysis-panel {
  width: 100%;
  height: 50px;
  margin-top: 15px;

  .type-item {
    width: 148px;
    height: 100%;
    background-color: #f5f7f8;

    .icon {
      width: 36px;
      height: 36px;
      border-radius: 5px;
      margin: 0px 7px;

      &.blue {
        background-color: #2b90f3;
      }

      &.green {
        background-color: #50cf3f;
      }

      .svg_icon_shijian {
        width: 18px;
        height: 18px;
        color: #ffffff;
      }

      .svg_icon_bujian {
        width: 18px;
        height: 18px;
        color: #ffffff;
      }
    }

    .mes-panel {
      .title {
        font-family: MicrosoftYaHei;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0px;
        color: #333333;
      }

      .num {
        font-family: MicrosoftYaHei-Bold;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 0px;
        color: #333333;
      }
    }
  }
}
</style>