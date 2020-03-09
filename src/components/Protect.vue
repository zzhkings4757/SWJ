<template>
  <div class="project item-box wrap">
		<div class="tit-style flex-item">
      <h3>水安全</h3>
      <a href="javascript:;">更多 &gt;</a>
    </div>
    <div class="pt-menu">
      <div
        class="menu-item"
        :class="{'on':menuIndex==index}"
        v-for="(item,index) in menuList"
        :key="index"
      >{{item}}</div>
    </div>
		<div class="rs-con">
      <ul class="legend">
        <li v-for="(item,index) in legend" :key="index">
          <span :style="{'background-color': item.color}"></span>
          <p>{{item.text}}</p>
        </li>
      </ul>
      <v-chart class="swyj" :options="swyjOption" />
    </div>
    <div class="pt-menu">
      <div
        class="menu-item"
        :class="{'on':menuIndex2==index}"
        v-for="(item,index) in menuList2"
        :key="index"
      >{{item}}</div>
    </div>
    <div class="rs-con">
      <v-chart class="sksw" :options="skswOption" />
    </div>
	</div>
</template>

<script>
import chartImg from "../assets/images/chart_icon1.png"
export default {
  name: "Project",
  data() {
    return {
			menuList: ["水位预警", "雨量统计", "工程安全", "三防保障", "水质安全"],
      menuIndex: 0,
      legend: [
        {text: '正常', color: '#2BA3FD'},
        {text: '接近汛限/警戒', color: '#FAAD14'},
        {text: '超汛限/警戒', color: '#F5222D'}
      ],
      menuList2: ["水库水位", "河道水位", "积涝点水位"],
      menuIndex2: 0,
      swyjOption: null,
      skswOption: null,
		};
  },
  mounted(){
    this.getLevelWarning()
    this.getWaterLevel()
    
  },
  methods: {
    getLevelWarning(){
      var that = this
      this.$axios.get(this.axiosBaseUrl+'getLevelWarning.json').then(res => {
        if(res.status==200){
          that.setLevelWarningChart(res.data.data)
        }
      }).catch(err => {
        console.log(err.stack)
      })
    },
    setLevelWarningChart(data){
      var swyjOption = {
        legend: {
            left: 'left',
            data: [ '正常']
        },
				grid: {
					left: '0',
					right: '10%',
					top: '30%',
					bottom: '50px'
				},
        xAxis: {
          show: false,
          data: [1,2,3],
        },
        yAxis: {
					show: false
        },
        series: [
          {
            name: "a",
            tooltip: {
              show: false
            },
            type: "pictorialBar",
            barGap: '-100%',
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
                    color: "#3fcdfb" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#80f4fd" // 100% 处的颜色
                  }
                ]
              }
            },
            symbol: "circle",
            symbolSize: ["176", "48"],
            symbolOffset: ["0", "-12"],
            symbolPosition: "end",
            data: [10, 10, 10],
            z: 1
          },
          {
            type: "bar",
            barWidth: 176,
            legendHoverLink: false,
            stack: true,
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
                    color: '#3fcdfb' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#80f4fd" // 100% 处的颜色
                  }
                ]
              },
            },
            data: [60, 60, 60],
            z: 2
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
                    color: "#1676cf" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#14b7dd" // 100% 处的颜色
                  }
                ]
              }
            },
            symbol: "circle",
            symbolSize: ["176", "48"],
            symbolOffset: ["0", "-24"],
            symbolPosition: "end",
            data: [60, 60, 60],
            z: 3
          },
          {
            type: "bar",
            barWidth: 176,
            legendHoverLink: false,
            stack: true,
            label: {
              show: true,
              position: ['120%', '-30%'],
              formatter: function(params){
                var index = params.dataIndex;
                var chartData = data[index]
                if(chartData.yellowwarning)chartData.warning = chartData.yellowwarning
                var a = "{a|"+chartData.normal+"个}"
                var b = "{b|"+chartData.warning+"个}"
                var c = "{c|"+chartData.over+"个}"
                return a+"\n"+b+"\n"+c
              },
              rich: {
                a: {
                  color: "#2BA3FD",
                  fontSize: 24,
                  lineHeight: 48
                },
                b: {
                  color: "#FAAD14",
                  fontSize: 24,
                  lineHeight: 48
                },
                c: {
                  color: "#F5222D",
                  fontSize: 24,
                  lineHeight: 48
                }
              }
            },
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
                    color: '#1676cf' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#14b7dd" // 100% 处的颜色
                  }
                ]
              },
            },
            data: [20,20,20],
            z: 4
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
                    color: "#2aa6fd" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#27d3fb" // 100% 处的颜色
                  }
                ]
              }
            },
            symbol: "circle",
            symbolSize: ["176", "48"],
            symbolOffset: ["0", "-24"],
            symbolPosition: "end",
            data: [80, 80, 80],
            z: 5
          },
        ]
      }
      this.swyjOption = swyjOption
    },

    getWaterLevel(){
      var that = this
      this.$axios.get(this.axiosBaseUrl+'waterLevel.json').then(res => {
        if(res.status==200){
          that.setLevelChart(res.data.data)
        }
      }).catch(err => {
        console.log(err.stack)
      })
    },
    setLevelChart(data){
      var types =[]
      var values = []
      for(var i in data){
        types.push(data[i].waterkandname)
        values.push(data[i].normalcount)
      }
      var option = {
				grid: {
					left: '50px',
					right: 0,
					top: '10%',
					bottom: '50px'
				},
        xAxis: {
					data: types,
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
            barWidth: 56,
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
                    color: "#3dbfea" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#3ddaf0" // 100% 处的颜色
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
            symbol: "image://" + chartImg,
            symbolSize: ["56", "39"],
            symbolOffset: ["0", "-8"],
            symbolPosition: "end",
            data: values,
            z: 2
          }
        ]
      }
      this.skswOption = option
    }
  }
};
</script>

<style scoped>
.swyj{
  width: 100%;
  height: 240px;
}
.sksw{
  width: 100%;
  height: 450px;
}
</style>