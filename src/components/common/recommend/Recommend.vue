<template>
  <div class="recommend">
      <div class="rec-img">
          <slot name="rec-img"></slot>
      </div>
      <div class="rec-title">
          <slot name="rec-title"></slot>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Recommend'
}
</script>

<style scoped>
.recommend{
    /* 先定成140px,图片和文字各占一半，文字下方有留空白 */
    height: 140px;
    flex: 1;
    text-align: center;
}
/* 可以通过这种方式来控制即将出现的img标签(现在还没有,但是会从其他组件替换过来) */
.rec-img img{
    vertical-align: middle;
    margin: 10px 0;
    height: 50%;
    width: 70px;
    /* 这图片本来就是圆的。。 */
    /* border-radius: 0px; */
}
.rec-title{
    height: 50%;
    width: 100%;
    text-align: center;
    /* 神奇的样式 */
    border-bottom: 8px solid #eee;
    font-size: var(--font-size);
}

</style>