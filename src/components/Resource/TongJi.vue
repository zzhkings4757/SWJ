<!--水资源 > 水资源统计 > 水资源统计-->
<template>
  <div class="tongji">
    <div class="flex-item">
      <v-chart class="chart-item" :options="option1" />
      <div class="chart-item flex-middle">
				<div class="text">
					<h3>水资源量</h3>
					<h4 v-if="waterResources.growth">同比减少:<span>{{waterResources.growth}}</span></h4>
				</div>
				<div class="svg-wrap">
					<WaterBox></WaterBox>
					<div class="svg-text flex-middle">
						<p v-if="waterResources.value">{{waterResources.value}}</p>
						<p v-if="waterResources.unit">{{waterResources.unit}}</p>
					</div>
				</div>
			</div>
			<v-chart class="chart-item" :options="option2" />
			<v-chart class="chart-item" :options="option3" />
    </div>
    <div class="average">
      <div class="menu-style2">
        <div class="menu-item" :class="{'on':averageIndex==index}" v-for="(item,index) in averageMenu" :key="index" @click="averageSwitch(index)">{{item}}</div>
      </div>
      <div class="average-wrap">
        <div class="gsl-menu menu-style3" v-if="averageIndex==3">
          <div class="menu-item" :class="{'on':gslIndex==index}" v-for="(item,index) in gslMenu" :key="index" @click="gslSwitch(index)">{{item}}</div>
        </div> 
        <v-chart ref="averageChart" class="average-chart" :options="option4"/>
      </div>
    </div>
  </div>
</template>

