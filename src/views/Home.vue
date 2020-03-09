<template>
  <div class="home">
    <!-- top Start! -->
    <HeaderBar></HeaderBar>
    <!-- top End! -->

    <!-- main Start! -->
    <div class="index-sec index-sec1 wrap">
      <div class="row">
        <div class="col col-50">
          <Agency></Agency>
        </div>
        <div class="col col-50">
          <Schedule></Schedule>
        </div>
      </div>
    </div>

    <div class="index-sec index-sec2 wrap">
      <Intelligence></Intelligence>
    </div>

    <div class="index-sec index-sec3 wrap">
      <div class="row">
        <div class="col col-55">
          <Prevention></Prevention>
        </div>
        <div class="col col-45">
          <Weather></Weather>
        </div>
      </div>
    </div>

    <div class="m-banner wrap">
      <img src="../assets/images/m-banner.png" alt="">
    </div>

    <div class="index-sec index-sec4">
      <Resource></Resource>
    </div>

    <div class="index-sec index-sec5">
      <Environment></Environment>
    </div>

    <div class="index-sec index-sec6">
      <Protect></Protect>
    </div>

    <div class="index-sec index-sec7">
      <Affair></Affair>
    </div>

    <div class="index-sec index-sec8 wrap">
      <ul class="bottom-link row">
        <li class="col col-33" v-for="(item,index) in bottomLink" :key="index">
          <a :href="item.url" target="_blank" ref="noopener noreferrer">
            <img :src="item.imgPath" alt="">
          </a>
        </li>
      </ul>
    </div>
    <!-- main End! -->

    <!-- footer Start! -->
    <Footer></Footer>
    <!-- footer End! -->
  </div>
</template>

<script>
import HeaderBar from "../components/HeaderBar"
import Agency from "../components/Agency"
import Schedule from "../components/Schedule"
import Intelligence from "../components/Intelligence"
import Prevention from "../components/Prevention"
import Weather from "../components/Weather"
import Resource from "../components/Resource/Resource"
import Environment from "../components/Environment/Environment"
import Protect from "../components/Protect"
import Affair from "../components/Affair/Affair"
import Footer from "../components/Footer"
export default {
  name: "Home",
  components: {
    HeaderBar,
    Agency,
    Schedule,
    Intelligence,
    Prevention,
    Weather,
    Resource,
    Environment,
    Protect,
    Affair,
    Footer
  },
  data() {
    return {
      bottomLink: [
        {
          url: 'http://swj.sz.gov.cn/ztzl/ndmsss/szswrzl/',
          imgPath: require('../assets/images/link_img1.png')
        },
        {
          url: 'http://swj.sz.gov.cn/ztzl/bmzdgz/hmcsjs/',
          imgPath: require('../assets/images/link_img2.png')
        },
        {
          url: 'http://swj.sz.gov.cn/ztzl/jcjdzt/qmsshzz/',
          imgPath: require('../assets/images/link_img3.png')
        }
      ]
    }
  }
};
</script>