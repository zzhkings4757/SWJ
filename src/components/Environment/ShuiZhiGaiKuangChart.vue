<template>
  <div class="page scroll-view">
    <div class="sz-group">
      <div class="sz-tit">参与监测水源地水质达标率</div>
      <div class="sz-con">
        <div class="sz-item flex-middle">
          <img class="img" src="@/assets/images/水源.png" alt />
          <p class="text">水源水质({{syszDate}})</p>
        </div>
        <div class="sz-chart flex-middle">
          <v-chart class="chart" :options="syszdbl"/>
        </div>
      </div>
    </div>
    <div class="sz-group">
      <div class="sz-tit">河流水质等级占比</div>
      <div class="sz-con">
        <div class="sz-item flex-middle">
          <img class="img" src="@/assets/images/河流.png" alt />
          <p class="text">河流水质({{hlszDate}})</p>
        </div>
        <div class="sz-chart flex-middle">
          <v-chart class="chart" :options="hlsz"/>
        </div>
      </div>
    </div>
    <div class="sz-group">
      <div class="sz-tit">海域水质等级面积占比</div>
      <div class="sz-con">
        <div class="sz-item flex-middle">
          <img class="img" src="@/assets/images/海洋.png" alt />
          <p class="text">海水水质({{hsszDate}})</p>
        </div>
        <div class="sz-chart flex-middle">
          <v-chart class="chart" :options="hssz"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShuiZhiGaiKuangChart",
  data() {
    return {
      syszdbl: null,
      syszDate: '',
      hlsz: null,
      hlszDate: '',
      hssz: null,
      hsszDate: ''
    };
  },

  created(){
    this.getSyszdbl()
    this.getHlsz()
    this.getHssz()
  },

  methods: {
    //参与监测水源地水质达标率
    getSyszdbl() {
      this.$axios.get(this.axiosBaseUrl + "/environment/getMonitoringWaterQualityRate", {}).then(res => {
        this.setSyszdbl(res.data.data)
      }).catch(err => {
        console.log(err.stack);
      });
    },
    setSyszdbl(data) {
      this.syszDate = data.date
      var percent1 = parseFloat(data.waterQualityRate)
      var percent2 = parseFloat(data.betterThan2Standards)
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
          {
            type: "gauge",
            title: {
              offsetCenter: [0,'100%']
            },
            startAngle: 230,
            endAngle: -50,
            radius: "92%",
            axisLine: {
              show: true,
              lineStyle: {
                width: 40/3,
                color: [[percent1 / 100, "#2be0c8"], [1, "#FAAD14"]]
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            pointer: {
              show: false
            },
            detail: {
              offsetCenter: [0, 0],
              fontSize: 68/3,
              color: "#23CE54",
              formatter: "{value}%"
            },
            center: ["24%", "50%"],
            data: [{ value: percent1, name: "水源水质达标率" }]
          },
          {
            type: "gauge",
            title: {
              offsetCenter: [0,'100%']
            },
            startAngle: 230,
            endAngle: -50,
            radius: "92%",
            axisLine: {
              show: true,
              lineStyle: {
                width: 40/3,
                color: [[percent2 / 100, "#2be0c8"], [1, "#FAAD14"]]
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            pointer: {
              show: false
            },
            detail: {
              offsetCenter: [0, 0],
              fontSize: 68/3,
              color: "#23CE54",
              formatter: "{value}%"
            },
            center: ["70%", "50%"],
            data: [{ value: percent2, name: "优于II类标准" }]
          }
        ]
      }
      this.syszdbl = option
    },

    //河流水质等级占比
    getHlsz(){
      this.$axios.get(this.axiosBaseUrl + "/environment/getRiverWaterQualityRate", {}).then(res => {
        this.setHlsz(res.data.data)
      }).catch(err => {
        console.log(err.stack);
      });
    },
    setHlsz(data){
      this.hlszDate = data.date
      var percent1 = parseFloat(data.worseThan5Quality)
      var percent2 = parseFloat(data.betterThan5Quality)
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
          {
            type: "gauge",
            title: {
              offsetCenter: [0,'100%']
            },
            startAngle: 230,
            endAngle: -50,
            radius: "92%",
            axisLine: {
              show: true,
              lineStyle: {
                width: 40/3,
                color: [[percent1 / 100, "#2be0c8"], [1, "#FAAD14"]]
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            pointer: {
              show: false
            },
            detail: {
              offsetCenter: [0, 0],
              fontSize: 68/3,
              color: "#23CE54",
              formatter: "{value}%"
            },
            center: ["24%", "50%"],
            data: [{ value: percent1, name: "地表水V类及以上" }]
          },
          {
            type: "gauge",
            title: {
              offsetCenter: [0,'100%']
            },
            startAngle: 230,
            endAngle: -50,
            radius: "92%",
            axisLine: {
              show: true,
              lineStyle: {
                width: 40/3,
                color: [[percent2 / 100, "#2be0c8"], [1, "#FAAD14"]]
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            pointer: {
              show: false
            },
            detail: {
              offsetCenter: [0, 0],
              fontSize: 68/3,
              color: "#23CE54",
              formatter: "{value}%"
            },
            center: ["70%", "50%"],
            data: [{ value: percent2, name: "劣V类" }]
          }
        ]
      }
      this.hlsz = option
    },

    //海域水质等级面积占比
    getHssz(){
      this.$axios.get(this.axiosBaseUrl + "/environment/getSeaWaterQualityAreaRate", {}).then(res => {
        this.setHssz(res.data.data)
      }).catch(err => {
        console.log(err.stack);
      });
    },
    setHssz(data){
      this.hsszDate = data.date
      var percent1 = parseFloat(data.worseThan4Quality)
      var percent2 = parseFloat(data.betterThan4Quality)
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
          {
            type: "gauge",
            title: {
              offsetCenter: [0,'100%']
            },
            startAngle: 230,
            endAngle: -50,
            radius: "92%",
            axisLine: {
              show: true,
              lineStyle: {
                width: 40/3,
                color: [[percent1 / 100, "#2be0c8"], [1, "#FAAD14"]]
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            pointer: {
              show: false
            },
            detail: {
              offsetCenter: [0, 0],
              fontSize: 68/3,
              color: "#23CE54",
              formatter: "{value}%"
            },
            center: ["24%", "50%"],
            data: [{ value: percent1, name: "四类及以上" }]
          },
          {
            type: "gauge",
            title: {
              offsetCenter: [0,'100%']
            },
            startAngle: 230,
            endAngle: -50,
            radius: "92%",
            axisLine: {
              show: true,
              lineStyle: {
                width: 40/3,
                color: [[percent2 / 100, "#2be0c8"], [1, "#FAAD14"]]
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            pointer: {
              show: false
            },
            detail: {
              offsetCenter: [0, 0],
              fontSize: 68/3,
              color: "#23CE54",
              formatter: "{value}%"
            },
            center: ["70%", "50%"],
            data: [{ value: percent2, name: "劣四类" }]
          }
        ]
      }
      this.hssz = option
    },
  }
};
</script>

<style scoped>
.page {
  height: 620px;
  margin-top: 20px;
  margin-right: -20px;
  padding-right: 10px;
}

.chart{
  width: 100%;
  height: 188px;
}
</style>

