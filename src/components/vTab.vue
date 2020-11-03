<!-- tab页签 -->
<template>
  <div class="wrapper">
    <ul class="tab">
      <li :style="liStyle" class="tab-i" ref="tabConten" v-for="(tab, i) in tabs" :key="i" @click="toggleTab(tab, i)">
        {{ tab.name }}
      </li>
      <div :style="lineStyle" class="active-line" ref="tabLine"></div>
    </ul>
    <keep-alive>
      <component class="tab-con" :is="tabs[activeTab].component"></component>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      activeTab: 0
    }
  },
  mounted() {
    this.$nextTick().then(() => {})
  },
  props: {
    tabWidth: {
      type: String
    },
    tabs: {
      type: Array,
      required: true
    }
  },
  methods: {
    toggleTab(tab, i) {
      this.$refs.tabConten.forEach(item=>{
        item.style.color = '#666666'
      })
      //设置tab-line的位置
      this.$refs.tabLine.style.transform = 'translateX(' + 100 * i + '%)'
      //设置当前标签的颜色
      this.$refs.tabConten[i].style.color = '#2b90f3'
      this.activeTab = i
    }
  },
  computed: {
    liStyle() {
      return {
        width: this.tabWidth
      }
    },
    lineStyle() {
      return {
        width: this.tabWidth
      }
    }
  },
}
</script>
<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  .tab {
    display: flex;
    position: relative;
    flex: none;
    margin-top: 10px;
    padding-left: 0;
    .tab-i {
      height: 40px;
      border-left: none;
      box-sizing: border-box;
      text-align: center;
      cursor: pointer;
      list-style: none;
      font-size: 18px;
      line-height: 40px;
      color: #666666;
      border-right: solid 1px #ddd;
      &:first-child {
        color: #2b90f3;
      }
      &:last-child {
        border-right: solid 1px #fff;
      }
    }
    .tab-con{
      height: calc(100% - 40px);
      overflow-y: auto;
    }
  }
}
.active-line {
  position: absolute;
  bottom: 0;
  height: 3px;
  background-color: #2b90f3;
  transition: transform 0.3s;
}
</style>
