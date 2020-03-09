<!--水环境 > 工程体系-->
<template>
  <div class="rs-con">
    <div class="menu-style">
      <div
        class="menu-item"
        :class="{'on':menuIndex==index}"
        v-for="(item,index) in menuList"
        :key="index"
        @click="menuSwitch(index)"
      >{{item}}</div>
    </div>
    <div class="tab-warpper">
      <ShuiZhiJingHuaChang v-if="menuIndex==0"/>
    </div>
  </div>  
</template>

<script>
import ShuiZhiJingHuaChang from "./ShuiZhiJingHuaChang"
export default {
  name: 'GongChengTiXi',
  components: {
    ShuiZhiJingHuaChang, //水质净化厂
  },
  data() {
    return {
      menuList: ["水质净化厂", "污泥处理设施", "排水管网", "排水泵站"],
      menuIndex: 0
    }
  },

  methods: {
    menuSwitch(index) {
      this.menuIndex == index
    }
  }
}
</script>