<template>
  <div class="swiper">
      <div class="swiper-item"><slot name="swiper-item"></slot></div>
      <div class="swiper-item-bar"><slot name="swiper-item-bar"></slot></div>
  </div>
</template>

<script>

export default {
    name: 'Swiper',
}
</script>

<style scoped>
.swiper{
    position: relative;
    /* 跟从父组件的高度,否则别人调用后没法设置高度 */
    height: 100%;
}
.swiper-item{
    /* 在轮播图根组件设置高度干嘛。。。 */
    /* height: 190px; */
}
.swiper-item-bar{
    height: 10px;
    position: absolute;
    text-align: center;
    bottom: 10px;
    /* 绝对定位元素居中大法！ */
    left: 50%;
    transform: translate(-50%, 0);
}
</style>