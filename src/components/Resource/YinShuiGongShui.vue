<!--水资源 > 饮水供水-->
<template>
  <div class="rs-con">
    <div class="top-bar flex-item">
      <div class="menu-style">
        <div class="menu-item" :class="{'on':menuIndex==index}" v-for="(item,index) in menuList" :key="index" @click="menuSwitch(index)">{{item}}</div>
      </div>
      <div class="date-group flex-item">
        <el-select class="date-type" v-model="dateType" placeholder="请选择">
          <el-option
            v-for="item in dateOption"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-date-picker v-model="dateValue" :type="dateType" placeholder="选择日期"></el-date-picker>
      </div>  
    </div>
    <v-chart class="chart1" :options="option1"/>
    <div class="flex-item mt60">
      <h4></h4>
      <div class="date-group flex-item">
        <el-select class="date-type" v-model="dateType2" placeholder="请选择">
          <el-option
            v-for="item in dateOption"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-date-picker v-model="dateValue2" :type="dateType2" placeholder="选择日期"></el-date-picker>
      </div>  
    </div>
    <v-chart class="chart2" :options="option2"/>
  </div>
</template>

<script>
export default {
  name: 'YinShuiGongShui',
  data() {
    return {
      menuList: ['泵站水闸引水量','主要水源单位供水量'],
      menuIndex: -1,
      dateValue: '',
      dateType: 'date',
      dateOption: [
        {label: '日', value: 'date'},
        {label: '月', value: 'month'},
        {label: '年', value: 'year'},
      ],
      option1: null,
      dateValue2: '',
      dateType2: 'date',
      option2: null
    }
  },

  mounted(){
    this.menuSwitch(0)
    this.getWaterFactorySupply()
  },

  methods: {
    menuSwitch(index){
      if(this.menuIndex == index) return false
      this.menuIndex = index
      switch(index) {
        case 0:
          this.getDataOne()
          break
      }
    },

    getDataOne(){
      var that = this
      this.$axios.get(this.axiosBaseUrl + "/resource/getWaterStorageSupply").then(res => {
        if(res.status==200){
          that.setChartOne(res.data.data)
        }
      }).catch(err => {
        console.log(err.stack);
      });
    },
    setChartOne(data){
      var list = data.arrayList
      var area = [], values = []
      for(var i in list){
        area.push(list[i].name)
        values.push(list[i].value)
      }
      var option = {
        title: {
          text: '单位：' + data.unit,
          right: 0,
          textStyle: {
            color: '#999',
            fontSize: 14,
            fontWeight: 'normal'
          }
        },
				grid: {
					left: '80px',
					right: '20px',
					top: '15%',
					bottom: '20px'
				},
        yAxis: {
					data: area,
          type: 'category',
					axisLine: {
						lineStyle: {
							color: '#D9D9D9'
						}
					},
					axisLabel: {
						color: '#666'
					}
        },
        xAxis: {
          type: 'value',
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
            barWidth: 16,
            legendHoverLink: false,
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 1,
                x2: 0,
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
                y: 1,
                x2: 0,
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
            symbolSize: ["8", "16"],
            symbolOffset: ["4", "0"],
            symbolPosition: "end",
            data: values,
            z: 2
          }
        ]
      }
      this.option1 = option
    },

    getWaterFactorySupply(){
      this.$axios.get(this.axiosBaseUrl +"/resource/getWaterFactorySupply").then(res => {
        if(res.status==200){
          this.setWaterFactorySupply(res.data.data)
        }
      }).catch(err => {
        console.log(err.stack);
      })
    },
    setWaterFactorySupply(data){
      var area = [], values = []
      var list = data.list
      for(var i in list){
        area.push(list[i].warea)
        values.push(list[i].val)
      }
      var option = {
        title: {
          text: '单位：' + data.unit,
          right: 0,
          textStyle: {
            color: '#999',
            fontSize: 14,
            fontWeight: 'normal'
          }
        },
				grid: {
					left: '60px',
					right: 0,
					top: '18%',
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
      this.option2 = option
    }
  }
}
</script>

<style scoped>
.date-type{width: 100px;margin-right: 10px;}
.chart1{margin: 20px 0;height: 250px;width: 100%;}
.chart2{width: 100%;height: 250px;margin-top: 20px;}
</style>