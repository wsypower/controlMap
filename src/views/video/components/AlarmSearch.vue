<template>
  <div>
    <div class="search-condition">
      <a-form :form="form"  @submit="handleSearch">
        <a-form-item label="查询时间" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
          <a-range-picker @change="onChange"/>
        </a-form-item>
        <a-form-item label="水厂名称" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
          <a-input placeholder="请输入名称" v-model="searchCondition.name"/>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlarmSearch',
  data(){
    return {
      startValue: null,
      endValue: null,
    }
  },
  methods:{
    onChange(date, dateString) {
      console.log(date, dateString);
    },
  }
}
</script>

<style scoped></style>
