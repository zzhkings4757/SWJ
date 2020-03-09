<!--谁事务 > 水政监察-->
<template>
  <div class="rs-con">
    <ul class="statistics">
      <li>
        <div class="inner-box">
          <h5>时间</h5>
          <el-date-picker v-model="value1" type="date" placeholder="选择日期" @change="dateChange"></el-date-picker>
        </div>
      </li>
      <li>
        <div class="inner-box">
          <h5>案件总数（件）</h5>
          <h2>{{count}}</h2>
        </div>
      </li>
      <li>
        <div class="inner-box">
          <h5>处罚金额总数</h5>
          <h2>{{fine}}</h2>
        </div>
      </li>
      <li>
        <div class="inner-box">
          <h5>处罚主体（公司）</h5>
          <h2>{{subject}}</h2>
        </div>
      </li>
    </ul>
    <div class="flex-item mt30">
      <div class="case-area">
        <v-chart class="area-chart" :options="areaOption" />
      </div>
      <div class="case-type">
        <v-chart class="type-chart" :options="typeOption" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShuiZhengJianCha',
  data() {
    return {
      value1: '',
      count: '',
      fine: '',
      subject: '',
			areaOption: null,
			typeOption: null,
    }
  },

  created() {
    this.getData()
    this.getAreaData()
    this.getTypeData()
  },

  methods: {
    getData(){
      var that = this
      this.$axios.get(this.axiosBaseUrl+'getWaterAdministrationSupervisionInfo.json').then(res => {
        if(res.status==200){
          that.count = res.data.data.count
          that.fine = res.data.data.fine
          that.subject = res.data.data.object
        }
      }).catch(err => {
        console.log(err.stack)
      })
    },

    getAreaData(){
      var that = this
      this.$axios.get(this.axiosBaseUrl+'getDistributionOfCases.json').then(res => {
        if(res.status==200){
          that.setAreaChart(res.data.data.chart)
        }
      }).catch(err => {
        console.log(err.stack)
      })
    },
    setAreaChart(data){
      var areas = []
      var values = []
      for(var i in data){
        areas.push(data[i].name)
        values.push(data[i].value)
      }
      var option = {
				grid: {
					left: '60px',
					right: 0,
					top: '18%',
					bottom: '40px'
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
					name: '案件区域分布状况（件）',
					nameGap: 30,
					nameTextStyle: {
						fontSize: 16,
						color: '#000',
						padding: [0,0,0,80]
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
          show: true,
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
                    color: "#FF7B68" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#FFD888" // 100% 处的颜色
                  }
                ]
              }
            },
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
                    color: "#FFA780" // 0% 处的颜色
                  },
                  {
                    offset: .8,
                    color: "#FFED98" // 100% 处的颜色
                  }
                ]
              }
            },
            symbol: "circle",
            symbolSize: ["12", "6"],
            symbolOffset: ["0", "-3"],
            symbolPosition: "end",
            data: values,
            z: 2
          }
        ]
      }
      this.areaOption = option
    },

    getTypeData(){
      var that = this
      this.$axios.get(this.axiosBaseUrl+'getTypeOfCases.json').then(res => {
        if(res.status==200){
          that.setTypeChart(res.data.data.list)
        }
      }).catch(err => {
        console.log(err.stack)
      })
    },
    setTypeChart(data){
      var names = []
      var values = []
      for(var i in data){
        names.push(data[i].name)
        values.push(data[i].value)
      }
      var option = {
				grid: {
					left: '60px',
					right: 0,
					top: '18%',
					bottom: '40px'
				},
        xAxis: {
					data: names,
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
					name: '案件区域分布状况（件）',
					nameGap: 30,
					nameTextStyle: {
						fontSize: 16,
						color: '#000',
						padding: [0,0,0,80]
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
      this.typeOption = option
    },

    dateChange(){
      console.log(this.value1)
    }
  }
}
</script>