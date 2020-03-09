<template>
  <div class="intelligence">
    <div class="itlg-menu">
      <div
        class="menu-item"
        :class="{'on':menuIndex==index}"
        v-for="(item,index) in menuList"
        :key="index"
        @click="itemSwitch(index)"
      >{{item}}</div>
    </div>
    <div class="itlg-con">
      <ul class="itlg-list" v-if="menuIndex==0">
        <li v-for="(item,index) in changyong" :key="index">
          <a :href="item.url" target="_blank" rel="noopener noreferrer">
            <div class="icon">
              <img :src="item.iconPath" alt />
            </div>
            <p>{{item.text}}</p>
          </a>
        </li>
      </ul>
      <ul class="itlg-list" v-if="menuIndex==1">
        <li v-for="(item,index) in zhengwu" :key="index">
          <a :href="item.url" target="_blank" rel="noopener noreferrer">
            <div class="icon">
              <img :src="item.iconPath" alt />
            </div>
            <p>{{item.text}}</p>
          </a>
        </li>
      </ul>
      <ul class="itlg-list" v-if="menuIndex==2">
        <li v-for="(item,index) in diaodu" :key="index">
          <a :href="item.url" target="_blank" rel="noopener noreferrer">
            <div class="icon">
              <img :src="item.iconPath" alt />
            </div>
            <p>{{item.text}}</p>
          </a>
        </li>
      </ul>
      <ul class="itlg-list" v-if="menuIndex==3">
        <li v-for="(item,index) in guanli" :key="index">
          <a :href="item.url" target="_blank" rel="noopener noreferrer">
            <div class="icon">
              <img :src="item.iconPath" alt />
            </div>
            <p>{{item.text}}</p>
          </a>
        </li>
      </ul>
      <ul class="itlg-list" v-if="menuIndex==4">
        <li v-for="(item,index) in fuwu" :key="index">
          <a :href="item.url" target="_blank" rel="noopener noreferrer">
            <div class="icon">
              <img :src="item.iconPath" alt />
            </div>
            <p>{{item.text}}</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Intelligence",
  data() {
    return {
      menuList: ["常用应用", "智慧政务", "智慧调度", "智慧管理", "智慧服务"],
      menuIndex: 0,
      changyong: [
        {
          text: "水务态势综合展示平台",
          iconPath: require("../assets/images/it_icon1_1.png"),
          url: 'http://10.230.31.96/szsw_java/'
        },
        {
          text: "水务防汛支持决策",
          iconPath: require("../assets/images/it_icon1_2.png"),
          url: "http://10.230.31.51:8060/szsf"
        },
        {
          text: "水务应急事件闭环分拨",
          iconPath: require("../assets/images/it_icon1_3.png"),
          url: "/login"
        },
        {
          text: "水资源监控能力信息管理",
          iconPath: require("../assets/images/it_icon1_4.png"),
          url: "/login"
        },
        {
          text: "供水管网在线监测平台",
          iconPath: require("../assets/images/it_icon1_5.png"),
          url: "http://113.98.246.157:8012/WaterMonitor/login/userLogin"
        },
        {
          text: "治水提质项目管理",
          iconPath: require("../assets/images/it_icon1_6.png")
        },
        {
          text: "水质净化厂在线监测",
          iconPath: require("../assets/images/it_icon1_7.png"),
          url: "https://202.105.247.6:4005/WaterMonitor/login/userLogin"
        },
        {
          text: "河务通后台管理",
          iconPath: require("../assets/images/it_icon1_8.png"),
          url: "/login"
        },
        {
          text: "河道管理范围信息",
          iconPath: require("../assets/images/it_icon1_9.png"),
          url: "http://192.168.60.210:8050/hd"
        },
        {
          text: "水务行业监管双随机抽查",
          iconPath: require("../assets/images/it_icon1_10.png"),
          url: "http://10.230.31.51:8020/swjgcc/index.jsp"
        }
      ],
      zhengwu: [
        {
          text: "办公OA",
          iconPath: require("../assets/images/it_icon2_1.png"),
          url: "http://10.230.31.253:8091"
        },
        {
          text: "水政执法系统",
          iconPath: require("../assets/images/it_icon2_2.png")
        },
        {
          text: "水务应急事件闭环分拨系统",
          iconPath: require("../assets/images/it_icon2_3.png"),
          url: "/login"
        },
        {
          text: "水务行业监管双随机抽查系统",
          iconPath: require("../assets/images/it_icon2_4.png"),
          url: "http://10.230.31.51:8020/swjgcc/index.jsp"
        }
      ],
      diaodu: [
        {
          text: "水务态势综合展示平台",
          iconPath: require("../assets/images/it_icon3_1.png"),
          url: 'http://10.230.31.96/szsw_java/'
        },
        {
          text: "水务防汛支持决策平台",
          iconPath: require("../assets/images/it_icon3_2.png"),
          url: "http://10.230.31.51:8060/szsf"
        },
        {
          text: "水资源监控能力信息管理平台",
          iconPath: require("../assets/images/it_icon3_3.png"),
          url: "/login"
        },
        {
          text: "水资源综合管理系统",
          iconPath: require("../assets/images/it_icon3_4.png")
        },
        {
          text: "供水管网在线监测平台",
          iconPath: require("../assets/images/it_icon3_5.png"),
          url: "http://113.98.246.157:8012/WaterMonitor/login/userLogin"
        },
        {
          text: "河务通后台管理系统",
          iconPath: require("../assets/images/it_icon3_6.png"),
          url: "/login"
        },
        {
          text: "河道管理范围信息系统",
          iconPath: require("../assets/images/it_icon3_7.png"),
          url: "http://192.168.60.210:8050/hd"
        },
        {
          text: "计划用水管理系统",
          iconPath: require("../assets/images/it_icon3_8.png")
        },
        {
          text: "海绵城市基础项目库",
          iconPath: require("../assets/images/it_icon3_9.png")
        },
        {
          text: "深圳市治水提质项目管理系统",
          iconPath: require("../assets/images/it_icon3_10.png"),
          url: "/login"
        },
        {
          text: "深圳市第一次全国水利普查成果展示系统",
          iconPath: require("../assets/images/it_icon3_11.png")
        }
      ],
      guanli: [
        {
          text: "工程支付/招标管理模块",
          iconPath: require("../assets/images/it_icon4_1.png"),
          url: "http://10.230.31.223:9193/waterSso.jsp"
        },
        {
          text: "工程实名制系统",
          iconPath: require("../assets/images/it_icon4_2.png")
        },
        {
          text: "水务发展专项资金阳光监管平台",
          iconPath: require("../assets/images/it_icon4_3.png"),
          url: "/login"
        },
        {
          text: "水工程建设行业监管系统",
          iconPath: require("../assets/images/it_icon4_4.png")
        },
        {
          text: "工程建设项目管理系统",
          iconPath: require("../assets/images/it_icon4_5.png")
        }
      ],
      fuwu: [
        {
          text: "市水务网",
          iconPath: require("../assets/images/it_icon5_1.png"),
          url: 'http://swj.sz.gov.cn/'
        }
      ]
    };
	},
	created(){
		// this.$axios.get('jsonData/userlinks.json').then(res => {
		// 	console.log(res)
		// }).catch(err => {
		// 	console.log(err.stack)
		// })
	},
  methods: {
    itemSwitch(index) {
      this.menuIndex = index;
    }
  }
};
</script>