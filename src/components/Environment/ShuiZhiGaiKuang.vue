<!--水环境 > 水质概况-->
<template>
  <div class="rs-con">
    <div class="menu-style">
      <div class="menu-item" :class="{'on':menuIndex==index}" v-for="(item,index) in menuList" :key="index" @click="menuSwitch(index)">{{item}}</div>
    </div>
    <div class="tab-wrap">
      <ShuiZhiGaiKuangChart/>
    </div>
  </div>  
</template>

<script>
import ShuiZhiGaiKuangChart from "./ShuiZhiGaiKuangChart"
export default {
  name: 'ShuiZhiGaiKuang',
  components: {
    ShuiZhiGaiKuangChart
  },
  data() {
    return {
      menuList: ["水质概况", "水源地水质", "河流水质", "海域水质"],
      menuIndex: 0
    }
  },

  methods: {
    menuSwitch(index) {
      this.menuIndex = index
    }
  }
}
</script>