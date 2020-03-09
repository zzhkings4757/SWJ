<!--水资源 > 节约用水-->
<template>
  <div class="water-save">
		<div class="waterSaving-sign">
      <div class="waterSaving-sign-bg1 abs-tb">
        <div class="abs-lr">荣获称号</div>
      </div>
      <div class="waterSaving-sign-bg waterSaving-sign-bg2">
        <div class="abs-lr">国家节水型城市</div>
        <p class="abs-lr">2011年</p>
      </div>
      <div class="waterSaving-sign-bg waterSaving-sign-bg3">
        <div class="abs-lr">全国节水型社会建设示范区</div>
        <p class="abs-lr">2013年</p>
      </div>
    </div>
		<div class="quota">
			<h4>节水指标({{quota.year}})</h4>
			<ul class="statistics">
				<li>
					<div class="inner-box">
						<h5>全市万元GDP用水量为</h5>
						<h2>{{quota.GDPWater}}万m³</h2>
					</div>
				</li>
				<li>
					<div class="inner-box">
						<h5>万元工业增加值用水量为</h5>
						<h2>{{quota.ValueAddedWater}}</h2>
					</div>
				</li>
				<li>
					<div class="inner-box">
						<h5>城市供水管网损失率为</h5>
						<h2>{{quota.pipeWetworkRate}}</h2>
					</div>
				</li>
				<li>
					<div class="inner-box">
						<h5>再生水利用率为</h5>
						<h2>{{quota.recycling}}</h2>
					</div>
				</li>
				<li>
					<div class="inner-box">
						<h5>工业用水重复利用率为</h5>
						<h2>{{quota.industrialWaterRate}}万m³</h2>
					</div>
				</li>
				<li>
					<div class="inner-box">
						<h5>节水器具普及率为</h5>
						<h2>{{quota.waterWavingRate}}</h2>
					</div>
				</li>
				<li>
					<div class="inner-box">
						<h5>人均居民生活用水量为</h5>
						<h2>{{quota.domesticWater}}</h2>
					</div>
				</li>
				<li>
					<div class="inner-box">
						<h5>人均用水量为</h5>
						<h2>{{quota.perCapita}}</h2>
					</div>
				</li>
			</ul>
		</div>
		<div class="menu-style2 mt20">
			<div class="menu-item" :class="{'on':saveIndex==index}" v-for="(item,index) in saveMenu" :key="index" @click="menuSwitch(index)">{{item}}</div>
		</div>
		<div class="tab-wrapper">
			<WanYuanGDP v-if="saveIndex==0"></WanYuanGDP>
			<GouCheng v-if="saveIndex==1"></GouCheng>
			<RunJunQuShi v-if="saveIndex==2"></RunJunQuShi>
			<JieShuiZaiTi v-if="saveIndex==3"></JieShuiZaiTi>
		</div>
	</div>
</template>

<script>
import WanYuanGDP from "./WanYuanGDP"
import GouCheng from "./GouCheng"
import RunJunQuShi from "./RunJunQuShi"
import JieShuiZaiTi from "./JieShuiZaiTi"
export default {
	name: 'JieYueYongShui',
	components: {
		WanYuanGDP, //万元GDP用水量
		GouCheng, //用水量构成
		RunJunQuShi, //人均用水量趋势
		JieShuiZaiTi, //节水载体
	},
	data() {
		return {
			quota: {
				ValueAddedWater: "",
				GDPWater: "",
				domesticWater: "",
				industrialWaterRate: "",
				waterWavingRate: "",
				year: "",
				recycling: "",
				perCapita: "",
				pipeWetworkRate: ""
			},
			saveMenu: ['万元GDP用水量','用水量构成','人均用水量趋势','节水载体','水价'],
			saveIndex: 0
		}
	},
	mounted(){
		var that = this
		this.$axios.get(this.axiosBaseUrl + '/resource/getConserveWater', {})
		.then(res => {
			if(res.status==200){
				that.setQuotaData(res.data.data)
			}
		})
		.catch(err => {
			console.log(err.stack)
		})
	},

	methods: {
		setQuotaData(data){
			this.quota.ValueAddedWater = data.ValueAddedWater
			this.quota.GDPWater = data.GDPWater
			this.quota.domesticWater = data.domesticWater
			this.quota.industrialWaterRate = data.industrialWaterRate
			this.quota.waterWavingRate = data.waterWavingRate
			this.quota.year = data.year
			this.quota.recycling = data.recycling
			this.quota.perCapita = data.perCapita
			this.quota.pipeWetworkRate = data.pipeWetworkRate
		},

		menuSwitch(index){
			this.saveIndex = index
		}
	}
}
</script>

<style scoped>
.quota{
	margin-top: 20px;
}
.quota h4{
	font-size: 20px;
	margin-bottom: 5px;
}
.statistics{
	margin: 0 -5px;
	flex-wrap: wrap;
}
.statistics li{
	padding: 5px;
}
.statistics .inner-box{
	padding: 12px 24px;
}
.statistics .inner-box h2{
	font-size: 20px;
	color: #2ba3fd;
	line-height: 30px;
	height: 30px;
}
</style>