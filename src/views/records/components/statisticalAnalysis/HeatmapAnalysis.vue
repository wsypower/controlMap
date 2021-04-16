<template>
  <div class="analysis-panel">
    <div class="search-bar" flex="dir:left cross:center">
      <div class="search-item">
        <span class="title">粒度：</span>
        <a-select v-model="selectDate" placeholder="请选择" class="select-item" @change="selectDateChange" :dropdownMenuStyle="dropdownMenuStyle">
          <a-select-option v-for="(item, index) in dateList" :value="item.value" :key="index">{{ item.name }}</a-select-option>
        </a-select>
      </div>
      <div class="search-item">
        <span class="title">案件来源分布：</span>
        <a-select v-model="selectSource" placeholder="请选择" class="select-item" @change="selectSourceChange" :dropdownMenuStyle="dropdownMenuStyle">
          <a-select-option v-for="(item, index) in sourceList" :value="item.value" :key="index">{{ item.name }}</a-select-option>
        </a-select>
      </div>
      <div flex="dir:left cross:center" class="search-item">
        <span class="title">颜色对应案件密度：</span>
        <div flex="dir:left cross:center" class="legend-container">
          <div class="legend-item"></div>
          <div class="legend-sign">
            <span>0-5</span>
            <span>6-11</span>
            <span>12-17</span>
            <span>18-20</span>
            <span>>20</span>
          </div>
        </div>
        <span class="title">（件/100m<sup>2</sup>）</span>
      </div>
    </div>
    <div flex="dir:left cross:center" class="play-bar">
      <a-icon v-show="!isPlay" type="play-circle" theme="twoTone" @click="playHandler" />
      <a-icon v-show="isPlay" type="pause-circle" theme="twoTone" @click="pauseHandler" />
      <div class="slider-container">
        <a-slider :marks="marks" :tipFormatter="tipFormatterFun" v-model="sliderValue" :min="minValue" :max="maxValue" :step="stepValue" @change="changeSliderValue" />
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions, mapState } from 'vuex'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { Vector as VectorSource } from 'ol/source'
import { Heatmap as HeatmapLayer } from 'ol/layer'
import moment from 'moment'
import { getRecordsSource, getRecordsLocation } from '@/api/records/statistical'
export default {
  name: 'HeatmapAnalysis',
  data() {
    return {
      map: null,
      dataArr: [],
      minValue: 0,
      maxValue: 24,
      stepValue: 1,
      sliderValue: 0,
      marks: {},
      isPlay: false,
      interval: null,
      heatmapSource: new VectorSource(),
      heatmapLayer: null,
      sourceList: [{
        name: '所有',
        value: 'all'
      }],
      selectSource: 'all',
      dateList: [{
        name: '1天',
        value: 'day'
      }, {
        name: '1周',
        value: 'week'
      }, {
        name: '1月',
        value: 'month'
      }, {
        name: '1年',
        value: 'year'
      }],
      selectDate: 'day',
      dropdownMenuStyle: {
        maxHeight: '60px'
      }
    }
  },
  mounted() {
    this.map = this.mapManager.getMap();
    this.heatmapLayer = new HeatmapLayer({
      source: this.heatmapSource
    });
    this.map.addLayer(this.heatmapLayer);
    getRecordsSource().then(res => {
      res = eval('(' + res + ')');
      const result = res.result;
      for (let key in result) {
        this.sourceList.push({
          name: result[key],
          value: key
        });
      }
    });
    this.selectDateChange();
  },
  computed: {
    ...mapState('map', ['mapManager']),
  },
  methods: {
    playHandler() {
      this.isPlay = true;
      if (this.interval) {
        clearInterval(this.interval);
      }
      if (this.sliderValue == this.maxValue) {
        this.sliderValue = this.minValue;
      }
      this.setQueryInterval();
    },
    setQueryInterval() {
      this.queryEventData();
      this.interval = setInterval(() => {
        this.sliderValue += this.stepValue;
        this.queryEventData();
        if (this.sliderValue == this.maxValue) {
          this.pauseHandler();
        }
      }, 5 * 1000);
    },
    pauseHandler() {
      this.isPlay = false;
      if (this.interval) {
        clearInterval(this.interval);
      }
    },
    changeSliderValue() {
      console.log('changeSliderValue', this.sliderValue);
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.setQueryInterval();
    },
    tipFormatterFun(val) {
      if (this.selectDate == 'day') {
        return moment(val).format('HH:mm');
      } else {
        return moment(val).format('MM-DD');
      }
    },
    selectSourceChange() {
      this.selectDateChange();
    },
    selectDateChange() {
      this.pauseHandler();
      this.marks = {};
      let startStr = null;
      let startMs = null;
      if (this.selectDate == 'day') {
        startStr = moment().startOf('day').format('HH:mm');
        startMs = moment().startOf('day').valueOf();
        this.minValue = startMs;
        this.sliderValue = this.minValue;
        for (let i = 0; i <= 24; i++) {
          if (i % 2 === 0) {
            this.marks[startMs] = startStr;
            if (i == 24) {
              this.marks[startMs] = '24:00';
              this.maxValue = startMs;
            }
          } else {
            this.marks[startMs] = '';
          }
          startMs += 1 * 60 * 60 * 1000;
          startStr = moment(startMs).format('HH:mm');
        }
        this.stepValue = 1 * 60 * 60 * 1000;
      } else if (this.selectDate == 'week') {
        startStr = moment().startOf('week').format('MM-DD');
        startMs = moment().startOf('week').valueOf();
        this.minValue = startMs;
        this.sliderValue = this.minValue;
        for (let i = 0; i < 7; i++) {
          this.marks[startMs] = startStr;
          if (i == 6) {
            this.maxValue = startMs;
          }
          startMs += 24 * 60 * 60 * 1000;
          startStr = moment(startMs).format('MM-DD');
        }
        this.stepValue = 24 * 60 * 60 * 1000;
      } else if (this.selectDate == 'month') {
        startStr = moment().startOf('month').format('MM-DD');
        startMs = moment().startOf('month').valueOf();
        const days = moment().daysInMonth();
        this.minValue = startMs;
        this.sliderValue = this.minValue;
        for (let i = 0; i < days; i++) {
          if (i % 3 === 0) {
            this.marks[startMs] = startStr;
          } else {
            this.marks[startMs] = '';
          }
          if (i == days - 1) {
            this.marks[startMs] = startStr;
            this.maxValue = startMs;
          }
          startMs += 24 * 60 * 60 * 1000;
          startStr = moment(startMs).format('MM-DD');
        }
        this.stepValue = 24 * 60 * 60 * 1000;
      } else if (this.selectDate == 'year') {
        startStr = moment().startOf('year').format('M月');
        startMs = 0;
        this.minValue = startMs;
        this.sliderValue = this.minValue;
        for (let i = 0; i < 12; i++) {
          this.marks[startMs] = startStr;
          if (i == 11) {
            this.marks[startMs] = startStr;
            this.maxValue = startMs;
          }
          startMs += 1;
          startStr = moment().startOf('year').add(startMs, 'months').format('M月');
        }
        this.stepValue = 1;
      }
    },
    queryEventData() {
      let starTime = this.sliderValue;
      let endTime = this.sliderValue + this.stepValue;
      if (this.selectDate == 'year') {
        starTime = moment().startOf('year').add(this.sliderValue, 'months').valueOf();
        endTime = moment().startOf('year').add(this.sliderValue + 1, 'months').valueOf();
      }
      const queryParams = {
        starTime: starTime,
        endTime: endTime,
        source: this.selectSource == 'all' ? null : parseInt(this.selectSource)
      };
      getRecordsLocation(queryParams).then(result => {
        this.heatmapSource.clear();
        const features = [];
        if (result && result.length > 0) {
          result.forEach((item) => {
            if (item.x && item.x.length > 0 && item.y && item.y.length > 0) {
              const feature = new Feature({
                geometry: new Point([parseFloat(item.x), parseFloat(item.y)])
              });
              features.push(feature);
            }
          });
          this.heatmapSource.addFeatures(features);
        }
      });
    }
  },
  destroyed() {
    this.pauseHandler();
    this.map.removeLayer(this.heatmapLayer);
  }
}
</script>
<style lang="scss" scoped>
.analysis-panel {
  position: absolute;
  z-index: 999;
  padding: 10px 15px;
  bottom: 10px;
  left: 430px;
  box-shadow: 0px 2px 10px 0px rgba(6, 61, 114, 0.2);
  border-radius: 4px;
  background: white;

  .search-bar {
    width: 100%;
    border-bottom: 1px solid #ccc;
    padding-bottom: 5px;

    &>:nth-child(n+2) {
      margin-left: 15px;
    }

    .search-item {
      &>:nth-child(n+2) {
        margin-left: 5px;
      }
    }

    .title {
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      color: #333333;
    }

    .select-item {
      flex: 1;
      width: 100px;
    }

    .legend-container {
      width: 200px;
      flex-flow: column;
      padding-top: 22px;

      .legend-item {
        width: 100%;
        height: 6px;
        border-radius: 5px;
        background: linear-gradient(to right, #00f, #0ff, #0f0, #ff0, #f00);
      }

      .legend-sign {
        width: 100%;
        display: flex;
        justify-content: space-around;
      }
    }
  }

  .play-bar {
    i {
      color: #2bbdf3;
      font-size: 26px;
      cursor: pointer;
    }

    .slider-container {
      width: 100%;
      padding-left: 15px;
      padding-right: 15px;

      ::v-deep .ant-slider-rail {
        background: #CDCDC1;
      }

      ::v-deep .ant-slider-handle {
        background-color: #1890ff;
      }

      ::v-deep .ant-slider-dot {
        background-color: #CDCDC1;
        border: 2px solid #CDCDC1;
      }

      ::v-deep .ant-slider-dot-active {
        background-color: #1890ff;
        border: 2px solid #1890ff;
      }

      ::v-deep .ant-slider-track {
        background-color: #1890ff;
      }

      ::v-deep .ant-slider-mark span:last-child {
        white-space: nowrap;
      }
    }
  }
}
</style>