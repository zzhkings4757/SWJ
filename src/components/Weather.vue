<template>
  <div class="weather">
    <div class="tit-style flex-item">
      <h3>预警信息</h3>
      <a href="javascript:;">更多 &gt;</a>
    </div>
    <div class="weather-con">
      <div class="tips flex-item">
        <i></i>
        <p>当前无预警信号</p>
				<a href="javascript:;">历史预警查询</a>
      </div>
      <h2>{{minT}}/{{maxT}}℃</h2>
      <div class="text">晴天间多云  空气干燥</div>
      <div class="sub-text">
				<span>空气质量：{{aqihtml}}</span>
				<span>距离霜降还有8天</span>
			</div>
      <ul class="item-list">
        <li>
          <img class="icon" src="../assets/images/w_icon1.png" alt />
          <p>风向 东北风</p>
        </li>
        <li>
          <img class="icon" src="../assets/images/w_icon2.png" alt />
          <p>风力 3级/6级(沿海I高地I海区最大阵风）</p>
        </li>
        <li>
          <img class="icon" src="../assets/images/w_icon3.png" alt />
          <p>湿度 50%-80%</p>
        </li>
        <li>
          <img class="icon" src="../assets/images/w_icon4.png" alt />
          <p>能见度 20.0km</p>
        </li>
        <li>
          <img class="icon" src="../assets/images/w_icon5.png" alt />
          <p>日出：06:20</p>
        </li>
        <li>
          <img class="icon" src="../assets/images/w_icon6.png" alt />
          <p>月出：19:44</p>
        </li>
        <li>
          <img class="icon" src="../assets/images/w_icon7.png" alt />
          <p>日落：17:58</p>
        </li>
        <li>
          <img class="icon" src="../assets/images/w_icon8.png" alt />
          <p>月落：08:08</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Weather",
  data() {
    return {
      minT: '',
      maxT: '',
      aqihtml: '',
      report: ''
    };
  },
  mounted(){
    var that = this
    this.$axios.get(this.axiosBaseUrl+'qixiang/alarmBody.json').then(res => {
      if(res.status==200){
        var data = res.data.data
        that.minT = data.minT
        that.maxT = data.maxT
        that.aqihtml = data.aqihtml,
        that.report = data.report
      }
    }).catch(err => {
      console.log(err.stack)
    })
  }
};
</script>