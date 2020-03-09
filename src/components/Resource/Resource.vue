<!--水资源-->
<template>
  <div class="resource item-box wrap">
    <div class="tit-style flex-item">
      <h3>水资源</h3>
      <a href="javascript:;">更多 &gt;</a>
    </div>
    <div class="pt-menu">
      <div
        class="menu-item"
        :class="{'on':menuIndex==index}"
        v-for="(item,index) in menuList"
        :key="index"
        @click="itemSwitch(index)"
      >{{item}}</div>
    </div>
    <div class="tab-wrapper scroll-view">
      <ShuiZiYuanTongJi v-if="menuIndex==0"/>
      <ShuiZiYuanXinXi v-if="menuIndex==1"/>
      <YinShuiGongShui v-if="menuIndex==2"/>
      <GongChengQingKuang  v-if="menuIndex==3"/>
    </div>
  </div>
</template>

<script>
import ShuiZiYuanTongJi from "./ShuiZiYuanTongJi"
import ShuiZiYuanXinXi from "./ShuiZiYuanXinXi"
import YinShuiGongShui from "./YinShuiGongShui"
import GongChengQingKuang from "./GongChengQingKuang"
export default {
  name: "Resource",
  components: {
    ShuiZiYuanTongJi, //水资源统计
    ShuiZiYuanXinXi, //水资源信息
    YinShuiGongShui, //水资源统计
    GongChengQingKuang //工程情况
  },
  data() {
    return {
      menuList: ["水资源统计", "水资源信息", "引水供水", "工程情况"],
      menuIndex: 0,
    };
  },
  
  methods: {
    itemSwitch(index){
      this.menuIndex = index
    }
  }
};
</script>

<style scoped>
.tab-wrapper{height: 730px;}
</style>