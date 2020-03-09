<!--水环境 > 水质净化-->
<template>
  <div class="page">
    <div class="rs-con">
      <v-chart class="progress-chart" :options="option" />
    </div>
    <div class="rs-con padTop0 flex-item">
      <div class="handle-wrap">
        <div class="chart-title">
          <h4>污水处理厂处理水量 (万立方米）</h4>
        </div>
        <v-chart class="handle" :options="treatmentOption" />
      </div>
      <div class="cod-wrap">
        <div class="chart-title flex-item">
          <h4>污水处理厂进出水COD浓度 (mg/L）</h4>
          <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
        </div>
        <v-chart class="cod" :options="codOption" />
      </div>
    </div>
  </div>  
</template>

<script>
import chartImg from "../../assets/images/chart_icon2.png"
export default {
  name: 'ShuiZhiJingHua',
  data() {
    return {
      value1: '',
      option: {
        grid: {
          left: "50px",
          right: 0,
          top: "50%",
          bottom: "50px"
        },
        xAxis: {
          data: ["0", "1", "2"],
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
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
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        series: [
          {
            name: "a",
            tooltip: {
              show: false
            },
            type: "pictorialBar",
            symbol: "circle",
            symbolSize: ["176", "48"],
            symbolOffset: ["0", "-24"],
            label: {
              show: true,
              position: ["18%", "-80%"],
              formatter: [
                "{a|{b}}",
                "{b|{c}%}"
              ].join("\n"),
              rich: {
                a: {
                  color: "#8c8c8c",
                  lineHeight: 20
                },
                b: {
									fontSize: 24,
                  height: 36
                }
              }
            },
            data: [
              {
                name: "宝安总体进度",
                value: 100,
                itemStyle: {
                  normal: {
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
                          offset: 1,
                          color: "#FFD98F" // 100% 处的颜色
                        }
                      ]
                    }
                  }
                }
              },
              {
                name: "龙岗总体进度",
                value: 100,
                itemStyle: {
                  normal: {
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 0,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#77AEF7" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#C7DEFF" // 100% 处的颜色
                        }
                      ]
                    }
                  }
                }
              },
              {
                name: "龙华总体进度",
                value: 100,
                itemStyle: {
                  normal: {
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 0,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#72EEB6" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#C0FED1" // 100% 处的颜色
                        }
                      ]
                    }
                  }
                }
              }
            ],
            z: 5
          },
          {
            name: "b",
            tooltip: {
              show: false
            },
            type: "pictorialBar",
            symbol: "rect",
            symbolSize: ["176", "24"],
            symbolOffset: ["0", "0"],
            symbolPosition: "end",
            data: [
              {
                value: 100,
                itemStyle: {
                  normal: {
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
                          color: "#FFCF88" // 100% 处的颜色
                        }
                      ]
                    }
                  }
                }
              },
              {
                value: 100,
                itemStyle: {
                  normal: {
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 0,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#5B98EA" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#A8C6F1" // 100% 处的颜色
                        }
                      ]
                    }
                  }
                }
              },
              {
                value: 100,
                itemStyle: {
                  normal: {
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 0,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#50D396" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#A9F1BF" // 100% 处的颜色
                        }
                      ]
                    }
                  }
                }
              }
            ],
            z: 3
          },
          {
            name: "c",
            tooltip: {
              show: false
            },
            type: "pictorialBar",
            symbol: "circle",
            symbolSize: ["176", "48"],
            symbolOffset: ["0", "0"],
            symbolPosition: "end",
            data: [
              {
                value: 100,
                itemStyle: {
                  normal: {
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
                          color: "#FFCF88" // 100% 处的颜色
                        }
                      ]
                    }
                  }
                }
              },
              {
                value: 100,
                itemStyle: {
                  normal: {
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 0,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#5B98EA" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#A8C6F1" // 100% 处的颜色
                        }
                      ]
                    }
                  }
                }
              },
              {
                value: 100,
                itemStyle: {
                  normal: {
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 0,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#50D396" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#A9F1BF" // 100% 处的颜色
                        }
                      ]
                    }
                  }
                }
              }
            ],
            z: 1
          }
        ]
      },
      treatmentOption: null,
      codOption: null,
    }
  },

  mounted(){
    this.getTreatmentWater()
    this.getSewageCOD()
  },
  
  methods: {
    getTreatmentWater(){
      var that = this
      this.$axios.get(this.axiosBaseUrl+'getTreatmentWater.json').then(res => {
        if(res.status==200){
          that.setTreatmentWaterChart(res.data.data)
        }
      }).catch(err => {
        console.log(err.stack)
      })
    },
    setTreatmentWaterChart(data){
      var areas = []
      var values = []
      for(var i in data){
        areas.push(data[i].name)
        values.push(data[i].avg)
      }
      var option = {
				grid: {
					left: '60px',
					right: 0,
					top: '10%',
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
            name: "污水处理厂处理水量",
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
            symbol: "image://"+chartImg,
            symbolSize: ["24", "100%"],
            symbolOffset: ["0", "0"],
            symbolPosition: "end",
            data: values,
            z: 2
          },
          {
            name: "a",
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
                    color: "#24C4C4" // 0% 处的颜色
                  },
                  {
                    offset: .8,
                    color: "#98FFFF" // 100% 处的颜色
                  }
                ]
              }
            },
            symbol: "circle",
            symbolSize: ["8", "8"],
            symbolOffset: ["0", "4"],
            symbolPosition: "end",
            data: values,
            z: 2
          }
        ]
      }
      this.treatmentOption = option
    },

    getSewageCOD(){
      var that = this
      this.$axios.all([
        this.$axios.get(this.axiosBaseUrl+'getSewageCODdeepin.json'),
        this.$axios.get(this.axiosBaseUrl+'getSewageCODdeepout.json')
      ]).then(this.$axios.spread(function (resIn,resOut) {
        if(resIn.status==200&&resOut.status==200){
          that.setSewageCODChart(resIn.data.data,resOut.data.data)
        }
      })).catch(err => {
        console.log(err.stack)
      })
    },
    setSewageCODChart(dataIn){
      var areas = []
      var values = []
      for(var i in dataIn.sewageCODdeep){
        areas.push(dataIn.sewageCODdeep[i].name)
        values.push(dataIn.sewageCODdeep[i].value)
      }
      var option = {
				grid: {
					left: '60px',
					right: 0,
					top: '10%',
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
      this.codOption = option
    }
  }
}
</script>

<style scoped>
.handle-wrap{
  width: 640px;
  height: 400px;
}
.handle{
  width: 100%;
  height: 400px;
}
.cod-wrap{
  width: 500px;
}
.cod{
  width: 100%;
  height: 400px;
}
.padTop0{
  padding-top: 0;
}
</style>