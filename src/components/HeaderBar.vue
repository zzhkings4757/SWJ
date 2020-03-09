<template>
  <div class="top">
    <div class="header">
      <div class="wrap flex-item">
        <a href="javascript:;" class="hd-logo flex-item">
          <img src="../assets/images/logo.png" alt />
          <h3>深圳市水务局业务门户</h3>
        </a>
        <div class="hd-bar flex-item">
          <div class="user-bar">
            <div class="avatar">
              <img src="../assets/images/avatar.png" alt />
            </div>
            <h3>刘生</h3>
            <span></span>
            <h3>智慧城市建设中心</h3>
          </div>
          <div class="hd-link">
            <a href="javascript:;">设置</a>
            <span></span>
            <a href="javascript:;">帮助</a>
            <span></span>
            <a href="javascript:;">退出</a>
          </div>
        </div>
      </div>
    </div>
    <div class="banner">
      <img src="../assets/images/banner.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderBar"
};
</script>

<style scoped>
.top {
  height: 266px;
  background: url(../assets/images/top_bg.png) no-repeat center center;
  background-size: cover;
  margin-bottom: 100px;
  padding-top: 32px;
  position: relative;
}
.hd-logo {
  margin-left: -70px;
}
.hd-logo img {
  width: 52px;
  height: 52px;
  margin-right: 18px;
}
.hd-logo h3 {
  font-size: 24px;
  color: #fff;
}
.user-bar {
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  margin-right: 40px;
}
.user-bar .avatar {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}
.user-bar h3 {
  color: #fff;
}
.user-bar span {
  display: block;
  width: 1px;
  height: 14px;
  margin: 0 10px;
  background: #fff;
}
.hd-link {
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}
.hd-link a {
  display: block;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.7);
  transition: 0.4s;
}
.hd-link a:hover {
  color: rgba(255, 255, 255, 1);
  transition: 0.4s;
}
.hd-link span {
  display: block;
  width: 1px;
  height: 14px;
  background: rgba(255, 255, 255, 0.7);
  margin: 0 20px;
}
.banner {
  position: absolute;
  width: 1200px;
  left: 50%;
  margin-left: -600px;
  bottom: -64px;
}
.banner img {
  width: 100%;
}
</style>