<script>
import WaterBox from "../WaterBox"
export default {
  name: "Tongji",
	components: { WaterBox },
  data() {
    return {
      option1: null,
			waterResources: {},
			option2: null,
			option3: null,
      averageMenu: ["各区平均年降水量", "各区水资源总量", "各区年末蓄水量", "供水量"],
      averageIndex: -1,
      option4: null,
      gslMenu: ['供水量曲线图','各区供水量曲线图'],
      gslIndex: 0
    };
  },

  mounted() {
    this.setData();
    this.averageSwitch(0)
  },

  methods: {
    setData() {
      this.$axios.get(this.axiosBaseUrl + "/resource/getBulletinRatio", {})
        .then(res => {
          //console.log(res);
          if (res.status == 200) {
            this.setJSL(res.data.data.rainfall);
						this.waterResources = res.data.data.waterResources;
						this.setXSL(res.data.data.watersSorage);
            this.setGSL(res.data.data.waterSupply);
          }
        })
        .catch(err => {
          console.log(err.stack);
        });
    },

    setJSL(data) {
      var values = [];
      var growth = Number(data.growth.replace("%", ""));
      values.push(data.value);
      var option = {
        title: {
          text: "降水量 " + "单位:" + data.unit,
          top: "20px",
          left: 0,
          textStyle: {
            fontSize: 14,
            fontWeight: "normal",
            lineHeight: 20
          }
        },
        grid: {
          left: 0,
          right: 0,
          top: "60px",
          bottom: "2%"
        },
        xAxis: {
          data: [1, 2, 3],
          axisLine: {
            lineStyle: {
              color: "#2BA3FD"
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: "#E8E8E8",
              type: "dashed"
            }
          }
        },
        tooltip: {
          show: true,
					formatter: '{a}:{c}'
        },
        series: [
          {
						name: '降水量',
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
                    color: "#ff7d68" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#ff9d74" // 100% 处的颜色
                  }
                ]
              }
            },
            data: values,
            z: 1
          },
          {
						name: '降水量',
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
                    color: "#ffb87d" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#ffce84" // 100% 处的颜色
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
						label: {
							show: true,
							formatter: '{c}',
							position: 'top'
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
                    color: "#ffae83" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#ffed98" // 100% 处的颜色
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
                x: 1,
                y: 0,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "#ffae83" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#ffed98" // 100% 处的颜色
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
          },
          {
            type: "pie",
            hoverAnimation: false,
            radius: ["36%", "50%"],
            center: ["60%", "64%"],
            detail: { formatter: "{value}%" },
            tooltip: {
              show: false
            },
            itemStyle: {
              shadowColor: "rgba(0,0,0,.15)",
              shadowBlur: 4
            },
            data: [
              {
                name: "同比减少",
                value: growth,
                itemStyle: {
                  color: "#ff7d69"
                },
                emphasis: {
                  itemStyle: {
                    color: "#ff7d69"
                  }
                },
                label: {
                  show: true,
                  position: "center",
                  formatter: ["{a|{b}}", "{b|{d}%}"].join("\n"),
                  rich: {
                    a: {
                      color: "#333",
                      fontSize: 14,
                      lineHeight: 20
                    },
                    b: {
                      color: "#ff7d69",
                      fontSize: 16,
                      lineHeight: 24
                    }
                  }
                }
              },
              {
                value: 100 - growth,
                itemStyle: {
                  color: "#f5f5f5"
                },
                emphasis: {
                  itemStyle: {
                    color: "#f5f5f5"
                  }
                }
              }
            ]
          }
        ]
      };
      this.option1 = option;
    },

		setXSL(data){
			var values = [];
      var growth = Number(data.growth.replace("%", ""));
      values.push(data.value);
      var option = {
        title: {
          text: "蓄水量 " + "单位:" + data.unit,
          top: "20px",
          left: 0,
          textStyle: {
            fontSize: 14,
            fontWeight: "normal",
            lineHeight: 20
          }
        },
        grid: {
          left: 0,
          right: 0,
          top: "70px",
          bottom: "2%"
        },
        xAxis: {
          data: [1, 2, 3],
          axisLine: {
            lineStyle: {
              color: "#2BA3FD"
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: "#E8E8E8",
              type: "dashed"
            }
          }
        },
        tooltip: {
          show: true,
					formatter: '{a}:{c}'
        },
        series: [
          {
						name: '蓄水量',
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
						name: '蓄水量',
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
						label: {
							show: true,
							formatter: '{c}',
							position: 'top'
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
                    offset: 0.8,
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
                    offset: 0.8,
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
          },
          {
            type: "pie",
            hoverAnimation: false,
            radius: ["36%", "50%"],
            center: ["60%", "64%"],
            detail: { formatter: "{value}%" },
            tooltip: {
              show: false
            },
            itemStyle: {
              shadowColor: "rgba(0,0,0,.15)",
              shadowBlur: 4
            },
            data: [
              {
                name: "同比减少",
                value: growth,
                itemStyle: {
                  color: "#2ba3fd"
                },
                emphasis: {
                  itemStyle: {
                    color: "#2ba3fd"
                  }
                },
                label: {
                  show: true,
                  position: "center",
                  formatter: ["{a|{b}}", "{b|{d}%}"].join("\n"),
                  rich: {
                    a: {
                      color: "#333",
                      fontSize: 14,
                      lineHeight: 20
                    },
                    b: {
                      color: "#2BA3FD",
                      fontSize: 16,
                      lineHeight: 24
                    }
                  }
                }
              },
              {
                value: 100 - growth,
                itemStyle: {
                  color: "#f5f5f5"
                },
                emphasis: {
                  itemStyle: {
                    color: "#f5f5f5"
                  }
                }
              }
            ]
          }
        ]
      };
      this.option2 = option;
		},

		setGSL(data){
			var option = {
        title: {
          text: "供水量 " + "单位:" + data.yearEnterpriseWaterSupply.unit,
          top: "20px",
          left: 0,
          textStyle: {
            fontSize: 14,
            fontWeight: "normal",
            lineHeight: 20
          }
        },
        grid: {
          left: '5%',
          right: 0,
          top: "70px",
          bottom: "2%"
        },
        xAxis: {
          data: [1, 2],
          axisLine: {
            lineStyle: {
              color: "#2BA3FD"
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: "#E8E8E8",
              type: "dashed"
            }
          }
        },
        tooltip: {
          show: true,
					formatter: '{b}:{c}%'
        },
        series: [
          {
            type: "bar",
            barWidth: 24,
            legendHoverLink: false,
            data: [
              {
                name: '全市供水量',
                value: data.yearEnterpriseWaterSupply.value,
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
              },
              {
                name: '全市企业供水量',
                value: data.enterpriseWaterSupply.value,
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
                        color: '#FF7B68'
                      },
                      {
                        offset: 1,
                        color: "#FFCF88"
                      }
                    ]
                  },
                },
              }
            ],
            z: 1
          },
          {
            type: "pictorialBar",
            label: {
							show: true,
							formatter: '{c}',
							position: 'top'
						},
            data: [
              {
                name: '全市供水量',
                value: data.yearEnterpriseWaterSupply.value,
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
              },
              {
                name: '全市企业供水量',
                value: data.enterpriseWaterSupply.value,
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
                        offset: 1,
                        color: "#FFD98F" // 100% 处的颜色
                      }
                    ]
                  }
                },
              }
            ],
            symbol: "circle",
            symbolSize: ["24", "12"],
            symbolOffset: ["0", "-6"],
            symbolPosition: "end",
            z: 2
          },
        ]
      };
      this.option3 = option;
		},

    getWaterStatistics() {
      this.$axios
        .get(this.axiosBaseUrl + "/resource/getAverageRainfall", {})
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err.stack);
        });
    },

    averageSwitch(index){
      if(this.averageIndex == index) return false
      this.averageIndex = index
      switch(index){
        case 0:
          this.averageNPJ()
          break
        case 1:
          this.averageSZY()
          break
        case 2:
          this.averageXSL()
          break
        case 3:
          this.gslSwitch(this.gslIndex)
          break
      }
    },

    averageNPJ(){
      var that = this
      this.$axios.get(this.axiosBaseUrl + '/resource/getAverageRainfall', {})
      .then(res => {
        if(res.status==200){
          that.setNPJChart(res.data.data)
        }
      })
      .catch(err => {
        console.log(err.stack)
      })
    },
    setNPJChart(data){
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
					top: '15%',
					bottom: '30px'
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
          name: '单位：mm',
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
      this.option4 = option
    },

    averageSZY(){
      var that = this
      this.$axios.get(this.axiosBaseUrl + '/resource/getWaterResourceTotal', {})
      .then(res => {
        if(res.status==200){
          that.setSZYChart(res.data.data)
        }
      })
      .catch(err => {
        console.log(err.stack)
      })
    },
    setSZYChart(data){
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
					top: '15%',
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
          name: '单位：万m³',
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
      this.option4 = option
    },

    averageXSL(){
      var that = this
      this.$axios.get(this.axiosBaseUrl + 'resource/getAreaWaterStorage', {})
      .then(res => {
        if(res.status==200){
          that.setXSLChart(res.data.data)
        }
      })
      .catch(err => {
        console.log(err.stack)
      })
    },
    setXSLChart(data){
      var list = data.arrayList
      var areas = []
      var name1,name2,name3
      var values1 = [],values2 = [],values3 = []
      name1 = list[0].storage[0].year
      name2 = list[0].storage[1].year
      name3 = list[0].storage[2].year
      for(var i in list){
        areas.push(list[i].name)
        values1.push(list[i].storage[0])
        values2.push(list[i].storage[1])
        values3.push(list[i].storage[2])
      }
      var option = {
				grid: {
					left: '60px',
					right: 0,
					top: '15%',
					bottom: '40px'
				},
        legend: {
          data: [name1,name2,name3]
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
          name: '单位：万m³',
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
            name: name1,
            type: 'bar',
            barWidth: 20,
            barGap: '5%',
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
              },
              barBorderRadius: [10, 10, 0, 0]
            },
            data: values1
          },
          {
            name: name2,
            type: 'bar',
            barWidth: 20,
            barGap: '5%',
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
              },
              barBorderRadius: [10, 10, 0, 0]
            },
            data: values2
          },
          {
            name: name3,
            type: 'bar',
            barWidth: 20,
            barGap: '5%',
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
                    color: "#1AB9B9" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#98FFFF" // 100% 处的颜色
                  }
                ]
              },
              barBorderRadius: [10, 10, 0, 0]
            },
            data: values3
          }
        ]
      }
      this.option4 = option
    },

    gslSwitch(index){
      this.gslIndex=index
      switch(index){
        case 0:
          this.getGSQX()
          break
        case 1:
          this.getQGSQX()
          break
      }
    },

    getGSQX(){
      var that = this
      this.$axios.get(this.axiosBaseUrl + "/resource/getWaterSupplyGraph", {})
      .then(res => {
        if(res.status==200){
          that.serGSQXChart(res.data.data)
        }
      })
      .catch(err => {
        console.log(err.stack);
      });
    },
    serGSQXChart(data){
      var years = [], values = []
      for(var i in data){
        years.push(data[i].name)
        values.push(data[i].value)
      }
      var option = {
				grid: {
					left: '60px',
					right: 0,
					top: '80px',
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
        yAxis: {
          name: '单位：亿m³',
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
        series: [
          {
            name: '供水量曲线图',
            type: 'line',
            smooth: true,
            data: values,
            itemStyle: {
              color: '#2E9BFF'
            },
            lineStyle: {
              color: '#2E9BFF'
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(46,155,255,.7)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(46,155,255,.1)" // 100% 处的颜色
                  }
                ]
              },
            }
          }
        ]
      }
      this.option4 = option
    },

    getQGSQX(){
      var that = this
      this.$axios.get(this.axiosBaseUrl + "/resource/getWaterStorageSupply", {})
      .then(res => {
        if(res.status==200){
          that.setQGSQXChart(res.data.data)
        }
      })
      .catch(err => {
        console.log(err.stack);
      });
    },
    setQGSQXChart(data){
      var list = data.arrayList
      var area = [], values = []
      for(var i in list){
        area.push(list[i].name)
        values.push(list[i].value)
      }
      var option = {
				grid: {
					left: '60px',
					right: 0,
					top: '80px',
					bottom: '40px'
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
          name: '单位：'+data.unit,
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
        series: [
          {
            name: '供水量曲线图',
            type: 'line',
            smooth: true,
            data: values,
            itemStyle: {
              color: '#FF7B68'
            },
            lineStyle: {
              color: '#FF7B68'
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(255,123,104,.7)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(255,123,104,.1)" // 100% 处的颜色
                  }
                ]
              },
            }
          }
        ]
      }
      this.option4 = option
    }
  }
};
</script>

<style scoped>
.chart-item {
  width: 24%;
  height: 240px;
	position: relative;
}
.chart-item .text{
	padding: 10px 0;
}
.chart-item .text h4{
	color: #999;
}
.chart-item .text h4 span{
	color: #2d9bff;
	font-size: 18px;
}
.svg-wrap{
	position: relative;
	width: 120px;
	height: 120px;
}
.svg-text{
	position: absolute;
	width: 100%;
	height: 100%;
	color: #fff;
	line-height: 24px;
	z-index: 55;
	top: 0;
	left: 0;
}
.average{
  margin-top: 50px;
}
.average-wrap{
  position: relative;
  margin-top: 20px;
  height: 310px;
}
.average-chart{
  width: 100%;
  height: 100%;
}
.gsl-menu{
  position: absolute;
  width: 100%;
  height: 30px;
  top: 10px;
  left: 0;
  z-index: 55;
}
</style>