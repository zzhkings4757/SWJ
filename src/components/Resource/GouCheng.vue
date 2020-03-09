<!--水资源 > 节约用水 > 用水量构成-->
<template>
  <div class="page flex-item">
    <div class="left-text flex-middle">
      <p>{{year}}年全市用水量达到<span>{{text1}}</span>，
      </p>
      <p>同比增加<span>{{text2}}</span>
      </p>
    </div>
    <v-chart class="chart" :options="option" />
  </div>
</template>

<script>
export default {
  name: "GouCheng",
  data() {
    return {
      year: "",
      text1: "",
      text2: "",
      option: null
    };
  },

  mounted() {
    var that = this;
    this.$axios
      .get(this.axiosBaseUrl + "resource/getCompositionWater", {})
      .then(res => {
        //console.log(res)
        that.year = res.data.data.compositionWaterYear;
        that.text1 = res.data.data.cityWaterConsumption;
        that.text2 = res.data.data.yearIncrease;
        that.unit = res.data.data.compositionWaterunit;
        that.setData(res.data.data.compositionWater);
      })
      .catch(err => {
        console.log(err.stack);
      });
  },

  methods: {
    setData(data) {
      var colors = ['#2BA3FD','#ff677d','#50D396','#9de3d0','#e7b2a5','#feb72b','#79bac1']
      var option = {
        title: {
          text: '单位：' + this.unit,
          right: '5%',
          textStyle: {
            fontSize: 14,
            fontWeight: 'normal',
            color: '#333'
          }
        },
        legend: {
          orient: 'vertical',
          right: '10%',
          top: 'center',
          data: data
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        color: colors,
        series: [
          {
            name: "用水量构成",
            type: "pie",
            radius: ["60","80%"],
            center: ["30%", "50%"],
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      }
      this.option = option
    }
  }
};
</script>

<style scoped>
.page {
  height: 250px;
  -webkit-box-align: stretch;
  align-items: stretch;
}
.left-text {
  width: 40%;
}
.left-text p {
  color: #666;
}
.left-text p span {
  font-size: 20px;
  color: #2ba3fd;
  margin-left: 4px;
}
.chart {
  width: 60%;
  height: 100%;
}
</style>