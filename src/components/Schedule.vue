<template>
  <div class="item-box calendar">
    <div class="box-tit flex-item">
      <h3>日程安排</h3>
      <div class="calendar-btns">
        <div class="btn-item">
          <a href="javascript:;" @click="showYearDrop">
            <span>{{year}}</span>
            <i></i>
          </a>
          <div class="btn-drop" :class="yearDropClass">
            <p v-for="item in yearList" :key="item" @click="selectYear(item)">{{item}}</p>
          </div>
        </div>
        <div class="btn-item">
          <a href="javascript:;" @click="showMonthDrop">
            <span>{{month}}月</span>
            <i></i>
            <div class="btn-drop" :class="monthDropClass">
              <p v-for="item in 12" :key="item" @click="selectMonth(item)">{{item}}月</p>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="cld-weeks">
      <div class="week-item" v-for="(item,index) in weekText" :key="index">{{item}}</div>
    </div>
    <div class="cld-days">
      <div class="day-item" v-for="(item,index) in daysData" :key="index">
        <div class="day-tit" :class="item.addClass">{{item.text}}</div>
        <div class="event" v-if="item.event&&item.event.length>0">
          <div class="ev-tit">
            <span>{{item.event[0].type}}</span>
          </div>
          <div class="ev-drop">
              <a :href="event.openUrl" class="event-item" v-for="(event,idx) in item.event" :key="idx">
                <div class="ei-title flex-item">
                  <span>[{{event.type}}]</span>
                  <i>{{item.date}}</i>
                </div>
                <div class="text">{{event.title}}</div>
              </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Schedule",
  data() {
    return {
      weekText: ["一", "二", "三", "四", "五", "六", "日"],
      year: 2020,
      yearList: [],
      yearDropClass: '',
      month: 2,
      monthDropClass: '',
      daysData: [],
    };
  },

  mounted() {
    var that = this;
    document.body.addEventListener('click', function(){
      that.yearDropClass = '';
      that.monthDropClass = '';
    })

    var now = new Date();
    this.year = now.getFullYear();
    this.month = now.getMonth() + 1;
    this.daysData = this.getDays();
    this.setSchedule();

    var yearlist = []
    for(var i=0; i<12; i++){
      yearlist.push(this.year+i)
    }
    this.yearList = yearlist;
  },

  methods: {
    addZero(num){
      return num<10?'0'+num:num
    },

    getDays(y, m) {
      var weekNum = [7, 1, 2, 3, 4, 5, 6];
      var data = [];
      var date = new Date(y, m, 0);
      var days = date.getDate();
      var firstWeek = weekNum[new Date(y, m - 1, 1).getDay()];
      var prevMonDays = new Date(y, m - 1, 0).getDate();
      for (var i = 1; i < firstWeek; i++) {
        var year = m <= 1 ? y - 1 : y;
        var mon = m <= 1 ? 12 : m - 1;
        var j = {
          text: prevMonDays + i - 7 + (8 - firstWeek),
          date:
            year + "-" + this.addZero(mon) + "-" + this.addZero(prevMonDays + i - 7 + (8 - firstWeek)),
          addClass: "otherMonth"
        };
        data.push(j);
      }
      for (var i = 1; i < days + 1; i++) {
        var j = {
          text: i,
          date: y + "-" + this.addZero(m) + "-" + this.addZero(i),
          addClass: "activeMonth"
        };
        data.push(j);
      }

      var nextLen = 42 - data.length;
      for (var i = 0; i < nextLen; i++) {
        var year = m >= 12 ? y + 1 : y;
        var mon = m >= 12 ? 1 : m + 1;
        var j = {
          text: i + 1,
          date: year + "-" + this.addZero(mon) + "-" + this.addZero(i + 1),
          addClass: "otherMonth"
        };
        data.push(j);
      }
      return data;
    },

    setSchedule() {
      var y = this.year;
      var m = this.month;
      var data = this.getDays(y, m);
      var that = this;
      this.daysData = data;
      this.$axios.get(that.axiosBaseUrl+'getAddDocs.json',{
        params: {
          year: y,
          month: m
        }
      }).then((res)=>{
        if(res.status==200){
          var list1 = res.data.data["公文办理"];
          var list2 = res.data.data["公文交换"];
          for(var i in data){
            var events = [];
            for(var m in list1){
              if(data[i].date===list1[m].DATE){
                events.push({
                  type: "公文办理",
                  title: list1[m].TITLE,
                  openUrl: list1[m].OPENURL
                })
              }
            }
            for(var n in list2){
              if(data[i].date===list2[n].DATE){
                events.push({
                  type: "公文交换",
                  title: list1[n].TITLE,
                  openUrl: list1[n].OPENURL
                })
              }
            }
            that.$set(that.daysData[i],'event',events)
          }
        }
      })
    },

    getTimeStr(timeText){
      var oDate = new Date(timeText);
      var evHour = oDate.getHours();
      var evMin = oDate.getMinutes();
      var timeStr= evHour>12?(evHour-12)+':'+evMin+'PM':evHour+':'+evMin+'AM';
      return timeStr
    },

    getCoefficient(data){
      return data.length>4?3:4
    },

    showYearDrop(e){
      window.event? window.event.cancelBubble = true : e.stopPropagation();
      this.yearDropClass = this.yearDropClass=='btn-drop-show'?'':'btn-drop-show';
      this.monthDropClass = '';
    },

    selectYear(item){
      if(item==this.year){
        return false
      }else{
        this.year = item;
        this.setSchedule();
      }
    },

    showMonthDrop(e){
      window.event? window.event.cancelBubble = true : e.stopPropagation();
      this.monthDropClass = this.monthDropClass=='btn-drop-show'?'':'btn-drop-show';
      this.yearDropClass = '';
    },

    selectMonth(item){
      if(item==this.month){
        return false
      }else{
        this.month = item;
        this.setSchedule();
      }
    }
  }
};

</script>