<template>
  <div class="prevention item-box">
    <div class="pt-top">
      <div class="pt-title flex-item">
        <h3>水务防汛</h3>
        <a href="javascript:;">更多 &gt;</a>
      </div>
      <div class="pt-menu">
        <div
          class="menu-item"
          :class="{'on':menuIndex==index}"
          v-for="(item,index) in menuList"
          :key="index"
          @click="itemSwitch(index)"
        >{{item}}</div>
      </div>
    </div>
    <div class="pt-con">
      <div class="scroll-view">
        <div class="pt-wrap">
          <div class="pt-box">
            <div class="box-tips">
              <i></i>
              <p>已超出汛限水位名单 (共{{beyondData.length}}个) ，当前时间{{activeTime}}</p>
            </div>
            <table>
              <thead>
                <tr>
                  <th v-for="(item,index) in tableTitle" :key="index">{{item}}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in beyondData" :key="index">
                  <td class="color-red">{{item.name}}</td>
                  <td>{{item.dist}}</td>
                  <td>{{item.tm}}</td>
                  <td>{{item.value}}</td>
                  <td>{{item.alertValue}}</td>
                  <td>{{item.exceed}}</td>
                </tr>
              </tbody>
            </table>
            <div class="no-data" v-if="beyondData<=0">暂无数据</div>
          </div>
          <div class="pt-box">
            <div class="box-tips">
              <i></i>
              <p>接近汛限水位名单(共{{nearData.length}}个) ，当前时间{{activeTime}}</p>
            </div>
            <table>
              <thead>
                <tr>
                  <th v-for="(item,index) in tableTitle" :key="index">{{item}}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in nearData" :key="index">
                  <td class="color-yellow">{{item.name}}</td>
                  <td>{{item.dist}}</td>
                  <td>{{item.tm}}</td>
                  <td>{{item.value}}</td>
                  <td>{{item.alertValue}}</td>
                  <td>{{item.exceed}}</td>
                </tr>
              </tbody>
            </table>
            <div class="no-data" v-if="nearData<=0">暂无数据</div>
          </div>
          <div class="pt-box">
            <div class="box-tips">
              <i></i>
              <p>开敞式溢洪道正常溢流名单(共{{normalData.length}}个) ，当前时间{{activeTime}}</p>
            </div>
            <table>
              <thead>
                <tr>
                  <th v-for="(item,index) in tableTitle" :key="index">{{item}}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in normalData" :key="index">
                  <td class="color-blue">{{item.name}}</td>
                  <td>{{item.dist}}</td>
                  <td>{{item.tm}}</td>
                  <td>{{item.value}}</td>
                  <td>{{item.alertValue}}</td>
                  <td>{{item.exceed}}</td>
                </tr>
              </tbody>
            </table>
            <div class="no-data" v-if="normalData<=0">暂无数据</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Prevention",
  data() {
    return {
      menuList: ["水库", "河道", "积涝点"],
      menuIndex: 0,
      tableTitle: [
        "名称",
        "行政区",
        "监测时间",
        "当前水位",
        "汛限水位",
        "超出"
      ],
      beyondData: [],
      nearData: [],
      normalData: [],
      activeTime: ''
    };
  },
  mounted(){
    this.itemSwitch(0)
  },
  methods: {

    //水库
    getReservoir(){
      var that = this
      this.$axios.get(this.axiosBaseUrl+'getAlertList.json').then(res => {
        if(res.status==200){
          that.beyondData = res.data.data.alert?res.data.data.alert:[]
          that.nearData = res.data.data.warn?res.data.data.warn:[]
          that.normalData = res.data.data.normal?res.data.data.normal:[]
        }
      }).catch(err => {
        console.log(err.stack)
      })
    },

    //河道
    getRiverCourse(){
      var that = this
      this.$axios.get(this.axiosBaseUrl+'getAlertList2.json').then(res => {
        if(res.status==200){
          console.log(res.data.data)
          that.beyondData = res.data.data.alert?res.data.data.alert:[]
          that.nearData = res.data.data.warn?res.data.data.warn:[]
          that.normalData = res.data.data.normal?res.data.data.normal:[]
        }
      }).catch(err => {
        console.log(err.stack)
      })
    },

    //积涝点
    getWaterlogging(){
      var that = this
      this.$axios.get(this.axiosBaseUrl+'getAlertList3.json').then(res => {
        if(res.status==200){
          that.beyondData = res.data.data.alert?res.data.data.alert:[]
          that.nearData = res.data.data.warn?res.data.data.warn:[]
          that.normalData = res.data.data.normal?res.data.data.normal:[]
        }
      }).catch(err => {
        console.log(err.stack)
      })
    },

    getActiveTime(){
      var now = new Date()
      var y = now.getFullYear()
      var m = this.addZero(now.getMonth() + 1)
      var d = this.addZero(now.getDate())
      var h = this.addZero(now.getHours())
      var min = this.addZero(now.getMinutes())
      var sec = this.addZero(now.getSeconds())
      this.activeTime = y+'-'+m+'-'+d+' '+h+':'+min+':'+sec
    },

    addZero(num){
      return num<10?'0'+num:num
    },

    itemSwitch(index){
      //if(this.menuIndex == index) return false
      this.menuIndex = index
      this.getActiveTime()
      switch(Number(index)){
        case 0:
          this.getReservoir()
          break
        case 1:
          this.getRiverCourse()
          break
        case 2:
          this.getWaterlogging()
          break
      }
    }
  }
};
</script>