<template>
  <div class="back-top">
      <img src="~assets/img/backTop/返回顶部.svg" alt="回到顶部">
  </div>
</template>

<script>
export default {
    name: 'BackTop',
    data(){
        return {
            currentPath:''
        }
    },
}
</script>

<style scoped>
img{
    /* display: inline-block; */
    width: 50%;
    height: 50%;
    margin: 25%
}
.back-top{
    transition: all .5s linear;
    position: fixed;
    background-color: white;
}
</style>