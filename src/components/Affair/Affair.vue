<!--谁事务-->
<template>
  <div class="affair item-box wrap">
		<div class="tit-style flex-item">
      <h3>水事务</h3>
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
    <div class="tab-wraper scroll-view">
      <XingZhengShenPi v-if="menuIndex==0"/>
      <XinYongXinxi v-if="menuIndex==1"/>
      <ZhengCeFaGui v-if="menuIndex==2"/>
      <ShuiZhengJianCha v-if="menuIndex==3"/>
    </div>
	</div>
</template>

<script>
import XingZhengShenPi from "./XingZhengShenPi"
import XinYongXinxi from "./XinYongXinxi"
import ZhengCeFaGui from "./ZhengCeFaGui"
import ShuiZhengJianCha from "./ShuiZhengJianCha"
export default {
  name: "Affair",
  components: {
    XingZhengShenPi,
    XinYongXinxi,
    ZhengCeFaGui,
    ShuiZhengJianCha
  },
  data() {
    return {
			menuList: ["行政审批", "信用信息", "政策法规", "水政监察"],
			menuIndex: 1,
      
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
.tab-wraper{
  height: 636px;
}
</style>