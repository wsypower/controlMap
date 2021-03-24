<template>
  <div class="manage">
    <!-- <content-tabs :tabData="tabData"></content-tabs> -->
    <a-tabs @change="changeTab" class="content_tab">
      <a-tab-pane tab="部件查看" key="1">
        <part-list ref="partList"></part-list>
      </a-tab-pane>
      <a-tab-pane tab="框选查询" key="2">
        <part-query ref="partQuery"></part-query>
      </a-tab-pane>
    </a-tabs>
    <!-- <div class="page-header">
      <span class="larger">部件</span>
    </div>
    <partList></partList> -->
  </div>
</template>
<script>
import partList from './PartList.vue'
import partQuery from './PartQuery.vue'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'part',
  components: {
    partList,
    partQuery
  },
  data() {
    return {
      tabData: [{
          name: '部件查看',
          component: partList,
          hasScroll: false
        },
        {
          name: '框选查询',
          component: partQuery,
          hasScroll: false
        }
      ]
    }
  },
  computed: {
    ...mapState('cgadmin/menu', ['activeModule']),
    message() {
      return 'part'
    }
  },
  mounted() {},
  methods: {
    changeTab(val) {
      if (val == 1) {
        this.$refs.partQuery.changeStatus(false);
        this.$refs.partList.changeStatus(true);
      } else if (val == 2) {
        this.$refs.partList.changeStatus(false);
        if (this.$refs.partQuery) {
          this.$refs.partQuery.changeStatus(true);
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.manage {
  width: 100%;
  padding: 20px;
  height: 100%;
}

.content_tab {
  height: 100%;

  ::v-deep.ant-tabs-nav-scroll {
    height: 44px;
  }

  ::v-deep.ant-tabs-nav {
    border: 1px solid #dddddd;

    .ant-tabs-tab {
      padding: 10px;
      font-size: 14px !important;
      color: #333333;
      border-right: solid 1px #dddddd;

      &:last-child {
        border-right: unset;
      }
    }

    .ant-tabs-tab-active {
      background-color: #ffffff;
    }

    .ant-tabs-ink-bar {
      top: 0px;
    }
  }

  ::v-deep.ant-tabs-bar {
    background-color: #f5f7f8 !important;
    margin-bottom: 0px !important;
    padding: 0px !important;

    .ant-tabs-nav {
      width: 100%;

      .ant-tabs-tab {
        width: 50% !important;
        text-align: center;
        margin: 0px;
      }
    }
  }

  ::v-deep.ant-tabs-content {
    height: calc(100% - 45px) !important;

    .ant-tabs-tabpane {
      position: relative;
      height: 100%;
    }
  }
}
</style>