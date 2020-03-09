<!--水环境-->
<template>
  <div class="environment item-box wrap">
    <div class="tit-style flex-item">
      <h3>水环境</h3>
      <a href="javascript:;">更多 &gt;</a>
    </div>
    <div class="pt-menu">
      <div
        class="menu-item"
        :class="{'on':menuIndex==index}"
        v-for="(item,index) in menuList"
        :key="index"
        @click="menuSwitch(index)"
      >{{item}}</div>
    </div>
    <div class="tab-wrapper scroll-view">
      <ShuiZhiGaiKuang v-if="menuIndex==0"/>
      <ShuiZhiJianCe v-if="menuIndex==1"/>
      <ShuiZhiJingHua v-if="menuIndex==2"/>
      <GongChengTiXi v-if="menuIndex==3"/>
    </div>
  </div>
</template>

<script>
import ShuiZhiGaiKuang from "./ShuiZhiGaiKuang"
import ShuiZhiJianCe from "./ShuiZhiJianCe"
import ShuiZhiJingHua from "./ShuiZhiJingHua"
import GongChengTiXi from "./GongChengTiXi"
export default {
  name: "Environment",
  components: {
    ShuiZhiGaiKuang, //水质概况
    ShuiZhiJianCe, //水质监测
    ShuiZhiJingHua, //水质净化
    GongChengTiXi //工程体系
  },
  data() {
    return {
      menuList: ["水质概况", "水质监测", "水质净化", "工程体系"],
      menuIndex: 3,
    };
  },
  
  methods: {
    menuSwitch(index) {
      this.menuIndex = index
    }
  }
};
</script>

<style scoped>
.tab-wrapper{
  height: 712px;
}
</style>