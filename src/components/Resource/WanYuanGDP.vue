<!--水资源 > 节约用水 > 万元GDP用水量-->
<template>
  <div class="page">
    <div class="menu-style3">
      <div class="menu-item" :class="{'on':menuIndex==index}" v-for="(item,index) in menuList" :key="index" @click="menuSwitch(index)">{{item}}</div>
    </div>
    <v-chart class="chart" :options="option"/>
  </div>
</template>

<script>
export default {
  name: 'WanYuanGDP',
  data() {
    return {
      menuList: ['近十年万元GDP用水量趋势图','深圳市与发达地区万元GDP用水量横向对比'],
      menuIndex: -1,
      option: null
    }
  },

  mounted() {
    this.menuSwitch(0)
  },

  methods: {
    menuSwitch(index) {
      if(this.menuIndex==index) return false
      this.menuIndex = index
      switch(index) {
        case 0:
          this.getDataOne()
          break
        case 1:
          this.getDataTwo()
          break
      }
    },

    getDataOne(){
      var that = this
      this.$axios.get(this.axiosBaseUrl + 'resource/getTenThousandGDP', {}).then(res => {
        that.setDataOne(res.data.data)
      }).catch(err => {
        console.log(err.stack)
      })
    },
    setDataOne(data){
      var years = [], series = [], legends = []
      var colors = ['#2BA3FD','#FF7B68']
      for(var y in data[0].values){
        years.push(data[0].values[y].year)
      }
      for(var i in data){
        series.push({
          type: 'line',
          name: data[i].name,
          data: data[i].values,
          lineStyle: {
            color: colors[i]
          },
          itemStyle: {
            color: colors[i]
          }
        })
        legends.push(data[i].name)
      }
      var option = {
				grid: {
					left: '60px',
					right: 0,
					top: '50px',
					bottom: '20px'
				},
        legend: {
          data: legends,
          right: 0,
          top: 10
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
          name: '单位：m²',
          nameGap: 24,
          nameTextStyle: {
            color: '#333'
          },
          min: function (value) {
              return Math.floor(value.min);
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
        series: series
      }
      this.option = option
    },

    getDataTwo() {
      this.$axios.get(this.axiosBaseUrl + 'resource/getTenThousandGDPCompareOtherCity', {}).then(res => {
        this.setDataTwo(res.data.data)
      }).catch(err => {
        console.log(err.stack)
      })
    },
    setDataTwo(data) {
      var list = data.list
      var area = [], values = []
      for(var i in list){
        area.push(list[i].name)
        values.push(list[i].value)
      }
      var option = {
				grid: {
					left: '60px',
					right: 0,
					top: '40px',
					bottom: '20px'
				},
        xAxis: {
					data: area,
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
          name: '单位：m²',
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
        series: [
          {
            type: "bar",
            barWidth: 12,
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
                    color: "#1A98B9" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#52CEE1" // 100% 处的颜色
                  }
                ]
              }
            },
            data: values,
            z: 1
          },
          {
            type: "bar",
            barWidth: 12,
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
                    color: "#3ED8E2" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#98DDFF" // 100% 处的颜色
                  }
                ]
              }
            },
            barGap: 0,
            data: values,
            z: 1
          },
          {
            name: "b",
            tooltip: {
              show: false
            },
            type: "pictorialBar",
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
                    color: "#3EC0E2" // 0% 处的颜色
                  },
                  {
                    offset: .8,
                    color: "#98EDFF" // 100% 处的颜色
                  }
                ]
              }
            },
            symbol: "triangle",
            symbolSize: ["24", "6"],
            symbolOffset: ["0", "-6"],
            symbolPosition: "end",
            //symbolRotate: 45,
            data: values,
            z: 2
          },
          {
            name: "c",
            tooltip: {
              show: false
            },
            type: "pictorialBar",
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
                    color: "#94ebfe" // 0% 处的颜色
                  },
                  {
                    offset: .8,
                    color: "#72dbf4" // 100% 处的颜色
                  }
                ]
              }
            },
            symbol: "triangle",
            symbolSize: ["24", "6"],
            symbolOffset: ["0", "0"],
            symbolPosition: "end",
            symbolRotate: 180,
            data: values,
            z: 2
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
  height: 222px;
}
</style>