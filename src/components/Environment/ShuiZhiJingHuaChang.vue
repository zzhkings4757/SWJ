<!--水环境 > 工程体系 > 水质净化厂-->
<template>
  <div class="page">
    <div class="menu-style3">
      <div class="menu-item" :class="{'on':menuIndex==index}" v-for="(item,index) in menuList" :key="index" @click="menuSwitch(index)">{{item}}</div>
    </div>
    <v-chart class="chart" :options="option" />
  </div>  
</template>

<script>
export default {
  name: 'ShuiZhiJingHuaChang',
  data() {
    return {
      menuList: ["污水处理量", "设计规模"],
      menuIndex: -1,
      option: null
    }
  },

  created(){
    this.menuSwitch(0)
  },

  methods: {
    menuSwitch(index) {
      if(this.menuIndex == index) return false
      this.menuIndex = index
      switch(index) {
        case 0:
          this.getDataOne()
          break
      }
    },

    getDataOne(){
      this.$axios.get(this.axiosBaseUrl + "/environment/getWaterPurificationPlant", {}).then(res => {
        if(res.status==200){
          this.setDataOne(res.data.data)
        }
      }).catch(err => {
        console.log(err.stack);
      });
    },
    setDataOne(data){
      var years = [], values1 = [], values2 = []
      for(var i in data){
        years.push(data[i].year)
        values1.push(data[i].sewageTreatmentRate)
        values2.push(data[i].sewageTreatment)
      }
      var option = {
				grid: {
					left: '60px',
					right: '60px',
					top: '18%',
					bottom: '40px'
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
        yAxis: [
          {
            name: '处理量（亿吨）',
            nameGap: 30,
            nameTextStyle: {
              fontSize: 16,
              color: '#000',
              padding: [0,0,0,80]
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
          {
            name: '处理率（%）',
            nameGap: 30,
            nameTextStyle: {
              fontSize: 16,
              color: '#000',
              padding: [0,80,0]
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
          }
        ],
        tooltip: {
          show: true
        },
        series: [
          {
            name: '污水处理量',
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
              },
              barBorderRadius: [12,12,0,0]
            },
            data: values2,
          },
          {
            name: '污水处理率',
            type: "line",
            smooth: true,
            color: '#FAAD14',
            data: values1,
            yAxisIndex: 1,
          },
        ]
      }
      this.option = option
    }
  }
}
</script>

<style scoped>
.page{
  padding-top: 60px;
}
.chart{
  width: 100%;
  height: 540px;
}
</style>