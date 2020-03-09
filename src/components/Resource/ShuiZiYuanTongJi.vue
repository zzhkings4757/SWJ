<!--水资源 > 水资源统计-->
<template>
  <div class="tab-con rs-con">
    <div class="menu-style mt30">
      <div
        class="menu-item"
        :class="{'on':tongjiIndex==index}"
        v-for="(item,index) in menuTongji"
        :key="index"
        @click="tongjiSwicth(index)"
      >{{item}}</div>
    </div>
		<div class="tab-wrapper">
			<TongJi v-if="tongjiIndex==0"></TongJi>
      <JieYueYongShui v-if="tongjiIndex==1">节约用水</JieYueYongShui>
      <div v-if="tongjiIndex==2">水资源产业</div>
		</div>
  </div>
</template>

<script>
import TongJi from "./TongJi"
import JieYueYongShui from "./JieYueYongShui"
export default {
	name: 'ShuiZiYuanTongJi',
  components: {
    TongJi, //水资源统计
    JieYueYongShui, //节约用水
  },
	data(){
		return {
			menuTongji: ['水资源统计','节约用水','水资源产业'],
      tongjiIndex: 0,
		}
	},
  methods: {
    tongjiSwicth(index){
      this.tongjiIndex = index
    }
  }
}
</script>