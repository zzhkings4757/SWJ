<!--谁事务 > 信用信息-->
<template>
  <div class="rs-con">
    <div class="form-group">
      <el-date-picker
        v-model="yearValue"
        type="year"
        placeholder="选择日期">
      </el-date-picker>
    </div>
    <div class="chart-wrap">
      <v-chart class="chart" :options="option1" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'XinYongXinXi',
  data() {
    return {
      yearValue: '',
      option1: null
    }
  }
}
</script>