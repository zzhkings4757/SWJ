<!--水资源 > 节约用水 > 人均用水量趋势-->
<template>
  <div class="page">
    <v-chart class="chart" :options="option" />
  </div>
</template>

<script>
export default {
  name: 'RunJunQuShi',
  data() {
    return {
      option: null
    }
  },
  
  mounted() {
    var that = this
    this.$axios.get(this.axiosBaseUrl + '/resource/getWaterPerCapita', {}).then(res => {
      if(res.status==200){
        that.setData(res.data.data)
      }
    }).catch(err => {
      console.log(err.stack)
    })
  },

  methods: {
    setData(data){
      console.log(data)
      var colors = ['#2BA3FD','#ff677d','#50D396','#9de3d0','#e7b2a5','#feb72b','#79bac1']
      var years = [], names = [], values1 = [], values2 = [], values3 = []
      for(var i in data[0].value){
        names.push(data[0].value[i].name)
      }
      for(var y in data){
        years.push(data[y].name)
        values1.push(data[y].value[0].value)
        values2.push(data[y].value[1].value)
        values3.push(data[y].value[2].value)
      }
      var option = {
				grid: {
					left: '60px',
					right: 0,
					top: '40px',
					bottom: '20px'
				},
        legend: {
          data: names,
          right: 0
        },
        xAxis: {
					data: years,
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
          name: '单位：L/d',
          nameGap: 24,
          nameTextStyle: {
            color: '#333'
          },
					axisLine: {
						lineStyle: {
							color: '#D9D9D9'
						}
					},
					axisLabel: {
						color: '#666'
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
        color: colors,
        series: [
          {
            type: 'line',
            name: names[0],
            data: values1
          },
          {
            type: 'line',
            name: names[1],
            data: values2
          },
          {
            type: 'line',
            name: names[2],
            data: values3
          }
        ]
      }
      this.option = option
    }
  }
}
</script>

<style scoped>
.chart{
  width: 100%;
  height: 250px;
}
</style>