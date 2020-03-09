<!--水资源 > 工程情况-->
<template>
  <div class="rs-con">
    <ul class="engineering">
      <li>
        <div class="list-box flex-center">
          <div class="box-left">
            <div class="box-title">水库</div>
            <div class="img">
              <div class="water-box-wrap">
                <waterBox addClass="bigger"/>
              </div>
              <div class="box-text flex-middle">
                <h3>{{shuiku.totalCount}}座</h3>
                <h4>总库容<br>{{shuiku.totalStorage}}亿m³</h4>
              </div>
            </div>
          </div>
          <div class="box-right">
            <table class="table">
              <thead>
                <tr>
                  <th>类型</th>
                  <th>数量</th>
                  <th>库容</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>大中型</td>
                  <td>{{shuiku.bigMidCount}}座</td>
                  <td>{{shuiku.bigMidStorage}}万m³</td>
                </tr>
                <tr>
                  <td>小（1）型</td>
                  <td>{{shuiku.small1Count}}座</td>
                  <td>{{shuiku.small1Storage}}万m³</td>
                </tr>
                <tr>
                  <td>小（2）型</td>
                  <td>{{shuiku.small2Count}}座</td>
                  <td>{{shuiku.small2Storage}}万m³</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </li>
      <li>
        <div class="list-box flex-center">
          <div class="box-left">
            <div class="box-title">水厂</div>
            <div class="img">
              <div class="water-box-wrap">
                <waterBox addClass="bigger"/>
              </div>
              <div class="box-text flex-middle">
                <h3>座</h3>
                <h4>供水能力<br>万吨/日</h4>
              </div>
            </div>
          </div>
          <div class="box-right"></div>
        </div>
      </li>
      <li>
        <div class="list-box flex-center">
          <div class="box-left">
            <div class="box-title">再生水厂</div>
            <div class="img">
              <div class="water-box-wrap">
                <waterBox addClass="bigger"/>
              </div>
              <div class="box-text flex-middle">
                <h3>座</h3>
                <h4>供水能力<br>万吨/日</h4>
              </div>
            </div>
          </div>
          <div class="box-right"></div>
        </div>
      </li>
      <li>
        <div class="list-box flex-center">
          <div class="box-left">
            <div class="box-title">境外饮水</div>
            <div class="img">
              <div class="water-box-wrap">
                <waterBox addClass="bigger"/>
              </div>
              <div class="box-text flex-middle">
                <h4>总长度<br>km</h4>
              </div>
            </div>
          </div>
          <div class="box-right">
            <div class="wed-content">
              <div class="wed-content-header">
                <div v-for="(val,i) in legendArr" :key="i">
                  <i class="legend-item" :style="{'backgroundColor':val.color}"></i>
                  {{val.name}}
                </div>
              </div>
              <div class="wed-content-box fclear" v-for="(val,x) in list" :key="x">
                <div class="wed-content-bleft">{{val.name}}</div>
                <div class="wed-content-bright">
                  <div class="fclear" v-for="(val2,i) in val.value" :key="x.toString()+i">
                    <div class="jdt-box">
                      <div class="jdt-txt">{{val2}}</div>
                      <div
                        class="jdt-item"
                        :style="{'backgroundColor':legendArr[i]['color'],'width':val2/maxValue*100+'%'}"
                      ></div>
                    </div>
                    <div class="unit-box">{{i==0?unit1:unit2}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import waterBox from "../WaterBox"
export default {
  name: 'GongChengQingKuang',
  components: { waterBox },
  data() {
    return {
      shuiku: {
        bigMidCount: "",
        small2Count: "",
        totalStorage: "",
        bigMidStorage: "",
        small1Count: "",
        small1Storage: "",
        small2Storage: "",
        totalCount: ""
      },
      legendArr: [
        {
          name: "设计规模",
          color: "#23C53C"
        },
        {
          name: "2017年引水",
          color: "#074FDA"
        }
      ],
      list: [
        {
          name: "东深供水工程 (供深圳)",
          value: [0, 0]
        },
        {
          name: "东部供水工程",
          value: [0, 0]
        }
      ],
      allDistance: "",
      unit1: "亿m³/年",
      unit2: "亿m³",
      maxValue: 0
    }
  },

  mounted() {
    this.$axios.get(this.axiosBaseUrl + 'resource/getProjectSK', {}).then(res => {
      if(res.status==200){
        this.shuiku = res.data.data
      }
    }).catch(err => {
      console.log(err.stack)
    })

    
  },

  methods: {}
}
</script>

<style scoped>
.engineering{
  height: 680px;
}
.engineering li{
  float: left;
  width: 50%;
  height: 50%;
}
.list-box{
  height: 100%;
}
.list-box .box-left{
  width: 140px;
}
.list-box .box-left .box-title{
  text-align: center;
  font-size: 18px;
  color: #2BA3FD;
  margin-bottom: 20px;
}
.list-box .img{
  position: relative;
}
.list-box .box-text{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  text-align: center;
}
.list-box .box-text h3{
  font-size: 20px;
  color: #feff04;
  margin-bottom: 8px;
}
.list-box .box-text h4{
  color: #fff;
  line-height: 18px;
  font-size: 16px;
}
.list-box .box-right{
  width: 320px;
  margin: 0 0 0 30px;
}
.list-box .table{
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}
.list-box .table tr{
  border-bottom: 1px solid #ddd;
}
.list-box .table th,
.list-box .table td{
  font-weight: normal;
  padding: 8px 5px;
  line-height: 20px;
}
.list-box .table td{
  color: #666;
}
.water-box-wrap{
  position: relative;
  width: 140px;
  height: 140px;
  background: -webkit-linear-gradient(#20dcff, #0065e9);
  background: -o-linear-gradient(#20dcff, #0065e9);
  background: -moz-linear-gradient(#20dcff, #0065e9);
  background: linear-gradient(#20dcff, #0065e9);
  border-radius: 100%;
  padding: 7px;
}
.water-box{
  width: 126px;
  height: 126px;
  border: none;
  border-radius: 100%;
  background-color: rgb(7, 36, 136);
  overflow: hidden;
  position: relative;
}
.water-box > svg{
  position: absolute;
  top: 40px;
}
.water-box .svg_1 {
  fill: #0065e9;
}
.water-box .svg_2 {
  fill: #0180e9;
}
.wer-water-hide-box .svg_3 {
  fill: #01a4f1;
}
.water-box > svg:nth-child(1) {
  animation: waveSvgAnim1 2s linear infinite;
}
.water-box > svg:nth-child(2) {
  animation: waveSvgAnim2 1.8s linear infinite;
}
.water-box > svg:nth-child(3) {
  animation: waveSvgAnim3 1.5s linear infinite;
  left: -36px;
}
@keyframes waveSvgAnim1 {
  0% {
    transform: translateX(-70px);
    -ms-transform: translateX(-70px);
  }
  100% {
    transform: translateX(-3px);
    -ms-transform: translateX(-3px);
  }
}
@keyframes waveSvgAnim2 {
  0% {
    transform: translateX(-66px);
    -ms-transform: translateX(-66px);
  }
  100% {
    transform: translateX(0px);
    -ms-transform: translateX(0px);
  }
}
@keyframes waveSvgAnim3 {
  0% {
    transform: translateX(-28px);
    -ms-transform: translateX(-28px);
  }
  100% {
    transform: translateX(38px);
    -ms-transform: translateX(38px);
  }
}
.wed-content {
  width: 100%;
  height: 100%;
  padding-right: 0px;
  color: #000;
}
.wed-hide-screen {
  width: 100%;
  position: absolute;
  height: 50%;
  top: 59%;
  background-color: #ccc;
  z-index: 3;
}
.wed-content-header {
  text-align: center;
  margin: 0 0 24px;
}
.wed-content-header > div {
  display: inline-block;
  line-height: 1;
  color: #000;
  position: relative;
  padding-left: 32px;
  margin-right: 50px;
}
.wed-content-header > div:last-child {
  margin-right: 0;
}
.legend-item {
  position: absolute;
  left: 0;
  width: 24px;
  height: 16px;
  border-radius: 0 13px 13px 0;
}
.wed-content-box {
  margin-bottom: 16px;
  height: 52px;
}
.wed-content-box > div {
  float: left;
  height: 52px;
}
.wed-content-bleft {
  width: 90px;
  background-color: #ddd;
  border-radius: 26px 0 0 26px;
  text-align: center;
  padding: 6px;
  line-height: 20px;
}
.wed-content-bright {
  width: 230px;
}
.wed-content-bright > div {
  width: 100%;
  height: 24px;
  line-height: 24px;
}
.wed-content-bright > div:first-child {
  margin-bottom: 4px;
}
.jdt-box {
  float: left;
  width: 180px;
  height: 100%;
  background-color: #ddd;
  border-radius: 0 60px 60px 0;
  position: relative;
}
.jdt-item {
  position: absolute;
  height: 100%;
  z-index: 2;
  border-radius: 0 20px 20px 0;
}
.jdt-txt {
  width: 100%;
  position: absolute;
  z-index: 3;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
}
.unit-box {
  float: left;
  width: 50px;
  padding-left: 0px;
  height: 100%;
  font-size: 12px;
  white-space: nowrap;
  text-indent: 4px;
  color: #666;
}
</style>