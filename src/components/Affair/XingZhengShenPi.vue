<!--谁事务 > 行政审批-->
<template>
  <div class="rs-con">
    <div class="form-group">
      <el-select class="select1" v-model="value1" placeholder="请选择" @change="valueChage1">
        <el-option
          v-for="(item,index) in option1"
          :key="index"
          :label="item.name"
          :value="index">
        </el-option>
      </el-select>
      <el-select class="select2" v-model="value2" placeholder="请选择" @change="valueChage2">
        <el-option
          v-for="(item,index) in option1.length>0?option1[value1].list:[]"
          :key="index"
          :label="item.taskName"
          :value="index">
        </el-option>
      </el-select>
    </div>
    <div class="img-wrap scroll-view">
      <img :src="imgUrl" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'XingZhengShenPi',
  data() {
    return {
      option1: [],
      value1: 0,
      option2: [],
      value2: 0,
      imgUrl: ''
    }
  },

  created() {
    this.$axios.get(this.axiosBaseUrl + "/affairs/getWebList").then(res => {
      if(res.status==200){
        this.setData(res.data.data)
      }
    }).catch(err => {
      console.log(err.stack);
    });
  },

  methods: {
    setData(data){
      for(var i in data){
        this.option1.push(data[i])
      } 
      this.valueChage2()
    },

    valueChage1() {
      this.value2 = 0
      this.imgUrl = this.option1[this.value1].list[this.value2].imageurl
    },

    valueChage2() {
      this.imgUrl = this.option1[this.value1].list[this.value2].imageurl
    }
  }
  
}
</script>

<style scoped>
.select2{
  width: 600px;
  margin-left: 10px;
}
.img-wrap{
  margin-top: 20px;
  height: 528px;
  margin-right: -20px;
  padding-right: 20px;
}
.img-wrap img{
  max-width: 100%;
}
</style>