<!--水环境 > 水质监测-->
<template>
  <div class="rs-con">
    <div class="flex-item">
      <h4>水质净化厂水质监测</h4>
      <div class="date-group flex-item">
        <el-select class="select-site" v-model="siteName" placeholder="请选择">
          <el-option
            v-for="item in sites"
            :key="item.key"
            :label="item.value"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select class="select-standard" v-model="standardName" placeholder="请选择">
          <el-option
            v-for="item in standardList"
            :key="item.key"
            :label="item.value"
            :value="item.value">
          </el-option>
        </el-select>
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
    <div class="flex-item mt50">
      <div class="menu-style">
        <div class="menu-item" :class="{'on':menuIndex==index}" v-for="(item,index) in menuList" :key="index" @click="menuSwitch(index)">{{item}}</div>
      </div> 
      <div class="date-group flex-item" v-if="menuIndex==0">
        <el-select class="select-site" v-model="rSiteName" placeholder="请选择">
          <el-option
            v-for="item in riverSites"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <el-select class="select-standard" v-model="rStandardName" placeholder="请选择">
          <el-option
            v-for="item in riverStandard"
            :key="item.sDomaincode"
            :label="item.sDomaincaption"
            :value="item.sDomaincaption">
          </el-option>
        </el-select>
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
    <v-chart class="chart1" v-if="menuIndex==0" :options="option2"/>
    <div v-if="menuIndex==1">河道水质周测</div>
  </div>  
</template>

<script>
export default {
  name: 'ShuiZhiJianCe',
  data() {
    return {
      dateValue: '',
      dateType: 'date',
      dateOption: [
        {label: '日', value: 'date'},
        {label: '月', value: 'month'},
        {label: '年', value: 'year'},
      ],
      standardList: [
        { key: "011", value: "CODcr" },
        { key: "001", value: "pH" },
        { key: "101", value: "总磷" },
        { key: "060", value: "氨氮" },
        { key: "B01TOTAL", value: "累积流量" },
        { key: "065", value: "总氮" },
        { key: "ss", value: "SS" },
        { key: "phtem", value: "水温" },
        { key: "B01", value: "瞬时流量" }
      ],
      standardName: '',
      sites: [],
      siteName: '',
      option1: null,

      menuList: ['河道水质实时', '河道水质周测'],
      menuIndex: 0,
      option2: null,
      riverSites: [],
      rSiteName: '',
      riverStandard: [],
      rStandardName: '',
      dateType2: 'date',
      dateValue2: '',
    }
  },

  created(){
    this.getSiteInfo()
    this.getSzjhc()
    this.getRiverSize()
    this.getParmList()
    this.getHdszss()
  },

  methods: {
    getSiteInfo(){
      this.$axios.get(this.axiosBaseUrl + "/safe/getSiteInfo", {}).then(res => {
        if(res.status==200){
          this.sites = res.data.data
        }
      }).catch(err => {
        console.log(err.stack);
      });
    },
    getSzjhc(){
      this.$axios.get(this.axiosBaseUrl + "/safe/getWaterQuality?date="+this.dateValue+"&codename="+encodeURI(this.siteName)+"&polname="+this.standardName, {}).then(res => {
        if(res.status==200){
          this.setSzjhc(res.data.data)
        }
      }).catch(err => {
        console.log(err.stack);
      });
    },
    setSzjhc(data){
      var names = [], values = [], maxCount = []
      var list = data.SewageMonitor
      for(var i in list){
        names.push(list[i].name)
        values.push(list[i].value[0])
        maxCount.push(list[i].value[1])
      }

      var option = {
				grid: {
					left: '60px',
					right: 0,
					top: '50px',
					bottom: '20px'
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
          name: '单位：'+data.unit,
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
            type: 'line',
            smooth: true,
            data: values,
            color: '#2E9BFF'
          },
          {
            type: 'line',
            name: '最大限值',
            itemStyle: {
              normal: {
                opacity: 0
              },
              emphasis: {
                opacity: 0
              }
            },
            lineStyle: {
              normal: {
                opacity: 0,
                color: 'blue'
              },
              emphasis: {
                opacity: 0
              }
            },
            color: '#FFA780',
            data: maxCount,
            tooltip: {
              show: false
            },
            markLine: {
              data: [
                {
                  type: 'average', 
                  //name: '最大限值',
                  emphasis: {
                    lineStyle: {
                      type: 'dashed',
                      width: 1
                    }
                  }
                }
              ]
            }
          }
        ]
      }
      this.option1 = option
    },

    menuSwitch(index){
      this.menuIndex = index
    },
    getRiverSize(){
      this.$axios.get(this.axiosBaseUrl + "/environment/getWatercourseQualityStationList", {}).then(res => {
        if(res.status==200){
          this.riverSites = res.data.data
        }
      }).catch(err => {
        console.log(err.stack);
      });
    },
    getParmList(){
      this.$axios.get(this.axiosBaseUrl + "/environment/getWatercourseQualityParmList").then(res => {
        if(res.status==200){
          this.riverStandard = res.data.data
        }
      }).catch(err => {
        console.log(err.stack);
      })
    },
    getHdszss(){
      this.$axios.get(this.axiosBaseUrl + "/environment/getWatercourseQualityMonitoring").then(res => {
        if(res.status==200){
          this.setHdszss(res.data.data)
        }
      }).catch(err => {
        console.log(err.stack);
      });
    },
    setHdszss(data){
      var names = [], values = []
      for(var i in data){
        names.push(data[i].name)
        values.push(data[i].value)
      }

      var option = {
				grid: {
					left: '60px',
					right: 0,
					top: '50px',
					bottom: '20px'
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
            type: 'line',
            smooth: true,
            data: values,
            color: '#2E9BFF'
          }
        ]
      }
      this.option2 = option
    },
  }
}
</script>

<style scoped>
.date-type{
  width: 80px;
  margin-right: 10px;
}
.select-site{
  width: 160px;
  margin-right: 10px;
}
.select-standard{
  width: 120px;
  margin-right: 10px;
}
.chart1{
  width: 100%;
  height: 240px;
}
.menu-style .menu-item{
  height: 40px;
  line-height: 40px;
}
</style>