<template>
  <div class="user-info-item">
      <div class="svg"><slot  name="svg"></slot></div>
      <div class="text"><slot  name="text"></slot></div>
  </div>
</template>

<script>
export default {
    name: 'UserInfoItem',
}
</script>

<style scoped>
.user-info-item{
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    font-size: var(--font-size);
}
.svg{
    flex: 1;
    text-align: center;
}
.text{
    flex: 6;
}
</style>