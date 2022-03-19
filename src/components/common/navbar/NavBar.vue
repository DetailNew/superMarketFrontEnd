<template>
<!-- 顶部导航栏被多个地方使用，不取id比较好 -->
  <div class="nav-bar">
      <div class="left"><slot name="left"></slot></div>
      <div class="middle"><slot name="middle"></slot></div>
      <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
    name: 'NavBar'
}
</script>

<style scoped>
.nav-bar{
    display: flex;
    /* 导航栏高度一般是44px */
    height: 44px;
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px  rgba(100, 100, 100, .15);
    font-size: var(--font-size);
}
.left,
.right{
    width: 60px;
}
.middle{
    flex: 1;
}
</style>