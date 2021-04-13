<template>
  <div class="analysis-panel">
    <div flex="fir:left cross:center" style="margin:10px 0px;">
      <label style="width: 90px;">查询时间：</label>
      <a-range-picker v-model="dayRange" format="YYYY-MM-DD" style="width: 100%" />
    </div>
    <a-button type="primary" style="width: 100%" @click="onSearch">查询</a-button>
    <div class="panel-header" flex="dir:left cross:center main:justify">
      <span class="title">违规统计</span>
    </div>
    <div class="panel-content">
      <a-table v-if="!showLoading && dataList.length > 0" :columns="columns" :data-source="dataList" :pagination="false" :scroll="{ y: maxHeight }">
        <a slot="name" slot-scope="text">{{ text }}</a>
      </a-table>
      <div v-if="!showLoading && dataList.length == 0" class="nodata-panel" flex="main:center cross:center">
        <img src="~@img/zanwudata.png" />
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
import moment from 'moment'
export default {
  name: 'CartAnalysis',
  data() {
    return {
      dataList: [],
      columns: [{
          title: '名称',
          dataIndex: 'name',
          key: 'name',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '越界',
          dataIndex: 'age',
          key: 'age',
          align: 'center'
        },
        {
          title: '超时',
          dataIndex: 'address',
          key: 'address 1',
          align: 'center'
        }
      ],
      dayRange: [],
      showLoading: false,
      maxHeight: 200
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.maxHeight = document.documentElement.clientHeight - 280;
      let day = moment(new Date()).format('YYYY-MM-DD');
      this.dayRange = [moment(day, 'YYYY-MM-DD'), moment(day, 'YYYY-MM-DD')];
    });
  },
  methods: {
    onSearch() {
      this.showLoading = true;
      this.dataList = [];
      let startTime = this.dayRange[0] ? this.dayRange[0]._d.getTime() : '';
      let endTime = this.dayRange[1] ? this.dayRange[1]._d.getTime() : '';
      this.dataList = [{
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 2 Lake Park, London No. 2 Lake Park',
          tags: ['loser'],
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
        {
          key: '21',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 2 Lake Park, London No. 2 Lake Park',
          tags: ['loser'],
        },
        {
          key: '31',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
        {
          key: '29',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 2 Lake Park, London No. 2 Lake Park',
          tags: ['loser'],
        },
        {
          key: '32',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
        {
          key: '22',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 2 Lake Park, London No. 2 Lake Park',
          tags: ['loser'],
        },
        {
          key: '33',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
        {
          key: '23',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 2 Lake Park, London No. 2 Lake Park',
          tags: ['loser'],
        },
        {
          key: '34',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
        {
          key: '24',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 2 Lake Park, London No. 2 Lake Park',
          tags: ['loser'],
        },
        {
          key: '35',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
        {
          key: '25',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 2 Lake Park, London No. 2 Lake Park',
          tags: ['loser'],
        },
        {
          key: '36',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
        {
          key: '26',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 2 Lake Park, London No. 2 Lake Park',
          tags: ['loser'],
        },
        {
          key: '37',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
        {
          key: '27',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 2 Lake Park, London No. 2 Lake Park',
          tags: ['loser'],
        },
        {
          key: '38',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
        {
          key: '28',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 2 Lake Park, London No. 2 Lake Park',
          tags: ['loser'],
        },
        {
          key: '39',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        }
      ];
      this.showLoading = false;
    }
  }
}
</script>
<style lang="scss" scoped>
.analysis-panel {
  width: 100%;
  height: 100%;
  padding-top: 6px;

  .panel-header {
    width: 100%;
    height: 30px;

    .title {
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      color: #333333;
    }
  }

  .panel-content {
    width: 100%;
    height: calc(100% - 30px);
    background-color: #f5f5f5;

    ::v-deep .ant-table-wrapper {
      height: 100%;
    }

    .nodata-panel {
      width: 100%;
      height: 100%;
    }
  }
}
</style>