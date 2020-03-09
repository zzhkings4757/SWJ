<template>
  <div class="login" :style="{'width': ww+'px', 'height': wh+'px'}">
		<div class="login-logo flex-item">
			<img src="../assets/images/logo.png" alt="">
			<h3>深圳市水务局业务门户</h3>
		</div>
		<div class="login-wrap flex-middle">
			<div class="login-box">
				<div class="login-menu flex-item">
					<a href="javascript:;" :class="{'on':menuIndex==index}" v-for="(item,index) in loginMenu" :key="index">{{item}}</a>
				</div>
				<div class="login-tab">
					<div class="login-con">
						<div class="form-group">
							<input type="text" placeholder="请输入账户">
						</div>
						<div class="form-group">
							<input type="password" placeholder="请输密码">
						</div>
						<div class="form-group">
							<input type="text" placeholder="请输入验证码">
							<div class="ver-img">
								<img src="../assets/images/ver_img.jpg" alt="">
							</div>
						</div>
						<a href="javascript:;" class="login-submit">登录</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
			ww: 'auto',
			wh: 'auto',
			loginMenu: ['账户密码登录','二维码登录'],
			menuIndex: 0,
		};
	},
	mounted(){
		var that = this
		this.setSize()
		window.onresize = ()=>{
			that.setSize()
		}
	},
	methods: {
		setSize(){
			this.ww = window.innerWidth
			this.wh = window.innerHeight
		}
		
	}
};
</script>