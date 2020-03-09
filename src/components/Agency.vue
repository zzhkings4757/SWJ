<template>
  <div class="item-box dbsx">
    <div class="box-tit flex-item">
      <div class="dbsx-tit flex-item">
        <img src="../assets/images/icon_dbsx.png" alt />
        <h3>待办事项{{AgencyNum}}项</h3>
      </div>
      <div class="dbsx-tit flex-item">
        <img src="../assets/images/icon_jrxz.png" alt />
        <h3>今日新增{{addNum}}项</h3>
      </div>
    </div>
    <div class="item-con">
      <div class="dbsx-menu">
        <a href="javascript:;" :class="{'on':itemIndex==index}" v-for="(item,index) in menuList" :key="index" @click="itemSwitch(index)">
          <div class="num" v-if="item.todayAdd>0">{{item.todayAdd}}</div>
          <div class="icon">
            <img class="img" :src="item.icon" alt />
            <img class="img-on" :src="item.iconOnSelect" alt />
          </div>
          <h4>{{item.text}}</h4>
          <span></span>
        </a>
      </div>
      <div class="dbsx-swiper swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-show="itemIndex==0">
            <ul class="gwbl-list">
              <li v-for="(item,index) in todoList" :key="index">
                <a :href="item.OPENURL" target="_blank" rel="noopener noreferrer">
                  <span :class="{'bg-red':item.JINJICHENGDU=='特急','bg-orange':item.JINJICHENGDU=='紧急','bg-green':item.JINJICHENGDU=='普通'}"></span>
                  <p>{{item.TITLE}}</p>
                  <i>{{getDateStr(item.UDPATETIME)}}</i>
                </a>
              </li>
            </ul>
            <a :href="todoMoreUrl" class="more-btn gwbl-more">查看更多</a>
          </div>
          <div class="swiper-slide" v-show="itemIndex==1">
            <ul class="gwjh-list">
              <li v-for="(item,index) in exchangeDocs" :key="index">
                <a :href="item.OPENURL" target="_blank" rel="noopener noreferrer">
                  <p>{{(index+1)+item.TITLE}}</p>
                  <i>{{getDateStr(item.SENDTIME)}}</i>
                </a>
              </li>
            </ul>
            <a :href="exchangeMoreUrl" class="more-btn gwjh-more">查看更多</a>
          </div>
          <div class="swiper-slide" v-show="itemIndex==2">
            <ul class="zwap-list">
              <li v-for="(item,index) in planList" :key="index">
                <a :href="item.OPENURL" target="_blank" rel="noopener noreferrer">
                  <i>{{new Date(item.FROMDATE).getFullYear()}}</i>
                  <p>{{item.TITLE}}</p>
                </a>
              </li>
            </ul>
            <a :href="planMoreUrl" class="more-btn zwap-more">查看更多</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Agency",
  data(){
    return {
      itemIndex: 0,
      menuList: [
        {
          text: '公文办理',
          icon: require("../assets/images/db_icon1.png"),
          iconOnSelect: require("../assets/images/db_icon1_on.png"),
          todayAdd: 2
        },
        {
          text: '公文交换',
          icon: require("../assets/images/db_icon2.png"),
          iconOnSelect: require("../assets/images/db_icon2_on.png"),
          todayAdd: 0
        },
        {
          text: '公文待办',
          icon: require("../assets/images/db_icon3.png"),
          iconOnSelect: require("../assets/images/db_icon3_on.png"),
          todayAdd: 1
        }
      ],
      AgencyNum: 3,
      addNum: 3,
      todoList: [],
      todoMoreUrl: 'javascript:;',
      exchangeDocs: [],
      exchangeMoreUrl: 'javascript:;',
      planList: [],
      planMoreUrl: 'javascript:;'
    }
  },

  created(){
    var baseUrl = this.axiosBaseUrl;
    this.$axios.get(baseUrl+'office/getTodoList.json').then((res)=>{
      if(res.status==200){
        this.todoList = res.data.data.list
        this.todoMoreUrl = res.data.data.moreurl
      }
    })

    this.$axios.get(baseUrl+'office/getExchangeDocs.json').then((res)=>{
      if(res.status==200){
        this.exchangeDocs = res.data.data.list
        this.exchangeMoreUrl = res.data.data.moreurl
      }
    })

    this.$axios.get(baseUrl+'office/getPlanList.json').then((res)=>{
      if(res.status==200){
        this.planList = res.data.data.list
        this.planMoreUrl = res.data.data.moreurl
      }
    })

  },

  methods: {

    getDateStr(times) {
      var date = new Date(times);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      m = m < 10 ? '0' + m : m;
      d = d < 10 ? '0' + d : d;
      return y + '-' + m + '-' + d;
    },

    itemSwitch(index){
      this.itemIndex = index
    }
  }
};
</script>