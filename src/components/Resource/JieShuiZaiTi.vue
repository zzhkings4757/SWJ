<!--水资源 > 节约用水 > 节水载体-->
<template>
  <div class="page">

  </div>
</template>

<script>
export default {
  name: 'JieShuiZaiTi',
  data() {
    return {

    }
  },

  mounted() {
    this.$axios.get(this.axiosBaseUrl + '/resource/getWaterSaving', {}).then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err.stack)
    })
  }
}
</script>