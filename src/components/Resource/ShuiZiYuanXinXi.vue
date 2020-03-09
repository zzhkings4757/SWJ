<!--水资源 > 水资源-->
<template>
  <div class="page">
    <div class="rs-con">
      <ul class="statistics">
        <li>
          <div class="inner-box">
            <h5>全市供水量</h5>
            <h2>{{waterSupply}}万m³</h2>
          </div>
        </li>
        <li>
          <div class="inner-box">
            <h5>东部工程饮水量</h5>
            <h2>{{fromEast}}</h2>
          </div>
        </li>
        <li>
          <div class="inner-box">
            <h5>东深工程饮水量(深圳)</h5>
            <h2>{{fromDongshen}}</h2>
          </div>
        </li>
        <li>
          <div class="inner-box">
            <h5>境外饮水总量</h5>
            <h2>{{fromOutside}}</h2>
          </div>
        </li>
      </ul>
    </div>
    <div class="pt-menu rs-menu mt20">
      <div class="menu-left">
        <div
          class="menu-item"
          :class="{'on':chartIndex==index}"
          v-for="(item,index) in menuChart"
          :key="index"
        >{{item}}</div>
      </div>
      <div class="menu-form">
        <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
      </div>
    </div>
    <div class="rs-con flex-item">
      <div class="volume-chart">
        <v-chart class="volume-chart" :options="option" />
      </div>
      <div class="volume-bar">
        <h4>排名</h4>
        <ul>
          <li v-for="(item,index) in rankList" :key="index">
            <span>{{index+1}}</span>
            <p>{{item.name}}</p>
            <i>{{item.value}}</i>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShuiZiYuanXinXi",
  data() {
    return {
      menuChart: ["分区供水量", "分区蓄水量"],
      chartIndex: 0,
      value1: "",
      waterSupply: 0,
      fromEast: 0,
      fromDongshen: 0,
      fromOutside: 0,
      option: null,
			rankList: []
    }
  },

  mounted(){
    this.setStatisticsData()
    this.setSupplyData()
  },

  methods: {
    //水资源信息
    setStatisticsData(){
      var that = this
      this.$axios.get(this.axiosBaseUrl+'getTotal.json').then(res => {
        if(res.status==200){
          var data = res.data.data
          that.waterSupply = data.waterSupply
          that.fromEast = data.fromEast
          that.fromDongshen = data.fromDongshen
          that.fromOutside = data.fromOutside
        }
      }).catch(err => {
        console.log(err.stack)
      })
    },
    setSupplyData(){
      var that = this
      this.$axios.get(this.axiosBaseUrl+'getSupplyByDist.json').then(res => {
        if(res.status==200){
          that.setSupplyChart(res.data.data)
        }
      }).catch(err => {
        console.log(err.stack)
      })
    },
    setSupplyChart(data){
      var areas = []
      var values = []
      for(var i in data){
        areas.push(data[i].name)
        values.push(data[i].value)
      }
      var option = {
				grid: {
					left: '50px',
					right: 0,
					top: '10%',
					bottom: '50px'
				},
        xAxis: {
					data: areas,
					axisLine: {
						lineStyle: {
							color: '#D9D9D9'
						}
					},
					axisLabel: {
						color: '#666'
					}
        },
        yAxis: {
					name: '水量 (万m³）',
					nameGap: 30,
					axisLine: {
						show: false
					},
					axisTick: {
						show: false
					},
					splitLine: {
						lineStyle: {
							color: '#E8E8E8',
							type: 'dashed'
						}
					}
        },
        tooltip: {
          show: true
        },
        series: [
          {
            type: "bar",
            barWidth: 24,
            legendHoverLink: false,
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "#1677D0" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#27C9F4" // 100% 处的颜色
                  }
                ]
              }
            },
            data: values,
            z: 1
          },
          {
            name: "b",
            type: "pictorialBar",
            tooltip: {
              show: false
            },
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: .4,
                y2: .6,
                colorStops: [
                  {
                    offset: 0,
                    color: "#1677D0" // 0% 处的颜色
                  },
                  {
                    offset: .8,
                    color: "#27C9F4" // 100% 处的颜色
                  }
                ]
              }
            },
            symbol: "circle",
            symbolSize: ["24", "8"],
            symbolOffset: ["0", "-4"],
            symbolPosition: "end",
            data: values,
            z: 2
          }
        ]
      }
      this.option = option
      this.rankList = data.sort((a,b)=>b.value-a.value)
    }
  }
};
</script>